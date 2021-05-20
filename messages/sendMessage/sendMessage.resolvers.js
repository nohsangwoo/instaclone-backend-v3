import client from '../../client';
import { NEW_MESSAGE } from '../../constants';
import pubsub from '../../pubsub';
import { protectedResolver } from '../../users/users.utils';

export default {
  Mutation: {
    sendMessage: protectedResolver(
      async (_, { payload, roomId, userId }, { loggedInUser }) => {
        let room = null;
        // 전달받은 유저가 실제 존재하는지 찾아봄
        if (userId) {
          const user = await client.user.findUnique({
            where: {
              id: userId,
            },
            select: {
              id: true,
            },
          });
          //   유저 못찾으면 에러 핸들링
          if (!user) {
            return {
              ok: false,
              error: 'This user does not exist.',
            };
          }
          //   위 단계를 통과한 경우 방을 새로 생성한다.
          room = await client.room.create({
            data: {
              users: {
                connect: [
                  {
                    id: userId,
                  },
                  {
                    id: loggedInUser.id,
                  },
                ],
              },
            },
          });
          //   또는 전달받은 유저가 없고 이미 방이 있는경우 방을 찾아 해당 id를 가져온다
        } else if (roomId) {
          room = await client.room.findUnique({
            where: {
              id: roomId,
            },
            select: {
              id: true,
            },
          });
          //   룸id를 전달받았지만 룸을 찾을 수없는 경우 에러 핸들링
          if (!room) {
            return {
              ok: false,
              error: 'Room not found.',
            };
          }
        }
        //  (내가)보낼 메시지를 생성하고 room과 로그인한 user에 각각 연결해준다
        const message = await client.message.create({
          data: {
            payload,
            room: {
              connect: {
                id: room.id,
              },
            },
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
          },
        });
        // subscription을 위한 pubsub의 사용 방법 (roomUpdates은 subscriptions에서 정의된 이름)
        // console.log(message);
        pubsub.publish(NEW_MESSAGE, { roomUpdates: { ...message } });
        return {
          ok: true,
          id: message.id,
        };
      }
    ),
  },
};
