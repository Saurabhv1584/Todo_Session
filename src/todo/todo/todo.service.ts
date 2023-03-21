import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private repo: Repository<Todo>
    ) {}

    findAll(){
        return this.repo.find();
    }

    findOne(id: number): Promise<Todo>{
        return this.repo.findOneBy({id: id}); 
    }

    create(todo: Partial<Todo>){
        const newTodo = this.repo.create(todo);

        return this.repo.save(newTodo);
    }

    async update(id: number, content :Partial<Todo>){
        const todo = await this.findOne(id);
        if(!todo){
            throw new Error('todo not found');
        }

        // assign is used to copy all the properties from content and override any existing property
        Object.assign(todo,content);
        return this.repo.save(todo);
    }

    async remove(id: number){
        const todo = await this.findOne(id);
        if(!todo){
            throw new Error('todo not found');
        }

        return this.repo.remove(todo);
    }
}
