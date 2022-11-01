from flask import Blueprint, request, jsonify
from app.models import db, Post, Comment, User
from app.forms import PostForm, CommentForm

comment_routes = Blueprint('comments', __name__)

def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


#  COMMENTS

# Get All Comments

@comment_routes.route('/')
def allComments():
    comments = Comment.query.all()
    data = [comment.to_dict() for comment in comments]
    return {'comments' : data}

# Get Single Post Comments
# @comment_routes.route('/<id>')
# def allSinglePostComments(id):
#     post = Post.query.get(id)
#     comments = post.comments
#     data = [comment.to_dict() for comment in comments]
#     return {'comments' : data}


# Create A Comment

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

# Delete a Comment

@comment_routes.route('/<id>', methods=['DELETE'])
def deletepost(id):
    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return comment.to_dict()

# Update Comment

@comment_routes.route('/<id>/edit', methods=['PUT'])
def editcomment(id):
    form = CommentForm()
    
    form['csrf_token'].data = request.cookies['csrf_token']
    comment = Comment.query.get(id)
    if form.validate_on_submit():
        comment.user_id = form.data['user_id'],
        comment.post_id = form.data['post_id'],
        comment.comment_body = form.data['comment_body']

        db.session.commit()
        return comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
