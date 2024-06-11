from flask import Blueprint, jsonify, request
from db_config import get_db_connection

getOption_bp = Blueprint('getOption_bp', __name__)

# Function to generate a range of years
def generate_year_range(start_year, end_year):
    return [str(year) for year in range(start_year, end_year + 1)]


# Modify the get_options route to use the generated year range
@getOption_bp.route('/getOption/options', methods=['GET'])
def get_options():
    option_type = request.args.get('type')
    conn = get_db_connection()

    if option_type == 'clinic':
        cursor = conn.cursor()
        cursor.execute("SELECT DISTINCT Clinic_ID, Clinic_Name FROM dbo.DimClinic")
        options = [{'value': row[0], 'label': row[1]} for row in cursor.fetchall()]
    elif option_type == 'year':
        # Generate a range of years
        start_year = 2020  # Modify this according to your requirement
        end_year = 2024   # Modify this according to your requirement
        year_range = generate_year_range(start_year, end_year)
        options = [{'value': year, 'label': year} for year in year_range]
    elif option_type == 'quarter':
        options = [{'value': q, 'label': f'Q{q}'} for q in range(1, 5)]
    else:
        options = []

    conn.close()
    return jsonify(options)


