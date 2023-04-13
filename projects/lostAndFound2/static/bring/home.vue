<template>
    <view id="home" class="page">
        <l-banner v-model="searchText" placeholder="搜索应用名" inputStyle="background-color:#3d9ee0;color:#fff" ref="banner"
            placeholderStyle="color:#fff" hexColor="#0C86D8" type="search" fill>
            <!-- #ifndef H5 -->
            <l-icon v-if="false" @click="scanClick" class="text-xxl margin-left-sm" slot="left" type="scan" color="white" />
            <!-- #endif -->
            <i id="backlog">2</i>
            <l-icon @click="toBacklog" class="backlog" v-text="backlog" slot="searchButton" type="search"
                color="white" />
            <l-icon @click="msgClick" class="text-xxl" slot="searchButton" type="mail" color="white" />
        </l-banner>

        <!-- 轮播图片 -->
        <swiper id="newsPhoto" :indicator-dots="true" :autoplay="true" circular=true :interval="3000" :duration="1000"
            style="margin: 0rpx 0;">
            <swiper-item @click="toNewsPage(item,index)" v-for="(item,index) of bannerList" :key="index">
                <view class="swiper-item">
                    <image :src="item" mode="aspectFill"></image>
                </view>
            </swiper-item>
        </swiper>

        <!-- 搜索应用无结果的时候提示 -->
        <view class="haveResult" v-if="haveResult">
            <i>无结果</i>
        </view>

        <!-- <view class="text-center bg-white margin-bottom">
            <text @click="moreClick" class="function-more-btn margin-tb text-gray">更多应用...</text>
        </view> -->
        <view class="page" id="more">
            <!-- 输出功能列表 -->
            <template v-if="sectionIndex == 0">
                <!-- 选项卡新样式 -->
                <view class="sectionIndex3">
                    <!-- 输出每个分类的下的所有功能图标 -->
                    <div class="tab3_container">
                        <button v-for="(obj,index3) in tabList" :key="index3+obj.name" class="tab3_text"
                            :class="{tab3_text_alive:current==index3}" @click="current=index3"
                            :style="`${whiteSpace(obj)}`+`height:${tab3_text_height};`">{{obj.name}}</button>
                    </div>
                    <swiper :current="current" @change="swiperChange" class="swiper2">
                        <swiper-item v-for="(tab, index) in tabList" :key="index">
                            <view class="function-list cu-list grid no-border col-4 swiper2_item"
                                :style="`padding: 0; align-items: flex-start; align-content: flex-start;`">
                                <view class="cu-item text-center flex flex-wrap justify-center align-center"
                                    v-for="(item, index) in tab.list" :key="index">
                                    <view @click="funcListClick(item)"
                                        :style="{ backgroundColor: funcListIconColor(item) }"
                                        class="app-item align-center flex flex-wrap justify-center align-center">
                                        <l-icon :type="funcListIcon(item)" color="white" class="text-sl" />
                                    </view>
                                    <text>{{ item.F_Name }}</text>
                                </view>
                            </view>
                        </swiper-item>
                    </swiper>
                </view>
            </template>

            <!-- tab样式 -->
            <template v-else-if="sectionIndex == 1">
                <view>
                    <u-tabs :list="tabList" :current="current" @change="change"></u-tabs>
                    <!-- 输出每个分类的下的所有功能图标 -->
                    <swiper :current="current" @change="swiperChange" class="swiper2">
                        <swiper-item v-for="(tab, index) in tabList" :key="index">
                            <view class="function-list cu-list grid no-border col-4 swiper2_item"
                                :style="`padding: 0; align-items: flex-start; align-content: flex-start;`">
                                <view class="cu-item text-center flex flex-wrap justify-center align-center"
                                    v-for="(item, index) in tab.list" :key="index">
                                    <view @click="funcListClick(item)"
                                        :style="{ backgroundColor: funcListIconColor(item) }"
                                        class="app-item align-center flex flex-wrap justify-center align-center">
                                        <l-icon :type="funcListIcon(item)" color="white" class="text-sl" />
                                    </view>
                                    <text>{{ item.F_Name }}</text>
                                </view>
                            </view>
                        </swiper-item>
                    </swiper>
                </view>
            </template>

            <template v-else-if="sectionIndex == 2">
                <!-- 小图标样式 -->
                <template v-for="(group, title) in groupList">
                    <view class="smallIcon_row">
                        <div class="row">
                            <text :style="{width:(Math.ceil((title.length*14)/45)*45)+`px`}">{{title}}</text>
                            <view class="icon2" v-for="(item, index) in group" :key="index">
                                <view @click="funcListClick(item)" class="app-item flex  justify-center align-center">
                                    <l-icon :type="funcListIcon(item)" color="white" class="text-sl"
                                        :style="{ backgroundColor: funcListIconColor(item) }" />
                                    <text class="text">{{ item.F_Name }}</text>
                                </view>
                            </view>
                        </div>
                    </view>
                    <view :key="title" style="display: none;">
                        <u-collapse class='zhediebg' :accordion='accordionBool' :value="titlearr">
                            <u-collapse-item :title="title" :name="title">
                                <!-- 应用分类标题 -->
                                <!-- 输出每个分类的下的所有功能图标 -->
                                <view class="function-list cu-list grid no-border col-4" ref="allFuncList">
                                </view>
                            </u-collapse-item>
                        </u-collapse>
                    </view>
                </template>
            </template>

            <template v-else-if="sectionIndex == 3">
                <!-- collapse样式 -->
                <template v-for="(group, title) in groupList">
                    <view :key="title">
                        <u-collapse class='zhediebg' :accordion='accordionBool' :value="titlearr">
                            <u-collapse-item :title="title" :name="title">
                                <!-- 应用分类标题 -->
                                <!-- 输出每个分类的下的所有功能图标 -->
                                <view class="function-list cu-list grid no-border col-4" ref="allFuncList">
                                    <view class="cu-item text-center flex flex-wrap justify-center align-center"
                                        v-for="(item, index) in group" :key="index">
                                        <view @click="funcListClick(item)"
                                            :style="{ backgroundColor: funcListIconColor(item) }"
                                            class="app-item align-center flex flex-wrap justify-center align-center">
                                            <l-icon :type="funcListIcon(item)" color="white" class="text-sl" />
                                        </view>
                                        <text>{{ item.F_Name }}</text>
                                    </view>
                                </view>
                            </u-collapse-item>
                        </u-collapse>
                    </view>
                </template>
            </template>

        </view>

    </view>
