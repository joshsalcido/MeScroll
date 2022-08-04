import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { thunkCreatePost } from "../../store/posts";


export default function PostForm(){
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)

    const [photo, setPhoto] = useState('');
    const [caption, setCaption] = useState('');
    const [location, setLocation] = useState('');

    const [submitted, setHasSubmitted]= useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        const post = {
            user_id: sessionUser.id,
            photo: photo,
            caption,
            location,
        }

        dispatch(thunkCreatePost(post))

        setPhoto('')
        setCaption('')
        setLocation('')
    }


    return (
        <>
        <form className="post-form" onSubmit={handleSubmit}>
            <label>Photo:</label>
            <input
              type="text"
              className="photo-input"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              required
            />
            <label>Caption:</label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            ></textarea>
            <label>Location:</label>
            <input
            type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <button type="submit">Create Post</button>
        </form>
        </>
    )
}
