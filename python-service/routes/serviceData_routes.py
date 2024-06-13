from flask import Blueprint, jsonify, request
from db_config import get_db_connection

serviceData_bp = Blueprint('serviceData_bp', __name__)

def parse_comma_separated_ints(value):
    if value:
        return [int(v) for v in value.split(',')]
    return []

# Data Point 1
@serviceData_bp.route('/serviceData/usedServicePercentage', methods=['GET'])
def get_usage_percentage():
    try:
        clinic_ids = parse_comma_separated_ints(request.args.get('ClinicID', default=None))
        years = parse_comma_separated_ints(request.args.get('Year', default=None))

        query = """
            SELECT TransactionTypeName, COUNT(*) AS UsageCount
            FROM rmit.FactTransaction_sub
            WHERE ClinicID BETWEEN 3 AND 7
        """
        
        params = []
        if clinic_ids:
            query += " AND ClinicID IN (" + ','.join(['?']*len(clinic_ids)) + ")"
            params.extend(clinic_ids)
        if years:
            query += " AND YEAR(TransactionDate) IN (" + ','.join(['?']*len(years)) + ")"
            params.extend(years)
        
        query += " GROUP BY TransactionTypeName"

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(query, params)
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
        clinic_ids = parse_comma_separated_ints(request.args.get('ClinicID', default=None))
        years = parse_comma_separated_ints(request.args.get('Year', default=None))

        query = """
            SELECT TransactionTypeName, DATEPART(month, TransactionDate) as Month, COUNT(*) as Count
            FROM rmit.FactTransaction_sub
            WHERE ClinicID BETWEEN 3 AND 7
        """
        
        params = []
        if clinic_ids:
            query += " AND ClinicID IN (" + ','.join(['?']*len(clinic_ids)) + ")"
            params.extend(clinic_ids)
        if years:
            query += " AND YEAR(TransactionDate) IN (" + ','.join(['?']*len(years)) + ")"
            params.extend(years)
        
        query += " GROUP BY TransactionTypeName, DATEPART(month, TransactionDate) ORDER BY Month"

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(query, params)
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
        clinic_ids = parse_comma_separated_ints(request.args.get('ClinicID', default=None))
        years = parse_comma_separated_ints(request.args.get('Year', default=None))

        query = """
            SELECT SUM(TransactionDisplayAmt) as TotalRevenue 
            FROM rmit.FactTransaction_sub
            WHERE ClinicID BETWEEN 3 AND 7
        """
        
        params = []
        if clinic_ids:
            query += " AND ClinicID IN (" + ','.join(['?']*len(clinic_ids)) + ")"
            params.extend(clinic_ids)
        if years:
            query += " AND YEAR(TransactionDate) IN (" + ','.join(['?']*len(years)) + ")"
            params.extend(years)
        
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(query, params)
        rows = cursor.fetchall()
        columns = [column[0] for column in cursor.description]
        revenue_per_service = [dict(zip(columns, row)) for row in rows]

        conn.close()
        return jsonify(revenue_per_service)

    except Exception as e:
        return jsonify({'error': str(e)})

#####
@serviceData_bp.route('/serviceData/totalRevenueServiceWithoutConsultation', methods=['GET'])
def get_revenue_total_without_consultation():
    try:
        clinic_ids = parse_comma_separated_ints(request.args.get('ClinicID', default=None))
        years = parse_comma_separated_ints(request.args.get('Year', default=None))
        # Query to get the total revenue per service excluding Consultation service
        query = """
            SELECT SUM(TransactionDisplayAmt) as TotalRevenue 
            FROM rmit.FactTransaction_sub
            WHERE ClinicID BETWEEN 3 AND 7
            AND TransactionTypeName != 'Consultation'
        """
        
        params = []
        if clinic_ids:
            query += " AND ClinicID IN (" + ','.join(['?']*len(clinic_ids)) + ")"
            params.extend(clinic_ids)
        if years:
            query += " AND YEAR(TransactionDate) IN (" + ','.join(['?']*len(years)) + ")"
            params.extend(years)
        
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(query, params)
        rows = cursor.fetchall()
        columns = [column[0] for column in cursor.description]
        revenue_per_service = [dict(zip(columns, row)) for row in rows]

        conn.close()
        return jsonify(revenue_per_service)

    except Exception as e:
        return jsonify({'error': str(e)})

@serviceData_bp.route('/serviceData/revenueServicePercentage', methods=['GET'])
def get_revenue_percentage():
    try:
        clinic_ids = parse_comma_separated_ints(request.args.get('ClinicID', default=None))
        years = parse_comma_separated_ints(request.args.get('Year', default=None))

        query = """
            SELECT TransactionTypeName, SUM(TransactionDisplayAmt) as TotalRevenue 
            FROM rmit.FactTransaction_sub
            WHERE ClinicID BETWEEN 3 AND 7
        """
        
        params = []
        if clinic_ids:
            query += " AND ClinicID IN (" + ','.join(['?']*len(clinic_ids)) + ")"
            params.extend(clinic_ids)
        if years:
            query += " AND YEAR(TransactionDate) IN (" + ','.join(['?']*len(years)) + ")"
            params.extend(years)
        
        query += " GROUP BY TransactionTypeName"
        
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(query, params)
        rows = cursor.fetchall()
        columns = [column[0] for column in cursor.description]
        revenue_per_service = [dict(zip(columns, row)) for row in rows]

        total_revenue = sum(row['TotalRevenue'] for row in revenue_per_service)

        for row in revenue_per_service:
            row['PercentageContribution'] = (row['TotalRevenue'] / total_revenue) * 100

        conn.close()
        return jsonify(revenue_per_service)

    except Exception as e:
        return jsonify({'error': str(e)})
   


@serviceData_bp.route('/serviceData/topServices', methods=['GET'])
def get_top_services():
    try:
        clinic_ids = parse_comma_separated_ints(request.args.get('ClinicID', default=None))
        years = parse_comma_separated_ints(request.args.get('Year', default=None))

        query = """
            SELECT TOP 10 TransactionTypeName, COUNT(*) as ServiceCount, SUM(TransactionDisplayAmt) as TotalRevenue 
            FROM rmit.FactTransaction_sub
            WHERE ClinicID BETWEEN 3 AND 7
        """
        
        params = []
        if clinic_ids:
            query += " AND ClinicID IN (" + ','.join(['?']*len(clinic_ids)) + ")"
            params.extend(clinic_ids)
        if years:
            query += " AND YEAR(TransactionDate) IN (" + ','.join(['?']*len(years)) + ")"
            params.extend(years)
        
        query += " GROUP BY TransactionTypeName"
        query += " ORDER BY TotalRevenue DESC"
        
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(query, params)
        rows = cursor.fetchall()
        columns = [column[0] for column in cursor.description]
        top_services = [dict(zip(columns, row)) for row in rows]

        total_revenue = sum(row['TotalRevenue'] for row in top_services)

        for row in top_services:
            row['PercentageContribution'] = (row['TotalRevenue'] / total_revenue) * 100

        conn.close()
        return jsonify(top_services)

    except Exception as e:
        return jsonify({'error': str(e)})




