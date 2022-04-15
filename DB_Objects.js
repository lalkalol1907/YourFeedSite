import PostsDB from "./DataBase/PostsDB";
import UsersDB from "./DataBase/UsersDB";
import TokenStorage from "./DataBase/token_storage";

var UsersDataBase = new UsersDB()
var PostsDataBase = new PostsDB()
var TokenSTG = new TokenStorage()

module.exports = {
    UsersDataBase, PostsDataBase, TokenSTG
}