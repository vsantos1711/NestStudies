import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { Course } from 'src/app/course/entities/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Tag])],
  providers: [CourseService],
  controllers: [CourseController],
})
export class CourseModule {}
