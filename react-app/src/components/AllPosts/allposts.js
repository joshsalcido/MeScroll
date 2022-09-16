import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import { thunkGetAllPosts, thunkDeletePost} from "../../store/posts";
import { thunkGetAllComments} from "../../store/comments";
import './allposts.css'
import NavBar from "../NavBar/NavBar";
import Modal from "react-modal";



import LikeForm from "./LikeForm";
import SinglePost from "./IndvPostOnFeed";


Modal.setAppElement('body')

export default function AllPosts(){
    const dispatch = useDispatch();
    const allPosts = useSelector(state => Object.values(state.postReducer)).reverse()
    const sessionUserId = useSelector(state => state.session?.user?.id)

    // console.log(sessionUserId, "sessionUSerID")
    // console.log(allPosts, "allPosts")
    const [clickedPost, setClickedPost] = useState(null)
    const [postOptions, setPostOptions] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);


    // const [comment_body, setComment_body] = useState('')

    // const [updatedComment, setUpdatedComment] = useState('')


    // function openPostOptions(){
    //     setPostOptions(true)
    // }



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
            <SinglePost post={post}></SinglePost>
            </>)}
        </div>
        </>
    )
}
