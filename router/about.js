const express = require('express')
const router = express.Router()

const sendMail = require('../module/plugin/email') //发送邮箱

//发送邮箱
router.post('/sendMail', async (req, res) => {
  let info = {
    username: req.body.username,
    email: req.body.email,
    theme: req.body.theme,
    emailInfo: req.body.emailInfo,
  }
  sendMail(info, res.send)
  // res.send(result)
})

module.exports = router