</template>

<script>
    import moment from 'moment'
    import _ from 'lodash';
    const tabNameJson = {
        name: '',
    };
    export default {
        data() {
            return {
                imgData: [],
                settingData: null,
                listData: [],
                titlearr: "流程中心",
                accordionBool: true, //是否开启手风琴
                countData: [],
                noticeData: [],
                // chartData: [],

                pixelRatio: 1,
                cWidth: '',
                cHeight: '',
                versionapp: '', //版本号

                //👇 be copied from more.vue
                allList: [],
                searchText: '',
                functionTypeList: [], // 功能分类列表
                //👆 be copied from more.vue
                bannerList: [],
                bannerNum: [],
                current: 0, // tab样式的下标

                sectionIndex: undefined, // 样式下标
                swiperheight: 560, // 新样式的分类下的功能图标默认展示高度
                swiperheightList: [] ,// 新样式各个分类下的功能图标最小展示高度数组
                lines:this.$store.state.lines
            }
        },
        created() {
            setTimeout(() => {
                uni.request({
                    url: this.apiRoot`/function/getnews`,
                    data: {
                        ...this.auth,
                        data: "News"
                    },
                    success: (res) => {
                        for (var i = 0; i < res.data.data.length; i++) {
                            this.bannerList.push(this
                                .apiRoot`/annexes/previewfile?fileId=${res.data.data[i].ImageId}`)
                            this.bannerNum.push(res.data.data[i].COMPANY_ONP_NUM)
                        }
                    }
                })
            }, 1000)
            setTimeout(() => {
                
            }, 2000);
            
        },

        mounted() {
            this.sectionIndex = uni.getStorageSync('sectionIndex') || 0
            setTimeout(() => {
                // console.log(this.tabList);
            }, 3000)
        },

        async onLoad() {
            uni.getSystemInfo({
                success: (res) => {
                    if (res.platform == "android") {
                        this.AndroidCheckUpdate();
                    }
                }
            })
            this.init()

            // 获取各个分类下的功能图标最小展示高度
            setTimeout(() => {
                // console.log(this.$refs.allFuncList);
                for (let k in this.$refs.allFuncList) {
                    this.swiperheightList.push(this.$refs.allFuncList[k].$el?.offsetHeight)
                }
                this.swiperheight = window?.innerHeight * 0.6 // 这里是想适配各个设备所展示的高度，但由于其他组件未适配故不完美
                // console.log(this.swiperheightList);
            }, 500)
        },

        onShow() {
            this.sectionIndex = uni.getStorageSync('sectionIndex')
        },
        methods: {
            getBacklog() {
                uni.request({
                        url: this.apiRoot`/newwf/mytask`,
                        data: {
                            ...this.auth,
                            data: JSON.stringify({
                                pagination: {
                                    rows: 10,
                                    page: 1,
                                    sidx: 'F_CreateDate',
                                    sord: 'DESC'
                                },
                            })
                        },
                    })
                    .then(([err, res]) => {
                        this.$store.commit('backlog', res.data.data.records);
                    })
            },

            whiteSpace(obj) {
                let length = obj?.name?.length
                if (obj) {
                    if (length <= 4) {
                        return "white-space:nowrap;"
                    } else {
                        return ""
                    }
                }
            },
            //下拉刷新
            async onPullDownRefresh() {
                await this.init()
                await this.getBacklog()
                uni.stopPullDownRefresh();

            },

            //通过点击轮播图跳转到新闻页面
            toNewsPage(item, index) {
                uni.request({
                    url: this.apiRoot`/function/getnewsdetail`,
                    data: {
                        ...this.auth,
                        data: this.bannerNum[index]
                    },
                    success: (res) => {
                        const {
                            NEWS_TITLE,
                            NEWS_CONTENT,
                            NEWS_ABSTRACT,
                            CONTENT_SOURCE
                        } = res.data.data
                        uni.navigateTo({
                            url: `/pages/home/banner?title=${NEWS_TITLE}&content=${NEWS_CONTENT}&abstract=${NEWS_ABSTRACT}&source=${CONTENT_SOURCE}&banner=${item}`
                        })
                    }
                })
            },

            //跳转到待办任务
            toBacklog() {
                uni.navigateTo({
                    url: `/pages/nworkflow/myflow/list?e=1`,
                })
            },

            async AndroidCheckUpdate() { //自动更新
                //获取版本号
                plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
                    this.versionapp = wgtinfo.versionCode
                    uni.request({
                        url: this.apiRoot + `/apkupdate/appversion`,
                        data: {
                            ...this.auth,
                        },
                        success: (res3) => {
                            let dataversion = res3.data.data[0].APP_VERSION; //api版本号
                            if (dataversion > this.versionapp) { //api版本号高于现app版本号，有新版本
                                var that = this;
                                uni.showModal({
                                    title: "版本更新",
                                    content: '有新版本发布，是否立即进行新版本下载？',
                                    confirmText: '立即更新',
                                    cancelText: '稍后更新',
                                    success: function(res) {
                                        if (res.confirm) {
                                            var downurl = that.apiRoot +
                                                `/annexes/previewfile?fileId=${res3.data.data[0].F_Id}`;
                                            plus.runtime.openURL(downurl)

                                        } else if (res.cancel) {
                                            console.log('稍后更新')
                                        }

                                    }
                                });
                            }
                        }
                    })
                })

                if (0) {
                    0
                    // 原请求方法
                    // uni.request({
                    // 	url: this.apiRoot + `/apkupdate/appversion`,
                    // 	data: {
                    // 		...this.auth,
                    // 	},
                    // 	success: (res3) => {

                    // 		let dataversion = res3.data.data[0].APP_VERSION; //api版本号
                    // 		if (dataversion > this.versionapp) { //api版本号高于现app版本号，有新版本
                    // 			if (plus.networkinfo.getCurrentType() != 3) {
                    // 				uni.showToast({
                    // 					title: '有新版本发布,检测到您目前非WiFi连接，为节约您的流量，程序已停止自动更新，将在您连接WIFI后重新检测更新！',
                    // 					mask: true,
                    // 					duration: 5000,
                    // 					icon: "none"
                    // 				});
                    // 				return;
                    // 			} else {
                    // 				var that = this;
                    // 				uni.showModal({
                    // 					title: "版本更新",
                    // 					content: '有新版本发布，检测到您当前为WIFI连接，是否立即进行新版本下载？',
                    // 					confirmText: '立即更新',
                    // 					cancelText: '稍后更新',
                    // 					success: function(res) {
                    // 						console.log(res, '沈金宝');
                    // 						if (res.confirm) {
                    // 							var downurl = that.apiRoot +
                    // 								`/annexes/previewfile?fileId=${res3.data.data[0].F_Id}`;
                    // 							console.log(downurl)
                    // 							var dtask = plus.downloader
                    // 								.createDownload(
                    // 									downurl, {},
                    // 									function(d, status) {
                    // 										if (status == 200) {
                    // 											plus.runtime.install(
                    // 												plus.io
                    // 												.convertLocalFileSystemURL(
                    // 													d
                    // 													.filename
                    // 												), {}, {},
                    // 												function(
                    // 													error) {
                    // 													uni.showToast({
                    // 														title: '安装失败',
                    // 														mask: false,
                    // 														duration: 1500,
                    // 														icon: "none"
                    // 													});
                    // 													console
                    // 														.log(
                    // 															error
                    // 														)
                    // 												})
                    // 										} else {
                    // 											uni.showToast({
                    // 												title: '更新失败',
                    // 												mask: false,
                    // 												duration: 1500,
                    // 												icon: "none"
                    // 											});
                    // 										}
                    // 									});
                    // 							console.log(dtask)
                    // 							dtask.start();
                    // 							//监听下载
                    // 							var prg = 0;
                    // 							var showLoading = plus.nativeUI
                    // 								.showWaiting(
                    // 									"正在下载...")
                    // 							dtask.addEventListener("statechanged",
                    // 								function(
                    // 									download, status) {
                    // 									switch (download.state) {
                    // 										case 2:
                    // 											showLoading
                    // 												.setTitle(
                    // 													"开始下载")
                    // 											break;
                    // 										case 3:
                    // 											prg = parseInt((
                    // 													parseFloat(
                    // 														dtask
                    // 														.downloadedSize
                    // 													) /
                    // 													parseFloat(
                    // 														dtask
                    // 														.totalSize
                    // 													)
                    // 												) *
                    // 												100);
                    // 											showLoading
                    // 												.setTitle(
                    // 													"下载进度" +
                    // 													prg +
                    // 													"%");
                    // 											console.log('下载进度',
                    // 												dtask
                    // 												.downloadedSize,
                    // 												dtask
                    // 												.totalSize,
                    // 												'百分比', prg);
                    // 											break;
                    // 										case 4:
                    // 											mui.toast("下载完成");
                    // 											plus.nativeUI
                    // 												.closeWaiting();
                    // 											break;
                    // 									}
                    // 								});
                    // 						} else if (res.cancel) {
                    // 							console.log('稍后更新')
                    // 						}

                    // 					}
                    // 				});
                    // 			}
                    // 		}
                    // 	}
                    // })

                    // uni.request({
                    // 	url: this.apiRoot + `/apkupdate/appversion`, //获取api版本号,文件id
                    // 	data: {
                    // 		...this.auth,
                    // 	},
                    // 	success: res => {
                    // console.log(res,"你好");
                    // var dataversion = res.data; //api版本号
                    // if (res.data > this.versionapp) { //api版本号高于现app版本号，有新版本
                    // 	if (plus.networkinfo.getCurrentType() != 3) {
                    // 		uni.showToast({
                    // 			title: '有新版本发布,检测到您目前非WiFi连接，为节约您的流量，程序已停止自动更新，将在您连接WIFI后重新检测更新！',
                    // 			mask: true,
                    // 			duration: 5000,
                    // 			icon: "none"
                    // 		});
                    // 		return;
                    // 	} else {
                    // 		var that = this;
                    // 		uni.showModal({
                    // 			title: "版本更新",
                    // 			content: '有新版本发布，检测到您当前为WIFI连接，是否立即进行新版本下载？',
                    // 			confirmText: '立即更新',
                    // 			cancelText: '稍后更新',
                    // 			success: function(res) {
                    // 				if (res.confirm) {
                    // 					var downurl = that.apiRoot + '/apkupdate/uploadurl';
                    // 					console.log(downurl)
                    // 					var dtask = plus.downloader.createDownload(downurl, {},
                    // 						function(d, status) {
                    // 							if (status == 200) {
                    // 								plus.runtime.install(plus.io
                    // 									.convertLocalFileSystemURL(d
                    // 										.filename), {}, {},
                    // 									function(error) {
                    // 										uni.showToast({
                    // 											title: '安装失败',
                    // 											mask: false,
                    // 											duration: 1500,
                    // 											icon: "none"
                    // 										});
                    // 										console.log(error)
                    // 									})
                    // 							} else {
                    // 								uni.showToast({
                    // 									title: '更新失败',
                    // 									mask: false,
                    // 									duration: 1500,
                    // 									icon: "none"
                    // 								});
                    // 							}
                    // 						});
                    // 					console.log(dtask)
                    // 					dtask.start();
                    // 					//监听下载
                    // 					var prg = 0;
                    // 					var showLoading = plus.nativeUI.showWaiting("正在下载...")
                    // 					dtask.addEventListener("statechanged", function(
                    // 						download, status) {
                    // 						switch (download.state) {
                    // 							case 2:
                    // 								showLoading.setTitle("开始下载")
                    // 								break;
                    // 							case 3:
                    // 								prg = parseInt((parseFloat(dtask
                    // 										.downloadedSize) /
                    // 									parseFloat(dtask
                    // 										.totalSize)) * 100);
                    // 								showLoading.setTitle("下载进度" + prg +
                    // 									"%");
                    // 								console.log('下载进度', dtask
                    // 									.downloadedSize, dtask
                    // 									.totalSize, '百分比', prg);
                    // 								break;
                    // 							case 4:
                    // 								mui.toast("下载完成");
                    // 								plus.nativeUI.closeWaiting();
                    // 								break;
                    // 						}
                    // 					});
                    // 				} else if (res.cancel) {
                    // 					console.log('稍后更新')
                    // 				}

                    // 			}
                    // 		});
                    // 	}
                    // }
                    // 	},
                    // 	fail: () => {
                    // 		uni.showToast({
                    // 			title: '调用请求失败',
                    // 			mask: false,
                    // 			duration: 5000,
                    // 			icon: "none"
                    // 		})
                    // 	}
                    // })

                }

            },
            async init() {
                uni.showLoading({
                    title: '加载菜单中...',
                    mask: true
                });
                this.pixelRatio = uni.getSystemInfoSync().pixelRatio
                this.cWidth = uni.upx2px(750)
                this.cHeight = uni.upx2px(500)

                if (!this.$store.state.user) {
                    uni.reLaunch({
                        url: '/pages/login'
                    })
                    return
                }

                // 同时发出请求，获取轮播图、所有功能列表、我的功能列表、商机通知提醒图表数据
                // 商机、通知提醒图表数据，获取的是数据ID，所以还需要进一步请求
                await Promise.all([
                    // uni
                    //   .request({ url: this.apiRoot`/desktop/imgid`, data: this.auth })//轮播
                    //   .then(([err, result]) => (this.imgData = result.data.data)),

                    //获取待办数量，显示在右上角
                    // uni.request({
                    // 	url: this.apiRoot`/newwf/mytask`,
                    // 	data: {
                    // 		...this.auth,
                    // 		data: JSON.stringify({
                    // 			pagination: {
                    // 				rows: 10,
                    // 				page: 1,
                    // 				sidx: 'F_CreateDate',
                    // 				sord: 'DESC'
                    // 			},

                    // 		})
                    // 	},
                    // }).then(([err, res]) => {
                    // 	//console.log('错误',err,'res',res);
                    // 	this.backlog = res.data.data.records
                    // 	// console.log("initBackLog:", this.initBackLog, "backlog:", this.backlog);
                    // 	this.initBackLog = res.data.data.records
                    // }),
                    uni
                    .request({
                        url: this.apiRoot`/function/list2`,
                        data: this.auth
                    })
                    .then(([err, result]) => (this.listData = result.data.data.data)),

                    uni
                    .request({
                        url: this.apiRoot`/function/mylist2`,
                        data: this.auth
                    })
                    .then(([err, result]) => (this.myList = result.data.data)),
                    //copy from more,vue
                    uni.request({
                        url: this.apiRoot`/function/list2`,
                        data: this.auth
                    }).then(([err, result]) => {
                        this.allList = result.data.data.data;
                        //console.log('this.allListthis.allList',this.allList)
                    }),
                    uni.request({
                        url: this.apiRoot`/dataItem/details`,
                        data: {
                            ...this.auth,
                            data: 'function'
                        }
                    })
                    .then(([err, result]) => {
                        this.functionTypeList = result.data.data;
                        //console.log('this.functionTypeListthis.functionTypeList',this.functionTypeList)
                    }),

                    //copy from more.vue

                    // uni
                    //   .request({ url: this.apiRoot`/desktop/setting`, data: this.auth })
                    //   .then(([err, result]) => (this.settingData = result.data.data.data))
                ])

                this.myList = this.myList.filter(t => this.listData.find(li => li.F_Id === t))

                // 前人未完成
                // // 渲染图表
                // const _self = this
                // this.chartData.forEach(item => {
                // 	const chartConfig = {
                // 		$this: _self,
                // 		pixelRatio: 1,
                // 		width: this.cWidth * 1,
                // 		height: this.cHeight * 1,
                // 		canvasId: item.id,
                // 		background: '#FFFFFF',
                // 		dataLabel: true,
                // 		enableScroll: true,
                // 		padding: [20, 15, 5, 15]
                // 	}

                // 	// 根据 item.type 的值选用对应的图表初始化配置项
                // 	// 0=环形图；1=折线图；2=柱状图
                // 	const charts = new uCharts(
                // 		[{
                // 				...chartConfig,
                // 				type: 'ring',
                // 				series: item.value.map(t => ({
                // 					name: t.name,
                // 					data: t.value
                // 				})),
                // 				extra: {
                // 					pie: {
                // 						offsetAngle: -45,
                // 						ringWidth: 20,
                // 						labelWidth: 15
                // 					}
                // 				},
                // 				legend: {
                // 					lineHeight: 20
                // 				}
                // 			},
                // 			{
                // 				...chartConfig,
                // 				type: 'line',
                // 				series: [{
                // 					name: item.title,
                // 					data: item.value.map(t => t.value)
                // 				}],
                // 				categories: item.value.map(t => t.name),
                // 				extra: {
                // 					line: {
                // 						type: 'straight'
                // 					}
                // 				},
                // 				xAxis: {
                // 					rotateLabel: true,
                // 					fontSize: 10,
                // 					itemCount: 8
                // 				}
                // 			},
                // 			{
                // 				...chartConfig,
                // 				type: 'column',
                // 				series: [{
                // 					name: item.title,
                // 					data: item.value.map(t => t.value)
                // 				}],
                // 				categories: item.value.map(t => t.name),
                // 				xAxis: {
                // 					rotateLabel: true,
                // 					fontSize: 10
                // 				}
                // 			}
                // 		][item.type]
                // 	)
                // 	chartsObject[item.id] = charts
                // })
                uni.hideLoading();
            },


            weiwancheng() {
                1
                // 前人未完成，关于上面图表的
                // chartTap(index, e) {
                // 	const item = this.chartData[index]
                // 	const format = [
                // 		({
                // 			name,
                // 			data
                // 		}) => `${name}: ${data}`,
                // 		({
                // 			name,
                // 			data
                // 		}, category) => `${category} ${name}: ${data}`
                // 	][item.type]
                // 	chartsObject[item.id].showToolTip(e, {
                // 		format
                // 	})
                // },

                // touchStart(index, e) {
                // 	const item = this.chartData[index]
                // 	chartsObject[item.id].scrollStart(e)
                // },

                // touchMove(index, e) {
                // 	const item = this.chartData[index]
                // 	chartsObject[item.id].scroll(e)
                // },

                // touchEnd(index, e) {
                // 	const item = this.chartData[index]
                // 	chartsObject[item.id].scrollEnd(e)
                // },

                // postDateTime(timeStr) {
                // 	switch (this.config('pageConfig.home.noticeDateDisplay')) {
                // 		case 'date':
                // 			return moment(timeStr).format('YYYY年 M月D日')
                // 		case 'datetime':
                // 			return moment(timeStr).format('YYYY-M-D H:mm')
                // 		default:
                // 			return moment(timeStr).fromNow()
                // 	}
                // },

                //copy from more.vue
            },


            funcListIcon(item) {
                if (!item || !item.F_Icon) {
                    return '';
                }
                //console.log(item)
                return item.F_Icon.replace(`iconfont icon-`, ``);
            },

            // 设置按钮图标颜色
            funcListIconColor(item) {
                // 采购区域图标颜色
                if (item.F_Type === 'newapp_purchase') {
                    return '#AFB650';
                }

                // 生产区域区域图标颜色
                if (item.F_Type === 'newapp_production') {
                    return '#618CC2';
                }

                // 库存区域图标颜色
                if (item.F_Type === 'newapp_warehouse') {
                    return '#28A874';
                }

                // 销售区域图标颜色
                if (item.F_Type === 'newapp_sale') {
                    return '#B14DB2';
                }

                // 流程应用颜色
                if (item.F_Type === 'flowapp') {
                    return '#CE00D9';
                }

                // 扩展应用
                if (item.F_Type === 'exapp') {
                    return '#9E6700';
                }

                // 委外管理
                if (item.F_Type === 'newapp_outsourcing') {
                    return '#4550FF';
                }

                // 财务报销
                if (item.F_Type === 'cwbx') {
                    return '#ffc73a';
                }

                // 项目管理
                if (item.F_Type === 'xmgl') {
                    return '#7037ff';
                }

                return '#62bbff';
            },

            //点击功能，跳转到指定页面
            funcListClick(item) {
                //点击按钮后跳转的主页面
                console.log(item);
                if (item.F_IsSystem === 2) {
                    this.setPageParam(item);
                    uni.navigateTo({
                        url: `/pages/customapp/list?formId=${item.F_FormId}`
                    });
                    return;
                }

                uni.navigateTo({
                    url: `/pages/${item.F_Url}/list`
                });
            },
            //copy from more.vue

            // 点击通知公告的标题
            noticeClick(item) {
                this.setPageParam(item)
                uni.navigateTo({
                    url: '/pages/home/notice'
                })
            },


            // #ifndef H5
            // 点击左上角扫码图标，H5 无此功能
            scanClick() {
                uni.scanCode({
                    scanType: ['qrCode', 'barCode'],
                    success({
                        result,
                        charSet
                    }) {}
                })
            },
            // #endif

            // 点击更多功能按钮
            moreClick() {
                uni.navigateTo({
                    url: '/pages/home/more'
                })
            },

            // 点击右上角的消息按钮
            msgClick() {
                uni.switchTab({
                    url: '/pages/msg'
                })
            },

            // 使用tab样式展示功能的点击切换事件
            change(item) {
                this.current = item.index
            },

            // 滑动切换导航
            swiperChange: function(e) {
                var _this = this
                _this.current = e.detail.current
            }
        },

        computed: {

            backlog() {
                return this.$store.state.backlog
            },
            //copy from more.Vue
            groupList() {
                // const test = _(this.functionTypeList).keyBy('F_ItemValue').value()
                // console.log('testtesttest',test)
                const typeTable = _(this.functionTypeList)
                    .keyBy('F_SortCode')
                    .mapValues('F_ItemName')
                    .value();
                // console.log('typeTabletypeTabletypeTable',typeTable)
                const sortCode = _(this.functionTypeList)
                    .keyBy('F_ItemValue')
                    .mapValues('F_SortCode')
                    .value();
                // console.log('sortCodesortCode',sortCode)
                let allList = _(this.allList)
                    .filter(item => item.F_Name.includes(this.searchText))
                    .groupBy('F_Type')
                    .mapKeys((v, k) => sortCode[k])
                    .value();
                // console.log('allListallListallList',allList)
                var newList = {}
                for (var key in allList) {
                    newList[typeTable[key]] = allList[key]
                    //console.log('allListallList',allList)
                    //console.log('allList[key]allList[key]',allList[key])
                    // console.log("newListnewList",newList)
                }
                //console.log("newListnewList对象",newList)
                // if (JSON.stringify(newList) == "{}") {
                // 	console.log('无结果');
                // }

                // console.log("newListnewList",newList)
                return newList
            },

            //copy from more.Vue
            haveResult() {
                return JSON.stringify(this.groupList) == "{}" ? 1 : 0
            },


            tab3_text_height() {
                // let height = Math.max(this.tabList.map(obj => 
                // 	obj.name.length
                // )) * 100

                let max = Math.max(...this.tabList.map(obj =>
                    obj?.name?.length
                ))
                let height = 0
                switch (max) {
                    case max <= 4:
                        height = "120rpx"
                        break;
                    case max > 4 && max <= 6:
                        height = "180rpx"
                        break;
                    case max > 6:
                        height = Math.ceil(max / 3) * 60 + "rpx"
                        break;
                    default:
                        height = "120rpx"
                        break;
                }
                return height
            },


            // 使用tab样式展示功能的数组
            tabList() {
                // 功能的类型
                let typeTable = _(this.functionTypeList)
                    .keyBy('F_SortCode')
                    .mapValues('F_ItemName')
                    .value();
                let sortCode = _(this.functionTypeList)
                    .keyBy('F_ItemValue')
                    .mapValues('F_SortCode')
                    .value();
                // 各个功能下的二级功能
                let allList = _(this.allList)
                    .filter(item => item.F_Name.includes(this.searchText))
                    .groupBy('F_Type')
                    .mapKeys((v, k) => sortCode[k])
                    .value();

                let newTabList = []
                // 将功能和其二级功能存放在一起
                for (let i in allList) {
                    newTabList.push({
                        name: typeTable[i],
                        list: allList[i]
                    })
                }
                return newTabList
            }

        },

        watch: {
            //监听tab样式的下标， 对swiperheight进行更新
            current(newVal) {
                if (this.sectionIndex === 1) {
                    this.swiperheight = this.swiperheightList[newVal] > this.swiperheight ? this
                        .swiperheightList[newVal] :
                        window?.innerHeight * 0.6
                }
            },

            sectionIndex(newVal) {
                this.index = newVal
            }

        }
    }
