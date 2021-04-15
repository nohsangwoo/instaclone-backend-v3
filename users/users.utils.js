import jwt from 'jsonwebtoken';
import client from '../client';


// 토큰화된 Id를 다시 verify하여 id를 추출하고 추출된 id로 유저정보를 불러온다
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
