(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/bookDetail/bookDetail"],{"14d2":function(t,n,e){},"39a1":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=c(e("a34a")),a=c(e("bcb2"));function c(t){return t&&t.__esModule?t:{default:t}}function u(t,n,e,o,a,c,u){try{var r=t[c](u),i=r.value}catch(s){return void e(s)}r.done?n(i):Promise.resolve(i).then(o,a)}function r(t){return function(){var n=this,e=arguments;return new Promise((function(o,a){var c=t.apply(n,e);function r(t){u(c,o,a,r,i,"next",t)}function i(t){u(c,o,a,r,i,"throw",t)}r(void 0)}))}}var i,s=getApp().globalData.collectedBooks,l=function(){e.e("components/tabTop").then(function(){return resolve(e("e5bc"))}.bind(null,e)).catch(e.oe)},f=function(){e.e("components/pageTitle").then(function(){return resolve(e("ce25"))}.bind(null,e)).catch(e.oe)},d={data:function(){return{calHeight:0,tabIndex:0,collectStatus:!1,currentBook:{name:"",author:"",synopsis:"",imgurl:""},chapterCatalog:[]}},components:{tabTop:l,pageTitle:f},methods:{changeTabIndex:function(t){this.tabIndex=t},swiperChangeIndex:function(t){this.tabIndex=t.detail.current},toReadingPage:function(n){t.navigateTo({url:"/pages/reading/reading?chapterID=".concat(n)})},collectThisBook:function(){this.collectStatus=!this.collectStatus,t.showToast({icon:"none",title:this.collectStatus?"已收藏":"取消收藏成功"});var n=s.findIndex((function(t){return t.id===i}));this.collectStatus?s.push(this.currentBook):s.splice(n,1)}},onLoad:function(){var t=r(o.default.mark((function t(n){var e,a,c,u,r;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return i=Number(n.bookID),t.next=3,this.$http.get("/testSynopsis");case 3:if(e=t.sent,a=e.chapterCatalog,this.chapterCatalog=a,c=s.find((function(t){return t.id===i})),!c){t.next=10;break}return this.collectStatus=!0,t.abrupt("return",this.currentBook=c);case 10:return t.next=12,this.$http.get("/book");case 12:u=t.sent,r=u.list,this.currentBook=r.find((function(t){return t.id===i}));case 15:case"end":return t.stop()}}),t,this)})));function n(n){return t.apply(this,arguments)}return n}(),mounted:function(){var t=this;a.default.calSurplusHeight({pageID:this,pos:"cal",success:function(n){return t.calHeight=n}})}};n.default=d}).call(this,e("6e42")["default"])},"6abb":function(t,n,e){"use strict";e.r(n);var o=e("f4a5"),a=e("81a7");for(var c in a)"default"!==c&&function(t){e.d(n,t,(function(){return a[t]}))}(c);e("e9c0");var u,r=e("f0c5"),i=Object(r["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],u);n["default"]=i.exports},"7c87":function(t,n,e){"use strict";(function(t){e("bdde"),e("921b");o(e("66fd"));var n=o(e("6abb"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("6e42")["createPage"])},"81a7":function(t,n,e){"use strict";e.r(n);var o=e("39a1"),a=e.n(o);for(var c in o)"default"!==c&&function(t){e.d(n,t,(function(){return o[t]}))}(c);n["default"]=a.a},e9c0:function(t,n,e){"use strict";var o=e("14d2"),a=e.n(o);a.a},f4a5:function(t,n,e){"use strict";var o,a=function(){var t=this,n=t.$createElement;t._self._c},c=[];e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return c})),e.d(n,"a",(function(){return o}))}},[["7c87","common/runtime","common/vendor"]]]);