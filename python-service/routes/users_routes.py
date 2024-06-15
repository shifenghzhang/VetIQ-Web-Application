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
        result = users_collection.delete_one({"user_id": int(user_id)})
        if result.deleted_count == 1:
            return jsonify({"message": "User deleted successfully."})
        else:
            return jsonify({"message": "User not found."}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@user_bp.route('/update_mongo_user_password/<user_id>', methods=['PUT'])
def update_mongo_user_password(user_id):
    try:
        data = request.json
        password = data.get('password')

        if not password:
            return jsonify({"message": "Password is required."}), 400

        result = users_collection.update_one(
            {"user_id": int(user_id)},
            {"$set": {"password": password}}
        )

        if result.modified_count == 1:
            return jsonify({"message": "Password updated successfully."})
        else:
            return jsonify({"message": "User not found."}), 404

@user_bp.route('/add_engagement_survey', methods=['POST'])
def add_engagement_survey():
    try:
        data = request.json
        user_id = data.get('user_id')
        new_data = data.get('new_data')

        result = users_collection.update_one(
            {"user_id": int(user_id)},
            {"$set": {"engagement_survey": new_data}}
        )

        if result.matched_count == 1:
            return jsonify({"message": "Survey data added successfully."})
        else:
            return jsonify({"message": "User not found."}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@user_bp.route('/add_analytics_service_survey', methods=['POST'])
def add_analytics_service_survey():
    try:
        data = request.json
        user_id = data.get('user_id')
        new_data = data.get('new_data')

        result = users_collection.update_one(
            {"user_id": int(user_id)},
            {"$set": {"analytics_service_survey": new_data}}
        )

        if result.matched_count == 1:
            return jsonify({"message": "Survey data added successfully."})
        else:
            return jsonify({"message": "User not found."}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500