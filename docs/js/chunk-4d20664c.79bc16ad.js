(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4d20664c"],{"02e2":function(e,t,a){},"0b7e":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-form",{staticClass:"form",attrs:{inline:!0}},[a("el-form-item",{attrs:{label:"客户名称"}},[a("el-input",{attrs:{placeholder:"请输入客户名称"},on:{change:e.searchTableData},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),a("el-form-item",{attrs:{label:"客户号码"}},[a("el-input",{attrs:{placeholder:"请输入客户号码"},on:{change:e.searchTableData},model:{value:e.form.phone,callback:function(t){e.$set(e.form,"phone",t)},expression:"form.phone"}})],1),a("el-button",{attrs:{type:"primary"},on:{click:e.onAddClick}},[e._v("新增")])],1),a("el-table",{staticClass:"table",attrs:{data:e.tableData,height:"500px"}},[e._l(e.tableHeader,(function(t){return a("el-table-column",{key:t.name,attrs:{prop:t.name,label:t.title,width:t.width||""},scopedSlots:e._u([{key:"default",fn:function(n){return[a("span",[e._v(e._s(n.row[t.name]||"--"))])]}}],null,!0)})})),a("el-table-column",{attrs:{width:"150px",label:"操作",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){return e.onEditClick(t.row)}}},[e._v("编辑")]),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.onDeleteClick(t.row)}}},[e._v("删除")])]}}])})],2),a("el-pagination",{staticClass:"page",attrs:{"current-page":e.currentPage,"page-sizes":[50,100,200,400],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.onSizeChange,"current-change":e.onCurrentChange}}),a("add-dialog",{ref:"addDialog",on:{success:e.searchTableData}})],1)},i=[],l=(a("7f7f"),{data:function(){return{form:{name:"",phone:""},tableHeader:[{title:"序号",name:"num",width:80},{title:"客户名称",name:"name"},{title:"联系电话",name:"phone"},{title:"客户地址",name:"address",width:250},{title:"传真",name:"fax"}],tableData:[],currentPage:1,pageSize:50,total:0}},computed:{},mounted:function(){this.reFindTableData()},methods:{searchTableData:function(){this.currentPage=1,this.reFindTableData()},reFindTableData:function(){var e=this,t=this.pageSize,a=this.currentPage,n=this.form,i=n.name,l=n.phone;this.$db.getData("CUSTOMER_DATA",{pageSize:t,pageIndex:a,search:[{name:"name",value:i},{name:"phone",value:l}]}).then((function(n){e.tableData=n.data.map((function(e,n){return e.num=t*(a-1)+n+1,e})),e.total=n.total}))},onAddClick:function(){this.$refs.addDialog.detail={},this.$refs.addDialog.show=!0},onEditClick:function(e){this.$refs.addDialog.detail=e,this.$refs.addDialog.show=!0},onDeleteClick:function(e){var t=this;this.$db.deleteData("CUSTOMER_DATA",e.id).then((function(){t.reFindTableData()}))},onSizeChange:function(){this.reFindTableData()},onCurrentChange:function(e){this.currentPage=e,this.reFindTableData()}},components:{addDialog:function(){return Promise.all([a.e("chunk-3f7bc161"),a.e("chunk-b6c5ebc2")]).then(a.bind(null,"b147"))}}}),o=l,r=(a("dd6b"),a("2877")),s=Object(r["a"])(o,n,i,!1,null,"67d97298",null);t["default"]=s.exports},dd6b:function(e,t,a){"use strict";var n=a("02e2"),i=a.n(n);i.a}}]);
//# sourceMappingURL=chunk-4d20664c.79bc16ad.js.map