# Welcome to meScroll!

Similiar to the popular photo sharing app Instagram, at **meScroll** you can upload photo posts, comments on photo posts, and view your very own profile, and other users profiles as well! Check out [meScroll](https://mescroll.herokuapp.com/) now!

Created with: **Python**, **JavaScript**, **React**, **Redux**, **PostgresSQL**, **Flask**, **SQLAlchemy**, **Docker**, **CSS**, **Heroku**


## Landing Page

If you have a **meScroll** account Log in! If you don't have an account yet feel free to browse around by using our Guest Login Button, or click our Sign Up link and get started creating an account! 

![Screen Shot 2022-08-15 at 1 17 49 AM](https://user-images.githubusercontent.com/75753879/184592654-e114626f-46c9-4f27-b6e6-e00b88638cee.png)

## Sign-Up Page

Fill out the Sign-Up form and get started on **meScroll** with your very own account!

![Screen Shot 2022-08-15 at 1 18 07 AM](https://user-images.githubusercontent.com/75753879/184592713-5fbee0e1-a186-47fa-b5df-c6120a6a3e92.png)


## Create a Post!

Once you have signed up you will automatically be logged in and taken to our main meScroll feed, where you will see all posts of our users. On our Navigation Menu you will see a square witha + sign, click on it to create your first post! Wether you are on the main feed home page, or in your own profile page, you will automatically see your photo be live and posted! You can also instantly delete it or edit it from both location, mainfeed (home page) and your user profile!

![Screen Shot 2022-08-15 at 1 25 37 AM](https://user-images.githubusercontent.com/75753879/184593887-84b67260-0327-49d1-8f54-9d0e61a6dba4.png)

![Screen Shot 2022-08-15 at 1 34 28 AM](https://user-images.githubusercontent.com/75753879/184594757-9c6e32fb-3bd5-4cb3-9783-84c61733831b.png)

![Screen Shot 2022-08-15 at 1 34 45 AM](https://user-images.githubusercontent.com/75753879/184594780-1a3167d7-4fec-49ec-9877-cc7129b7cf31.png)

## Leave some Comments!

meScroll users are able to leave multiple comments on there own posts and other users posts as well! Users can also edit and delete there own comment in the mainfeed/home page! 


https://user-images.githubusercontent.com/75753879/184597037-54bf33e3-d62f-4633-b091-0f6e3b9c0026.mov



## Technical Implementation Details

Taking the time to setup my database properly and understand the relationship between my models was super important to me and came in handy when I needed to pull related data from other data. This situation first presented itself in the reviews feature, I wanted to showcase reviews in the same individual spot (or individual stay/listing) page and underneath the individual spot/listing information. Since I also created a reducer specifically for my reviews I was able to easily access reviews through the state.


    const  reviewsObj  =  useSelector(state  =>  state.reviewReducer)
    const  reviews  =  Object.values(reviewsObj);

I was then able to iterate through all the reviews that the particular spot/listing had and display them!

  

    {  reviews  &&  reviews.map((review) => (
    <div  key={review.id}>
	    {(
	    <div  className="reviewBox"> 
		    <h5>Rating: {review.rating}</h5>
		    <span>{review.review}</span>
	    {userId  &&  userId  ===  review.userId && (
	    <button  onClick={()=>  onDelete(review.id)}>Delete Your Review!</button>
	    )}
	    </div>
	    )}
    </div>
    ))}
Using conditionals within my JSX was a great way to solve some of my road bumps, for example figuring out how to Display a delete button only if the logged in users Id matched the userId asspciated to that review. After overcoming this road bump I was able to use multiple conditionals to display specific features throughout Stays

    {userId  &&  userId  ===  review.userId && (
    <button  onClick={()=>  onDelete(review.id)}>Delete Your Review!</button>
    )}

## Stays layout and Plan:

 - [Database Schema](https://github.com/joshsalcido/stays-app/wiki/Database-Schema)
 - [Feature List](https://github.com/joshsalcido/stays-app/wiki/MVP-Feature-List)
 - [Store Shape](https://github.com/joshsalcido/stays-app/wiki/Store-Shape)

## Install Instructions

Run Stays locally! Clone the stays repo to a local folder

    git clone https://github.com/joshsalcido/stays-app.git

In both the backend directory and frontend run npm install to install all dependencies

    npm install

#### In the backend directory create a .env file, use the .env.example file as a reference and fill it out with your desired port, username, password, and database name
*now in the backend directory create, migrate, and seed the database, run:*

    npx dotenv sequelize db:create
    npx dotenv sequelize db:migrate
    npx dotenv sequelize db:seed:all

Final step, run the server, navigate to the backend directory in one terminal and in another terminal navigate to the frontend directory and run this in both:

    npm start

## To-dos/Future Features

Given the time constraint of a week, here are some features that haven't made the site yet but will be implemented soon!

 - Listing Categories ex. Cabins, Islands, Modern Design, A-frames etc.
 - Bookings
 - AWS local photo uploads
 - Favorites, save listings to a Favorites list
 - Listing Search bar
