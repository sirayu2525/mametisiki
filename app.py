from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
import os
from dotenv import load_dotenv

load_dotenv(override=True)  # .env ファイルを読み込む

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mame.db'  # データベースの接続URI
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')  # .env から Secret Key を取得
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # 不要な変更追跡を無効化

db = SQLAlchemy(app)

from views import *
from models import *



if not os.path.exists('mame.db'):
    with app.app_context():
        db.create_all()

if __name__ == '__main__':
    app.run(debug=True)