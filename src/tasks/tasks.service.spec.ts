import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;

  const prismaMock = {
    task: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw NotFoundException when task does not exist', async () => {
    prismaMock.task.findUnique.mockResolvedValue(null);

    await expect(service.getTaskById(999)).rejects.toBeInstanceOf(NotFoundException);
    expect(prismaMock.task.findUnique).toHaveBeenCalledWith({ where: { id: 999 } });
  });

  it('should complete task after verifying it exists', async () => {
    const task = { id: 1, title: 'Task', description: 'Desc', completed: false };
    const completedTask = { ...task, completed: true };

    prismaMock.task.findUnique.mockResolvedValue(task);
    prismaMock.task.update.mockResolvedValue(completedTask);

    await expect(service.completeTask(1)).resolves.toEqual(completedTask);
    expect(prismaMock.task.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { completed: true },
    });
  });
});
