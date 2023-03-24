import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
    let service: AuthService;
    let fakeUsersService: Partial<UserService>;

    beforeEach(async () => {
        // create a fake copy of the user service
        const users: User[] = [];
        fakeUsersService = {
            findUser: (email:string) => {
                const filteredUsers = users.filter(user => user.email === email);
                return Promise.resolve(filteredUsers);
            },
            // findUser: () => Promise.resolve({} as User),
            create: (email: string , password: string) => {
                const user = { id: Math.floor(Math.random()*99999), email,password} as User;
                users.push(user);
                return user;
            }
        };
        
        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UserService,
                    useValue: fakeUsersService
                },
            ],
        }).compile();

        service = module.get(AuthService);
    });
    
    it('can create an instance of auth service',async () => {
        expect(service).toBeDefined();
    });
    
    it('creates a new user with a salted and hashed password', async () => {
        const user = await service.signUp('asdf@adf.com','asdf');
        
        expect(user.password).not.toEqual('asdf');
        const [salt,hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });
    
    it('throws an error if user signs up with email that is in use', async (done) => {
        await service.signUp('asdf@asdf.com','asdf');
        try {
        await service.signUp('asdf@adsf.com','asdf');
        } catch (error) {
        done();
        }
    });

    it('throws if signin is called with an unused email', async (done) => {
        try {
            await service.signIn('adfg@asd.com','asdflkj');
        } catch (error) {
            done();
        }
    });

    it('throws if an invalid password is provided', async (done) => {
        fakeUsersService.findUser = async () =>
            await service.signUp('asdf@adf.com','adf545');
            try {
                await service.signIn('asdf@asdf.com','asdf');
            } catch (error) {
                done();
            }
    });

    it('throws if an envalid password is provided',async (done) => {
    fakeUsersService.findUser = 
    () => Promise.resolve( {email: 'asdf@adf.com', password: 'asd33'} as User);

    try {
        await service.signIn('lkh@lkj.com','password');
    } catch (error) {
        done();
    }
    });

    it('returns a user if correct password is provided',async (done) => {
    await service.signUp('adsf@asdf.com','password');

    const user = await service.signIn('asdf@adf.com','password');
    expect(user).toBeDefined();
    });

});

