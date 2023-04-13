<template>
    <view>

        <view id="downLoad">
            <uni-popup ref="popup" type="bottom" :mask-click="true">
                <p class="title">是否打开附件:{{downLoadInfo.fileName}}</p>
                <div class="btnBox">
                    <button @click="downLoadFile(0)">取消</button>
                    <button style="background-color: green;color: white;" @click="downLoadFile(1)">在线预览</button>
                    <button style="background-color: rgb(0, 92, 200);color: white;"
                        @click="downLoadFile(2)">下载预览</button>
                </div>
            </uni-popup>
        </view>

        <view :key="item.id" v-for="(item, index) of scheme" class='father'>
            <!-- 标题文字 label -->
            <template v-if="item.type === 'label'">
                <view v-if="index !== 0" style="height: 30rpx;">
                </view>
                <l-title border>{{ item.title }}</l-title>
                <slot v-if="item.type === 'label'&& (!!item.dfvalue || !!getValue(item.__valuePath__))">
                    <view id="lookPDF" @click="lookPDF(item)" :class="{alignment:index !== 0 }">
                        查看PDF
                    </view>
                </slot>
            </template>

            <!-- 文字输入框 text -->
            <l-input v-else-if="item.type === 'text' &&item.isHide !=1" right
                @input="setValue(item.__valuePath__, $event)" :value="numDispose(getValue(item.__valuePath__))"
                :disabled="!isEdit(item)" :required="isRequired(item.verify)" :title="item.title"
                :placeholder="displayPlaceHolder(item)" :item="item" />

            <!-- 单选和选择 radio和select -->
            <l-select v-else-if="item.type === 'radio' || item.type === 'select'"
                @input="setValue(item.__valuePath__, $event)" :value="getValue(item.__valuePath__)"
                :disabled="!isEdit(item)" :arrow="isEdit(item)" :required="isRequired(item.verify)"
                :range="item.__sourceData__" :title="item.title" :placeholder="displayPlaceHolder(item)" />

            <!-- 多选 checkbox -->
            <l-checkbox-picker v-else-if="item.type === 'checkbox'" @open="modal = 'checkbox'" @close="modal = null"
                @input="setValue(item.__valuePath__, $event)" :value="getValue(item.__valuePath__)"
                :readonly="!isEdit(item)" :required="isRequired(item.verify)" :range="item.__sourceData__"
                :arrow="isEdit(item)" :title="item.title" :placeholder="displayPlaceHolder(item)" />

            <!-- 多行文本 textarea -->
            <l-textarea v-else-if="item.type === 'textarea' || item.type === 'texteditor'"
                @input="setValue(item.__valuePath__, $event)" :value="getValue(item.__valuePath__)"
                :readonly="!isEdit(item)" :required="isRequired(item.verify)" :title="item.title"
                :placeholder="displayPlaceHolder(item)" :hide="modal" formMode />

            <!-- 时间日期 datetime -->
            <l-datetime-picker v-else-if="item.type === 'datetime' && Number(item.dateformat) === 1"
                @open="modal = 'datetime'" @close="modal = null" @input="setValue(item.__valuePath__, $event)"
                :value="getValue(item.__valuePath__)" :disabled="!isEdit(item)" :required="isRequired(item.verify)"
                :arrow="isEdit(item)" :title="item.title" :placeholder="displayPlaceHolder(item)" />

            <!-- 日期 date -->
            <l-date-picker v-else-if="item.type === 'datetime' && Number(item.dateformat) !== 1"
                @input="setValue(item.__valuePath__, $event)" :value="getValue(item.__valuePath__)"
                :required="isRequired(item.verify)" :disabled="!isEdit(item)" :arrow="isEdit(item)" :title="item.title"
                :placeholder="displayPlaceHolder(item)" />

            <!-- 当前状态信息 currentInfo / 编码 encode / 时间区间 datetimerange -->
            <l-label v-else-if="item.type === 'currentInfo' || item.type === 'encode' || item.type === 'datetimerange'"
                :required="isRequired(item.verify)" :title="item.title">
                {{ displayItem(item) || '' }}
            </l-label>

            <!-- 公司人员结构选单 organize -->
            <l-organize-picker v-else-if="item.type === 'organize'" @input="setValue(item.__valuePath__, $event)"
                :value="getValue(item.__valuePath__)" :type="item.dataType" :arrow="isEdit(item)"
                :required="isRequired(item.verify)" :readonly="!isEdit(item)" :title="item.title"
                :placeholder="displayPlaceHolder(item)" />

            <!-- 文件上传 upload -->
            <template v-else-if="item.type === 'upload'">
                <view class="cu-form-group" style="border-bottom: none">
                    <view class="title">
                        <text v-if="isRequired(item.verify)" style="color:red;font-size: 1.2em;">*</text>
                        {{ item.title }}
                    </view>
                </view>
                <view class="attachmentList">
                    <view v-for="(attachment,index) in attachmentList[item.id]" :key="index" class="attachment"
                        @click="clickAttachment(attachment,attachmentList)">
                        <view class="attachmentPhoto" v-if="attachment.imageUrlArr">
                            <u-album :urls="attachment.imageUrlArr" keyName="imageUrl"></u-album>
                        </view>
                        <view v-else class="extensionName">
                            <image style="height:50px;" mode="aspectFit"
                                :src="`/static/img-attachment/${attachmentIcon(attachment.F_FileExtensions)}.png`">
                        </view>
                        <span>
                            {{attachment.F_FileName}}
                        </span>

                    </view>
                </view>
                <!-- <l-upload
          @input=" setValue(item.__valuePath__, $event)" :value="getValue(item.__valuePath__)"
                                :readonly="!isEdit(item)" :number="1" /> -->
            </template>

            <!-- HTML内容 html -->
            <view v-else-if="item.type === 'html'" class="cu-form-group">
                <view class="bg-white">
                    <view v-html="displayItem(item)"></view>
                </view>
            </view>

            <!-- 表格 girdtable -->
            <l-custom-form-table v-else-if="item.type === 'girdtable'" @input="setValue(item.__valuePath__, $event)"
                :value="getValue(item.__valuePath__)" :item="item" :edit="isEdit(item)" />
        </view>
    </view>
