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
      //   모든 user들중 username이 전달받은 username의 값이랑 같은 결과값을 검색하고
      // 해당 결과값에서 followers의 값을 가져오는데 followers의 값을 가져오는 조건이
      //take는 한번에 가져오는 결과양의 값이고,skip은 앞에 건너띄는 값의 양
      const followers = await client.user
        .findUnique({ where: { username } })
        .followers({
          take: pageSize,
          skip: (page - 1) * pageSize,
        });
      // count라는 prisma명령어를 이용하여 숫자를 세주기만함
      // 자원낭비를 막아줌
      //  모든 user중 following list에 username이 포함되는 결과값을 count해줌
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
