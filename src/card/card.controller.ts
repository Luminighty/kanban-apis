import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Controller('board/:boardId/card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  create(
    @Param('boardId') boardId: string,
    @Body() createCardDto: CreateCardDto,
  ) {
    return this.cardService.create(boardId, createCardDto);
  }

  @Get()
  findAll(@Param('boardId') boardId: string) {
    return this.cardService.findAll(boardId);
  }

  @Get(':id')
  findOne(@Param('boardId') boardId: string, @Param('id') id: string) {
    return this.cardService.findOne(boardId, id);
  }

  @Patch(':id')
  update(
    @Param('boardId') boardId: string,
    @Param('id') id: string,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    return this.cardService.update(boardId, id, updateCardDto);
  }

  @Delete(':id')
  remove(@Param('boardId') boardId: string, @Param('id') id: string) {
    return this.cardService.remove(boardId, id);
  }
}
