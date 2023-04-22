#coding:UTF-8
import random
from datetime import timedelta,datetime
import json
from flask import Blueprint, views, render_template, request, jsonify, redirect, url_for, session

today=datetime.today().strftime("%Y-%m-%d")

pdf_dp = Blueprint("pdf", __name__, url_prefix='/pdf')

@pdf_dp.route("/getproduct")
def getproduct():

    data=[]
    data.append({"success":True,"msg":"ok","title":"A1","description":"AAB","owner":"a","email":"123@gmail.con",
                 "price":112.3,"id":0,"quantity":1,"img":'man_jeans1.jpg'})
    data.append({"success":True,"msg":"ok","title": "A2", "description": "AAc", "owner": "ass", "email": "123@gmail.con",
                 "price": 422.3,"id":1,"quantity":1,"img":'man_paint1.jpg'})
    data.append({"success":True,"msg":"ok","title": "A3", "description": "AAd", "owner": "ads", "email": "123@gmail.con",
                 "price": 182.3,"id":2,"quantity":1,"img":'man_paint2.jpg'})
    return jsonify(data)
