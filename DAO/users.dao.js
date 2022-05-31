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

    async getIdEvents(id){
        const [results] = await global.connection.promise().query("SELECT * from events where owner_id = ?",[id])
        return results
    }

    async getIdEventsFuture(id,date){
        const [results] = await global.connection.promise().query("SELECT * from events where owner_id = ? AND eventStart_date > ?",[id,date])
        return results
    }

    async getIdEventsFinished(id,date){
        const [results] = await global.connection.promise().query("SELECT * from events where owner_id = ? AND eventEnd_date < ?",[id,date])
        return results
    }
    async getIdEventsCurrent(id,date){
        const [results] = await global.connection.promise().query("SELECT * from events where (eventStart_date = ? OR eventEnd_date = ? ) AND owner_id = ? ",[date,date,id])
        return results
    }
    async searchUser(s) {
        const [results] = await global.connection.promise().query("SELECT * from ?? where name = ? or last_name = ? or email = ?", [this.tabla,s,s,s])
        return results
    }
    
    async avgScore(id){
        const [results] = await global.connection.promise().query("SELECT avg(puntuation) from assistance where user_id = ?", [id])
        return results
        
    }

    async getFriendsIds(id){
        const usersIds = []
        const [results] = await global.connection.promise().query("SELECT user_id_friend FROM friends WHERE user_id = ? AND status = 1", [id])
        for (let i=0; i<results.length; i++){
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

    async getEventsIds(id){
        const usersIds = []
        const [results] = await global.connection.promise().query("SELECT event_id FROM assistance WHERE user_id = ?", [id])
        let l=0;
        for (let i of results){
            usersIds[l] = i.event_id
            l++
        }
        return usersIds   
    }

    async getEventsAssistance(ids){
        const results = []
        var events = []
        for(let i=0; i < ids.length; i++){
            results[i] = await global.connection.promise().query("SELECT * FROM events WHERE id = ?", [ids[i]])
            
            events.push(results[i][0])
        }
            return events
    }

    async getEventsAssistanceFuture(ids,date){
        const results = []
        var events = []
        for(let i=0; i < ids.length; i++){
            results[i] = await global.connection.promise().query("SELECT * FROM events WHERE id = ? AND eventStart_date > ?", [ids[i],date])
            
            events.push(results[i][0])
        }
            return events
    }

    async getEventsAssistanceFinished(ids,date){
        const results = []
        var events = []
        for(let i=0; i < ids.length; i++){
            results[i] = await global.connection.promise().query("SELECT * FROM events WHERE id = ? AND eventEnd_date < ?", [ids[i],date])
            
            events.push(results[i][0])
        }
            return events
    }

    async numComents(id){
        const [results] = await global.connection.promise().query("SELECT count(comentary) from assistance where user_id = ?", [id])
        return results
    }
    async updateUser(info,user) {
        let name,last_name,email,password,image
        
        if(info.name === undefined){
            name = user.name
        }else{
            name = info.name
        }

        if(info.last_name === undefined){
            last_name = user.last_name
        }else{
            last_name = info.last_name
        }

        if(info.email === undefined){
            email = user.email
        }else{
            email = info.email
        }

        if(info.password === undefined){
            password = user.password
        }else{
            password = info.password
        }

        if(info.image === undefined){
            image = user.image
        }else{
            image = info.image
        }
        
        const [results] = await global.connection.promise().query("UPDATE ??  SET name = ? ,last_name = ? ,email = ? ,password = ?, image = ? WHERE id = ?", [this.tabla,name,last_name,email,password,image,user.id])
        return results
    }

    async deleteUser(userId){
        await global.connection.promise().query("DELETE FROM ?? where id = ?", [this.tabla,userId])
       
    }


}

module.exports = UsersDAO