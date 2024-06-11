from flask import Blueprint, jsonify
from db_config import get_db_connection

serviceData_bp = Blueprint('serviceData_bp', __name__)


#Data Point 1    
@serviceData_bp.route('/serviceData/usedServicePercentage', methods=['GET'])
def get_usage_percentage():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT TransactionTypeName, COUNT(*) AS UsageCount
            FROM rmit.FactTransaction_sub
            WHERE ClinicID BETWEEN 3 AND 7
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



# Data Point 2
@serviceData_bp.route('/serviceData/transactionServiceCounts', methods=['GET'])
def get_transaction_counts():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT TransactionTypeName, DATEPART(month, TransactionDate) as Month, COUNT(*) as Count
            FROM rmit.FactTransaction_sub
            WHERE ClinicID BETWEEN 3 AND 7
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
    
# Data point 2: text total     
@serviceData_bp.route('/serviceData/totalRevenueService', methods=['GET'])
def get_revenue_total():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        # Query to get the total revenue per service for 2023 and 2024
        cursor.execute("""
            SELECT SUM(TransactionDisplayAmt) as TotalRevenue 
            FROM rmit.FactTransaction_sub
            WHERE ClinicID BETWEEN 3 AND 7
        """)
        rows = cursor.fetchall()
        columns = [column[0] for column in cursor.description]
        revenue_per_service = [dict(zip(columns, row)) for row in rows]

        conn.close()
        return jsonify(revenue_per_service)

    except Exception as e:
        return jsonify({'error': str(e)})
    
@serviceData_bp.route('/serviceData/totalRevenueServiceWithoutConsultation', methods=['GET'])
def get_revenue_total_without_consultation():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        # Query to get the total revenue per service for 2023 and 2024 excluding Consultation service
        cursor.execute("""
            SELECT SUM(TransactionDisplayAmt) as TotalRevenue 
            FROM rmit.FactTransaction_sub
            WHERE TransactionTypeName != 'Consultation' 
        """)
        rows = cursor.fetchall()
        columns = [column[0] for column in cursor.description]
        revenue_per_service = [dict(zip(columns, row)) for row in rows]

        conn.close()
        return jsonify(revenue_per_service)

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
            WHERE ClinicID BETWEEN 3 AND 7
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
    

@serviceData_bp.route('/serviceData/topServices', methods=['GET'])
def get_top_services():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        # Query to get the total revenue per service for 2023 and 2024
        cursor.execute("""
            SELECT TOP 10 TransactionTypeName, COUNT(*) as ServiceCount, SUM(TransactionDisplayAmt) as TotalRevenue 
            FROM rmit.FactTransaction_sub
            WHERE ClinicID BETWEEN 3 AND 7
            GROUP BY TransactionTypeName
            ORDER BY TotalRevenue DESC;
        """)
        rows = cursor.fetchall()
        columns = [column[0] for column in cursor.description]
        top_services = [dict(zip(columns, row)) for row in rows]

        # Calculate total revenue for 2023 and 2024
        total_revenue = sum(row['TotalRevenue'] for row in top_services)

        # Calculate percentage contribution
        for row in top_services:
            row['PercentageContribution'] = (row['TotalRevenue'] / total_revenue) * 100

        conn.close()
        return jsonify(top_services)

    except Exception as e:
        return jsonify({'error': str(e)})






