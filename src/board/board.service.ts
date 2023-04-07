import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './schemas/board.schema';

@Injectable()
export class BoardService {
  constructor(
    @InjectModel('Board') private readonly boardModel: Model<Board>,
  ) {}

  async create(createBoardDto: CreateBoardDto): Promise<Board> {
    const createdBoard = new this.boardModel(createBoardDto);
    return createdBoard.save();
  }

  async findAll(): Promise<Board[]> {
    return this.boardModel.find().exec();
  }

  async findOne(id: string): Promise<Board> {
    const board = await this.boardModel.findById(id).exec();
    if (!board) throw new NotFoundException(`Board with ID ${id} not found`);
    return board;
  }

  async update(id: string, updateBoardDto: UpdateBoardDto): Promise<Board> {
    const updatedBoard = await this.boardModel.findByIdAndUpdate(
      id,
      updateBoardDto,
      {
        new: true,
      },
    );
    if (!updatedBoard)
      throw new NotFoundException(`Board with ID ${id} not found`);
    return updatedBoard;
  }

  async remove(id: string) {
    const deletedBoard = await this.boardModel.findByIdAndRemove(id);
    if (!deletedBoard)
      throw new NotFoundException(`Board with ID ${id} not found`);
  }
}
