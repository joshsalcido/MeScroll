import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { thunkGetAllComments, thunkCreateComment } from "../../store/comments";
import { thunkGetAllPosts } from "../../store/posts";
import '../commentForm.js/commentForm.css'

export default function CommentForm({currentPost}){
    const dispatch = useDispatch()
    const userId = useSelector(state => state.session?.user?.id)

    const [comment_body, setComment_body] = useState('')
    const [commentButtonDisabled, setCommentButtonDisabled] = useState(true)

    const [submitted, setHasSubmitted]= useState(false);

    // console.log(currentPost.id, 'ComentForm')
    const commentButtonStyleOff = {
        backgroundColor: '#fedcd5',
    }

    const [commentButtonStyle, setCommentButtonStyle] = useState(commentButtonStyleOff)
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
    useEffect(()=> {
        if (comment_body.length){
            setCommentButtonStyle(null)
            setCommentButtonDisabled(false)
        } else {
            setCommentButtonStyle(commentButtonStyleOff)
            setCommentButtonDisabled(true)
        }
    }, [comment_body])


    return (
        <>
        <form className="create-comment" onSubmit={handleSubmit}>
                <textarea
                key={currentPost.id}
                className="comment-textarea"
                value={comment_body}
                onChange={(e) => {setComment_body(e.target.value); setCommentButtonDisabled(false); setCommentButtonStyle(commentButtonStyleOff)}}
                placeholder='Add a Comment...'
                maxlength="1000"
                ></textarea>
                <button className="comment-post-button" style={commentButtonStyle} disabled={commentButtonDisabled} type="submit">Post</button>
            </form>
        </>
    )
}
