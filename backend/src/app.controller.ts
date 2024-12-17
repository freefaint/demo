import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Comment, Task } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private prisma: PrismaService) {}

  @Get('task')
  async getTasks() {
    return this.prisma.task.findMany();
  }

  @Post('task')
  async createTask(@Body() data: Pick<Task, 'details' | 'title'>) {
    return await this.prisma.task.create({ data });
  }

  @Get('task/:id')
  async getTask(@Param() { id }: { id: string }) {
    return this.prisma.task.findFirst({ where: { id } });
  }

  @Patch('task/:id')
  async updateTask(
    @Param() { id }: { id: string },
    @Body() data: Pick<Task, 'status'>,
  ) {
    return this.prisma.task.update({ data, where: { id } });
  }

  @Get('task/:id/comments')
  async getTaskComments(@Param() { id }: { id: string }) {
    return this.prisma.comment.findMany({ where: { taskId: id } });
  }

  @Get('task/:id/commentsCount')
  async getTaskCommentsCount(@Param() { id }: { id: string }) {
    return {
      count: await this.prisma.comment.count({ where: { taskId: id } }),
    };
  }

  @Post('task/:id/comments')
  async getComments(
    @Param() { id }: { id: string },
    @Body() data: Pick<Comment, 'text'>,
  ) {
    return await this.prisma.comment.create({ data: { ...data, taskId: id } });
  }
}
