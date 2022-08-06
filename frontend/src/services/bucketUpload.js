export default async function bucketUpload(data, userId, OBJECT_NAME, OBJECT_LOCATION) {
  const pdfjs = await import('pdfjs-dist/build/pdf');
  const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry');
  pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
  // pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.5.207/pdf.worker.js';

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
    var file = OBJECT_LOCATION
    var fileReader = new FileReader();
    fileReader.onload = function() {
        var typedarray = new Uint8Array(this.result);
        const loadingTask = pdfjs.getDocument(typedarray);
        loadingTask.promise.then(function(pdf) {
          console.log("PDF loaded");
          console.log(pdf)
          // convert the first page of the pdf to jpeg
          pdf.getPage(1).then(function(page) {
            var scale = 1.5;
            var viewport = page.getViewport({ scale: scale });
            var canvas = document.getElementById("pdfCanvas");
            var context = canvas.getContext("2d");
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            var renderContext = {
              canvasContext: context,
              viewport: viewport
            };
            var renderTask = page.render(renderContext);
            renderTask.promise.then(function() {
              console.log("Page Rendered")
            })
            // save the image as a png
            var image = canvas.toDataURL("image/png");
            // convert the image to base64
            var base64Image = image.replace(/^data:image\/png;base64,/, "");
            console.log(base64Image)


            // // convert the canvas to base64
            // var dataUrl = canvas.toDataURL();
            // console.log("DATA URL")
            // console.log(dataUrl)
          })
        })
    };
    fileReader.readAsArrayBuffer(file);


    // // convert pdf to jpg
    // var page = await pdf.getPage(1);
    // var viewport = page.getViewport(1.0);
    // var canvas = document.createElement("canvas");
    // canvas.height = viewport.height;
    // canvas.width = viewport.width;
    // var context = canvas.getContext("2d");
    // await page.render({ canvasContext: context, viewport: viewport });
    // var jpg = await canvas.toDataURL("image/jpeg");
    // console.log(jpg)



    

    // // CONVERT BASE64 TO JPEG
    // var jpeg = await pdfjsLib.getDocument(base64)
    // console.log(jpeg)
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