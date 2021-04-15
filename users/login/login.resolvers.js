import bcrypt from 'bcrypt';
import client from '../../client';
import jwt from 'jsonwebtoken';

export default {
  Mutation: {
    login: async (_, { username, password }) => {
      // 로그인시 최초 로그인 이름이 존재하는지 검사
      const user = await client.user.findFirst({
        where: {
          username,
        },
      });
      // 로그인 이름이 검색안딘다면 찾을수 없다고하고 에러메시지 반환
      if (!user) {
        return {
          ok: false,
          error: 'User not found.',
        };
      }
      // 위 단계에서 로그인 아이디가 존재한다면 가입할때
      // DB에 저장된 해쉬화된 비밀번호를 bcrypt를 이용하여 로그인시 입력된 비밀번호와 비교하여 passwordOk에 저장한다
      // 결과값이 같으면 true 틀리면 false를반환한다
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: 'Incorrect password',
        };
      }
      // bcrypt를 이용하여 비밀번호도 같다고 판단되면 token을 jsonwebtoken라이브러리를 이용하여 생성하고 해당 토큰을 반환해준다.
      const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      return {
        ok: true,
        token,
      };
    },
  },
};
