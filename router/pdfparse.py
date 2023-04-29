#coding:UTF-8
import PyPDF2
from chatgpt import ChatGPT
import time
class PdfParse():
    def __init__(self):
        self.pdfReader=None
        self.pdfName=""
        self.pdfCurrPage=0
        self.pdfText=""
        self.qlist=[]
        self.qnumlist = []
        self.anwserlist=[]
        self.gptAnwserList=[]
        self.isFirstline=False
        self.questionText=""
        self.qnum=""
        self.anwser=""

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
            text_no_enter = text.split("\n")
            for line in text_no_enter:
             # print(line)
             partext=line.split(".")
             if len(partext)>1 :
                if partext[0].find(")") != -1:
                   self.qnum=partext[0].split(")")[1]
                   self.anwser=partext[0].replace("(","")
                   self.anwser=self.anwser.split(")")[0]
                else:
                   self.qnum=partext[0]
                   self.anwser="NA"
                self.questionText = partext[1]
                self.isFirstline = True
                self.qnumlist.append(self.qnum)
                self.anwserlist.append(self.anwser)
             elif self.isFirstline==True:
                self.isFirstline=False
                self.questionText+=line
                self.qlist.append(self.questionText.strip())
                self.gptAnwserList.append(self.askGPT(self.questionText.strip()))
             # time.sleep(2)
        # print("QNum: ",self.qnumlist)
        # print("Qlist: ",self.qlist)
        # print("Anwser: ", self.anwserlist)
        return {"status":"ok","question":self.qlist,"questionNumber":self.qnumlist,
                "anwser":self.anwserlist,"gptanwser":self.gptAnwserList}
    def askGPT(self,text):
        gpt = ChatGPT()
        gpt.add_msg(f"Human:{text}?\n")
        reply_msg = gpt.get_response().replace("AI:", "", 1)
        gpt.add_msg(f"AI:{reply_msg}\n")
        print("AI Respond: ",reply_msg)
        return reply_msg