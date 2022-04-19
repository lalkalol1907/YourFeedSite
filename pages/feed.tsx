import React, { useState, useEffect } from 'react';
import PostView from '../views/PostView';
import NavBar from '../views/NavBar';
import ClipLoader from 'react-spinners/ClipLoader';
import Router from 'next/router';
import Post from '../models/post';
import { useCookies } from 'react-cookie';
import { BsPlusLg } from 'react-icons/bs';
import * as cookie from 'cookie';
import { PostsDataBase, TokenSTG } from '../DataBase/DB_Objects';
import { NextPageContext } from 'next';

interface FeedProps {
    userId: number,
    posts: Post[]
}

function Feed(props: FeedProps) {
    const [posts, setPosts] = useState<Post[]>(props.posts || []);
    const [userId, setUserId] = useState(props.userId || 0);
    const [newPostWindow, setNewPostWindow] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
    const [buttonClosed, setButtonClosed] = useState(false);

    const wrapperRefButton = React.createRef<HTMLButtonElement>();

    const logOut = () => {
        removeCookie('access_token');
        Router.push('/login');
    };

    const onPressedLikeButton = (id: number) => {
        fetch('/api/like-event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                post_id: id,
                user_id: userId,
                access_token: cookies.access_token
            })
        });
    };

    const newPost = () => {
        setNewPostWindow(true);
    };

    useEffect(
        () => {
            const wrapper = wrapperRefButton.current;
            if (wrapper) {
                wrapper.classList.toggle('closed');
            }
        },
        [buttonClosed]
    );

    return (
        <div className='feed_wrapper'>
            <button className='new_post_button'>
                <BsPlusLg className='new_post_icon' />
            </button>
            <div className="feed">
                <NavBar auth={true} logOut={logOut} newPost={newPost} />
                <div className="feed_posts">
                    {posts.map((post) => (
                        <PostView
                            key={post.id}
                            id={post.id}
                            text={post.text}
                            username={post.username}
                            content={post.content}
                            user_pic={post.user_pic}
                            likedUsers={post.like_users}
                            onPressedLikeButton={onPressedLikeButton}
                            userId={userId}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context: NextPageContext) {
    var access_token = cookie.parse(context.req ? context.req.headers.cookie || '' : document.cookie).access_token;

    if (!access_token) {
        return {
            redirect: {
                permanent: false,
                destination: "/login"
            },
            props: {}
        };
    }

    const response = TokenSTG.authToken(access_token)
    
    if (!response.stat) {
        return {
            redirect: {
                permanent: false,
                destination: "/login"
            },
            props: {}
        }
    }

    const posts = await PostsDataBase.getPosts()


    posts.forEach((post) => {
        delete post._id;
    })


    return {
        props: {
            userId: response.user?.id,
            posts: posts
        }
    };
}

export default Feed;
