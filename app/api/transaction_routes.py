from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from app.models import db, Transaction, Card
from ..forms.transaction_form import CreateTransactionForm, EditTransactionForm

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

    # Find the selected card by id
    selected_card = db.session.query(Card).filter_by(id=data['card_id'], user_id=current_user.id).first()

    # check card for sufficient balance
    if selected_card.balance < data['amount']:
            return {'errors': ["Insufficient balance"]}, 401

    new_transaction = Transaction(
      amount = data['amount'],
      description = data['description'],
      sender_id = current_user.id,
      recipient_id = data['recipient_id'],
      card_id = selected_card.id
    )

    #update balance
    selected_card.balance -= data['amount']

    db.session.add(new_transaction)
    db.session.commit()
    return new_transaction.to_dict()

  return {'errors': validation_errors_to_error_messages(form.errors)}, 401


#route to edit existing transaction
@transaction_routes.route("/<int:transactionId>", methods=['PUT'])
@login_required
def update_transaction(transactionId):
  #find transaction
  edit_transaction = db.session.query(Transaction).get(int(transactionId))

  if not edit_transaction:
    return {"message": "Transaction couldn't be found"}, 404

  if edit_transaction.sender_id != current_user.id:
    return {'errors': ['Unauthorized']}, 401

  form = EditTransactionForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    data = form.data

    edit_transaction.amount = data['amount']
    edit_transaction.description = data['description']
    edit_transaction.recipient_id = data['recipient_id']

    db.session.commit()
    return edit_transaction.to_dict()

  return {'errors': validation_errors_to_error_messages(form.errors)}, 401


#route to delete existing transaction
@transaction_routes.route("/<int:transactionId>", methods=['DELETE'])
@login_required
def delete_transaction(transactionId):
  #find transaction
  delete_transaction = db.session.query(Transaction).get(int(transactionId))

  if not delete_transaction:
    return {"message": "Card couldn't be found"}, 404

  if delete_transaction.sender_id != current_user.id:
    return {'errors': ['Unauthorized']}, 401

  db.session.delete(delete_transaction)
  db.session.commit()

  return {"message": "Successfully deleted"}
