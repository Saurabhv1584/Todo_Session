import { IsEmail } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, AfterInsert, AfterRemove, AfterUpdate } from 'typeorm';


@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    password: string;
    length: any;

    @AfterInsert()
    logInsert() {
        console.log('Inserted User with id ', this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log('User is updated and id is ', this.id);
    }

    @AfterRemove()
    logRemoved() {
        console.log('Removed a User and id is ', this.id);
    }
}