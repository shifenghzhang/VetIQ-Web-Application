import pyodbc
import pymongo
import random
import string
from db_config import get_db_connection
from mongodb import users_collection

# Function to generate a random password
def generate_password(length=8):
    characters = string.ascii_letters + string.digits
    password = ''.join(random.choice(characters) for i in range(length))
    return password

# Import user details from SQL Server and store in MongoDB
try:
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT UserID, UserName, EmailAddressString, SiteID, ConsultingVet FROM DimUser")
    
    for row in cursor.fetchall():
        user_id = row.UserID
        user_name = row.UserName
        password = generate_password()
        email = row.EmailAddressString
        site_id = row.SiteID
        consulting_vet = row.ConsultingVet
        
        # Check if user already exists in MongoDB
        if users_collection.find_one({"user_id": user_id}):
            print(f"User {user_name} already exists. Skipping insertion.")
            continue
        
        user_data = {
            "user_id": user_id,
            "user_name": user_name,
            "password": password,
            "email": email,
            "site_id": site_id,
            "consulting_vet": consulting_vet
        }
        
        users_collection.insert_one(user_data)
        print(f"Inserted user {user_name} with generated password.")
    
except pyodbc.Error as e:
    print(f"Error: {e}")
finally:
    cursor.close()
<<<<<<< HEAD
    connection.close()
=======
    connection.close()
>>>>>>> cf715bc0d0fc64c5d383a3c5308077d9068ab3d1
