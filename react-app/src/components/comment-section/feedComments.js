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

    const [correctCounter, setCorrectCounter] = useState(currentComment.comment_body);
    const [limitReached, setLimitReached] = useState(false);
    const [emptyComment, setEmptyComment] = useState(false);
    const [checkError, setCheckError] = useState(false);

    const [disableComment, setDisableComment] = useState(false);
    const [disableStyle, setDisableStyle] = useState(null);

    const [submitted, setHasSubmitted]= useState(false);


    function closeEditForm(){
        setShowEditForm(false)
    }

    async function updateComment(){


        const editedComment = {
            user_id: userId,
            post_id: currentComment.post_id,
            id: currentComment.id,
            comment_body: updatedComment
        }
        const data = await dispatch(thunkUpdateComment(editedComment))
        if (data) {
            setEmptyComment(true)
        } else {
            setLimitReached(false)
            setShowEditComment(false)
        }


    }

    const onDelete = async (e) => {

        await dispatch(thunkDeleteComment(currentComment.id))
              .then(dispatch(thunkGetAllComments()))
        // dispatch(thunkGetAllPosts())

        setShowCommentOptions(false)
    }

    useEffect(()=> {

        if (updatedComment.length === 1000) {
            setLimitReached(true);
        } else {
            setLimitReached(false)
        }
        if (checkError) {
            if (updatedComment.trim().length === 0) {
                setEmptyComment(true)
                setDisableComment(true)
                setDisableStyle({backgroundColor: '#ffdddd'})
            } else {
                setEmptyComment(false)
                setDisableComment(false)
                setDisableStyle(null)
            }
        } else {
            return
        }

    }, [updatedComment])

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
                            return <div key={comment.id} className="one-comment-div">
                                <NavLink style={{textDecoration: 'none', color: 'black'}} to={`/users/${comment.user.id}`}>
                                    <p className="comment-username">{comment.user.username} </p>
                                </NavLink>
                            <p className="comment_body">{comment.comment_body}</p>
                            {showEditComment && currentComment.id == comment.id && (
                                <textarea
                                required
                                className="edit-comment-textarea"
                                maxLength={1000}
                                value={undefined}
                                onClick={()=> {setCheckError(true)}}
                                onFocus={()=> {setCheckError(true)}}
                                onChange={(e) => {setUpdatedComment(e.target.value); setCheckError(true)}}
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
                                <>
                                <div className="update-comment-btns">
                                    <button className="update-comment" style={disableStyle} disabled={disableComment} onClick={() => {updateComment(); } }>Update Comment</button>
                                    <button className="cancel-comment-update" onClick={() => {setShowEditComment(false); setEmptyComment(false); setDisableComment(false); setDisableStyle(null)}}>Cancel</button>
                                </div>
                                    {limitReached && (<p className="edit-comment-length-reached" style={{ color: 'red' }}>1000 Character limit reached</p>)}
                                    { emptyComment && (<p className="edit-comment-length-reached" >Can't Submit empty comment, please enter text</p>)}
                                </>
                            )}
                            <ReactModal isOpen={showCommentOptions} style={commentOptionStyles}>
                                <button onClick={() => {setShowEditComment(true); setShowCommentOptions(false)}}>Edit Comment</button>
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
