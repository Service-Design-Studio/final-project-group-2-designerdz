from flask import Flask
import bucket_upload as bucket_upload
import ImageToText as ImageToText

app = Flask(__name__)

@app.route("/upload")
def upload():
    return bucket_upload.upload_blob()

@app.route("/vision")
def vision():
    return ImageToText.detect_text_uri()

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080, debug=True)