from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Length
from app.models import Post

class PostForm(FlaskForm):
    user_id = IntegerField('user_id')
    # photo = StringField('photo', validators=[DataRequired()])
    caption = TextAreaField('caption', validators=[DataRequired(), Length(min=1, max=2015, message="Caption field has limit of 2,000 characters")] )
    location = StringField('location', validators=[DataRequired(), Length(min=1, max=40, message="Location field has limit of 40 characters")])
