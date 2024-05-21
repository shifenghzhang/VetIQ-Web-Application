import os
from dotenv import load_dotenv
import pyodbc

load_dotenv()

DB_SERVER = os.getenv('DB_SERVER')
DB_NAME = os.getenv('DB_NAME')
AZURE_USERNAME = os.getenv('AZURE_USERNAME')
AZURE_PASSWORD = os.getenv('AZURE_PASSWORD')

CONNECTION_STRING = (
    f"DRIVER={{ODBC Driver 18 for SQL Server}};"
    f"SERVER=tcp:{DB_SERVER};"
    f"PORT=1433;"
    f"DATABASE={DB_NAME};"
    f"UID={AZURE_USERNAME};"
    f"PWD={AZURE_PASSWORD};"
    f"Encrypt=yes;"
    f"TrustServerCertificate=yes;"
    f"AUTHENTICATION=ActiveDirectoryPassword"
)

def get_db_connection():
    try:
        conn = pyodbc.connect(CONNECTION_STRING)
        return conn
    except Exception as e:
        print(f"Error connecting to the database: {e}")
        raise
