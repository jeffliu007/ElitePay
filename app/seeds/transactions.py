from app.models import db, Transaction, environment, SCHEMA

transaction1 = Transaction(
  amount = 25.50,
  description = 'gas money thanks',
  status = "pending",
  sender_id = 1,
  recipient_id = 2
)

transaction2 = Transaction(
  amount = 200.25,
  description = 'utility bill',
  status = "pending",
  sender_id = 1,
  recipient_id = 3
)

transaction3 = Transaction(
  amount = 19.99,
  description = 'thank you for dinner!',
  status = "pending",
  sender_id = 1,
  recipient_id = 2
)

transaction4 = Transaction(
  amount = 8.00,
  description = 'thanks for buying me snacks from the vending machine',
  status = "pending",
  sender_id = 2,
  recipient_id = 1
)

transaction5 = Transaction(
  amount = 35.67,
  description = 'I owe you',
  status = "pending",
  sender_id = 2,
  recipient_id = 3
)

transaction6 = Transaction(
  amount = 12.50,
  description = 'split check, paying you back',
  status = "pending",
  sender_id = 3,
  recipient_id = 1
)


def seed_transactions():
  db.session.add(transaction1)
  db.session.add(transaction2)
  db.session.add(transaction3)
  db.session.add(transaction4)
  db.session.add(transaction5)
  db.session.add(transaction6)
  db.session.commit()


def undo_transactions():
  if environment == "production":
      db.session.execute(f"TRUNCATE table {SCHEMA}.transactions RESTART IDENTITY CASCADE;")
  else:
      db.session.execute("DELETE FROM transcations")

  db.session.commit()
