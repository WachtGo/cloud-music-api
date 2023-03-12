var svgCaptcha = require('svg-captcha') //获取图片验证码
function captcha() {
  return svgCaptcha.create({
    size: 2, // 验证码长度
    ignoreChars: '0oLl1iIJjzZ2', // 验证码字符中排除 的字符
    noise: 1, // 干扰线条的数量
    color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
    background: '#fff', // 验证码图片背景颜色
    width: 75,
    height: 32,
  })
}

module.exports = captcha
