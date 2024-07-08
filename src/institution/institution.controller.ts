import { Body, Controller, Get, Post } from "@nestjs/common";
import { InstitutionService } from "./institution.service";
import { InstitutionDto } from "./dto/institution.dto";
import { RegisterInstitutionDto } from "src/auth/register.dto";
import { ApiBody, ApiResponse } from "@nestjs/swagger";
@Controller('university')
export class InstitutionController{
    constructor(private readonly institutionService: InstitutionService) {}

    @ApiResponse({
        description:"Once the data are inserted, Following response you would expect",
        type:InstitutionDto
    })
    @Get('/list')
    @ApiResponse({
        description:"Once the data are inserted, Following response you would expect",
        type:[InstitutionDto],

    })
    async getInstitutionList(): Promise<InstitutionDto[]>{
        return this.institutionService.getInstitutionList();
    }

    @Post('/store')
    @ApiResponse({
        description:"Once the data are inserted, Following response you would expect",
        type:InstitutionDto
    })
    async createInstitution(@Body() createInstitutionDto: RegisterInstitutionDto): Promise<InstitutionDto> {
        return this.institutionService.createInstitution(createInstitutionDto);
    }
    
}