(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-280cea7a"],{"02f4":function(t,e,r){var n=r("4588"),a=r("be13");t.exports=function(t){return function(e,r){var i,o,c=String(a(e)),u=n(r),s=c.length;return u<0||u>=s?t?"":void 0:(i=c.charCodeAt(u),i<55296||i>56319||u+1===s||(o=c.charCodeAt(u+1))<56320||o>57343?t?c.charAt(u):i:t?c.slice(u,u+2):o-56320+(i-55296<<10)+65536)}}},"0390":function(t,e,r){"use strict";var n=r("02f4")(!0);t.exports=function(t,e,r){return e+(r?n(t,e).length:1)}},"11e9":function(t,e,r){var n=r("52a7"),a=r("4630"),i=r("6821"),o=r("6a99"),c=r("69a8"),u=r("c69a"),s=Object.getOwnPropertyDescriptor;e.f=r("9e1e")?s:function(t,e){if(t=i(t),e=o(e,!0),u)try{return s(t,e)}catch(r){}if(c(t,e))return a(!n.f.call(t,e),t[e])}},"1af6":function(t,e,r){var n=r("63b6");n(n.S,"Array",{isArray:r("9003")})},"1c4c":function(t,e,r){"use strict";var n=r("9b43"),a=r("5ca1"),i=r("4bf8"),o=r("1fa8"),c=r("33a4"),u=r("9def"),s=r("f1ae"),f=r("27ee");a(a.S+a.F*!r("5cc5")((function(t){Array.from(t)})),"Array",{from:function(t){var e,r,a,l,d=i(t),p="function"==typeof this?this:Array,h=arguments.length,v=h>1?arguments[1]:void 0,m=void 0!==v,b=0,g=f(d);if(m&&(v=n(v,h>2?arguments[2]:void 0,2)),void 0==g||p==Array&&c(g))for(e=u(d.length),r=new p(e);e>b;b++)s(r,b,m?v(d[b],b):d[b]);else for(l=g.call(d),r=new p;!(a=l.next()).done;b++)s(r,b,m?o(l,v,[a.value,b],!0):a.value);return r.length=b,r}})},"469f":function(t,e,r){r("6c1c"),r("1654"),t.exports=r("7d7b")},"504c":function(t,e,r){var n=r("9e1e"),a=r("0d58"),i=r("6821"),o=r("52a7").f;t.exports=function(t){return function(e){var r,c=i(e),u=a(c),s=u.length,f=0,l=[];while(s>f)r=u[f++],n&&!o.call(c,r)||l.push(t?[r,c[r]]:c[r]);return l}}},"54a1":function(t,e,r){r("6c1c"),r("1654"),t.exports=r("95d5")},"5d73":function(t,e,r){t.exports=r("469f")},"5dbc":function(t,e,r){var n=r("d3f4"),a=r("8b97").set;t.exports=function(t,e,r){var i,o=e.constructor;return o!==r&&"function"==typeof o&&(i=o.prototype)!==r.prototype&&n(i)&&a&&a(t,i),t}},"5df3":function(t,e,r){"use strict";var n=r("02f4")(!0);r("01f9")(String,"String",(function(t){this._t=String(t),this._i=0}),(function(){var t,e=this._t,r=this._i;return r>=e.length?{value:void 0,done:!0}:(t=n(e,r),this._i+=t.length,{value:t,done:!1})}))},"768b":function(t,e,r){"use strict";var n=r("a745"),a=r.n(n);function i(t){if(a()(t))return t}var o=r("5d73"),c=r.n(o),u=r("c8bb"),s=r.n(u);function f(t,e){if(s()(Object(t))||"[object Arguments]"===Object.prototype.toString.call(t)){var r=[],n=!0,a=!1,i=void 0;try{for(var o,u=c()(t);!(n=(o=u.next()).done);n=!0)if(r.push(o.value),e&&r.length===e)break}catch(f){a=!0,i=f}finally{try{n||null==u["return"]||u["return"]()}finally{if(a)throw i}}return r}}function l(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function d(t,e){return i(t)||f(t,e)||l()}r.d(e,"a",(function(){return d}))},"7d7b":function(t,e,r){var n=r("e4ae"),a=r("7cd6");t.exports=r("584a").getIterator=function(t){var e=a(t);if("function"!=typeof e)throw TypeError(t+" is not iterable!");return n(e.call(t))}},"8b97":function(t,e,r){var n=r("d3f4"),a=r("cb7c"),i=function(t,e){if(a(t),!n(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,n){try{n=r("9b43")(Function.call,r("11e9").f(Object.prototype,"__proto__").set,2),n(t,[]),e=!(t instanceof Array)}catch(a){e=!0}return function(t,r){return i(t,r),e?t.__proto__=r:n(t,r),t}}({},!1):void 0),check:i}},9093:function(t,e,r){var n=r("ce10"),a=r("e11e").concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return n(t,a)}},"95d5":function(t,e,r){var n=r("40c3"),a=r("5168")("iterator"),i=r("481b");t.exports=r("584a").isIterable=function(t){var e=Object(t);return void 0!==e[a]||"@@iterator"in e||i.hasOwnProperty(n(e))}},a481:function(t,e,r){"use strict";var n=r("cb7c"),a=r("4bf8"),i=r("9def"),o=r("4588"),c=r("0390"),u=r("5f1b"),s=Math.max,f=Math.min,l=Math.floor,d=/\$([$&`']|\d\d?|<[^>]*>)/g,p=/\$([$&`']|\d\d?)/g,h=function(t){return void 0===t?t:String(t)};r("214f")("replace",2,(function(t,e,r,v){return[function(n,a){var i=t(this),o=void 0==n?void 0:n[e];return void 0!==o?o.call(n,i,a):r.call(String(i),n,a)},function(t,e){var a=v(r,t,this,e);if(a.done)return a.value;var l=n(t),d=String(this),p="function"===typeof e;p||(e=String(e));var b=l.global;if(b){var g=l.unicode;l.lastIndex=0}var y=[];while(1){var _=u(l,d);if(null===_)break;if(y.push(_),!b)break;var w=String(_[0]);""===w&&(l.lastIndex=c(d,i(l.lastIndex),g))}for(var I="",x=0,A=0;A<y.length;A++){_=y[A];for(var S=String(_[0]),N=s(f(o(_.index),d.length),0),E=[],O=1;O<_.length;O++)E.push(h(_[O]));var C=_.groups;if(p){var P=[S].concat(E,N,d);void 0!==C&&P.push(C);var k=String(e.apply(void 0,P))}else k=m(S,d,N,E,C,e);N>=x&&(I+=d.slice(x,N)+k,x=N+S.length)}return I+d.slice(x)}];function m(t,e,n,i,o,c){var u=n+t.length,s=i.length,f=p;return void 0!==o&&(o=a(o),f=d),r.call(c,f,(function(r,a){var c;switch(a.charAt(0)){case"$":return"$";case"&":return t;case"`":return e.slice(0,n);case"'":return e.slice(u);case"<":c=o[a.slice(1,-1)];break;default:var f=+a;if(0===f)return r;if(f>s){var d=l(f/10);return 0===d?r:d<=s?void 0===i[d-1]?a.charAt(1):i[d-1]+a.charAt(1):r}c=i[f-1]}return void 0===c?"":c}))}}))},a745:function(t,e,r){t.exports=r("f410")},aa77:function(t,e,r){var n=r("5ca1"),a=r("be13"),i=r("79e5"),o=r("fdef"),c="["+o+"]",u="​",s=RegExp("^"+c+c+"*"),f=RegExp(c+c+"*$"),l=function(t,e,r){var a={},c=i((function(){return!!o[t]()||u[t]()!=u})),s=a[t]=c?e(d):o[t];r&&(a[r]=s),n(n.P+n.F*c,"String",a)},d=l.trim=function(t,e){return t=String(a(t)),1&e&&(t=t.replace(s,"")),2&e&&(t=t.replace(f,"")),t};t.exports=l},c2fb:function(t,e,r){},c5f6:function(t,e,r){"use strict";var n=r("7726"),a=r("69a8"),i=r("2d95"),o=r("5dbc"),c=r("6a99"),u=r("79e5"),s=r("9093").f,f=r("11e9").f,l=r("86cc").f,d=r("aa77").trim,p="Number",h=n[p],v=h,m=h.prototype,b=i(r("2aeb")(m))==p,g="trim"in String.prototype,y=function(t){var e=c(t,!1);if("string"==typeof e&&e.length>2){e=g?e.trim():d(e,3);var r,n,a,i=e.charCodeAt(0);if(43===i||45===i){if(r=e.charCodeAt(2),88===r||120===r)return NaN}else if(48===i){switch(e.charCodeAt(1)){case 66:case 98:n=2,a=49;break;case 79:case 111:n=8,a=55;break;default:return+e}for(var o,u=e.slice(2),s=0,f=u.length;s<f;s++)if(o=u.charCodeAt(s),o<48||o>a)return NaN;return parseInt(u,n)}}return+e};if(!h(" 0o1")||!h("0b1")||h("+0x1")){h=function(t){var e=arguments.length<1?0:t,r=this;return r instanceof h&&(b?u((function(){m.valueOf.call(r)})):i(r)!=p)?o(new v(y(e)),r,h):y(e)};for(var _,w=r("9e1e")?s(v):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),I=0;w.length>I;I++)a(v,_=w[I])&&!a(h,_)&&l(h,_,f(v,_));h.prototype=m,m.constructor=h,r("2aba")(n,p,h)}},c8bb:function(t,e,r){t.exports=r("54a1")},d6a5:function(t,e,r){"use strict";var n=r("c2fb"),a=r.n(n);a.a},d901:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"print"}},[r("h2",[t._v(t._s(t.companyInfo.name))]),r("div",[t._v("地址:"+t._s(t.companyInfo.address))]),r("span",{staticClass:"tel"},[t._v("电话:"+t._s(t.companyInfo.tel))]),r("span",[t._v("传真:"+t._s(t.companyInfo.fax))]),r("div",{staticClass:"title"},[r("h2",[t._v("1 2 3")]),r("span",{staticClass:"title__odd-numbers"},[t._v("No."+t._s(t.detail.num))])]),r("div",{staticClass:"customer"},[r("span",[t._v("客户姓名:"+t._s(t.detail.customerName))]),r("span",{staticClass:"customer__address"},[t._v("客户地址:"+t._s(t.detail.address))]),r("span",[t._v("客户电话:"+t._s(t.detail.phone))]),r("span",[t._v("送货时间:"+t._s(t.detail.date))]),r("span",[t._v("制单人:"+t._s(t.$store.state.userInfo.name))])]),r("el-table",{staticClass:"table",staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"","span-method":t.arraySpanMethod}},t._l(t.tableHeader,(function(t){return r("el-table-column",{key:t.name,attrs:{prop:t.name,label:t.title,width:t.width||""}})})),1),r("h5",[t._v("注：以上货品请核对重量，如有质量问题，请在收货后三天内通知本公司，逾期恕不负责")]),t._m(0)],1)},a=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"print-footer"},[r("span",[t._v("送货单位及经手人(盖章)：")]),r("span",[t._v("收货单位及经手人(盖章)：")])])}],i=(r("a481"),r("c5f6"),r("768b")),o=(r("ffc1"),r("5df3"),r("1c4c"),r("ac6a"),r("96cf"),r("3b8d")),c={data:function(){return{show:!1,detail:{},companyInfo:{},tableData:[],tableHeader:[{title:"序号",name:"sort",width:50},{title:"产品名称",name:"name"},{title:"规格",name:"standards"},{title:"重量",name:"weight"},{title:"单价",name:"unitPrice"},{title:"材料费",name:"material"},{title:"加工费",name:"machinPrice"},{title:"金额",name:"totalPrice"},{title:"备注",name:"remarks",width:150}]}},computed:{},mounted:function(){},methods:{arraySpanMethod:function(t){var e=t.rowIndex,r=t.columnIndex;if(e===this.tableData.length-1)return 0===r?[1,7]:7===r?[1,2]:[0,0]},reFindCompanyInfo:function(){var t=this;return this.$db.getData("COMPANY_INFO").then((function(e){e.total&&(t.companyInfo=e.data[0])}))},printPreview:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){var e,r,n=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.reFindCompanyInfo();case 2:for(this.tableData=this.detail.productData.map((function(t,e){return{sort:e+1,name:t.productName,standards:t.generalStandards,weight:t.weight,unitPrice:t.unitPrice,totalPrice:t.totalPrice,remarks:t.remarks}})),e=this.tableData.length;e<9;e++)this.tableData.push({});r=this.detail.productData.reduce((function(t,e){return t+e.totalPrice}),0).toFixed(2),this.tableData.push({sort:"合计金额(大写)：".concat(this.digitUppercase(r)),totalPrice:"(小写)：¥".concat(r)}),setTimeout((function(){n.printPartial(document.querySelector("#print"))}),0);case 7:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),printPartial:function(t){if(t){var e=document.createElement("span"),r=document.querySelectorAll("style, link, meta"),n=document.createElement("title");n.innerText="送货单",e.appendChild(n),Array.from(r).forEach((function(t){e.appendChild(t.cloneNode(!0))})),e.appendChild(t.cloneNode(!0));var a=e.innerHTML;e=null;var o=document.createElement("iframe"),c={height:0,width:0,border:0,wmode:"Opaque"},u={position:"absolute",top:"-999px",left:"-999px"};Object.entries(c).forEach((function(t){var e=Object(i["a"])(t,2),r=e[0],n=e[1];return o.setAttribute(r,n)})),Object.entries(u).forEach((function(t){var e=Object(i["a"])(t,2),r=e[0],n=e[1];return o.style[r]=n})),document.body.insertBefore(o,document.body.children[0]);var s=o.contentWindow,f=s.document;f.write("<!doctype html>"),f.write(a),s.focus(),setTimeout((function(){s.print(),document.body.removeChild(o)}),1e3)}},digitUppercase:function(t){var e=["角","分"],r=["零","壹","贰","叁","肆","伍","陆","柒","捌","玖"],n=[["元","万","亿"],["","拾","佰","仟"]],a=Number(t);if("number"===typeof a){var i=a<0?"-":"";a=Math.abs(a);for(var o="",c=0;c<e.length;c++)o+=(r[Math.floor(100*a/10*Math.pow(10,c))%10]+e[c]).replace(/零./,"");o=o||"整",a=Math.floor(a);for(var u=0;u<n[0].length&&a>0;u++){for(var s="",f=0;f<n[1].length&&a>0;f++)s=r[a%10]+n[1][f]+s,a=Math.floor(a/10);o=s.replace(/(零.)*零$/,"").replace(/^$/,"零")+n[0][u]+o}return i+o.replace(/(零.)*零元/,"元").replace(/(零.)+/g,"零").replace(/^整$/,"零元整")}return""}},components:{}},u=c,s=(r("d6a5"),r("2877")),f=Object(s["a"])(u,n,a,!1,null,"11f01cae",null);e["default"]=f.exports},f1ae:function(t,e,r){"use strict";var n=r("86cc"),a=r("4630");t.exports=function(t,e,r){e in t?n.f(t,e,a(0,r)):t[e]=r}},f410:function(t,e,r){r("1af6"),t.exports=r("584a").Array.isArray},fdef:function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"},ffc1:function(t,e,r){var n=r("5ca1"),a=r("504c")(!0);n(n.S,"Object",{entries:function(t){return a(t)}})}}]);
//# sourceMappingURL=chunk-280cea7a.923e83d6.js.map