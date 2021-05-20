import client from '../../client';
import { protectedResolver } from '../../users/users.utils';

export default {
  Mutation: {
    readMessage: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const message = await client.message.findFirst({
        where: {
          // 전달받은 메시지 Id로 정말 메시지가 존재하는지 확인
          id,
          // 내가 그 메시지를 보낸 사용자가 아닐때
          userId: {
            not: loggedInUser.id,
          },
          //   내가 해당 대확방에 들어가져있는 상태인지 확인
          room: {
            users: {
              some: {
                id: loggedInUser.id,
              },
            },
          },
        },
        // 위 조건을 통과하면 메시지를 수정할수있는 상태를 알리는 조건으로 메시지 id를 반환
        select: {
          id: true,
        },
      });

      // 메시지를 찾지 못했다면 에러 핸들링
      if (!message) {
        return {
          ok: false,
          error: 'Message not found.',
        };
      }

      // 메시지를 찾았다면 그다음
      // 메시지를 업데이트 해준다
      await client.message.update({
        // 전달받은 메시지 id에 업데이트하고
        where: {
          id,
        },
        // 수정할 field는 read이고 수정할 값은 false=> true
        data: {
          read: true,
        },
      });
      return {
        ok: true,
      };
    }),
  },
};
