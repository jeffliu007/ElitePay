from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from app.models import db, Transaction
from ..forms.transaction_form import CreateTransactionForm

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


#route to get a single transaction
@transaction_routes.route('/<int:transactionId>')
@login_required
def get_single_transaction(transactionId):
  single_transaction = db.session.query(Transaction).get(int(transactionId))

  if not single_transaction:
    return {"message": "Card couldn't be found"}, 404

  info = single_transaction.to_dict()

  return info


#route to create a new transaction
@transaction_routes.route("/", methods=['POST'])
@login_required
def create_transaction():
  form = CreateTransactionForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    data = form.data

    new_transaction = Transaction(
      amount = data['amount'],
      description = data['description'],
      sender_id = current_user.id,
      recipient_id = data['recipient_id']
    )

    db.session.add(new_transaction)
    db.session.commit()
    return new_transaction.to_dict()

  return {'errors': validation_errors_to_error_messages(form.errors)}, 401
