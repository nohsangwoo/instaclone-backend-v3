import client from '../../client';
import { protectedResolver } from '../../users/users.utils';

export default {
  Mutation: {
    createComment: protectedResolver(
      async (_, { photoId, payload }, { loggedInUser }) => {
        //   특정 사진을 찾고 해당 사진의 id만 가져와서 ok라는 변수에 담는다
        const ok = await client.photo.findUnique({
          where: {
            id: photoId,
          },
          select: {
            id: true,
          },
        });
        // 사진을 못찾았을때 에러 핸들링
        if (!ok) {
          return {
            ok: false,
            error: 'Photo not found.',
          };
        }
        // photo를 id 로 찾았을때 comment테이블의 row를 생성한다
        // payload(comment내용)을 전달받아서 저장하고
        // 찾아낸 photo와 연결하고 user를 로그인한 user와 연결한다
        await client.comment.create({
          data: {
            payload,
            photo: {
              connect: {
                id: photoId,
              },
            },
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
