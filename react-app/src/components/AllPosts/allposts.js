import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import LoginForm from "../auth/LoginForm"
import { thunkGetAllPosts, thunkDeletePost } from "../../store/posts";
import './allposts.css'
import LogoutButton from "../auth/LogoutButton";
import NavBar from "../NavBar/NavBar";
import Modal from "react-modal";



export default function AllPosts(){
    const dispatch = useDispatch();
    const allPosts = useSelector(state => Object.values(state.postReducer))
    console.log(allPosts, "ALLPOSTS!!!");
    Modal.setAppElement('body')

    const [postOptions, setPostOptions] = useState(false);

    // const onDelete = () => {
        //     dispatch(thunkDeletePost())
        // }

        function openPostOptions () {
            setPostOptions(true)
        }
        function closePostOptions () {
            setPostOptions(false)
    }

    useEffect(()=> {
        dispatch(thunkGetAllPosts())
    }, [dispatch])


    return (
        <>
        <NavBar/>
        {/* <LogoutButton/> */}
        <div className="center-feed-div">
            {allPosts.map((post) =>
            <>
            <div className="indv-post">
                <p>{post.location}</p>
                <span>
                    <button className="post-options-btn" onClick={()=> setPostOptions(true)}>...</button>
                    <Modal portalClassName="post-options-Modal" isOpen={postOptions}  transparent={true}>
                        <button className="delete-post-btn" onClick={()=> {dispatch(thunkDeletePost(post.id)); setPostOptions(false)}}>Delete</button>
                        <button className="cancel-options-btn" onClick={() => setPostOptions(false)}>Cancel</button>
                    </Modal>
                </span>
                <img className="feed-photo" src={post.photo}></img>
                <p>{post.caption}</p>
                <br></br>
            </div>
            </>)}
        </div>
        </>
    )
}