</script>

<style scoped lang="less">
    .page {
        .sectionIndex3 {

            .tab3_container {
                width: calc(100vw - 10px);
                display: flex;
                flex-wrap: wrap;
                // justify-content: space-between;
                padding: 10rpx;


                .tab3_text {
                    flex-shrink: 0;
                    width: calc(25% - 4px);
                    // height: 100rpx;
                    margin: 2px;
                    text-align: center;
                    box-sizing: border-box;
                    // white-space: nowrap;

                    line-height: normal;
                    /* #ifdef H5 */

                    /* #endif */
                    transition: all 0.2s;
                    font-size: 34rpx;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .tab3_text_alive {
                    background-color: #3d9ee0;
                    color: white;
                }

            }

        }

        uni-swiper {
            height: 100px;
        }

        .swiper2 {
            height: calc(100vh - 194px);

            &::v-deep .uni-swiper-slide-frame {
                // overflow-y: auto;	
            }

            // &::v-deep uni-swiper-item {
            // 	height: 1500px;
            // }


            .swiper2_item {
                height: 100%;
                overflow: auto;
            }
        }

        .smallIcon_row {
            background-color: white;
            margin-bottom: 1px;
            // height: 80rpx;
            display: flex;
            align-items: center;

            .row {
                width: 100vw;
                display: flex;
                align-items: center;
                flex-wrap: wrap;

                &>text {
                    white-space: nowrap;
                    // margin: 0 16rpx;
                    display: block;
                    text-align: center;

                    // span {
                    // 	display: block;
                    // }
                }

                .icon2 {
                    margin: 14rpx 0;
                    // width: 25px;
                    // height: 25px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-right: 10rpx;
                    box-sizing: content;
                    flex-shrink: 0;

                    &::v-deep .app-item {
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                        flex-direction: column;

                        .text-sl {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            font-size: 20px;
                            height: 27px;
                            width: 27px;
                            border-radius: 50%;
                        }

                        .text {
                            height: 60rpx;
                            font-size: 10px;
                            width: 100%;
                            display: block;
                            text-align: center;
                            width: 80rpx;
                            display: -webkit-box;
                            // -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            overflow: auto;

                            &>span {
                                display: block;
                                width: 100%;
                            }
                        }
                    }

                }
            }

        }


        position: relative;
        background-color: #f3f3f3;

        .cu-list.grid>.cu-item {
            margin-top: 10rpx;

            &::v-deep span {
                display: block;
                max-width: 134rpx;

            }
        }

        .function-list {
            &::v-deep .cu-item {}
        }

        .backlog {
            // transform: scale(0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            // margin-bottom: 2px;
            // border-radius: 50%;
            border-radius: 3px;
            padding: 0 5px 1px 5px;
            background-color: #ffffff6b;
            // width: 20px;
            // height: 20px;
            vertical-align: 0em;
            font-size: 12px !important;

            &:before {
                // transform: scale(0.8);
                // content: "12";
                // font-size: 12px;
                // display: flex;
                // align-items: center;
                // justify-content: center;
                content: "";
            }
        }



        .content {
            background-color: #fff;
        }

        .function-list {
            padding-bottom: 0;

            .cu-item {
                justify-content: flex-start;

                .app-item {
                    border-radius: 50%;
                    height: 45px;
                    width: 45px;
                }

                &:nth-child(7n + 1)>.app-item {
                    background-color: #62bbff;
                }

                &:nth-child(7n + 2)>.app-item {
                    background-color: #7bd2ff;
                }

                &:nth-child(7n + 3)>.app-item {
                    background-color: #ffd761;
                }

                &:nth-child(7n + 4)>.app-item {
                    background-color: #fe955c;
                }

                &:nth-child(7n + 5)>.app-item {
                    background-color: #ff6283;
                }

                &:nth-child(7n + 6)>.app-item {
                    background-color: #60e3f3;
                }

                &:nth-child(7n)>.app-item {
                    background-color: #acc8fe;
                }
            }
        }

        .function-more-btn {
            display: inline-block;
            border: currentColor 1px solid;
            border-radius: 2px;
            padding: 10rpx 30rpx;
        }

        .count-list {
            &:after {
                content: '';
                clear: both;
                display: table;
            }

            .count-item-value {
                color: #0188d2;
                font-size: 24px;
            }
        }

        .chart-list {
            background-color: #fff;

            .charts {}
        }
    }
</style>

<style lang="less">
    #home {
        // padding-bottom: 50rpx;

        .function-list .cu-item text[class*='cuIcon'] {
            margin-top: 0 !important;
        }

        .haveResult {
            background-color: rgb(243, 243, 243);
            font-size: 40rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            height: calc(100vh - 688rpx);

            i {
                color: #333333de;
                letter-spacing: 5rpx;
            }
        }

        s &::v-deep .uni-swiper-dot-active {
            background-color: #eee;
        }

        #newsPhoto {
            uni-image {
                height: 230rpx;
            }
        }
    }
</style>

<style lang="less" scoped>
    .function-list {
        padding-bottom: 0;

        .cu-item {
            justify-content: flex-start;

            .app-item {
                border-radius: 50%;
                height: 45px;
                width: 45px;
            }
        }
    }
</style>

<style lang="less">
    #more {
        margin-top: -10rpx;

        .function-list .cu-item text[class*='cuIcon'] {
            margin-top: 0 !important;
        }

        .zhediebg {
            background-color: #fff;
        }
    }
</style>
