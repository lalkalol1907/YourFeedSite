import Avatar from '@material-ui/core/Avatar'
import { RiHeartFill, RiShareForwardLine } from "react-icons/ri"
import { Component, useEffect, useState } from 'react'
// TODO: Сменить иконки, потому что выглядят плохо 

function PostView(props) {

    const [liked, setLiked] = useState(props.likedUsers.includes(props.userId))
    const [likesCounter, setLikesCounter] = useState(props.likedUsers.length)
    const [likedUsers, setLikedUsers] = useState(props.likedUsers)

    const userId = props.userId
    const username = props.username
    const user_pic = props.user_pic
    const content = props.content
    const text = props.text
    const id = props.id

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
        <div className="grid items-center max-w-xl border-solid border border-gray-200 rounded-2xl mb-9">
            <div className="flex items-center py-1 px-2.5 group hover:cursor-pointer">
                <Avatar className='mr-2.5' src={user_pic} />
                <h3 className='text-base font-bold hover:underline'>{username}</h3>
            </div>
            <div>
                <img src={content} alt="content" className="w-full object-contain" />
            </div>
            <div className='px-1.5 py-1 my-0'>
                <h4 className='m-0 text-sm font-bold'>Likes: {likesCounter}</h4>
            </div>
            <div className='flex items-center px-1.5'>
                <h4 className='text-sm font-normal mt-0'><strong className='text-sm pr-1'>{username}:</strong>{text}</h4>
            </div>
            <div className='flex items-center'>
                <button onClick={onLikePressed} className={liked ? "group bg-red-300 border-solid border border-red-500 rounded-full mb-2 ml-2 hover:bg-red-200 hover:border-red-400 hover:cursor-pointer" : "group bg-gray-100 border-solid border border-bottom-icon-border-color rounded-full mb-2 ml-2 hover:bg-red-100 hover:border-red-400 hover:cursor-pointer"}>
                    <RiHeartFill className={liked ? 'w-6 h-auto fill-red-500 px-5 group-hover:fill-red-400' : 'w-6 h-auto fill-bottom-icon-color px-5 group-hover:fill-red-400'} />
                </button>
                <div className='flex-1' />
                <button onClick={onSendPressed} className="group bg-gray-100 border-solid border border-bottom-icon-border-color rounded-full mb-2 mr-2 hover:cursor-pointer hover:bg-fuchsia-100 hover:border-fuchsia-400">
                    <RiShareForwardLine className="w-6 h-auto fill-bottom-icon-color px-5 group-hover:fill-fuchsia-400" />
                </button>
            </div>
        </div>
    )
}

export default PostView;