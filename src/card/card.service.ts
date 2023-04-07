import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card, CardDocument } from './schemas/card.schema';

@Injectable()
export class CardService {
  constructor(@InjectModel(Card.name) private cardModel: Model<CardDocument>) {}

  async create(boardId: string, createCardDto: CreateCardDto): Promise<Card> {
    const createdCard = new this.cardModel({
      ...createCardDto,
      board: boardId,
    });
    return createdCard.save();
  }

  async findAll(boardId: string): Promise<Card[]> {
    return this.cardModel.find({ board: boardId }).exec();
  }

  async findOne(boardId: string, id: string): Promise<Card> {
    const card = await this.cardModel
      .findOne({ _id: id, board: boardId })
      .exec();
    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
    return card;
  }

  async update(
    boardId: string,
    id: string,
    updateCardDto: UpdateCardDto,
  ): Promise<Card> {
    const updatedCard = await this.cardModel.findOneAndUpdate(
      { board: boardId, _id: id },
      updateCardDto,
      {
        new: true,
      },
    );
    if (!updatedCard) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
    return updatedCard;
  }

  async remove(boardId: string, id: string): Promise<void> {
    const deletedCard = await this.cardModel
      .findOneAndRemove({ board: boardId, _id: id })
      .exec();
    if (!deletedCard)
      throw new NotFoundException(`Card with ID ${id} not found`);
  }
}
