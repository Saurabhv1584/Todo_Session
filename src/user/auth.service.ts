import { Injectable,BadRequestException } from "@nestjs/common";
import { UserService } from "./user.service";


@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async signUp(email:string , password: string) {
        // check email is already used?
        const user = await this.userService.findUser(email);
        if(user.length) {
            throw new BadRequestException('email in use');
        }

        // Hash the user password

        // create a new User

        //  return user
    }

    signIn() {}

}