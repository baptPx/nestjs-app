import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import {Connection, Repository} from "typeorm";
import {UserService} from "../user/user.service";
import {User} from "../user/model/user.model";
import {createMemDB} from "../utils/test-util";
import {JwtService} from "@nestjs/jwt";

describe('AuthService', () => {

  const DEFAULT_EMAIL = "test@mail";
  const DEFAULT_PASSWORD = "123";

  let db: Connection
  let userService: UserService
  let authService: AuthService
  let userRepository: Repository<User>

  beforeAll(async () => {
    db = await createMemDB([User])
    userRepository = await db.getRepository(User)
    userService = new UserService(userRepository)
    authService = new AuthService(userService, new JwtService())
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('correct cred should return user', async () => {
    await userService.createUser({
      email: DEFAULT_EMAIL,
      password: DEFAULT_PASSWORD,
      firstName: 'firstName'
    })
    let user = await authService.validateUser(DEFAULT_EMAIL, DEFAULT_PASSWORD)
    expect(user).toBeDefined();
    let users = await userRepository.find();
    await userRepository.delete(users.map(u => u.id));
  });

  it('wrong cred should return null', async () => {
    await userService.createUser({
      email: DEFAULT_EMAIL,
      password: DEFAULT_PASSWORD,
      firstName: 'firstName'
    })
    let user = await authService.validateUser(DEFAULT_EMAIL, "wrongpass")
    expect(user).toBeNull();
    let users = await userRepository.find();
    await userRepository.delete(users.map(u => u.id));
  });
});
