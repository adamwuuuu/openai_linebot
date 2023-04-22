#coding:UTF-8
import os
# import openai
from flask import Flask, request
from linebot import (
    LineBotApi, WebhookHandler
)
from linebot.exceptions import (
    InvalidSignatureError
)
from linebot.models import (
    MessageEvent, TextMessage, TextSendMessage,
)
import json

from chatgpt import ChatGPT

app = Flask(__name__)

line_bot_api = LineBotApi(os.getenv("LINE_CHANNEL_ACCESS_TOKEN"))
handler =WebhookHandler(os.getenv("LINE_CHANNEL_SECRET"))


chatgpt = ChatGPT()

# response = openai.Completion.create(
#   model="text-davinci-003",
#   prompt="The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: I'd like to cancel my subscription.\nAI:",
#   temperature=0.9,
#   max_tokens=150,
#   top_p=1,
#   frequency_penalty=0.0,
#   presence_penalty=0.6,
#   stop=[" Human:", " AI:"]
# )

@app.route("/webhook", methods=['POST'])
def callback():
    # get X-Line-Signature header value
    signature = request.headers['X-Line-Signature']

    # get request body as text
    body = request.get_data(as_text=True)
    app.logger.info("Request body: " + body)

    # handle webhook body
    try:
        handler.handle(body, signature)
    except InvalidSignatureError:
        print("Invalid signature. Please check your channel access token/channel secret.")
        abort(400)

    return 'OK'


@handler.add(MessageEvent, message=TextMessage)
def handle_message(event):
    global working_status,line_user_id
    working_status=True
    line_user_id=event.source.user_id
    line_bot_api.reply_message(
        event.reply_token,
        TextSendMessage(text="用戶查詢:"+event.message.text))

    if working_status:
        chatgpt.add_msg(f"Human:{event.message.text}?\n")
        reply_msg = chatgpt.get_response().replace("AI:", "", 1)
        chatgpt.add_msg(f"AI:{reply_msg}\n")
        line_bot_api.push_message(
            line_user_id,
            TextSendMessage(text=reply_msg))


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    working_status = os.getenv("DEFALUT_TALKING", default="true").lower() == "true"
    line_user_id=""
    app.run(host="0.0.0.0", port=port)