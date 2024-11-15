import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

declare const module: any;
async function bootstrap() {
  const logger = new Logger('EntryPoint');
  const app = await NestFactory.create(AppModule, {
    snapshot: process.env.NODE_ENV !== 'production',
    logger: ['error', 'warn', 'log'],
  });

  // Enable CORS
  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: 'GET,POST,PUT,DELETE', // Specify allowed methods,
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Leaves Tracker')
    .setDescription('Api Docs for leaves tracker')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const PORT = 5002;

  await app.listen(PORT);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  logger.log(`Server running on http://localhost:${PORT}`);
}
bootstrap();
