import jwt from 'jsonwebtoken';
import client from '../client';

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
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
