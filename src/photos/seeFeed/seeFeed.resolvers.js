import client from '../../client';
import { protectedResolver } from '../../users/users.utils';

export default {
  Query: {
    seeFeed: protectedResolver((_, { offset }, { loggedInUser }) =>
      client.photo.findMany({
        // 2개의 data만 가져온다
        take: 2,
        // offset만큼 data를 skip한다
        skip: offset,
        where: {
          OR: [
            {
              // 나를 follow하는 모든 user의 feed
              user: {
                followers: {
                  some: {
                    id: loggedInUser.id,
                  },
                },
              },
            },
            // 내 feed
            {
              userId: loggedInUser.id,
            },
          ],
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
    ),
  },
};
