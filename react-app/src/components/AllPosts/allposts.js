import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";
// import LoginForm from "../auth/LoginForm"
import { thunkGetAllPosts } from "../../store/posts";
import { thunkGetAllComments, thunkDeleteComment, thunkUpdateComment} from "../../store/comments";
import './allposts.css'
// import LogoutButton from "../auth/LogoutButton";
import NavBar from "../NavBar/NavBar";
import Modal from "react-modal";
// import PostForm from "../createPostForm/createPostForm";
import EditPostForm from "../editPostForm/editPostForm";
import CommentForm from "../commentForm.js/commentForm";
// import ReactModal from "react-modal";
// import EditCommentForm from "../commentForm.js/editComment";
import CommentSection from "../comment-section/feedComments";


Modal.setAppElement('body')

export default function AllPosts(){
    const dispatch = useDispatch();
    const allPosts = useSelector(state => Object.values(state.postReducer)).reverse()
    // const userId = useSelector(state => state.session?.user?.id)



    // console.log(allPosts[1].comments.map(comment => comment.comment_body), "ALLPOSTS") //.comments.map(comment => comment.comment_body)
    // console.log(allComments.filter(comment => comment.post_id == 2).map(comment => comment.comment_body), "ALLCOMMENTS")

    const [postOptions, setPostOptions] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);


    const [comment_body, setComment_body] = useState('')

    // const post = useSelector(state => state.postReducer[postId])
    const [updatedComment, setUpdatedComment] = useState('')
    // const [photo, setPhoto] = useState(`${post.photo}`);
    // const [caption, setCaption] = useState(`${post.caption}`);
    // const [location, setLocation] = useState(`${post.location}`);

    function openPostOptions(){
        setPostOptions(true)
    }
    function closePostOptions(){
        setPostOptions(false)
    }
    function closeEditForm(){
        setShowEditForm(false)
    }

    useEffect(()=> {
        dispatch(thunkGetAllPosts())
        dispatch(thunkGetAllComments())
    }, [dispatch])

    const customStyles = {
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
                    <Modal portalClassName="post-modal-options" isOpen={postOptions} style={customStyles}>
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
                <CommentSection currentPost={post}/>
                <CommentForm currentPost={post}/>
            </div>
            </>)}
        </div>
        </>
    )
}
