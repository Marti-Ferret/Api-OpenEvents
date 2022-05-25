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

router.get("/search", async (req, res, next) => {
    if (await udao.validateToken(req)) {
        res.json(await udao.searchUser(req.query.s))
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

router.get("/a", async(req, res, next) => {
        const decoded = await udao.validateToken(req)
        res.json(decoded.id)  
})

router.put("/", async(req, res, next) => {
    if (await udao.validateToken(req)) {
        if (req.USER_ID == 3) res.json("eres tu")
        
       // res.json(await udao.updateUser(req.body))
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

            res.json(token)
        }

})

module.exports = router;