import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { CourseService } from './course.service';
import { Get } from '@nestjs/common/decorators';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Post('create')
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Get('list')
  findAll() {
    return this.courseService.findAll();
  }

  @Post('update/:id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(updateCourseDto, id);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.courseService.delete(id);
  }
}
