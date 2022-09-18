import './allposts.css'
import heartOutlined from '../AllPosts/heartOutline.png'
import heartFilled from '../AllPosts/heartFull.png'
import commentImg from '../AllPosts/chat.png'
import { useDispatch, useSelector } from 'react-redux';
import { thunkCreateLike } from '../../store/posts';
import { useEffect, useState } from 'react';

export default function LikeForm({post}){
    const dispatch = useDispatch();
    const sessionUserId = useSelector(state => state.session?.user?.id)
    const postId = post.id
    const currentPost = post
    const [likeHeart, setLikeHeart] = useState(heartOutlined)

    const likeOrNot = () => {
       let arr = currentPost.post_likes
       arr.forEach(like => {
        if (like.id === sessionUserId) {
            setLikeHeart(heartOutlined)
        } else {
            setLikeHeart(heartFilled)
        }
       });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("submitting like", currentPost)

        await dispatch(thunkCreateLike(currentPost))

        let arr = currentPost.post_likes
        // if (arr.length === 0) return setLikeHeart(heartFilled)
        for (let i = 0; i < arr.length; i++) {
            console.log(arr[i].id, "like.id", sessionUserId, "sessionUserId")
            if (arr[i].id === sessionUserId) {
                setLikeHeart(heartOutlined)
                break;
            } else {
                setLikeHeart(heartFilled)
            }
        }
    }
    useEffect(() => {
        let arr = currentPost.post_likes
        for (let i = 0; i < arr.length; i++) {
            console.log(arr[i].id, "like.id", sessionUserId, "sessionUserId")
            if (arr[i].id === sessionUserId) {
                setLikeHeart(heartOutlined)
                break;
            } else {
                setLikeHeart(heartFilled)
            }
        }
    }, [currentPost, dispatch])

    return (
        <>
        <form onSubmit={handleSubmit} className="like-comment-form" >
            <div className="like-comment-buttons-div">
                <button type='submit' className='heartButton'>
                    <img className="heart-img" src={likeHeart}></img>
                </button>
                <button type='button' className="comment-button">
                    <img className="comment-img" src={commentImg}></img>
                </button>
            </div>
        </form>
        </>
    )
}
