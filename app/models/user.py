from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .like import likes

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(50), nullable=False)
    profile_pic = db.Column(db.String(300), nullable=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    bio = db.Column(db.String(1000), nullable=True)
    website = db.Column(db.String(80), nullable=True)

    posts = db.relationship("Post", back_populates="users", lazy='subquery')
    comments = db.relationship("Comment", back_populates="user")
    user_likes = db.relationship("Post", secondary=likes, back_populates="post_likes")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id' : self.id,
            'full_name' : self.full_name,
            'profile_pic' : self.profile_pic,
            'username': self.username,
            'email': self.email,
            'bio': self.bio,
            'website': self.website,
        }