</template>

<script>
    import _ from 'lodash'
    import moment from 'moment'
    import {
        guid,
        convertHtml
    } from '@/common/utils.js'
    import LCustomFormTable from './custom-form-table.vue'
    import LOrganizePicker from '@/components/learun-app/organize-picker.vue'

    export default {
        name: 'l-custom-form',

        props: {
            scheme: {
                type: Array,
                default: () => []
            },
            editMode: {
                type: Boolean,
                default: true
            },
            initFormValue: {
                type: Object,
                default: () => ({})
            },
            F_ProcessId: {
                type: String,
                default: ""
            }
        },

        components: {
            LCustomFormTable,
            LOrganizePicker
        },

        data() {
            return {
                formValue: this.initFormValue,
                modal: false,
                attachmentList: {},
                showPhoto: false,
                attachmentPhotoUrl: "", //点击附件图片时候显示
                urls1: [{
                    src2: 'https://cdn.uviewui.com/uview/album/1.jpg',
                }],
                attachmentPhotoUrlList: "",
                // docType: ["excel.png", "jpg.png", "PDF.png", "qita.png", "txt.png", "weizhiwenjian.png", 'WORD.png']
                downLoadInfo: {
                    showConfirmBox: false,
                    downLoadUrl: "",
                    fileName: ''
                },
                startDownload: false


            }
        },
        computed: {

            verify() {
                return {
                    NotNull: t => t.length > 0 || '不能为空',
                    Num: t => !isNaN(t) || '须输入数值',
                    NumOrNull: t => t.length <= 0 || !isNaN(t) || '须留空或输入数值',
                    Email: t => /^[a-zA-Z0-9-_.]+@[a-zA-Z0-9-_]+.[a-zA-Z0-9]+$/.test(t) || '须符合Email格式',
                    EmailOrNull: t =>
                        t.length <= 0 || /^[a-zA-Z0-9-_.]+@[a-zA-Z0-9-_]+.[a-zA-Z0-9]+$/.test(t) || '须留空或符合Email格式',
                    EnglishStr: t => /^[a-zA-Z]*$/.test(t) || '须由英文字母组成',
                    EnglishStrOrNull: t => t.length <= 0 || /^[a-zA-Z]*$/.test(t) || '须留空或由英文字母组成',
                    Phone: t => /^[+0-9- ]*$/.test(t) || '须符合电话号码格式',
                    PhoneOrNull: t => t.length <= 0 || /^[+0-9- ]*$/.test(t) || '须留空或符合电话号码格式',
                    Fax: t => /^[+0-9- ]*$/.test(t) || '须符合传真号码格式',
                    Mobile: t => /^1[0-9]{10}$/.test(t) || '须符合手机号码格式',
                    MobileOrPhone: t => /^[+0-9- ]*$/.test(t) || /^1[0-9]{10}$/.test(t) || '须符合电话或手机号码格式',
                    MobileOrNull: t => t.length <= 0 || /^1[0-9]{10}$/.test(t) || '须留空或符合手机号码格式',
                    MobileOrPhoneOrNull: t =>
                        t.length <= 0 || /^1[0-9]{10}$/.test(t) || /^[+0-9- ]*$/.test(t) || '须留空或符合手机/电话号码格式',
                    Uri: t => /^[a-zA-z]+:\/\/[^\s]*$/.test(t) || '须符合网址Url格式',
                    UriOrNull: t => t.length <= 0 || /^[a-zA-z]+:\/\/[^\s]*$/.test(t) || '须留空或符合网址Url格式'
                }
            }
        },

        created() {
            this.scheme.forEach(e => {
                if (e.type == "upload") {
                    this.addAttachmentList(e.id)
                }
            })
        },

        methods: {

            downLoadFile(yesOrNo) {
                this.$refs.popup.close()
                // console.log(this.downLoadInfo);
                let ext = this.downLoadInfo.extensions.replace(".", "").toLowerCase()
                if (yesOrNo == 1) {
                    uni.navigateTo({
                        url: `/pages/nworkflow/myflow/doc?attachment=${this.downLoadInfo.downLoadUrl.split("=")[1]}&ispdf=${ext=='pdf'?ext:""}`,
                    })
                    // #ifdef APP-PLUS
                    // 跳转去浏览器下载
                    // plus.runtime.openURL(this.downLoadInfo.downLoadUrl)
                    // #endif
                } else if (yesOrNo == 2) {
                    // #ifdef APP-PLUS
                    this.downloadFileInApp(this.downLoadInfo.downLoadUrl, this.downLoadInfo.fileName)
                    // #endif
                    // #ifdef H5
                    uni.downloadFile({
                        url: this.downLoadInfo.downLoadUrl,
                        success: (e) => {
                            console.log(e);
                            uni.showToast({
                                title: '下载成功'
                            });
                        },
                        fail: (e) => {
                            console.log(e);
                            uni.showToast({
                                title: '下载失败'
                            });
                        }
                    })
                    // #endif
                }

            },


            downloadFileInApp(fileUrl, fileName) {
                // app内下载文件方法
                uni.showLoading({
                    title: '下载中',
                })
                //文件名称可以在上传时进行保存，下载时取出，当文件名称中存在单双引号时，要做好处理，否则会报错
                //item.fileUrl 为线上文件下载路径
                let dtask = plus.downloader.createDownload(fileUrl, {
                    filename: "_downloads/" + fileName
                    //利用保存路径，实现下载文件的重命名
                }, function(d, status) {
                    //d为下载的文件对象
                    if (status == 200) {
                        uni.hideLoading()
                        //下载成功,d.filename是文件在保存在本地的相对路径，使用下面的API可转为平台绝对路径
                        let fileSaveUrl = plus.io.convertLocalFileSystemURL(d.filename);
                        this.fileUrl = fileSaveUrl
                        console.log(this.fileUrl);
                        plus.runtime.openFile(d.filename); //选择软件打开文件
                    } else {
                        uni.hideLoading()
                        //下载失败
                        uni.showToast({
                            title: '下载失败'
                        });
                        plus.downloader.clear(); //清除下载任务
                        console.log("下载失败");
                    }
                })
                dtask.start();

            },


            //点击附件触发,可能是展开图片,可能是是下载附件
            async clickAttachment(attachments, attachmentList) {
                let ets = attachments.F_FileExtensions.replace('.', '')
                if ((ets == "jpg" || ets == "png" || ets == "jpeg" || ets == "gif" || ets == "svg") && attachments
                    .imageUrlArr[0].imageUrl) {
                    console.log(attachments
                        .imageUrlArr[0].imageUrl);
                } else {
                    this.downLoadInfo.downLoadUrl = this.apiRoot`/annexes/previewfile?fileId=${attachments.F_Id}`
                    this.downLoadInfo.fileName = attachments.F_FileName
                    this.downLoadInfo.extensions = attachments.F_FileExtensions
                    // this.downLoadInfo.showConfirmBox = true
                    this.$refs.popup.open('bottom')

                    this.downLoadInfo = {
                        ...this.downLoadInfo
                    }
                }
            },

            //根据附件类型显示不同的图标
            attachmentIcon(n) {
                //n为拓展名,注意数据中拓展名有.,传进来要去掉
                n = n.replace(".", "").toLowerCase()
                if (n == "jpg" || n == "png") {
                    return 'jpg'
                } else if (n == 'docx' || n == 'doc') {
                    return 'word'
                } else if (n == 'xlsx' || n == "xls") {
                    return 'excel'
                } else if (n == 'pdf') {
                    return 'pdf'
                } else if (n == 'sql') {
                    return 'sql'
                } else if (n == 'txt') {
                    return 'txt'
                } else if (n == 'ppt') {
                    return 'ppt'
                } else {
                    return 'weizhiwenjian'
                }
            },


            // 本方法由调用方使用 $refs 的方式调用
            // 获取 formValue 表单数据值
            getFormValue() {
                return this.formValue
            },

            //是否显示附件图片
            changShowPhoto(YesOrNo) {

                this.showPhoto = YesOrNo
                if (!YesOrNo) {
                    this.attachmentPhotoUrlList = []
                }
                console.log(this.F_ProcessId, item.dfvalue);
            },

            //搜集所有附件内容
            async addAttachmentList(id) {
                // String(n) ? this.showPhoto = n : this.showPhoto = !this.showPhoto
                // console.log(n);
                // console.log(thi	s.formValue.formreq[0].formData);
                let attachmentList = []

                this.formValue.formreq.forEach(e3 => {
                    for (let key in e3.formData) {
                        if (id == key) {
                            if (e3.formData[key][0]) {
                                if (e3.formData[key][0].includes('data=')) {
                                    var attachment = e3.formData[key][0].split("data=")[1]
                                } else {
                                    var attachment = e3.formData[key]
                                }

                                uni.request({
                                    url: this.apiRoot`/annexes/list`,
                                    data: {
                                        data: attachment,
                                        ...this.auth
                                    }
                                }).then(([err, res]) => {
                                    attachmentList = res.data.data
                                    attachmentList.forEach(e => {
                                        if (e.F_FileExtensions == ".png" || e
                                            .F_FileExtensions == ".jpg") {
                                            e.imageUrlArr = [{
                                                imageUrl: this
                                                    .apiRoot`/annexes/previewfile?fileId=${e.F_Id}`
                                            }]

                                        } else {
                                            e.docUrl = this
                                                .apiRoot`/annexes/previewfile?fileId=${e.F_Id}`
                                        }
                                        e.photoUrl = this.attachmentIcon(e.F_FileExtensions
                                            .replace(".",
                                                ""))
                                        // console.log(e.photoUrl);

                                    })
                                    this.attachmentList[id] = attachmentList
                                    this.attachmentList = {
                                        ...this.attachmentList
                                    }
                                    // console.log(this.attachmentList);
                                }).catch((e) => {
                                    console.log(e)
                                })
                            } else {
                                console.log("没有值");
                            }
                        }
                    }
                })


            },


            //查看PDF
            lookPDF(item) {
                console.log(this.F_ProcessId, this.scheme[0].dfvalue);
                console.log('this.getValue(item.__valuePath__)', this.getValue(item.__valuePath__));
                try {
                    if (!!this.getValue(item.__valuePath__)) {
                        uni.navigateTo({
                            url: `/pages/nworkflow/myflow/doc?F_ProcessId=${this.F_ProcessId}&fileName=${this.getValue(item.__valuePath__)}`,
                        })
                    } else if (!!item.dfvalue) {
                        uni.navigateTo({
                            url: `/pages/nworkflow/myflow/doc?F_ProcessId=${this.F_ProcessId}&fileName=${item.dfvalue}`,
                        })
                    }

                } catch (e) {
                    //TODO handle the exception
                    console.log(e);
                }


            },

            // 本方法由调用方使用 $refs 的方式调用
            // 重置 formValue 表单数据值
            resetFormValue(newVal) {
                this.formValue = newVal || this.initFormValue
            },

            // 本方法由调用方使用 $refs 的方式调用
            // 依次验证表单项，返回一个所有错误提示的数组，如果为空数组则表示无错误
            verifyValue() {
                const errorList = []

                this.scheme
                    .filter(t => t.verify)
                    .forEach(schemeItem => {
                        if (schemeItem.table && schemeItem.field) {
                            const verifyFunc = this.verify[schemeItem.verify]
                            const verifyResult = verifyFunc(this.getValue(schemeItem.__valuePath__))
                            if (verifyResult !== true) {
                                errorList.push(`[${schemeItem.title}]: ${verifyResult}`)
                            }
                        } else if (schemeItem.fieldsData) {
                            this.getValue(schemeItem.__valuePath__).forEach((valueItem, valueIndex) => {
                                schemeItem.fieldsData.forEach(fieldItem => {
                                    const verifyFunc = this.verify[fieldItem.verify]
                                    const verifyResult = verifyFunc(
                                        this.getValue(
                                            `${schemeItem.__valuePath__}.${valueIndex}.${fieldItem.field}`
                                        )
                                    )
                                    if (verifyResult !== true) {
                                        errorList.push(
                                            `[表格${schemeItem.title}第${tableIndex}行${fieldItem.name}列]: ${verifyResult}`
                                        )
                                    }
                                })
                            })
                        }
                    })

                return errorList
            },

            // 设置表单数据的方法
            setValue(path, value) {
                _.set(this.formValue, path, value)
            },

            // 获取表单数据的方法
            getValue(path) {
                return _.get(this.formValue, path)
            },

            // 获取表单项的显示内容
            // 例如组织结构选单、多选框、HTML内容，需要格式化后显示
            displayItem(item) {
                const path = item.__valuePath__

                switch (item.type) {
                    case 'currentInfo':
                    case 'organize':
                        switch (item.dataType) {
                            case 'user':
                                return _.get(this.$store.state.staff, `${this.getValue(path)}.name`, '')
                            case 'department':
                                return _.get(this.$store.state.dep, `${this.getValue(path)}.name`, '')
                            case 'company':
                                return _.get(this.$store.state.company, `${this.getValue(path)}.name`, '')
                            default:
                                return this.getValue(path)
                        }

                        case 'datetimerange':
                            const startTime = this.getValue(this.scheme.find(t => t.id === item.startTime)
                                .__valuePath__)
                            const endTime = this.getValue(this.scheme.find(t => t.id === item.endTime)
                                .__valuePath__)
                            if (!startTime || !endTime || moment(endTime).isBefore(startTime)) {
                                return '-'
                            }
                            return moment
                                .duration(moment(endTime).diff(moment(startTime)))
                                .asDays()
                                .toFixed(0)

                        case 'html':
                            return convertHtml(item.title || '')

                        default:
                            return this.getValue(path) || ''
                }
            },

            // 获取表单项的 placeholder ，在无法编辑时隐藏
            displayPlaceHolder(item) {
                const edit = this.isEdit(item)
                switch (item.type) {
                    case 'text':
                    case 'textarea':
                    case 'texteditor':
                        return edit ? `请输入${item.title || item.name}` : ''

                    case 'checkbox':
                    case 'radio':
                    case 'select':
                    case 'datetime':
                    case 'organize':
                    case 'layer':
                        return edit ? `请选择${item.title || item.name}` : ''

                    default:
                        return ''
                }
            },

            // 获取表单项可否编辑，控制 placeholder 显示与否，以及是否显示箭头
            isEdit(item) {
                return this.editMode && item.edit !== 0
            },
            isRequired(verify) {
                if (!verify) {
                    return false
                } else {
                    if (verify === true || verify === 'NotNull') {
                        return true
                    } else {
                        return false
                    }
                }


            }
        },


    }
