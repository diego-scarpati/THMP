from openai import OpenAI
import os
from dotenv import load_dotenv
import json

load_dotenv()
openai_key = os.getenv("OPENAI_API_KEY")

os.environ["OPENAI_API_KEY"] = openai_key

client = OpenAI()

def chat_completion_approval(job, resume, temperature=1):
  """
    Determines if a resume is suitable for a job based on the job description.
    
    Parameters:
        job (str): The job description.
        resume (str): The candidate's resume.
        temperature (float): Sampling temperature.
    
    Returns:
        str: "true" if suitable, "false" otherwise.
    """
  prompt = """
    You are a highly skilled Human Resources Specialist with extensive experience in recruitment and candidate evaluation. Your task is to assess whether a given resume is suitable for a specified job description.

    Guidelines:
    1. Analyze the job description and the provided resume thoroughly.
    2. Determine if the candidate meets all **mandatory** requirements outlined in the job description.
    3. Consider the candidate's visa status and ensure it aligns with the job's citizenship or Permanent Residency (PR) requirements.
    4. **Desired** skills and experiences in the job description are not mandatory but can be considered to strengthen the evaluation.
    5. Ignore any irrelevant information that does not pertain to the job requirements.

    **Output**:
    - Respond with only "true" if the candidate is suitable for the job.
    - Respond with only "false" if the candidate is not suitable.
    - Do not provide any additional commentary or explanation.
    """

  user_message = f"""
    Job Description:
    {job}

    Resume:
    {resume}
    """
  # try:
    # response = openai.ChatCompletion.create(
  response = client.chat.completions.create(
      model="gpt-4",
      messages=[
          {"role": "system", "content": prompt},
          {"role": "user", "content": user_message}
      ],
      temperature=temperature,
      max_tokens=10,  # Limit tokens to enforce concise response
      n=1,
      stop=None
  )

  answer = response.choices[0].message.content
  print("Chat completion: \n", answer)
  return answer

  # Nuevo del modelo de OpenAI o-mini

  #   if answer == "true":
  #       return "true"
  #   elif answer == "false":
  #       return "false"
  #   else:
  #       # Handle unexpected responses
  #       print(f"Unexpected response: {response.choices[0].message.content}")
  #       return "false"

  # except openai.error.OpenAIError as e:
  #   # Log the error appropriately
  #   print(f"OpenAI API error: {e}")
  #   return "false"



  # Viejo, como estaba

  # completion = client.chat.completions.create(
  #   model="gpt-4",
  #   messages=[
  #       {"role": "system", "content": prompt},
  #       {"role": "user", "content": user_message}
  #   ],
  #   temperature=temperature
  # )
  # print("Chat completion: \n", completion.choices[0].message.content)
  # return completion.choices[0].message.content

if __name__ == "__main__":
    import sys
    job = json.loads(sys.argv[1])
    resume = json.loads(sys.argv[2])
    temperature = float(sys.argv[3]) if len(sys.argv) > 3 else 1.0
    chat_completion_approval(job, resume, temperature)