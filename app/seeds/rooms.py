from app.models import db, environment, Room, SCHEMA

room1 = Room(user_id=1, friend_id=2)
room2 = Room(user_id=2, friend_id=3)
room3 = Room(user_id=1, friend_id=3)

def seed_rooms():
    db.session.add(room1)
    db.session.add(room2)
    db.session.add(room3)
    db.session.commit()


def undo_rooms():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM rooms")

    db.session.commit()
