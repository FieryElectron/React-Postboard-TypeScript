const sqlite = require('better-sqlite3');

module.exports = class UsersDatabase{
    constructor(DataBaseName, TableName) {
        this.DataBaseName = DataBaseName;
        this.TableName = TableName;
        this.db = new sqlite(this.DataBaseName);
    }

    CreateTableIfNotExists(){
        const CreateTable = this.db.prepare('CREATE TABLE IF NOT EXISTS '+this.TableName+' (username TEXT PRIMARY KEY NOT NULL, password TEXT NOT NULL, description TEXT NOT NULL)');
        return CreateTable.run();
    }

    DropTableIfExists(){
        const DropTable = this.db.prepare(`DROP TABLE IF EXISTS ${this.TableName}`);
        return DropTable.run();
    }

    GetAllTables(){
        const GetAllTables = this.db.prepare("select name from sqlite_master where type='table' AND name!='sqlite_sequence'");
        return GetAllTables.all();
    }

    Insert(username, password, description){
        const Insert = this.db.prepare(`INSERT INTO ${this.TableName} (username, password, description) VALUES (?,?,?)`);

        try{
            const res = Insert.run(username, password, description);
            return res;
        }catch(e){
            return {exception: e.message};
        }
    }

    Update(username, password, description){
        const UpdateByUsername = this.db.prepare(`UPDATE ${this.TableName} SET password=? , description=? WHERE username=?`);
        return UpdateByUsername.run(password, description, username);
    }

    Get(username){
        const GetByUsername = this.db.prepare(`SELECT * FROM ${this.TableName} WHERE username =?`);
        return GetByUsername.get(username);
    }

    Delete(username){
        const DeleteByUsername = this.db.prepare(`DELETE FROM ${this.TableName} WHERE username =?`);
        return DeleteByUsername.run(username);
    }

    GetAll(){
        const GetAll = this.db.prepare(`SELECT * FROM ${this.TableName}`);
        return GetAll.all();
    }

    // RunRawAll(statement){
    //     return this.db.prepare(statement).all();
    // }

}