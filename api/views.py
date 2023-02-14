from django.shortcuts import render
from django.shortcuts import render
from django.http import JsonResponse
import json
import numpy as np
import cv2
import glob
import urllib.request
from PIL import Image
from keras.applications.vgg16 import VGG16
from keras.applications.vgg16 import preprocess_input
import pymongo
import os
import datetime
from sklearn.metrics.pairwise import cosine_similarity
# Create your views here.
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["capstone"]
mycol = mydb["CBIR"]
workdir = '/Users/aishaandatt/Downloads/CBIR/Brain_DS'
model = VGG16(include_top=False, weights='imagenet')
features = np.load('/Users/aishaandatt/Downloads/CBIR/extract.npy')


# def preprocess():
#     images = []
#     paths = []
#     for filename in glob.glob('/Users/aishaandatt/Downloads/CBIR/Brain_DS/Moderate_Demented/*.jpg'):
#         img = cv2.imread(filename)
#         img = cv2.resize(img, (224, 224))
#         img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
#         images.append(img)
#         paths.append(filename)
#     images = np.array(images)


def cbir(request):
    images = []
    paths = []
    paths_new = []
    scores = []
    for filename in glob.glob('/Users/aishaandatt/Downloads/CBIR/Brain_DS/Moderate_Demented/*.jpg'):
        img = cv2.imread(filename)
        img = cv2.resize(img, (224, 224))
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        images.append(img)
        paths.append(filename)
    images = np.array(images)
    url = json.loads(request.body)['body']
    print(url)
    url_response = urllib.request.urlopen(url)
    img_array = np.array(bytearray(url_response.read()), dtype=np.uint8)
    img = cv2.imdecode(img_array, -1)
    query_img = cv2.resize(img, (224, 224))
    query_img = cv2.cvtColor(query_img, cv2.COLOR_BGR2RGB)
    query_img = np.array([query_img])
    query_img = preprocess_input(query_img)
    query_features = model.predict(query_img)
    query_features = query_features.reshape(query_features.shape[0], -1)
    query_distances = cosine_similarity(query_features, features)
    sorted_indices = np.argsort(query_distances.flatten())[::-1]
    for i in range(9):
        # print(paths[sorted_indices[i]])
        paths_new.append(paths[sorted_indices[i]])
        scores.append(str(query_distances[0, sorted_indices[i]]))
        print(query_distances[0, sorted_indices[i]])
    mdb = {'img': paths_new}
    json_object = json.dumps(mdb)
    mongodb = (mongo(json_object))['info']
    print(mongodb)
    return JsonResponse({'db': mongodb, 'score': scores})


def mongo(request):
    db = []
    paths = json.loads(request)['img']
    # print(paths)
    for path in paths:
        for x in mycol.find({"path": path}, {"path": 1, '_id': 0, 'age': 1, 'feedback': 1}):
            db.append(x)
            # print(x)
    return ({'info': db})
