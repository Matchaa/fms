(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b6c5ebc2"],{"10eb":function(e,t,r){},"20c5":function(e,t,r){"use strict";var o=r("10eb"),n=r.n(o);n.a},3846:function(e,t,r){r("9e1e")&&"g"!=/./g.flags&&r("86cc").f(RegExp.prototype,"flags",{configurable:!0,get:r("0bfb")})},"6b54":function(e,t,r){"use strict";r("3846");var o=r("cb7c"),n=r("0bfb"),a=r("9e1e"),s="toString",i=/./[s],l=function(e){r("2aba")(RegExp.prototype,s,e,!0)};r("79e5")((function(){return"/a/b"!=i.call({source:"a",flags:"b"})}))?l((function(){var e=o(this);return"/".concat(e.source,"/","flags"in e?e.flags:!a&&e instanceof RegExp?n.call(e):void 0)})):i.name!=s&&l((function(){return i.call(this)}))},b147:function(e,t,r){"use strict";r.r(t);var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-dialog",{attrs:{title:"新增客户",visible:e.show,width:"600px"},on:{"update:visible":function(t){e.show=t},open:e.openDialog}},[r("el-form",{ref:"form",attrs:{"label-width":"100px",model:e.form,rules:e.rules}},[r("el-form-item",{attrs:{label:"客户名称",prop:"name"}},[r("el-input",{attrs:{placeholder:"请输入客户名称"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),r("el-form-item",{attrs:{label:"客户地址",prop:"address"}},[r("el-input",{attrs:{placeholder:"请输入客户地址"},model:{value:e.form.address,callback:function(t){e.$set(e.form,"address",t)},expression:"form.address"}})],1),r("el-form-item",{attrs:{label:"联系电话",prop:"phone"}},[r("el-input",{attrs:{placeholder:"请输入联系电话",maxlength:11},model:{value:e.form.phone,callback:function(t){e.$set(e.form,"phone",t)},expression:"form.phone"}})],1),r("el-form-item",{attrs:{label:"传真",prop:"fax"}},[r("el-input",{attrs:{placeholder:"请输入传真"},model:{value:e.form.fax,callback:function(t){e.$set(e.form,"fax",t)},expression:"form.fax"}})],1)],1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:e.onReset}},[e._v("重 置")]),r("el-button",{attrs:{type:"primary"},on:{click:e.onCertain}},[e._v("确 定")])],1)],1)},n=[],a=(r("96cf"),r("3b8d"));r("6b54");function s(e){var t=/^1[3456789]\d{9}$/;return t.test(e)}var i={data:function(){var e=function(e,t,r){s(t)?r():r(new Error("请输入正确格式的电话号码"))};return{show:!1,detail:{},form:{name:"",address:"",phone:"",fax:""},rules:{name:[{required:!0,message:"请输入客户名称",trigger:"blur"}],address:[{required:!0,message:"请输入客户地址",trigger:"blur"}],phone:[{required:!0,message:"请输入电话号码",trigger:"blur"},{validator:e,trigger:"blur"}]}}},computed:{},mounted:function(){},methods:{openDialog:function(){for(var e in this.form)this.form[e]=this.detail[e]||""},onCertain:function(){var e=this;this.$refs.form.validate(function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(r){var o,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(r){for(n in o={id:e.detail.id||(new Date).getTime()},e.form)o[n]=e.form[n];e.$db.putData("CUSTOMER_DATA",o).then((function(){e.$emit("success"),e.show=!1,e.detail.id?e.$message.success("修改客户信息成功！"):e.$message.success("新增客户信息成功！")}))}case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},onReset:function(){this.$refs.form.resetFields()}},components:{}},l=i,c=(r("20c5"),r("2877")),f=Object(c["a"])(l,o,n,!1,null,"23bc5b85",null);t["default"]=f.exports}}]);
//# sourceMappingURL=chunk-b6c5ebc2.d5ba9596.js.map