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


    useEffect(()=> {
        dispatch(thunkGetAllPosts())
        dispatch(thunkGetAllComments())
    }, [dispatch])
    

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
