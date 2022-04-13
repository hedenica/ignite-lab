import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KakfaService } from './kafka.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [KakfaService],
  exports: [KakfaService],
})
export class MessagingModule {}
