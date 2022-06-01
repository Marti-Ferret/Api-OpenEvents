const res = require("express/lib/response")
const { json } = require("express/lib/response")
const GenericDAO = require("./generic.dao")

class EventsDAO extends GenericDAO{

    constructor(){
        super("events")
    }

    async insertEvent(event,id,date) {
        const [results] = await global.connection.promise().query("INSERT INTO ?? (name,owner_id,date,eventStart_date,location,description,eventStart_date,eventEnd_date,n_participators,type) VALUES (? ,?, ?, ?, ?, ?, ?, ?, ?, ?)", [this.tabla,event.name,id,date,event.eventStart_date,event.location,event.description,event.eventStart_date,event.eventEnd_date,event.n_participators,event.type])
        return event
    }

    async deleteAssistance(eId,uId){
        const [results] = await global.connection.promise().query("DELETE FROM assistance where user_id = ? AND event_id = ?", [uId,eId])
        return results
    }

    async insertAssistance(eId,uId){
        const [results] = await global.connection.promise().query("INSERT INTO assistance (user_id,event_id) VALUES (? ,?)", [uId,eId])
        return results
    }
    async getAssistance (uId,eId){
        const [results] = await global.connection.promise().query("Select * from assistance where user_id = ? and event_id = ?", [uId,eId])
        return results
    }

    async editAssistance(eId,uId,info,bodyInfo){
        let punt
        let coment

        if(bodyInfo.puntuation === undefined){
            punt = info[0].puntuation
        }else{
            punt = bodyInfo.puntuation
        }

        if(bodyInfo.comentary === undefined){
            coment = info[0].comentary
        }else{
            coment = bodyInfo.comentary
        }
        await global.connection.promise().query("UPDATE assistance SET puntuation = ? , comentary = ? where user_id = ? AND event_id = ?", [punt,coment,uId,eId])

    }

    async getAllEvents() {
        const [results] = await global.connection.promise().query("SELECT name,eventStart_date,location,description,eventStart_date,eventEnd_date,n_participators,type,owner_id,date FROM ??", [this.tabla])
        return results
    }

    async deleteEvent(eventId){
        await global.connection.promise().query("DELETE FROM ?? where id = ?", [this.tabla,eventId])
       
    }
    //No em surt
    async searchEvent(location,date,keyword) {
        keyword = '%'+keyword+'%'
        console.log(location + date + keyword)
        if (location != null){
            if(date != null){
                if(keyword != null){
                    const [results] = await global.connection.promise().query("SELECT * FROM ?? where location = ? AND eventStart_date = ? OR eventEnd_date = ? AND name LIKE ?", [this.tabla,location,date,date,keyword])
                    return results
                }
            }
            const [results] = await global.connection.promise().query("SELECT * FROM ?? where location = ?", [this.tabla,location])
            return results
        }

       
    }

    async getEventAssistances(eId,uId){
        const [results] = await global.connection.promise().query("Select * FROM assistance WHERE event_id = ? AND user_id = ?", [eId, uId])
        return results
    }

    async getUsersAssistances(id){
        const [results] = await global.connection.promise().query("Select user_id FROM assistance WHERE event_id = ?", [id])
        return results
    }

    async getInfoAssistances(users){
        const results = []
        var usuaris = []
        for(let i=0; i < users.length; i++){
            results[i] = await global.connection.promise().query("SELECT id,name,last_name,email,image FROM users WHERE id = ?", [users[i].user_id])
            usuaris.push(results[i][0])
        }
            return usuaris
    }

    async updateEvent(info,event) {
        let name,image,location,description,eventStart_date,eventEnd_date,n_participators,type
        
        if(info.name === undefined){
            name = event.name
        }else{
            name = info.name
        }

        if(info.image === undefined){
            image = event.image
        }else{
            image = info.image
        }

        if(info.location === undefined){
            location =  event.location
        }else{
            location = info.location
        }

        if(info.description === undefined){
            description =  event.description
        }else{
            description = info.description
        }

        if(info.eventStart_date === undefined){
            eventStart_date = event.eventStart_date
        }else{
            eventStart_date = info.eventStart_date
        }

        if(info.eventEnd_date === undefined){
            eventEnd_date = event.eventEnd_date
        }else{
            eventEnd_date = info.eventEnd_date
        }

        if(info.n_participators === undefined){
            event.n_participators= event.n_participators
        }else{
            n_participators = info.n_participators
        }

        if(info.type === undefined){
            type = event.type
        }else{
            type = info.type
        }
        
        const [results] = await global.connection.promise().query("UPDATE ??  SET name = ?, image = ?, location = ?, description = ?, eventStart_date = ?, eventEnd_date = ?, n_participators = ?, type = ? WHERE id = ?", [this.tabla,name,image,location,description,eventStart_date,eventEnd_date,n_participators,type,event.id])
        return results
    }


}    
    
    
    module.exports = EventsDAO