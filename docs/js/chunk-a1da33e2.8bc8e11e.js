(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a1da33e2"],{"397c":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-form",{attrs:{inline:!0}},[a("el-form-item",{attrs:{label:"送货单号"}},[a("el-input",{attrs:{placeholder:"请输入送货单号"},on:{change:e.searchTableData},model:{value:e.form.num,callback:function(t){e.$set(e.form,"num",t)},expression:"form.num"}})],1),a("el-form-item",{attrs:{label:"客户名称"}},[a("el-select",{attrs:{filterable:"",placeholder:"请选择客户"},on:{change:e.searchTableData},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}},e._l(e.customerList,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),a("el-form-item",{attrs:{label:"送货时间"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"选择送货日期"},on:{change:e.searchTableData},model:{value:e.form.date,callback:function(t){e.$set(e.form,"date",t)},expression:"form.date"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.onAddClick}},[e._v("新增")])],1)],1),a("el-table",{staticClass:"table",attrs:{data:e.tableData,height:"500px"}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-table",{staticClass:"expand-table",attrs:{data:t.row.productData}},e._l(e.expandTableHeader,(function(t){return a("el-table-column",{key:t.name,attrs:{prop:t.name,label:t.title,width:t.width||""},scopedSlots:e._u([{key:"default",fn:function(n){return[a("span",[e._v(e._s(n.row[t.name]||"--"))])]}}],null,!0)})})),1)]}}])}),e._l(e.tableHeader,(function(t){return a("el-table-column",{key:t.name,attrs:{prop:t.name,label:t.title,width:t.width||""},scopedSlots:e._u([{key:"default",fn:function(n){return[a("span",[e._v(e._s(n.row[t.name]||"--"))])]}}],null,!0)})})),a("el-table-column",{attrs:{width:"230px",label:"操作",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){return e.onEditClick(t.$index,t.row)}}},[e._v("编辑")]),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.onDeleteClick(t.$index)}}},[e._v("删除")]),a("el-button",{attrs:{size:"mini",type:"primary",loading:t.row.isPrint},on:{click:function(a){return e.onPrintClick(t.row,t.$index)}}},[e._v("打印")])]}}])})],2),a("el-pagination",{staticClass:"page",attrs:{"current-page":e.currentPage,"page-sizes":[50,100,200,400],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.onSizeChange,"current-change":e.onCurrentChange}}),a("add-dialog",{ref:"addDialog",on:{success:e.searchTableData}}),a("print-preview",{ref:"printPreview"})],1)},i=[],r=(a("7f7f"),{data:function(){return{form:{num:"",name:"",date:""},customerList:[],tableHeader:[{title:"序号",name:"sort"},{title:"状态",name:"state"},{title:"送货单号",name:"num"},{title:"客户名称",name:"customerName"},{title:"客户地址",name:"address",width:200},{title:"联系电话",name:"phone",width:100},{title:"送货时间",name:"date",width:100}],tableData:[],expandTableHeader:[{title:"产品名称",name:"productName"},{title:"净尺寸规格",name:"generalStandards",width:150},{title:"毛尺寸规格",name:"additionalStandards",width:150},{title:"件数",name:"amount"},{title:"重量",name:"weight"},{title:"单价",name:"unitPrice"},{title:"金额",name:"price"},{title:"材料费",name:"material"},{title:"精加工",name:"machining"},{title:"飞边",name:"flashSide"},{title:"气割费",name:"gasCut"},{title:"锯费",name:"saw"},{title:"总金额",name:"totalPrice"},{title:"备注",name:"remarks"}],currentPage:1,pageSize:50,total:0}},computed:{},mounted:function(){this.reFindCustomerList(),this.reFindTableData()},methods:{reFindCustomerList:function(){var e=this;return this.$db.getData("CUSTOMER_DATA").then((function(t){e.customerList=t.data}))},reFindTableData:function(){var e=this,t=this.pageSize,a=this.currentPage,n=this.form,i=n.num,r=n.name,l=n.date;this.$db.getData("DELIVERYNOTE_DATA",{pageSize:t,pageIndex:a,search:[{name:"num",value:i},{name:"name",value:r},{name:"date",value:l}]}).then((function(n){e.tableData=n.data.map((function(e,n){return e.sort=t*(a-1)+n+1,e.isPrint=!1,e})),e.total=n.total}))},searchTableData:function(){this.currentPage=1,this.reFindTableData()},onAddClick:function(){this.$refs.addDialog.detail={},this.$refs.addDialog.show=!0},onPrintClick:function(e,t){e.isPrint=!0,this.$refs.printPreview.index=t,this.$refs.printPreview.detail=e,this.$refs.printPreview.printPreview()},onEditClick:function(e,t){this.$refs.addDialog.detail=t,this.$refs.addDialog.show=!0},onDeleteClick:function(e){var t=this;this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.tableData.splice(e,1),t.$message({type:"success",message:"删除成功!"})}))},onSizeChange:function(){this.reFindTableData()},onCurrentChange:function(e){this.currentPage=e,this.reFindTableData()}},components:{addDialog:function(){return Promise.all([a.e("chunk-527c49d7"),a.e("chunk-0708de08")]).then(a.bind(null,"4890"))},printPreview:function(){return Promise.all([a.e("chunk-3f7bc161"),a.e("chunk-193156a4")]).then(a.bind(null,"d901"))}}}),l=r,o=(a("8708"),a("2877")),s=Object(o["a"])(l,n,i,!1,null,"aa27eeae",null);t["default"]=s.exports},8708:function(e,t,a){"use strict";var n=a("d89d"),i=a.n(n);i.a},d89d:function(e,t,a){}}]);
//# sourceMappingURL=chunk-a1da33e2.8bc8e11e.js.map