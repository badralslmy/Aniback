
import sqlite3

DATABASE_NAME = "news_urls.db"

def init_db():
    conn = sqlite3.connect(DATABASE_NAME)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS source_urls (
            url TEXT PRIMARY KEY
        )
    """)
    conn.commit()
    conn.close()

def add_url(url):
    conn = sqlite3.connect(DATABASE_NAME)
    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO source_urls (url) VALUES (?)", (url,))
        conn.commit()
        return True
    except sqlite3.IntegrityError:
        return False # URL already exists
    finally:
        conn.close()

def url_exists(url):
    conn = sqlite3.connect(DATABASE_NAME)
    cursor = conn.cursor()
    cursor.execute("SELECT 1 FROM source_urls WHERE url = ?", (url,))
    exists = cursor.fetchone() is not None
    conn.close()
    return exists


