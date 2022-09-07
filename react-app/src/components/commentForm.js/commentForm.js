import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
// import { NavLink } from "react-router-dom";
import { thunkGetAllComments, thunkCreateComment } from "../../store/comments";
// import { thunkGetAllPosts } from "../../store/posts";
import '../commentForm.js/commentForm.css'

export default function CommentForm({currentPost}){
    const dispatch = useDispatch()
    const userId = useSelector(state => state.session?.user?.id)

    const [comment_body, setComment_body] = useState(null)
    const [commentButtonDisabled, setCommentButtonDisabled] = useState(true)
    const [commentLengthMaxStyling, setCommentLengthMaxStyling] = useState(null);
    const [showCommentCounter, setShowCommentCounter] = useState(false);

    // const [submitted, setHasSubmitted] = useState(false);
    const [ errors, setErrors] = useState([])

    // console.log(currentPost.id, 'ComentForm')
    const commentButtonStyleOff = {
        backgroundColor: '#fedcd5',
    }
    // const commentMaxStyling = {
    //     color: 'red',
    // }

    const [commentButtonStyle, setCommentButtonStyle] = useState(commentButtonStyleOff)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (errors.length) {
            return
        } else {
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
    }

    useEffect(()=> {
        // let valErrors = [];

        if (comment_body?.length === 1000) {
            setCommentLengthMaxStyling({color: 'red'})
        } else {
            setCommentLengthMaxStyling(null)
        }
        if (comment_body?.length){
            setShowCommentCounter(true)
            setCommentButtonStyle(null)
            setCommentButtonDisabled(false)
        } else {
            setShowCommentCounter(false)
            setCommentButtonStyle(commentButtonStyleOff)
            setCommentButtonDisabled(true)
        }

        if (comment_body?.trim().length === 0) {
            // setShowCommentCounter(false)
            setCommentButtonStyle(commentButtonStyleOff)
            setCommentButtonDisabled(true)
        } else {
            setCommentButtonDisabled(false)
        }
    //   setErrors(valErrors);
    }, [comment_body])



    return (
        <>
        <ul className="error-messages">
              {errors && errors.map((error, ind) => (
                <li key={ind}>{error}</li>
              ))}
        </ul>
        { showCommentCounter && (<p className="comment-length" style={commentLengthMaxStyling}>{comment_body?.length}/1000</p>)}
        <form className="create-comment" onSubmit={handleSubmit}>
                <textarea
                key={currentPost.id}
                className="comment-textarea"
                value={comment_body}
                // onBlur={() => }
                // onBlur={()=> {setErrors([]); setComment_body(null)}}
                onChange={(e) => {setComment_body(e.target.value); setCommentButtonDisabled(false); setCommentButtonStyle(commentButtonStyleOff)}}
                placeholder='Add a Comment...'
                maxLength={1000}
                ></textarea>
                <button className="comment-post-button" style={commentButtonStyle} disabled={commentButtonDisabled} type="submit">Post</button>
            </form>
        </>
    )
}
