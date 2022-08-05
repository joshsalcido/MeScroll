import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { thunkCreatePost, thunkGetAllPosts, thunkUpdatePost } from "../../store/posts";


export default function EditPostForm({closeEditForm, postId, closePostOptions, closePostDetails}){
    const dispatch = useDispatch()
    // const { postId } = useParams()

    // console.log(postId, 'EDIT FORM POSTID++')

    const sessionUser = useSelector(state => state.session.user)
    const post = useSelector(state => state.postReducer[postId])

    // console.log(post, 'EDIT FORM POST')

    const [photo, setPhoto] = useState(`${post.photo}`);
    const [caption, setCaption] = useState(`${post.caption}`);
    const [location, setLocation] = useState(`${post.location}`);

    const [submitted, setHasSubmitted]= useState(false);

    // function closeCreateForm(){
    //     setShowCreateForm(false)
    //   }

    const handleSubmit = async (e) => {
        e.preventDefault();

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

    useEffect(()=> {
      dispatch(thunkGetAllPosts())
    }, [dispatch])


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
            <button type="submit">Update Post</button>
            <button onClick={()=> closeEditForm()}>Cancel</button>
        </form>
        </>
    )
}
