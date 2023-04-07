import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongooseCastExceptionFilter } from './common/mongoose-cast-exception-filter/mongoose-cast-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new MongooseCastExceptionFilter());
  await app.listen(3000);
}
bootstrap();
