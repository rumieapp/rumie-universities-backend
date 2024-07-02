import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { join } from 'path';
import { LocalistModule } from './localist/localist.module';
import { InstitutionModule } from './institution/institution.module';
import { PrismaService } from './prisma/prisma.service';
import { SharedModule } from './shared/shared.module';
import { CampaignModule } from './campaign/campaign.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SupportRequestModule } from './support-request/support-request.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        LOCALIST_API_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
        HTTP_PORT: Joi.number().required(),
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
    }),
    LocalistModule,
    InstitutionModule,
    SharedModule,
    CampaignModule,
    AuthModule,
    UsersModule,
    SupportRequestModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService], // Register the resolver here
})
export class AppModule {}
