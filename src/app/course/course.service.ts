import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/app/course/entities/course.entity';
import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseNotFoundException } from './errors/CourseNotFoundException';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,

    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    const tags = await Promise.all(
      createCourseDto.tags.map((tag) => this.preloadTags(tag)),
    );

    const newCourse = this.courseRepository.create({
      ...createCourseDto,
      tags,
    });
    return this.courseRepository.save(newCourse);
  }

  async findAll(): Promise<Course[]> {
    return this.courseRepository.find({
      relations: ['tags'],
    });
  }

  async update(updateCourseDto: UpdateCourseDto, id: string) {
    const tags =
      updateCourseDto.tags &&
      (await Promise.all(
        updateCourseDto.tags.map((tag) => this.preloadTags(tag)),
      ));

    const course = await this.courseRepository.preload({
      ...updateCourseDto,
      id,
      tags,
    });
    if (!course) {
      throw new CourseNotFoundException(id);
    }

    return this.courseRepository.save(course);
  }

  async delete(id: string) {
    const course = await this.courseRepository.findOne({ where: { id } });

    if (!course) {
      throw new CourseNotFoundException(id);
    }

    return this.courseRepository.remove(course);
  }

  private async preloadTags(name: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ where: { name } });
    if (tag) {
      return tag;
    }
    return this.tagRepository.create({ name });
  }
}
