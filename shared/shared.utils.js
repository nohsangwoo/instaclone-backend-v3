import AWS from 'aws-sdk';

// AWS 로그인가은 기능입 이제 이걸 통해서 S3 접속 가능
AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});
