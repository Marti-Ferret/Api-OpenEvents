const express = require("express")
const router = express.Router()
const { json } = require("express/lib/response")
const MessagesDAO = require("../DAO/messages.dao")
const mdao = new MessagesDAO()


router.post("/", async(req, res, next) => {
    let date = new Date()
    if (await mdao.validateToken(req)) {
        res.json(await mdao.insertMessage(req.body,date))
        
    } else {
        res.sendStatus(403)
    }

})

router.get("/users", async(req, res, next) => {

    if (await mdao.validateToken(req)) {
        const decoded = await mdao.validateToken(req)
        const usersIds = await mdao.getMessageUsers(decoded.id)
        res.json(await mdao.getMessages(usersIds))
        
     
        
    } else {
        res.sendStatus(403)
    }

})

router.get("/:id", async(req, res, next) => {
    
    if (await mdao.validateToken(req)) {
        const decoded = await mdao.validateToken(req)
        res.json(await mdao.searchMessagesId(decoded.id,req.params.id))
        
    } else {
        res.sendStatus(403)
    }

})



module.exports = router;