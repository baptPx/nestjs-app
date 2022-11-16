import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import {Connection, Repository} from "typeorm";
import {User} from "./model/user.model";
import {createMemDB} from "../utils/test-util";

describe('UserService', () => {

  const DEFAULT_EMAIL = "test@mail";
  const DEFAULT_PASSWORD = "123";
  const UPDATE_EMAIL = "UPDATE_EMAIL";

  let db: Connection
  let userService: UserService
  let userRepository: Repository<User>

  beforeAll(async () => {
    db = await createMemDB([User])
    userRepository = await db.getRepository(User)
    userService = new UserService(userRepository)
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should create user', async () => {
    let user = await userService.createUser({
      email: DEFAULT_EMAIL,
      password: DEFAULT_PASSWORD,
      firstName: 'firstName'
    })
    expect(user).toBeDefined();
    let users = await userRepository.find();
    await userRepository.delete(users.map(u => u.id));
  });

  it('should update user', async () => {
    let user = await userService.createUser({
      email: DEFAULT_EMAIL,
      password: DEFAULT_PASSWORD,
      firstName: 'firstName'
    })
    expect(user).toBeDefined();
    let updateName = "updateName"
    user = await userService.updateUser(DEFAULT_EMAIL, {
      email: UPDATE_EMAIL,
      password: DEFAULT_PASSWORD,
      firstName: updateName
    })
    let updateUser = await userService.findOneByEmail(UPDATE_EMAIL);
    expect(updateUser).toBeDefined();
    expect(updateUser.firstName).toBe(updateName)

    let users = await userRepository.find();
    await userRepository.delete(users.map(u => u.id));
  });
  it('should delete user', async () => {
    await userService.createUser({
      email: DEFAULT_EMAIL,
      password: DEFAULT_PASSWORD,
      firstName: 'firstName'
    })
    let user = await userService.findOneByEmail(DEFAULT_EMAIL)
    expect(user).toBeDefined();

    await userService.deleteUser(user.email)
    try {
      user = await userService.findOneByEmail(DEFAULT_EMAIL)
    } catch(err) {
      user = null;
    }
    expect(user).toBeNull();
  });
});
