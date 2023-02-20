from app.models import db, Wallet, environment, SCHEMA

wallet1 = Wallet(
  money_total = 10000,
  user_id = 1
)

wallet2 = Wallet(
  money_total = 5000,
  user_id = 2
)

wallet3 = Wallet(
  money_total = 7500,
  user_id = 3
)

def seed_wallets():
  db.session.add(wallet1)
  db.session.add(wallet2)
  db.session.add(wallet3)
  db.session.commit()


def undo_wallets():
  if environment == "production":
      db.session.execute(f"TRUNCATE table {SCHEMA}.wallets RESTART IDENTITY CASCADE;")
  else:
      db.session.execute("DELETE FROM wallets")

  db.session.commit()
