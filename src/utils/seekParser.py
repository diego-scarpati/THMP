import time
import os
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import pandas as pd
from datetime import datetime
import re

# Function to scrape job listings from SEEK
def scrape_seek_jobs(base_url):
    # Set up headless Chrome browser
    options = Options()
    options.headless = True  # Run without opening a browser window
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")

    # Specify path to ChromeDriver (update this to your ChromeDriver location)
    service = Service('/usr/local/bin/chromedriver')  # Replace with actual path
    driver = webdriver.Chrome(service=service, options=options)

    # Base URL for software developer contract jobs in Sydney

    ## For contract jobs or short remote roles only
    # base_url = 'https://www.seek.com.au/fullstack-developer-jobs/in-Sydney-NSW-2000/contract-temp?sortmode=ListedDate'

    all_jobs = []
    page_num = 1
    max_pages = 2  # Set to scrape 2 pages
    has_next_page = True

    while has_next_page and page_num <= max_pages:
        url = f"{base_url}&page={page_num}" if page_num > 1 else base_url
        # print(f"Scraping page {page_num}: {url}")
        driver.get(url)
        time.sleep(3)  # Delay to avoid overwhelming the server

        # Wait for job listings to load
        try:
            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, 'article[data-automation="normalJob"]'))
            )
        except:
            # print(f"No jobs found on page {page_num} or page failed to load.")
            break

        # Parse the page source with BeautifulSoup
        soup = BeautifulSoup(driver.page_source, 'html.parser')
        job_elements = soup.select('article[data-automation="normalJob"]')

        for job in job_elements:
            title = job.select_one('h3').text.strip() if job.select_one('h3') else 'No title'
            company = job.select_one('[data-automation="jobCompany"]').text.strip() if job.select_one('[data-automation="jobCompany"]') else 'No company'
            location = job.select_one('[data-automation="jobLocation"]').text.strip() if job.select_one('[data-automation="jobLocation"]') else 'No location'
            link = 'https://www.seek.com.au' + job.select_one('a')['href'] if job.select_one('a') else '#'
            summary = job.select_one('[data-automation="jobShortDescription"]').text.strip() if job.select_one('[data-automation="jobShortDescription"]') else 'No summary'
            listed = job.select_one('[data-automation="jobListingDate"]').text.strip() if job.select_one('[data-automation="jobListingDate"]') else 'No listing date'
            # Extract job ID from the link
            # Example link: https://www.seek.com.au/job/83589647?type=standard&ref=search-standalone#sol=bb0d6b96dd6ba7df3aa36e56fe87b61cd514c170
            # Example job_id: 83589647
            job_id = link.split('/')[-1].split('?')[0] if link else 'No job ID'

            all_jobs.append({
                'title': title,
                'company': company,
                'location': location,
                'summary': summary,
                'listed': listed,
                'job_id': job_id,
                'link': link
            })

        # Check for next page
        next_button = driver.find_elements(By.CSS_SELECTOR, f'a[data-automation="page-{page_num+1}"]')
        has_next_page = len(next_button) > 0 and 'disabled' not in next_button[0].get_attribute('class')
        # print(f"Next page available: {has_next_page}")
        page_num += 1

    driver.quit()
    return all_jobs

# 1. Compile your “include” and “exclude” patterns
include_pattern = re.compile(
    r"\b(developer|dev|software|engineer|frontend|front end|front-end|"
    r"backend|back end|back-end|fullstack|full stack|full-stack|react|reactjs|"
    r"javascript|typescript|node|nodejs)\b",
    re.IGNORECASE
)

exclude_title_pattern = re.compile(
    r"\b(senior|sr\.|lead|principal|director|manager|intern|internship|"
    r"quantitative|android|sharepoint|kotlin|drupal|365|d365|azure|"
    r"lavarel|architect|php|power|powerapps|powerapp|spring|golang|dotnet|"
    r"rust|salesforce|java|appian|csharp|c#)\b",
    re.IGNORECASE
)

