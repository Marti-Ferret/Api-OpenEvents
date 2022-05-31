const express = require("express")
const { json } = require("express/lib/response")
const router = express.Router()
const EventsDAO = require("../DAO/events.dao")
const edao = new EventsDAO()

router.post("/", async(req, res, next) => {
    if (await edao.validateToken(req)) {
        var utc = new Date().toJSON().slice(0,10);  
        const decoded = await edao.validateToken(req)
        let event = await edao.insertEvent(req.body,decoded.id, utc)
        res.json({"name": event.name, "image" : event.image, "location": event.location, "description": event.description, "eventStart_date": event.eventStart_date, "eventEnd_date":event.eventEnd_date, "n_participators": event.n_participators, "type": event.type, "owner_id": decoded.id, "date": utc})
    } else {
        res.sendStatus(403)
    }    
})

router.delete("/:id", async(req, res, next) => {
    if (await edao.validateToken(req)) {
        res.json(await edao.deleteEvent(req.params.id))
    } else {
        res.sendStatus(403)
    }
})

router.get("/", async(req,res,next) =>{
    if (await edao.validateToken(req)) {
        res.json(await edao.getAllEvents())
    } else {
        res.sendStatus(403)
    }
})

router.get("/:id", async(req, res, next) => {
    if (await edao.validateToken(req)) {
        res.json(await edao.getId(req.params.id))
    } else {
        res.sendStatus(403)
    }
})





module.exports = router;