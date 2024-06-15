from flask import Blueprint, jsonify, request
from db_config import get_db_connection

appointmentData_bp = Blueprint('appointmentData_bp', __name__)

def parse_comma_separated_ints(value):
    if value:
        return [int(v) for v in value.split(',')]
    return []

#Data Point 7
@appointmentData_bp.route('/appointmentData/returningPatientsScheduledInfo', methods=['GET'])
def get_returning_patients_info():
    try:
        clinic_ids = parse_comma_separated_ints(request.args.get('ClinicID', default=None))
        years = parse_comma_separated_ints(request.args.get('Year', default=None))

        base_query = """
            WITH PatientVisitCounts AS (
                SELECT Patient_ID, COUNT(*) as VisitCount
                FROM dbo.FactAppointment
                WHERE Clinic_ID BETWEEN 3 AND 7
        """
        
        params = []
        if clinic_ids:
            base_query += " AND Clinic_ID IN (" + ','.join(['?']*len(clinic_ids)) + ")"
            params.extend(clinic_ids)
        if years:
            base_query += " AND YEAR(Appointment_DateTime) IN (" + ','.join(['?']*len(years)) + ")"
            params.extend(years)
        
        base_query += """
                GROUP BY Patient_ID
            )
        """
        
        percentage_query = """
            SELECT 
                (CAST(SUM(CASE WHEN VisitCount > 2 THEN 1 ELSE 0 END) AS FLOAT) / COUNT(*)) * 100 AS ReturningPatientsPercentage
            FROM PatientVisitCounts
        """
        
        total_count_query = """
            SELECT 
                COUNT(*) AS ReturningPatientsCount
            FROM PatientVisitCounts
            WHERE VisitCount > 2
        """
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Execute the percentage query
        cursor.execute(base_query + percentage_query, params)
        percentage_result = cursor.fetchone()
        returning_patients_percentage = percentage_result[0] if percentage_result else 0.0
        
        # Execute the total count query
        cursor.execute(base_query + total_count_query, params)
        count_result = cursor.fetchone()
        returning_patients_count = count_result[0] if count_result else 0
        
        conn.close()
        
        return jsonify({
            'ReturningPatientsPercentage': returning_patients_percentage,
            'ReturningPatientsCount': returning_patients_count
        })

    except Exception as e:
        return jsonify({'error': str(e)})

    
@appointmentData_bp.route('/appointmentData/confirmedAppointmentsInfo', methods=['GET'])
def get_confirmed_appointments_info():
    try:
        clinic_ids = parse_comma_separated_ints(request.args.get('ClinicID', default=None))
        years = parse_comma_separated_ints(request.args.get('Year', default=None))

        base_query = """
            WITH AppointmentStatusCounts AS (
                SELECT Patient_ID, COUNT(*) as TotalAppointments,
                       SUM(CASE WHEN Status_Name = 'Confirmed' THEN 1 ELSE 0 END) as ConfirmedAppointments
                FROM dbo.FactAppointment
                WHERE Clinic_ID BETWEEN 3 AND 7
        """
        
        params = []
        if clinic_ids:
            base_query += " AND Clinic_ID IN (" + ','.join(['?']*len(clinic_ids)) + ")"
            params.extend(clinic_ids)
        if years:
            base_query += " AND YEAR(Appointment_DateTime) IN (" + ','.join(['?']*len(years)) + ")"
            params.extend(years)
        
        base_query += """
                GROUP BY Patient_ID
            )
        """
        
        percentage_query = """
            SELECT 
                (CAST(SUM(ConfirmedAppointments) AS FLOAT) / SUM(TotalAppointments)) * 100 AS ConfirmedAppointmentsPercentage
            FROM AppointmentStatusCounts
        """
        
        total_count_query = """
            SELECT 
                SUM(ConfirmedAppointments) AS ConfirmedAppointmentsCount
            FROM AppointmentStatusCounts
        """
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Execute the percentage query
        cursor.execute(base_query + percentage_query, params)
        percentage_result = cursor.fetchone()
        confirmed_appointments_percentage = percentage_result[0] if percentage_result else 0.0
        
        # Execute the total count query
        cursor.execute(base_query + total_count_query, params)
        count_result = cursor.fetchone()
        confirmed_appointments_count = count_result[0] if count_result else 0
        
        conn.close()
        
        return jsonify({
            'ConfirmedAppointmentsPercentage': confirmed_appointments_percentage,
            'ConfirmedAppointmentsCount': confirmed_appointments_count
        })

    except Exception as e:
        return jsonify({'error': str(e)})
    

