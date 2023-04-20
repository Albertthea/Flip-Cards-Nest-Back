import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { CardEntity } from './card.entity';

@Controller()
export class AppController {
  constructor(private dbService: InMemoryDBService<any>) {}

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
    this.dbService.seed(
      (idx: number) => ({
        id: String(idx + 1),
        title: `Card-${idx + 1}`,
        description: String(idx + 1),
      }),
      5,
    );

    return this.dbService.getAll();
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    return this.dbService.delete(id);
  }
}
