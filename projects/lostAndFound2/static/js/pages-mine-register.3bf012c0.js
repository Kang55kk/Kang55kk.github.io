(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-mine-register"],{"1bfc":function(e,t,a){"use strict";a.r(t);var n=a("4cd7"),o=a("a96c");for(var s in o)["default"].indexOf(s)<0&&function(e){a.d(t,e,(function(){return o[e]}))}(s);a("97b3");var i=a("f0c5"),r=Object(i["a"])(o["default"],n["b"],n["c"],!1,null,"0a6eda31",null,!1,n["a"],void 0);t["default"]=r.exports},"317d":function(e,t,a){e.exports=a.p+"static/img/unlogin.68d8ec94.png"},3968:function(e,t,a){"use strict";a("7a82");var n=a("4ea4").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o,s=n(a("8785"));a("ac1f"),a("00b4");var i={data:function(){return{username:"",password:"",confirmPassword:""}},methods:{handleRegister:function(){/^[a-zA-Z0-9]{6,20}$/.test(this.username)?this.password.length<7||/\s/.test(this.password)?uni.showToast({title:"密码长度必须大于6且不能含有空格",icon:"none"}):this.password===this.confirmPassword?uni.request({method:"POST",url:this.apiRoot(o||(o=(0,s.default)(["register"]))),data:{username:this.username,password:this.password},success:function(e){console.log(e),200==e.data.code?uni.showToast({title:"注册成功",icon:"success"}):uni.showModal({showCancel:!1,title:"错误提示",content:e.data.msg})}}):uni.showToast({title:"两次输入的密码不一致",icon:"none"}):uni.showToast({title:"帐号由6到20位数字或字母组成！",icon:"none",duration:2500})}}};t.default=i},"3ecf":function(e,t,a){var n=a("ee52");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var o=a("4f06").default;o("0eb9ebcd",n,!0,{sourceMap:!1,shadowMode:!1})},"4cd7":function(e,t,a){"use strict";a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return o})),a.d(t,"a",(function(){}));var n=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"page"},[n("v-uni-view",{staticClass:"container"},[n("v-uni-image",{staticClass:"logo",attrs:{src:a("317d")}}),n("v-uni-view",{staticClass:"form-group"},[n("v-uni-input",{staticClass:"form-control",attrs:{type:"text",placeholder:"请输入账号"},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}})],1),n("v-uni-view",{staticClass:"form-group"},[n("v-uni-input",{staticClass:"form-control",attrs:{type:"password",placeholder:"请输入密码"},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})],1),n("v-uni-view",{staticClass:"form-group"},[n("v-uni-input",{staticClass:"form-control",attrs:{type:"password",placeholder:"请再次输入密码"},model:{value:e.confirmPassword,callback:function(t){e.confirmPassword=t},expression:"confirmPassword"}})],1),n("v-uni-view",{staticClass:"btn-container"},[n("v-uni-button",{staticClass:"register-btn",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.handleRegister.apply(void 0,arguments)}}},[e._v("注册")])],1),n("v-uni-view",{staticClass:"logIn"},[e._v("已有账号，去登陆")])],1)],1)},o=[]},8785:function(e,t,a){"use strict";a("7a82"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){t||(t=e.slice(0));return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))},a("fb6a"),a("dca8"),a("1d1c")},"97b3":function(e,t,a){"use strict";var n=a("3ecf"),o=a.n(n);o.a},a96c:function(e,t,a){"use strict";a.r(t);var n=a("3968"),o=a.n(n);for(var s in n)["default"].indexOf(s)<0&&function(e){a.d(t,e,(function(){return n[e]}))}(s);t["default"]=o.a},dca8:function(e,t,a){var n=a("23e7"),o=a("bb2f"),s=a("d039"),i=a("861d"),r=a("f183").onFreeze,c=Object.freeze,d=s((function(){c(1)}));n({target:"Object",stat:!0,forced:d,sham:!o},{freeze:function(e){return c&&i(e)?c(r(e)):e}})},ee52:function(e,t,a){var n=a("24fb");t=n(!1),t.push([e.i,".page[data-v-0a6eda31]{height:calc(100vh - 44px)}.page .logIn[data-v-0a6eda31]{font-size:10px;margin-top:%?10?%;color:#0065cc}.container[data-v-0a6eda31]{background-color:#fff;display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;background-color:#f2f2f2}.logo[data-v-0a6eda31]{width:200px;height:200px;box-sizing:border-box;padding:30px}.form-group[data-v-0a6eda31]{margin-bottom:20px}.form-control[data-v-0a6eda31]{width:80vw;max-width:300px;height:40px;line-height:40px;padding:0 10px;border:none;border-radius:4px;background-color:#fff;font-size:16px;box-shadow:rgba(136,165,191,.48) 0 2px 4px 0,hsla(0,0%,100%,.8) 0 1px 0 0 inset}.btn-container[data-v-0a6eda31]{margin-top:30px}.register-btn[data-v-0a6eda31]{display:inline-block;width:200px;height:50px;line-height:50px;text-align:center;background-color:#007aff;color:#fff;border-radius:25px;font-size:18px;box-shadow:rgba(0,0,0,.3) 0 2px 4px}",""]),e.exports=t}}]);