from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from app.models import db, Transaction, Card
from ..forms.transaction_form import CreateTransactionForm, EditTransactionForm, AcceptTransactionForm

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
    return {"message": "Transaction couldn't be found"}, 404

  info = single_transaction.to_dict()

  return info


# old route to create a new transaction
# @transaction_routes.route("/", methods=['POST'])
# @login_required
# def create_transaction():
  # form = CreateTransactionForm()
  # form['csrf_token'].data = request.cookies['csrf_token']

  # if form.validate_on_submit():
  #   data = form.data

  #   # Find the selected card by id
  #   selected_card = db.session.query(Card).filter_by(id=data['card_id'], user_id=current_user.id).first()

  #   # check card for sufficient balance
  #   if selected_card.balance < data['amount']:
  #           return {'errors': ["Insufficient balance"]}, 401

  #   recipient_card = db.session.query(Card).filter_by(user_id=data['recipient_id']).first()
  #   recipient_card.balance += data['amount']

  #   new_transaction = Transaction(
  #     amount = data['amount'],
  #     description = data['description'],
  #     sender_id = current_user.id,
  #     recipient_id = data['recipient_id'],
  #     card_id = selected_card.id
  #   )

  #   # Update sender's balance
  #   selected_card.balance -= data['amount']

  #   db.session.add(new_transaction)
  #   db.session.commit()

  #   return new_transaction.to_dict()

  # return {'errors': validation_errors_to_error_messages(form.errors)}, 401



# create transaction but all pending
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
      form.amount.errors.append("Insufficient balance")
      return {'errors': validation_errors_to_error_messages(form.errors)}, 401

    new_transaction = Transaction(
      amount = data['amount'],
      description = data['description'],
      sender_id = current_user.id,
      recipient_id = data['recipient_id'],
      card_id = selected_card.id,
      status = "pending"
    )

    db.session.add(new_transaction)
    db.session.commit()
    return new_transaction.to_dict()

  return {'errors': validation_errors_to_error_messages(form.errors)}, 401



# route to allow user to accept transaction that is pending
@transaction_routes.route("/<int:transactionId>/accept", methods=['POST'])
@login_required
def accept_transaction(transactionId):
  form = AcceptTransactionForm()
  print("hitting end point now")
  form["csrf_token"].data = request.cookies["csrf_token"]

  if form.validate_on_submit():
    data = form.data

    transaction = db.session.query(Transaction).filter_by(id=transactionId, recipient_id=current_user.id).first()

    # if current_user.id != recipient_id:
    #   return {'errors': ['Unauthorized'] }

    if not transaction:
      return {'errors': ["Transaction not found"]}, 404

    if transaction.status != "pending":
      return {'errors': ["Transaction has already been accepted"]}, 400

    # update the balances
    selected_card = transaction.card
    recipient_card = db.session.query(Card).filter_by(user_id=current_user.id).first()

    if not recipient_card:
      return {'errors': ["Recipient card not found"]}, 404

    if selected_card.balance < transaction.amount:
      return {'errors': ["Insufficient balance"]}, 400

    selected_card.balance -= transaction.amount
    recipient_card.balance += transaction.amount
    transaction.status = "completed"
    db.session.add(transaction)

    db.session.commit()

    return transaction.to_dict()




# #route to edit existing transaction
# @transaction_routes.route("/<int:transactionId>", methods=['PUT'])
# @login_required
# def update_transaction(transactionId):
  #find transaction
  # edit_transaction = db.session.query(Transaction).get(int(transactionId))

  # if not edit_transaction:
  #   return {"message": "Transaction couldn't be found"}, 404

  # if edit_transaction.sender_id != current_user.id:
  #   return {'errors': ['Unauthorized']}, 401

  # form = EditTransactionForm()
  # form['csrf_token'].data = request.cookies['csrf_token']

  # if form.validate_on_submit():
  #   data = form.data
  #   # Find the selected card by id
  #   selected_card = db.session.query(Card).filter_by(id=data['card_id'], user_id=current_user.id).first()

  #   # check card for sufficient balance
  #   if selected_card.balance < data['amount']:
  #     return {'errors': ["Insufficient balance"]}, 401

  #   edit_transaction.amount = data['amount']
  #   edit_transaction.description = data['description']
  #   edit_transaction.recipient_id = data['recipient_id']
  #   edit_transaction.card_id = selected_card.id

  #   #update balance
  #   selected_card.balance -= data['amount']

  #   db.session.commit()
  #   return edit_transaction.to_dict()

  # return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# new edit route
@transaction_routes.route("/<int:transactionId>", methods=['PUT'])
@login_required
def update_transaction(transactionId):
    form = EditTransactionForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data

        transaction = db.session.query(Transaction).filter_by(id=transactionId, sender_id=current_user.id).first()

        if not transaction:
            return {'errors': ["Transaction not found"]}, 404

        if transaction.status != "pending":
            return {'errors': ["Transaction cannot be updated"]}, 400

        selected_card = transaction.card

        # check card for sufficient balance
        if selected_card.balance < data['amount']:
            return {'errors': ["Insufficient balance"]}, 401

        # update transaction details
        transaction.amount = data['amount']
        transaction.description = data['description']
        db.session.add(transaction)

        db.session.commit()

        return transaction.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401






#route to delete existing transaction
@transaction_routes.route("/<int:transactionId>", methods=['DELETE'])
@login_required
def delete_transaction(transactionId):
  #find transaction
  delete_transaction = db.session.query(Transaction).get(int(transactionId))

  if not delete_transaction:
    return {"message": "Transaction couldn't be found"}, 404

  if delete_transaction.sender_id != current_user.id:
    return {'errors': ['Unauthorized']}, 401

  if delete_transaction.status == 'completed':
    return {'errors': ['Transaction already completed, cannot remove']}, 401

  db.session.delete(delete_transaction)
  db.session.commit()

  return {"message": "Successfully deleted"}
