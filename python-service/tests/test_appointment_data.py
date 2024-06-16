import unittest
from app import app

class AppointmentDataTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_get_returning_patients_info(self):
        response = self.app.get('/api/appointmentData/returningPatientsScheduledInfo')
        self.assertEqual(response.status_code, 200)
        json_data = response.get_json()
        self.assertIsInstance(json_data, dict)  # Check if the response is a dictionary
        self.assertIn('ReturningPatientsPercentage', json_data)
        self.assertIn('ReturningPatientsCount', json_data)

    def test_get_confirmed_appointments_info(self):
        response = self.app.get('/api/appointmentData/confirmedAppointmentsInfo')
        self.assertEqual(response.status_code, 200)
        json_data = response.get_json()
        self.assertIsInstance(json_data, dict)  # Check if the response is a dictionary
        self.assertIn('ConfirmedAppointmentsPercentage', json_data)
        self.assertIn('ConfirmedAppointmentsCount', json_data)

    def test_get_total_appointments_count(self):
        response = self.app.get('/api/appointmentData/totalAppointmentsCount')
        self.assertEqual(response.status_code, 200)
        json_data = response.get_json()
        self.assertIsInstance(json_data, dict)  # Check if the response is a dictionary
        self.assertIn('TotalAppointmentsCount', json_data)

    def test_get_attended_appointments_info(self):
        response = self.app.get('/api/appointmentData/attendedAppointmentsInfo')
        self.assertEqual(response.status_code, 200)
        json_data = response.get_json()
        self.assertIsInstance(json_data, dict)  # Check if the response is a dictionary
        self.assertIn('AttendedAppointmentsPercentage', json_data)
        self.assertIn('AttendedAppointmentsCount', json_data)

    def test_get_patient_retention_and_acquisition(self):
        response = self.app.get('/api/appointmentData/patientRetentionAndAcquisition')
        self.assertEqual(response.status_code, 200)
        json_data = response.get_json()
        self.assertIsInstance(json_data, list)  # Check if the response is a list
        if json_data:
            self.assertIsInstance(json_data[0], dict)  # Check if the first element is a dictionary
            self.assertIn('AppointmentYear', json_data[0])
            self.assertIn('TotalAppointments', json_data[0])
            self.assertIn('NewPatientVisits', json_data[0])
            self.assertIn('ReturningPatientVisits', json_data[0])
            self.assertIn('RetentionRatePercentage', json_data[0])

    def test_get_compare_patients(self):
        response = self.app.get('/api/appointmentData/patientType')
        self.assertEqual(response.status_code, 200)
        json_data = response.get_json()
        self.assertIsInstance(json_data, dict)  # Check if the response is a dictionary
        self.assertIn('ReturningPatientsPercentage', json_data)
        self.assertIn('NewPatientsPercentage', json_data)

    def test_get_appointment_duration_stats(self):
        response = self.app.get('/api/appointmentData/appointmentDurationStats')
        self.assertEqual(response.status_code, 200)
        json_data = response.get_json()
        self.assertIsInstance(json_data, list)  # Check if the response is a list
        if json_data:
            self.assertIsInstance(json_data[0], dict)  # Check if the first element is a dictionary
            self.assertIn('AppointmentYear', json_data[0])
            self.assertIn('AppointmentMonth', json_data[0])
            self.assertIn('MinDuration', json_data[0])
            self.assertIn('AvgDuration', json_data[0])
            self.assertIn('MaxDuration', json_data[0])

    def test_get_animal_appointment_percentages(self):
        response = self.app.get('/api/appointmentData/petAnimalPercentages')
        self.assertEqual(response.status_code, 200)
        json_data = response.get_json()
        self.assertIsInstance(json_data, list)  # Check if the response is a list
        if json_data:
            self.assertIsInstance(json_data[0], dict)  # Check if the first element is a dictionary
            self.assertIn('AnimalCategory', json_data[0])
            self.assertIn('TotalAppointments', json_data[0])
            self.assertIn('AttendedAppointmentsCount', json_data[0])
            self.assertIn('AttendedAppointmentsPercentage', json_data[0])

if __name__ == '__main__':
    unittest.main()
