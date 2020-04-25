import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { getFilters } from './common/exceptionFilters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(...getFilters());

  const options = new DocumentBuilder()
    .setTitle('ultra-io-demo')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
