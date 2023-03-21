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

    create(todo: Partial<Todo>){
        const newTodo = this.repo.create(todo);

        return this.repo.save(newTodo);
    }

    update(id: number, content:string){
        this.repo.update(id, { content: content} );
    }

    remove(id: number){
        this.repo.delete(id);
    }
}
