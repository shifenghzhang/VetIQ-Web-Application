from flask import Blueprint, jsonify
from db_config import get_db_connection

serviceData_bp = Blueprint('serviceData_bp', __name__)


# Data Point 2
@serviceData_bp.route('/serviceData/transactionServiceCounts', methods=['GET'])
def get_transaction_counts():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT TransactionTypeName, DATEPART(month, TransactionDate) as Month, COUNT(*) as Count
            FROM rmit.FactTransaction_sub
            GROUP BY TransactionTypeName, DATEPART(month, TransactionDate)
            ORDER BY Month
        """)
        rows = cursor.fetchall()
        columns = [column[0] for column in cursor.description]
        result = [dict(zip(columns, row)) for row in rows]
        conn.close()
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)})
    
# Data Point 3
@serviceData_bp.route('/serviceData/revenueServicePercentage', methods=['GET'])
def get_revenue_percentage():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        # Query to get the total revenue per service for 2023 and 2024
        cursor.execute("""
            SELECT TransactionTypeName, SUM(TransactionDisplayAmt) as TotalRevenue 
            FROM rmit.FactTransaction_sub
            WHERE YEAR(TransactionDate) IN (2023, 2024)
            GROUP BY TransactionTypeName
        """)
        rows = cursor.fetchall()
        columns = [column[0] for column in cursor.description]
        revenue_per_service = [dict(zip(columns, row)) for row in rows]

        # Calculate total revenue for 2023 and 2024
        total_revenue = sum(row['TotalRevenue'] for row in revenue_per_service)

        # Calculate percentage contribution
        for row in revenue_per_service:
            row['PercentageContribution'] = (row['TotalRevenue'] / total_revenue) * 100

        conn.close()
        return jsonify(revenue_per_service)

    except Exception as e:
        return jsonify({'error': str(e)})

