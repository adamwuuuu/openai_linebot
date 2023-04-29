#coding:UTF-8
import PyPDF2
class PdfParse():
    def __init__(self):
        self.pdfReader=None
        self.pdfName=""
        self.pdfCurrPage=0
        self.pdfText=""
        self.qlist=[]
        self.qnumlist = []
        self.anwserlist=[]

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
            return {"status":"ng","msg":"Open PDF Reader"}

        for i in range(len(self.pdfReader.pages)):
            PageObj = self.pdfReader.pages[i]
            text=PageObj.extract_text()
            partext=text.split(".")
            if len(partext)>1 :
                qnum=partext[0]
                q=partext[1]
                aw=""
                if qnum.find(")") != -1:
                   aw=qnum.replace("(","")
                   aw=aw.replace(")","")
                self.qnumlist.append(qnum)
                self.qlist.append(q)
                self.anwserlist.append(aw)
        return {"status":"ok","question":self.qlist,"questionNumber":self.qnumlist,
                "anwser":self.anwserlist}