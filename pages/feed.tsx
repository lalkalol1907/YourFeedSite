import React, { useState, useEffect } from 'react';
import PostView from '../views/PostView';
import NavBar from '../views/NavBar';
import ClipLoader from 'react-spinners/ClipLoader';
import Router from 'next/router';
import Post from '../models/post';
import { useCookies } from 'react-cookie';
import { BsPlusLg } from 'react-icons/bs';
import * as cookie from 'cookie';
import { PostsDataBase, TokenSTG, UsersDataBase } from '../DataBase/DB_Objects';
import { NextPageContext } from 'next';
import User from '../models/user';

interface FeedProps {
    userId: number,
    posts: Post[],
    // userDatas: { [id: number]: User }
}

function Feed(props: FeedProps) {
    const [posts, setPosts] = useState<Post[]>(props.posts || []);
    // const [userDatas, setUserDatas] = useState<{ [id: number]: User }>(props.userDatas)
    const [userId, setUserId] = useState(props.userId || 0);
    const [newPostWindow, setNewPostWindow] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['access_token']);

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
                            // username={userDatas[post.user_id]?.username || ""}
                            content={post.content}
                            likedUsers={post.like_users}
                            // user_pic={userDatas[post.user_id]?.picture_url || ""}
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
    // const userDatas:{ [id: number]: User } = {}

    posts.forEach((post) => {
        delete post._id;
    })

    // for (let i = 0; i < posts.length; i++) {
    //     if (!userDatas[posts[i].user_id]) {
    //         const res = await UsersDataBase.getUser(posts[i].user_id)
    //         if (!res) {
    //             continue
    //         }
    //         userDatas[posts[i].user_id] = res
    //     }
    // }


    return {
        props: {
            userId: response.user?.id,
            posts: posts,
            // userDatas: userDatas
        }
    };
}

export default Feed;
