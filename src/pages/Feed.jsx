import React, { useState, useEffect } from 'react'
import PostView from '../views/PostView';
import NavBar from '../views/NavBar'
import ClipLoader from "react-spinners/ClipLoader";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'

function Feed(props) {

    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState([])
    const [auth, setAuth] = useState(false)
    const [userId, setUserId] = useState(0)
    const navigate = useNavigate()

    const fetchPosts = () => {
        fetch('/feed').then(response => {
            response.json().then(body => {
                if (response.status === 200) {
                    setLoading(false)
                    setPosts(body.posts)
                }
            })
        });
    };

    const onPressedLikeButton = (id) => {
        fetch('/like-event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                post_id: id,
                user_id: userId,
                access_token: Cookies.get('access_token')
            })
        })
    }

    useEffect(() => {
        document.title = "Feed"
        var cleintToken = Cookies.get('access_token')
        fetch('/is_authenticated', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                access_token: cleintToken
            })
        }).then(response => {
            response.json().then(body => {
                if (body.stat) {
                    setUserId(body.user.id)
                    setAuth(true)
                    fetchPosts()
                } else {
                    navigate('/login')
                }
            })
        })
    });

    return (
        <div className={'min-h-screen flex flex-col items-center m-0 p bg-gray-100'}>
            <NavBar auth={auth} />
            {!loading && auth &&
                <div className="flex flex-col items-center">
                    {posts.map(post => (
                        <PostView key={post.id} id={post.id} text={post.text} username={post.username} content={post.content} user_pic={post.user_pic} likedUsers={post.like_users} onPressedLikeButton={onPressedLikeButton} userId={userId} />
                    ))}
                </div>
            }
            {(loading || !auth) &&
                <div className='my-5 mx-0'>
                    <ClipLoader />
                </div>
            }
        </div>
    )
}

export default Feed;