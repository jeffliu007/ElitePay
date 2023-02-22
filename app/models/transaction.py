from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

today = datetime.now()

class Transaction(db.Model):
    __tablename__ = 'transactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(255), nullable=False)
    status = db.Column(db.String(20), default="pending", nullable=False)
    created_at = db.Column(db.DateTime, default=today)
    sender_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    recipient_id = db.Column(db.Integer, nullable=False)


    users = db.relationship('User', back_populates='transactions')

    def to_dict(self):
      return {
        'id':self.id,
        'amount': self.amount,
        'description': self.description,
        'created_at': self.created_at,
        'sender_id': self.sender_id,
        "recipient_id": self.recipient_id,
    }
