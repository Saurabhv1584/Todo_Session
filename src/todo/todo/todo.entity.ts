import {AfterInsert, AfterRemove, AfterUpdate ,Column , Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title:string;

    @Column()
    content: string;

    @Column()
    isCompleted: boolean;

    @AfterInsert()
    logInsert() {
        console.log('Inserted User with id ', this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log('Todo is updated and id is ', this.id);
    }

    @AfterRemove()
    logRemoved() {
        console.log('Removed a todo and id is ', this.id);
    }
    
}
