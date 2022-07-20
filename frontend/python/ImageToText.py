import os, io
from google.cloud import vision
import logging
import cloudstorage as gcs
# import webapp2
from google.cloud import storage
from google.appengine.api import app_identity
import requests



def detect_text_uri(uri):
    """Detects text in the file located in Google Cloud Storage or on the Web.
    """
    os.environ['GOOGLE_APPLICATION_CREDENTIALS']='ServiceAccountToken.json'
    client = vision.ImageAnnotatorClient()
    image = vision.Image()
    image.source.image_uri = uri

    response = client.text_detection(image=image)
    texts = response.text_annotations
   

    for text in texts:
        analysed_text= "{}".format(text.description)
        return analysed_text


        # vertices = (['({},{})'.format(vertex.x, vertex.y)
        #             for vertex in text.bounding_poly.vertices])

        # print('bounds: {}'.format(','.join(vertices)))

    if response.error.message:
        raise Exception(
            '{}\nFor more info on error messages, check: '
            'https://cloud.google.com/apis/design/errors'.format(
                response.error.message))


    
    




    

