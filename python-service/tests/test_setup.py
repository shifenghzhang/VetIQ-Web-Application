from pymongo import MongoClient

MONGO_URI = "mongodb+srv://vetiq_team:vetiq@usersclustervetiq.liz1lwp.mongodb.net/?retryWrites=true&w=majority&appName=UsersClusterVetIQ"

def get_test_db():
    client = MongoClient(MONGO_URI)
    db = client['test_db']
    return db, client