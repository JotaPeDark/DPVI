import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configurando o ValidationPipe globalmente
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Remove propriedades que não estão nos DTOs
    forbidNonWhitelisted: true, // Retorna erro se propriedades não declaradas forem enviadas
    transform: true, // Transforma as payloads para os tipos esperados
  }));
  
  await app.listen(3000);
}
bootstrap();

