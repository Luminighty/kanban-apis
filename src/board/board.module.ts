import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Board, BoardSchema } from './schemas/board.schema';
import { CardModule } from 'src/card/card.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Board.name, schema: BoardSchema }]),
    CardModule,
  ],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
