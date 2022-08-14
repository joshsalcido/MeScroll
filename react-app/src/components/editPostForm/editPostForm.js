import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { thunkCreatePost, thunkGetAllPosts, thunkUpdatePost } from "../../store/posts";
import '../editPostForm/editForm.css'


export default function EditPostForm({closeEditForm, postId, closePostOptions, closePostDetails}){
    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user)
    const post = useSelector(state => state.postReducer[postId])

    const [photo, setPhoto] = useState(`${post.photo}`);
    const [caption, setCaption] = useState(`${post.caption}`);
    const [location, setLocation] = useState(`${post.location}`);

    const [submitted, setHasSubmitted]= useState(false);
    const [errors, setErrors] = useState([]);
    const [captionLimitStyling, setCaptionLimitStyling] = useState(null);
    const [locationLimitStyling, setLocationLimitStyling] = useState(null)

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
          const updatedPost = {
              photo,
              caption,
              location,
              id: postId,
          }

          dispatch(thunkUpdatePost(updatedPost))

          setHasSubmitted(true);
          closeEditForm();
          closePostOptions();
          // closePostDetails();

          setPhoto('')
          setCaption('')
          setLocation('')
        }
    }

    // useEffect(()=> {
    //   dispatch(thunkGetAllPosts())
    // }, [dispatch])


    return (
        <>
        <form className="edit-post-form" onSubmit={handleSubmit}>
          <div className="edit-post-form-div">
            <div className="edit-form-photo-div">
              <img className="edit-img" src={post.photo}></img>
            </div>
            <div className="edit-caption-location-div">
              <ul className="error-messages">
                {errors && errors.map((error, ind) => (
                  <li key={ind}>{error}</li>
                ))}
              </ul>
              <label className="caption-edit-label">Caption:</label>
              <textarea
                required
                className="edit-caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                maxlength="2000"
              ></textarea>
              <p className="caption-char-counter" style={captionLimitStyling}>{parseInt(caption.length).toLocaleString("en-Us")}/2,000</p>
              <label className="location-edit-label" >Location:</label>
              <input
                required
                className="edit-location-input"
                type="text"
                maxlength="40"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <p className="location-char-counter" style={locationLimitStyling}>{location.length}/40</p>
              <button type="submit">Update Post</button>
              <button onClick={()=> {closeEditForm(); closePostOptions()}}>Cancel</button>
            </div>
          </div>
        </form>
        </>
    )
}
