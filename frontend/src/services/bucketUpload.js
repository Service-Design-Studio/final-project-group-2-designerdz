export default async function bucketUpload(OBJECT_NAME, OBJECT_LOCATION, OBJECT_TYPE) {
  const BUCKET_NAME = "dbs-backend-1-ruby";
  // const BUCKET_NAME = "react-frontend-353408.appspot.com"
  const UPLOAD_URL = `https://storage.googleapis.com/upload/storage/v1/b/${BUCKET_NAME}/o?uploadType=media&name=${OBJECT_NAME}`;
  var UPLOAD_HEADERS = {
    "Content-Type": OBJECT_TYPE,
  };

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