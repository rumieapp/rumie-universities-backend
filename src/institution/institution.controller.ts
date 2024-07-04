import { Body, Controller, Get, Post } from "@nestjs/common";
import { InstitutionService } from "./institution.service";
import { InstitutionDto } from "./dto/institution.dto";
import { RegisterInstitutionDto } from "src/auth/register.dto";
@Controller('university')
export class InstitutionController{
    constructor(private readonly institutionService: InstitutionService) {}

    @Get('/list')
    async getInstitutionList(): Promise<InstitutionDto[]>{
        return this.institutionService.getInstitutionList();
    }

    @Post('/store')
    async createInstitution(@Body() createInstitutionDto: RegisterInstitutionDto): Promise<InstitutionDto> {
        return this.institutionService.createInstitution(createInstitutionDto);
    }
}