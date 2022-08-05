export default async function bucketUpload(data, userId) {
  const OBJECT_LOCATION = data.target.files[0];
  const OBJECT_CONTENT_TYPE = data.target.files[0].type;
  const BUCKET_NAME = "dbs-backend-1-ruby";
  const OBJECT_NAME = `passport_image_${userId}_` + new Date().getTime();
  const UPLOAD_URL = `https://storage.googleapis.com/upload/storage/v1/b/${BUCKET_NAME}/o?uploadType=media&name=${OBJECT_NAME}`;
  const UPLOAD_HEADERS = {
    "Content-Type": OBJECT_CONTENT_TYPE,
  };
  //upload image to cloud storage
  try {
    const response = await fetch(UPLOAD_URL, {
      method: "POST",
      headers: UPLOAD_HEADERS,
      body: OBJECT_LOCATION,
    });
    console.log("RESPONSE BELOW");
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
