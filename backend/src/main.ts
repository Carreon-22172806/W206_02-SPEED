import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  //enable cors
  app.enableCors({origin: true, credentials: true});
  const port = process.env.PORT || 6022;
  await app.listen(port, () => console.log(`Server running on port ${port}`));

  const dbtest = process.env.MONGODB_URI;

  

  


}
bootstrap();
