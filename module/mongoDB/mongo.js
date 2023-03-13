const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/blog', {
    useNewUrlParser: true, // 防止莫名警告信息的 两条配置
    useUnifiedTopology: true
})
    .then(() => {
        console.log('数据库连接成功');
    })
    .catch(() => {
        console.log('数据库连接失败');
    })
// const userDB = require('./model')
// userDB.create({
//     username: 'wacht2',
//     password: '1234567'
// })