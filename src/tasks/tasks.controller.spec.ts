import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

describe('TasksController', () => {
  let controller: TasksController;
  const tasksServiceMock = {
    createTask: jest.fn(),
    getTaskById: jest.fn(),
    changeTask: jest.fn(),
    completeTask: jest.fn(),
    uncompleteTask: jest.fn(),
    deleteTask: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [{ provide: TasksService, useValue: tasksServiceMock }],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should delegate getTaskById to service', async () => {
    const task = { id: 1, title: 'Task', description: 'Desc', completed: false };
    tasksServiceMock.getTaskById.mockResolvedValue(task);

    await expect(controller.getTaskById(1)).resolves.toEqual(task);
    expect(tasksServiceMock.getTaskById).toHaveBeenCalledWith(1);
  });

  it('should delegate deleteTask to service', async () => {
    const task = { id: 1, title: 'Task', description: 'Desc', completed: false };
    tasksServiceMock.deleteTask.mockResolvedValue(task);

    await expect(controller.deleteTask(1)).resolves.toEqual(task);
    expect(tasksServiceMock.deleteTask).toHaveBeenCalledWith(1);
  });
});
