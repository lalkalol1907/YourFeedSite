import React, { useState, useEffect } from 'react';
import PostView from '../views/PostView';
import NavBar from '../views/NavBar';
import ClipLoader from 'react-spinners/ClipLoader';
import Router from 'next/router';
import Post from '../models/post';
import { useCookies } from 'react-cookie';

function Feed() {
	const [ loading, setLoading ] = useState(true);
	const [ posts, setPosts ] = useState<Post[]>([]);
	const [ auth, setAuth ] = useState(false);
	const [ userId, setUserId ] = useState(0);
	const [ newPostWindow, setNewPostWindow ] = useState(false);
	const [ cookies, setCookie, removeCookie ] = useCookies([ 'access_token' ]);
	const [ buttonClosed, setButtonClosed ] = useState(false);

	const wrapperRefButton = React.createRef<HTMLButtonElement>();

	const fetchPosts = () => {
		fetch('/api/feed').then((response) => {
			response.json().then((body) => {
				if (response.status === 200) {
					setLoading(false);
					setPosts(body.posts);
				}
			});
		});
	};

	const logOut = () => {
		removeCookie('access_token');
		setAuth(false);
		setUserId(0);
		setPosts([]);
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

	useEffect(() => {
		document.title = 'Feed';
		var cleintToken = cookies.access_token;
		fetch('/api/is_authenticated', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				access_token: cleintToken
			})
		}).then((response) => {
			response.json().then((body) => {
				if (body.stat) {
					setUserId(body.user.id);
					setAuth(true);
					fetchPosts();
				} else {
					Router.push('/login');
				}
			});
		});
	}, []);

	useEffect(
		() => {
			const wrapper = wrapperRefButton.current;
			if (wrapper) {
				wrapper.classList.toggle('closed');
			}
		},
		[ buttonClosed ]
	);

    // TODO: switch to react-icon
	return (
        <div className='feed_wrapper'>
            <button className='new_post_button'>+</button> 
		<div className="feed">
			<NavBar auth={auth} logOut={logOut} newPost={newPost} />
			{!loading &&
			auth && (
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
			)}
			{(loading || !auth) && (
				<div className="clip_loader">
					<ClipLoader />
				</div>
			)}
		</div>
        </div>
	);
}

export default Feed;
