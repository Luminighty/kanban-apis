import { Test, TestingModule } from '@nestjs/testing';
import { BoardService } from './board.service';
import { Board } from './schemas/board.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('BoardService', () => {
  let service: BoardService;

  beforeEach(async () => {
    const mockBoardModel = {};
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoardService,
        {
          provide: getModelToken(Board.name),
          useValue: mockBoardModel,
        },
      ],
    }).compile();

    service = module.get<BoardService>(BoardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
