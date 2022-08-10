import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { thunkGetAllComments } from "../../store/comments";
import { thunkCreatePost, thunkGetAllPosts } from "../../store/posts";


export default function PostForm({closeCreateForm}){
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session?.user)

    const [photo, setPhoto] = useState(null);
    const [caption, setCaption] = useState('');
    const [location, setLocation] = useState('');

    const [submitted, setHasSubmitted]= useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setHasSubmitted(true);

        const formData = new FormData();
        formData.append("user_id", sessionUser.id)
        formData.append("photo", photo);
        formData.append("caption", caption);
        formData.append("location", location);

        console.log(formData, "formData FROM COMPONENT")
        // const post = {
        //     user_id: sessionUser.id,
        //     photo: photo,
        //     caption,
        //     location,
        // }
        await dispatch(thunkCreatePost(formData))
        // dispatch(thunkGetAllComments())
        // dispatch(thunkGetAllPosts())

        closeCreateForm()

        setPhoto('')
        setCaption('')
        setLocation('')
    }

    useEffect(()=> {
      dispatch(thunkGetAllComments())
      dispatch(thunkGetAllPosts())
    }, [dispatch])

    const updatePhoto = (e) => {
      const file = e.target.files[0];
      setPhoto(file);
  }

  // input[type=file]::file-selector-button {  }
    return (
        <>
        <form className="post-form" onSubmit={handleSubmit}>
            <label>Photo:</label>
            <input
              type="file"
              name="photo"
              accept="image/jpg, image/jpeg, image/png, image/gif"
              className="photo-input"
              onChange={(e) => updatePhoto(e)}
            />
            <label>Caption:</label>
            <textarea
              required
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            ></textarea>
            <label>Location:</label>
            <input
              required
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <button type="submit">Create Post</button>
        </form>
        </>
    )
}
