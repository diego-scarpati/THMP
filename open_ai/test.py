from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()
openai_key = os.getenv("OPENAI_API_KEY")

os.environ["OPENAI_API_KEY"] = openai_key

client = OpenAI()

def chat_completion_example(about, temperature=1):
  print(f"Chat completion about {about} with temperature {temperature}")
  completion = client.chat.completions.create(
    model="gpt-3.5-turbo-0125",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": f'Write a joke about {about}.'}
    ],
    temperature=temperature
  )
  print("Chat completion: \n", completion.choices[0].message.content)

if __name__ == "__main__":
    import sys
    about = sys.argv[1] if len(sys.argv) > 1 else "something"
    temperature = float(sys.argv[2]) if len(sys.argv) > 2 else 1.0
    chat_completion_example(about, temperature)