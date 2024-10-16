import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './auth.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema}]),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
