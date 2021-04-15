import bcrypt from 'bcrypt';
import client from '../../client';
import jwt from 'jsonwebtoken';

export default {
  Mutation: {
    editProfile: async (
      _,
      { firstName, lastName, username, email, password: newPassword },
      { token }
    ) => {
      // jwt를 이용해 token으로 변경된 id를 다시 원본으로 돌려서 id를 추출해줌
      const { id } = await jwt.verify(token, process.env.SECRET_KEY);

      let uglyPassword = null;
      if (newPassword) {
        uglyPassword = await bcrypt.hash(newPassword, 10);
      }
      const updatedUser = await client.user.update({
        where: {
          id,
        },
        data: {
          firstName,
          lastName,
          username,
          email,
          ...(uglyPassword && { password: uglyPassword }),
        },
      });
      if (updatedUser.id) {
        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
          error: 'Could not update profile.',
        };
      }
    },
  },
};
