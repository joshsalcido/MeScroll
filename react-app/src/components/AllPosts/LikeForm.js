import './allposts.css'
import heartOutlined from '../AllPosts/heartOutline.png'
import heartFilled from '../AllPosts/heartFull.png'
import commentImg from '../AllPosts/chat.png'
import { useDispatch, useSelector } from 'react-redux';
import { thunkCreateLike } from '../../store/posts';

export default function LikeForm({post}){
    const dispatch = useDispatch();
    const sessionUserId = useSelector(state => state.session?.user?.id)
    const postId = post.id
    const currentPost = post


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("submitting like", currentPost)

        await dispatch(thunkCreateLike(currentPost))
    }

    return (
        <>
        <form onSubmit={handleSubmit} className="like-comment-form" >
            <div className="like-comment-buttons-div">
                <button type='submit' className='heartButton'>
                    <img className="heart-img" src={heartOutlined}></img>
                </button>
                <button disabled className="comment-button">
                    <img className="comment-img" src={commentImg}></img>
                </button>
            </div>
        </form>
        </>
    )
}
