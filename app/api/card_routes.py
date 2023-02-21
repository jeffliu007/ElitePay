from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import db, Card
from .auth_routes import validation_errors_to_error_messages


card_routes = Blueprint('card', __name__)

#blueprint registered with url prefix of /api/dashboard/cards/


#route to get all cards that a user owns
@card_routes.route("/")
@login_required
def get_all_cards():
# all cards must belong to a user or data should be invalid
  all_cards = Card.query.filter_by(user_id=current_user.id).all()
  #all_cards = Card.query.all()

  output = {
    "allCards": []
  }

  for card in all_cards:
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
