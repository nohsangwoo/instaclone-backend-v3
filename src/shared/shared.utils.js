import AWS from 'aws-sdk';

// AWS 로그인가은 기능입 이제 이걸 통해서 S3 접속 가능
AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

// 공통적으로 사용하는 기능인데 사진 업로드에 관련된 기능
// 사진파일과 로그인한 유저id를 전달받는다
export const uploadToS3 = async (file, userId, folderName) => {
  // 파일에서 파일이름과, createReadStream을 추출하는 과정을 비동기 처리한다
  // fix bug 배열형식으로 반환되는점 수정
  const { filename, createReadStream } = await file;

  // readStream을 추출해서 변수저장
  const readStream = createReadStream();
  // 저장되는 경로 및 파일이름을 만든다(folderName/userId-오늘날짜-전달받은 파일이름)
  const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;
  //   파일을 저장한다음 저장된 주소를 알아낸다.(원래 data로 받아서 data.Location으로 뽑아도 상관없음)
  const { Location } = await new AWS.S3()
    .upload({
      // 버킷이름
      Bucket: 'instaclone21-uploads',
      // 저장되는 파일이름
      Key: objectName,
      // 파일의 보호 규칙같은거 public-read는 말그대로 아무나 읽을수 있음
      ACL: 'public-read',
      // 저장되는 파일 stream
      Body: readStream,
    })
    .promise();
  return Location;
};
