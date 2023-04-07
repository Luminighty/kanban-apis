import { Test, TestingModule } from '@nestjs/testing';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { getModelToken } from '@nestjs/mongoose';
import { Card } from './schemas/card.schema';

describe('CardController', () => {
  let controller: CardController;
  const mockCardModel = {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndRemove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardController],
      providers: [
        CardService,
        {
          provide: getModelToken(Card.name),
          useValue: mockCardModel,
        },
      ],
    }).compile();

    controller = module.get<CardController>(CardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
