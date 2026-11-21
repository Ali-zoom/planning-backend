import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  // this for cors enabilng
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true, //allow cookies to be sent with requests from the specified origin
  });
  await app.listen(process.env.PORT ?? 5000);
}

await bootstrap();
