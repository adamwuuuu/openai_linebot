#coding:UTF-8
import PyPDF2
PDFObj = open('ERP基礎檢定考試(學科)-簡約版.pdf', 'rb')
pdfReader = PyPDF2.PdfReader(PDFObj)
print(len(pdfReader.pages))

PageObj = pdfReader.pages[0]
#可以取得內容文字(第幾頁)
ss=PageObj.extract_text()
print(ss)
