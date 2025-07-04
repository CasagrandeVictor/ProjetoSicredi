from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # ✅ CORS configurado corretamente
    CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

    db.init_app(app)

    from routes.patrimonios import patrimonios_bp
    app.register_blueprint(patrimonios_bp, url_prefix="/api/patrimonios")

    return app
