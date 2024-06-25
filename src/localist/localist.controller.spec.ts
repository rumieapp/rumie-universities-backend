import { Test, TestingModule } from '@nestjs/testing';
import { LocalistController } from './localist.controller';

describe('LocalistController', () => {
  let controller: LocalistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocalistController],
    }).compile();

    controller = module.get<LocalistController>(LocalistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
