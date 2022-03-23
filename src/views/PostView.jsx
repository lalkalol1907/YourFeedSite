import Avatar from '@material-ui/core/Avatar'
import { RiHeartFill, RiShareForwardLine } from "react-icons/ri"
import { Component } from 'react'
// TODO: Сменить иконки, потому что выглядят плохо 

class PostView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            liked: false,
            likes_count: 0
        }
        this.USER_ID = this.props.USER_ID
        this.like_users = this.props.like_users
        this.username = this.props.username
        this.user_pic = this.props.user_pic
        this.content = this.props.content
        this.text = this.props.text
        this.id = this.props.id
        this.OnLikePressed = this.OnLikePressed.bind(this)
    }

    componentDidMount() {
        var liked = this.like_users.includes(this.USER_ID)
        this.setState({ liked: liked, likes_count: this.like_users.length })
    }

    OnLikePressed() {
        this.props.like_button(this.id)
        var diff = 0
        if (this.like_users.includes(this.USER_ID)) {
            for (let i = 0; i < this.like_users.length; i++) {
                if (this.like_users[i] === this.USER_ID) {
                    this.like_users.splice(i, 1)
                    break
                }
            }
            diff = -1
        } else {
            this.like_users.push(this.USER_ID)
            diff = 1
        }
        this.setState({ liked: !this.state.liked, likes_count: this.state.likes_count + diff })
    }

    OnSendPressed() {

    }

    render() {
        var LikeIcon = this.state.liked ? <RiHeartFill className='w-6 h-auto fill-red-500 px-5 group-hover:fill-red-400' /> : <RiHeartFill className='w-6 h-auto fill-bottom-icon-color px-5 group-hover:fill-red-400' />
        var LikeSvgClass = this.state.liked ? "group bg-red-300 border-solid border border-red-500 rounded-full mb-2 ml-2 hover:bg-red-200 hover:border-red-400 hover:cursor-pointer" : "group bg-bottom-icon-bg-color border-solid border border-bottom-icon-border-color rounded-full mb-2 ml-2 hover:bg-red-100 hover:border-red-400 hover:cursor-pointer"

        return (
            <div className="grid items-center max-w-xl border-solid border border-gray-200 rounded-2xl mb-9">
                <div className="flex items-center py-1 px-2.5">
                    <Avatar className='mr-2.5' src={this.user_pic} />
                    <h3 className='text-base font-bold'>{this.username}</h3>
                </div>
                <div>
                    <img src={this.content} alt="content" className="w-full object-contain" />
                </div>
                <div className='px-1.5 py-1 my-0'>
                    <h4 className='m-0 text-sm font-bold'>Likes: {this.state.likes_count}</h4>
                </div>
                <div className='flex items-center px-1.5'>
                    <h4 className='text-sm font-normal mt-0'><strong className='text-sm pr-1'>{this.username}:</strong>{this.text}</h4>
                </div>
                <div className='flex items-center'>
                    <button onClick={this.OnLikePressed} className={LikeSvgClass}>
                        {LikeIcon}
                    </button>
                    <div className='flex-1' />
                    <button onClick={this.OnSendPressed} className="group bg-bottom-icon-bg-color border-solid border border-bottom-icon-border-color rounded-full mb-2 mr-2 hover:cursor-pointer hover:bg-cyan-100 hover:border-cyan-300">
                        <RiShareForwardLine className="w-6 h-auto fill-bottom-icon-color px-5 group-hover:fill-cyan-400" />
                    </button>
                </div>
            </div>
        )
    }
}

export default PostView;