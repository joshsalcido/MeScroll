import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import './UserProfile/userProfile.css'
import {thunkGetAllPosts} from '../store/posts'
import { useDispatch, useSelector } from 'react-redux';

function User() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const [showPostDetails, setShowPostDetails] = useState(false);
  const allPosts = useSelector(state => Object.values(state.postReducer))

  const onlyUserPost = allPosts.filter(post => post.user_id === parseInt(userId))

  // console.log(allPosts, "ALL POSTS")
  // console.log(onlyUserPost, "USER POSTS", userId, "<--- USERID")

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();

    dispatch(thunkGetAllPosts())
  }, [dispatch,userId]);

  if (!user) {
    return null;
  }

  return (
    <>
      <NavBar/>
      <ul className='profile-info'>
        <li>
          <strong>User Id</strong> {userId}
        </li>
        <li>
          <strong>Username</strong> {user.username}
        </li>
        <li>
          <strong>Email</strong> {user.email}
        </li>
      </ul>
      <div className='user-photo-grid'>
        {onlyUserPost.map((post) =>
        <div key={post.id} className='user-indv-post' onClick={() => setShowPostDetails(true)}>
          <img className='user-indv-img' src={post.photo}></img>
        </div>
          )}
      </div>
    </>
  );
}
export default User;
