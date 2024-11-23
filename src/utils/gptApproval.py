from openai import OpenAI
import os
from dotenv import load_dotenv
import json

load_dotenv()
openai_key = os.getenv("OPENAI_API_KEY")

os.environ["OPENAI_API_KEY"] = openai_key

client = OpenAI()

def chat_completion_approval(job, resume, temperature=1):
  # print(f"Chat completion \n Job Description: \n {job} \n Resume: \n {resume} \n with temperature {temperature}")
  completion = client.chat.completions.create(
    model="gpt-3.5-turbo-0125",
    messages=[
        {"role": "system", "content": 
          """
            You are a collaborative Human Resources Specialist with extensive experience. Your goal is to determine if a certain job should be discarded or not regarding its description. 

            - You should analyze the job description and the provided resume to decide if the candidate is suitable for the position.
            - The job description may contain specific requirements, responsibilities, and qualifications that you should consider. 
            - The job description may have some desired skills, experiences, or years of experience that you should evaluate. Desired skills should not be considered as mandatory.
            - The resume includes the candidate's qualifications, experiences, and skills that you should evaluate.
            - The output of your analysis should ONLY be a "true" if the candidate is suitable for the job, or "false" if the candidate is not suitable.
          """
        },
        {"role": "user", "content": f'Decide to rather accept (return true) or discard the job (return false) the job regarding its information and my resume. \nJob: {job} \n Resume: {resume}'}
    ],
    temperature=temperature
  )
  print("Chat completion: \n", completion.choices[0].message.content)
  return completion.choices[0].message.content

if __name__ == "__main__":
    import sys
    job = json.loads(sys.argv[1])
    resume = json.loads(sys.argv[2])
    temperature = float(sys.argv[3]) if len(sys.argv) > 3 else 1.0
    chat_completion_approval(job, resume, temperature)