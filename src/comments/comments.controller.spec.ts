import { Test, TestingModule } from '@nestjs/testing';
import { CommentController } from './comments.controller';
import { CommentService } from './comments.service';
import { Comment } from './schemas/comments.schema';


describe('CommentController', () => {
    let commentController: CommentController;
    let commentService: CommentService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CommentController],
            providers: [{
                provide: CommentService,
                useValue: {
                    findAll: jest.fn().mockResolvedValue([Comment]),
                    findOne: jest.fn().mockResolvedValue(Comment),
                    findByEmail: jest.fn().mockResolvedValue(Comment),
                    create: jest.fn().mockResolvedValue(Comment),
                    update: jest.fn().mockResolvedValue(Comment),
                    remove: jest.fn().mockResolvedValue(true),
                },
            },],
        }).compile();

        commentController = module.get<CommentController>(CommentController);
        commentService = module.get<CommentService>(CommentService);
    });

    describe('findAll', () => {
        it('deve retornar uma lista de comentários', async () => {
            const result = await commentController.findAll();
            jest.spyOn(commentService, 'findAll').mockResolvedValue(result);

            expect(result).toEqual([Comment]);
            expect(typeof result).toEqual('object');
            expect(commentService.findAll).toHaveBeenCalledTimes(1);
        });

        it('deve lançar uma exceção', async () => {
            jest
                .spyOn(commentService, 'findAll')
                .mockRejectedValueOnce(new Error('!ERRO!'));

            await expect(commentController.findAll()).rejects.toThrowError('!ERRO!');
        });

    });

    describe('findOne', () => {
        it('deve retornar os dados de um comentário', async () => {
            const id = '123id';
            const result = await commentController.findOne(id);
            expect(result).toEqual(Comment);
            expect(commentService.findOne).toHaveBeenCalledTimes(1);
        });

        it('deve lançar uma exeção', async () => {
            const id = '123id';
            jest
                .spyOn(commentService, 'findOne')
                .mockRejectedValueOnce(new Error('!ERRO!'));

            await expect(commentController.findOne(id)).rejects.toThrowError('!ERRO!');
        });
    });

    describe('create', () => {
        it('deve criar um comentário', async () => {
            const body = {
                name: 'Teste1',
                email: 'teste1@mail.com',
                movie_id: '123id',
                text: 'comment text',
                date: new Date()
            }
            const result = await commentController.create(body);
            expect(result).toEqual(Comment);
            expect(commentService.create).toHaveBeenCalledTimes(1);
            expect(commentService.create).toHaveBeenCalledWith(body);
        });

        it('deve lançar uma exeção', async () => {
            const body = {
                name: 'Teste1',
                email: 'teste1@mail.com',
                movie_id: '123id',
                text: 'comment text',
                date: new Date()
            }
            jest
                .spyOn(commentService, 'create')
                .mockRejectedValueOnce(new Error('!ERRO!'));

            await expect(commentController.create(body)).rejects.toThrowError('!ERRO!');
        });
    });

    describe('update', () => {
        it('deve atualizar um comentário', async () => {
            const body = {
                name: 'Teste1',
                email: 'teste1@mail.com',
                movie_id: '123id',
                text: 'comment text',
                date: new Date()
            }
            const id = 'id123';
            const result = await commentService.update(id, body)
            expect(result).toEqual(Comment);
            expect(commentService.update).toHaveBeenCalledTimes(1);
        });

        it('deve lançar uma exeção', async () => {
            const body = {
                name: 'Teste1',
                email: 'teste1@mail.com',
                movie_id: '123id',
                text: 'comment text',
                date: new Date()
            }
            const id = '123id';
            jest
                .spyOn(commentService, 'update')
                .mockRejectedValueOnce(new Error('!ERRO!'));

            await expect(commentController.update(id, body)).rejects.toThrowError('!ERRO!');
        });
    });

    describe('remove', () => {
        it('deve excluir um comentário', async () => {
            const id = '123id';
            const result = await commentService.remove(id)
            expect(result).toEqual(true);
            expect(commentService.remove).toHaveBeenCalledTimes(1);
        });

        it('deve lançar uma exeção', async () => {
            const id = '123id';
            jest
                .spyOn(commentService, 'remove')
                .mockRejectedValueOnce(new Error('!ERRO!'));

            await expect(commentController.remove(id)).rejects.toThrowError('!ERRO!');
        });
    });
});
