from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

today = datetime.now()

class Wallet(db.Model):
    __tablename__ = 'wallets'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    money_total = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=today)

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

    users = db.relationship('User', back_populates='wallets')
