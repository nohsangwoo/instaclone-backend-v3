import client from '../../client';
import { protectedResolver } from '../../users/users.utils';

export default {
  Query: {
    seeRoom: protectedResolver((_, { id }, { loggedInUser }) =>
      //findUnique는 단 한개의 컬럼으로만 검색하기때문에 findFirst로 대체
      client.room.findFirst({
        where: {
          id,
          users: {
            some: {
              id: loggedInUser.id,
            },
          },
        },
      })
    ),
  },
};
