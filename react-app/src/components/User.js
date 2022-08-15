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

  const allPosts = useSelector(state => Object.values(state.postReducer)).reverse()

  const onlyUserPost = allPosts.filter(post => post.user_id === parseInt(userId))

  const specificPost = useSelector( state => state.postReducer[clickedPost.id])

  const userSession = useSelector(state => state.session?.user)


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

    dispatch(thunkGetAllPosts())

    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();

  }, [dispatch,userId]);

  if (!user) {
    return null;
  }

  const indvPostStyles = {
    overlay: {
      background: 'rgba(0,0,0,0.02)'
    },
    content: {
        padding: '25px',
        height: '43.5rem',
        width: '63.8rem',
        margin: 'auto',
        borderRadius: '20px',
    }
  }
  const postOptionStyles = {
    overlay: {
        background: 'rgba(0,0,0,0.09)'
      },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',

    }
  }

  const editPostStyling = {
    overlay: {
      background: 'rgba(0,0,0,0.02)'
    },
    content: {
        padding: '0px',
        height: '43.5rem',
        width: '63.8rem',
        margin: 'auto',
        borderRadius: '20px',
    }
  }

console.log(onlyUserPost.length, "++++++")

  return (
    <>
      <NavBar/>
        <div className='profile-info'>
          {/* <img className='user-profile-page-profile-pic' src={user.profile_pic}></img> */}
          <div>{user.full_name}</div>
          <div>{user.username}</div>
          <div>
            <strong>Email</strong> {user.email}
          </div>
        </div>
        <div className='user-photo-grid'>
          {onlyUserPost.length === 0 && (
          <>
          <h1>You currently have zero Posts</h1>
          </>
          )}
          {onlyUserPost.map((post) =>
          <>
            <div key={post.id} className='user-indv-post' onClick={() => {setShowPostDetails(true); setClickedPost(post)}}>
              <img className='user-indv-img' src={post.photo}></img>
            </div>
            <ReactModal isOpen={showPostDetails} style={indvPostStyles}>
                <ReactModal portalClassName="post-options-Modal" isOpen={showPostOptions}  style={postOptionStyles}>
                    <button  onClick={()=> {setShowEditForm(true);}}>Edit</button>
                    <button  onClick={()=> {dispatch(thunkDeletePost(specificPost?.id)); setShowPostDetails(false); setShowPostOptions(false)}}>Delete</button>
                    <button  onClick={() => setShowPostOptions(false)}>Cancel</button>
                </ReactModal>
                <ReactModal isOpen={showEditForm} style={editPostStyling}>
                    <EditPostForm closeEditForm={closeEditForm} closePostOptions={closePostOptions} closePostDetails={closePostDetails} postId={clickedPost.id}/>
                </ReactModal>
                <div className='clicked-on-post-div'>
                  <div className='single-post-photo-div'>
                    <img className='clicked-on-image' src={specificPost?.photo}></img>
                  </div>
                  <div className='single-post-info-div'>
                  {userId == userSession.id && (<button className='indv-post-options-btn' onClick={()=> setShowPostOptions(true)}>...</button>)}
                    {/* <p>{specificPost}</p> */}
                    <label className='caption-location-single-post'>Location:</label>
                    <p >{specificPost?.location}</p>
                    <label className='caption-location-single-post'>Caption:</label>
                    <p >{specificPost?.caption}</p>
                    <button onClick={()=> setShowPostDetails(false)}>Cancel</button>
                  </div>
                </div>
            </ReactModal>
          </>
            )}
        </div>
    </>
  );
}
export default User;
