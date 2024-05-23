from flask import Blueprint, jsonify, request
from db_config import get_db_connection
from mongodb import users_collection

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/users', methods=['GET'])
def get_users():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM DimUser")
        rows = cursor.fetchall()
        columns = [column[0] for column in cursor.description]
        result = [dict(zip(columns, row)) for row in rows]
        conn.close()
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)})
    
@user_bp.route('/mongo_users', methods=['GET'])
def get_mongo_users():
    try:
        users = list(users_collection.find({}, {'_id': 0}))
        return jsonify(users)
    except Exception as e:
        return jsonify({'error': str(e)})
    
@user_bp.route('/add_mongo_user', methods=['POST'])
def add_mongo_users():
    try:
        data = request.json
        users_collection.insert_one(data)
        return jsonify({'message': 'user added successfully'})
    except Exception as e:
        return jsonify({'error': str(e)})
    
@user_bp.route('/delete_mongo_user/<user_id>', methods=['DELETE'])
def delete_mongo_user(user_id):
    try:
        users_collection.delete_one({"user_id": user_id})
        return jsonify({"message": "User deleted successfully."})
    except Exception as e:
        return jsonify({'error': str(e)})