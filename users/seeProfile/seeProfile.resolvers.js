import client from '../../client';

export default {
  Query: {
    seeProfile: (root, { username }) => {
      // 여긴 prent가 없어서 root가 작동안함
      console.log('root의 루트', root);

      return client.user.findUnique({
        where: {
          username,
        },
        include: {
          following: true,
          followers: true,
        },
      });
    },
  },
};
