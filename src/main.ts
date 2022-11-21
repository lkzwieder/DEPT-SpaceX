import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api/api.module';
import { BasePipe } from './common/pipes/base.pipe';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  app.useGlobalPipes(new BasePipe());
  await app.listen(3000);
}

bootstrap();
