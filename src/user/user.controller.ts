import { Controller, Body, Delete,
     Param, Get, Post, Patch,
     UseInterceptors, ClassSerializerInterceptor
     } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';



@Controller('user')
export class UserController {

    constructor(
        private userService: UserService
    ) {}

    // @Get('/userWorking')
    // userWorking() {
    //     console.log('You are inside User');
    //     return 'You are inside User';
    // }

    @Post('/create')
    create(@Body() body: CreateUserDto) {
        console.log(body.email,body.password);
        return this.userService.create(body.email,body.password);
    }

    // @Post('/signin')
    // signIn() {
    //     try {
            
    //     } catch (error) {
    //         console.log('signin error');
    //         throw new Error(error);
    //     }
    // }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/findUser/:email')
    findUser(@Param('email') email: string) {
        return this.userService.findUser(email); 
    }

    @Get('/findOne/:id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(parseInt(id));
    }

    @Get('/findAllUser')
    findAllUser() {
        return this.userService.findAllUser();
    }

    @Patch('/update/:id')
    update(@Param('id') id:string, @Body() body: UpdateUserDto) {
        try {
            return this.userService.update(parseInt(id),body);
        } catch (error) {
            console.log('error in removing');
            throw new Error(error);
        }
    }

    @Delete('/remove/:id')
    remove(@Param('id') id: string) {
        // return this.userService.remove(parseInt(id));
        try {
            return this.userService.remove(parseInt(id));
        } catch (error) {
            console.log('error in removing');
            throw new Error(error);
        }
    }

}
