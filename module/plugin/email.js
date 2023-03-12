const nodemailer = require('nodemailer')

// const cb = (value) => {
//     return value
// }

const email = async ({ username, email, theme, emailInfo }, send) => {
  // 创建邮件程序
  let transporter = nodemailer.createTransport({
    // 设置qq发送
    host: 'smtp.qq.com',
    auth: {
      user: '1369206217@qq.com', // generated ethereal user
      pass: 'wqlgtbkbrsmsghae',
    },
  })
  //配置信息对象
  let info = [
    {
      // 发送给自己看,这里用自己小号发给自己，电脑端qq才有提示
      from: `"${username}(${email})"<1369206217@qq.com>`, //  邮件发送人名称加地址
      to: '1369206217@qq.com', // 发送给谁
      subject: theme, //  主题
      text: emailInfo, // 正文
    },
    {
      // 发送给申请人看
      from: '"wacht"<1369206217@qq.com>', //  邮件发送人名称加地址
      to: email, // 发送给谁
      subject: '自动回复邮件', //  主题
      text: '已经接收您发送的邮件,我会在看到邮件事件立即回复', // 正文
    },
  ]

  // 邮件发送
  info.forEach(async (item, index) => {
    await transporter.sendMail(item, (err, info) => {
      if (err) {
        console.log('发送失败')
        return send({
          status: false,
          msg: '发送失败',
        })
      }
      if (index == 1) {
        console.log('发送成功')
        return send({
          status: true,
          msg: '已发送邮件',
        })
      }
    })
  })
}
module.exports = email
/*   user: '1369206217@qq.com', // generated ethereal user
pass: 'wqlgtbkbrsmsghae', // generated ethereal password */
