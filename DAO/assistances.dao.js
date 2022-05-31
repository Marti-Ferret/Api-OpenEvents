const res = require("express/lib/response")
const { json } = require("express/lib/response")
const GenericDAO = require("./generic.dao")

class AssistDAO extends GenericDAO{
    
    constructor(){
        super("assistance")
    }

async confirmAssistance(uId,eId){
    await global.connection.promise().query("INSERT INTO ?? (user_id,event_id) VALUES (? ,?)", [this.tabla,uId,eId]) 

}

async getAssistance(uId,eId){
    const [results] = await global.connection.promise().query("SELECT * from ?? where user_id = ? AND event_id = ?", [this.tabla,uId,eId]) 
    return results
}

async deleteAssistance(uId,eId){
    const [results] = await global.connection.promise().query("DELETE FROM ?? where user_id = ? AND event_id = ?", [this.tabla,uId,eId])
    return results
}

async changeAssistance(uId,eId,info,bodyInfo){
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
     await global.connection.promise().query("UPDATE ?? SET puntuation = ? , comentary = ? where user_id = ? AND event_id = ?", [this.tabla,punt,coment,uId,eId])
}


}    
    
    
module.exports = AssistDAO