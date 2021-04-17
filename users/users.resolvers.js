export default {
  User: {
    totalFollowing: (root) => {
      // root는 parent의 user
      //   즉 이걸 실행하는 상황의 볼려온 user를 말함
      console.log(root.username);
      return 0;
    },
    totalFollowers: () => 999,
  },
};
