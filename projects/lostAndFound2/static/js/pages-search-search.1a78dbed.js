(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-search-search"],{2909:function(t,e,i){"use strict";i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){return(0,n.default)(t)||(0,a.default)(t)||(0,s.default)(t)||(0,o.default)()};var n=r(i("6005")),a=r(i("db90")),s=r(i("06c5")),o=r(i("3427"));function r(t){return t&&t.__esModule?t:{default:t}}},3427:function(t,e,i){"use strict";i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},i("d9e2"),i("d401")},"35a5":function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"search-container"},[i("v-uni-view",{staticClass:"search-box"},[i("v-uni-image",{staticClass:"search-icon",attrs:{src:"/static/mix/search.png"}}),i("v-uni-input",{staticClass:"search-input",attrs:{type:"text",placeholder:"请输入关键词","auto-focus":!0},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.debouncedOnInput.apply(void 0,arguments)},confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.onSearch.apply(void 0,arguments)}},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}}),t.showClear?i("v-uni-view",{staticClass:"clear-icon",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onClear.apply(void 0,arguments)}}},[i("v-uni-image",{attrs:{src:"/static/mix/clear.png"}})],1):t._e()],1),t.showSuggest&&t.keyword.length?i("v-uni-view",{staticClass:"suggest-list"},t._l(t.suggestList.slice(0,10),(function(e,n){return i("v-uni-view",{key:n,staticClass:"suggest-item",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.onSelectSuggest(e,n)}}},[t._v(t._s(e))])})),1):t._e(),t.showHistory?i("v-uni-view",{staticClass:"history-list"},[i("v-uni-view",{staticClass:"row"},[i("v-uni-text",[t._v("历史搜索")]),i("v-uni-text",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onClearAllHistory.apply(void 0,arguments)}}},[t._v("清除所有记录")])],1),i("v-uni-view",{staticClass:"historyItemContainer"},t._l(t.historyList,(function(e,n){return i("v-uni-view",{key:n,staticClass:"history-item",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.onSelectSuggest(e,n)}}},[i("v-uni-text",{staticClass:"history-text"},[t._v(t._s(e))]),i("v-uni-view",{staticClass:"clear",on:{click:function(e){e.stopPropagation(),e.preventDefault(),arguments[0]=e=t.$handleEvent(e),t.onClearHistory(n)}}},[t._v("×")])],1)})),1)],1):t._e()],1)},a=[]},6005:function(t,e,i){"use strict";i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){if(Array.isArray(t))return(0,n.default)(t)};var n=function(t){return t&&t.__esModule?t:{default:t}}(i("6b75"))},"6f4f":function(t,e,i){"use strict";i.r(e);var n=i("35a5"),a=i("ccad");for(var s in a)["default"].indexOf(s)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(s);i("ebf8");var o=i("f0c5"),r=Object(o["a"])(a["default"],n["b"],n["c"],!1,null,"22d06bbe",null,!1,n["a"],void 0);e["default"]=r.exports},"7a73":function(t,e,i){var n=i("8146");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("bb26a8bc",n,!0,{sourceMap:!1,shadowMode:!1})},8146:function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,".search-container[data-v-22d06bbe]{display:flex;flex-direction:column;align-items:center;padding-top:20px;height:calc(100vh - 44px);background-color:#f7f7f7}.search-box[data-v-22d06bbe]{position:relative;display:flex;flex-direction:row;align-items:center;width:90%;height:50px;border-radius:25px;background-color:#f0f0f0}.search-icon[data-v-22d06bbe]{display:block;width:20px;height:20px;margin-left:10px}.search-input[data-v-22d06bbe]{flex:1;height:100%;padding:0 10px;font-size:16px;color:#333;background-color:initial;border:none;outline:none}.clear-icon[data-v-22d06bbe]{position:absolute;right:10px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);display:flex;justify-content:center;align-items:center;width:20px;height:20px;cursor:pointer}.clear-icon[data-v-22d06bbe] uni-image{height:20px}.suggest-list[data-v-22d06bbe]{display:flex;flex-direction:column;align-items:center;width:90%;background-color:#fff;box-shadow:0 2px 4px rgba(0,0,0,.1);z-index:99}.suggest-item[data-v-22d06bbe]{display:flex;justify-content:center;align-items:center;width:100%;height:40px;font-size:16px;color:#333;cursor:pointer}.history-list[data-v-22d06bbe]{display:flex;flex-direction:column;align-items:center;width:90%;margin-top:20px}.history-list .row[data-v-22d06bbe]{font-size:14px;display:flex;justify-content:space-between;width:100%;align-items:center;background-color:#f7f7f7}.history-list .row uni-text[data-v-22d06bbe]{display:inline-block}.history-list .row uni-text[data-v-22d06bbe]:nth-child(2){color:#00f}.historyItemContainer[data-v-22d06bbe]{width:100%;margin-top:%?20?%;display:flex;justify-content:flex-start;align-items:center;flex-wrap:wrap}.historyItemContainer .history-item[data-v-22d06bbe]{position:relative;display:flex;margin-right:10px;background-color:#fff;border-radius:50px;align-items:center;padding:5px 20px;margin-bottom:10px}.historyItemContainer .history-item .history-text[data-v-22d06bbe]{font-size:15px;display:inline-block;margin-right:20px}.historyItemContainer .history-item .clear[data-v-22d06bbe]{font-size:25px;line-height:25px;display:inline-block;vertical-align:middle;box-sizing:border-box;margin-bottom:2px}.clear-all[data-v-22d06bbe]{width:100%;height:50px;line-height:50px;font-size:16px;color:#333;text-align:center;cursor:pointer}",""]),t.exports=e},8785:function(t,e,i){"use strict";i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t,e){e||(e=t.slice(0));return Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(e)}}))},i("fb6a"),i("dca8"),i("1d1c")},ccad:function(t,e,i){"use strict";i.r(e);var n=i("d777"),a=i.n(n);for(var s in n)["default"].indexOf(s)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(s);e["default"]=a.a},d777:function(t,e,i){"use strict";i("7a82");var n=i("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("d81d"),i("c975"),i("99af"),i("fb6a"),i("a434");var a,s=n(i("2909")),o=n(i("8785")),r={data:function(){return{keyword:"",suggestList:[],historyList:[],debouncedOnInput:_.debounce(this.onInput,300),suggestDataList:[]}},computed:{showClear:function(){return this.keyword&&this.keyword.length>0},showSuggest:function(){return this.suggestList&&this.suggestList.length>0},showHistory:function(){return this.historyList&&this.historyList.length>0}},methods:{onInput:function(t){var e=this;uni.request({url:this.apiRoot(a||(a=(0,o.default)(["hint"]))),data:{keyWord:this.keyword},success:function(t){e.suggestDataList=t.data,e.suggestList=t.data.map((function(t){return t.name}))}}),this.keyword=t.target.value,this.keyword.length>0||(this.suggestList=[])},onSearch:function(t){this.addToHistory(this.keyword),this.suggestList=[],uni.navigateTo({url:"/pages/search/searchResult?keyword="+this.keyword})},onClear:function(){this.keyword="",this.suggestList=[]},onSelectSuggest:function(t){this.keyword=t,this.onSearch(t)},addToHistory:function(t){if(this.historyList.indexOf(t)<0){var e=[t].concat((0,s.default)(this.historyList));e.length>10&&e.pop(),this.historyList=e,uni.setStorage({key:"search_history",data:e})}},loadHistory:function(){var t=uni.getStorageSync("search_history")||[];this.historyList=t.slice(0,10)},onClearHistory:function(t){this.historyList.splice(t,1),uni.setStorage({key:"search_history",data:this.historyList})},onClearAllHistory:function(){this.historyList=[],uni.removeStorage({key:"search_history"})}},mounted:function(){this.loadHistory()}};e.default=r},dca8:function(t,e,i){var n=i("23e7"),a=i("bb2f"),s=i("d039"),o=i("861d"),r=i("f183").onFreeze,c=Object.freeze,l=s((function(){c(1)}));n({target:"Object",stat:!0,forced:l,sham:!a},{freeze:function(t){return c&&o(t)?c(r(t)):t}})},ebf8:function(t,e,i){"use strict";var n=i("7a73"),a=i.n(n);a.a}}]);