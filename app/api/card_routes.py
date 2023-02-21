from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import db, Card
from .auth_routes import validation_errors_to_error_messages


card_routes = Blueprint('card', __name__)

#blueprint registered with url prefix of /api/dashboard/cards

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
