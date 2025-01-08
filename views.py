from flask import render_template
from app import app, db
from models import Article, Tag

@app.route('/')
def index():
    trend_articles = Article.query.order_by(Article.created_at.desc()).limit(5).all()
    new_articles = Article.query.order_by(Article.created_at.desc()).limit(5).all()
    tags = Tag.query.all()
    return render_template('index.html', trend_articles=trend_articles, new_articles=new_articles, tags=tags)

@app.route('/article/<int:article_id>')
def article(article_id):
    article = Article.query.get_or_404(article_id)
    return render_template('article.html', article=article)

@app.route('/tag/<int:tag_id>')
def tag(tag_id):
    tag = Tag.query.get_or_404(tag_id)
    return render_template('tag.html', tag=tag)