import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfoThunk, updateProfileThunk } from '../../store/users'

export default function EditUserForm({userInfo, closeEditProfile}){

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

  const userOldSesh = useSelector(state => state.session?.user)

  console.log(userSession?.username, "++++ USER SESSION username +++")
  // const [name, setName] = useState(userSession.full_name)
  const [username, setUsername] = useState('')
  const [fullname, setFullName] = useState('')
  const [email, setEmail] = useState('')
  // const [bio, setBio] = useState('')
  const [profilepic, setProfilePic] = useState('')
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

    closeEditProfile()
  }

  useEffect(() => {
    setUsername(userSession?.username)
    setFullName(userSession?.full_name)
    setEmail(userSession?.email)
    dispatch(getUserInfoThunk(userId))
    // dispatch(thunkGetAllPosts())
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

    return (
        <>
          <form onSubmit={handleSubmit} className="edit-profile-form">
            <button type="button" onClick={() => closeEditProfile()}>X</button>
            <div>
              <img className='user-profile-page-profile-pic' src={userSession?.profile_pic} alt="mescroll user pic"></img>
              <input
               type="file"
               name="photo"
               accept="image/jpg, image/jpeg, image/png, image/gif"
               className="photo-input"
               onChange={(e) => updatePhoto(e)}
               ></input>
            </div>
            <label>Name</label>
            <input
            value={fullname}
            type="text"
            onChange={(e) => setFullName(e.target.value)}
            ></input>
            <label>Username</label>
            <input
            value={username}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            ></input>
            <label>Email</label>
            <input
            value={email}
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            ></input>
            <button >Submit Changes</button>
          </form>
        </>

    )
}
