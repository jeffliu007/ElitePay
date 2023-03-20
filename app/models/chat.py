from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
today = datetime.now()

class Chat(db.Model):
    __tablename__ = 'chats'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=today)
    message = db.Column(db.String(500), nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    room_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('rooms.id')), nullable=False)

    user = db.relationship('User', back_populates='chats')
    room = db.relationship('Room', back_populates='chats')

    def to_dict(self):
        return {
        "id":self.id,
        "message":self.message,
        "created_at": self.created_at,
        "user_id": self.user_id,
        "room_id": self.room_id
        }
