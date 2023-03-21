import { Controller, Body, Delete, Param, Get, Post, Patch } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodo } from './dto/todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

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

    @Get('/findOne/:id')
    findOne(@Param('id') id: string) {
        return this.todoService.findOne(parseInt(id));
    }

    @Post('/create') 
    create(@Body() body: Partial<CreateTodo>) {
        // console.log(body);
        return this.todoService.create(body);
    }

    @Patch('/update/:id') 
    update(@Param('id') id: string , @Body() content: UpdateTodoDto) {
        return this.todoService.update(parseInt(id),content);
    }

    @Delete('/remove/:id')
    remove(@Param('id') id: string ) {
        return this.todoService.remove(parseInt(id));
    }

}
