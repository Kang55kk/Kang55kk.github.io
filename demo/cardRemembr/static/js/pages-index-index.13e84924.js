(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-index"],{"0147":function(e,t,r){var n=r("c65c");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var a=r("4f06").default;a("c2248c26",n,!0,{sourceMap:!1,shadowMode:!1})},"029b":function(e,t,r){"use strict";r.d(t,"b",(function(){return n})),r.d(t,"c",(function(){return a})),r.d(t,"a",(function(){}));var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-uni-view",{staticClass:"cardRemember"},[r("v-uni-view",{staticClass:"cards"},e._l(e.cardsArr,(function(t,n){return r("v-uni-view",{key:n,staticClass:"card",class:t.text,style:t.front?"transform: rotateY(0deg);":"transform: rotateY(180deg);",on:{click:function(r){arguments[0]=r=e.$handleEvent(r),e.clickCard(t)}}},[r("v-uni-view",{staticClass:"back"}),r("v-uni-view",{staticClass:"front",style:{color:e.cardTextColor(t.text[1])}},[e._v(e._s(t.text))]),r("v-uni-view",{staticClass:"cardsBgr"})],1)})),1),r("v-uni-button",{staticClass:"Replays",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.Replays.apply(void 0,arguments)}}},[e._v("重新游戏")])],1)},a=[]},"086e":function(e,t,r){e.exports=r.p+"static/img/cardFront.7b37def1.svg"},"1de5":function(e,t,r){"use strict";e.exports=function(e,t){return t||(t={}),e=e&&e.__esModule?e.default:e,"string"!==typeof e?e:(/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),t.hash&&(e+=t.hash),/["'() \t\n]/.test(e)||t.needQuotes?'"'.concat(e.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):e)}},2682:function(e,t,r){"use strict";var n=r("0147"),a=r.n(n);a.a},2909:function(e,t,r){"use strict";r("7a82"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return(0,n.default)(e)||(0,a.default)(e)||(0,s.default)(e)||(0,o.default)()};var n=i(r("6005")),a=i(r("db90")),s=i(r("06c5")),o=i(r("3427"));function i(e){return e&&e.__esModule?e:{default:e}}},3427:function(e,t,r){"use strict";r("7a82"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},r("d9e2"),r("d401")},"36ee":function(e,t,r){"use strict";r.r(t);var n=r("cc1b"),a=r.n(n);for(var s in n)["default"].indexOf(s)<0&&function(e){r.d(t,e,(function(){return n[e]}))}(s);t["default"]=a.a},6005:function(e,t,r){"use strict";r("7a82"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){if(Array.isArray(e))return(0,n.default)(e)};var n=function(e){return e&&e.__esModule?e:{default:e}}(r("6b75"))},7379:function(e,t,r){"use strict";r.r(t);var n=r("029b"),a=r("36ee");for(var s in a)["default"].indexOf(s)<0&&function(e){r.d(t,e,(function(){return a[e]}))}(s);r("2682");var o=r("f0c5"),i=Object(o["a"])(a["default"],n["b"],n["c"],!1,null,"3396aa66",null,!1,n["a"],void 0);t["default"]=i.exports},c65c:function(e,t,r){var n=r("24fb"),a=r("1de5"),s=r("eecb"),o=r("086e"),i=r("e660");t=n(!1);var c=a(s),d=a(o),u=a(i);t.push([e.i,"uni-view[data-v-3396aa66]{display:flex;justify-content:center;align-items:center;box-sizing:border-box}.cardRemember[data-v-3396aa66]{flex-direction:column;-webkit-perspective:800px;perspective:800px;background:url("+c+"),#0e0b0c;height:100vh}.cardRemember .Replays[data-v-3396aa66]{margin-top:30px}.cardRemember .cards[data-v-3396aa66]{display:flex;flex-wrap:wrap;box-sizing:border-box;width:%?750?%;height:%?750?%;max-width:500px;max-height:600px;-webkit-transform-style:preserve-3d;transform-style:preserve-3d}.cardRemember .cards .card[data-v-3396aa66]{-webkit-transform-style:preserve-3d;transform-style:preserve-3d;-webkit-transform:rotateY(180deg);transform:rotateY(180deg);flex-shrink:0;width:18%;height:22%;margin-right:2%;margin-bottom:2%;position:relative;-webkit-transform-origin:center;transform-origin:center;border-radius:15%;font-size:24px;letter-spacing:2px;transition:all .5s}.cardRemember .cards .card .cardsBgr[data-v-3396aa66]{border:%?1?% solid #d92662;border-radius:15%;background-color:#fff;width:100%;height:100%}.cardRemember .cards .card[data-v-3396aa66]:nth-child(4n+1){margin-left:4%}.cardRemember .cards .card[data-v-3396aa66]:nth-child(-n+4){margin-top:4%}.cardRemember .cards .card .front[data-v-3396aa66],\n.cardRemember .cards .card .back[data-v-3396aa66]{position:absolute;width:100%;height:100%;border-radius:15%;border:8px solid #d92662}.cardRemember .cards .card .front[data-v-3396aa66]{-webkit-transform:translateZ(%?1?%);transform:translateZ(%?1?%);background:url("+d+");background-repeat:no-repeat;background-size:100%;background-position:50% 50%}.cardRemember .cards .card .back[data-v-3396aa66]{-webkit-transform:translateZ(%?-1?%);transform:translateZ(%?-1?%);background:url("+u+");background-size:25%}",""]),e.exports=t},cc1b:function(e,t,r){"use strict";r("7a82");var n=r("4ea4").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=n(r("2909"));r("4de4"),r("d3b7"),r("d81d"),r("4e82"),r("159b"),r("14d9"),r("99af"),r("e9c4"),r("d401"),r("25f0");var s={data:function(){return{nums:[1,2,3,4,5,6,7,8],flower:["♠","♥","♣","♦","♠","♥","♣","♦"],cardsArr:[],lastChooseTwoCard:[],lastChooseIndex:null,throttle:!1}},created:function(){this.cardsArr=this.newCardsArr(this.nums,this.flower),this.$nextTick((function(){uni.hideLoading()}))},computed:{openCardNum:function(){return this.cloneDeep(this.cardsArr).filter((function(e){return e.front&&!e.success}))}},methods:{Replays:function(){var e=this;uni.showModal({content:"确定重新开始游戏吗?",success:function(t){if(t.confirm){var r=e.cloneDeep(e.cardsArr);e.cardsArr=r.map((function(e){return e.front=!1,e})),setTimeout((function(){e.cardsArr=e.newCardsArr(e.nums,e.flower)}),500),uni.showToast({duration:1e3,mask:!0,title:"重新开始~",icon:"none"})}}})},turn_over:function(e,t){this.$set(this.cardsArr[e],"front",t)},closeUnsuccess:function(){var e=this.cardsArr.map((function(e){return e.success||(e.front=!1),e}));this.cardsArr=e},openSuccess:function(){var e=this.cardsArr.map((function(e){return e.success&&(e.front=!0),e}));this.cardsArr=e},clickCard:function(e){var t=this;if(!e.success&&!this.throttle){e.index!==this.lastChooseIndex&&setTimeout((function(){t.throttle=!1}),500);var r=null!=this.lastChooseIndex&&e.text==this.cardsArr[this.lastChooseIndex].text&&e.index!==this.lastChooseIndex&&this.cardsArr[this.lastChooseIndex].front;if(r)return this.$set(this.cardsArr[e.index],"success",!0),this.$set(this.cardsArr[this.lastChooseIndex],"success",!0),this.turn_over(e.index,!0),this.closeUnsuccess(),this.lastChooseIndex=null,void uni.showToast({icon:"none",title:"Good!",duration:1e3});(this.lastChooseIndex=e.index)&&(this.lastChooseIndex=null),this.lastChooseIndex=e.index,this.turn_over(this.lastChooseIndex,!e.front);var n=this.openCardNum.length;3==n&&(this.closeUnsuccess(),this.turn_over(this.lastChooseIndex,!0))}},disruptedArray:function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10,r=1;r<=t;r++)e.sort((function(e,t){return.5-Math.random()}));return e},newCardsArr:function(e,t){var r=this.cloneDeep;8===(null===e||void 0===e?void 0:e.length)&&8===(null===t||void 0===t?void 0:t.length)||console.log("newCardsArr:传递的数组不正确");var n=[];return e.forEach((function(e,r){var a={};a.text=e+t[r],a.front=!1,a.success=!1,n.push(a)})),n=[].concat((0,a.default)(r(n)),(0,a.default)(r(n))),n=this.disruptedArray(n),n.forEach((function(e,t){e.index=t})),n},cardTextColor:function(e){return"♥"==e||"♦"==e?"#d92626":"#130606"},cloneDeep:function(e){return JSON.parse(JSON.stringify(e))}},watch:{cardsArr:function(e){var t=this,r=e.every((function(e){return e.success&&e.front}));r&&setTimeout((function(){uni.showModal({title:"成功通关!~",content:"恭喜你找出全部相同卡牌!!\n是否为您重置卡牌?",success:function(e){if(e.confirm){var r=t.cloneDeep(t.cardsArr);t.cardsArr=r.map((function(e){return e.front=!1,e})),setTimeout((function(){t.cardsArr=t.newCardsArr(t.nums,t.flower)}),500)}}})}),1e3);var n=this.cloneDeep(e).filter((function(e){return e.success})).map((function(e){return e.index}));console.log("arr".concat(":"),n,"现在时间：".concat((new Date).toString().split(" ")[4]))}}};t.default=s},db90:function(e,t,r){"use strict";r("7a82"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)},r("a4d3"),r("e01a"),r("d3b7"),r("d28b"),r("3ca3"),r("ddb0"),r("a630")},e660:function(e,t,r){e.exports=r.p+"static/img/cardBack.3c1aa1c6.svg"},eecb:function(e,t,r){e.exports=r.p+"static/img/bgr.b5aa1737.svg"}}]);