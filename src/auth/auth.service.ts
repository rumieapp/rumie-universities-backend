// src/auth/auth.service.ts

import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './auth.dto';
import { RegisterInstitutionDto } from './register.dto';
import { UserType } from '@prisma/client';
import { valid } from 'joi';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async validateInstitution(slug: string, pinCode: string): Promise<any> {
    const institution = await this.prisma.institution.findUnique({
      where: { slug },
    });
    if (institution && institution.pinCode === pinCode) {
      return institution;
    }
    return null;
  }

  async login(institution: any): Promise<AuthDto> {
    const payload = { id: institution.id, institutionSlug: institution.slug };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1y' });

    await this.prisma.institution.update({
      where: { id: institution.id },
      data: {
        sessions: {
          push: {
            token: accessToken,
            deviceModel: 'Web',
            valid: true,
            started: new Date(),
            lastSeen: new Date(),
          },
        },
      },
    });
    return {accessToken};
  }

  
  async registerInstitution(data: RegisterInstitutionDto): Promise<AuthDto> {
    const existingInstitution = await this.prisma.institution.findUnique({
      where: { slug: data.slug },
    });
    if (existingInstitution) {
      throw new ConflictException('Institution already exists');
    }


    const newInstitution = await this.prisma.institution.create({
      data: {
        institutionName: data.institutionName,
        slug: data.slug,
        pinCode: data.pinCode,
        logo: data.logo,
        profilePicture: data.profilePicture,
        schoolColor: data.schoolColor,
      },
    });

    return this.login(newInstitution);
  }

}
