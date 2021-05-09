import client from '../../client';

export default {
  Query: {
    seePhotoLikes: async (_, { id }) => {
      const likes = await client.like.findMany({
        // like테이블에서 특정 사진을 photoId로 다 찾아온후
        // 연결된 유저의 정보만 가져와서 보여준다
        where: {
          photoId: id,
        },
        select: {
          user: true,
        },
      });
      // 이때
      // [{like : { user : {id:1, name: "상우", fullname:노상우 ... } } },  {like : {user : {id:2, name:"상우2", fullname:"노상우2"...  }}}]
      // 이런형식으로 뽑히는데
      // [{ user : {id:1, name: "상우", fullname:노상우 ... } },{ user : {id:1, name: "상우", fullname:노상우 ... } }]
      // 이런 형식으로 뽑아주기 위해서 map을 사용하여 추출해줌
      return likes.map((like) => like.user);
    },
  },
};
