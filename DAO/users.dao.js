const { json } = require("express/lib/response")
const GenericDAO = require("./generic.dao")

class UsersDAO extends GenericDAO{

    constructor(){
        super("users")
    }

    async getAllUsers() {
        const [results] = await global.connection.promise().query("SELECT id,name,last_name,email,image FROM ??", [this.tabla])
        return results
    }
    
    async insertUser(user) {
        const [results] = await global.connection.promise().query("INSERT INTO ?? (name,last_name,email,password,image) VALUES (? ,?, ?, ?, ?)", [this.tabla,user.name,user.last_name,user.email,user.password,user.image])
        return user 
    }

    async searchUser(s) {
        const [results] = await global.connection.promise().query("SELECT * from ?? where name = ? or last_name = ? or email = ?", [this.tabla,s,s,s])
        return results
    }
    async updateUser(user) {
        const [results] = await global.connection.promise().query("UPDATE ??  SET email = ? ,password = ? ,nombre = ? ,edad = ? WHERE id = ?", [this.tabla,user.email,user.password,user.nombre,user.edad,id])
        return results 
    }


}

module.exports = UsersDAO