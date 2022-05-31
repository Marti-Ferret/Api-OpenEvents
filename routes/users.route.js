const express = require("express")
const { json } = require("express/lib/response")
const router = express.Router()
const UsersDAO = require("../DAO/users.dao")
const udao = new UsersDAO()

router.get("/", async (req, res, next) => {
    if (await udao.validateToken(req)) {
        res.json(await udao.getAllUsers())
    } else {
        res.sendStatus(403)
    }
})

router.get("/:id/friends", async (req, res, next) => {
    if (await udao.validateToken(req)) {
        const usersIds = await udao.getFriendsIds(req.params.id)
        res.json(await udao.getFriends(usersIds))
    } else {
        res.sendStatus(403)
    }
})

router.get("/:id/assistances", async (req, res, next) => {
    if (await udao.validateToken(req)) {
        const usersIds = await udao.getEventsIds(req.params.id)
        res.json(await udao.getEventsAssistance(usersIds))
    } else {
        res.sendStatus(403)
    }
})

router.get("/:id/assistances/future", async (req, res, next) => {
    if (await udao.validateToken(req)) {
        var utc = new Date().toJSON().slice(0,10);
        const usersIds = await udao.getEventsIds(req.params.id)
        res.json(await udao.getEventsAssistanceFuture(usersIds,utc))
    } else {
        res.sendStatus(403)
    }
})

router.get("/:id/assistances/finished", async (req, res, next) => {
    if (await udao.validateToken(req)) {
        var utc = new Date().toJSON().slice(0,10);
        const usersIds = await udao.getEventsIds(req.params.id)
        res.json(await udao.getEventsAssistanceFinished(usersIds,utc))
    } else {
        res.sendStatus(403)
    }
})


router.get("/search", async (req, res, next) => {
    if (await udao.validateToken(req)) {
        res.json(await udao.searchUser(req.query.s))
    } else {
        res.sendStatus(403)
    }
})

router.get("/:id/statistics", async (req, res, next) => {
    if (await udao.validateToken(req)) {
        var score = await udao.avgScore(req.params.id)
        var coments = await udao.numComents(req.params.id)
        object = {score,coments}
        res.json(object)
    } else {
        res.sendStatus(403)
    }
})

router.get("/:id", async(req, res, next) => {
    if (await udao.validateToken(req)) {
        res.json(await udao.getId(req.params.id))
    } else {
        res.sendStatus(403)
    }
})

router.get("/:id/events", async(req, res, next) => {
    if (await udao.validateToken(req)) {
        res.json(await udao.getIdEvents(req.params.id))
    } else {
        res.sendStatus(403)
    }
})

router.get("/:id/events/finished", async(req, res, next) => {
    var utc = new Date().toJSON().slice(0,10);
    if (await udao.validateToken(req)) {
        res.json(await udao.getIdEventsFinished(req.params.id,utc))
    } else {
        res.sendStatus(403)
    }
})

router.get("/:id/events/future", async(req, res, next) => {
    var utc = new Date().toJSON().slice(0,10);
    if (await udao.validateToken(req)) {
        res.json(await udao.getIdEventsFuture(req.params.id,utc))
    } else {
        res.sendStatus(403)
    }
})

router.get("/:id/events/current", async(req, res, next) => {
    var utc = new Date().toJSON().slice(0,10);
    if (await udao.validateToken(req)) {
        res.json(await udao.getIdEventsCurrent(req.params.id,utc))
    } else {
        res.sendStatus(403)
    }
})

router.delete("/", async(req, res, next) => {
    if (await udao.validateToken(req)) {
        const decoded = await udao.validateToken(req)
        res.json(await udao.deleteUser(decoded.id))
    } else {
        res.sendStatus(403)
    }
})

router.put("/", async(req, res, next) => {
    if (await udao.validateToken(req)) {

        const decoded = await udao.validateToken(req)
        const user = await udao.getId(decoded.id)
        res.json(await udao.updateUser(req.body , user[0]))
        
    } else {
        res.sendStatus(403)
    }

})

router.post("/", async(req, res, next) => {
    let user = await udao.insertUser(req.body)
    res.json({"name": user.name, "last_name" : user.last_name, "email": user.email, "image": user.image})
})



router.post("/login", async (req, res, next) => {
    const users = await udao.getAll()
    const { email, password } = req.body
    console.log(req.body)

    const user = users.find(user => user.email === email && user.password === password)

    if (!user){
        return next("user not found")
    }else{
        const jwt = require("jsonwebtoken")
            const token = jwt.sign({
                    id: user.id,
                    username: user.email,
                    password: user.password
                },
                process.env.JWT_KEY) 

            res.json("accessToken: " +token)
        }

})

module.exports = router;