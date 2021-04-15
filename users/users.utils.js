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

export const protectedResolver = (ourResolver) => (
  root,
  args,
  context,
  info
) => {
  //유저가 로그인되지 않은 상태면(토큰이 없다면) 에러 메시지 띄움
  if (!context.loggedInUser) {
    return {
      ok: false,
      error: 'Please log in to perform this action.',
    };
  }
  // 유저가 로그인된 상태라면 전달받은 resolver를  실행시킴
  return ourResolver(root, args, context, info);
};
