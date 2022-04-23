import { Avatar } from '@mui/material';
import { RiHeartFill, RiShareForwardLine } from "react-icons/ri"
import { useEffect, useState } from 'react'
import MediaProvider from '../DataBase/MediaProvider';
// TODO: Сменить иконки, потому что выглядят плохо 

interface PostViewProps {
    userId: number // global user
    content: string
    text: string
    id: number
    likedUsers: number[]
    username: string
    userPic: string
    onPressedLikeButton: (id: number) => void
}

function PostView(props: PostViewProps) {

    const [liked, setLiked] = useState(props.likedUsers.includes(props.userId))
    const [likesCounter, setLikesCounter] = useState(props.likedUsers.length)
    const [likedUsers, setLikedUsers] = useState(props.likedUsers)

    const mediaProvider = new MediaProvider()

    const userId = props.userId
    const content = mediaProvider.getContent(props.content)
    const text = props.text
    const id = props.id
    const username = props.username
    const userPic = props.userPic

    const onLikePressed = () => {
        var likedUsersLocal = likedUsers
        props.onPressedLikeButton(id)
        var diff = 0
        if (likedUsersLocal.includes(userId)) {
            for (let i = 0; i < likedUsersLocal.length; i++) {
                if (likedUsersLocal[i] === userId) {
                    likedUsersLocal.splice(i, 1)
                    break
                }
            }
            diff = -1
        } else {
            likedUsersLocal.push(userId)
            diff = 1
        }
        setLikedUsers(likedUsersLocal)
        setLiked(!liked)
        setLikesCounter(likesCounter + diff)
    }

    const onSendPressed = () => {

    }

    return (
        <div className="post">
            <div className="post_topbar">
                {/* upload/profiles/ */}
                <Avatar className='post_avatar' src={userPic} />
                <h3>{username}</h3>
            </div>
            <div>
                <img src={content} alt="content" className="post_pic" />
            </div>
            <div className='post_likes'>
                <h4>Likes: {likesCounter}</h4>
            </div>
            <div className='post_text'>
                <h4><strong>{username}:</strong>{text}</h4>
            </div>
            <div className='post_bottom_bar'>
                <button onClick={onLikePressed} className={liked ? "like_button_pressed" : "like_button"}>
                    <RiHeartFill />
                </button>
                <div className='spacer' />
                <button onClick={onSendPressed} className="send_button">
                    <RiShareForwardLine />
                </button>
            </div>
        </div>
    )
}

export default PostView;