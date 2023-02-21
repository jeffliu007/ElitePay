from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from app.models import db, Card
from ..forms.card_form import CreateCardForm, EditCardForm


card_routes = Blueprint('card', __name__)

#blueprint registered with url prefix of /api/dashboard/cards/


#route to get all cards that a user owns
@card_routes.route("/")
@login_required
def get_all_cards():
# all cards must belong to a user or data should be invalid
  allCards = Card.query.filter_by(user_id=current_user.id).all()
  #all_cards = Card.query.all()

  output = {
    "allCards": []
  }

  for card in allCards:
    info = card.to_dict()
    output["allCards"].append(info)

  return output


#route to get info on a specific card
@card_routes.route("/<int:cardId>")
@login_required
def get_single_card(cardId):
  single_card = db.session.query(Card).get(int(cardId))

  if not single_card:
    return {"message": "Card couldn't be found"}, 404

  info = single_card.to_dict()

  return info


#route to create a new debit card
@card_routes.route("/", methods=["POST"])
@login_required
def create_card():
  user_id = current_user.id
  form = CreateCardForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    data = form.data

    new_card = Card(
      full_name = data['full_name'],
      debit_number = data['debit_number'],
      cvc_number = data['cvc_number'],
      balance = data['balance'],
      user_id = user_id
    )

    db.session.add(new_card)
    db.session.commit()
    return new_card.to_dict()

  return {'errors': validation_errors_to_error_messages(form.errors)}, 401


#route to update existing debit card
@card_routes.route('/<int:cardId>', methods=['PUT'])
@login_required
def update_card(cardId):
  #find card first
  edit_card = db.session.query(Card).get(int(cardId))

  if not edit_card:
      return {"message": "Photo couldn't be found"}, 404

  if edit_card.user_id != current_user.id:
      return {'errors': ['Unauthorized']}, 401

  form = EditCardForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    data = form.data

    edit_card.full_name = data['full_name']
    edit_card.debit_number = data['debit_number']
    edit_card.cvc_number = data['cvc_number']
    edit_card.balance = data['balance']

    db.session.commit()
    return edit_card.to_dict()

  return {'errors': validation_errors_to_error_messages(form.errors)}, 401


#route to delete existing debit card by cardId
@card_routes.route('/<int:cardId>', methods=['DELETE'])
@login_required
def delete_card(cardId):
  #find card
  delete_card = db.session.query(Card).get(int(cardId))

  if not delete_card:
      return {"message": "Photo couldn't be found"}, 404

  if delete_card.user_id != current_user.id:
      return {'errors': ['Unauthorized']}, 401

  db.session.delete(delete_card)
  db.session.commit()

  return {"message": "Successfully deleted"}