#Data Point 8
@appointmentData_bp.route('/appointmentData/totalAppointmentsCount', methods=['GET'])
def get_total_appointments_count():
    try:
        clinic_ids = parse_comma_separated_ints(request.args.get('ClinicID', default=None))
        years = parse_comma_separated_ints(request.args.get('Year', default=None))

        query = """
            SELECT COUNT(Appointment_ID) as TotalAppointmentsCount
            FROM dbo.FactAppointment
            WHERE Clinic_ID BETWEEN 3 AND 7
        """
        
        params = []
        if clinic_ids:
            query += " AND Clinic_ID IN (" + ','.join(['?']*len(clinic_ids)) + ")"
            params.extend(clinic_ids)
        if years:
            query += " AND YEAR(Appointment_DateTime) IN (" + ','.join(['?']*len(years)) + ")"
            params.extend(years)
        
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(query, params)
        result = cursor.fetchone()
        total_appointments_count = result[0] if result else 0

        conn.close()
        return jsonify({'TotalAppointmentsCount': total_appointments_count})

    except Exception as e:
        return jsonify({'error': str(e)})
    
#Data Point 9    
@appointmentData_bp.route('/appointmentData/attendedAppointmentsInfo', methods=['GET'])
def get_attended_appointments_info():
    try:
        clinic_ids = parse_comma_separated_ints(request.args.get('ClinicID', default=None))
        years = parse_comma_separated_ints(request.args.get('Year', default=None))

        excluded_appointment_types = [
            'No More', 'No Show 1', 'No Show 2', 'No Show 3',
            'Unavailable', 'zNo Show', 'block off', 'Notice'
        ]
        
        base_query = """
            SELECT COUNT(Appointment_ID) as TotalAppointments,
                   SUM(CASE WHEN AppointmentType_Name NOT IN ({}) THEN 1 ELSE 0 END) as AttendedAppointments
            FROM dbo.FactAppointment
            WHERE Clinic_ID BETWEEN 3 AND 7
        """.format(','.join(['?']*len(excluded_appointment_types)))
        
        params = excluded_appointment_types
        if clinic_ids:
            base_query += " AND Clinic_ID IN (" + ','.join(['?']*len(clinic_ids)) + ")"
            params.extend(clinic_ids)
        if years:
            base_query += " AND YEAR(Appointment_DateTime) IN (" + ','.join(['?']*len(years)) + ")"
            params.extend(years)
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Execute the query
        cursor.execute(base_query, params)
        result = cursor.fetchone()
        total_appointments = result[0] if result else 0
        attended_appointments_count = result[1] if result else 0
        
        # Calculate the percentage
        attended_appointments_percentage = (attended_appointments_count / total_appointments * 100) if total_appointments > 0 else 0.0
        
        conn.close()
        
        return jsonify({
            'AttendedAppointmentsPercentage': attended_appointments_percentage,
            'AttendedAppointmentsCount': attended_appointments_count
        })

    except Exception as e:
        return jsonify({'error': str(e)})
    
#Data Point 11
@appointmentData_bp.route('/appointmentData/patientRetentionAndAcquisition', methods=['GET'])
def get_patient_retention_and_acquisition():
    try:
        clinic_ids = parse_comma_separated_ints(request.args.get('ClinicID', default=None))
        years = parse_comma_separated_ints(request.args.get('Year', default=None))

        base_query = """
            SELECT 
                YEAR(Appointment_DateTime) AS AppointmentYear,
                COUNT(*) AS TotalAppointments,
                SUM(CASE WHEN AppointmentType_Name LIKE '%New%' THEN 1 ELSE 0 END) AS NewPatientVisits
            FROM dbo.FactAppointment
            WHERE Clinic_ID BETWEEN 3 AND 7
        """
        
        params = []
        if clinic_ids:
            base_query += " AND Clinic_ID IN (" + ','.join(['?']*len(clinic_ids)) + ")"
            params.extend(clinic_ids)
        if years:
            base_query += " AND YEAR(Appointment_DateTime) IN (" + ','.join(['?']*len(years)) + ")"
            params.extend(years)
        
        base_query += """
            GROUP BY YEAR(Appointment_DateTime)
            ORDER BY YEAR(Appointment_DateTime)
        """
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute(base_query, params)
        rows = cursor.fetchall()
        
        retention_and_acquisition_data = []
        for row in rows:
            appointment_year = row[0]
            total_appointments = row[1]
            new_patient_visits = row[2]
            
            # Calculate retention rate
            returning_patient_visits = total_appointments - new_patient_visits
            retention_rate = (returning_patient_visits / total_appointments) * 100 if total_appointments > 0 else 0.0
            
            retention_and_acquisition_data.append({
                'AppointmentYear': appointment_year,
                'TotalAppointments': total_appointments,
                'NewPatientVisits': new_patient_visits,
                'ReturningPatientVisits': returning_patient_visits,
                'RetentionRatePercentage': retention_rate
            })
        
        conn.close()
        
        return jsonify(retention_and_acquisition_data)

    except Exception as e:
        return jsonify({'error': str(e)})
    
  
