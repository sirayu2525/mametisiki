import unittest
from app import app, db
from models import Article, Tag

class AppTestCase(unittest.TestCase):

    def setUp(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        self.app = app.test_client()
        with app.app_context():
            db.create_all()

    def tearDown(self):
        with app.app_context():  # アプリケーションコンテキストを設定
            db.session.remove()
            db.drop_all()

    def test_index_page(self):
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'<h2>\xe6\x96\xb0\xe7\x9d\x80\xe8\xb1\x86\xe7\x9f\xa5\xe8\xad\x98</h2>', response.data)

    def test_article_list_page(self):
        response = self.app.get('/articles')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'<h2>\xe8\xa8\x98\xe4\xba\x8b\xe4\xb8\x80\xe8\xa6\xa7</h2>', response.data)

    def test_article_page(self):
        with app.app_context():
            article = Article(title='テスト記事', content='テスト用の記事です。')
            db.session.add(article)
            db.session.commit()

        response = self.app.get(f'/article/{article.id}')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'<h2>\xe3\x83\x86\xe3\x82\xb9\xe3\x83\x88\xe8\xa8\x98\xe4\xba\x8b</h2>', response.data)

    def test_tag_page(self):
        with app.app_context():
            tag = Tag(name='テストタグ')
            db.session.add(tag)
            db.session.commit()
        
        response = self.app.get(f'/tag/{tag.id}')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'<h1>\xe3\x83\x86\xe3\x82\xb9\xe3\x83\x88\xe3\x82\xbf\xe3\x82\xb0</h1>', response.data)

if __name__ == '__main__':
    unittest.main()