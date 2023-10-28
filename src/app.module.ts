import { Module } from '@nestjs/common';
import { CourseModule } from './app/course/course.module';
import { DatabaseModule } from './app/database/database.module';

@Module({
  imports: [CourseModule, DatabaseModule],
})
export class AppModule {}
