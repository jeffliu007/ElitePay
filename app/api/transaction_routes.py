from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from app.models import db, Transaction

transaction_routes = Blueprint('transaction', __name__)

#blueprint registered with url prefix of /api/dashboard/transactions/

#route to get all users transactions
@transaction_routes.route("/")
@login_required
def get_all_transactions():
  all_transactions = Transaction.query.all()

  output = {
    "allTransactions": []
  }

  for transaction in all_transactions:
    if transaction.sender_id == current_user.id or transaction.recipient_id == current_user.id:
      output['allTransactions'].append(transaction.to_dict())

  return output
