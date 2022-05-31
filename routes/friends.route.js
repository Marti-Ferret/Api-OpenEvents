const express = require("express")
const router = express.Router()
const { json } = require("express/lib/response")
const FriendsDAO = require("../DAO/friends.dao")
const fdao = new FriendsDAO()

router.post("/:id", async(req, res, next) => {
    if (await fdao.validateToken(req)) {
        const decoded = await fdao.validateToken(req)
        res.json(await fdao.sendFriendship(decoded.id, req.params.id))
       
    } else {
        res.sendStatus(403)
    }    
})

router.put("/:id", async(req, res, next) => {
    if (await fdao.validateToken(req)) {
        const decoded = await fdao.validateToken(req)
        res.json(await fdao.acceptFriendship(decoded.id, req.params.id))
       
    } else {
        res.sendStatus(403)
    }    
})

router.get("/requests", async(req, res, next) => {
    if (await fdao.validateToken(req)) {
        const decoded = await fdao.validateToken(req)
        const usersIds = await fdao.getRequestsUsers(decoded.id)
        res.json(await fdao.getRequests(usersIds))

       
    } else {
        res.sendStatus(403)
    }    
})

router.get("/", async(req, res, next) => {
    if (await fdao.validateToken(req)) {
        const decoded = await fdao.validateToken(req)
        const usersIds = await fdao.getFriendsUsers(decoded.id)
        console.log(usersIds)
        res.json(await fdao.getFriends(usersIds))

       
    } else {
        res.sendStatus(403)
    }    
})

router.delete("/:id", async(req, res, next) => {
    if (await fdao.validateToken(req)) {
        const decoded = await fdao.validateToken(req)
        res.json(await fdao.deleteRequest(decoded.id,req.params.id))
    } else {
        res.sendStatus(403)
    }    
})






module.exports = router;