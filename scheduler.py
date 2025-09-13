
import requests
import os
from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from database import add_url, url_exists
from app import translate_text, create_appwrite_document # Import from app.py

SCRAPER_API_URL = os.getenv("SCRAPER_API_URL")

def fetch_and_translate_news():
    print(f"[{datetime.now()}] Fetching news...")
    try:
        response = requests.get(SCRAPER_API_URL)
        response.raise_for_status()  # Raise an exception for HTTP errors
        news_articles = response.json()

        for article in news_articles:
            url = article.get("url")
            if url and not url_exists(url):
                print(f"New article found: {article.get("title")}")
                add_url(url)

                # Translate title and content
                translated_title = translate_text(article.get("title", ""))
                translated_content = translate_text(article.get("content", ""))

                if translated_title and translated_content:
                    appwrite_data = {
                        "title": translated_title,
                        "content": translated_content,
                        "slug": article.get("slug"),
                        "url": url,
                        "media": article.get("media", []),
                        "status": "translated"
                    }
                    create_appwrite_document(appwrite_data)
                    print(f"Successfully translated and stored: {translated_title}")
                else:
                    print(f"Failed to translate article: {article.get("title")}")
            else:
                print(f"Article already exists or has no URL: {article.get("title")}")

    except requests.exceptions.RequestException as e:
        print(f"Error fetching news: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

scheduler = BackgroundScheduler()
scheduler.add_job(fetch_and_translate_news, 'interval', minutes=30) # Default to 30 minutes



