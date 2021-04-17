import client from '../../client';

export default {
  Query: {
    seeFollowers: async (_, { username, page }) => {
      const pageSize = 5;
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
      const followers = await client.user
        .findUnique({ where: { username } })
        .followers({
          take: pageSize,
          skip: (page - 1) * pageSize,
        });
        // count라는 prisma명령어를 이용하여 숫자를 세주기만함
        // 자원낭비를 막아줌
      const totalFollowers = await client.user.count({
        where: { following: { some: { username } } },
      });
      return {
        ok: true,
        followers,
        totalPages: Math.ceil(totalFollowers / pageSize),
      };
    },
  },
};
