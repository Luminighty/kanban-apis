import { Test, TestingModule } from '@nestjs/testing';
import { CardService } from './card.service';
import { getModelToken } from '@nestjs/mongoose';
import { Card } from './schemas/card.schema';

describe('CardService', () => {
  let service: CardService;

  beforeEach(async () => {
    const mockCardModel = {};
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CardService,
        {
          provide: getModelToken(Card.name),
          useValue: mockCardModel,
        },
      ],
    }).compile();

    service = module.get<CardService>(CardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
