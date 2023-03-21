import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { TodoController } from './todo/todo/todo.controller';
// import { TodoService } from './todo/todo/todo.service';
import { Todo } from './todo/todo/todo.entity';
import { TodoModule } from './todo/todo/todo.module';
// import { UserController } from './user/user.controller';
// import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities:[Todo,User],
      synchronize: true,
    }),
    TodoModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
