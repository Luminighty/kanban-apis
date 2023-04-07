import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { Board } from './schemas/board.schema';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

describe('BoardController', () => {
  let boardController: BoardController;
  let boardService: BoardService;
  let board;

  const mockBoardModel = {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndRemove: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [BoardController],
      providers: [
        BoardService,
        {
          provide: getModelToken(Board.name),
          useValue: mockBoardModel,
        },
      ],
    }).compile();

    boardService = moduleRef.get<BoardService>(BoardService);
    boardController = moduleRef.get<BoardController>(BoardController);

    board = {
      _id: 'someId',
      title: 'Test Board',
      description: 'Test Board Description',
      active: true,
      save: jest.fn(),
    } as Board;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of boards', async () => {
      jest.spyOn(boardService, 'findAll').mockResolvedValueOnce([board]);

      expect(await boardController.findAll()).toEqual([board]);
      expect(boardService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a board with the given id', async () => {
      jest.spyOn(boardService, 'findOne').mockResolvedValueOnce(board);

      expect(await boardController.findOne(board._id)).toEqual(board);
      expect(boardService.findOne).toHaveBeenCalledWith(board._id);
    });
  });

  describe('create', () => {
    it('should create a board', async () => {
      const createBoardDto: CreateBoardDto = {
        title: 'Test Board',
        description: 'Test Board Description',
      };

      jest.spyOn(boardService, 'create').mockResolvedValueOnce(board);

      expect(await boardController.create(createBoardDto)).toEqual(board);
      expect(boardService.create).toHaveBeenCalledWith(createBoardDto);
    });
  });

  describe('update', () => {
    it('should update a board with the given id', async () => {
      const updateBoardDto: UpdateBoardDto = {
        title: 'Updated Test Board',
        description: 'Updated Test Board Description',
      };

      jest
        .spyOn(boardService, 'update')
        .mockResolvedValueOnce({ ...board, ...updateBoardDto });

      expect(
        await boardController.update(board._id, updateBoardDto),
      ).toMatchObject(updateBoardDto);
      expect(boardService.update).toHaveBeenCalledWith(
        board._id,
        updateBoardDto,
      );
    });
  });
});
