import { Test, TestingModule } from '@nestjs/testing';
import { CommentService } from './comments.service';
import { Comment } from './schemas/comments.schema';

describe('CommentService', () => {
  let commentService: CommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CommentService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([Comment]),
            findOne: jest.fn().mockResolvedValue(Comment),
            findByEmail: jest.fn().mockResolvedValue(Comment),
            create: jest.fn().mockResolvedValue(Comment),
            update: jest.fn().mockResolvedValue(Comment),
            remove: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    commentService = module.get<CommentService>(CommentService);
  });

  describe('findAll', () => {
    it('deve retornar uma lista de comentários', async () => {
      const result = await commentService.findAll();
      jest.spyOn(commentService, 'findAll').mockResolvedValue(result);

      expect(result).toEqual([Comment]);
      expect(typeof result).toEqual('object');
      expect(commentService.findAll).toHaveBeenCalledTimes(1);
    });

    it('deve lançar uma exeção', async () => {
      jest
        .spyOn(commentService, 'findAll')
        .mockRejectedValueOnce(new Error('!ERRO!'));

      await expect(commentService.findAll()).rejects.toThrowError('!ERRO!');
    });
  });

  describe('findOne', () => {
    it('deve retornar os dados de um comntário', async () => {
      const id = '123id';
      const result = await commentService.findOne(id);
      expect(result).toEqual(Comment);
      expect(commentService.findOne).toHaveBeenCalledTimes(1);
    });

    it('deve lançar uma exeção', async () => {
      const id = '123id';
      jest
        .spyOn(commentService, 'findOne')
        .mockRejectedValueOnce(new Error('!ERRO!'));

      await expect(commentService.findOne(id)).rejects.toThrowError('!ERRO!');
    });
  });

  describe('create', () => {
    it('deve criar um novo comentário', async () => {
      const body = {
        name: 'Teste1',
        email: 'teste1@mail.com',
        movie_id: '123id',
        text: 'comment text',
        date: new Date(),
      };
      const result = await commentService.create(body);
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
        date: new Date(),
      };
      jest
        .spyOn(commentService, 'create')
        .mockRejectedValueOnce(new Error('!ERRO!'));

      await expect(commentService.create(body)).rejects.toThrowError('!ERRO!');
    });
  });

  describe('update', () => {
    it('deve atualizar um comntário', async () => {
      const body = {
        name: 'Teste1',
        email: 'teste1@mail.com',
        movie_id: '123id',
        text: 'comment text',
        date: new Date(),
      };
      const id = 'id123';
      const result = await commentService.update(id, body);
      expect(result).toEqual(Comment);
      expect(commentService.update).toHaveBeenCalledTimes(1);
    });

    it('deve lançar uma exeção', async () => {
      const body = {
        name: 'Teste1',
        email: 'teste1@mail.com',
        movie_id: '123id',
        text: 'comment text',
        date: new Date(),
      };
      const id = '123id';
      jest
        .spyOn(commentService, 'update')
        .mockRejectedValueOnce(new Error('!ERRO!'));

      await expect(commentService.update(id, body)).rejects.toThrowError(
        '!ERRO!',
      );
    });
  });

  describe('remove', () => {
    it('deve excluir um comentário', async () => {
      const id = '123id';
      const result = await commentService.remove(id);
      expect(result).toEqual(true);
      expect(commentService.remove).toHaveBeenCalledTimes(1);
    });

    it('deve lançar uma exeção', async () => {
      const id = '123id';
      jest
        .spyOn(commentService, 'remove')
        .mockRejectedValueOnce(new Error('!ERRO!'));

      await expect(commentService.remove(id)).rejects.toThrowError('!ERRO!');
    });
  });
});
