import client from '../../client';

export default {
  Query: {
    searchUsers: async (_, { keyword }) =>
      client.user.findMany({
        where: {
          username: {
            //  toLowerCase: 검색어를 전부 소문자로 통일해줌
            startsWith: keyword.toLowerCase(),
          },
        },
      }),
  },
};
