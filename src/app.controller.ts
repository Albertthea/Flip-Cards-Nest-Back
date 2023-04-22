import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { CardEntity } from './card.entity';

@Controller()
export class AppController {
  constructor(private dbService: InMemoryDBService<any>) {
    this.seed();
  }

  @Get()
  getAll(): CardEntity[] {
    return this.dbService.getAll();
  }

  @Post()
  create(@Body() dto: Partial<CardEntity>): CardEntity {
    return this.dbService.create(dto);
  }

  @Post('seed')
  seed(): CardEntity[] {
    if (this.dbService.getAll().length === 0) {
      const defaultCards: Partial<CardEntity>[] = [
        { id: '1', title: 'Card-1', description: 'Description for Card-1' },
        { id: '2', title: 'Card-2', description: 'Description for Card-2' },
        { id: '3', title: 'Card-3', description: 'Description for Card-3' },
        { id: '4', title: 'Card-4', description: 'Description for Card-4' },
        { id: '5', title: 'Card-5', description: 'Description for Card-5' },
      ];

      defaultCards.forEach((dto) => {
        this.dbService.create(dto);
      });
    }

    return this.dbService.getAll();
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    return this.dbService.delete(id);
  }
}
