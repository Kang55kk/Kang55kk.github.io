<template>
    <view class="getPhotoInfo">
        <uni-file-picker v-model="imageValue" fileMediatype="image" mode="grid" @select="select" @progress="progress"
            @success="success" @fail="fail" limit="10" :readonly="false" :limit="1" />
        </uni-file-picker>
        <text>{{data1}}</text>
        <!-- <div class="imgBox">
            <u-album :urls="urls1" keyName="src2"></u-album>
        </div> -->
    </view>



</template>

<script>
    export default {

        data() {
            return {
                imageValue: [],
                data1: '',
                urls1: [{
                    src2: 'https://cdn.uviewui.com/uview/album/1.jpg',
                }]
            }
        },

        methods: {
            // 获取上传状态
            async select(e) {
                let _this = this
                // console.log('选择文件：', e.tempFiles[0].file)
                let file = e.tempFiles[0].file
                console.log(this.imageValue);
                let img32str = (function randomString() {
                    let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
                    let character = '';
                    for (let i = 0; i < 32; i++) {
                        character += chars.charAt(Math.floor(Math.random() *
                            48))
                    }
                    return character;
                })()
                uni.showLoading({
                    title: '正在识别图片信息'
                });
                uni.uploadFile({
                    method: "POST",
                    url: this.apiRoot`/annexes/uploadocr`,
                    formData: {
                        ...this.auth,
                        data: JSON.stringify({
                            id: img32str
                        }),
                    },
                    name: 'file',
                    filePath: file.path,
                }).then(([err, res]) => {
                    this.$emit("identify", {
                        invoiceContent: JSON.parse(res.data).data,
                        img32str,
                        filePath: file.path,
                    })
                    uni.hideLoading()
                })

            },
            // 获取上传进度
            progress(e) {
                console.log('上传进度：', e)
            },

            // 上传成功
            success(e) {
                console.log('上传成功')
            },

            // 上传失败
            fail(e) {
                console.log('上传失败：', e)
            },
        }
    }
</script>

<style lang="less" scoped>
    .getPhotoInfo {
        background-color: white;

        &::v-deep .uni-file-picker__container {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding-right: 24rpx;
        }

        &::v-deep .is-add {
            width: 100%;
            height: 80%;
        }

        &::v-deep .icon-add {
            width: 50%;
            height: 10%;
        }

        &::v-deep .icon-del-box {
            height: 30%;
            width: 30%;
            right: 4%;
            top: 4%;

            .icon-del {
                width: 20%;
                height: 60%;


            }
        }

        .imgBox {
            &::v-deep uni-image {

                width: 136rpx !important;
                height: 86rpx !important;
            }

            position: absolute;
        }
    }
</style>
