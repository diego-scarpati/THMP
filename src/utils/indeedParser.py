import time
import random
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import pandas as pd
from datetime import datetime

def scrape_indeed_jobs():
    # Set up Chrome options to mimic a real browser
    options = Options()
    options.headless = False  # Keep browser visible for manual interaction
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--disable-blink-features=AutomationControlled")  # Hide automation flag
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    options.add_experimental_option("useAutomationExtension", False)
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")

    # Initialize ChromeDriver
    service = Service('/usr/local/bin/chromedriver')  # Update to your ChromeDriver path
    driver = webdriver.Chrome(service=service, options=options)

    # Hide WebDriver property
    driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")

    # URL for job search
    base_url = 'https://au.indeed.com/jobs?q=software+developer&l=Sydney+NSW&jt=contract'
    all_jobs = []
    page_num = 0
    max_pages = 4

    while page_num < max_pages:
        url = f"{base_url}&start={page_num * 10}"
        print(f"Scraping page {page_num + 1}: {url}")
        driver.get(url)
        time.sleep(random.uniform(2, 5))  # Random delay to mimic human behavior

        # Print out what the driver sees
        print(driver.page_source)

        # Handle Cloudflare verification
        while "Just a moment" in driver.title or "Cloudflare" in driver.page_source:
            print("Verification page detected. Please complete it manually in the browser.")
            input("Press Enter after completing the verification...")
            time.sleep(2)  # Wait for page to settle after verification

            # Check if verification persists after manual input
            if "Just a moment" in driver.title or "Cloudflare" in driver.page_source:
                print("Verification still present. Trying to bypass with human-like behavior...")
                driver.execute_script("window.scrollTo(0, document.body.scrollHeight / 2);")
                time.sleep(random.uniform(1, 3))
            else:
                print("Verification passed. Proceeding to scrape...")
                break

        # Wait for job listings to load
        try:
            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, 'div.job_seen_beacon'))
            )
        except:
            print(f"No jobs found on page {page_num + 1} or page failed to load.")
            break

        # Simulate human interaction
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight / 2);")
        time.sleep(random.uniform(1, 3))

        # Parse the page
        soup = BeautifulSoup(driver.page_source, 'html.parser')
        job_elements = soup.select('div.job_seen_beacon')

        for job in job_elements:
            title = job.select_one('h2.jobTitle').text.strip() if job.select_one('h2.jobTitle') else 'No title'
            company = job.select_one('span.companyName').text.strip() if job.select_one('span.companyName') else 'No company'
            location = job.select_one('div.companyLocation').text.strip() if job.select_one('div.companyLocation') else 'No location'
            link = 'https://au.indeed.com' + job.select_one('a.jcs-JobTitle')['href'] if job.select_one('a.jcs-JobTitle') else '#'
            summary = job.select_one('div.summary').text.strip() if job.select_one('div.summary') else 'No summary'

            all_jobs.append({
                'title': title,
                'company': company,
                'location': location,
                'link': link,
                'summary': summary
            })

        page_num += 1

    driver.quit()
    return all_jobs

def filter_jobs(jobs):
    filtered_jobs = []
    keywords = ['contract', '6 months', '6-month']
    for job in jobs:
        text = f"{job['title']} {job['summary']}".lower()
        if any(keyword in text for keyword in keywords):
            filtered_jobs.append(job)
    return filtered_jobs

def main():
    jobs = scrape_indeed_jobs()
    filtered_jobs = filter_jobs(jobs)
    print(f"Found {len(filtered_jobs)} matching jobs:")

    df = pd.DataFrame(filtered_jobs)
    now = datetime.now()
    timestamp = now.strftime("%Y%m%d_%H%M%S")
    excel_filename = f"indeed_job_{timestamp}.xlsx"
    df.to_excel(excel_filename, index=False)
    print(f"Results saved to '{excel_filename}'")

if __name__ == "__main__":
    main()