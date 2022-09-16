from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.models import User, db
from app.forms import UserUpdateForm
from app.aws_s3 import (
    upload_file_to_s3, allowed_file, get_unique_filename)

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

# Get user info, Specifically after an update to user profile
@user_routes.route('/<id>')
def getUser(id):
    user = User.query.get(id)
    return user.to_dict()

# Update User INFO
@user_routes.route('/<id>', methods=["PUT"])
def updateUser(id):
    user = User.query.get(id)
    # This is Photo post code, needs to change to user PUT
    form = UserUpdateForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # print(form.data['fullname'], "~~~~~~~~~~~~~~BACKEND USERFORM~~~~~~~~~~~~~~~~~~~~~`")
    # print("+++++++++++++++++++++ profilepic 1")

    if "profilepic" not in request.files:
        if form.validate_on_submit():
            # user.user_id = form.data['user_id'],
            # user.profile_pic = url,
            user.username = form.data['username'],
            user.full_name = form.data['fullname'],
            user.email = form.data['email'],
            user.bio = form.data['bio'],
            user.website = form.data['website']

            db.session.add(user)
            db.session.commit()
            return user.to_dict()

        # return {"errors": "profilepic required"}, 400
        # print("+++++++++++++++++++++ profilepic 1")
    profilepic = request.files["profilepic"]


    if not allowed_file(profilepic.filename):
        return {"errors": "file type not permitted"}, 400

    profilepic.filename = get_unique_filename(profilepic.filename)

    # print(photo.filename, "+++++++++++++++++++++BACKEND REQUEST fILEs photo filename")

    upload = upload_file_to_s3(profilepic)

    # print(upload, "+++++++++++++++++++++BACKEND REQUEST fILEs upload")

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    # new_image = Image(user=current_user, url=url)

    # print(len(form.data['caption']), " <-------- +++++++++++++ caption length in post form ############## ++ ")

    if form.validate_on_submit():
        # user.user_id = form.data['user_id'],
        user.profile_pic = url,
        user.username = form.data['username'],
        user.full_name = form.data['fullname'],
        user.email = form.data['email'],
        user.bio = form.data['bio'],
        user.website = form.data['website']

        db.session.add(user)
        db.session.commit()
        # print(new_post.to_dict(), "$$$$$$$$$$$$$$$$$$$ NEWPOST.todict $$$$$$$$$$$$$$$$$$$$")
        return user.to_dict()
    # print(form.errors, "$$$$$$$$$$$$$$$$$$$ form not validated $$$$$$$$$$$$$$$$$$$$")
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
