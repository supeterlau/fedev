import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CatsController, CtrlController } from './cats.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [
    AppController, 
    CatsController,
    CtrlController
  ],
  providers: [AppService],
})
export class AppModule {}
