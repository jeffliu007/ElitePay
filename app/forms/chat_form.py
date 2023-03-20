from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError


def message_validator(form, field):
  if len(field.data) < 1 or len(field.data) > 250:
    raise ValidationError("Name must be within 1 to 250 characters long")

class CreateChatForm(FlaskForm):
    room_id = IntegerField('room_id', validators=[DataRequired()])
    message = StringField('message', validators=[DataRequired(),message_validator])
