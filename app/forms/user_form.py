from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Length
from app.models import User

class UserUpdateForm(FlaskForm):
    fullname = StringField('fullname')
    username = StringField('username')
    email = StringField('email')
