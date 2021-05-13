import { withFilter } from 'apollo-server';
import client from '../../client';
import { NEW_MESSAGE } from '../../constants';
import pubsub from '../../pubsub';

export default {
  Subscription: {
    roomUpdates: {
      subscribe: async (root, args, context, info) => {
        const room = await client.room.findFirst({
          where: {
            id: args.id,
            users: {
              some: {
                id: context.loggedInUser.id,
              },
            },
          },
          select: {
            id: true,
          },
        });
        // room이 존재하지 않으면, room을 리스닝하지 못하게 막는 기능
        if (!room) {
          throw new Error('You shall not see this.');
        }

        // 일단 위 과정을 먼저 실행 한다음 아래위 withFilter가 반환되는 순서임
        // 원래 subscribe의 반환되는 함수로 withFilter를 바로 사용해서 반환되는값을 처리해줘야하는데
        // 현재 subscribe는 resolver 형태로 구성되고 그 안에서 withFilter를 반환하면 에러가 남
        // 따라서 withFilter의 '실행 결과값(return값)'을 반환받기 위해 고차 함수 처리와 비슷하게 해결해준다
        // function이 또다른 function을 return 하는 것
        // 이런 패턴을 일단 그냥 외워라
        // 상위 컴포넌트에서 전달받지 않은 함수를 고차컴포넌트 형식으로 사용하고 싶을때 패턴
        return withFilter(
          // withFilter 첫번째 인자
          // NEW_MESSAGE가 트리거 역할을 해주고 해당 트리거가 연결된 곳에서 listening 하게 만들어줌
          () => pubsub.asyncIterator(NEW_MESSAGE),
          // withFilter 두번째 인자
          // 전달받은 id와 roomUpdates가 subscriptions 하고있는 곳에서 반환받는 roomId가 같은경우 실행됨
          // fillter function임
          // 아래의 조건에서만 작동한다는 뜻
          // roomUpdates은 구독하고 있는 sendMessage에서 실시간으로 전달 받고있는 roomId와 payload중 roomId에 관한 내용
          async ({ roomUpdates }, { id }, { loggedInUser }) => {
            if (roomUpdates.roomId === id) {
              // subscriptions 하고있는 대상의 roomId와 전달받은 id가 같고
              // 헤딩 room에서 users의 목록중 로그인한 유저의 id가 존재한다면 roomId를 반환
              const room = await client.room.findFirst({
                where: {
                  id,
                  users: {
                    some: {
                      id: loggedInUser.id,
                    },
                  },
                },
                select: {
                  id: true,
                },
              });
              if (!room) {
                return false;
              }
              return true;
            }
          }
          // 이 resolver의 (root, args, context, info)를 withFilter로 보내줌
        )(root, args, context, info);
      },
    },
  },
};
