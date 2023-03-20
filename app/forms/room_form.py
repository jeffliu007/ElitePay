from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class CreateRoomForm(FlaskForm):
    friend_id = IntegerField("friend_id", validators=[DataRequired()])
