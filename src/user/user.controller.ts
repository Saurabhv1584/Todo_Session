import { Controller, Body, Delete,
    Param, Get, Post, Patch,
    NotFoundException, Session,
    UseGuards
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';


@Controller('user')
@Serialize(UserDto)
export class UserController {
    
    constructor(
        private userService: UserService,
        private authService: AuthService
    ) {}


    @Get()
    userWorking() {
        console.log('You are inside User');
        return 'You are using User';
    }

    // @Get('/whoami')
    // whoAmI(@Session() session:any) {
    //     return this.userService.findOne(session.userId);
    // }

    @Get('/whoami')
    @UseGuards(AuthGuard)
    whoAmI(@CurrentUser() user: User) {
        return user;
    }

    @Post('signout')
    signOut(@Session() session: any) {
        session.userId = null;
    }

    @Post('/create')
    async create(@Body() body: CreateUserDto, @Session() session: any) {
        // console.log(body.email,body.password);
        try {
            const user = await this.authService.signUp(body.email,body.password);
            // Storing user id in cache memory
            session.userId = user.id;
            return user;
        } catch (error) {
            console.log('signup error');
            throw new Error(error);
        }
    }
    
    @Post('/signin')
    async signIn(@Body() body: CreateUserDto,@Session() session: any) {
        try {
            const user = await this.authService.signIn(body.email,body.password);
            // Storing user id in cache memory
            session.userId = user.id;
            return user;
        } catch (error) {
            console.log('signin error');
            throw new Error(error);
        }
    }

    @Get('/finduser/:email')
    findUser(@Param('email') email: string) {
        return this.userService.findUser(email); 
    }
    
    @Get('/findone/:id')
    async findOne(@Param('id') id: string) {
        const user = await this.userService.findOne(parseInt(id));
        if(!user){
            throw new NotFoundException('user not found');
        }

        return user;
    }

    @Get('/findalluser')
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
