const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //上传文件存储位置
    if (file.originalname.endsWith('.md')) {
      cb(null, path.resolve(__dirname, '../../public/note'))
    } else {
      cb(null, path.resolve(__dirname, '../../public/userimg'))
    }
  },
  filename: function (req, file, cb) {
    // 设置上传文件名称
    // console.log('file----', file)
    cb(null, 'avatar' + Date.now() + '.' + file.originalname.split('.')[1]) //取了后缀名
  },
})

module.exports = multer({ storage: storage }).single('file')
