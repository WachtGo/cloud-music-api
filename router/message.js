const express = require('express')
const router = express.Router()
const { messageDB } = require('../module/mongoDB/model') //操作数据库

const { auth } = require('../module/plugin/token')

//获取留言信息--由于只开放了个人，所以写死用户id直接获取的自己的留言
router.get('/getMessages', auth, (req, res) => {
  let id = ''
  req.user ? (id = req.user.id) : (id = '64062be5b6793b479c5f7269') //未登录则获取站主的留言板

  messageDB
    .find({ user: id }, { user: 0 })
    .then((response) => {
      // console.log('getMessages------', response)
      res.send({ data: response })
    })
    .catch((error) => {})
})
//写留言，这个无需登录，游客也可以随意留言
router.post('/writeMessage', auth, (req, res) => {
  if (req.body.content === '' || req.body.createTime === '') {
    res.send({
      msg: '留言和大名都不能为空',
    })
    return
  }
  let userId = ''
  req.user ? (userId = req.user.id) : (userId = '64062be5b6793b479c5f7269') //未登录则获取站主的留言板
  messageDB
    .create({
      content: req.body.content,
      writer: req.body.writer,
      createTime: req.body.createTime,
      user: userId,
    })
    .then((response) => {
      res.send({ data: response })
    })
    .catch((err) => {})
})
//删除留言--这个需要登录，不然谁都能乱删
router.post('/deleteMessage', auth, (req, res) => {
  messageDB
    .findByIdAndDelete({ _id: req.user.id })
    .then((response) => {
      res.send({ msg: '删除成功' })
    })
    .catch((error) => {
      res.send({ msg: '留言不存在' })
    })
})

module.exports = router
