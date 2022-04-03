import React, { Component } from 'react'
import PostView from '../views/PostView';
import NavBar from '../views/NavBar'
import ClipLoader from "react-spinners/ClipLoader";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'

class FeedComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loadingState: true,
            posts: [],
            authState: false,
        }
        this.userId = this.props.USER_ID
        this.onPressedLikeButton = this.onPressedLikeButton.bind(this)
        this.fetchPosts = this.fetchPosts.bind(this)
        this.navigate = this.props.navigate
    }

    fetchPosts() {
        fetch('/feed').then(response => {
            response.json().then(body => {
                if (response.status === 200) {
                    this.setState(prevState => ({ ...prevState, loadingState: false, posts: body.posts }))
                }
            })
        });
    };

    componentDidMount() {
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
                    this.userId = body.user.id
                    this.setState(prevState => ({ ...prevState, authState: true }))
                    this.fetchPosts()
                } else {
                    this.navigate('/login')
                }
            })
        })
    }

    onPressedLikeButton(id) {
        fetch('/like-event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                post_id: id,
                user_id: this.userId,
                access_token: Cookies.get('access_token')
            })
        })
    }

    render() {
        return (
            <div className={'min-h-screen flex flex-col items-center m-0 p bg-gray-100'}>
                <NavBar auth={this.state.authState} />
                {!this.state.loadingState && this.state.authState &&
                    <div className="flex flex-col items-center">
                        {this.state.posts.map(post => (
                            <PostView key={post.id} id={post.id} text={post.text} username={post.username} content={post.content} userPic={post.user_pic} likedUsers={post.like_users} onPressedLikeButton={this.onPressedLikeButton} userId={this.userId} />
                        ))}
                    </div>
                }
                {(this.state.loadingState || !this.state.authState) &&
                    <div className='my-5 mx-0'>
                        <ClipLoader />
                    </div>
                }
            </div>
        )
    }
}

function Feed(props) {
    let navigate = useNavigate()
    return (<FeedComponent {...props} navigate={navigate} />)
}

export default Feed;