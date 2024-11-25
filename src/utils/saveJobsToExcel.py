import pandas as pd
import re
import json

def save_to_excel(jobs_to_save):
    # Convert the job data to a DataFrame
    df_jobs = pd.DataFrame(jobs_to_save)
    
    # Save the DataFrame to an Excel file
    file_path = 'job_listings_complete.xlsx'
    df_jobs.to_excel(file_path, index=False)
    
    print(f"Excel file saved to: {file_path}")
    return f'{file_path}'

if __name__ == "__main__":
    # This is crucial for receiving arguments from PythonShell
    import sys
    # sys.argv[1] contains the jobs data list
    jobs_to_save = json.loads(sys.argv[1])
    result = save_to_excel(jobs_to_save)
    
    # PythonShell expects an output, so print the result
    print(result)