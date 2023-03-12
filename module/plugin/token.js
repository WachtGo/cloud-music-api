const jsonwebtoken = require('jsonwebtoken') //用来生成token
const bcrypt = require('bcrypt') //密码加密的包

const SECRET = 'wachtwacht' //随便定义一个密钥，到时候写设置在token里,需要用来解密加密了的token

/*
中间件
 */
const auth = async (req, res, next) => {
  //这个用来拿user信息，拿id
  console.log('headers------', req.headers.authorization)
  if (req.headers.authorization) {
    jsonwebtoken.verify(
      req.headers.authorization.split(' ')[1],
      SECRET,
      (err, decoded) => {
        if (err) {
          return res.send({
            msg: '登录信息验证失败',
          })
        }
        req.user = decoded
      },
    )
  }
  next()
}

module.exports = {
  jsonwebtoken,
  bcrypt,
  SECRET,
  auth,
}
