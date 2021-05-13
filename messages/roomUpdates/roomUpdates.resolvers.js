import { withFilter } from 'apollo-server';
import client from '../../client';
import { NEW_MESSAGE } from '../../constants';
import pubsub from '../../pubsub';

export default {
  // subscriptions의 패턴을 익혀라
  Subscription: {
    roomUpdates: {
      // resolver형식으로 구현
      subscribe: async (root, args, context, info) => {
        // 리스닝을 시작하기전에 로그인한 유저가 해당 방의 멤버가 맞는지 확인하는 작업
        // 해당 방의 멤버가 맞다면 roomid를 되돌려 받음
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
        // 해당 방의 멤버가 아니라면 리스닝 권한 없음 에러 핸들링
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
          // 이 함수는 sendMessage에서  pubsub.publish로 트리거가 건들여 질때 실행되는 함수
          async ({ roomUpdates }, { id }, { loggedInUser }) => {
            // 만약 event를 준 room을 리스닝 하고있다면(subscriptions 하고있는 대상의 roomId와 subscriptions의 결과로 반환받은 id가 같다면  ==> 무결성 확인하는 작업)
            // 리스닝하고 있는 room이 우리에게 event를 준 room이 맞는지 확인해야함
            // 해당 방의 멤버가 맞는지 확인하는 작업임(헤당 room에서 users의 목록중 로그인한 유저의 id가 존재한다면 roomId를 반환)
            if (roomUpdates.roomId === id) {
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
              // 해당방의 멤버가 아니라는 결과가 나오면 false반환
              if (!room) {
                return false;
              }
              // 해당방의 멤버가 맞다는 결과가 나오면 true반환
              return true;
            }
          }
          // 이 resolver의 (root, args, context, info)를 withFilter로 보내줌
          // 고차함수처럼 처리되는 방식 대신 상위 함수에서 전달받은 값이 아님
        )(root, args, context, info);
      },
    },
  },
};
