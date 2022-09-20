import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import './UserProfile/userProfile.css'
import { thunkGetAllPosts, thunkDeletePost} from '../store/posts'
import { useDispatch, useSelector } from 'react-redux';
import ReactModal from 'react-modal';
import EditPostForm from './editPostForm/editPostForm';
import { getUserInfoThunk, updateProfileThunk } from '../store/users';
import defaultUserImage from './UserProfile/user (3).png'
import EditUserForm from './UserProfile/EditUser';
import cameraImg from '../components/UserProfile/camera.png'

ReactModal.setAppElement('body')

function User() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const [showPostDetails, setShowPostDetails] = useState(false);
  const [clickedPost, setClickedPost] = useState('');
  const [showPostOptions, setShowPostOptions] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editProfileModal, setEditProfileModal] = useState(false);

  const allPosts = useSelector(state => Object.values(state.postReducer)).reverse()

  const onlyUserPost = allPosts.filter(post => post.user_id === parseInt(userId))

  const specificPost = useSelector( state => state.postReducer[clickedPost.id])

  const userSession = useSelector(state => state.userReducer?.user)

  const loggedInUser = useSelector(state => state.session?.user.id)

  const clickedOnUser = useSelector(state => state)

  // console.log(onlyUserPost[0]?.userInfo, "clicked on USEr", clickedOnUser)

  // console.log(userSession?.username, "++++ USER SESSION username +++")
  // const [name, setName] = useState(userSession.full_name)
  const [username, setUsername] = useState('')
  const [fullname, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')
  const [website, setWebsite] = useState('')
  const [profilepic, setProfilePic] = useState('')

  function closeEditForm (){
    setShowEditForm(false)
  }
  function closePostOptions(){
    setShowPostOptions(false)
  }
  function closePostDetails() {
    setShowPostDetails(false)
  }
  function closeEditProfile(){
    setEditProfileModal(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(fullname, "FullNAME in frontEND")

    const formData = new FormData();
    formData.append("user_id", userSession?.id);
    formData.append("profilepic", profilepic);
    formData.append("username", username);
    formData.append("fullname", fullname)
    formData.append("email", email);

    await dispatch(updateProfileThunk(formData, userSession.id))
  }

  useEffect(() => {
    setUsername(userSession?.username)
    dispatch(getUserInfoThunk(userId))
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

  const updatePhoto = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
}

  if (!user) {
    return null;
  }

  const indvPostStyles = {
    overlay: {
      background: 'rgba(0,0,0,0.02)'
    },
    content: {
        padding: '25px',
        height: '38rem',
        width: '60rem',
        margin: 'auto',
        borderRadius: '10px',
        position: 'absolute',
        zIndex: '1',
    }
  }
  const postOptionStyles = {
    overlay: {
        background: 'rgba(0,0,0,0.01)'
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

  const editUserStyles = {
    overlay: {
        background: 'rgba(0,0,0,0.1)'
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



  return (
    <>
      <NavBar/>
        <div className='profile-info'>
          <div className='user-profile-pic-div'>
            <img className='user-profile-page-profile-pic' src={userSession?.profile_pic === null ? defaultUserImage : userSession?.profile_pic} alt='mescroll profile pic'></img>
          </div>
          <div className='profile-info-section-2'>
            <div className='username-editButton-div'>
              <div className='user-username-div'>{userSession?.username}</div>
              { parseInt(userId) === loggedInUser && (<button className='edit-profile-button' onClick={() => setEditProfileModal(true)}>Edit Profile</button>)}
            </div>
            <div className='fullname-email-div'>
              <div className='user-fullname-div'>{userSession?.full_name}</div>
              <div className='bio-div'>{userSession?.bio}</div>
              <div className='user-email-div'>
                <label>email: </label>
                <a style={{color:'#ffb4a5', textDecoration: 'none'}} href={`mailto: ${userSession?.email}`}>{userSession?.email}</a>
              </div>
              <div className='website-div'>
                <a className='website-a-tag' href={`https://${userSession?.website}`} target="_blank" rel="noopener noreferrer">{userSession?.website}</a>
              </div>
            </div>
          </div>
        </div>
        <ReactModal isOpen={editProfileModal} style={editUserStyles}>
          <EditUserForm userInfo={userSession} closeEditProfile={closeEditProfile}></EditUserForm>
        </ReactModal>
        <div className='user-photo-grid'>
          {onlyUserPost.length === 0 && (
          <>
          <div className='no-posts-div'>
            <img className='no-post-img' src={cameraImg}></img>
            <p className='no-post-yet-msg'>No Posts Yet</p>
          </div>
          </>
          )}
          {onlyUserPost.map((post) =>
          <>
            <div key={post.id} className='user-indv-post' onClick={() => {setShowPostDetails(true); setClickedPost(post)}}>
              <img className='user-indv-img' src={post.photo} alt='mescroll post'></img>
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
                    <img className='clicked-on-image' src={specificPost?.photo} alt='mescroll post'></img>
                  </div>
                  <div className='single-post-info-div'>
                  {userId == userSession?.id && (<button className='indv-post-options-btn' onClick={()=> setShowPostOptions(true)}>...</button>)}
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
