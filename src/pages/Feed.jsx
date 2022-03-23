import React, { Component } from 'react'
import PostView from '../views/PostView';
import NavBar from '../views/NavBar'
import ClipLoader from "react-spinners/ClipLoader";
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';

class Feed extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            updater: false,
            data: "feed",
            posts: [],
            auth: false,
            should_redirect: false
        }
        this.user_id = 0
        this.like_button = this.like_button.bind(this)
    }

    init() {
        fetch('/feed').then(response => {
            response.json().then(body => {
                if (response.status === 200) {
                    this.setState({...this.state, loading: false, data: body.message, posts: body.posts})
                }
            })
        });  
    };

    componentDidMount() {
        document.title = "Feed"
        var access_token = Cookies.get('access_token')
        fetch('/is_authenticated', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                access_token: access_token
            })
        }).then(response => {
            response.json().then(body => {
                if (body.stat) {
                    this.user_id = body.user.id
                    this.setState({ ...this.state, auth: true })
                    this.init()
                } else {
                    this.setState({ ...this.state, should_redirect: true })
                }
            })
        })
    }

    like_button(id) {
        fetch('/like-event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                post_id: id,
                user_id: this.user_id,
                access_token: Cookies.get('access_token')
            })
        })
    }

    render() {
        return (
            <div className={'min-h-screen flex flex-col items-center m-0 p'}>
                {this.state.should_redirect &&
                    <Redirect to="/login" />
                }
                <NavBar />
                {!this.state.loading && this.state.auth &&
                    <div className="flex flex-col items-center">
                        {this.state.posts.map(post => (
                            <PostView toggler={this.toggler} id={post.id} text={post.text} likes_count={post.like_users.length} username={post.username} content={post.content} user_pic={post.user_pic} like_users={post.like_users} like_button={this.like_button} USER_ID={this.user_id} />
                        ))}
                    </div>
                }
                {(this.state.loading || !this.state.auth) &&
                    <div className='my-5 mx-0'>
                        <ClipLoader />
                    </div>
                }
            </div>
        )
    }
}

export default Feed;