exclude_dotnet       = re.compile(r"\.net", re.IGNORECASE)
exclude_cs           = re.compile(r"\b(c\+\+|c#)\b", re.IGNORECASE)
exclude_csharp       = re.compile(r"c\#", re.IGNORECASE)
exclude_cpp          = re.compile(r"c\+\+", re.IGNORECASE)
non_latin_pattern    = re.compile(r"[^\u0000-\u007F]")


# Function to filter jobs based on keywords
def filter_jobs(jobs):
    filtered_jobs = []
    # keywords = ['contract', '6 months', '6-month']  # Keywords for short-term roles
    # for job in jobs:
    #     text = f"{job['title']} {job['summary']}".lower()
    #     if any(keyword in text for keyword in keywords):
    #         filtered_jobs.append(job)
    # return filtered_jobs
    for job in jobs:
        # combine title & summary for one-pass matching
        text = f"{job['title']} {job['summary']}"

        # 2. Exclude anything with non-Latin chars
        if non_latin_pattern.search(text):
            continue

        # 3. Must include one of your “good” keywords
        if not include_pattern.search(text):
            continue

        # 4. Exclude senior/lead/etc roles
        if exclude_title_pattern.search(text):
            continue

        # 5. Exclude any .NET / C# / C++ mentions
        if (exclude_dotnet.search(text)
            or exclude_cs.search(text)
            or exclude_csharp.search(text)
            or exclude_cpp.search(text)):
            continue

        # 6. If we get here, it’s a match
        filtered_jobs.append(job)

    return filtered_jobs


# Main function
def main():
    # Scrape job listings
    ## For all jobs
    # base_url = 'https://www.seek.com.au/frontend-developer-jobs/in-Sydney-NSW-2000?sortmode=ListedDate'
    # base_url = 'https://www.seek.com.au/fullstack-developer-jobs/in-Sydney-NSW-2000?sortmode=ListedDate'
    # base_url = 'https://www.seek.com.au/backend-developer-jobs/in-Sydney-NSW-2000?sortmode=ListedDate'
    # base_url = 'https://www.seek.com.au/software-engineer-jobs/in-Sydney-NSW-2000?sortmode=ListedDate'

    urls = [
        'https://www.seek.com.au/frontend-developer-jobs/in-Sydney-NSW-2000?sortmode=ListedDate',
        'https://www.seek.com.au/fullstack-developer-jobs/in-Sydney-NSW-2000?sortmode=ListedDate',
        'https://www.seek.com.au/backend-developer-jobs/in-Sydney-NSW-2000?sortmode=ListedDate',
        'https://www.seek.com.au/software-engineer-jobs/in-Sydney-NSW-2000?sortmode=ListedDate'
        ]
    
    jobs = []

    for url in urls:
        # print(f"Scraping jobs from: {url}")
        jobs.extend(scrape_seek_jobs(url))
        # print(f"Total jobs scraped from {url}: {len(jobs)}")

    # Filter jobs for contract or 6-month roles
    filtered_jobs = filter_jobs(jobs)
    # print(f"Found {len(filtered_jobs)} matching jobs:")

    # Create DataFrame from filtered jobs
    df = pd.DataFrame(filtered_jobs)

    # Generate timestamp for filename
    now = datetime.now()
    timestamp = now.strftime("%Y%m%d_%H%M%S")  # Format: YYYYMMDD_HHMMSS

    # Save to Excel file
    excel_filename = f"seek_job_{timestamp}.xlsx"
    df.to_excel(excel_filename, index=False)
    print(f"Results saved to '{excel_filename}'")

    # Optional: Print the filtered jobs
    # for job in filtered_jobs:
    #     print(f"Title: {job['title']}")
    #     print(f"Company: {job['company']}")
    #     print(f"Location: {job['location']}")
    #     print(f"Link: {job['link']}")
    #     print(f"Summary: {job['summary']}")
    #     print("-" * 50)

if __name__ == "__main__":
    main()