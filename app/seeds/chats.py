from app.models import db, Chat, environment, SCHEMA


chat1 = Chat(
    message='first chat is live!',
    user_id = 1,
    room_id = 1,
)


chat2 = Chat(
    message='Is your transaction also not going through?',
    user_id = 2,
    room_id = 1,
)


chat3 = Chat(
    message='wow chat is so fast',
    user_id = 2,
    room_id = 2,
)


chat4 = Chat(
    message='websockets huh?',
    user_id = 3,
    room_id = 2,
)

chat5 = Chat(
    message='websockets huh?',
    user_id = 1,
    room_id = 3,
)

chat6 = Chat(
    message='yes websockets too fast!',
    user_id = 3,
    room_id = 3,
)

def seed_chats():
    db.session.add(chat1)
    db.session.add(chat2)
    db.session.add(chat3)
    db.session.add(chat4)
    db.session.add(chat5)
    db.session.add(chat6)
    db.session.commit()

def undo_chats():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.chats RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM chats")

        db.session.commit()
