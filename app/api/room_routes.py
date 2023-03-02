from flask import Blueprint, jsonify, session, request
from app.models import db, Room, Chat
from ..forms.room_form import CreateRoomForm
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages

room_routes = Blueprint('room', __name__)

#route to get all rooms a user is in
@room_routes.route('/')
@login_required
def get_all_rooms():
  allRooms = Room.query.filter(Room.user_id == current_user.id or Room.friend_id == current_user.id).all()

  output = {
    'user_rooms': []
  }

  for room in allRooms:
    info = room.to_dict()
    output['user_rooms'].append(info)

  return output


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
