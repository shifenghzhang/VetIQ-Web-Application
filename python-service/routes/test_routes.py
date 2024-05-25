from flask import Blueprint, jsonify
from db_config import get_db_connection

clinic_bp = Blueprint('clinic_bp', __name__)

@clinic_bp.route('/test', methods=['GET'])
def get_serviceData():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM rmit.DimClient")
        rows = cursor.fetchall()
        columns = [column[0] for column in cursor.description]
        result = [dict(zip(columns, row)) for row in rows]
        conn.close()
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)})