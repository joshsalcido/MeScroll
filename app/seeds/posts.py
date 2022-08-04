from app.models import db, Post


# Adds a demo user, you can add other users here if you want
def seed_posts():
    rx7 = Post(
        user_id =3,
        photo='https://i.pinimg.com/564x/d6/04/22/d60422789e568c4d6765101618a8045c.jpg',
        caption='Gloomy days',
        location='Osaka, Japan',
        )
    s15olive = Post(
        user_id =3,
        photo='https://i.pinimg.com/564x/86/ce/ed/86ceeda9c7a8169fded6537cd164410c.jpg',
        caption='How we feelin about the olive on this one?',
        location='Fukuoka, Japan',
        )
    nsx = Post(
        user_id =3,
        photo='https://i.pinimg.com/564x/be/14/6a/be146ad34b1316d60a8011e4cfb0493b.jpg',
        caption='Tokyo nights',
        location='Tokyo, Japan',
        )
    skyline = Post(
        user_id =3,
        photo='https://i.pinimg.com/564x/c6/a7/3b/c6a73b708054b9afebffc191089e47f6.jpg',
        caption='This is the only time yellow looks good',
        location='Tokyo, Japan',
        )

    db.session.add(rx7)
    db.session.add(s15olive)
    db.session.add(nsx)
    db.session.add(skyline)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
