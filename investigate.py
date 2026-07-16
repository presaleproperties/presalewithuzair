import subprocess
import re
import json

urls = [
    "https://presalewithuzair.com/",
    "https://presalewithuzair.com/best-presale-realtor-fraser-valley",
    "https://presalewithuzair.com/new-to-presale-start-here",
    "https://presalewithuzair.com/buy-presale-fraser-valley",
    "https://presalewithuzair.com/presale-mistakes-fraser-valley",
    "https://presalewithuzair.com/fraser-valley-presale-investment-advice",
    "https://presalewithuzair.com/buyer-representation-presale-fraser-valley",
    "https://presalewithuzair.com/first-time-buyers-fraser-valley",
    "https://presalewithuzair.com/investors-fraser-valley",
    "https://presalewithuzair.com/how-i-help",
    "https://presalewithuzair.com/best-presale-realtor-fraser-valley?cb=99231"
]

def fetch_info(url):
    cmd = [
        "curl", "-s", "-i",
        "-H", "Cache-Control: no-cache",
        "-H", "Pragma: no-cache",
        url
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    
    header_content = result.stdout.split('\r\n\r\n')[0]
    body = '\r\n\r\n'.join(result.stdout.split('\r\n\r\n')[1:])
    
    status_match = re.search(r"HTTP/\d(?:\.\d)?\s+(\d+)", header_content)
    status = status_match.group(1) if status_match else "Unknown"
    
    title_match = re.search(r"<title>(.*?)</title>", body, re.IGNORECASE | re.DOTALL)
    title = title_match.group(1).strip() if title_match else "None"
    
    h1_match = re.search(r"<h1.*?>(.*?)</h1>", body, re.IGNORECASE | re.DOTALL)
    h1 = re.sub(r'<[^>]+>', '', h1_match.group(1)).strip() if h1_match else "None"
    
    canonical = "Yes" if re.search(r'<link\s+rel=["\']canonical["\']', body, re.IGNORECASE) else "No"
    faq = "Yes" if "FAQPage" in body else "No"
    
    og_image_match = re.search(r'<meta\s+property=["\']og:image["\']\s+content=["\'](.*?)["\']', body, re.IGNORECASE)
    if not og_image_match:
        og_image_match = re.search(r'<meta\s+content=["\'](.*?)["\']\s+property=["\']og:image["\']', body, re.IGNORECASE)
    og_image = og_image_match.group(1) if og_image_match else "None"
    
    # Heuristic for shell vs prerendered
    # Look for common app roots and check if they are empty
    # Also check if there's substantial text in the body
    body_stripped = re.sub(r'<script.*?>.*?</script>', '', body, flags=re.IGNORECASE | re.DOTALL)
    body_stripped = re.sub(r'<style.*?>.*?</style>', '', body_stripped, flags=re.IGNORECASE | re.DOTALL)
    text_content = re.sub(r'<[^>]+>', '', body_stripped).strip()
    
    is_shell = len(text_content) < 500 # Threshold
    shell_status = "Shell" if is_shell else "Prerendered"
    
    return {
        "URL": url,
        "Status": status,
        "Title": title,
        "H1": h1,
        "Canonical": canonical,
        "FAQ": faq,
        "og:image": og_image,
        "Type": shell_status
    }

results = []
for url in urls:
    results.append(fetch_info(url))

print(json.dumps(results, indent=2))
