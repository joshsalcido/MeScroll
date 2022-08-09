import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllComments, thunkCreateComment, thunkUpdateComment, thunkDeleteComment } from "../../store/comments";
import { thunkGetAllPosts } from "../../store/posts";
import ReactModal from "react-modal";



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

    // console.log(currentPost.id, 'ComentForm')
    // console.log(allComments, "commentReducer")
    // console.log(singlePostComments[0]?.comment_body, "singlePostComments")

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


    return (
        <>
         <div className='comment-section'>
                    <p>Comments:</p>
                    {singlePostComments.map(comment => {
                            return <div>
                            <p>{comment.comment_body}</p>
                            {showEditComment && currentComment.id == comment.id && (
                                <textarea
                                value={undefined}
                                onChange={(e) => setUpdatedComment(e.target.value)}
                                >
                                {comment.comment_body}
                                </textarea>
                            )}
                            {comment.user_id == userId && (
                            <>
                            { showEditComment === false && (
                            <button onClick={() => { setCurrentComment(comment); setShowCommentOptions(true) } }>...</button>
                            )}
                            { showEditComment && currentComment.id == comment.id && (
                            <>
                            <button onClick={() => {setShowEditComment(false); updateComment()}}>Update Comment</button>
                            <button onClick={() => setShowEditComment(false)}>Cancel</button>
                            </>
                            )}
                            <ReactModal isOpen={showCommentOptions}>
                                <button onClick={() => {setShowEditComment(true); setShowCommentOptions(false)}}>Edit</button>
                                <button onClick={() => onDelete()}>Delete Comment</button>
                                <button onClick={() => setShowCommentOptions(false)}>Cancel</button>
                            </ReactModal>
                            </>
                            )}
                            <span>----------------</span>
                            </div>
                    }
                    )}
                </div>
                    {/* { showEditComment && ( <EditCommentForm currentComment={currentComment}/> )} */}
        </>
    )
}
