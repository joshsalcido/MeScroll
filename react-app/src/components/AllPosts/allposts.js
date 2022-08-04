import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react";
import LoginForm from "../auth/LoginForm"
import { thunkGetAllPosts } from "../../store/posts";
import './allposts.css'
import LogoutButton from "../auth/LogoutButton";


export default function AllPosts(){
    const dispatch = useDispatch();
    const allPosts = useSelector(state => Object.values(state.postReducer))
    console.log(allPosts, "ALLPOSTS!!!");

    useEffect(()=> {
        dispatch(thunkGetAllPosts())
    }, [dispatch])

    return (
        <>
        <LogoutButton/>
        <div className="center-feed-div">
            {allPosts.map((post) =>
            <>
            <div className="indv-post">
                <p>{post.location}</p>
                <img className='feed-photo' src={post.photo}></img>
                <p>{post.caption}</p>
                <br></br>
            </div>
            </>)}
        </div>
        </>
    )
}

