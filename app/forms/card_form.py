from flask_wtf import FlaskForm
from wtforms.fields import (
StringField, IntegerField, FloatField
)
from wtforms.validators import DataRequired, ValidationError

def name_validator(form, field):
  if len(field.data) < 3 or len(field.data) > 50:
    raise ValidationError("Name must be within 3 to 50 characters long")

def debit_number_validator(form,field):
  if len(field.data) != 16:
    raise ValidationError("Debit number must be exactly 16 digits long")

def cvc_validator(form,field):
  if len(field.data) != 3:
    raise ValidationError("Cvc number must be exactly 3 digits long")

def positive_balance_validator(form,field):
  if field.data < 0:
    raise ValidationError("Balance must be greater than 0.00")


class CreateCardForm(FlaskForm):
  full_name = StringField('full_name', validators=[DataRequired(), name_validator])
  debit_number = StringField("debit_number", validators=[DataRequired(), debit_number_validator])
  cvc_number = StringField("cvc_number", validators=[DataRequired(), cvc_validator])
  balance = FloatField("balance", validators=[DataRequired(), positive_balance_validator])


class EditCardForm(FlaskForm):
  full_name = StringField('full_name', validators=[DataRequired(), name_validator])
  debit_number = StringField("debit_number", validators=[DataRequired(), debit_number_validator])
  cvc_number = StringField("cvc_number", validators=[DataRequired(), cvc_validator])
  balance = FloatField("balance", validators=[DataRequired(), positive_balance_validator])
