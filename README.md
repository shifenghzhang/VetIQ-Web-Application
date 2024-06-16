# VetIQ Web Development Project

Created in collaboration with members from group PG 378 VetIQ

## Installation

For VPN and Database connection, refer to "Database access.docx" included in the submission.

## Running the Application

### Frontend

1. **Clone the repository**

2. **Install the dependencies**:
```npm install```

3. **Navigate to the backend directory**:
```cd python-service```
Install the Python dependencies:

```pip install -r requirements.txt```

4. **Create a .env file in the root of python-service directory and add the following information**:

DB_SERVER=cc-sqlsrv-aue-01.privatelink.database.windows.net
DB_NAME=DataStore_Demo
DB_PORT=1433
AZURE_USERNAME=yourusername
AZURE_PASSWORD=yourpassword

5. **Running the Application**:
Start the frontend:
```npm run dev```

Start the backend:
```cd python-sercvice```
```python app.py```

Make sure you have your VPN connected and the database accessible as per the instructions in "Database access.docx".