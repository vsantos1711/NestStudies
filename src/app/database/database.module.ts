import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/app/course/entities/course.entity';
import { Tag } from '../course/entities/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'username',
      password: 'password',
      database: 'mydatabase',
      entities: [Course, Tag],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
