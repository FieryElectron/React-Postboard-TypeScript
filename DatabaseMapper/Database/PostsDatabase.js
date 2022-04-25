const sqlite = require('better-sqlite3');

module.exports = class PostsDatabase{
    constructor(DataBaseName, TableName) {
        this.DataBaseName = DataBaseName;
        this.TableName = TableName;
        this.db = new sqlite(this.DataBaseName);
    }

    DropTableIfExists(){
        const DropTable = this.db.prepare(`DROP TABLE IF EXISTS ${this.TableName}`);
        return DropTable.run();
    }

    GetAllTables(){
        const GetAllTables = this.db.prepare("select name from sqlite_master where type='table' AND name!='sqlite_sequence'");
        return GetAllTables.all();
    }

    CreateTableIfNotExists(){
        const CreateTable = this.db.prepare('CREATE TABLE IF NOT EXISTS '+this.TableName+' (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, content TEXT NOT NULL, timestamp INTEGER NOT NULL)');
        return CreateTable.run();
    }

    Insert(username, content, timestamp){
        const Insert = this.db.prepare(`INSERT INTO ${this.TableName} (username, content, timestamp) VALUES (?,?,?)`);
        return Insert.run(username, content, timestamp);
    }

    Update(id, username, content, timestamp){
        const UpdateById = this.db.prepare(`UPDATE ${this.TableName} SET username =? , content =? , timestamp =? WHERE id =?`);
        return UpdateById.run(username, content, timestamp, id);
    }

    Get(id){
        const GetById = this.db.prepare(`SELECT * FROM ${this.TableName} WHERE id =?`);
        return GetById.get(id);
    }

    Delete(id){
        const DeleteById = this.db.prepare(`DELETE FROM ${this.TableName} WHERE id =?`);
        return DeleteById.run(id);
    }

    GetAll(){
        const GetAll = this.db.prepare(`SELECT * FROM ${this.TableName}`);
        return GetAll.all();
    }

    RunRawAll(statement){
        return this.db.prepare(statement).all();
    }

}