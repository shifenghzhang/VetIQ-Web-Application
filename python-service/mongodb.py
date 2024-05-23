from pymongo import MongoClient

MONGO_URI = "mongodb://localhost:27017"
client = MongoClient(MONGO_URI)
mongo_db = client["user_profiles"]
users_collection = mongo_db["users"]