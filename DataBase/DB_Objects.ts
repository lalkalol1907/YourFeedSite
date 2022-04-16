import PostsDB from "./PostsDB";
import UsersDB from "./UsersDB";
import TokenStorage from "./token_storage";

var UsersDataBase = new UsersDB()
var PostsDataBase = new PostsDB()
var TokenSTG = new TokenStorage()

export {
    UsersDataBase, PostsDataBase, TokenSTG
}