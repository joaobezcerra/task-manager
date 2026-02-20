import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-tasks.dto';
import { ApiNotFoundResponse } from '@nestjs/swagger';
import { ChangeTaskDto } from './dtos/change-tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  createTask(@Body() dto: CreateTaskDto) {
    return this.tasksService.createTask(dto);
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: 'Task not found' })
  getTaskById(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.getTaskById(id);
  }

  @Patch(':id')
  @ApiNotFoundResponse({ description: 'Task not found' })
  async change(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ChangeTaskDto,
  ) {
    return this.tasksService.changeTask(id, dto);
  }

  @Put(':id/complete')
  @ApiNotFoundResponse({ description: 'Task not found' })
  async completeTask(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.completeTask(id);
  }

  @Put(':id/uncomplete')
  @ApiNotFoundResponse({ description: 'Task not found' })
  async uncompleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.uncompleteTask(id);
  }

  @Delete(':id')
  @ApiNotFoundResponse({ description: 'Task not found' })
  deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.deleteTask(id);
  }
}
