from app.models import db, Comment


# Adds a demo user, you can add other users here if you want
def seed_comments():
    comment1 = Comment(
        user_id =2,
        post_id=1,
        comment_body='Yooooooo 😍',
        )
    comment2 = Comment(
        user_id =2,
        post_id=2,
        comment_body='This color is gorgeous 😍',
        )
    comment3 = Comment(
        user_id =2,
        post_id=3,
        comment_body="I can't wait to visit Japan! 😩",
        )
    comment4 = Comment(
        user_id =2,
        post_id=3,
        comment_body='Yo is this a typeR? 🤔',
        )

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
