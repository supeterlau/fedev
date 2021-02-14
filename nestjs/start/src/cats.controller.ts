import { Controller, Get, Post, All, Param } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Post()
  create(): string {
    return 'add a new cat'
  }

  @Get()
  findAll(): string {
    return 'returns all cats, hot reload';
  }

  @Get(':id')
  // findOne(@Param() params: any): string {
  //   console.log(params, params.id)
  //   return `get cats id: ${params.id}`
  // }
  findOne(@Param('id') id: string): string {
    console.log(id)
    return `get cats id: ${id}`
  }
}

@Controller('ctrl')
export class CtrlController {
  @All()
  create(): string {
    return 'hhh'
  }
}
