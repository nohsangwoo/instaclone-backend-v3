import client from '../../client';
import { protectedResolver } from '../../users/users.utils';

export default {
  Mutation: {
    toggleLike: protectedResolver(async (_, { id }, { loggedInUser }) => {
      //전달받은 사진 id를 기준으로 photo에서 사진을 찾는다
      const photo = await client.photo.findUnique({
        where: {
          id,
        },
      });
      // 해당 사진이 없다면 사진을 찾을수 없다는 에러 핸들링
      if (!photo) {
        return {
          ok: false,
          error: 'Photo not found',
        };
      }

      // 위 photo 테이블에서 특정 사진을 찾았다면
      // 해당 사진을 찾은 photoId와  로그인한 유저의 id를 기준으로
      // like 테이블에서 어디에 like 했는지 찾는다(이미 like한 정보가 있다는 기준하에)
      // 여기선 조건만 만들어서 likeWhere라는 변수에 담아주기만함
      // 및에서 likeWhere를 가지고 사용할 것 임
      const likeWhere = {
        photoId_userId: {
          // 두 필드를 합쳐서 유니크한 값을 만들어냄
          userId: loggedInUser.id,
          photoId: id,
        },
      };

      // 위에서 만들어낸 조건(likeWhere)을 가지고 like테이블에서 값을 찾음
      const like = await client.like.findUnique({
        where: likeWhere,
      });

      // like를 찾았거나 못찾았을때 실행
      // like를 찾았다면 존재하는 like를 지운다
      if (like) {
        await client.like.delete({
          where: likeWhere,
        });
      } else {
        // like가 없다면 새로운 like정보를 만들어준다
        await client.like.create({
          // 이때 만드는 조건은
          data: {
            // 로그인한 유저에게 연결하고
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            // 전달받은 사진의 id에 연결한다
            photo: {
              connect: {
                id: photo.id,
              },
            },
          },
        });
      }
      return {
        ok: true,
      };
    }),
  },
};
