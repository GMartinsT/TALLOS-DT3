import { Test, TestingModule } from '@nestjs/testing';
import { TheatersService } from './theaters.service';
import { Theater } from './schemas/theaters.schema';


describe('UserService', () => {
    let theatersService: TheatersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [{
                provide: TheatersService,
                useValue: {
                    findAll: jest.fn().mockResolvedValue([Theater]),
                    findOne: jest.fn().mockResolvedValue(Theater),
                    findByEmail: jest.fn().mockResolvedValue(Theater),
                    create: jest.fn().mockResolvedValue(Theater),
                    update: jest.fn().mockResolvedValue(Theater),
                    remove: jest.fn().mockResolvedValue(true),
                },
            },],
        }).compile();

        theatersService = module.get<TheatersService>(TheatersService);
    });

    it('should be defined', () => {
        expect(theatersService).toBeDefined();
    });

    describe('findAll', () => {
        it('deve retornar uma lista de usuários', async () => {
            const result = await theatersService.findAll();
            
            expect(result).toEqual([Theater]);
            expect(typeof result).toEqual('object');
            expect(theatersService.findAll).toHaveBeenCalledTimes(1);
        });

        it('deve lançar uma exceção', async () => {
            jest.spyOn(theatersService, 'findAll').mockRejectedValueOnce(new Error('!ERRO!'));

            await expect(theatersService.findAll()).rejects.toThrowError('!ERRO!');
        });
    });

    describe('findOne', () => {
        it('deve retornar os dados do usuário', async () => {
            const id = '123id';
            const result = await theatersService.findOne(id);
            expect(result).toEqual(Theater);
            expect(theatersService.findOne).toHaveBeenCalledTimes(1);
        });

        it('deve lançar uma exceção', async () => {
            const id = '123id';
            jest
                .spyOn(theatersService, 'findOne')
                .mockRejectedValueOnce(new Error('!ERRO!'));

            await expect(theatersService.findOne(id)).rejects.toThrowError('!ERRO!');
        });
    });

    describe('create', () => {
        it('deve criar um novo usuário', async () => {
            const body = {
                theaterId: 1234,
                location: {
                    "address": {
                        "street1": "4325 Sunset Dr",
                        "city": "San Angelo",
                        "state": "TX",
                        "zipcode": "76904"
                    },
                    "geo": {
                        "type": "Point",
                        "coordinates": [
                            -100.50107,
                            31.435648
                        ]
                    }
                }
            };
            const result = await theatersService.create(body);
            expect(result).toEqual(Theater);
            expect(theatersService.create).toHaveBeenCalledTimes(1);
            expect(theatersService.create).toHaveBeenCalledWith(body);
        });

        it('should throw an exception', async () => {
            const body = {
                theaterId: 1234,
                location: {
                    "address": {
                        "street1": "4325 Sunset Dr",
                        "city": "San Angelo",
                        "state": "TX",
                        "zipcode": "76904"
                    },
                    "geo": {
                        "type": "Point",
                        "coordinates": [
                            -100.50107,
                            31.435648
                        ]
                    }
                }
            };
            jest
                .spyOn(theatersService, 'create')
                .mockRejectedValueOnce(new Error('!ERRO!'));

            await expect(theatersService.create(body)).rejects.toThrowError('!ERRO!');
        });
    });

    describe('update', () => {
        it('should update a user by id', async () => {
            const body = {
                theaterId: 1234,
                location: {
                    "address": {
                        "street1": "4325 Sunset Dr",
                        "city": "San Angelo",
                        "state": "TX",
                        "zipcode": "76904"
                    },
                    "geo": {
                        "type": "Point",
                        "coordinates": [
                            -100.50107,
                            31.435648
                        ]
                    }
                }
            };
            const id = 'id123';
            const result = await theatersService.update(id, body)
            expect(result).toEqual(Theater);
            expect(theatersService.update).toHaveBeenCalledTimes(1);
        });

        it('should throw an exception', async () => {
            const body = {
                theaterId: 1234,
                location: {
                    "address": {
                        "street1": "4325 Sunset Dr",
                        "city": "San Angelo",
                        "state": "TX",
                        "zipcode": "76904"
                    },
                    "geo": {
                        "type": "Point",
                        "coordinates": [
                            -100.50107,
                            31.435648
                        ]
                    }
                }
            };
            const id = '123id';
            jest
                .spyOn(theatersService, 'update')
                .mockRejectedValueOnce(new Error('!ERRO!'));

            await expect(theatersService.update(id, body)).rejects.toThrowError('!ERRO!');
        });
    });

    describe('remove', () => {
        it('should remove a user by id', async () => {
            const id = '123id';
            const result = await theatersService.remove(id)
            expect(result).toEqual(true);
            expect(theatersService.remove).toHaveBeenCalledTimes(1);
        });

        it('should throw an exception', async () => {
            const id = '123id';
            jest
                .spyOn(theatersService, 'remove')
                .mockRejectedValueOnce(new Error('!ERRO!'));

            await expect(theatersService.remove(id)).rejects.toThrowError('!ERRO!');
        });
    });
});
