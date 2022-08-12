import React, { useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllComments, thunkCreateComment, thunkUpdateComment, thunkDeleteComment } from "../../store/comments";
import { thunkGetAllPosts } from "../../store/posts";
import ReactModal from "react-modal";
import '../commentForm.js/commentForm.css'



export default function CommentSection({currentPost}){
    const dispatch = useDispatch()
    const userId = useSelector(state => state.session?.user?.id)
    const allComments = useSelector(state => Object.values(state.commentReducer))
    const singlePostComments = allComments.filter(comment => comment.post_id === currentPost.id)

    const [comment_body, setComment_body] = useState('')
    const [currentComment, setCurrentComment ] = useState('');
    const [showCommentOptions, setShowCommentOptions] = useState(false);
    const [showEditComment, setShowEditComment] = useState(false);
    const [updatedComment, setUpdatedComment] = useState('');
    const [showEditForm, setShowEditForm] = useState(false);

    const [submitted, setHasSubmitted]= useState(false);


    function closeEditForm(){
        setShowEditForm(false)
    }

    function updateComment(){


        const editedComment = {
            user_id: userId,
            post_id: currentComment.post_id,
            id: currentComment.id,
            comment_body: updatedComment
        }

        dispatch(thunkUpdateComment(editedComment))
    }

    const onDelete = async (e) => {

        await dispatch(thunkDeleteComment(currentComment.id))
              .then(dispatch(thunkGetAllComments()))
        // dispatch(thunkGetAllPosts())

        setShowCommentOptions(false)
    }

    const commentOptionStyles = {
        overlay: {
            background: 'rgba(0,0,0,0.1)'
          },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        }
    }

    return (
        <>
         <div className='comment-section'>
                    {/* <p>Comments:</p> */}
                    {singlePostComments.map(comment => {
                            return <div className="one-comment-div">
                                <NavLink to={`/users/${comment.user.id}`}>
                                    <p className="comment-username">{comment.user.username} </p>
                                </NavLink>
                            <p className="comment_body">{comment.comment_body}</p>
                            {showEditComment && currentComment.id == comment.id && (
                                <textarea
                                className="edit-comment-textarea"
                                value={undefined}
                                onChange={(e) => setUpdatedComment(e.target.value)}
                                >
                                {comment.comment_body}
                                </textarea>
                            )}
                            {comment.user_id == userId && (
                            <>
                            { showEditComment === false && (
                            <button className="comment-options-btn" onClick={() => { setCurrentComment(comment); setShowCommentOptions(true) } }>...</button>
                            )}
                            { showEditComment && currentComment.id == comment.id && (
                            <div className="update-comment-btns">
                                <button className="update-comment" onClick={() => {setShowEditComment(false); updateComment()}}>Update Comment</button>
                                <button className="cancel-comment-update" onClick={() => setShowEditComment(false)}>Cancel</button>
                            </div>
                            )}
                            <ReactModal isOpen={showCommentOptions} style={commentOptionStyles}>
                                <button onClick={() => {setShowEditComment(true); setShowCommentOptions(false)}}>Edit</button>
                                <button onClick={() => onDelete()}>Delete Comment</button>
                                <button onClick={() => setShowCommentOptions(false)}>Cancel</button>
                            </ReactModal>
                            </>
                            )}
                            </div>
                    }
                    )}
                </div>
                    {/* { showEditComment && ( <EditCommentForm currentComment={currentComment}/> )} */}
        </>
    )
}
