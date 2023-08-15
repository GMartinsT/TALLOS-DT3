import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([User]),
            findById: jest.fn().mockResolvedValue(User),
            findByEmail: jest.fn().mockResolvedValue(User),
            create: jest.fn().mockResolvedValue(User),
            update: jest.fn().mockResolvedValue(User),
            remove: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('findAll', () => {
    it('deve retornar uma lista de usuários', async () => {
      const result = await usersController.findAll();
      jest.spyOn(usersService, 'findAll').mockResolvedValue(result);

      expect(result).toEqual([User]);
      expect(typeof result).toEqual('object');
      expect(usersService.findAll).toHaveBeenCalledTimes(1);
    });

    it('deve lançar uma exceção', async () => {
      jest
        .spyOn(usersService, 'findAll')
        .mockRejectedValueOnce(new Error('!ERRO!'));

      await expect(usersController.findAll()).rejects.toThrowError('!ERRO!');
    });
  });

  describe('findById', () => {
    it('deve retornar os dados do usuário', async () => {
      const id = '123id';
      const result = await usersController.findById(id);
      expect(result).toEqual(User);
      expect(usersService.findById).toHaveBeenCalledTimes(1);
    });

    it('deve lançar uma exeção', async () => {
      const id = '123id';
      jest
        .spyOn(usersService, 'findById')
        .mockRejectedValueOnce(new Error('!ERRO!'));

      await expect(usersController.findById(id)).rejects.toThrowError('!ERRO!');
    });
  });

  describe('create', () => {
    it('deve criar um novo usuário', async () => {
      const body = {
        name: 'Teste1',
        email: 'teste1@mail.com',
        password: '1234',
      };
      const result = await usersController.create(body);
      expect(result).toEqual(User);
      expect(usersService.create).toHaveBeenCalledTimes(1);
      expect(usersService.create).toHaveBeenCalledWith(body);
    });

    it('deve lançar uma exeção', async () => {
      const body = {
        name: 'Teste',
        email: 'teste@gmail.com',
        password: '1234',
      };
      jest
        .spyOn(usersService, 'create')
        .mockRejectedValueOnce(new Error('!ERRO!'));

      await expect(usersController.create(body)).rejects.toThrowError('!ERRO!');
    });
  });

  describe('update', () => {
    it('deve atualizar um usuário', async () => {
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

    it('deve lançar uma exeção', async () => {
      const body = {
        name: 'Teste',
        email: 'teste@gmail.com',
        password: '1234',
      };
      const id = '123id';
      jest
        .spyOn(usersService, 'update')
        .mockRejectedValueOnce(new Error('!ERRO!'));

      await expect(usersController.update(id, body)).rejects.toThrowError(
        '!ERRO!',
      );
    });
  });

  describe('remove', () => {
    it('deve excluir um usuário', async () => {
      const id = '123id';
      const result = await usersService.remove(id);
      expect(result).toEqual(true);
      expect(usersService.remove).toHaveBeenCalledTimes(1);
    });

    it('deve lançar uma exeção', async () => {
      const id = '123id';
      jest
        .spyOn(usersService, 'remove')
        .mockRejectedValueOnce(new Error('!ERRO!'));

      await expect(usersController.remove(id)).rejects.toThrowError('!ERRO!');
    });
  });
});
