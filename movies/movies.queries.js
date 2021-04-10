import client from '../client';
export default {
  Query: {
    movies: () => client.movie.findMany(), //정의된 movie 모두 검색
    movie: (_, { id }) => client.movie.findUnique({ where: id }),
  },
};
