from flask import Blueprint, jsonify, request
from db_config import get_db_connection

getOption_bp = Blueprint('getOption_bp', __name__)

def get_columns_with_names(conn, substrings, table_name=None):
    """Function to get columns with specified substrings."""
    cursor = conn.cursor()
    if table_name:
        cursor.execute(f"SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '{table_name}'")
    else:
        cursor.execute("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS")
    columns = [row[0] for row in cursor.fetchall()]
    matching_columns = [col for col in columns if any(substring in col.lower() for substring in substrings)]
    return matching_columns

# Function to extract year values from date strings
def extract_year_from_date(date_string):
    try:
        # Assuming the date format is consistent, you can extract the year using string manipulation
        year = date_string.split('-')[0]  # Assuming the date format is YYYY-MM-DD
        return year
    except IndexError:
        return None  # Return None if the date format is not as expected or if an error occurs

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


@getOption_bp.route('/getOption/data', methods=['GET'])
def get_data():
    clinic = request.args.get('clinic')
    year = request.args.get('year')
    quarter = request.args.get('quarter')

    conn = get_db_connection()
    cursor = conn.cursor()

    # Base query
    query = "SELECT * FROM your_table WHERE 1=1"

    # Check if clinic is provided
    if clinic:
        query += " AND clinic_id = :clinic"
    # Check if year is provided
    if year:
        query += " AND year_column = :year"
    # Check if quarter is provided
    if quarter:
        query += " AND quarter_column = :quarter"

