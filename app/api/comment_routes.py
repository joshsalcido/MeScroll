from flask import Blueprint, request, jsonify
from app.models import db, Post, Comment, User
from app.forms import PostForm, CommentForm

comment_routes = Blueprint('comments', __name__)

def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


#  COMMENTS

@comment_routes.route('/')
def allComments():
    comments = Comment.query.all()
    data = [comment.to_dict() for comment in comments]
    return {'comments' : data}

@comment_routes.route('/<id>/new', methods=['POST'])
def createComment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_comment = Comment(
            user_id = form.data['user_id'],
            post_id = form.data['post_id'],
            comment_body = form.data['comment_body']
        )
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
