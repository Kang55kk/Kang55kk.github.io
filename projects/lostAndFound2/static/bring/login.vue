<template>
    <view class="page">
        <view class="content">
            <view class="logo-banner">
                <view class="logo-bg">
                    <image class="logo" mode="aspectFit" src="/static/logo.png"></image>
                </view>
                <view class="logo-text">
                    <view class="main-title">武桥重工</view>
                    <!-- #ifdef  MP-WEIXIN -->
                    <view class="sub-title">微信小程序版</view>
                    <!-- #endif -->
                </view>
            </view>
            <l-input v-model.lazy="api" @Confirm='clickLogin' placeholder="api地址">
                <l-icon type="people" slot="title" />
            </l-input>
            <l-input v-model.lazy="username" @Confirm='clickLogin' placeholder="手机号 / 账号">
                <l-icon type="people" slot="title" />
            </l-input>
            <l-input v-model.lazy="password" @Confirm='clickLogin' placeholder="密码" password>
                <l-icon type="lock" slot="title" />
            </l-input>
            <l-button @click="clickLogin" size="lg" block color="blue" class="margin-top block">登 录</l-button>
            <!--<view class="more"><view @click="signupTips" class="signup">如何注册</view></view>-->
            <!-- #ifdef APP-PLUS -->
            <!-- <text style="font-size: 12px;">cid:{{cid}}</text> -->
            <!-- #endif -->
        </view>
        <view class="footer">{{ copyRightDisplay }}</view>
    </view>
</template>

