const PostsMapper = require('../DatabaseMapper/PostsMapper');
const Post = require('../Classes/Post');

module.exports = class PostService{
    static DataBaseName = "db.sqlite";
    static TableName = "PostsTable";
    static postsMapper = new PostsMapper(this.DataBaseName, this.TableName);

    static GetAllPosts(){
        return this.postsMapper.getAll();
    }

    static CreatePost(post){
        const res = this.postsMapper.create(post);
        if(res.changes){
            return {flag:true};
        }else{
            return {flag:false};
        }
    }

    static UpdatePost(post){
        const res = this.postsMapper.update(post);
        if(res.changes){
            return {flag:true};
        }else{
            return {flag:false};
        }
    }

    static GetPost(post){
        const tarpost = this.postsMapper.get(post);
        if(tarpost){
            return {flag:true, post:tarpost};
        }else{
            return {flag:false};
        }
    }

    static DeletePost(post){
        const res = this.postsMapper.delete(post);
        if(res.changes){
            return {flag:true};
        }else{
            return {flag:false};
        }
    }

    static GetByCondition(field, operator, value){
        return this.postsMapper.getByCondition(field, operator, value);
    }

    static GetByDoubleCondition(field, operator, value, field1, operator1, value1){
        return this.postsMapper.getByDoubleCondition(field, operator, value, field1, operator1, value1);
    }

    static DeleteAllPosts(){
        this.postsMapper.cleanTable();
    }

    static GetAllTables(){
        return this.postsMapper.getAllTables()
    }
}







//postsMapper.cleanTable();

//console.log(postsMapper.getAll());




//console.log(postsMapper.getAllTables());