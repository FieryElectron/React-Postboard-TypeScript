const UsersMapper = require('../DatabaseMapper/UsersMapper');
const User = require('../Classes/User');

module.exports = class UserService{
    static DataBaseName = "db.sqlite";
    static TableName = "UsersTable";
    static usersMapper = new UsersMapper(this.DataBaseName, this.TableName);

    static GetAllUsers(){
        return this.usersMapper.getAll();
    }

    static CreateUser(user){
        const res = this.usersMapper.create(user);
        if(!res.exception){
            return {flag:true};
        }else{
            if(res.exception.indexOf('UNIQUE constraint failed') == 0){
                return {flag:false, info:"User Exists"};
            }else{
                return {flag:false, info:"Failed"};
            }
        }
    }

    static UpdateUser(user){
        const res = this.usersMapper.update(user);
        if(res.changes){
            return {flag:true};
        }else{
            return {flag:false};
        }
    }

    static GetUser(user){
        const taruser = this.usersMapper.get(user);

        if(taruser){
            return {flag:true, user:taruser};
        }else{
            return {flag:false};
        }
    }

    static DeleteUser(user){
        const res = this.usersMapper.delete(user);

        if(res.changes){
            return {flag:true};
        }else{
            return {flag:false};
        }
    }

    static DeleteAllUsers(){
        this.usersMapper.cleanTable();
    }

    static GetAllTables(){
        return this.usersMapper.getAllTables()
    }
}
