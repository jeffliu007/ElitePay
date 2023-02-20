from app.models import db, Card, environment, SCHEMA


card1 = Card(
  first_name = 'Demo',
  last_name = 'Lition',
  debit_number = 12,
  cvc_number = 123,
  balance = 10000.00,
  user_id = 1
)

card2 = Card(
  first_name = 'Demo',
  last_name = 'Lition',
  debit_number = 87,
  cvc_number = 321,
  balance = 100.00,
  user_id = 1
)


card3 = Card(
  first_name = 'Demo',
  last_name = 'Lition',
  debit_number = 23,
  cvc_number = 333,
  balance = 25000.00,
  user_id = 1
)

card4 = Card(
  first_name = 'Marnie',
  last_name = 'Klay',
  debit_number = 22,
  cvc_number = 232,
  balance = 500.00,
  user_id = 2
)

card5 = Card(
  first_name = 'Marnie',
  last_name = 'Klay',
  debit_number = 253,
  cvc_number = 231,
  balance = 100.00,
  user_id = 2
)

card6 = Card(
  first_name = 'Bobbie',
  last_name = 'Lee',
  debit_number = 33,
  cvc_number = 121,
  balance = 450.00,
  user_id = 3
)

card7 = Card(
  first_name = 'Bobbie',
  last_name = 'Lee',
  debit_number = 211,
  cvc_number = 532,
  balance = 100.00,
  user_id = 3
)

def seed_cards():
  db.session.add(card1)
  db.session.add(card2)
  db.session.add(card3)
  db.session.add(card4)
  db.session.add(card5)
  db.session.add(card6)
  db.session.add(card7)
  db.session.commit()


def undo_cards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM cards")

    db.session.commit()
