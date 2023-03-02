from .db import db, environment, SCHEMA, add_prefix_for_prod


class Room(db.Model):
    __tablename__ = 'rooms'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    friend_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    chats = db.relationship('Chat', back_populates='room', cascade="all, delete")

    def to_dict(self):
        return {
        'id': self.id,
        'user_id': self.user_id,
        "friend_id": self.friend_id,
        "chats": [chat.id for chat in self.chats]
        }
