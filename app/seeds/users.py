from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        full_name='Demo User',
        profile_pic='https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
        username='Demo1',
        email='demo@aa.io',
        password='password')
    marnie = User(
        full_name='Marnie Legg',
        profile_pic=None,
        username='marnie',
        email='marnie@aa.io',
        password='password')
    bobbie = User(
        full_name='Bobbie Baggins',
        profile_pic='https://chadlindbergfansite.files.wordpress.com/2011/07/fast-furious-30.jpg',
        username='bobbie',
        email='bobbie@aa.io',
        password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
