import re
import json

def should_accept_job(job_data, candidate_skills, candidate_years_experience):
    # print(f"Job data: {job_data}")
    # print(f"Candidate skills: {candidate_skills}")
    # print(f"Candidate years of experience: {candidate_years_experience}")
    """
    Determines whether to accept or reject a job based on candidate's skills and experience.

    Parameters:
    - job_data (dict): The job information in JSON format.
    - candidate_skills (list of str): The candidate's skills.
    - candidate_years_experience (int): The candidate's years of experience.

    Returns:
    - bool: True if the job is accepted, False otherwise.
    """
    
    # Normalize skills for case-insensitive comparison
    job_skills = set(skill.lower() for skill in job_data.get('skills', []))
    candidate_skills_lower = set(skill.lower() for skill in candidate_skills)
    
    # Skill Check: If any candidate skill is in job skills, reject
    if job_skills.intersection(candidate_skills_lower):
        return False

    # Extract the job description
    description = job_data.get('description', '')
    
    # Define regex patterns to extract years of experience
    # Patterns cover expressions like:
    # - "6+ years"
    # - "2 years"
    # - "five years"
    # - "three-year"
    # - "seven (7) years"
    number_pattern = r'(\d+|one|two|three|four|five|six|seven|eight|nine|ten)'
    experience_patterns = [
        rf'{number_pattern}\+?\s*(?:\+)?\s*(?:years|year|yrs|yr)',
        rf'{number_pattern}-year',
        rf'{number_pattern}\s*\(?(?:\d+)?\)?\s*(?:years|year|yrs|yr)'
    ]
    
    # Compile the regex patterns
    regex_patterns = [re.compile(pattern, re.IGNORECASE) for pattern in experience_patterns]
    
    # Function to convert number words to integers
    def word_to_num(word):
        word = word.lower()
        numbers = {
            'one':1, 'two':2, 'three':3, 'four':4, 'five':5,
            'six':6, 'seven':7, 'eight':8, 'nine':9, 'ten':10
        }
        return numbers.get(word, None)
    
    required_experiences = []
    
    # Search for all patterns in the description
    for pattern in regex_patterns:
        for match in pattern.findall(description):
            # match can be a tuple if multiple groups are present
            if isinstance(match, tuple):
                num_str = match[0]
            else:
                num_str = match
            # Convert to integer
            if num_str.isdigit():
                years = int(num_str)
            else:
                years = word_to_num(num_str)
            if years is not None:
                required_experiences.append(years)
    
    # If no experience requirements found, assume no restriction
    if not required_experiences:
        return True
    
    # Determine the maximum required experience
    max_required_experience = max(required_experiences)
    
    # Experience Check: If candidate's experience is less, reject
    if candidate_years_experience < max_required_experience:
        return False
    
    # If all checks pass, accept the job
    return True

if __name__ == "__main__":
    # This is crucial for receiving arguments from PythonShell
    import sys
    # sys.argv[1] contains the job data, sys.argv[2] contains the candidate skills, and sys.argv[3] contains years of experience
    job_data = json.loads(sys.argv[1])
    candidate_skills = json.loads(sys.argv[2])
    candidate_years_experience = int(sys.argv[3])
    result = should_accept_job(job_data, candidate_skills, candidate_years_experience)
    
    # PythonShell expects an output, so print the result
    print(result)