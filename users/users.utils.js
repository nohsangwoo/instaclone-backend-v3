import jwt from 'jsonwebtoken';
import client from '../client';

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    // 토근을 복호화 하고 추출(id를 jsonwebtoken으로 암호화 했으니 복호화 해도 id가 담겨있음)
    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
    // 복호화된 id를 이용하여 user를 찾아서 반환
    const user = await client.user.findUnique({ where: { id } });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export function protectedResolver(ourResolver) {
  return function (root, args, context, info) {
    // 전달받은 로그인한 사람의정보(loggedInUser)가 없다면 에러 핸들링
    if (!context.loggedInUser) {
      const query = info.operation.operation === 'query';
      if (query) {
        return null;
      } else {
        return {
          ok: false,
          error: 'Please log in to perform this action.',
        };
      }
    }
    // 로그인이 정상적으로 됐다면 전달받은 함수를 실행함
    return ourResolver(root, args, context, info);
  };
}
