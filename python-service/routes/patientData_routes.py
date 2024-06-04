from flask import Blueprint, jsonify
from db_config import get_db_connection

patientData_bp = Blueprint('patientData_bp', __name__)

#Data Point 
@patientData_bp.route('/patientData/', methods=['GET'])
def get_usage_percentage():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT TransactionTypeName, COUNT(*) AS UsageCount
            FROM rmit.FactTransaction_sub
            WHERE YEAR(TransactionDate) IN (2023, 2024)
            GROUP BY TransactionTypeName
        """)
        rows = cursor.fetchall()
        columns = [column[0] for column in cursor.description]
        usage_per_service = [dict(zip(columns, row)) for row in rows]

        # Calculate total count of transactions
        total_count = sum(row['UsageCount'] for row in usage_per_service)

        # Calculate percentage usage
        for row in usage_per_service:
            row['PercentageUsage'] = (row['UsageCount'] / total_count) * 100

        conn.close()
        return jsonify(usage_per_service)

    except Exception as e:
        return jsonify({'error': str(e)})