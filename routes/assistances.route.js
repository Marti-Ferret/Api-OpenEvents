const express = require("express")
const router = express.Router()
const { json } = require("express/lib/response")
const AssistDAO = require("../DAO/assistances.dao")
const adao = new AssistDAO()

router.post("/:user_id/:event_id", async (req, res, next) => {

    if (await adao.validateToken(req)) {
        res.json(await adao.confirmAssistance(req.params.user_id,req.params.event_id))
    } else {
        res.sendStatus(403)
    }
})

router.get("/:user_id/:event_id", async (req, res, next) => {

    if (await adao.validateToken(req)) {
        res.json(await adao.getAssistance(req.params.user_id,req.params.event_id))
    } else {
        res.sendStatus(403)
    }
})

router.put("/:user_id/:event_id", async (req, res, next) => {
    const info = await adao.getAssistance(req.params.user_id,req.params.event_id)
    if (await adao.validateToken(req)) {
        res.json(await adao.changeAssistance(req.params.user_id,req.params.event_id,info,req.body))
    } else {
        res.sendStatus(403)
    }
})

router.delete("/:user_id/:event_id", async (req, res, next) => {
    if (await adao.validateToken(req)) {
        res.json(await adao.deleteAssistance(req.params.user_id,req.params.event_id))
    } else {
        res.sendStatus(403)
    }
})




module.exports = router;