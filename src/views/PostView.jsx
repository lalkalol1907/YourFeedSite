import Avatar from '@material-ui/core/Avatar'
import { RiHeartFill, RiShareForwardLine } from "react-icons/ri"
import { Component } from 'react'
// TODO: Сменить иконки, потому что выглядят плохо 

class PostView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            liked: false,
            likesCounter: 0
        }
        this.userId = this.props.userId
        this.likedUsers = this.props.likedUsers
        this.username = this.props.username
        this.userPic = this.props.userPic
        this.content = this.props.content
        this.text = this.props.text
        this.id = this.props.id
        this.onLikePressed = this.onLikePressed.bind(this)
    }

    componentDidMount() {
        var liked = this.likedUsers.includes(this.userId)
        this.setState({ liked: liked, likesCounter: this.likedUsers.length })
    }

    onLikePressed() {
        this.props.onPressedLikeButton(this.id)
        var diff = 0
        if (this.likedUsers.includes(this.userId)) {
            for (let i = 0; i < this.likedUsers.length; i++) {
                if (this.likedUsers[i] === this.userId) {
                    this.likedUsers.splice(i, 1)
                    break
                }
            }
            diff = -1
        } else {
            this.likedUsers.push(this.userId)
            diff = 1
        }
        this.setState({ liked: !this.state.liked, likesCounter: this.state.likesCounter + diff })
    }

    onSendPressed() {

    }

    render() {
        var LikeIcon = this.state.liked ? <RiHeartFill className='w-6 h-auto fill-red-500 px-5 group-hover:fill-red-400' /> : <RiHeartFill className='w-6 h-auto fill-bottom-icon-color px-5 group-hover:fill-red-400' />
        var LikeSvgClass = this.state.liked ? "group bg-red-300 border-solid border border-red-500 rounded-full mb-2 ml-2 hover:bg-red-200 hover:border-red-400 hover:cursor-pointer" : "group bg-gray-100 border-solid border border-bottom-icon-border-color rounded-full mb-2 ml-2 hover:bg-red-100 hover:border-red-400 hover:cursor-pointer"

        return (
            <div className="grid items-center max-w-xl border-solid border border-gray-200 rounded-2xl mb-9">
                <div className="flex items-center py-1 px-2.5 group hover:cursor-pointer">
                    <Avatar className='mr-2.5' src={this.userPic} />
                    <h3 className='text-base font-bold hover:underline'>{this.username}</h3>
                </div>
                <div>
                    <img src={this.content} alt="content" className="w-full object-contain" />
                </div>
                <div className='px-1.5 py-1 my-0'>
                    <h4 className='m-0 text-sm font-bold'>Likes: {this.state.likesCounter}</h4>
                </div>
                <div className='flex items-center px-1.5'>
                    <h4 className='text-sm font-normal mt-0'><strong className='text-sm pr-1'>{this.username}:</strong>{this.text}</h4>
                </div>
                <div className='flex items-center'>
                    <button onClick={this.onLikePressed} className={LikeSvgClass}>
                        {LikeIcon}
                    </button>
                    <div className='flex-1' />
                    <button onClick={this.onSendPressed} className="group bg-gray-100 border-solid border border-bottom-icon-border-color rounded-full mb-2 mr-2 hover:cursor-pointer hover:bg-fuchsia-100 hover:border-fuchsia-400">
                        <RiShareForwardLine className="w-6 h-auto fill-bottom-icon-color px-5 group-hover:fill-fuchsia-400" />
                    </button>
                </div>
            </div>
        )
    }
}

export default PostView;