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
    postUserId: number
    likesCounter: number
    liked: boolean
    onPressedLikeButton: (id: number) => void
}

function PostView(props: PostViewProps) {

    const mediaProvider = new MediaProvider()

    const userId = props.userId
    // const content = mediaProvider.getContent(props.content)

    const onLikePressed = () => {
        props.onPressedLikeButton(props.id)
    }

    const onSendPressed = () => {

    }

    return (
        <div className="post">
            <div className="post_topbar">
                {/* upload/profiles/ */}
                <Avatar className='post_avatar' src={props.userPic} />
                <h3>{props.username}</h3>
            </div>
            <div>
                {/* <img src={content} alt="content" className="post_pic" /> */}
            </div>
            <div className='post_likes'>
                <h4>Likes: {props.likesCounter}</h4>
            </div>
            <div className='post_text'>
                <h4><strong>{props.username}:</strong>{props.text}</h4>
            </div>
            <div className='post_bottom_bar'>
                <button onClick={onLikePressed} className={props.liked ? "like_button_pressed" : "like_button"}>
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