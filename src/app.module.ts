import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { TodoController } from './todo/todo/todo.controller';
// import { TodoService } from './todo/todo/todo.service';
import { Todo } from './todo/todo/todo.entity';
import { TodoModule } from './todo/todo/todo.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'todo.sqlite',
      entities:[Todo],
      synchronize: true,
    }),
    TodoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
