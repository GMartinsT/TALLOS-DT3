import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { Movie } from './schemas/movies.schema';

describe('MoviesService', () => {
  let moviesService: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: MoviesService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([Movie]),
            findById: jest.fn().mockResolvedValue(Movie),
            create: jest.fn().mockResolvedValue(Movie),
            update: jest.fn().mockResolvedValue(Movie),
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    moviesService = module.get<MoviesService>(MoviesService);
  });

  describe('findAllMovies', () => {
    it('deve retornar uma lista de filmes', async () => {
      const result = await moviesService.findAll();
      jest.spyOn(moviesService, 'findAll').mockResolvedValue(result);

      expect(result).toEqual([Movie]);
      expect(typeof result).toEqual('object');
      expect(moviesService.findAll).toHaveBeenCalledTimes(1);
    });

    it('deve lançar uma exeção', async () => {
      jest
        .spyOn(moviesService, 'findAll')
        .mockRejectedValueOnce(new Error('!ERRO!'));

      await expect(moviesService.findAll()).rejects.toThrowError('!ERRO!');
    });
  });

  describe('findMovieById', () => {
    it('deve retornar os dados do filme', async () => {
      const id = '123id';
      const result = await moviesService.findById(id);
      expect(result).toEqual(Movie);
      expect(moviesService.findById).toHaveBeenCalledTimes(1);
    });

    it('deve lançar uma exeção', async () => {
      const id = '123id';
      jest
        .spyOn(moviesService, 'findById')
        .mockRejectedValueOnce(new Error('!ERRO!'));

      await expect(moviesService.findById(id)).rejects.toThrowError('!ERRO!');
    });
  });

  describe('createMovie', () => {
    it('deve criar um novo filme', async () => {
      const body = {
        plot: 'A group of bandits stage a brazen train hold-up, only to find a determined posse hot on their heels.',
        genres: ['Short', 'Western'],
        runtime: 11,
        cast: [
          'A.C. Abadie',
          "Gilbert M. 'Broncho Billy' Anderson",
          'George Barnes',
          'Justus D. Barnes',
        ],
        poster:
          'https://m.media-amazon.com/images/M/MV5BMTU3NjE5NzYtYTYyNS00MDVmLWIwYjgtMmYwYWIxZDYyNzU2XkEyXkFqcGdeQXVyNzQzNzQxNzI@._V1_SY1000_SX677_AL_.jpg',
        title: 'The Great Train Robbery',
        fullplot:
          "Among the earliest existing films in American cinema - notable as the first film that presented a narrative story to tell - it depicts a group of cowboy outlaws who hold up a train and rob the passengers. They are then pursued by a Sheriff's posse. Several scenes have color included - all hand tinted.",
        languages: ['English'],
        released: new Date('-2085523200000'),
        directors: ['Edwin S. Porter'],
        rated: 'TV-G',
        awards: {
          wins: 1,
          nominations: 0,
          text: '1 win.',
        },
        lastupdated: '2015-08-13 00:27:59.177000000',
        year: 1903,
        imdb: {
          rating: 7.4,
          votes: 9847,
          id: 439,
        },
        countries: ['USA'],
        type: 'movie',
        tomatoes: {
          viewer: {
            rating: 3.7,
            numReviews: 2559,
            meter: 75,
          },
          fresh: 6,
          critic: {
            rating: 7.6,
            numReviews: 6,
            meter: 100,
          },
          rotten: 0,
          lastUpdated: {
            $date: '2015-08-08T19:16:10.000Z',
          },
        },
      };
      const result = await moviesService.create(body);
      expect(result).toEqual(Movie);
      expect(moviesService.create).toHaveBeenCalledTimes(1);
      expect(moviesService.create).toHaveBeenCalledWith(body);
    });

    it('deve lançar uma exeção', async () => {
      const body = {
        plot: 'A group of bandits stage a brazen train hold-up, only to find a determined posse hot on their heels.',
        genres: ['Short', 'Western'],
        runtime: 11,
        cast: [
          'A.C. Abadie',
          "Gilbert M. 'Broncho Billy' Anderson",
          'George Barnes',
          'Justus D. Barnes',
        ],
        poster:
          'https://m.media-amazon.com/images/M/MV5BMTU3NjE5NzYtYTYyNS00MDVmLWIwYjgtMmYwYWIxZDYyNzU2XkEyXkFqcGdeQXVyNzQzNzQxNzI@._V1_SY1000_SX677_AL_.jpg',
        title: 'The Great Train Robbery',
        fullplot:
          "Among the earliest existing films in American cinema - notable as the first film that presented a narrative story to tell - it depicts a group of cowboy outlaws who hold up a train and rob the passengers. They are then pursued by a Sheriff's posse. Several scenes have color included - all hand tinted.",
        languages: ['English'],
        released: new Date('-2085523200000'),
        directors: ['Edwin S. Porter'],
        rated: 'TV-G',
        awards: {
          wins: 1,
          nominations: 0,
          text: '1 win.',
        },
        lastupdated: '2015-08-13 00:27:59.177000000',
        year: 1903,
        imdb: {
          rating: 7.4,
          votes: 9847,
          id: 439,
        },
        countries: ['USA'],
        type: 'movie',
        tomatoes: {
          viewer: {
            rating: 3.7,
            numReviews: 2559,
            meter: 75,
          },
          fresh: 6,
          critic: {
            rating: 7.6,
            numReviews: 6,
            meter: 100,
          },
          rotten: 0,
          lastUpdated: {
            $date: '2015-08-08T19:16:10.000Z',
          },
        },
      };
      jest
        .spyOn(moviesService, 'create')
        .mockRejectedValueOnce(new Error('!ERRO!'));

      await expect(moviesService.create(body)).rejects.toThrowError('!ERRO!');
    });
  });

  describe('updateMovie', () => {
    it('deve atualizar um filme', async () => {
      const body = {
        plot: 'A group of bandits stage a brazen train hold-up, only to find a determined posse hot on their heels.',
        genres: ['Short', 'Western'],
        runtime: 11,
        cast: [
          'A.C. Abadie',
          "Gilbert M. 'Broncho Billy' Anderson",
          'George Barnes',
          'Justus D. Barnes',
        ],
        poster:
          'https://m.media-amazon.com/images/M/MV5BMTU3NjE5NzYtYTYyNS00MDVmLWIwYjgtMmYwYWIxZDYyNzU2XkEyXkFqcGdeQXVyNzQzNzQxNzI@._V1_SY1000_SX677_AL_.jpg',
        title: 'The Great Train Robbery',
        fullplot:
          "Among the earliest existing films in American cinema - notable as the first film that presented a narrative story to tell - it depicts a group of cowboy outlaws who hold up a train and rob the passengers. They are then pursued by a Sheriff's posse. Several scenes have color included - all hand tinted.",
        languages: ['English'],
        released: new Date('-2085523200000'),
        directors: ['Edwin S. Porter'],
        rated: 'TV-G',
        awards: {
          wins: 1,
          nominations: 0,
          text: '1 win.',
        },
        lastupdated: '2015-08-13 00:27:59.177000000',
        year: 1903,
        imdb: {
          rating: 7.4,
          votes: 9847,
          id: 439,
        },
        countries: ['USA'],
        type: 'movie',
        tomatoes: {
          viewer: {
            rating: 3.7,
            numReviews: 2559,
            meter: 75,
          },
          fresh: 6,
          critic: {
            rating: 7.6,
            numReviews: 6,
            meter: 100,
          },
          rotten: 0,
          lastUpdated: {
            $date: '2015-08-08T19:16:10.000Z',
          },
        },
      };
      const id = 'id123';
      const result = await moviesService.update(id, body);
      expect(result).toEqual(Movie);
      expect(moviesService.update).toHaveBeenCalledTimes(1);
    });

    it('deve lançar uma exeção', async () => {
      const body = {
        plot: 'A group of bandits stage a brazen train hold-up, only to find a determined posse hot on their heels.',
        genres: ['Short', 'Western'],
        runtime: 11,
        cast: [
          'A.C. Abadie',
          "Gilbert M. 'Broncho Billy' Anderson",
          'George Barnes',
          'Justus D. Barnes',
        ],
        poster:
          'https://m.media-amazon.com/images/M/MV5BMTU3NjE5NzYtYTYyNS00MDVmLWIwYjgtMmYwYWIxZDYyNzU2XkEyXkFqcGdeQXVyNzQzNzQxNzI@._V1_SY1000_SX677_AL_.jpg',
        title: 'The Great Train Robbery',
        fullplot:
          "Among the earliest existing films in American cinema - notable as the first film that presented a narrative story to tell - it depicts a group of cowboy outlaws who hold up a train and rob the passengers. They are then pursued by a Sheriff's posse. Several scenes have color included - all hand tinted.",
        languages: ['English'],
        released: new Date('-2085523200000'),
        directors: ['Edwin S. Porter'],
        rated: 'TV-G',
        awards: {
          wins: 1,
          nominations: 0,
          text: '1 win.',
        },
        lastupdated: '2015-08-13 00:27:59.177000000',
        year: 1903,
        imdb: {
          rating: 7.4,
          votes: 9847,
          id: 439,
        },
        countries: ['USA'],
        type: 'movie',
        tomatoes: {
          viewer: {
            rating: 3.7,
            numReviews: 2559,
            meter: 75,
          },
          fresh: 6,
          critic: {
            rating: 7.6,
            numReviews: 6,
            meter: 100,
          },
          rotten: 0,
          lastUpdated: {
            $date: '2015-08-08T19:16:10.000Z',
          },
        },
      };
      const id = '123id';
      jest
        .spyOn(moviesService, 'update')
        .mockRejectedValueOnce(new Error('!ERRO!'));

      await expect(moviesService.update(id, body)).rejects.toThrowError(
        '!ERRO!',
      );
    });
  });

  describe('remove', () => {
    it('deve excluir um filme', async () => {
      const id = '123id';
      const result = await moviesService.delete(id);
      expect(result).toEqual(true);
      expect(moviesService.delete).toHaveBeenCalledTimes(1);
    });

    it('deve lançar uma exeção', async () => {
      const id = '123id';
      jest
        .spyOn(moviesService, 'delete')
        .mockRejectedValueOnce(new Error('!ERRO!'));

      await expect(moviesService.delete(id)).rejects.toThrowError('!ERRO!');
    });
  });
});
