import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfoThunk, updateProfileThunk } from '../../store/users'
import '../UserProfile/userProfile.css'
import loadingGif from '../createPostForm/Spin-1s-200px.gif'

export default function EditUserForm({userInfo, closeEditProfile}){

  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  // const { userId }  = useParams();
  const [showPostDetails, setShowPostDetails] = useState(false);
  const [clickedPost, setClickedPost] = useState('');
  const [showPostOptions, setShowPostOptions] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [loading, setLoading] = useState(false)

  const allPosts = useSelector(state => Object.values(state.postReducer)).reverse()
  const userId = useSelector(state => state.session?.user.id)

  const onlyUserPost = allPosts.filter(post => post.user_id === parseInt(userId))

  const specificPost = useSelector( state => state.postReducer[clickedPost.id])

  const userSession = useSelector(state => state.userReducer?.user)



  const [username, setUsername] = useState('')
  const [fullname, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')
  const [website, setWebsite] = useState('')
  const [profilepic, setProfilePic] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("user_id", userSession?.id);
    formData.append("profilepic", profilepic);
    formData.append("username", username);
    formData.append("fullname", fullname)
    formData.append("email", email);
    formData.append("bio", bio);
    formData.append("website", website)

    await dispatch(updateProfileThunk(formData, userSession.id))

    closeEditProfile()
  }

  useEffect(() => {
    setUsername(userSession?.username)
    setFullName(userSession?.full_name)
    setEmail(userSession?.email)
    setBio(userSession?.bio)
    setWebsite(userSession?.website)

    dispatch(getUserInfoThunk(userId))

    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();

  }, [dispatch,userId]);

  const updatePhoto = async (e) => {

    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("user_id", userSession?.id);
      formData.append("profilepic", file);
      formData.append("username", username);
      formData.append("fullname", fullname);
      formData.append("email", email);
      formData.append("bio", bio);
      formData.append("website", website);
      await dispatch(updateProfileThunk(formData, userSession.id))


    }
    setLoading(false)
  }

  const disabledButton = {
    backgroundColor: '#fedcd5',
  }

  const [saveChangesStyles, setsaveChangesStyles] = useState(disabledButton)
  const [saveChangesdisabled, setSaveChangesDisabled] = useState(true)

  return (
        <>
          <form onSubmit={handleSubmit} className="edit-profile-form">
            <button type="button" className="userform-cancel-x-button" onClick={() => closeEditProfile()}>X</button>
            <div className="edit-user-container-1">
              <img className='user-profile-page-profile-pic' src={userSession?.profile_pic} alt="mescroll user pic"></img>
              { loading && (<img className="edit-profile-loading" src={loadingGif}></img>)}
              <input
               type="file"
               name="photo"
               accept="image/jpg, image/jpeg, image/png, image/gif"
               className="edit-user-photo-input"
               onChange={(e) => {if (e.target.value !== undefined){setLoading(true)}; updatePhoto(e); setSaveChangesDisabled(false); setsaveChangesStyles(null) }}
               ></input>
            </div>
            <label className="editForm-input-labels">Name</label>
            <input
            maxLength={50}
            value={fullname}
            type="text"
            onChange={(e) => {setFullName(e.target.value); setSaveChangesDisabled(false); setsaveChangesStyles(null)}}
            ></input>
            <label className="editForm-input-labels" >Username</label>
            <input
            maxLength={50}
            value={username}
            type="text"
            onChange={(e) => {setUsername(e.target.value); setSaveChangesDisabled(false); setsaveChangesStyles(null)}}
            ></input>
            <label className="editForm-input-labels" >Bio</label>
            <input
            maxLength={80}
            value={bio}
            type="text"
            onChange={(e) => {setBio(e.target.value); setSaveChangesDisabled(false); setsaveChangesStyles(null)}}
            ></input>
            <label className="editForm-input-labels" >Website</label>
            <input
            maxLength={70}
            value={website}
            type="text"
            onChange={(e) => {setWebsite(e.target.value); setSaveChangesDisabled(false); setsaveChangesStyles(null)}}
            ></input>
            <label className="editForm-input-labels" >Email</label>
            <input
            maxLength={50}
            value={email}
            type="text"
            onChange={(e) => {setEmail(e.target.value); setSaveChangesDisabled(false); setsaveChangesStyles(null)}}
            ></input>
            <button disabled={saveChangesdisabled} style={saveChangesStyles}>Save Changes</button>
          </form>
        </>

    )
}
