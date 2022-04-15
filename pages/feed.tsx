import React, { useState, useEffect } from 'react'
import PostView from '../views/PostView';
import NavBar from '../views/NavBar'
import ClipLoader from "react-spinners/ClipLoader";
import Cookies from 'js-cookie';
import Router from 'next/router';
import Post from '../models/post';

function Feed() {

    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState<Post[]>([])
    const [auth, setAuth] = useState(false)
    const [userId, setUserId] = useState(0)

    const fetchPosts = () => {
        fetch('/api/feed').then(response => {
            response.json().then(body => {
                if (response.status === 200) {
                    setLoading(false)
                    setPosts(body.posts)
                }
            })
        });
    };

    const logOut = () => {
        Cookies.set('access_token', '')
        setAuth(false)
        setUserId(0)
        setPosts([])
        Router.push('/login')
    }

    const onPressedLikeButton = (id: number) => {
        fetch('/api/like-event', {
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
        fetch('/api/is_authenticated', {
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
                    Router.push('/login')
                }
            })
        })
    }, []);

    return (
        <div className='feed'>
            <NavBar auth={auth} logOut={logOut} />
            {!loading && auth &&
                <div className='feed_posts'>
                    {posts.map(post => (
                        <PostView key={post.id} id={post.id} text={post.text} username={post.username} content={post.content} user_pic={post.user_pic} likedUsers={post.like_users} onPressedLikeButton={onPressedLikeButton} userId={userId} />
                    ))}
                </div>
            }
            {(loading || !auth) &&
                <div className='clip_loader'>
                    <ClipLoader />
                </div>
            }
        </div>
    )
}

export default Feed;