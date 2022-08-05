import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import './UserProfile/userProfile.css'
import { thunkGetAllPosts, thunkDeletePost} from '../store/posts'
import { useDispatch, useSelector } from 'react-redux';
import ReactModal from 'react-modal';
import EditPostForm from './editPostForm/editPostForm';

ReactModal.setAppElement('body')

function User() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const [showPostDetails, setShowPostDetails] = useState(false);
  const [clickedPost, setClickedPost] = useState('');
  const [showPostOptions, setShowPostOptions] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const allPosts = useSelector(state => Object.values(state.postReducer))

  const onlyUserPost = allPosts.filter(post => post.user_id === parseInt(userId))

  // console.log(clickedPost, "Clicked POST+++")
  // console.log(onlyUserPost, "USER POSTS", userId, "<--- USERID")

  function closeEditForm (){
    setShowEditForm(false)
  }
  function closePostOptions(){
    setShowPostOptions(false)
  }
  function closePostDetails() {
    setShowPostDetails(false)
  }

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
        <>
          <div key={post.id} className='user-indv-post' onClick={() => {setShowPostDetails(true); setClickedPost(post)}}>
            <img className='user-indv-img' src={post.photo}></img>
          </div>
          <ReactModal isOpen={showPostDetails}>
            <button className='indv-post-options-btn' onClick={()=> setShowPostOptions(true)}>...</button>
              <ReactModal portalClassName="post-options-Modal" isOpen={showPostOptions}  transparent={true}>
                  <button className="delete-post-btn" onClick={()=> {dispatch(thunkDeletePost(post.id)); setShowPostDetails(false)}}>Delete</button>
                  <button className="edit-post-btn" onClick={()=> {setShowEditForm(true)}}>Edit</button>
                  {showEditForm && (<EditPostForm closeEditForm={closeEditForm} closePostOptions={closePostOptions} closePostDetails={closePostDetails} postId={clickedPost.id}/>)}
                  <button className="cancel-options-btn" onClick={() => setShowPostOptions(false)}>Cancel</button>
              </ReactModal>
            <p>{clickedPost.location}</p>
            <img src={clickedPost.photo}></img>
            <p>{clickedPost.caption}</p>
            <button onClick={()=> setShowPostDetails(false)}>Cancel</button>
          </ReactModal>
        </>
          )}
      </div>
    </>
  );
}
export default User;
