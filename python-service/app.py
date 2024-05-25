from flask import Flask
from flask_cors import CORS
from routes.users_routes import user_bp
from routes.serviceData_routes import serviceData_bp
from routes.test_routes import clinic_bp

app = Flask(__name__)
CORS(app)

# Register blueprints
app.register_blueprint(user_bp, url_prefix='/api')
app.register_blueprint(serviceData_bp, url_prefix='/api')

@app.route('/')
def index():
    return "Welcome to the Flask API!"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
