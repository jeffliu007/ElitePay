from flask_wtf import FlaskForm
from wtforms.fields import (
StringField, IntegerField, FloatField
)
from wtforms.validators import DataRequired, ValidationError, NumberRange

def name_validator(form, field):
  if len(field.data) < 3 or len(field.data) > 50 :
    raise ValidationError("Name must be within 3 to 50 characters long")

def debit_number_validator(form,field):
  if len(field.data) != 16 :
    raise ValidationError("Debit number must be exactly 16 digits long")

def cvc_validator(form,field):
  if len(field.data) != 3 :
    raise ValidationError("Cvc number must be exactly 3 digits long")

class CreateCardForm(FlaskForm):
  full_name = StringField('full name', validators=[DataRequired(), name_validator])
  debit_number = StringField("card number", validators=[DataRequired()])
  cvc_number = StringField("cvc", validators=[DataRequired()])
  balance = FloatField("balance", validators=[DataRequired()])
