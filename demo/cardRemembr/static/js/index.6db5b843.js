(function(n){function e(e){for(var o,a,u=e[0],c=e[1],f=e[2],d=0,s=[];d<u.length;d++)a=u[d],Object.prototype.hasOwnProperty.call(i,a)&&i[a]&&s.push(i[a][0]),i[a]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(n[o]=c[o]);l&&l(e);while(s.length)s.shift()();return r.push.apply(r,f||[]),t()}function t(){for(var n,e=0;e<r.length;e++){for(var t=r[e],o=!0,u=1;u<t.length;u++){var c=t[u];0!==i[c]&&(o=!1)}o&&(r.splice(e--,1),n=a(a.s=t[0]))}return n}var o={},i={index:0},r=[];function a(e){if(o[e])return o[e].exports;var t=o[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,a),t.l=!0,t.exports}a.e=function(n){var e=[],t=i[n];if(0!==t)if(t)e.push(t[2]);else{var o=new Promise((function(e,o){t=i[n]=[e,o]}));e.push(t[2]=o);var r,u=document.createElement("script");u.charset="utf-8",u.timeout=120,a.nc&&u.setAttribute("nonce",a.nc),u.src=function(n){return a.p+"static/js/"+({"pages-index-index":"pages-index-index"}[n]||n)+"."+{"pages-index-index":"9d9cbff8"}[n]+".js"}(n);var c=new Error;r=function(e){u.onerror=u.onload=null,clearTimeout(f);var t=i[n];if(0!==t){if(t){var o=e&&("load"===e.type?"missing":e.type),r=e&&e.target&&e.target.src;c.message="Loading chunk "+n+" failed.\n("+o+": "+r+")",c.name="ChunkLoadError",c.type=o,c.request=r,t[1](c)}i[n]=void 0}};var f=setTimeout((function(){r({type:"timeout",target:u})}),12e4);u.onerror=u.onload=r,document.head.appendChild(u)}return Promise.all(e)},a.m=n,a.c=o,a.d=function(n,e,t){a.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:t})},a.r=function(n){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},a.t=function(n,e){if(1&e&&(n=a(n)),8&e)return n;if(4&e&&"object"===typeof n&&n&&n.__esModule)return n;var t=Object.create(null);if(a.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var o in n)a.d(t,o,function(e){return n[e]}.bind(null,o));return t},a.n=function(n){var e=n&&n.__esModule?function(){return n["default"]}:function(){return n};return a.d(e,"a",e),e},a.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},a.p="./",a.oe=function(n){throw console.error(n),n};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],c=u.push.bind(u);u.push=e,u=u.slice();for(var f=0;f<u.length;f++)e(u[f]);var l=c;r.push([0,"chunk-vendors"]),t()})({0:function(n,e,t){n.exports=t("67ec")},"400e":function(n,e,t){"use strict";(function(n){var e=t("4ea4").default;t("13d5"),t("d3b7"),t("ddb0"),t("ac1f"),t("5319");var o=e(t("e143")),i={keys:function(){return[]}};n["____3F7FE15____"]=!0,delete n["____3F7FE15____"],n.__uniConfig={globalStyle:{navigationBarTitleText:"卡牌记忆",navigationBarBackgroundColor:"white",navigationBarTextStyle:"black",bounce:"none"},uniIdRouter:{}},n.__uniConfig.compilerVersion="3.7.3",n.__uniConfig.darkmode=!1,n.__uniConfig.themeConfig={},n.__uniConfig.uniPlatform="h5",n.__uniConfig.appId="__UNI__3F7FE15",n.__uniConfig.appName="cardRemember",n.__uniConfig.appVersion="1.0.0",n.__uniConfig.appVersionCode="100",n.__uniConfig.router={mode:"hash",base:"./"},n.__uniConfig.publicPath="./",n.__uniConfig["async"]={loading:"AsyncLoading",error:"AsyncError",delay:200,timeout:6e4},n.__uniConfig.debug=!1,n.__uniConfig.networkTimeout={request:6e4,connectSocket:6e4,uploadFile:6e4,downloadFile:6e4},n.__uniConfig.sdkConfigs={},n.__uniConfig.qqMapKey=void 0,n.__uniConfig.googleMapKey=void 0,n.__uniConfig.aMapKey=void 0,n.__uniConfig.aMapSecurityJsCode=void 0,n.__uniConfig.aMapServiceHost=void 0,n.__uniConfig.locale="",n.__uniConfig.fallbackLocale=void 0,n.__uniConfig.locales=i.keys().reduce((function(n,e){var t=e.replace(/\.\/(uni-app.)?(.*).json/,"$2"),o=i(e);return Object.assign(n[t]||(n[t]={}),o.common||o),n}),{}),n.__uniConfig.nvue={"flex-direction":"column"},n.__uniConfig.__webpack_chunk_load__=t.e,o.default.component("pages-index-index",(function(n){var e={component:t.e("pages-index-index").then(function(){return n(t("7379"))}.bind(null,t)).catch(t.oe),delay:__uniConfig["async"].delay,timeout:__uniConfig["async"].timeout};return __uniConfig["async"]["loading"]&&(e.loading={name:"SystemAsyncLoading",render:function(n){return n(__uniConfig["async"]["loading"])}}),__uniConfig["async"]["error"]&&(e.error={name:"SystemAsyncError",render:function(n){return n(__uniConfig["async"]["error"])}}),e})),n.__uniRoutes=[{path:"/",alias:"/pages/index/index",component:{render:function(n){return n("Page",{props:Object.assign({isQuit:!0,isEntry:!0},__uniConfig.globalStyle,{navigationBarTitleText:"卡牌记忆"})},[n("pages-index-index",{slot:"page"})])}},meta:{id:1,name:"pages-index-index",isNVue:!1,maxWidth:0,pagePath:"pages/index/index",isQuit:!0,isEntry:!0,windowTop:44}},{path:"/choose-location",component:{render:function(n){return n("Page",{props:{navigationStyle:"custom"}},[n("system-choose-location",{slot:"page"})])}},meta:{name:"choose-location",pagePath:"/choose-location"}},{path:"/open-location",component:{render:function(n){return n("Page",{props:{navigationStyle:"custom"}},[n("system-open-location",{slot:"page"})])}},meta:{name:"open-location",pagePath:"/open-location"}}],n.UniApp&&new n.UniApp}).call(this,t("c8ba"))},"555b":function(n,e,t){"use strict";t.r(e);var o=t("d524"),i=t("922e");for(var r in i)["default"].indexOf(r)<0&&function(n){t.d(e,n,(function(){return i[n]}))}(r);t("9a7c");var a=t("f0c5"),u=Object(a["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],void 0);e["default"]=u.exports},6746:function(n,e,t){var o=t("aa10");o.__esModule&&(o=o.default),"string"===typeof o&&(o=[[n.i,o,""]]),o.locals&&(n.exports=o.locals);var i=t("4f06").default;i("54e90c5a",o,!0,{sourceMap:!1,shadowMode:!1})},"67ec":function(n,e,t){"use strict";var o=t("4ea4").default;t("d3b7");var i=o(t("5530")),r=o(t("53ca"));t("e260"),t("e6cf"),t("cca6"),t("a79d"),t("400e"),t("1c31");var a=o(t("555b")),u=o(t("e143"));u.default.config.productionTip=!1,a.default.mpType="app";try{uni.addInterceptor({returnValue:function(n){return function(n){return!!n&&("object"===(0,r.default)(n)||"function"===typeof n)&&"function"===typeof n.then}(n)?new Promise((function(e,t){n.then((function(n){n[0]?t(n[0]):e(n[1])}))})):n}})}catch(f){}var c=new u.default((0,i.default)({},a.default));c.$mount()},7933:function(n,e,t){"use strict";t("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={onLaunch:function(){uni.showLoading({title:"加载中"})},onShow:function(){},onHide:function(){}};e.default=o},"922e":function(n,e,t){"use strict";t.r(e);var o=t("7933"),i=t.n(o);for(var r in o)["default"].indexOf(r)<0&&function(n){t.d(e,n,(function(){return o[n]}))}(r);e["default"]=i.a},"9a7c":function(n,e,t){"use strict";var o=t("6746"),i=t.n(o);i.a},aa10:function(n,e,t){var o=t("24fb");e=o(!1),e.push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/*每个页面公共css */.uni-app--maxwidth{\n\t/* background-color: black; */width:100vw;height:100vh;overflow:hidden;display:flex;justify-content:center;align-items:center}",""]),n.exports=e},d524:function(n,e,t){"use strict";t.d(e,"b",(function(){return o})),t.d(e,"c",(function(){return i})),t.d(e,"a",(function(){}));var o=function(){var n=this.$createElement,e=this._self._c||n;return e("App",{attrs:{keepAliveInclude:this.keepAliveInclude}})},i=[]}});