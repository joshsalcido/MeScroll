from flask import Blueprint, request, jsonify
from app.models import db, Post, Comment, User
from app.forms import PostForm, CommentForm
from datetime import datetime
from flask_login import login_required, current_user
from app.aws_s3 import (
    upload_file_to_s3, allowed_file, get_unique_filename)


post_routes = Blueprint('posts', __name__)

def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
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

    print(form.__dict__, "~~~~~~~~~~~~~~BACKEND POSTFORM~~~~~~~~~~~~~~~~~~~~~`")

    if "photo" not in request.files:
        return {"errors": "image required"}, 400

    photo = request.files["photo"]


    if not allowed_file(photo.filename):
        return {"errors": "file type not permitted"}, 400

    photo.filename = get_unique_filename(photo.filename)

    print(photo.filename, "+++++++++++++++++++++BACKEND REQUEST fILEs photo filename")

    upload = upload_file_to_s3(photo)

    print(upload, "+++++++++++++++++++++BACKEND REQUEST fILEs upload")

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    # new_image = Image(user=current_user, url=url)


    if form.validate_on_submit():
        new_post = Post(
            user_id = form.data['user_id'],
            photo = url,
            caption = form.data['caption'],
            location = form.data['location']
        )
        db.session.add(new_post)
        db.session.commit()
        # print(new_post.to_dict(), "$$$$$$$$$$$$$$$$$$$ NEWPOST.todict $$$$$$$$$$$$$$$$$$$$")
        return new_post.to_dict()
    print(form.errors, "$$$$$$$$$$$$$$$$$$$ form not validated $$$$$$$$$$$$$$$$$$$$")
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# Get a Single Post (when on a profile Page, this will be a modal)

# Update a Post

@post_routes.route('/<id>', methods=['PUT'])
def updatepost(id):
    form = PostForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    post = Post.query.get(id)

    # print("++++  REQUEST FILES  +++++",request.files["photo"])
    # print("***** FORM dict ************",form.__dict__)
    if form.validate_on_submit():
        # post.photo = form.data['photo']
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
