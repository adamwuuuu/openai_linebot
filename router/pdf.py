#coding:UTF-8
import random
from datetime import timedelta,datetime
import json
from flask import Blueprint, views, render_template, request, jsonify, redirect, url_for, session
# import PyPDF2
from router.pdfparse import PdfParse

today=datetime.today().strftime("%Y-%m-%d")

pdf_dp = Blueprint("pdf", __name__, url_prefix='/pdf')

@pdf_dp.route("/upload",methods=['POST'])
def upload():
    pdf=PdfParse()
    file=request.files['files']
    pdf.open(file.read())
    pdf.getText()
    # file = request.get_data()
    # print(file)
    return jsonify({"status":"ok"})

