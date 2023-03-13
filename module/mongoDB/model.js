/* 
    需要操作数据库时引入该文件
*/
const mongoose = require('mongoose')

mongoose
    .connect('mongodb://127.0.0.1:27017/blog2', {
        useNewUrlParser: true, // 防止莫名警告信息的 两条配置
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('数据库连接成功')
    })
    .catch(() => {
        console.log('数据库连接失败')
    })

const bcrypt = require('bcrypt') //密码加密的包

const Schema = mongoose.Schema

// 生成一个表规则对象userSchema
const userSchema = new Schema(
    {
        //制定表规则
        username: {
            type: String, //将name的值的数据类型限制为String，以此类推
            require: true, //表示name为必填项 。若不满足条件,希望有所提示，可写成 例： require: [true, "name字段为必填项!"]
            minlength: 2,
            maxlength: 16, //表示限制name的长度为 2 ~ 16 个字符
        },
        password: {
            type: String,
            require: true,
            minlength: 6,
            set(value) {
                //value 12345678
                // return 加密的值
                //hashSysc 散列的同步函数   hashSync（需要散列的值，散列的程度）
                return bcrypt.hashSync(value, 10)
            },
        },
        nickname: {
            type: String,
            default: '果然是个随缘怪',
        },
        signature: {
            type: String,
            default: '没有签名就是个性',
        },
        tags: {
            type: Array,
            default: ['帅气', '美丽', '温柔', '大方', '勇敢', '智慧'],
        },
        avatar: {
            type: String,
            default: '/userImg/default6666666.png',
        },
    },
    { versionKey: false /*取消表中自动生成版本号'__v'*/ },
)

//留言
const messageSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        writer: {
            type: String,
            required: true,
        },
        createTime: {
            type: Number,
            required: true,
        },
        user: {
            //关联users表	绑定_id ->	author: res._id
            type: Schema.Types.ObjectId,
            ref: 'users',
        },
    },
    {
        versionKey: false,
    },
)

//友链
const linkSchema = new Schema(
    {
        linkname: {
            type: String,
            required: true,
        },

        linkurl: {
            type: String,
            required: true,
            validate: {
                //自定义验证
                validator(value) {
                    return /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/.test(value)
                },
                message: '网址输入有误！', //验证不通过时的提示
            },
        },
        user: {
            //关联users表	绑定_id ->	author: res._id
            type: Schema.Types.ObjectId,
            ref: 'users',
        },
    },
    {
        versionKey: false,
    },
)

const noteSchema = new Schema(
    {
        articleTitle: String, // 标题
        articleDesc: String, // 描述
        articleMdUrl: String, // 文章连接
        articleImgUrl: {
            type: 'String',
            default: '/vue_img/hot5.png',
        }, //  封面连接
        articleDate: {
            //  时间
            type: Date,
            default: Date.now(),
        },
        articleChildren: [], // 设置评论
        articleBol: {
            type: Boolean,
            default: false,
        },
    },
    {
        versionKey: false,
    },
)

// 创建/选择表               表名  之前设置的表规则userSchema
const userDB = mongoose.model('users', userSchema)
const messageDB = mongoose.model('message', messageSchema)
const linkDB = mongoose.model('link', linkSchema)
const noteDB = mongoose.model('note', noteSchema)
// userDB.create({
//     username: 'wacht',
//     password: '999999999'
// })
// 64062be5b6793b479c5f7269
// messageDB.create({
//     content: '第一条留言谁谁',
//     writer: '我自己',
//     createTime: new Date(),
//     user: '64062be5b6793b479c5f7269'
// })

module.exports = { userDB, messageDB, linkDB, noteDB }

/*     age: {
        type: Number,
        min: [15, "age不能小于15！"],//不满足条件时的提示信息
        max: 10000 //限制了age的最低值为15，最大值为1000
    },// 只写 age: Number , 表示age只限制了Number类型
    nation: {
        type: String,
        default: "汉族" //表示如果此项未填，则默认为"汉族"
    },
    sex: {
        type: String,
        enum: ['男', '女', '其他'] //表示限制sex的值为:'男'，'女','其他'
    },
    phone: {
        type: String,
        validate: {//自定义验证
            validator(value) {
                //验证手机号， 返回true可以通过，false验证不通过
                return /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(value)
            },
            message: '手机号输入有误！' //验证不通过时的提示
        },
        // match: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/   //匹配手机正则，满足才可以成功  
    },
    arr:[],
    obj:{},
    // other: [String],    //表示other值必须是数组，且数组项必须是String类型
    // other:[familySchema],   //表示other值必须是数组，且数组项必须满足familySchema的表规则
    // family: familySchema //表规则嵌套  表示family使用其他的表规则familySchema */
