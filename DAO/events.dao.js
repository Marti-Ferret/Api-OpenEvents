const res = require("express/lib/response")
const { json } = require("express/lib/response")
const GenericDAO = require("./generic.dao")

class EventsDAO extends GenericDAO{

    constructor(){
        super("events")
    }

    async insertEvent(event,id,date) {
        const [results] = await global.connection.promise().query("INSERT INTO ?? (name,owner_id,date,image,location,description,eventStart_date,eventEnd_date,n_participators,type) VALUES (? ,?, ?, ?, ?, ?, ?, ?, ?, ?)", [this.tabla,event.name,id,date,event.image,event.location,event.description,event.eventStart_date,event.eventEnd_date,event.n_participators,event.type])
        return event
    }

    async getAllEvents() {
        const [results] = await global.connection.promise().query("SELECT name,image,location,description,eventStart_date,eventEnd_date,n_participators,type,owner_id,date FROM ??", [this.tabla])
        return results
    }

    async deleteEvent(eventId){
        await global.connection.promise().query("DELETE FROM ?? where id = ?", [this.tabla,eventId])
       
    }


}    
    
    
    module.exports = EventsDAO