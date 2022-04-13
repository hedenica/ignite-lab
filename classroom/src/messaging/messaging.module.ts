import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { PurchasesController } from './controllers/purchases.controller';
import { StudentsService } from '../services/students.service';
import { CoursesService } from '../services/courses.service';
import { EnrollmentsService } from '../services/enrollments.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PurchasesController],
  providers: [StudentsService, CoursesService, EnrollmentsService],
})
export class MessagingModule {}
