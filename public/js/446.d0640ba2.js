"use strict";(self["webpackChunkmyblog"]=self["webpackChunkmyblog"]||[]).push([[446],{1446:function(e,t,a){a.r(t),a.d(t,{default:function(){return d}});var i=function(){var e=this,t=e._self._c;return t("div",{staticClass:"about"},[t("div",{staticClass:"about_content about_top"},[t("p",[e._v(" "+e._s(e.aboutword)+" ")])]),t("div",{staticClass:"about_content about_bottom"},[e._m(0),e._m(1),t("el-form",{ref:"dynamicValidateForm",staticClass:"demo-dynamic",attrs:{model:e.dynamicValidateForm,"label-width":"100px"}},[t("el-form-item",{attrs:{prop:"username",label:"姓名/昵称",rules:e.rules.empty}},[t("el-input",{model:{value:e.dynamicValidateForm.username,callback:function(t){e.$set(e.dynamicValidateForm,"username",t)},expression:"dynamicValidateForm.username"}})],1),t("el-form-item",{attrs:{prop:"email",label:"你的邮箱",rules:e.rules.email}},[t("el-input",{model:{value:e.dynamicValidateForm.email,callback:function(t){e.$set(e.dynamicValidateForm,"email","string"===typeof t?t.trim():t)},expression:"dynamicValidateForm.email"}})],1),t("el-form-item",{attrs:{prop:"theme",label:"邮箱主题",rules:e.rules.empty}},[t("el-input",{model:{value:e.dynamicValidateForm.theme,callback:function(t){e.$set(e.dynamicValidateForm,"theme",t)},expression:"dynamicValidateForm.theme"}})],1),t("el-form-item",{attrs:{prop:"emailInfo",label:"留言内容",rules:e.rules.empty}},[t("el-input",{attrs:{type:"textarea",height:"500px"},model:{value:e.dynamicValidateForm.emailInfo,callback:function(t){e.$set(e.dynamicValidateForm,"emailInfo",t)},expression:"dynamicValidateForm.emailInfo"}})],1),t("el-form-item",[t("button",{staticClass:"my_button submit_button",attrs:{type:"button"},on:{click:function(t){return e.submitForm("dynamicValidateForm")}}},[e._v(" 发送 ")])])],1)],1)])},l=[function(){var e=this,t=e._self._c;return t("div",{staticClass:"about_title"},[t("i",[e._v("有什么问题可以加我QQ： "),t("b",[e._v("1369206217")])])])},function(){var e=this,t=e._self._c;return t("div",{staticClass:"about_title"},[t("i",[e._v("或通过邮箱联系我")])])}],r=a(9613);function m(e){return(0,r.Z)({url:"/about/sendMail",method:"post",data:e})}var s={data(){var e=(e,t,a)=>{""===t.trim()?a(new Error("不能为空")):a()};return{aboutword:"好像没啥想写的东西，虽然想写个博客，但是个人并不喜欢写东西分享，那就这样吧。。。",dynamicValidateForm:{username:"",email:"",theme:"",emailInfo:""},rules:{email:[{required:!0,message:"请输入邮箱地址",trigger:"blur"},{type:"email",message:"请输入正确的邮箱地址",trigger:["blur","change"]}],empty:[{required:!0,validator:e,trigger:"blur"}]}}},methods:{submitForm(e){this.$refs[e].validate((e=>{if(!e)return!1;m(this.dynamicValidateForm).then((async e=>{e.data.status?(console.log(e),this.$message.success(e.data.msg),this.dynamicValidateForm.theme="",this.dynamicValidateForm.emailInfo=""):this.$message.error(e.data.msg)}))}))}}},o=s,n=a(1001),u=(0,n.Z)(o,i,l,!1,null,"17908221",null),d=u.exports}}]);