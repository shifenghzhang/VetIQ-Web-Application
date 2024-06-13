import unittest
from app import app

class PatientDataTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_get_usage_percentage(self):
        response = self.app.get('/api/patientData/')
        self.assertEqual(response.status_code, 200)
        json_data = response.get_json()
        self.assertIsInstance(json_data, list)  # Check if the response is a list
        if json_data:
            self.assertIsInstance(json_data[0], dict)  # Check if the first element is a dictionary
            self.assertIn('TransactionTypeName', json_data[0])
            self.assertIn('UsageCount', json_data[0])
            self.assertIn('PercentageUsage', json_data[0])

if __name__ == '__main__':
    unittest.main()