</script>

<style lang="less" scoped>
    #downLoad {
        background-color: white;

        &::v-deep .title {
            color: #626060;
            padding: 30rpx 0;
            font-size: 20px;
            font-weight: 550;
            height: 100rpx;
            background-color: white;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        &::v-deep .uni-popup__wrapper {
            background-color: white !important;
        }

        .btnBox {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        &::v-deep uni-button {
            width: 50%;
            font-size: 18px;
            border-radius: 0;
            height: 100rpx;
            display: flex;
            justify-content: center;
            align-items: center;

            &::after {
                border-radius: 0;
                border: none;
            }

            &:last-child {
                &:hover {
                    // background-color: white !important;
                }
            }
        }
    }

    .father {
        position: relative;

        #lookPDF {
            // color: red;
            position: absolute;
            height: 40rpx;
            right: 30rpx;
            top: calc(50% - 20rpx);
            font-size: 30rpx;
            color: #0000ffa8;
        }

        .alignment#lookPDF {
            top: calc(50% - 6rpx);
        }
    }

    .attachmentList {
        // padding-top: 20rpx;
        display: flex;
        justify-content: flex-start;
        background-color: #fcfcfc;
        overflow-x: auto;
        width: 100vw;

        .attachmentPhoto {
            flex-shrink: 0;
            padding: 4rpx;

            &::v-deep img {
                display: block;
                // width: 92rpx;
                // height: 100rpx;
            }

            &::v-deep uni-image {
                // width: 92rpx !important;
                height: 100rpx !important;
            }
        }



        .attachment {
            overflow: hidden;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-direction: column;
            margin: 0rpx 20rpx 20rpx 0;
            width: 100rpx;
            flex-shrink: 0;

            &:first-child {
                margin-left: 20rpx;
            }

            .extensionName {
                width: 100rpx;
                box-sizing: border-box;
                // border-radius: 16rpx;
                padding: 5rpx;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 30rpx;
                letter-spacing: 2rpx;
                color: gray;
            }


            span {
                max-width: 80rpx;
                text-overflow: ellipsis;
                font-size: 10px;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                display: -moz-box;
                -moz-line-clamp: 2;
                -moz-box-orient: vertical;
                overflow-wrap: break-word;
                word-break: break-all;
                white-space: normal;
                overflow: hidden;

            }

            uni-image {
                // border-radius: 16rpx;
                // overflow: hidden;
                // border: 1rpx solid gray;
                // width: 80%;
            }

            &::v-deep img {
                // border-radius: 30rpx;display: block;
            }
        }
    }

    // #photoAttachments {
    // 	position: fixed;
    // 	top: 0;
    // 	left: 0;
    // 	z-index: 999;
    // 	width: 100vw;

    // 	.attachmentPhoto {
    // 		height: 100vh;
    // 		background-color: black;
    // 		display: flex;
    // 		justify-content: center;
    // 		align-items: center;

    // 		&::v-deep uni-image {
    // 			width: 100vw;
    // 		}

    // 		&::v-deep img {
    // 			width: 100vw;
    // 			height: auto;
    // 		}
    // 	}

    // 	#swiper {
    // 		height: 100vh;
    // 		background-color: #000000f5;

    // 		&::v-deep uni-swiper-item {
    // 			// background-color: red;
    // 			display: flex;
    // 			justify-content: center;
    // 			align-items: center;

    // 			&::v-deep img {
    // 				width: 750rpx;
    // 				// height: auto;
    // 				background-color: black;
    // 			}
    // 		}


    // 	}

    // }
    .cu-form-group {
        &::v-deep uni-textarea {
            // background-color: red;
        }
    }
</style>
