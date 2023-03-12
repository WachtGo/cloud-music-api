const express = require('express')
const router = express.Router()
const { userDB } = require('../module/mongoDB/model') //操作数据库
const svgCaptcha = require('../module/plugin/svgCaptcha') //获取图片验证码
const upload = require('../module/plugin/multer') //接收文件和储存文件
const multer = require('multer')
const { jsonwebtoken, bcrypt, SECRET, auth } = require('../module/plugin/token')

//获取验证码
router.get('/getCaptcha', async (req, res) => {
  // console.log('svgcaptrue----', svgCaptcha)
  res.send({
    data: svgCaptcha(),
  })
})
//登录
router.post('/login', async (req, res) => {
  // res.send('登录')
  // console.log(req.body)
  const user = await userDB.findOne({ username: req.body.username })
  // console.log(user)
  if (!user) {
    res.send({ msg: '用户名不存在' })
    return
  }
  //判断明文和密文是否一致
  const isPassword = bcrypt.compareSync(req.body.password, user.password)
  if (isPassword) {
    //密码一致
    const token = jsonwebtoken.sign(
      {
        id: String(user._id), //只能用字符串类型
      },
      SECRET,
    )
    // TOKEN = token
    console.log('token---', token)
    res.send({
      status: true,
      msg: '登录成功',
      data: user,
      token,
    })
  } else {
    res.send({ status: false, msg: '密码错误' })
  }
})

//注册
router.post('/register', async (req, res) => {
  // console.log(req.body)
  const user = await userDB.findOne({ username: req.body.username })
  // console.log(user)
  if (user) {
    res.send({ msg: '用户名已存在' })
    return
  }
  let createuser = {
    nickname: req.body.nickname,
    username: req.body.username,
    password: req.body.password,
  }
  const data = await userDB.create(createuser)
  if (data) {
    res.send({
      status: true,
      msg: '注册成功',
      username: data.username,
    })
  } else {
    res.send({ status: false, msg: '注册失败' })
  }
})

//接收上传的图片地址,
router.post('/uploadImage', upload, async (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      // 上传错误
      return res.send({ status: false, msg: '上传错误' })
    } else if (err) {
      // 未知错误
      return res.send({ status: false, msg: '未知错误' })
    }
    res.send({ status: true, msg: '上传成功', data: req.filename }) //返回创建好的文件名，再让前端发回来
  })
})

module.exports = router
