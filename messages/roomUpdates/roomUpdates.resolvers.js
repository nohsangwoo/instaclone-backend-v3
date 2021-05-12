import { withFilter } from 'apollo-server';
import client from '../../client';
import { NEW_MESSAGE } from '../../constants';
import pubsub from '../../pubsub';

export default {
  Subscription: {
    roomUpdates: {
      // asyncIterator가 트리거를 건들이도록 해줌 여기선 NEW_MESSAGE가 트리거고
      // 이걸 작동 시켜줌
      subscribe: withFilter(
        () => pubsub.asyncIterator(NEW_MESSAGE),
        ({ roomUpdates }, { id }) => {
          return roomUpdates.roomId === id;
        }
      ),
    },
  },
};
