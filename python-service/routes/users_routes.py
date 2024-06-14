from flask import Blueprint, jsonify, request
from db_config import get_db_connection
from mongodb import users_collection
import smtplib
from email.mime.text import MIMEText
import random
import string

user_bp = Blueprint('user_bp', __name__)

def generate_password(length=8):
    letters = string.ascii_letters + string.digits
    return ''.join(random.choice(letters) for i in range(length))

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
    
@user_bp.route('/resetPassword', methods=['POST'])
def reset_password_handler():
    data = request.get_json()
    email = data.get('email')
    if not email:
        return jsonify({'error': 'Email is required'}), 400

    # Check if email exists in the MongoDB collection
    user = users_collection.find_one({'email': email})
    if not user:
        return jsonify({'error': 'Email not found'}), 404

    new_password = generate_password()

    # Update the password and must_change_password flag in the MongoDB collection
    try:
        users_collection.update_one(
            {'email': email},
            {'$set': {'password': new_password, 'must_change_password': True}}
        )
    except Exception as e:
        return jsonify({'error': f'Failed to update password: {str(e)}'}), 500

    # Set up the server and email details
    smtp_server = 'sandbox.smtp.mailtrap.io'
    smtp_port = 2525
    # Using mailtrap as a proof of concept, can be changed
    smtp_user = '8e100f876f1d3e'
    smtp_pass = '42dc7803516e2b'

    msg = MIMEText(f'Your new password is: {new_password}\n\nNote: This is a test email.')
    msg['Subject'] = 'Password Reset'
    msg['From'] = 'your-email@example.com'
    msg['To'] = email

    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.login(smtp_user, smtp_pass)
            server.sendmail('your-email@example.com', email, msg.as_string())
        return jsonify({'message': 'Password reset email sent'}), 200
    except Exception as e:
        return jsonify({'error': f'Failed to send email: {str(e)}'}), 500

@user_bp.route('/changePassword', methods=['POST'])
def change_password_handler():
    data = request.get_json()
    email = data.get('email')
    new_password = data.get('newPassword')
    if not email or not new_password:
        return jsonify({'error': 'Email and new password are required'}), 400

    try:
        users_collection.update_one(
            {'email': email},
            {'$set': {'password': new_password, 'must_change_password': False}}
        )
        user = users_collection.find_one({'email': email}, {'_id': 0})
        return jsonify(user), 200
    except Exception as e:
        return jsonify({'error': f'Failed to change password: {str(e)}'}), 500
