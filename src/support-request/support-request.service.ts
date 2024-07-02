import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSupportRequestInput } from './dto/create-support-request.input';
import { SupportRequestDto } from './dto/support-request.dto';
import { SupportStatusType } from 'src/enums/support-request-status-type.enum';
import { SupportRequestFilterInput } from './dto/support-request-filter.input';



@Injectable()
export class SupportRequestService {
  constructor(private prisma: PrismaService) {}

  async createSupportRequest(user, data: CreateSupportRequestInput): Promise<SupportRequestDto> {
    const ticketId = await this.generateSupportTicketId(user.id);
    let supportRequest = await this.prisma.supportRequest.create({
      data: {
        userId: user.id,
        ticketId,
        email: data.email,
        message: data.message,
        status: SupportStatusType.OPEN,
      },
    });
    supportRequest.ticketId = this.getFormatedTicketId(supportRequest.ticketId);
    return supportRequest as SupportRequestDto;
  }

  async generateSupportTicketId(userId:string): Promise<string> {
    let randomNum = Math.floor(Math.random() * 1000000);
    const sixDigitRandomNum = randomNum.toString().padStart(6, '0');
    const ticketId = `${userId}-${sixDigitRandomNum}`;
    return ticketId;
  }

  getFormatedTicketId(ticketId: string): string {
    return ticketId.split('-').pop()!;
  }

  async getSupportRequestsByUser(userId: string, filter?: SupportRequestFilterInput) {
    const where: any = { userId };
    if (filter?.status) {
      where.status = filter.status;
    }
    const supportRequests = await this.prisma.supportRequest.findMany({ where });
    return supportRequests.map((item) =>{
      item.ticketId = this.getFormatedTicketId(item.ticketId)
      return item;
    })
  }


}
