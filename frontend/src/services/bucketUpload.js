const pdfjsLib = require("pdfjs-dist");
const workerSrc = require('pdfjs-dist/build/pdf.worker')


export default async function bucketUpload(data, userId, OBJECT_NAME, OBJECT_LOCATION) {
  // var OBJECT_LOCATION = data.target.files[0];
  var OBJECT_CONTENT_TYPE = data.target.files[0].type;
  // const BUCKET_NAME = "dbs-backend-1-ruby";
  const BUCKET_NAME = 'react-frontend-353408.appspot.com'
  // const OBJECT_NAME = `passport_image_${userId}_` + new Date().getTime();
  const UPLOAD_URL = `https://storage.googleapis.com/upload/storage/v1/b/${BUCKET_NAME}/o?uploadType=media&name=${OBJECT_NAME}`;
  var UPLOAD_HEADERS = {
    "Content-Type": OBJECT_CONTENT_TYPE,
  };


  if (OBJECT_CONTENT_TYPE === "application/pdf") {
    // Convert PDF to base64
    var fileReader = new FileReader();
    var base64;
    fileReader.onload = async function(fileLoadedEvent) {
        base64 = await fileLoadedEvent.target.result;
    };
    await fileReader.readAsDataURL(OBJECT_LOCATION);
    await new Promise(resolve => setTimeout(resolve, 500));

    // CONVERT BASE64 TO JPEG
    var jpeg = await pdfjsLib.getDocument(base64)
    console.log(jpeg)
  }
    // // Convert base64 to png file
    // var base64Data = base64.replace(/^data:image\/png;base64,/, "");
    // var pngFile = new File([base64Data], data.target.files[0].name, {
    //   type: "image/png",
    //   lastModified: Date.now()
    // });
    // OBJECT_LOCATION = pngFile;
    // OBJECT_CONTENT_TYPE = "image/png"
    // UPLOAD_HEADERS = {
    //   "Content-Type": OBJECT_CONTENT_TYPE,
    // };
  

  //upload image to cloud storage
//   console.log(OBJECT_LOCATION)
//   try {
//     const response = await fetch(UPLOAD_URL, {
//       method: "POST",
//       headers: UPLOAD_HEADERS,
//       body: OBJECT_LOCATION,
//     });
//     console.log("RESPONSE BELOW");
//     console.log(response);
//   } catch (error) {
//     console.log(error);
//   }
}