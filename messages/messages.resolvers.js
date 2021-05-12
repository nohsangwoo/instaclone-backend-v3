import client from '../client';

export default {
  Room: {
    users: ({ id }) => client.room.findUnique({ where: { id } }).users(),
    messages: ({ id }) =>
      client.message.findMany({
        where: {
          roomId: id,
        },
      }),
    unreadTotal: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return 0;
      }
      //   message의 read:false이고 roomId:parentId 그리고, user의 id는 로그인한 유저의 id만 아니면됨
      return client.message.count({
        where: {
          read: false,
          roomId: id,
          user: {
            id: {
              //id: loggedInUser.id가 아닌 조건
              not: loggedInUser.id,
            },
          },
        },
      });
    },
  },
  Message: {
    user: ({ id }) => client.message.findUnique({ where: { id } }).user(),
  },
};
