import client from '../../client';
import { protectedResolver } from '../../users/users.utils';

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        if (caption) {
          // 정규 표현식(match로 정규표현식에 해당하는 단어를 모두 추출하여 배열로 반환한다)
          // #으로 시작하는 모든 단어
          const hashtags = caption.match(/#[\w]+/g);
        }
        client.photo.create({
          data: {
            file,
            caption,
            hashtags: {
              // 입력받은 hashtag로 검색하서 존재하면 연결하고
              // 없으면 새로 만든 후 연결한다
              connectOrCreate: [
                {
                  where: {
                    hashtag: '#food',
                  },
                  create: {
                    hashtag: '#food',
                  },
                },
              ],
            },
          },
        });
      }
    ),
  },
};
