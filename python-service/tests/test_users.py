import unittest
from app import app

class MongoUsersTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_get_mongo_users(self):
        response = self.app.get('/api/mongo_users')
        self.assertEqual(response.status_code, 200)
        json_data = response.get_json()
        self.assertIsInstance(json_data, list)  # Check if the response is a list
        if json_data:
            self.assertIsInstance(json_data[0], dict)  # Check if the first element is a dictionary

    def test_add_mongo_user(self):
        new_user_data = {
            "consulting_vet": False,
            "email": "newuser@example.com",
            "password": "newpassword",
            "site_id": 2,
            "user_name": "New User"
        }
        response = self.app.post('/api/add_mongo_user', json=new_user_data)  # Use self.app here
        self.assertEqual(response.status_code, 200)
        self.assertIn('user added successfully', response.get_data(as_text=True))




if __name__ == '__main__':
    unittest.main()