<script>
    import md5 from 'js-md5'
    export default {
        data() {
            return {
                api: '',
                username: '',
                password: '',
                automatic: true,
                cid: '',
            }
        },

        onShow() {
            const isDev = process.env.NODE_ENV === 'development' //本地开发默认填写数据
            var lastApi = '';
            var apiRoot = uni.getStorageSync('apiRoot');
            if (!!apiRoot) {
                lastApi = apiRoot
            }
            //if(localStorage.getItem('apiRoot')){
            //    lastApi = localStorage.getItem('apiRoot');
            //}
            //this.api= lastApi
            uni.setStorageSync('apiRoot', this.api)
            if (isDev) {
                this.api = uni.getStorageSync('apiurl') ||
                    'localhost:52586' //192.168.0.13:8082 lianhe.zicp.net localhost:52586  localhost:9198
                this.username = 'system'
                this.password = '12345'
            } else {
                this.api = uni.getStorageSync('apiurl') || ''
                this.username = uni.getStorageSync('username') || ''
                this.password = uni.getStorageSync('password') || ''
            }
            // #ifdef APP-PLUS
            uni.getPushClientId({
                success: (res) => {
                    this.cid = res.cid
                }
            })
            // #endif
        },

        onLoad(res) {
            if (res.automatic == 'false') {
                this.automatic = false
            }
        },

        onLaunch() {
            //解除跳转时闪过的登录页
            let userinfo = uni.getStorageSync('username');
            if (!userinfo) {
                uni.reLaunch({
                    url: "/pages/login",
                    success: () => {
                        //跳转完页面后再关闭启动页
                        plus.navigator.closeSplashscreen();
                    }
                })
            } else {
                plus.navigator.closeSplashscreen(); //关闭启动页，进入首页
            }

        },

        mounted() {
            const {
                api,
                username,
                password
            } = this
            if (this.automatic == true) {
                if (api == uni.getStorageSync('apiurl') || api == 'localhost:52586') {
                    if (username == 'system' && password == '12345') {
                        this.clickLogin()//自动登录
                    }
                }
            }
        },

        methods: {
            signupTips() {
                uni.showToast({
                    title: '请前往联和注册账号。已注册的账号可直接登录。',
                    icon: 'none'
                })
            },

            async clickLogin() {
                this.$store.commit('reqid', 1)
                const {
                    username,
                    password,
                    check,
                    automatic
                } = this
                if (!check()) {
                    return
                }
                const data = {
                    token: '',
                    loginMark: this.$store.state.guid, //登录用户标识
                    data: JSON.stringify({
                        username,
                        password: md5(password)
                    })
                }
                if (this.api == '') {
                    this.api = this.apiRoot;
                } else {
                    if (!this.api.startsWith('http')) {
                        this.api = 'http://' + this.api
                    }
                    if (!this.api.endsWith('/learun/adms')) {
                        this.api = this.api + '/learun/adms'
                    }
                }
                uni.showLoading({
                    title: '登录中...',
                    mask: true
                })
                const promsie = await uni.request({
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    url: this.api + `/user/login`,
                    method: 'POST',
                    data: data,
                    timeout: 1000000
                }).finally(() => {
                    uni.hideLoading()
                })
                if(promsie[0]?.errMsg=='request:fail timeout'){
                uni.hideLoading()
                uni.showModal({
                    title: '登录超时',
                    content: '请重新登录',
                    showCancel: false
                })
                }
                const [error, {
                    data: resultData
                }] = promsie
                const {
                    data: loginData,
                    code,
                    info
                } = resultData || {}

                if (error || code !== 200) {
                    uni.hideLoading()
                    uni.showModal({
                        title: '登录失败',
                        content: info || error,
                        showCancel: false
                    })
                    return
                } else {
                    this.apiRoot(0, this.api);
                    //localStorage.setItem('apiRoot',this.api)
                }
                const {
                    baseinfo
                } = loginData
                uni.setStorage({
                    key: 'apiurl',
                    data: this.api,
                });
                uni.setStorage({
                    key: 'username',
                    data: this.username,
                });
                uni.setStorage({
                    key: 'password',
                    data: this.password,
                });
                // #ifdef APP-PLUS
                // 获取客户端标识
                plus.push.getClientInfoAsync((info) => {
                    var cid = info.clientid;
                    uni.request({
                        url: this.apiRoot`/user/updatcid`,
                        data: {
                            ...this.auth,
                            data: {
                                user: this.username,
                                cid: cid
                            }
                        }
                    })
                }, err => {});
                // #endif
                this.$store.commit('user', baseinfo) //用户登录信息
                this.$store.commit('token', baseinfo.token) //票据信息?

                await Promise.all([
                    uni
                    .request({
                        url: this.apiRoot`/company/map`,
                        data: this.auth
                    }) //获取公司
                    .then(([err, result]) => this.$store.commit('company', result.data.data.data)),
                    uni
                    .request({
                        url: this.apiRoot`/department/map`,
                        data: this.auth
                    }) //获取部门
                    .then(([err, result]) => this.$store.commit('dep', result.data.data.data)),
                    uni
                    .request({
                        url: this.apiRoot`/user/map`,
                        data: this.auth
                    }) //获取人员
                    .then(([err, result]) => this.$store.commit('staff', result.data.data.data)),
                    // uni
                    //   .request({ url: this.apiRoot`/datasource/map`, data: this.auth })//获取数据源
                    //   .then(([err, result]) => this.$store.commit('pageParam', result.data.data.data)),  
                    uni
                    .request({
                        url: this.apiRoot`/dataitem/map`,
                        data: this.auth
                    }) //获取数据字典
                    .then(([err, result]) => this.$store.commit('propTable', result.data.data.data))
                ])
                uni.reLaunch({
                    url: '/pages/home'
                })
                uni.hideLoading()

            },

            check() {
                const {
                    username,
                    password
                } = this
                if (username.length <= 0 || password.length <= 0) {
                    uni.showModal({
                        title: '输入错误',
                        content: '账号或密码不能为空，请重新输入。',
                        showCancel: false
                    })
                    return false
                }
                return true
            }
        },

        computed: {
            copyRightDisplay() {
                const year = this.config('year') === true ? new Date().getFullYear() : this.config('year')
                const companyName = this.config('company')
                return `Copyright © ${year} 联和信息技术有限公司`
            }
        }
    }
</script>

<style lang="less">
    page {
        height: 100%;
    }
</style>

<style scoped lang="less">
    .page {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .content {
            text-align: center;
            width: 100%;
            padding: 0 38rpx;
            padding-bottom: 80rpx;

            l-input {
                text-align: left;
            }
        }

        .logo-banner {
            margin-bottom: 80rpx;

            .logo-bg {
                padding: 10rpx 15rpx;
                //background-color: #2782d7;
                text-align: center;
                display: inline-block;
                text-align: left;
                border-radius: 8px;

                .logo {
                    height: 100rpx;
                    width: 100rpx;
                }
            }

            .logo-text {
                display: block;
                margin: 20rpx 0;
                color: #555;

                .main-title {
                    font-size: 1.4em;
                    margin-bottom: 10rpx;
                }
            }
        }

        .more {
            margin-top: 30rpx;

            .signup {
                color: #555;
            }
        }

        .footer {
            position: absolute;
            width: 100%;
            bottom: 10px;
            bottom: calc(10px + env(safe-area-inset-bottom));
            text-align: center;
            font-size: 14px;
            color: #555;
        }
    }
</style>
