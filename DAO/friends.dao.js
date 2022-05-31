const res = require("express/lib/response")
const { json } = require("express/lib/response")
const GenericDAO = require("./generic.dao")

class FriendsDAO extends GenericDAO{

    constructor(){
        super("friends")
    }

    async sendFriendship(idU,idE) {
        const [results] = await global.connection.promise().query("INSERT INTO ?? (user_id,user_id_friend,status) VALUES ( ?, ?, 0)", [this.tabla, idU, idE])

        return results;
    }

    async acceptFriendship(idU,idE) {
        const [results] = await global.connection.promise().query("UPDATE ?? SET status = 1 WHERE user_id_friend = ? AND user_id = ?", [this.tabla, idE, idU])

        return results;
    }

    async getAllRequests(idU) {
        const [results] = await global.connection.promise().query("SELECT * from ?? WHERE user_id = ?", [this.tabla, idU])
        return results;
    }

    async getRequestsUsers(id){
        const usersIds = []
        const [results] = await global.connection.promise().query("SELECT * FROM ?? WHERE user_id = ? AND status = 0", [this.tabla, id])
        let l=0;
       for (let i of results){
           usersIds[l] = i.user_id_friend
           l++
       }
       return usersIds
        
    }

    async getRequests(users){
        const results = []
        var usuaris = []
        for(let i=0; i < users.length; i++){
            results[i] = await global.connection.promise().query("SELECT id,name,last_name,email,image FROM users WHERE id = ?", [users[i]])
            
            usuaris.push(results[i][0])
        }
            return usuaris
    }

    async getFriendsUsers(id){
        const usersIds = []
        const [results] = await global.connection.promise().query("SELECT * FROM ?? WHERE user_id = ? AND status = 1", [this.tabla, id])
        let l=0;
        
       for (let i=0; i < results.length; i++){
           usersIds[i] = results[i].user_id_friend
       }
       return usersIds
        
    }

    async getFriends(users){
        const results = []
        var usuaris = []
        for(let i=0; i < users.length; i++){
            results[i] = await global.connection.promise().query("SELECT id,name,last_name,email,image FROM users WHERE id = ?", [users[i]])
            
            usuaris.push(results[i][0])
        }
            return usuaris
    }

    async deleteRequest(idU,idE){
        const results = await global.connection.promise().query("DELETE FROM ?? WHERE user_id= ? AND user_id_friend = ?", [this.tabla,idU,idE])
        return results
    }



}    
    
    
    module.exports = FriendsDAO