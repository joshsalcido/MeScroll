from .db import db
from .like import likes

class Post(db.Model):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    photo = db.Column(db.String(255), nullable=False)
    caption = db.Column(db.String(2200), nullable=True)
    location = db.Column(db.String(500), nullable=True)


    users = db.relationship("User", back_populates="posts", lazy="subquery")
    comments = db.relationship("Comment", back_populates="post", cascade="all, delete")
    post_likes = db.relationship("User", secondary=likes, back_populates="user_likes", cascade="all, delete")

    def get_users(self):
        data = self.users.to_dict()
        return data

    def get_comments(self):
        data = [comment.to_dict() for comment in self.comments]
        return data
    def get_likes(self):
        data = [ like.to_dict() for like in self.post_likes]
        return data
    def get_likes_userId(self):
        data = [ user.id for user in self.post_likes]
        return data

    def to_dict(self):
        return {
            'id' : self.id,
            'user_id' : self.user_id,
            'photo' : self.photo,
            'caption' : self.caption,
            'location' : self.location,
            'userInfo' : self.get_users(),
            'comments' : self.get_comments(),
            'post_likes': self.get_likes(),
            'likes_userIds': self.get_likes_userId()
        }
