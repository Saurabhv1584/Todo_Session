import { Module, ValidationPipe, MiddlewareConsumer } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo/todo/todo.entity';
import { TodoModule } from './todo/todo/todo.module';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
// import { TodoController } from './todo/todo/todo.controller';
// import { TodoService } from './todo/todo/todo.service';
// import { UserController } from './user/user.controller';
// import { UserService } from './user/user.service';

const cookieSession = require('cookie-session');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.NODE_ENV === 'test'?
      'test.sqlite' : 'db.sqlite',
      entities:[Todo,User],
      synchronize: true,
    }),
    TodoModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      })
    }
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply( cookieSession({
      keys: ['asdf'],
    }),
    )
    .forRoutes('*');
  }
  
}
