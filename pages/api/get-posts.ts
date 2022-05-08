import { NextApiRequest, NextApiResponse } from "next";
import { PostsDataBase, UsersDataBase } from "../../DataBase/DB_Objects";
import PostViewState from "../../models/postviewstate";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const postViewStates: PostViewState[] = []
    const userId = req.body.userId
    const posts = await PostsDataBase.getPosts()
    posts.forEach(async post => {
        delete post._id
    });
    for (const post of posts) {
        const user = await UsersDataBase.getUser(post.user_id)
        if (!user) continue
        postViewStates.push({ userPic: user.picture_url, username: user.username, id: post.id, text: post.text, content: post.content, userId: post.user_id, likedUsers: post.like_users, likesCounter: post.like_users.length, liked: post.like_users.includes(userId) })
    }
    res.send({posts: postViewStates})
}