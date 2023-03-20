from flask import Blueprint, jsonify, session, request
from app.models import db, Room, Chat
from ..forms.room_form import CreateRoomForm
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages

room_routes = Blueprint('room', __name__)

#route to get all rooms a user is in
# @room_routes.route('/')
# @login_required
# def get_all_rooms():
#     user_rooms = Room.query.filter(Room.user_id == current_user.id or Room.friend_id == current_user.id).all()
#     return {
#         "user_rooms": [room.to_dict() for room in user_rooms]
#     }


#route for specific room
@room_routes.route("/<int:roomId>")
@login_required
def get_single_room(roomId):
  singleRoom = Room.query.get(roomId)

  return singleRoom.to_dict()


#route to create a room
@room_routes.route('/', methods=['POST'])
@login_required
def create_room():
  user_id = current_user.id
  form = CreateRoomForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    data = form.data

    new_room = Room(
      user_id = user_id,
      friend_id = data['friend_id']
    )

    db.session.add(new_room)
    db.session.commit()
    return new_room.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#route to get a chat in a specific room
@room_routes.route("/<int:roomId>/chats")
@login_required
def get_room_chats(roomId):
  chats = Chat.query.filter(Chat.room_id == roomId).all()

  output = {
    'chats': []
  }

  for chat in chats:
    info = chat.to_dict()
    output['chats'].append(info)

  return output


#route to delete existing room by id
@room_routes.route('/<int:roomId>', methods=["DELETE"])
def delete_room(roomId):
    delete_room = Room.query.get(roomId)

    if not delete_room:
      return {"message": "Room couldn't be found"}, 404

    db.session.delete(delete_room)
    db.session.commit()
    return {"message": "Successfully deleted"}
