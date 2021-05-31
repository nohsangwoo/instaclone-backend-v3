import client from '../../client';

export default {
  Query: {
    seePhotoComments: (_, { id }) =>
      client.comment.findMany({
        where: {
          photoId: id,
        },
        include: {
          user: true,
        },
        orderBy: {
          createdAt: 'asc',
        },
      }),
  },
};
