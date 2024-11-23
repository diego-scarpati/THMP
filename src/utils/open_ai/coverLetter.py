from openai import OpenAI
import os
from dotenv import load_dotenv
import json

load_dotenv()
openai_key = os.getenv("OPENAI_API_KEY")

os.environ["OPENAI_API_KEY"] = openai_key

client = OpenAI()

def chat_completion_coverLetter(jobDescription, resume, temperature=1):
  # print(f"Chat completion \n Job Description: \n {jobDescription} \n Resume: \n {resume} \n with temperature {temperature}")
  completion = client.chat.completions.create(
    model="gpt-3.5-turbo-0125",
    messages=[
        {"role": "system", "content": 
          """
            You are a collaborative team of three experts: a Human Resources Specialist, a Marketing Specialist, and a Senior Developer with extensive experience. Your goal is to write a compelling cover letter by analyzing a specific job description and a provided resume. 

            - The Human Resources Specialist focuses on aligning the candidate's qualifications with the job requirements and ensuring the cover letter meets industry standards.
            - The Marketing Specialist emphasizes branding the candidate effectively, highlighting unique strengths, and making the cover letter engaging.
            - The Senior Developer ensures that any technical skills and experiences are accurately represented and relevant to the job description.

            Work together to decide the best approach for crafting a personalized and effective cover letter that showcases the candidate's suitability for the position.
          """
        },
        {"role": "user", "content": f'Write a cover letter for the following job description: {jobDescription} with the following resume: {resume}.'}
    ],
    temperature=temperature
  )
  print("Chat completion: \n", completion.choices[0].message.content)

if __name__ == "__main__":
    import sys
    jobDescription = json.loads(sys.argv[1])
    resume = json.loads(sys.argv[2])
    temperature = float(sys.argv[3]) if len(sys.argv) > 3 else 1.0
    chat_completion_coverLetter(jobDescription, resume, temperature)