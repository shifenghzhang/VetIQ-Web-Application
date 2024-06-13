import unittest
from app import app

class ServiceDataTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_get_usage_percentage(self):
        response = self.app.get('/api/serviceData/usedServicePercentage')
        self.assertEqual(response.status_code, 200)
        json_data = response.get_json()
        self.assertIsInstance(json_data, list)  # Check if the response is a list
        if json_data:
            self.assertIsInstance(json_data[0], dict)  # Check if the first element is a dictionary
            self.assertIn('TransactionTypeName', json_data[0])
            self.assertIn('UsageCount', json_data[0])
            self.assertIn('PercentageUsage', json_data[0])

    def test_get_transaction_counts(self):
        response = self.app.get('/api/serviceData/transactionServiceCounts')
        self.assertEqual(response.status_code, 200)
        json_data = response.get_json()
        self.assertIsInstance(json_data, list)  # Check if the response is a list
        if json_data:
            self.assertIsInstance(json_data[0], dict)  # Check if the first element is a dictionary
            self.assertIn('TransactionTypeName', json_data[0])
            self.assertIn('Month', json_data[0])
            self.assertIn('Count', json_data[0])

    def test_get_revenue_total(self):
        response = self.app.get('/api/serviceData/totalRevenueService')
        self.assertEqual(response.status_code, 200)
        json_data = response.get_json()
        self.assertIsInstance(json_data, list)  # Check if the response is a list
        if json_data:
            self.assertIsInstance(json_data[0], dict)  # Check if the first element is a dictionary
            self.assertIn('TotalRevenue', json_data[0])

    def test_get_revenue_total_without_consultation(self):
        response = self.app.get('/api/serviceData/totalRevenueServiceWithoutConsultation')
        self.assertEqual(response.status_code, 200)
        json_data = response.get_json()
        self.assertIsInstance(json_data, list)  # Check if the response is a list
        if json_data:
            self.assertIsInstance(json_data[0], dict)  # Check if the first element is a dictionary
            self.assertIn('TotalRevenue', json_data[0])

    def test_get_revenue_percentage(self):
        response = self.app.get('/api/serviceData/revenueServicePercentage')
        self.assertEqual(response.status_code, 200)
        json_data = response.get_json()
        self.assertIsInstance(json_data, list)  # Check if the response is a list
        if json_data:
            self.assertIsInstance(json_data[0], dict)  # Check if the first element is a dictionary
            self.assertIn('TransactionTypeName', json_data[0])
            self.assertIn('TotalRevenue', json_data[0])
            self.assertIn('PercentageContribution', json_data[0])

    def test_get_top_services(self):
        response = self.app.get('/api/serviceData/topServices')
        self.assertEqual(response.status_code, 200)
        json_data = response.get_json()
        self.assertIsInstance(json_data, list)  # Check if the response is a list
        if json_data:
            self.assertIsInstance(json_data[0], dict)  # Check if the first element is a dictionary
            self.assertIn('TransactionTypeName', json_data[0])
            self.assertIn('ServiceCount', json_data[0])
            self.assertIn('TotalRevenue', json_data[0])
            self.assertIn('PercentageContribution', json_data[0])

if __name__ == '__main__':
    unittest.main()
