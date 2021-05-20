import client from '../../client';
import { protectedResolver } from '../../users/users.utils';

export default {
  Mutation: {
    editComment: protectedResolver(
      // 수정하려는 comment의 id와, comment내용을  args로 받아오고 context로 loggedInUser정보를 받아온다
      async (_, { id, payload }, { loggedInUser }) => {
        // 먼저 해당 comment가 존재하는지부터 먼저 검색
        const comment = await client.comment.findUnique({
          where: {
            id,
          },
          // comment에서 userId의 내용만 가져온다.
          select: {
            userId: true,
          },
        });
        // comment가 없다면 에러 핸들링
        if (!comment) {
          return {
            ok: false,
            error: 'Comment not found.',
          };
          // 찾아낸 comment의 userId와 로그인한 유저의 id가 같지 않다면 권한없다는 내용의 에러 핸들링
        } else if (comment.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: 'Not authorized.',
          };
        } else {
          // 위 과정을 다 통과했다면 이제 comment에 업데이트
          await client.comment.update({
            where: {
              id,
            },
            data: {
              payload,
            },
          });
          return {
            ok: true,
          };
        }
      }
    ),
  },
};
