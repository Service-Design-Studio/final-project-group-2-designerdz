from google.cloud import storage

"""Uploads a file to the bucket."""
    # The ID of your GCS bucket
bucket_name = "ocr_images_visionapi"
    # The path to your file to upload
source_file_name = "D:\Download\photo_2022-07-15_11-15-40.jpg"
    # The ID of your GCS object
destination_blob_name = "storage-object-name"

def upload_blob(bucket_name, source_file_name, destination_blob_name):


    storage_client = storage.Client.from_service_account_json('ServiceAccountToken.json')
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)

    blob.upload_from_filename(source_file_name)

    print(
        f"File {source_file_name} uploaded to {destination_blob_name}."
    )


