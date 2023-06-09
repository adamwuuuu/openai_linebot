from prompt import Prompt

import os
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")

class ChatGPT:
    def __init__(self):
        self.prompt = Prompt()
        # self.model = os.getenv("OPENAI_MODEL", default = "text-davinci-003")
        self.model = os.getenv("OPENAI_MODEL", default="text-davinci-003")
        #self.model = os.getenv("OPENAI_MODEL", default = "chatbot")
        self.temperature = float(os.getenv("OPENAI_TEMPERATURE", default = 0))
        self.frequency_penalty = float(os.getenv("OPENAI_FREQUENCY_PENALTY", default = 0))
        self.presence_penalty = float(os.getenv("OPENAI_PRESENCE_PENALTY", default = 0.6))
        self.max_tokens = int(os.getenv("OPENAI_MAX_TOKENS", default = 240))

    def get_response(self):
        response = openai.Completion.create(
            model=self.model,
            prompt=self.prompt.generate_prompt(),
            temperature=self.temperature,
            frequency_penalty=self.frequency_penalty,
            presence_penalty=self.presence_penalty,
            max_tokens=self.max_tokens
        )
        # print("OpenAI Response: %s"%(response))
        return response['choices'][0]['text'].strip()

    def add_msg(self, text):
        self.prompt.add_msg(text)

    def askGPT(self,text):
        self.add_msg(f"Human:{text}?\n")
        reply_msg = self.get_response().replace("AI:", "", 1)
        self.add_msg(f"AI:{reply_msg}\n")
        print("AI Respond: ",reply_msg)
        return reply_msg