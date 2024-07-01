import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto'; 
import { RegisterInstitutionDto } from './register.dto';
import { LoginInstitutionDto } from './login-institution.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthDto)
  async registerInstitution(
    @Args('registerInstitutionDto') registerInstitutionDto: RegisterInstitutionDto,
  ): Promise<AuthDto> {
    return this.authService.registerInstitution(registerInstitutionDto);
  }

  @Mutation(() => AuthDto)
  async loginInstitution(
    @Args('loginInstitutionDto') loginInstitutionDto: LoginInstitutionDto,
  ): Promise<AuthDto> {
    const institution = await this.authService.validateInstitution(loginInstitutionDto.slug, loginInstitutionDto.pinCode);
    if (!institution) {
      throw new Error('Invalid credentials');
    }
    return this.authService.login(institution);
  }
}
