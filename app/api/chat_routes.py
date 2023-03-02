from flask import Blueprint, jsonify, session, request
from app.models import db, Room, Chat
from flask_login import login_required, current_user
from ..forms.chat_form import CreateChatForm
from .auth_routes import validation_errors_to_error_messages

chat_routes = Blueprint('chat', __name__)

@chat_routes.route('/', methods=['POST'])
@login_required
def create_chat():
    form = CreateChatForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_chat = Chat(
            user_id=current_user.get_id(),
            room_id=form.data['room_id'],
            message=form.data['message'],
        )
        db.session.add(new_chat)
        db.session.commit()
        return new_chat.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@chat_routes.route('/<int:chatId>', methods=['DELETE'])
@login_required
def delete_chat(chatId):
  delete_chat = Chat.query.get(chatId)

  if not delete_chat:
    return {"message": "Chat couldn't be found"}, 404

  db.session.delete(delete_chat)
  db.session.commit()
  return {"message": "Successfully deleted"}
