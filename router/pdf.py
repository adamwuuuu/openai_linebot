#coding:UTF-8
import random
from datetime import timedelta,datetime
import json
from flask import Blueprint, views, render_template, request, jsonify, redirect, url_for, session
from router.pdfparse import PdfParse

today=datetime.today().strftime("%Y-%m-%d")

pdf_dp = Blueprint("pdf", __name__, url_prefix='/pdf')

@pdf_dp.route("/upload",methods=['POST'])
def upload():
    pdf=PdfParse()
    file=request.files['files']
    file.save("temp.pdf")
    pdf.open("temp.pdf")
    # file=request.stream
    # pdf.openWithBinary(file)
    res=pdf.getText()
    pdf.close()
    return jsonify(res)

