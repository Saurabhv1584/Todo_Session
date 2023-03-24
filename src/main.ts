import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieSession = require('cookie-session');


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = 3000;
  await app.listen(port, ()=>{console.log(`server is running on ${port}`)});
}
bootstrap();
