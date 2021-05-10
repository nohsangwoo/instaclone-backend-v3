export const processHashtags = (caption) => {
  // 정규식
  const hashtags = caption.match(/#[\w]+/g) || [];
  return hashtags.map((hashtag) => ({
    where: { hashtag },
    create: { hashtag },
  }));
};
