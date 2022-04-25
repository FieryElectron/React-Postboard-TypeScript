const UsersDatabase = require('./Database/UsersDatabase');
const User = require('../Classes/User');

module.exports = class UsersMapper{
    constructor(DataBaseName, TableName) {
        this.DataBaseName = DataBaseName;
        this.TableName = TableName;
        this.db = new UsersDatabase(this.DataBaseName, this.TableName );
    }

    create(user){
        this.db.CreateTableIfNotExists();
        return this.db.Insert(user.username, user.password, user.description);
    }

    update(user){
        this.db.CreateTableIfNotExists();
        return this.db.Update(user.username, user.password, user.description);
    }

    get(user){
        this.db.CreateTableIfNotExists();
        const res = this.db.Get(user.username);
        if(res == null){
            return null;
        }
        return new User(res.username, res.password, res.description);
    }

    getAll(){
        this.db.CreateTableIfNotExists();
        return this.db.GetAll(this.TableName);
    }

    delete(user){
        this.db.CreateTableIfNotExists();
        return this.db.Delete(user.username);
    }

    cleanTable(){
        this.db.DropTableIfExists();
        this.db.CreateTableIfNotExists();
    }

    getAllTables(){
        return this.db.GetAllTables();
    }

    // getByCondition(field, operator, value){
    //     return this.db.RunRawAll(`SELECT * FROM ${this.TableName} WHERE `+field+" "+operator+" "+value);
    // }
}