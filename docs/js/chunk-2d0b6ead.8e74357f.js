(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b6ead"],{"1ecf":function(e,t,r){"use strict";r.r(t);var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-dialog",{attrs:{title:"修改个人信息",visible:e.show,width:"600px"},on:{"update:visible":function(t){e.show=t}}},[r("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"80px","hide-required-asterisk":""}},[r("el-form-item",{attrs:{label:"用户名",prop:"name"}},[r("el-input",{model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),r("el-form-item",{attrs:{label:"权限",prop:"role"}},[r("el-radio-group",{model:{value:e.form.role,callback:function(t){e.$set(e.form,"role",t)},expression:"form.role"}},[r("el-radio",{attrs:{label:"admin"}},[e._v("超级管理员")]),r("el-radio",{attrs:{label:"edit"}},[e._v("管理员")])],1)],1)],1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:e.reset}},[e._v("重 置")]),r("el-button",{attrs:{type:"primary"},on:{click:e.submit}},[e._v("确 定")])],1)],1)},l=[],s={data:function(){return{show:!1,form:{name:"",role:"admin"},rules:{name:[{required:!0,message:"请输入用户名",trigger:"blur"}]}}},computed:{},mounted:function(){},methods:{submit:function(){this.$refs.form.validate((function(e){if(!e)return console.log("error submit!!"),!1;alert("submit!")}))},reset:function(){this.$refs.form.resetFields()}},components:{}},a=s,i=r("2877"),n=Object(i["a"])(a,o,l,!1,null,"ba6d2fda",null);t["default"]=n.exports}}]);
//# sourceMappingURL=chunk-2d0b6ead.8e74357f.js.map