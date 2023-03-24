import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';


describe('UserController', () => {
  let controller: UserController;
  let fakeUsersService: Partial<UserService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      // findOne
      findOne: (id:number) => {
        return Promise.resolve({id,email: 'asdf@asdf.com',password:'asdf'} as User);
      },

      // findUser
      findUser: (email: string) => {
        return Promise.resolve( {id: 1, email, password: 'asdf'} as User);
      },

      // findAllUser
      findAllUser: () => {
        return Promise.resolve([{id:1,email:'asdf@asdf.com',password: 'asdf'} as User]);
      },

      // remove
      remove: (id:number) => {
        return Promise.resolve({id} as User);
      },

      // update
      // update: () => {},
    };


    fakeAuthService = {
      // signUp
      // signUp: () => {}

      // signIn
      signIn: (email:string, password:string) => {
        return Promise.resolve({id:1,email,password} as User);
      },

    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: fakeUsersService
        },
        {
          provide: AuthService,
          useValue: fakeAuthService
        },
      ]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a list of users with the given email',async () => {
    const users = await controller.findUser('asdf.asdf@.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('asdf@asdf.com');
  });

  it('findOne returns a single user with the given id',async () => {
    const user = await controller.findOne('1');
    expect(user).toBeDefined();
  });

  it('findOne throws error if a user with the given id is not found',async (done) => {
    fakeUsersService.findOne = () => null;
    try {
      await controller.findOne('1');
    } catch (error) {
      done();
    }
  });

  it('signin uppdates session object and return user', async (done) => {
    const session = {userId: -10};
    const user = await controller.signIn({email: 'asdf@adsf.com', password:'asdf'}, session);

    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });


});
