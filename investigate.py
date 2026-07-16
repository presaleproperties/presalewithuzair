import subprocess
import re
import json
from html.parser import HTMLParser

class MetaParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = None
        self.h1 = None
        self.canonical = False
        self.faq = False
        self.og_image = None
        self.in_title = False
        self.in_h1 = False
        self.first_h1_found = False
        self.full_content = ""
        self.data_prerendered = False

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        if tag == 'title':
            self.in_title = True
        if tag == 'h1' and not self.first_h1_found:
            self.in_h1 = True
            self.first_h1_found = True
        if tag == 'link' and attrs_dict.get('rel') == 'canonical':
            self.canonical = True
        if tag == 'meta' and attrs_dict.get('property') == 'og:image':
            self.og_image = attrs_dict.get('content')
        if tag == 'meta' and attrs_dict.get('name') == 'og:image': # Fallback
            self.og_image = attrs_dict.get('content')
        if attrs_dict.get('data-prerendered') == 'true':
            self.data_prerendered = True
        
    def handle_endtag(self, tag):
        if tag == 'title':
            self.in_title = False
        if tag == 'h1':
            self.in_h1 = False

    def handle_data(self, data):
        if self.in_title:
            self.title = (self.title or "") + data
        if self.in_h1:
            self.h1 = (self.h1 or "") + data
        if "FAQPage" in data:
            self.faq = True
        self.full_content += data

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
        "curl", "-s", "-i", "-L",
        "-H", "Cache-Control: no-cache",
        "-H", "Pragma: no-cache",
        url
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, errors='ignore')
    
    parts = result.stdout.split('\n\n', 1)
    if len(parts) < 2:
        # Try \r\n\r\n
        parts = result.stdout.split('\r\n\r\n', 1)
        
    header_content = parts[0]
    body = parts[1] if len(parts) > 1 else ""
    
    status_match = re.search(r"HTTP/\d(?:\.\d)?\s+(\d+)", header_content)
    status = status_match.group(1) if status_match else "Unknown"
    
    parser = MetaParser()
    try:
        parser.feed(body)
    except:
        pass
    
    # Heuristic for shell vs prerendered
    # Look for data-prerendered="true" or significant text in body
    is_prerendered = parser.data_prerendered or len(parser.full_content.strip()) > 500
    
    return {
        "URL": url,
        "Status": status,
        "Title": parser.title.strip() if parser.title else "None",
        "H1": parser.h1.strip() if parser.h1 else "None",
        "Canonical": "Yes" if parser.canonical else "No",
        "FAQ": "Yes" if parser.faq else "No",
        "og:image": parser.og_image or "None",
        "Type": "Prerendered" if is_prerendered else "Shell"
    }

results = []
for url in urls:
    results.append(fetch_info(url))

# Print as a nice table
print(f"{'URL':<60} | {'Stat':<4} | {'Type':<11} | {'H1':<30} | {'Can?':<4} | {'FAQ?':<4} | {'Title'}")
print("-" * 150)
for r in results:
    url_short = r['URL'].replace('https://presalewithuzair.com', '')
    if url_short == '': url_short = '/'
    print(f"{url_short:<60} | {r['Status']:<4} | {r['Type']:<11} | {str(r['H1'])[:30]:<30} | {r['Canonical']:<4} | {r['FAQ']:<4} | {r['Title']}")

print("\nog:image values:")
for r in results:
    print(f"{r['URL']}: {r['og:image']}")

