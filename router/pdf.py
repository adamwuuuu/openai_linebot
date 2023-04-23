#coding:UTF-8
import random
from datetime import timedelta,datetime
import json
from flask import Blueprint, views, render_template, request, jsonify, redirect, url_for, session
import PyPDF2

today=datetime.today().strftime("%Y-%m-%d")

pdf_dp = Blueprint("pdf", __name__, url_prefix='/pdf')

# PDFObj = open('ERP基礎檢定考試(學科)-簡約版.pdf', 'rb')
# pdfReader = PyPDF2.PdfReader(PDFObj)
# print(len(pdfReader.pages))
#
# PageObj = pdfReader.pages[0]
# #可以取得內容文字(第幾頁)
# ss=PageObj.extract_text()
# print(ss)


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

