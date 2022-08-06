export default async function pdfToPng(OBJECT_NAME, OBJECT_LOCATION) {
  const pdfjs = await import("pdfjs-dist/build/pdf");
  const pdfjsWorker = await import("pdfjs-dist/build/pdf.worker.entry");
  pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
  let convertedImg;

  var fileReader = new FileReader();
  fileReader.onload = function () {
    var typedarray = new Uint8Array(this.result);
    const loadingTask = pdfjs.getDocument(typedarray);
    loadingTask.promise.then(function (pdf) {
      pdf.getPage(1).then(async function (page) {
        var scale = 1.5;
        var viewport = page.getViewport({ scale: scale });
        var canvas = document.getElementById("pdfCanvas");
        var context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        var renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        var renderTask = page.render(renderContext);
        renderTask.promise.then(function () {
          console.log("Page Rendered");
        });

        await new Promise((resolve) => setTimeout(resolve, 1000));

        // save image as blob
        canvas.toBlob(function (blob) {
          console.log("Converting Image to Blob to PNG");
          convertedImg = new File([blob], OBJECT_NAME+".png", {
            type: "image/png",
          });
        });
      });
    });
  };
  await fileReader.readAsArrayBuffer(OBJECT_LOCATION);
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return convertedImg;
}
