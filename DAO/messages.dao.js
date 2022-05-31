const res = require("express/lib/response")
const { json } = require("express/lib/response")
const GenericDAO = require("./generic.dao")

class MessagesDAO extends GenericDAO{
    
    constructor(){
        super("message")
    }

    async insertMessage(info,date){
        await global.connection.promise().query("INSERT INTO ?? (content,user_id_send,user_id_recived,timeStamp) values ( ?, ?, ?, ?)", [this.tabla,info.content,info.user_id_send,info.user_id_recived,date])
         
    }

    async getMessageUsers(id){
        const usersIds = []
        const [results] = await global.connection.promise().query("SELECT * FROM ?? WHERE user_id_recived = ?", [this.tabla, id])
        let l=0;
        for (let i of results){
            usersIds[l] = i.user_id_send
            l++
        }
        return usersIds   
    }

    async getMessages(users){
        const results = []
        var usuaris = []
        for(let i=0; i < users.length; i++){
            results[i] = await global.connection.promise().query("SELECT id,name,last_name,email,image FROM users WHERE id = ?", [users[i]])
            
            usuaris.push(results[i][0])
        }
            return usuaris
    }

    async getUsersMessages(userIds){
        const results = []
        for(let i=0; i<userIds.length; i++){
            results[i] = await global.connection.promise().query("SELECT * FROM users WHERE id = ?", [userIds[i]])
        }
        return results
    }

    async searchMessagesId(AId,Eid){
        const [results] = await global.connection.promise().query("SELECT * FROM ?? WHERE user_id_recived = ? AND user_id_send = ?", [this.tabla, AId, Eid])
        return results
    }

}    
 
module.exports = MessagesDAO