from pymongo import MongoClient

MONGO_URI = "mongodb+srv://vetiq_team:vetiq@usersclustervetiq.liz1lwp.mongodb.net/?retryWrites=true&w=majority&appName=UsersClusterVetIQ"
<<<<<<< HEAD
=======
client = MongoClient(MONGO_URI)
>>>>>>> cf715bc0d0fc64c5d383a3c5308077d9068ab3d1
mongo_db = client["user_profiles"]
users_collection = mongo_db["users"]