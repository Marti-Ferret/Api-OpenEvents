const express = require("express")
const router = express.Router()

const UsersDao = require("../DAO/users.dao")
const udao = new UsersDao()

router.post("/", async (req, res, next) => {
    const users = await udao.getAll()
    const { username, pass } = req.body
    console.log(req.body)

    const user = users.find(user => user.email === username && user.password === pass)

    if(user){
        if (user.password === password) {
        const jwt = require("jsonwebtoken")
        const token = jwt.sign({
            id: user.id,
            username: user.email,
            password: user.password,
        },
        process.env.JWT_KEY)

    res.json(token)

    }else{
        res.json("Invalid user")
    }

    }
})



module.exports = router;