@appointmentData_bp.route('/appointmentData/patientType', methods=['GET'])
def get_compare_patients():
    try:
        clinic_ids = parse_comma_separated_ints(request.args.get('ClinicID', default=None))
        years = parse_comma_separated_ints(request.args.get('Year', default=None))
        include_new_patients = request.args.get('IncludeNewPatients', default=False, type=bool)

        base_query = """
            WITH PatientVisitCounts AS (
                SELECT Patient_ID, COUNT(*) as VisitCount
                FROM dbo.FactAppointment
                WHERE Clinic_ID BETWEEN 3 AND 7
        """
        
        params = []
        if clinic_ids:
            base_query += " AND Clinic_ID IN (" + ','.join(['?']*len(clinic_ids)) + ")"
            params.extend(clinic_ids)
        if years:
            base_query += " AND YEAR(Appointment_DateTime) IN (" + ','.join(['?']*len(years)) + ")"
            params.extend(years)
        
        if include_new_patients:
            base_query += " AND AppointmentType_Name LIKE '%New%'"
        
        base_query += """
                GROUP BY Patient_ID
            )
        """
        
        percentage_query = """
            SELECT 
                (CAST(SUM(CASE WHEN VisitCount > 2 THEN 1 ELSE 0 END) AS FLOAT) / COUNT(*)) * 100 AS ReturningPatientsPercentage,
                100 - (CAST(SUM(CASE WHEN VisitCount > 2 THEN 1 ELSE 0 END) AS FLOAT) / COUNT(*)) * 100 AS NewPatientsPercentage
            FROM PatientVisitCounts
        """
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Execute the percentage query
        cursor.execute(base_query + percentage_query, params)
        percentage_result = cursor.fetchone()
        returning_patients_percentage = percentage_result[0] if percentage_result else 0.0
        new_patients_percentage = percentage_result[1] if percentage_result else 0.0
        
       
        
        conn.close()
        
        return jsonify({
            'ReturningPatientsPercentage': returning_patients_percentage,
            'NewPatientsPercentage': new_patients_percentage,
        })

    except Exception as e:
        return jsonify({'error': str(e)})

    
#Data Point 13    
@appointmentData_bp.route('/appointmentData/appointmentDurationStats', methods=['GET'])
def get_appointment_duration_stats():
    try:
        clinic_ids = parse_comma_separated_ints(request.args.get('ClinicID', default=None))
        years = parse_comma_separated_ints(request.args.get('Year', default=None))

        query = """
            SELECT 
                YEAR(Appointment_DateTime) AS AppointmentYear,
                MONTH(Appointment_DateTime) AS AppointmentMonth,
                MIN(AppointmentDuration_Decimal) AS MinDuration,
                AVG(AppointmentDuration_Decimal) AS AvgDuration,
                MAX(AppointmentDuration_Decimal) AS MaxDuration
            FROM dbo.FactAppointment
            WHERE Clinic_ID BETWEEN 3 AND 7
              AND AppointmentDuration_Decimal < 70
        """
        
        params = []
        if clinic_ids:
            query += " AND Clinic_ID IN (" + ','.join(['?']*len(clinic_ids)) + ")"
            params.extend(clinic_ids)
        if years:
            query += " AND YEAR(Appointment_DateTime) IN (" + ','.join(['?']*len(years)) + ")"
            params.extend(years)
        
        query += """
            GROUP BY YEAR(Appointment_DateTime), MONTH(Appointment_DateTime)
            ORDER BY YEAR(Appointment_DateTime), MONTH(Appointment_DateTime)
        """
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute(query, params)
        rows = cursor.fetchall()
        
        appointment_duration_stats = []
        for row in rows:
            appointment_year = row[0]
            appointment_month = row[1]
            min_duration = row[2]
            avg_duration = row[3]
            max_duration = row[4]
            
            appointment_duration_stats.append({
                'AppointmentYear': appointment_year,
                'AppointmentMonth': appointment_month,
                'MinDuration': min_duration,
                'AvgDuration': avg_duration,
                'MaxDuration': max_duration
            })
        
        conn.close()
        
        return jsonify(appointment_duration_stats)

    except Exception as e:
        return jsonify({'error': str(e)})

    



