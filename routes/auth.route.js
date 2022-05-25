const express = require("express")
const router = express.Router()

const UsersDao = require("../DAO/users.dao")
const udao = new UsersDao()

router.post("/", async (req, res, next) => {
    const users = await udao.getAll()
    const { user, pass } = req.body
    console.log(req.body)

    if( users.find(usuari => usuari.email === user && usuari.password === pass)){
        
        const jwt = require("jsonwebtoken")
        const token = jwt.sign({
            id: user.id,
            username: user.email,
            password: user.password
        },
        process.env.JWT_KEY)

    res.json(token)

    }else{
        res.json("Invalid user")
    }


})



module.exports = router;