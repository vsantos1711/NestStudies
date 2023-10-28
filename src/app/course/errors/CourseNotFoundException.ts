import { HttpException } from '@nestjs/common/exceptions';

export class CourseNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Course with id ${id} not found`, 404);
  }
}
