import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfoThunk, updateProfileThunk } from '../../store/users'
import '../UserProfile/userProfile.css'
import loadingGif from '../createPostForm/Spin-1s-200px.gif'
import defaultUserImage from '../UserProfile/user (3).png'

export default function EditUserForm({userInfo, closeEditProfile}){

  const dispatch = useDispatch();

  const [user, setUser] = useState({});

  const [clickedPost, setClickedPost] = useState('');
  const [loading, setLoading] = useState(false)

  const userId = useSelector(state => state.session?.user.id)

  const userSession = useSelector(state => state.userReducer?.user)

  const [errors, setErrors] = useState([]);

  const [username, setUsername] = useState('')
  const [fullname, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')
  const [website, setWebsite] = useState('')
  const [profilepic, setProfilePic] = useState('')

  const disabledButton = {
    backgroundColor: '#fedcd5',
  }

  const [saveChangesStyles, setsaveChangesStyles] = useState(disabledButton)
  const [saveChangesdisabled, setSaveChangesDisabled] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = /^[a-zA-Z]+$/.test(website[4])
    let period = /.*\..*\..*/.test(website)
    let correctEnd = false

    if (website.endsWith('.com') || website.endsWith('.co') || website.endsWith('.net') || website.endsWith('.org') || website.endsWith('.us')|| website.endsWith('.gov') || website.endsWith('.edu') || website.endsWith('.info')){
      correctEnd = false;
    } else {
      correctEnd = true;
    }

    if ( !website.startsWith('www.') || !res  || !period || correctEnd ){
      errors.push("website error")
      setSaveChangesDisabled(true)
      setsaveChangesStyles(disabledButton)
      return
    } else {
        const formData = new FormData();
        formData.append("user_id", userSession?.id);
        formData.append("profilepic", profilepic);
        formData.append("username", username);
        formData.append("fullname", fullname)
        formData.append("email", email);

        if (bio === null || bio === "null") {
          formData.append("bio", '');
        } else {
          formData.append("bio", bio)
        }

        if (website === null || website === "null") {
          formData.append("website", '')
        } else {
          formData.append("website", website)
        }

        await dispatch(updateProfileThunk(formData, userSession.id))

        closeEditProfile()
    }
  }

  // useEffect(() => {

  // }, [])

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

  }, [dispatch,userId, errors]);

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


  return (
        <>
          <form onSubmit={handleSubmit} className="edit-profile-form">
            <button type="button" className="userform-cancel-x-button" onClick={() => closeEditProfile()}>X</button>
            <div className="edit-user-container-1">
              <img className='user-profile-page-profile-pic' src={userSession?.profile_pic === null ? defaultUserImage : userSession?.profile_pic} alt="mescroll user pic"></img>
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
            {errors.length > 0 && (<span className="website-error-msg">Please enter a valid website, (start: www. , end: .com, .org, .gov, etc.)</span>)}
            <input
            placeholder="www.example.com"
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
