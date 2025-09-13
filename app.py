
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def home():
    return "Anime News Translator Backend"

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)




from appwrite.client import Client
from appwrite.services.databases import Databases

# Appwrite Client
client = Client()
(client
    .set_endpoint(os.getenv('APPWRITE_ENDPOINT')) # Your API Endpoint
    .set_project(os.getenv('APPWRITE_PROJECT_ID')) # Your project ID
    .set_key(os.getenv('APPWRITE_API_KEY')) # Your secret API key
)
databases = Databases(client)

APPWRITE_DATABASE_ID = os.getenv('APPWRITE_DATABASE_ID')
APPWRITE_COLLECTION_ID = os.getenv('APPWRITE_COLLECTION_ID')

def create_appwrite_document(data):
    try:
        document = databases.create_document(
            database_id=APPWRITE_DATABASE_ID,
            collection_id=APPWRITE_COLLECTION_ID,
            document_id='unique()',
            data=data
        )
        return document
    except Exception as e:
        print(f"Error creating Appwrite document: {e}")
        return None





from database import init_db

init_db()




import google.generativeai as genai

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-pro")

def translate_text(text):
    try:
        response = model.generate_content(f"Translate the following English text to Arabic: {text}")
        return response.text
    except Exception as e:
        print(f"Error translating text: {e}")
        return None




from scheduler import scheduler

if __name__ == '__main__':
    scheduler.start()
    app.run(debug=True, host='0.0.0.0', port=5000)




@app.route("/api/fetch-news", methods=["GET"])
def fetch_news_endpoint():
    from scheduler import fetch_and_translate_news
    fetch_and_translate_news()
    return jsonify({"message": "News fetching initiated."}), 200




@app.route("/api/queue", methods=["GET"])
def get_queue():
    # This endpoint would ideally show articles in a 'pending' or 'translating' state.
    # For now, we'll return a placeholder as the current scheduler processes immediately.
    return jsonify({"message": "Queue functionality to be implemented for pending/translating articles.", "queue": []}), 200




from appwrite.query import Query

@app.route("/api/news", methods=["GET"])
def get_translated_news():
    try:
        # Implement search, filter, sort as per spec
        # For simplicity, fetching all for now
        documents = databases.list_documents(
            database_id=APPWRITE_DATABASE_ID,
            collection_id=APPWRITE_COLLECTION_ID,
            queries=[Query.order_desc("$createdAt")]
        )
        return jsonify(documents["documents"]), 200
    except Exception as e:
        print(f"Error fetching translated news from Appwrite: {e}")
        return jsonify({"error": "Failed to retrieve translated news."}), 500




@app.route("/api/settings", methods=["POST"])
def update_settings():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400

    # Update .env file with new settings
    # This is a simplified example. In a real application, you would want more robust configuration management.
    # For API keys, you might want to store them securely, not directly in .env via an API call.
    updated_env_vars = []
    for key, value in data.items():
        if key in ["APPWRITE_ENDPOINT", "APPWRITE_PROJECT_ID", "APPWRITE_API_KEY", 
                   "APPWRITE_DATABASE_ID", "APPWRITE_COLLECTION_ID", "GEMINI_API_KEY", 
                   "SCRAPER_API_URL"]:
            os.environ[key] = value
            updated_env_vars.append(f"{key}={value}")

    # Rewrite the .env file (simplified, consider a more robust approach for production)
    with open(".env", "w") as f:
        f.write("\n".join(updated_env_vars))
    
    # Reload environment variables (if necessary, though os.environ is updated)
    load_dotenv(override=True)

    return jsonify({"message": "Settings updated successfully."}), 200




@app.route("/api/status", methods=["GET"])
def get_status():
    # Placeholder for actual status checks
    status = {
        "total_articles_fetched": 0, # To be implemented
        "articles_in_queue": 0, # To be implemented
        "successfully_translated": 0, # To be implemented
        "failed_translations": 0, # To be implemented
        "average_translation_time": "N/A", # To be implemented
        "average_news_fetching_time": "N/A", # To be implemented
        "server_status": "online",
        "api_keys_status": {
            "scraper_api": "configured" if os.getenv("SCRAPER_API_URL") else "not configured",
            "gemini_api": "configured" if os.getenv("GEMINI_API_KEY") else "not configured",
            "appwrite": "configured" if os.getenv("APPWRITE_PROJECT_ID") else "not configured",
        }
    }
    return jsonify(status), 200





