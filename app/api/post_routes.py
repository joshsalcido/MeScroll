from flask import Blueprint, request, jsonify
from app.models import db, Post, Comment, User
from app.forms import PostForm, CommentForm

post_routes = Blueprint('posts', __name__)

def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# Get all Posts
@post_routes.route('/myfeed')
def posts():
    posts = Post.query.all()
    data = [post.to_dict() for post in posts]
    return {'posts': data}

# Create a Post

@post_routes.route('/newpost', methods=['POST'])
def newpost():
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_post = Post(
            user_id = form.data['user_id'],
            photo = form.data['photo'],
            caption = form.data['caption'],
            location = form.data['location']
        )
        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# Get a Single Post (when on a profile Page, this will be a modal)

# Update a Post

@post_routes.route('/<id>', methods=['PUT'])
def updatepost(id):
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    post = Post.query.get(id)
    if form.validate_on_submit():
        post.photo = form.data['photo']
        post.caption = form.data['caption']
        post.location = form.data['location']

        db.session.commit()
        return post.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# Delete a Post

@post_routes.route('/<id>', methods=['DELETE'])
def deletepost(id):
    post = Post.query.get(id)
    db.session.delete(post)
    db.session.commit()
    return post.to_dict()

#  COMMENTS

@post_routes.route('/<id>/comments')
def allComments(id):
    post = Post.query.get(id)
    comments = post.comments
    data = [comment.to_dict() for comment in comments]
    return {'comments' : data}
