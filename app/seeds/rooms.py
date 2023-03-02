from app.models import db, environment, Room, SCHEMA

room1 = Room(user_id=1, friend_id=2)
room2 = Room(user_id=2, friend_id=3)
room3 = Room(user_id=1, friend_id=3)




def undo_rooms():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM cards")

    db.session.commit()
