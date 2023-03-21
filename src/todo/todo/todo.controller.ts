import { Controller, Body, Delete, Param, Get, Post, Res, Patch } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodo } from './dto/todo.dto';


@Controller('todo')
export class TodoController {
    constructor(private todoService: TodoService) {}

    @Get('/isWorking')
    isWorking(){
        console.log('This is live server');
        return 'This is live server';
    }

    @Get('/findAll')
    findAll() {
        // return 'hi'
        return this.todoService.findAll();
    }                                                                                       

    @Post('/create') 
    create(@Body() body: Partial<CreateTodo>) {
        // console.log(body);
        return this.todoService.create(body);
    }

    @Patch(':id') 
    update(@Param('id') id, @Body('content') content) {
        return this.todoService.update(id,content);
    }

    @Delete(':id')
    remove(@Param('id') id) {
        return this.todoService.remove(id);
    }
}
