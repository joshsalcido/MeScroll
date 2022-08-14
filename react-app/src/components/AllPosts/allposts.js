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
import { NavLink } from "react-router-dom";


Modal.setAppElement('body')

export default function AllPosts(){
    const dispatch = useDispatch();
    const allPosts = useSelector(state => Object.values(state.postReducer)).reverse()
    const sessionUserId = useSelector(state => state.session?.user?.id)

    console.log(sessionUserId, "sessionUSerID")
    console.log(allPosts, "allPosts")
    const [clickedPost, setClickedPost] = useState(null)
    const [postOptions, setPostOptions] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);


    const [comment_body, setComment_body] = useState('')

    const [updatedComment, setUpdatedComment] = useState('')


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
        overlay: {
            background: 'rgba(0,0,0,0.01)'
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
    const editPostStyling = {
        overlay: {
          background: 'rgba(0,0,0,0.02)'
        },
        content: {
            padding: '0px',
            height: '43.5rem',
            width: '63.8rem',
            margin: 'auto',
            borderRadius: '20px',
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
                <div className="userInfo-div">
                    <img className="profile-pic" src={post.userInfo.profile_pic}></img>
                    <div className="username-location">
                        <NavLink to={`/users/${post.userInfo.id}`}>
                            <h4 className="username">{post.userInfo.username}</h4>
                        </NavLink>
                        <p className="post-location">{post.location}</p>
                    </div>
                </div>
                <span>
                    {post.user_id === sessionUserId && (
                    <button className="post-options-btn" onClick={()=> {setPostOptions(true); setClickedPost(post)}}>...</button>
                    )}
                    <Modal portalClassName="post-modal-options" isOpen={postOptions} style={customStyles} theme={{colors: {backdrop: "transparent"}}}>
                        {/* <button className="unfollow-fromfeed">Unfollow</button>
                        <button className="go-to-post-fromfeed">Go to Post</button> */}
                        <button onClick={() => {setShowEditForm(true); closePostOptions()}}>Edit Your Post</button>
                        <button>Delete Your Post</button>
                        <button className="cancel-options-btn" onClick={() => setPostOptions(false)}>Cancel</button>
                    </Modal>
                    <Modal isOpen={showEditForm} style={editPostStyling}>
                        <EditPostForm closeEditForm={closeEditForm} postId={clickedPost?.id} closePostOptions={closePostOptions}/>
                    </Modal>
                </span>
                <img className="feed-photo" src={post.photo}></img>
                <div className="username-caption-div">
                    <p className="username-next-to-caption">{post.userInfo.username}
                    <p className="indv-caption">{post.caption}</p>
                    </p>
                </div>
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
