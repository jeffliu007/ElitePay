from flask_wtf import FlaskForm
from wtforms.fields import (
StringField, IntegerField, FloatField
)
from wtforms.validators import DataRequired, ValidationError


def amount_validator(form,field):
  if field.data <= 0:
    raise ValidationError("The amount entered must be greater than 0")

def description_validator(form,field):
  if len(field.data) > 100:
    raise ValidationError("Description must be less than 255 characters long")

class CreateTransactionForm(FlaskForm):
  amount = FloatField('amount', validators=[DataRequired(), amount_validator])
  description = StringField('description', validators=[DataRequired(), description_validator])
  recipient_id = IntegerField('recipient_id', validators=[DataRequired()])
  card_id = IntegerField('card_id', validators=[DataRequired()])

class EditTransactionForm(FlaskForm):
  amount = FloatField('amount', validators=[DataRequired(), amount_validator])
  description = StringField('description', validators=[DataRequired(), description_validator])
  recipient_id = IntegerField('receiver', validators=[DataRequired()])
  card_id = IntegerField('card_id', validators=[DataRequired()])
