import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // controller validation

  const config = new DocumentBuilder()
    .setTitle('Unreal Tournament')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('unreal-tournament')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.APP_PORT);
  console.log('Start app');
}
bootstrap();
