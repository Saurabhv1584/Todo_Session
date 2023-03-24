import { Injectable,BadRequestException, NotFoundException } from "@nestjs/common";
import { UserService } from "./user.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";



const scrypt = promisify(_scrypt);


@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async signUp(email:string , password: string) {
        // check email is already used?
        const users = await this.userService.findUser(email);
        if(users.length) {
            throw new BadRequestException('email already is in use');
        }

        // Hash the user password
            // generate the salt 
            const salt = randomBytes(8).toString('hex');

            // hash the salt and the pass together
            const hash = (await scrypt(password,salt,32))as Buffer;

            // Join the hashed result and the salt together
            const result = salt + "." + hash.toString('hex');

        // create a new User
        const user = await this.userService.create(email,result);

        //  return user
        return user;
    }

    async signIn(email: string, password:string) {
        const [user] = [await this.userService.findUser(email)];
        if(!user){
            throw new NotFoundException('not valid email');
        }

        const [salt, storedHash] = user.password.split('.');
        
        const hash = (await scrypt(password,salt,32)) as Buffer ;

        if(storedHash !== hash.toString('hex')){
            throw new BadRequestException('bad password')
        }

        return user;
    }

}