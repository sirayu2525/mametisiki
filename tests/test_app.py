import pytest
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from app import app, db
from models import Article, Tag


@pytest.fixture
def client():
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    client = app.test_client()
    with app.app_context():
        db.create_all()
    yield client
    with app.app_context():
        db.session.remove()
        db.drop_all()

def test_index_page(client):
    response = client.get('/')
    assert response.status_code == 200
    assert b'<h2>\xe6\x96\xb0\xe7\x9d\x80\xe8\xb1\x86\xe7\x9f\xa5\xe8\xad\x98</h2>' in response.data

def test_article_list_page(client):
    with app.app_context():
        article1 = Article(title='テスト記事1', content='テスト用の記事です。', image_url="https://example.com/image1.jpg")
        article2 = Article(title='テスト記事2', content='テスト用の記事です。', image_url="https://example.com/image2.jpg")
        db.session.add_all([article1, article2])
        db.session.commit()

    response = client.get('/articles')
    assert response.status_code == 200
    assert b'<title>\xe8\xa8\x98\xe4\xba\x8b\xe4\xb8\x80\xe8\xa6\xa7 - \xe3\x83\x8f\xe3\x83\xa0\xe5\xa4\xa7\xe3\x81\xbe\xe3\x82\x81\xe3\x81\xa1\xe3\x81\x97\xe3\x81\x8d</title>' in response.data

def test_article_page(client):
    with app.app_context():
        article = Article(title='テスト記事', content='テスト用の記事です。')
        db.session.add(article)
        db.session.commit()

        response = client.get(f'/article/{article.id}')
        assert response.status_code == 200

        # <title>タグの内容を確認
        expected_title = f'<title>{article.title}</title>'.encode()  # バイト文字列に変換
        assert expected_title in response.data

def test_tag_page(client):
    with app.app_context():
        tag = Tag(name='テストタグ')
        db.session.add(tag)
        db.session.commit()

        response = client.get(f'/tag/{tag.id}')
        assert response.status_code == 200
        assert b'<h1>\xe3\x83\x86\xe3\x82\xb9\xe3\x83\x88\xe3\x82\xbf\xe3\x82\xb0</h1>' in response.data