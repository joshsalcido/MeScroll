import './allposts.css'
import heartOutlined from '../AllPosts/heartOutline.png'
import heartFilled from '../AllPosts/heartFull.png'
import commentImg from '../AllPosts/chat.png'
import { useDispatch, useSelector } from 'react-redux';
import { thunkCreateLike } from '../../store/posts';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function LikeForm({post}){
    const dispatch = useDispatch();
    const sessionUserId = useSelector(state => state.session?.user?.id)
    const postId = post.id
    const currentPost = post
    const [heartImg, setHeartImg] = useState(heartOutlined)
    const userIdLikesArray = currentPost?.likes_userIds
    const likesInfo = currentPost?.post_likes
    const firstLiker = likesInfo[0]


    const handleSubmit = async (e) => {
        e.preventDefault();

        await dispatch(thunkCreateLike(currentPost))

            if ( userIdLikesArray.includes(sessionUserId)) {
                setHeartImg(heartOutlined)
            } else {
                setHeartImg(heartFilled)
            }

    }
    useEffect(() => {
            if (userIdLikesArray.includes(sessionUserId)) {
                setHeartImg(heartFilled)
            } else {
                setHeartImg(heartOutlined)
            }
    }, [currentPost, dispatch])

    console.log(likesInfo, "LASTLIKER")
    return (
        <>
        <form onSubmit={handleSubmit} className="like-comment-form" >
            <div className="like-comment-buttons-div">
                <button type='submit' className='heartButton'>
                    <img className="heart-img" src={heartImg}></img>
                </button>
                { (userIdLikesArray.length > 0) && (<p className='likedBy'>Liked by <NavLink style={{textDecoration: 'none', color: 'black'}} to={`/users/${firstLiker?.id}`}><strong>{firstLiker?.username}</strong></NavLink> {userIdLikesArray.length > 1 && (<span>and others</span>)}</p>)}
                {/* <button type='button' className="comment-button">
                    <img className="comment-img" src={commentImg}></img>
                </button> */}
            </div>
        </form>
        </>
    )
}
