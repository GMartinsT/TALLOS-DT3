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
            providers: [{
                provide: UsersService,
                useValue: {
                    findAll: jest.fn().mockResolvedValue([User]),
                    findOne: jest.fn().mockResolvedValue(User),
                    findByEmail: jest.fn().mockResolvedValue(User),
                    create: jest.fn().mockResolvedValue(User),
                    update: jest.fn().mockResolvedValue(User),
                    remove: jest.fn().mockResolvedValue(true),
                },
            },],
        }).compile();

        usersController = module.get<UsersController>(UsersController);
        usersService = module.get<UsersService>(UsersService);
    });

    describe('findAll', () => {
        it('should return an array of users', async () => {
            const result = await usersController.findAll();
            jest.spyOn(usersService, 'findAll').mockResolvedValue(result);

            expect(result).toEqual([User]);
            expect(typeof result).toEqual('object');
            expect(usersService.findAll).toHaveBeenCalledTimes(1);
        });

        it('should throw an exception', async () => {
            jest
                .spyOn(usersService, 'findAll')
                .mockRejectedValueOnce(new Error('!ERRO!'));

            await expect(usersController.findAll()).rejects.toThrowError('!ERRO!');
        });

    });

    describe('findOne', () => {
        it('deve retornar os dados do usuário', async () => {
            const id = '123id';
            const result = await usersController.findOne(id);
            expect(result).toEqual(User);
            expect(usersService.findOne).toHaveBeenCalledTimes(1);
        });

        it('deve lançar uma exeção', async () => {
            const id = '123id';
            jest
                .spyOn(usersService, 'findOne')
                .mockRejectedValueOnce(new Error('!ERRO!'));

            await expect(usersController.findOne(id)).rejects.toThrowError('!ERRO!');
        });
    });

    describe('create', () => {
        it('should create a new user', async () => {
            const body = {
                name: 'Teste1',
                email: 'teste1@mail.com',
                password: '1234'
            }
            const result = await usersController.create(body);
            expect(result).toEqual(User);
            expect(usersService.create).toHaveBeenCalledTimes(1);
            expect(usersService.create).toHaveBeenCalledWith(body);
        });

        it('should throw an exception', async () => {
            const body = {
                name: 'Teste',
                email: 'teste@gmail.com',
                password: '1234'
            };
            jest
                .spyOn(usersService, 'create')
                .mockRejectedValueOnce(new Error('!ERRO!'));

            await expect(usersController.create(body)).rejects.toThrowError('!ERRO!');
        });
    });

    describe('update', () => {
        it('should update a user by id', async () => {
            const body = {
                name: 'Teste',
                email: 'teste@gmail.com',
                password: '1234'
            };
            const id = 'id123';
            const result = await usersService.update(id, body)
            expect(result).toEqual(User);
            expect(usersService.update).toHaveBeenCalledTimes(1);
        });

        it('should throw an exception', async () => {
            const body = {
                name: 'Teste',
                email: 'teste@gmail.com',
                password: '1234'
            };
            const id = '123id';
            jest
                .spyOn(usersService, 'update')
                .mockRejectedValueOnce(new Error('!ERRO!'));

            await expect(usersController.update(id, body)).rejects.toThrowError('!ERRO!');
        });
    });

    describe('remove', () => {
        it('should remove a user by id', async () => {
            const id = '123id';
            const result = await usersService.remove(id)
            expect(result).toEqual(true);
            expect(usersService.remove).toHaveBeenCalledTimes(1);
        });

        it('should throw an exception', async () => {
            const id = '123id';
            jest
                .spyOn(usersService, 'remove')
                .mockRejectedValueOnce(new Error('!ERRO!'));

            await expect(usersController.remove(id)).rejects.toThrowError('!ERRO!');
        });
    });
});
