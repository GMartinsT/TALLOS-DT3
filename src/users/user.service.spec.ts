import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';

describe('UserService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([User]),
            findOne: jest.fn().mockResolvedValue(User),
            findByEmail: jest.fn().mockResolvedValue(User),
            create: jest.fn().mockResolvedValue(User),
            update: jest.fn().mockResolvedValue(User),
            remove: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('findAll', () => {
    it('deve retornar uma lista de usuários', async () => {
      const result = await usersService.findAll();

      expect(result).toEqual([User]);
      expect(typeof result).toEqual('object');
      expect(usersService.findAll).toHaveBeenCalledTimes(1);
    });

    it('deve lançar uma exceção', async () => {
      jest
        .spyOn(usersService, 'findAll')
        .mockRejectedValueOnce(new Error('!ERRO!'));

      await expect(usersService.findAll()).rejects.toThrowError('!ERRO!');
    });
  });

  describe('findOne', () => {
    it('deve retornar os dados do usuário', async () => {
      const id = '123id';
      const result = await usersService.findOne(id);
      expect(result).toEqual(User);
      expect(usersService.findOne).toHaveBeenCalledTimes(1);
    });

    it('deve lançar uma exceção', async () => {
      const id = '123id';
      jest
        .spyOn(usersService, 'findOne')
        .mockRejectedValueOnce(new Error('!ERRO!'));

      await expect(usersService.findOne(id)).rejects.toThrowError('!ERRO!');
    });
  });

  describe('create', () => {
    it('deve criar um novo usuário', async () => {
      const body = {
        name: 'Teste1',
        email: 'teste1@mail.com',
        password: '1234',
      };
      const result = await usersService.create(body);
      expect(result).toEqual(User);
      expect(usersService.create).toHaveBeenCalledTimes(1);
      expect(usersService.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', async () => {
      const body = {
        name: 'Teste',
        email: 'teste@gmail.com',
        password: '1234',
      };
      jest
        .spyOn(usersService, 'create')
        .mockRejectedValueOnce(new Error('!ERRO!'));

      await expect(usersService.create(body)).rejects.toThrowError('!ERRO!');
    });
  });

  describe('update', () => {
    it('should update a user by id', async () => {
      const body = {
        name: 'Teste',
        email: 'teste@gmail.com',
        password: '1234',
      };
      const id = 'id123';
      const result = await usersService.update(id, body);
      expect(result).toEqual(User);
      expect(usersService.update).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', async () => {
      const body = {
        name: 'Teste',
        email: 'teste@gmail.com',
        password: '1234',
      };
      const id = '123id';
      jest
        .spyOn(usersService, 'update')
        .mockRejectedValueOnce(new Error('!ERRO!'));

      await expect(usersService.update(id, body)).rejects.toThrowError(
        '!ERRO!',
      );
    });
  });

  describe('remove', () => {
    it('should remove a user by id', async () => {
      const id = '123id';
      const result = await usersService.remove(id);
      expect(result).toEqual(true);
      expect(usersService.remove).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', async () => {
      const id = '123id';
      jest
        .spyOn(usersService, 'remove')
        .mockRejectedValueOnce(new Error('!ERRO!'));

      await expect(usersService.remove(id)).rejects.toThrowError('!ERRO!');
    });
  });
});
