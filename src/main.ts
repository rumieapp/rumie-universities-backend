import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { buildSchema } from 'graphql';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
   // Enable CORS
   app.enableCors({
    origin: '*', // Allow all origins. You can restrict this to specific origins if needed.
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  await app.listen(3000);
}
bootstrap();
