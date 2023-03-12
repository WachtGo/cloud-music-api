const express = require('express')
const router = express.Router()
const { linkDB } = require('../module/mongoDB/model') //操作数据库

const { auth } = require('../module/plugin/token')

//获取友链--由于只开放了个人，所以写死用户id直接获取的自己的留言
router.get('/getlink', (req, res) => {
  linkDB
    .find({ user: '64062be5b6793b479c5f7269' }, { user: 0 })
    .then((response) => {
      res.send({ data: response })
    })
    .catch((error) => {})
})
//添加友链,需要登陆
router.post('/addlink', auth, (req, res) => {
  if (req.body.linkname === '' || req.body.linkurl === '') {
    res.send({
      msg: '链接名和链接都不能为空',
    })
    return
  }
  let userId = ''
  req.user ? (userId = req.user.id) : (userId = '64062be5b6793b479c5f7269') //未登录则获取站主的留言板

  linkDB
    .create({
      linkname: req.body.linkname,
      linkurl: req.body.linkurl,
      user: userId,
    })
    .then((response) => {
      res.send({ status: true, msg: '添加成功', data: response })
    })
    .catch((err) => {
      res.send({ status: false, msg: '输入链接地址有误' })
    })
})
//删除--这个需要登录，不然谁都能乱删
router.post('/deletelink', auth, (req, res) => {
  linkDB
    .findByIdAndDelete({ _id: req.body._id })
    .then((response) => {
      res.send({ msg: '删除成功' })
    })
    .catch((error) => {
      res.send({ msg: '链接不存在' })
    })
})

module.exports = router
