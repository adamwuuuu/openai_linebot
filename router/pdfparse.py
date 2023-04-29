#coding:UTF-8
import PyPDF2
class PdfParse():
    def __init__(self):
        self.pdfReader=None
        self.pdfName=""
        self.pdfCurrPage=0
        self.pdfText=""

    def open(self,filename):
        self.pdfName=filename
        PDFObj = open(self.pdfName, 'rb')
        self.pdfReader =PyPDF2.PdfReader(PDFObj)

    def openWithBinary(self,binary):
        self.pdfReader = PyPDF2.PdfReader(binary)

    def close(self):
        self.pdfReader=None

    def getText(self):
        if not self.pdfReader:
            return "Open PDF Reader"

        for i in range(len(self.pdfReader.pages)):
            PageObj = self.pdfReader.pages[i]
            #可以取得內容文字(第幾頁)
            ss=PageObj.extract_text()
            print(ss)


# PDFObj = open('ERP基礎檢定考試(學科)-簡約版.pdf', 'rb')
# pdfReader = PyPDF2.PdfReader(PDFObj)
# print(len(pdfReader.pages))
#
# PageObj = pdfReader.pages[0]
# #可以取得內容文字(第幾頁)
# ss=PageObj.extract_text()
# print(ss)
