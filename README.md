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

My Allposts component contains a lot of functionality and other components within it. It still has room for clean up and organization, but at the start of this project I was running into several different issues as I was trying to render my comments and all my forms associated with everything on the mainfeed inside the Allposts component! I created two separate components one for a comment section and one for my comment form, and I took advantage of props to pass down the data needed for those components. It cleaned up my code a lot, and made it easier and more efficient to work with!

![Screen Shot 2022-08-15 at 2 01 53 AM](https://user-images.githubusercontent.com/75753879/184598663-fcbe3962-aa96-49a4-82ef-e278dfd9315f.png)


## meScroll layout and Plan:

 - [Database Schema](https://github.com/joshsalcido/MeScroll/wiki/Database-Schema)
 - [Feature List](https://github.com/joshsalcido/mescroll/wiki/MVP-Features#feature-list)
 - [Store Shape](https://github.com/joshsalcido/stays-app/wiki/Store-Shape)
 - [User Stories](https://github.com/joshsalcido/mescroll/wiki/User-Stories)


## To-dos/Future Features

Here are some features that haven't made the site yet but will be implemented soon!

 - Followers and capability to Follow
 - User profile editing, and profile pic uploading
 - Search Bar to find other users
 - Likes
 - Post Bookmarking
