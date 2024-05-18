import pyodbc
import os
from dotenv import load_dotenv

load_dotenv()


server = os.getenv('DB_SERVER')
database = os.getenv('DB_NAME')
username = os.getenv('AZURE_USERNAME')
password = os.getenv('AZURE_PASSWORD')

connection_string = (
    f"DRIVER={{ODBC Driver 18 for SQL Server}};"
    f"SERVER=tcp:{server};"
    f"PORT=1433;"
    f"DATABASE={database};"
    f"UID={username};"
    f"PWD={password};"
    f"Encrypt=yes;"
    f"TrustServerCertificate=yes;"
    f"AUTHENTICATION=ActiveDirectoryPassword"
)

try:
    conn = pyodbc.connect(connection_string)
    print("Connection successful!")
    conn.close()
except Exception as e:
    print(f"Error: {e}")
