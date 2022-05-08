import React, { useEffect, useState } from 'react';
import PostView from '../views/PostView';
import NavBar from '../views/NavBar';
import Router from 'next/router';
import { useCookies } from 'react-cookie';
import { BsPlusLg } from 'react-icons/bs';
import * as cookie from 'cookie';
import { PostsDataBase, TokenSTG, UsersDataBase } from '../DataBase/DB_Objects';
import { NextPageContext } from 'next';
import { RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { like, setPosts } from '../store/slices/FeedSlice';
import PostViewState from '../models/postviewstate';

interface FeedProps {
    userId: number,
    posts: PostViewState[],
}

function Feed(props: FeedProps) {
    const { posts, newPostView } = useSelector((state: RootState) => state.feed)
    const dispatch = useDispatch()
    const [cookies, setCookie, removeCookie] = useCookies(['access_token']);

    const logOut = () => {
        removeCookie('access_token');
        Router.push('/login');
    };

    const onPressedLikeButton = (id: number) => {
        dispatch(like({ id: id, userId: props.userId }))
        fetch('/api/like-event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                post_id: id,
                user_id: props.userId,
                access_token: cookies.access_token
            })
        });
    };

    const newPost = () => {
        // setNewPostWindow(true);
    };

    useEffect(() => {
        dispatch(setPosts(props.posts))
    }, [])


    return (
        <div className='feed_wrapper'>
            <button className='new_post_button'>
                <BsPlusLg className='new_post_icon' />
            </button>
            <div className="feed">
                <NavBar auth={true} logOut={logOut} newPost={newPost} />
                <div className="feed_posts">
                    {posts.map((post) => {
                        return (
                            <PostView
                                key={post.id}
                                id={post.id}
                                text={post.text}
                                username={post.username}
                                content={post.content}
                                likedUsers={post.likedUsers}
                                userPic={post.userPic}
                                onPressedLikeButton={onPressedLikeButton}
                                userId={props.userId}
                                postUserId={post.userId}
                                likesCounter={post.likesCounter}
                                liked={post.liked}
                            />
                        )
                    })}
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

    if (!response.user || !response.stat) {
        return {
            redirect: {
                permanent: false,
                destination: "/login"
            },
            props: {}
        }
    }
    const postViewStates: PostViewState[] = []
    const posts = await PostsDataBase.getPosts()
    posts.forEach(async post => {
        delete post._id
    });
    for (const post of posts) {
        const user = await UsersDataBase.getUser(post.user_id)
        if (!user) continue
        postViewStates.push({ userPic: user.picture_url, username: user.username, id: post.id, text: post.text, content: post.content, userId: post.user_id, likedUsers: post.like_users, likesCounter: post.like_users.length, liked: post.like_users.includes(response.user.id) })
    }
    // console.log(body.posts[0])

    return {
        props: {
            userId: response.user?.id,
            posts: postViewStates
        }
    };
}

export default Feed;
