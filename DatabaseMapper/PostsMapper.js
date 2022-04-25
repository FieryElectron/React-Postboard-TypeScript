const PostsDatabase = require('./Database/PostsDatabase');
const Post = require('../Classes/Post');

module.exports = class PostsMapper{
    constructor(DataBaseName, TableName) {
        this.DataBaseName = DataBaseName;
        this.TableName = TableName;
        this.db = new PostsDatabase(this.DataBaseName, this.TableName );
    }

    create(post){
        this.db.CreateTableIfNotExists();
        return this.db.Insert(post.username, post.content, post.timestamp);
    }

    update(post){
        this.db.CreateTableIfNotExists();
        return this.db.Update(post.id, post.username, post.content, post.timestamp);
    }

    get(post){
        this.db.CreateTableIfNotExists();
        const res = this.db.Get(post.id);
        if(res == null){
            return null;
        }
        return new Post(res.id, res.username, res.content, res.timestamp);
    }

    getAll(){
        this.db.CreateTableIfNotExists();
        return this.db.GetAll(this.TableName);
    }

    delete(post){
        this.db.CreateTableIfNotExists();
        return this.db.Delete(post.id);
    }

    cleanTable(){
        this.db.DropTableIfExists();
        this.db.CreateTableIfNotExists();
    }

    getAllTables(){
        return this.db.GetAllTables();
    }

    getByCondition(field, operator, value){
        this.db.CreateTableIfNotExists();
        return this.db.RunRawAll(`SELECT * FROM ${this.TableName} WHERE `+field+" "+operator+" "+value);
    }

    getByDoubleCondition(field, operator, value, field1, operator1, value1){
        this.db.CreateTableIfNotExists();
        return this.db.RunRawAll(`SELECT * FROM ${this.TableName} WHERE `+field+" "+operator+" "+value+" AND "+field1+" "+operator1+" "+value1);
    }
}