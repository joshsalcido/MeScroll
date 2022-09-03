import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { thunkGetAllComments } from "../../store/comments";
import { thunkCreatePost, thunkGetAllPosts } from "../../store/posts";
import "../createPostForm/createPostForm.css"
import loadingGif from './Spin-1s-200px.gif'


export default function PostForm({closeCreateForm}){
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session?.user)
    const [errors, setErrors] = useState([]);
    const [errorCheck, setErrorCheck] = useState(false);

    const [photo, setPhoto] = useState(null);
    const [caption, setCaption] = useState(null);
    const [location, setLocation] = useState(null);
    const [captionLimitStyling, setCaptionLimitStyling] = useState(null);
    const [locationLimitStyling, setLocationLimitStyling] = useState(null);
    const [showCreateButton, setShowCreateButton] = useState(true);

    const [submitted, setHasSubmitted]= useState(false);


    useEffect(() => {
      const valErrors = [];
      if (caption?.length === 2000){
        setCaptionLimitStyling({color: 'red'})
      } else {
        setCaptionLimitStyling(null);
      }
      if (location?.length === 40){
        setLocationLimitStyling({color: 'red'})
      } else {
        setLocationLimitStyling(null);
      }
      if (caption?.trim().length === 0) valErrors.push("Can't submit empty caption, please enter text")
      if (location?.trim().length === 0) valErrors.push("Can't submit empty location, please enter text")
      setErrors(valErrors)
    },[caption, location])



    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = []

        if (caption.trim().length === 0) errors.push("Can't submit empty caption, please enter text")
        if (location.trim().length === 0) errors.push("Can't submit empty location, please enter text")
        setErrors(errors)

        if (errors.length) {
          return
        } else {
          setShowCreateButton(false)
          // console.log(caption.length, " ++++ caption length that gets sent to dispatch")
          const formData = new FormData();
          formData.append("user_id", sessionUser.id)
          formData.append("photo", photo);
          formData.append("caption", caption);
          formData.append("location", location);

          await dispatch(thunkCreatePost(formData))

          closeCreateForm()

          setPhoto('')
          setCaption('')
          setLocation('')
          setShowCreateButton(true)
          setHasSubmitted(true);
        }
    }

  useEffect(()=> {
    dispatch(thunkGetAllComments())
    dispatch(thunkGetAllPosts())
  }, [dispatch])

    const updatePhoto = (e) => {
      const file = e.target.files[0];
      setPhoto(file);
  }

// console.log(caption?.length, "caption length in create")

    return (
        <>
        <form className="post-form" onSubmit={handleSubmit}>
            <label>Upload a Photo:</label>
            <input
              required
              type="file"
              name="photo"
              accept="image/jpg, image/jpeg, image/png, image/gif"
              className="photo-input"
              onChange={(e) => updatePhoto(e)}
            />
            <ul className="error-messages">
              {errors && errors.map((error, ind) => (
                <li key={ind}>{error}</li>
              ))}
            </ul>
            <label>Caption:</label>
            <textarea
              className="caption-input"
              type="text"
              required
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              maxLength={2000}
            ></textarea>
            <p className="caption-location-length" style={captionLimitStyling} >{caption?.length}/2000</p>
            <label>Location:</label>
            <input
              required
              className="location-input-CreateForm"
              maxLength={40}
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <p className="caption-location-length" style={locationLimitStyling} >{location?.length}/40</p>
            {showCreateButton && (<button type="submit">Create Post</button>)}
            {!showCreateButton && (<img className="loading-gif" src={loadingGif}></img>)}
            {/* <img src={loadingGif}></img> */}
        </form>
        </>
    )
}
