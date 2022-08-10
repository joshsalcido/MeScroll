from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length, EqualTo
from app.models import User
import re


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def password_check(form, field):
    #  Checking if password has one special character, one captialize one lowercase
    password = field.data
    if(not re.fullmatch('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$', password)):
        raise ValidationError('Password must contain minimum 1 lowercase letter, 1 uppercase, 1 number, and 1 special character (i.e. "!@#$%^&*")')

class SignUpForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(), Email(), user_exists])
    full_name = StringField('full_name', validators=[DataRequired(), Length(min=1, max=50, message="Full Name Can't exceed 50 characters")])
    username = StringField('username', validators=[DataRequired(), username_exists])
    password = StringField('password', validators=[DataRequired(), Length(min=8, max=55, message="Password must be 8-55 characters"), password_check])
    confirmed_password = StringField('confirmed_password', validators=[DataRequired(), EqualTo('password', message='Passwords must match')])
