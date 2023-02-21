from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

today = datetime.now()


class Card(db.Model):
    __tablename__ = 'cards'

    if environment == "production":
      __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    debit_number = db.Column(db.String(16), nullable=False, unique=True)
    cvc_number = db.Column(db.Integer, nullable=False)
    balance = db.Column(db.Float, default=0.00)
    created_at = db.Column(db.DateTime, nullable=False, default=today)

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    users = db.relationship("User", back_populates="cards")

    def to_dict(self):
      return {
        "id": self.id,
        'full_name': self.full_name,
        'debit_number': self.debit_number,
        'cvc_number': self.cvc_number,
        'balance': self.balance,
        'createdAt': self.created_at
      }
