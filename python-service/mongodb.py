from pymongo import MongoClient

MONGO_URI = "mongodb+srv://vetiq_team:vetiq@usersclustervetiq.liz1lwp.mongodb.net/?retryWrites=true&w=majority&appName=UsersClusterVetIQ"
client = MongoClient(MONGO_URI)
mongo_db = client["user_profiles"]
users_collection = mongo_db["users"]