import EditPostForm from "../editPostForm/editPostForm";
import CommentForm from "../commentForm.js/commentForm";
import CommentSection from "../comment-section/feedComments";
import { NavLink } from "react-router-dom";
import defaultUserImage from '../UserProfile/user (1).png'
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import { thunkGetAllPosts, thunkDeletePost} from "../../store/posts";
import { thunkGetAllComments} from "../../store/comments";
import './allposts.css'
import NavBar from "../NavBar/NavBar";
import Modal from "react-modal";
import LikeForm from "./LikeForm";
import fullHeart from "../AllPosts/heart.png"

export default function SinglePost({post}){
    const dispatch = useDispatch();
    const [clickedPost, setClickedPost] = useState(null)
    const [postOptions, setPostOptions] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    const [showHeart, setShowHeart] = useState(true)

    const sessionUserId = useSelector(state => state.session?.user?.id)

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
        <div key={post.id} className="indv-post">
                <div className="userInfo-div">
                    <img className="profile-pic" src={post.userInfo.profile_pic === null ? defaultUserImage : post.userInfo.profile_pic}></img>
                    <div className="username-location">
                        <NavLink style={{textDecoration: 'none', color: 'black'}} to={`/users/${post.userInfo.id}`}>
                            <h4 className="username-allposts-at-top">{post.userInfo.username}</h4>
                        </NavLink>
                        <p className="post-location">{post.location}</p>
                    </div>
                    {post.user_id === sessionUserId && (
                    <button className="post-options-btn" onClick={()=> {setPostOptions(true); setClickedPost(post)}}>...</button>
                    )}
                </div>
                <Modal portalClassName="post-modal-options" isOpen={postOptions} style={customStyles} theme={{colors: {backdrop: "transparent"}}}>
                    {/* <button className="unfollow-fromfeed">Unfollow</button>
                    <button className="go-to-post-fromfeed">Go to Post</button> */}
                    <button onClick={() => {setShowEditForm(true); closePostOptions()}}>Edit Your Post</button>
                    <button onClick={()=> {dispatch(thunkDeletePost(clickedPost?.id)); setPostOptions(false)}}>Delete Your Post</button>
                    <button onClick={() => setPostOptions(false)}>Cancel</button>
                </Modal>
                <Modal isOpen={showEditForm} style={editPostStyling}>
                    <EditPostForm closeEditForm={closeEditForm} postId={clickedPost?.id} closePostOptions={closePostOptions}/>
                </Modal>
                {/* {  (<img className="heart" src={fullHeart}></img>)} */}
                <img className="feed-photo" src={post.photo} alt="a mescroll post" onDoubleClick={() => setShowHeart(true)}></img>
                <LikeForm post={post} ></LikeForm>
                <div className="username-caption-div">
                    <NavLink style={{textDecoration: 'none', color: 'black'}} to={`/users/${post.userInfo.id}`}>
                        <p className="username-next-to-caption">{post.userInfo.username}</p>
                    </NavLink>
                    <p className="indv-caption">{post.caption}</p>
                </div>
                <br></br>
                <span></span>
                <CommentSection currentPost={post}/>
                <CommentForm currentPost={post}/>
            </div>
        </>
    )
}
