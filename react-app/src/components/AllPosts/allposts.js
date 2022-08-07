import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import LoginForm from "../auth/LoginForm"
import { thunkGetAllPosts } from "../../store/posts";
import { thunkGetAllComments, thunkDeleteComment} from "../../store/comments";
import './allposts.css'
import LogoutButton from "../auth/LogoutButton";
import NavBar from "../NavBar/NavBar";
import Modal from "react-modal";
import PostForm from "../createPostForm/createPostForm";
import EditPostForm from "../editPostForm/editPostForm";
import CommentForm from "../commentForm.js/commentForm";
import ReactModal from "react-modal";



export default function AllPosts(){
    const dispatch = useDispatch();
    const allPosts = useSelector(state => Object.values(state.postReducer))
    const userId = useSelector(state => state.session?.user?.id)


    Modal.setAppElement('body')

    const [postOptions, setPostOptions] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [currentComment, setCurrentComment ] = useState('');
    const [showCommentOptions, setShowCommentOptions] = useState(false);

    const [comment_body, setComment_body] = useState('')

    function openPostOptions () {
        setPostOptions(true)
    }
    function closePostOptions () {
        setPostOptions(false)
    }
    function closeEditForm (){
        setShowEditForm(false)
    }
    function onDelete (){

        dispatch(thunkDeleteComment(currentComment.id))
        dispatch(thunkGetAllPosts())

        setShowCommentOptions(false)
    }


    useEffect(()=> {
        dispatch(thunkGetAllPosts())
        dispatch(thunkGetAllComments())
    }, [dispatch])

    console.log(allPosts, "AllPOST PAGE")
    return (
        <>
        <NavBar/>
        {/* <LogoutButton/> */}
        <div className="center-feed-div">
            {allPosts.map((post) =>
            <>
            <div key={post.id} className="indv-post">
                <h4>{post.userInfo.username} --- </h4>
                <span></span>
                <p> {post.location}</p>
                <span>
                    <button className="post-options-btn" onClick={()=> setPostOptions(true)}>...</button>
                    <Modal portalClassName="post-options-Modal" isOpen={postOptions}  transparent={true}>
                        <button className="unfollow-fromfeed">Unfollow</button>
                        <button className="go-to-post-fromfeed">Go to Post</button>
                        {showEditForm && (<EditPostForm closeEditForm={closeEditForm} postId={post.id}/>)}
                        <button className="cancel-options-btn" onClick={() => setPostOptions(false)}>Cancel</button>
                    </Modal>
                </span>
                <img className="feed-photo" src={post.photo}></img>
                <p>{post.caption}</p>
                <br></br>
                <span></span>
                <div className='comment-section'>
                    <p>Comments:</p>
                    {post.comments.map(comment =>
                        <>
                        <div>{comment.comment_body}</div>
                        {comment.user_id == userId && (
                        <>
                        <button onClick={() => { setCurrentComment(comment); setShowCommentOptions(true) } }>...</button>
                        <ReactModal isOpen={showCommentOptions}>
                            <button onClick={() => onDelete()}>Delete Comment</button>
                            <button onClick={() => setShowCommentOptions(false)}>Cancel</button>
                        </ReactModal>
                        </>
                        )}
                        <span>----------------</span>
                        </>
                    )}
                </div>
            <CommentForm currentPost={post}/>
            </div>
            </>)}
        </div>
        </>
    )
}
