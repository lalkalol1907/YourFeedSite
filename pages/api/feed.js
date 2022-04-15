const { PostsDataBase, UsersDataBase, TokenSTG } = require('../../DB_Objects');

export default (req, res) => {
    console.log(req)
    PostsDataBase.getPosts(res)
}