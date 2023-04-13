<template>
    <!-- <iframe src="" frameborder="0">
        
    </iframe> -->
    <page-meta></page-meta>
    <view class="page-xxx">
        <web-view :src="docURL">
        </web-view>
    </view>
</template>

<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js">

</script>
<script>
    export default {
        data() {
            return {
                base_url: '/static/pdfjs/web/viewer.html',
                // docURL: '',
                docURL: '/static/pdfjs/web/viewer.html?file=http://gd.lianheerp.cn:8899/LR_SystemModule/Annexes/PreviewFile?fileId=ea3f6108-50d8-c491-3f9e-69e346d199bf',
                timer: null,
                
            }
        },
        onLoad(options) {
            uni.showLoading({
                title: `加载中...`,
                mask: true
            })
            if (options.module1 == "shengchan") {
                    // encodeURIComponent(this
                    // 	.apiRoot`/LR_SystemModule/Annexes/PreviewFile?fileId=${options.code}"`
                    // )
                this.docURL = this.base_url + '?file=' +
                    encodeURIComponent(this.apiRoot`/annexes/previewfile?fileId=${options.code}`)
                    console.log(options.code);
                    // "http://gd.lianheerp.cn:8899/LR_SystemModule/Annexes/PreviewFile?fileId=ea3f6108-50d8-c491-3f9e-69e346d199bf"
                    console.log(this.docURL);
            } else if (options.F_ProcessId) {
                this.docURL = this.base_url + '?file=' +
                    encodeURIComponent(this
                        .apiRoot`/annexes/previewreport?F_ProcessId=${options.F_ProcessId}&fileName=${options.fileName}`
                    )
            } else {
                let convertType = 0
                options.ispdf ? convertType = 20 : convertType = 0
                let selfUrl = this.apiRoot`/annexes/previewfile?fileId=${options.attachment}`
                uni.request({
                    method: "POST",
                    url: "https://www.yozodcs.com/fcscloud/file/http",
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Origin": "https://www.yozodcs.com"

                    },
                    data: {
                        fileUrl: selfUrl
                    },
                    success: (res) => {
                        let param = res.data.data.data
                        uni.request({
                            method: "POST",
                            url: "https://www.yozodcs.com/fcscloud/composite/convert",
                            header: {
                                "Content-Type": "application/x-www-form-urlencoded",
                                "Origin": "https://www.yozodcs.com"
                            },
                            data: {
                                convertType: convertType,
                                fileUrl: selfUrl,
                                srcRelativePath: param,

                            },
                            success: (res) => {
                                this.docURL = res.data.data.viewUrl
                            },
                            fail: (res) => {
                                console.log(res);
                            }
                        })
                    },
                    fail: (res) => {
                        console.log(res);
                    }
                })
            }



            // if (options.ispdf) {
            // 	console.log(this.apiRoot`/annexes/previewfile?fileId=${options.attachment}`,"我谢谢你啊");
            // 	this.docURL = encodeURIComponent(this.apiRoot`/annexes/previewfile?fileId=${options.attachment}`)
            // } else if (!options.attachment) {
            // 	this.docURL = this.base_url + '?file=' +
            // 		encodeURIComponent(this
            // 			.apiRoot`/annexes/previewreport?F_ProcessId=${options.F_ProcessId}&fileName=${options.fileName}`)
            // } else if (options.attachment) {
            // 	this.docURL =
            // 		`https://view.officeapps.live.com/op/embed.aspx?src=${this.apiRoot}/annexes/previewfile?fileId=${options.attachment}`

            // 	console.log(this.docURL);
            // }

        },
        mounted() {

            setTimeout(function() {
                uni.hideLoading()
            }, 2000);
            uni.setNavigationBarTitle({
                //这是修改后的导航栏文字
                title: "文件预览"
            })
            this.timer = setInterval(function() {
                uni.setNavigationBarTitle({
                    //这是修改后的导航栏文字
                    title: "文件预览"
                })
            }, 100)
            // setTimeout(()=> {
            // 	clearInterval(this.timer)
            // 	this.timer = ""
            // }, 10000);

        },
        onReady() {

            setTimeout(function() {

                let iframe = document.getElementsByTagName("iframe")[0]

            }, 3000)
        },
        beforeDestroy() {
            clearInterval(this.timer)
        }


    }
</script>

<style lang="less">


</style>
