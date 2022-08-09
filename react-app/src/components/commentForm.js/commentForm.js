import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { thunkGetAllComments, thunkCreateComment } from "../../store/comments";
import { thunkGetAllPosts } from "../../store/posts";


export default function CommentForm({currentPost}){
    const dispatch = useDispatch()
    const userId = useSelector(state => state.session?.user?.id)

    const [comment_body, setComment_body] = useState('')

    const [submitted, setHasSubmitted]= useState(false);

    // console.log(currentPost.id, 'ComentForm')

    const handleSubmit = async (e) => {
        e.preventDefault();

        const comment = {
            user_id: userId,
            post_id: currentPost.id,
            comment_body
        }

        await dispatch(thunkCreateComment(currentPost.id, comment))
        .then(dispatch(thunkGetAllComments()))
        // dispatch(thunkGetAllComments(currentPost.id))

        setComment_body('')
    }


    return (
        <>
        <form className="create-comment" onSubmit={handleSubmit}>
                <textarea
                key={currentPost.id}
                className="comment-textarea"
                value={comment_body}
                onChange={(e) => setComment_body(e.target.value)}
                placeholder='Add a Comment...'
                ></textarea>
                <button type="submit">Post</button>
            </form>
        </>
    )
}
