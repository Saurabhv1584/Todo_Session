import { Controller, Body, Delete,
    Param, Get, Post, Patch,
    NotFoundException
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';


@Controller('user')
@Serialize(UserDto)
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

    @Get('/findUser/:email')
    findUser(@Param('email') email: string) {
        return this.userService.findUser(email); 
    }
    
    @Get('/findOne/:id')
    async findOne(@Param('id') id: string) {
        const user = await this.userService.findOne(parseInt(id));
        if(!user){
            throw new NotFoundException('user not found');
        }

        return user;
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
