import client from '../../client';

export default {
  Query: {
    seeFollowing: async (_, { username, lastId }) => {
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!ok) {
        return {
          ok: false,
          error: 'User not found',
        };
      }
      const following = await client.user
        .findUnique({ where: { username } })
        .following({
          take: 5,
          // lastId 이후의 내용을 끌어옴 다만 이때 1만큼 skip을 해주어야
          //  lastId의 중복을 피해줄수있음
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });
      return {
        ok: true,
        following,
      };
    },
  },
};
