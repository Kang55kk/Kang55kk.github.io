<!-- <template>
  <div id="app"
     :style="{'transform':`scale(${scalesNum}) translate(-50%,0)`,
    '-webkit-transform':`scale(${scalesNum}) translate(-50%,0)`,
    '-moz-transform':`scale(${scalesNum}) translate(-50%,0)`,
    '-o-transform':`scale(${scalesNum}) translate(-50%,0)`,
    '-ms-transform':`scale(${scalesNum}) translate(-50%,0)`}">

    <router-view/>
  </div>

</template> -->

<style lang="scss">
    /* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
    @import 'uview-ui/index.scss';
</style>

<script>
    import {
        guid
    } from '@/common/utils.js';

    // js
    // const zoom = () => {
    //   let domBody = document.getElementsByTagName('body')[0]
    //   domBody.style.zoom = document.body.clientWidth /10  + '%'
    //  }
    //   zoom()
    //   // 窗口大小变化时，需要重算
    //   window.addEventListener('resize', zoom, false)

    export default {
        data() {
            return {
                // backlog: 0,
                timer: null,
                cid: null
            }
        },
        async onShow() {
            await this.init();
        },
        // created() {
        // 	setInterval(()=>{this.getBacklog()},2000)
        // },

        // data () {
        //    return {
        //      // scalesNum: 1 // 缩放比例
        // 	 timer:'',

        //    }
        //  },
        //  mounted () {
        //    // 计算缩放比例
        //    this.resize_window()
        //    window.addEventListener('resize', () => {
        //      this.resize_window()
        //    })
        // },
        computed: {
            backlog() {
                return this.$store.state.backlog
            },
            reqid() {
                return this.$store.state.reqid
            }
        },
        methods: {
            async init() {
                if (!this.$store.state.guid) {
                    this.$store.commit('guid', guid());
                }
                this.addRequestInterceptor(); // 添加请求拦截器
            },

            getBacklog() {
                uni.request({
                        url: this.apiRoot`/newwf/mytask`,
                        data: {
                            ...this.auth,
                            data: JSON.stringify({
                                pagination: {
                                    rows: 200,
                                    page: 1,
                                    sidx: 'F_CreateDate',
                                    sord: 'DESC'
                                },
                            })
                        },
                    })
                    .then(([err, res]) => {
                        this.$store.commit('backlog', res.data?.data?.records);
                    })
            },

            /**
             *	添加请求拦截器，可以在请求数据前或者得到响应数据的时候，统一实现一些操作（例如响应体没有用户认证，跳转到登录页面）
             **/
            addRequestInterceptor() {
                let context = this; // 保存页面的上下文
                uni.addInterceptor('request', {
                    invoke(args) {
                        // 如果请求时没有添加用户认证标识，则自动添加用户认证标识,这样就不用我们每次去写
                        if (!args.data.loginMark && !args.data.token) {
                            args.data.loginMark = context.auth.loginMark;
                            args.data.token = context.auth.token;
                        }
                    },
                    success(res) {
                        // 没有用户认证，跳转到登录页面，该状态码是410
                        if (res.data.code === 410) {
                            uni.navigateTo({
                                url: '/pages/login'
                            });
                        }
                    }
                });
            }

            // resize_window() {// 因为设计图是带1920*1080的，但是浏览器本身带顶部工具栏，所以缩放到时候稍微更小一点，这样不会有滚动条，这个值可以选择更大些，比如2300，这样左右两边会有空白
            //   let myWidth = document.documentElement.clientWidth
            //   let myHeight = document.documentElement.clientHeight
            //   if( myHeight / 2300 !== 0 && (( myWidth / 2300) / (myHeight / 1080) >= 1)){
            //     console.log()
            //     this.scalesNum = myHeight / 1080
            //   }else{
            //     this.scalesNum = myWidth / 1920
            //   }
            // }
        },
        watch: {
            auth(newValue) {
                if (newValue.token) {
                    clearInterval(this.timer)
                    this.getBacklog()
                    this.timer = setInterval(() => {
                        this.getBacklog()
                    }, 60000)
                }

            },
            backlog(newVal) {
                // console.log('watch里监听到的待办任务数',newVal)

                if (this.reqid == 1) {
                    // console.log('设置角标')
                }
                // #ifdef APP-PLUS
                // 设置桌面角标为代办任务数量
                if (this.reqid == 1) {
                    plus.runtime.setBadgeNumber(newVal)
                }
                // #endif
            },
            reqid(newVal) {
                // console.log('watch监听到reqid',newVal)
                if (newVal == 0) {
                    clearInterval(this.timer)
                }
            }
        },
    };
</script>

<style lang="less">
    @import url('./components/learun-ui-wx/style/index.css');
    @import url('./common/css/uni.css'); //uni Hello 样式
    @import url('./common/css/qiun.css'); //ucharts插件 样式

    page {
        background-color: #f3f3f3;
    }

    /* #ifdef H5 */
    uni-page-head {
        .uni-page-head__title {
            font-weight: 400;
        }
    }

    /* #endif */



    // #app{
    //   margin: 0;
    //   padding: 0;
    //   transform-origin: 0 0;
    //   position:relative;
    //   width:1920px;
    //   height: 1080px;
    //   left:50%;
    //   overflow: hidden;
    // }
</style>

<style lang="less">
    .uni-app--maxwidth {
        &::v-deep .uni-toast {
            padding: 0 10px;
        }
    }
</style>
