<!-- 调用实例:@/pages/FinanceExpense/COST_REIM/single.vue -->
<!-- single3更新说明:
1.<重要>此处的data会实时更新到父组件single，变量名为childData
2.计算属性不需要到这里配置了，在父组件single computed配置主表计算属性mainCal，子表计算属性childTableCal，父组件利用this.childData可以获取到此组件的所有data -->
<!-- 3.有些原来说的物料表修改为字表，但其实是一样的，多数没改 -->
<template>
    <!-- 实现单据增删查改 -->
    <!-- 组件说明：需要传值单据模板，你需要展示什么信息在页面，传值模板可参考page/CGDDB/single调用示范 -->
    <!-- formData是发ajax从页面获取的，获取整个页面数据，formItems和materialDetails(子表模板)是调用组件时候需要传过来的 -->
    <!-- formData为获取到的单据数据，里面包含主表信息orderData和子表信息orderProductData -->
    <view class="page">
        <!-- <button @click="chooseDataIndex" :style="`color:${color};`">调试</button> -->
        <u-picker :show="pickerShow&&(!chooseItem.selectType)" :columns="[chooseItem.options]"
            @cancel="pickerShow=false" @confirm="pickerChoose" :closeOnClickOverlay="true" @close="pickerShow=false">
        </u-picker>
        <u-datetime-picker :show="pickerShow&&(chooseItem.selectType=='date')" :value="Number(new Date())"
            @cancel="pickerShow=false" @confirm="pickerChoose" mode="date" :defaultIndex="[10,2,13]"
            :closeOnClickOverlay="true" @close="pickerShow=false">
        </u-datetime-picker>

        <!-- 页面主体数据 -->
        <template v-for="(item,index) in formItems">
            <view class="aLine" :class="item.type+' '+item.field+' '+(item.hidden?'hidden':'')"
                v-if="item.type=='title'">
                <view class="left">
                    <view class="circle"></view>
                    <div class="text">{{item.value}}</div>
                </view>
            </view>
            <!-- 自动计算 -->
            <view class="aLine" :class="item.type+' '+item.field+' '+(item.hidden?'hidden':'')"
                v-else-if="item.computed">
                <div class="left">
                    <text class="must" v-if="item.must">*</text>
                    <div class="title">{{item.title}}</div>
                </div>
                <div class="right" @click="showPicker(item);">
                    <input type="text" :value="mainCal[item.field]" v-if="formData[mainTableName]"
                        :placeholder="placeholder(item)" disabled>
                </div>
            </view>
            <view class="aLine" :class="item.type+' '+item.field+' '+(item.hidden?'hidden':'')"
                v-else-if="item.type=='input'||item.type=='select'">
                <div class="left">
                    <text class="must" v-if="item.must">*</text>
                    <div class="title">{{item.title}}</div>
                </div>
                <div class="right" @click="showPicker(item);">
                    <input v-if="formData[mainTableName]" type="text" :placeholder="placeholder(item)"
                        v-model="item.value" @input="Calculate(item,'main')"
                        :disabled="(!editMode)||item.disabled||(item.type=='select')||(item.computed)">
                    <div class="icon" v-if="editMode&&(item.type=='select')&&(!item.disabled)&&(!item.computed)">
                        <u-icon name="arrow-right" color="rgb(133 132 132)" size="17"></u-icon>
                    </div>
                    <div class="icon" @click.stop="clearChoose(index)"
                        v-if="editMode&&(item.showEmptyBtn)&&(!item.disabled)&&(!item.computed)">
                        <u-icon name="close-circle-fill" color="rgb(133 132 132)" size="25"></u-icon>
                    </div>
                </div>
            </view>
        </template>


        <!-- 从表列表 -->
        <view v-for="(tableItem, tableIndex) of formData[allProps.childTableName]" :key="tableIndex">
            <view class="commodity">
                <image src="/static/img-mix/data.png" mode="aspectFit"></image>
                <view class="right">
                    <view class="info">
                        <view v-for="(item,index) in briefChildTableInfo" :key="index" class="an_info">
                            <text
                                :style='{ fontSize:index==0?"15px":"12px",fontWeight:index==0?"550":""}'>{{briefChildTableInfo[index].name+": "+(tableItem[briefChildTableInfo[index].field]||"-")
                                }}</text>
                        </view>
                    </view>
                    <view class="operatingBtn">
                        <view class="showDetail" @click="showChildTableDetails(tableIndex)"
                            style="white-space: nowrap;">
                            {{editMode?"修改":"查看详情"}}
                        </view>
                        <view v-if="!hideLookInvoice" class="showDetail"
                            @click="showChildTableDetails(tableIndex,'invoice')" style="white-space: nowrap;">
                            {{editMode?"修改发票明细":"查看发票明细"}}
                        </view>
                        <view v-if="editMode" @click="tableDelete(tableIndex)" class="deleGood">
                            删除
                        </view>
                    </view>
                </view>
            </view>

        </view>
        <view v-if="editMode" class="bg-white flex flex-wrap justify-center align-center solid-bottom"
            @click="addMateria">
            <view class="add-btn text-blue padding">+ 添加数据</view>
        </view>

        <!-- 从表明细弹出层 -->
        <view v-if="showPopup">
            <u-popup :show="showPopup" mode="center" class="k-u-popup" :closeOnClickOverlay="true"
                @close="showPopup=false">
                <template>
                    <view class="invoice" v-if="chooseChildTableType=='invoice'">
                        <view class="operator">
                            <operator @operatorData="updateOperatorData($event) " :formHeader="formHeader"
                                :tableData="invoiceList" :module1="allProps.module1">
                            </operator>
                        </view>
                        <view class="btns" v-if="editMode">
                            <button v-for="(btn,index) in invoiceBtns" @click="invoiceBtnsClick({btn,index})"
                                :key="index">{{btn.name}}</button>
                        </view>
                        <view class="btns" v-if="!editMode">
                            <button @click="invoiceBtnsClick({btn:{name:'确定'},index:3})">返回</button>
                        </view>
                    </view>
                </template>
                <template v-if="chooseChildTableType=='childTable'">
                    <view class="k-popup">
                        <view class="modeExplain">
                            {{editMode?"修改模式":"预览模式"}}
                        </view>
                        <template v-for="(item,index) in materialDetails">
                            <!-- materialDetails为渲染出来的列表模板 -->
                            <!-- <view class="aLine" :class="item.type" v-if="item.type=='title'">
                            <view class="left">
                                <view class="circle"></view>
                                <div class="text">{{item.text}}</div>
                            </view>
                        </view> -->
                            <view class="aLine" :class="item.type+' '+item.field+' '+(item.hidden?'hidden':'')"
                                v-if="item.computed">
                                <div class="left">
                                    <text class="must" v-if="item.must">*</text>
                                    <div class="title">{{item.title}}</div>
                                </div>
                                <div class="right" @click="showPicker(item)">
                                    <input type="text" :value="childTableCal[item.field]"
                                        :placeholder="placeholder(item)" disabled>
                                </div>
                            </view>
                            <view class="aLine" :class="item.type+' '+item.field+' '+(item.hidden?'hidden':'')"
                                v-else-if="item.type=='input'||item.type=='select'">
                                <div class="left">
                                    <text class="must" v-if="item.must">*</text>
                                    <div class="title">{{item.title}}</div>
                                </div>
                                <div class="right" @click="showPicker(item);">
                                    <input type="text" v-model="item.value" :placeholder="placeholder(item)"
                                        @input="Calculate(item,'meteria')"
                                        :disabled="(!editMode)||item.disabled||(item.type=='select')||(item.computed)">
                                    <div class="icon"
                                        v-if="editMode&&(item.type=='select')&&(!item.disabled)&&(!item.computed)">
                                        <u-icon name="arrow-right" color="rgb(133 132 132)" size="17"></u-icon>
                                    </div>
                                </div>
                            </view>
                        </template>
                    </view>
                    <!-- 从表详情按钮 -->
                    <view class="buttonBox">
                        <button type="warn" size="28" v-if="editMode"
                            @click.prevent="btnFunction('cancelMateria')">取消</button>
                        <button type="primary" v-if="editMode" size="28"
                            @click.prevent="btnFunction('confirmMateria')">确定</button>
                        <button type="primary" size="28" v-if="!editMode"
                            @click.prevent="btnFunction('cancelMateria')">返回</button>
                    </view>
                </template>
                <!-- <button @click="chooseDataIndex" style="position: fixed;right:0;bottom:0;">调试</button> -->
            </u-popup>
        </view>


        <!-- 整个表单底部按钮 -->
        <view class="fixbar">
            <view v-if="editMode" @click="btnFunction('cancelEdit')" class="btn line-red"
                style="min-width: 100px;text-align: center;">
                <l-icon type="close" />取消
            </view>

            <view v-if="editMode" @click="btnFunction('save')" class="btn line-green"
                style="min-width: 100px;text-align: center;">
                <l-icon type="check" />保存
            </view>
            <view v-else @click="btnFunction('edit')" class="btn line-blue"
                style="min-width: 100px;text-align: center;">
                <l-icon type="edit" />编辑
            </view>
        </view>
    </view>
</template>

<script>
    import _, {
        forIn
    } from 'lodash'
    import moment from 'moment'
    import {
        duration
    } from "moment";
    import operator from '@/components/showDetailInfo/operator.vue'
    var mainTableName = ""
    var childTableName = ""

    var vm = ""
    export default {
        name: "single3",
        components: {
            operator
        },
        props: {
            addDXID:Boolean,
            IS_SPECIAL: String,
            hideLookInvoice: Boolean,
            CATE_ID: String,
            allProps: {
                type: Object,
            },
            mainCal: {
                type: Object,
            },
            childTableCal: {
                type: Object,
            },
            formHeader: {
                type: Array,
                default: () => [{
                        "name": "往返车票"
                    },
                    {
                        "name": "发票单据编号"
                    },
                    {
                        "name": "发票类型"
                    },
                    {
                        "name": "价税合计"
                    },
                    {
                        "name": "发票税额"
                    },
                    {
                        "name": "开票日期"
                    },
                    {
                        "name": "购买方名称"
                    },
                    {
                        "name": "纳税人识别号"
                    },
                    {
                        "name": "销售方名称"
                    },
                    {
                        "name": "发票代码"
                    },
                    {
                        "name": "发票号码"
                    },
                    {
                        "name": "新增类型"
                    }
                ]
            },
            formDataField: {
                type: Array,
                default: () => [{
                        "dataKey": "TICKET_TYPE",
                        "giveNumKey": "TICKET_TYPE"
                    },
                    {
                        "dataKey": "SOURCE_DOC_NUM",
                        "giveNumKey": "SOURCE_DOC_NUM"
                    },
                    {
                        "dataKey": "INV_TYPE",
                        "giveNumKey": "INV_TYPE"
                    },
                    {
                        "dataKey": "VAL",
                        "giveNumKey": "VAL"
                    },
                    {
                        "dataKey": "TAX_VAL",
                        "giveNumKey": "TAX_VAL"
                    },
                    {
                        "dataKey": "INV_DATE",
                        "giveNumKey": "INV_DATE"
                    },
                    {
                        "dataKey": "BUYER_NAME",
                        "giveNumKey": "BUYER_NAME"
                    },
                    {
                        "dataKey": "BUYER_IDEN_NUM",
                        "giveNumKey": "BUYER_IDEN_NUM"
                    },
                    {
                        "dataKey": "SALER_NAME",
                        "giveNumKey": "SALER_NAME"
                    },
                    {
                        "dataKey": "INV_CODE",
                        "giveNumKey": "INV_CODE"
                    },
                    {
                        "dataKey": "INV_NO",
                        "giveNumKey": "INV_NO"
                    },
                    {
                        "dataKey": "INSERT_TYPE",
                        "giveNumKey": "INSERT_TYPE"
                    }
                ]

            },
            invoiceDataFieldRelationship: {
                type: Array,
                default: () => [{
                    dataField: "OCR_INV_NUM",
                    showField: "SOURCE_DOC_NUM"
                }]
            }




        },

        data() {
            return {
                color: "blue",
                useDataMt: true, // 判断是要计算meteriaDetail属性还是拿请求到的数据渲染,ture为使用拿原数据，false为使用输入后计算出来的属性,初次渲染那原始数据，输入之后用计算属性
                _pickerShow: true,
                formItems: _.cloneDeep(this.allProps.formItems),
                materialDetails: _.cloneDeep(this.allProps.materialDetails),
                formData: {}, //ajax拿的主表从表信息,obj
                editMode: false,
                pickerShow: false, //展示选项
                chooseItem: {}, //现在选择的是哪一列
                briefChildTableInfo: _.cloneDeep(this.allProps.briefChildTableInfo),
                chooseChildTableOrder: -1, //选择了第几个子表
                chooseMaterialDetail: null, //选择的子表详情
                showPopup: false, //展示/修改字表详情
                isNewAdd: 0, //判断是否新增子表  1为是，0为否
                lastChooseMateria: "", //最后一次选择物料的页面选择的物料
                pageItem: {}, //点击是type是page时，记录选的是那一个item，和点的是物料还是主表
                keyValue: "",
                chooseChildTableType: "", //显示的字表类型
                allComputedData: "", //所有计算属性
                invoiceBtns: [ //查看发票明细的按钮
                    {
                        name: "往返车票",
                        color: "#2c8df7"
                    }, {
                        name: "选择发票",
                        color: "#2c8df7"
                    }, {
                        name: "删除",
                        color: "#2c8df7"
                    }, {
                        name: "确定",
                        color: "#2c8df7"
                    },
                ],
                operatorData: "",
                aaa: ""
            }
        },
        computed: {
            AllComputedData() {
                return {
                    curChooseInvoice: this.curChooseInvoice,
                    invoiceList: this.invoiceList,
                    dataValue: this.dataValue,
                    pageShow: this.pageShow,
                    mainTableName: this.mainTableName,
                    childTableName: this.childTableName,
                    depSelf: this.depSelf,
                    
                }

            },
            
            depSelf(){
                return this.allProps.depSelf
            },

            curChooseInvoice() {
                this.aaa = [(this.operatorData?.chooseIndex >= 0), (this.operatorData?.chooseIndex != ""), (this.formData[
                    childTableName]), (index >= 0), (
                    this.operatorData.chooseIndex >= 0)]
                let index = this.chooseChildTableOrder
                let bool = (this.operatorData?.chooseIndex >= 0) && (this.operatorData?.chooseIndex !== "") && (this
                    .formData[childTableName]) && (index >= 0) && (
                    this.operatorData.chooseIndex >= 0)
                if (bool) {
                    let curInvoiceList = this.formData[childTableName][index]?.invoiceDetailedList
                    return {
                        ...curInvoiceList[this.operatorData.chooseIndex],
                        k_index: this.operatorData.chooseIndex
                    }
                }
                return ""
            },


            invoiceList() {
                let index = this.chooseChildTableOrder
                if (this.formData[childTableName]) {
                    var dataArr = _.cloneDeep(this.formData[childTableName][index]?.invoiceDetailedList)
                } else {
                    var dataArr = ""
                }
                let bool = !!((index > -1) && dataArr)
                // return dataArr
                if (bool) {
                    var invoiceList = dataArr.map((e) => {
                        let obj = {}
                        this.formDataField.forEach((e2) => {
                            obj[e2.giveNumKey] = e[e2.dataKey]
                        })
                        return obj
                    })
                    return invoiceList

                } else {
                    return []
                }
            },

            //仓库的dataValue
            dataValue() {
                return this.$store.state.dataValue
            },

            //判断是否有数据，没有就不渲染，避免报错
            pageShow() {
                if (!(this.formData && this.formItems)) {
                    return false
                } else {
                    return true
                }
            },
            mainTableName() {
                mainTableName = this.allProps.mainTableName
                childTableName = this.allProps.childTableName
                return this.allProps.mainTableName
            },
            childTableName() {
                return this.allProps.childTableName
            }

        },
        async created() {
            this.$store.commit('dataTitle', '')
            let params = this.allProps
            uni.showLoading({
                title: '加载中'
            });
            this.ORDER_STATUS = params.ORDER_STATUS
            this.init(params.id, params.type)
        },

        methods: {
            clearChoose(index, table) {
                if (table == "main") {}
                this.formItems[index].value = ""
                this.formItems = [...this.formItems]
                this.saveMainTable()

            },

            chooseDataIndex(k) {
                console.log(this.getPostData());

            },
            selectInvoice(itemArr) {
                let chooseChildTable = this.formData[childTableName][this.chooseChildTableOrder]
                let chooseInvoiceList = chooseChildTable.invoiceDetailedList
                let copyItemArr = _.cloneDeep(itemArr)
                let isPush = true
                let repeat = false

                itemArr.forEach((item, i) => {
                    this.invoiceDataFieldRelationship.forEach((e) => {
                        item[e.showField] = item[e.dataField]
                    })
                    item.PDXID = chooseChildTable.DXID
                    item.COMPANY_SOURCE_DOC_NUM = item.COMPANY_OCR_INV_NUM
                })
                itemArr.forEach((item) => {
                    chooseInvoiceList.push(item)
                })
                this.formData = {
                    ...this.formData
                }
                let prices = chooseChildTable.invoiceDetailedList.map(o => o.VAL)
                let sum = 0
                prices.forEach(e => {
                    sum = sum + e
                })
                
                
                
                chooseChildTable.REIM_VAL = sum
                
                
                
                this.formData = {
                    ...this.formData
                }
            },

            //子组件data变化时保存single组件传过来的所有data
            updateOperatorData({
                data,
                computedData
            }) {
                this.operatorData = data
            },

            haveChooseInvoice() { //现在是否选择了发票
                let index = this.curChooseInvoice?.k_index
                let c = this.formData[childTableName][this.chooseChildTableOrder]
                if (!(index >= 0)) {
                    uni.showToast({
                        title: '请选择一张发票 !',
                        icon: "none",
                        duration: 1500
                    });
                    return false
                }
                return true
            },

            invoiceBtnsClick({
                btn,
                index
            }) {
                switch (btn.name) {
                    case "确定":
                        this.showPopup = false
                        break;
                    case "删除":
                        let bool = this.haveChooseInvoice()
                        if (!bool) {
                            return
                        }
                        uni.showModal({
                            title: "确认提示",
                            content: "确认删除此发票吗?",
                            success: (res) => {
                                if (res.confirm) {
                                    console.log(`confirm${':'}`, index,
                                        `现在时间：${(new Date()).toString().split(" ")[4]}`)
                                    c.invoiceDetailedList = _.cloneDeep(c.invoiceDetailedList).filter((e, i) =>
                                        index != i)
                                    this.formData = {
                                        ...this.formData
                                    }
                                }
                            }
                        })
                        break;
                    case "选择发票":
                        if (!(this.formData[childTableName][this.chooseChildTableOrder].invoiceDetailedList)) {
                            this.formData[childTableName][this.chooseChildTableOrder].invoiceDetailedList = []
                            this.formData = {
                                ...this.formData
                            }
                        }
                        let nowInvoices = this.formData[childTableName][this.chooseChildTableOrder].invoiceDetailedList
                            .map(o => o.SOURCE_DOC_NUM)
                        uni.navigateTo({
                            url: `/pages/common/select-invoice?nowInvoices=${JSON.stringify(nowInvoices.join(","))}` //
                        })
                        uni.$once("select-invoice", itemArr => {
                            this.$nextTick(this.selectInvoice(itemArr))
                        })
                        break;
                    case "往返车票":
                        console.log(`!this.haveChooseInvoice()${':'}`, !this.haveChooseInvoice(),
                            `现在时间：${(new Date()).toString().split(" ")[4]}`)
                        if (!this.haveChooseInvoice()) {
                            return
                        }
                        this.chooseItem = {
                            TICKET_TYPE: 1,
                            options: ["去程车票", "返程车票"]
                        }
                        this.pickerShow = true


                        break;
                    default:
                        break;
                }
                // console.log(index);

            },

            async init(id, type) { //id为单据编号，用来获取数据，type为编辑模式或者是创建模式
                uni.$on("save-form", formData => {
                    console.log("baocun保存")
                    this.saveForm(formData)
                    // console.log(`save-form${':'}`,formData,`现在时间：${(new Date()).toString().split(" ")[4]}`) 
                })
                if (type == "create") {
                    this.assignment(type)
                    return
                } else {
                    uni.$once("drawing-bills", data => {
                        this.formData = data
                        this.assignment(this.allProps.type)
                    })
                }

                //发起请求获取表单数据
                uni.request({
                    url: this.allProps.getFormDataUrl + `?keyValue=${id}`,
                    data: {
                        ...this.auth,
                        data: JSON.stringify({
                            company_cost_reim_num: id
                        })
                    },
                }).then(([err, res]) => {
                    this.$emit("childData", {
                        data: this._data
                    })


                    //把单据信息返回给外层single.处理formData再渲染
                    uni.$emit("dispose-formData", {
                        formData: res.data.data,
                        operation: "init"
                    })
                    // this.assignment(type)
                })
            },

            //用获取到的单据数据给模板formItems和materialDetails赋值
            assignment(type) {
                if (type == "create") {
                    this.formData = {}
                    this.formData[this.allProps.mainTableName] = {
                        CATE_ID: this.CATE_ID
                    }
                    this.formData[this.allProps.childTableName] = []
                    this.editMode = true
                }
                this.formItems?.forEach(e => {
                    let aJaxValue = this.formData[this.allProps.mainTableName][e.field]
                    if (e.field && (aJaxValue || aJaxValue === 0 || aJaxValue === "0")) {
                        e.value = this.formData[this.allProps.mainTableName][e.field]
                    }
                    if (e.optionsField) {
                        e.options = _.cloneDeep((Object.values(this.$store.state.propTable[e.optionsField])
                            .map(o => o.text)))
                    }
                    this.formItems = [...this.formItems]
                })
                uni.hideLoading()
            },

            Calculate(item, type) {
                type == "meteria" ? this.useDataMt = false : type == "main" ? this.useDataMain = false : ""
                type == "meteria" ? this.materialDetails = [...this.materialDetails] : type == "main" ? this.formItems = [
                    ...this.formItems
                ] : ""

                let bool = (JSON.stringify(Number(item.value)) === "null")

                this.saveMainTable()
                this.$store.commit("formData", this.formData)
                this.$store.commit("materialdetails", this.materialDetails)
            },



            //验证物料信息是否完整
            verifyMateria() {
                let bool = true
                _.cloneDeep(this.materialDetails).reverse().forEach((e) => {
                    if (e.must) {
                        // if (e.value === "" || e.value === null) {
                        if ((!e.value) && (e.value !== 0) && (e.value !== "0")) {
                            uni.showToast({
                                title: `请填写${e.title} !`,
                                duration: 2000,
                                icon: "error"
                            });
                            this.showPopup = true
                            bool = false
                        }
                    }
                })

                return bool
            },
            // 把展示的formItem信息保存到formData的主表
            saveMainTable() {
                this.formItems.forEach((e) => {
                    this.formData[this.allProps.mainTableName][e.field] = e.value
                })
                this.formData = {
                    ...this.formData
                }
            },

            // 保存物料信息
            saveMaterialTable() { //materialTemplate为目前显示的materialDetails信息，index为现在是第几个物料的信息（索引）
                let full = this.verifyMateria() //检测完整度
                if (!full) { //如果物料信息不完整，提示正确填写，暂不保存
                    return
                }
                let wuliao = this.formData[this.allProps.childTableName][this
                    .chooseChildTableOrder
                ] //保存到数据的第几个物料formData里面，复制指针

                //把选择的物料的所有信息复制给formData里面的物料
                wuliao = {
                    ...wuliao,
                    ...this.deleteNull(this.lastChooseMateria)
                }
                this.materialDetails.forEach((e) => {
                    wuliao[e.field] = e.value
                })

                for (let key in wuliao) { //删除空值
                    if (!wuliao[key]) {
                        delete wuliao[key]
                    }
                }
                this.formData[this.allProps.childTableName][this.chooseChildTableOrder] = this.deleteNull(wuliao)


                this.formData = {
                    ...this.formData
                }
                this.showPopup = false
            },

            //没有填写时默认显示什么
            placeholder(item) { //item为模板中你展示的项目每一项
                if (!this.editMode) {
                    return ""
                }
                if (item.placeholder) {
                    return item.placeholder
                }
                if (item.computed) {
                    return "自动计算"
                }
                if (item.type == "input") {
                    return "请输入" + item.title
                }
                if (item.type == "select") {
                    return "请选择" + item.title
                }
            },


            //查看子表详情 dddddddd
            showChildTableDetails(index, type = "childTable") {
                // index为选择的第几个从表，tyoe表示字表类型
                this.chooseChildTableType = type
                if (type == "invoice") {
                    let DXID = this.formData[childTableName][index].DXID
                } else {}

                this.chooseChildTableOrder = index
                this.showPopup = true
            },


            //点击按钮功能
            btnFunction(type) { //type为你点击的按钮是哪个
                let _this = this
                switch (type) {
                    case 'confirmMateria':
                        //把计算属性保存在materialDetails里面
                        this.materialDetails.forEach((e) => {
                            for (let key in this.childTableCal) {
                                if (e.field == key) {
                                    e.value = this.childTableCal[key]
                                }
                            }
                        })
                        this.materialDetails = [...this.materialDetails]
                        // 把materialDetails保存到formData里面
                        this.saveMaterialTable()
                        return
                    case 'cancelMateria':
                        if (this.isNewAdd) {
                            let tempArr = this.formData[this.allProps.childTableName]
                            tempArr = _.cloneDeep(tempArr).filter((e, index) => {
                                return index != tempArr.length - 1
                            })
                            this.formData[this.allProps.childTableName] = tempArr
                            this.formData = {
                                ...this.formData
                            }
                        }
                        this.showPopup = false
                        return
                    case 'delete': //删除
                        return
                    case 'edit': //编辑
                        if (this.formData[this.mainTableName].CHK_ID) {
                            uni.showModal({
                                content: '已审核单据不可编辑！',
                                showCancel: false,
                                cancelText: '',
                            });
                            return
                        }
                        this.editMode = true
                        return

                    case 'cancelEdit': //取消编辑
                        this.editMode = false
                        return

                    case 'reset': //重置
                        this.editMode = false
                        return
                    case 'save': //保存
                        let bool = true
                        let keyValue = _.cloneDeep(this.formItems).filter(o => o.title == '集团单据编号')[0]?.value
                        keyValue = keyValue ? keyValue : ""
                        this.keyValue = keyValue

                        _.cloneDeep(this.formItems).reverse().forEach((e) => {
                            if (e.must) {
                                if (!e.value?.trim()) {
                                    uni.showToast({
                                        title: `请正确输入${e.title}`,
                                        duration: 1500,
                                        icon: "error"
                                    }); 
                                    bool = false
                                }
                            }
                        })
                        // this.formData[this.childTableName].forEach((e, i) => {
                        // 	if (!e.invoiceDetailedList.length) {
                        // 		uni.showToast({
                        // 			title: `第${i+1}条报销单没有选择发票!`,
                        // 			duration: 2000,
                        // 			icon: "error"
                        // 		});
                        // 		bool = false
                        // 	}
                        // })

                        if (!bool) {
                            return
                        }
                        this.formData[this.allProps.childTableName] = _.cloneDeep(this.formData[this.allProps
                            .childTableName]).map(e => this.deleteNull(e)) //删除所有物料的无值属性






                        uni.showModal({
                            title: '保存订单',
                            content: `确定要提交保存该订单吗？`,
                            success: async ({
                                confirm
                            }) => {
                                if (!confirm) {
                                    return
                                }
                                this.saveMainTable()
                                this.formData = {
                                    ...this.formData
                                }
                                console.log(this.getPostData());
                                uni.$emit("dispose-formData", {
                                    formData: {
                                        ...this.getPostData(),
                                        // ...this.formData,
                                        keyValue: this.keyValue
                                    },
                                    operation: "save"
                                })
                            }
                        })
                        return
                    default:
                        return
                }
            },


            //更新选择的物料详情
            updateMaterialDetails(materialInfo) { //materialInfo为物料信息，obj
                var tempArr = this.materialDetails.map(e => {
                    for (let key in materialInfo) {
                        if ((e.field == key)) {
                            e.value = materialInfo[key]
                            if (e.optionsField) {
                                e.options = _.cloneDeep((Object.values(this.$store.state.propTable[e.optionsField])
                                    .map(o => o.text)))
                            }
                        }
                    }
                    return e
                })
                this.materialDetails = tempArr
            },

            async saveForm(formData) {
                if (this.IS_SPECIAL) {
                    formData.COST_REIM_MainList = JSON.parse(formData.COST_REIM_MainList)
                    formData.COST_REIM_MainList.IS_SPECIAL = this.IS_SPECIAL
                    formData.COST_REIM_MainList = JSON.stringify(formData.COST_REIM_MainList)
                }
                await uni
                    .request({
                        url: this.allProps.submitFormDataUrl + `?keyValue=${this.keyValue||""}`,
                        method: 'POST',
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        data: {
                            ...this.auth,
                            data: JSON.stringify({
                                ...formData,
                                keyValue: this.keyValue || ""
                            })
                        }
                    })
                    .then(([err, {
                        data
                    }]) => {
                        if (err || !data || data.code !== 200) {
                            uni.showModal({
                                title: '保存失败',
                                content: data.info,
                                showCancel: false
                            })
                            this.editMode = false
                            return
                        }

                        if (this.mode === 'create') {
                            uni.showToast({
                                title: '已成功创建订单',
                                duration: 1500,
                                icon: 'success'
                            })
                            setTimeout(() => {
                                uni.$emit('updateDocumentsList')
                                uni.navigateBack()
                            }, 1500);
                            return
                        }

                        this.editMode = false
                        uni.showToast({
                            title: '保存成功',
                            duration: 1500,
                            icon: 'success'
                        })
                        setTimeout(() => {
                            uni.$emit('updateDocumentsList')
                            uni.navigateBack()
                        }, 1500);

                    })
                    .catch(() => {
                        uni.showToast({
                            title: '保存失败',
                            icon: 'none'
                        })
                    })
            },

            // 创建一个GUID
            newGuid: function() {
                var guid = "";
                for (var i = 1; i <= 32; i++) {
                    var n = Math.floor(Math.random() * 16.0).toString(16);
                    guid += n;
                    if ((i == 8) || (i == 12) || (i == 16) || (i == 20)) guid += "-";
                }
                return guid;
            },


            //添加子表数据
            addMateria() {
                this.chooseChildTableType = "childTable"
                this.isNewAdd += 1
                // this.formData[this.allProps.childTableName].push(_.cloneDeep(this.materialDetailsTemplate))

                if (this.addDXID) {
                    this.formData[this.allProps.childTableName].push({
                        DXID: this.newGuid(),
                        invoiceDetailedList: []
                    })
                } else {
                    this.formData[this.allProps.childTableName].push({})
                }
                this.chooseChildTableOrder = this.formData[this.allProps.childTableName].length - 1
                this.materialDetails = _.cloneDeep(this.allProps.materialDetails) //将模板置空

                this.formData = {
                    ...this.formData
                }
                this.showPopup = true

            },

            //删除物料
            tableDelete(tableIndex) {
                this.formData[this.allProps.childTableName] = this.formData[this.allProps.childTableName].filter((e,
                    index) => index != tableIndex)
                this.formData = {
                    ...this.formData
                }
                this.materialDetails = _.cloneDeep(this.allProps.materialDetails)

            },

            showPicker(item) { //item为你创建模板时候数组的每个对象
                if (!this.editMode) {
                    return
                }
                this.chooseItem = item
                if ((item.type == "select") && (this.chooseItem.selectType != "page") && (this.chooseItem.selectType !=
                        "page") && (!this.chooseItem.computed)) {
                    this.pickerShow = true
                } else if (this.chooseItem.selectType == "page") {
                    this.pageSelect(item)
                }
            },
            pickerChoose(e) { //picker选择后更新数据
                if (!this.editMode) {
                    return
                }
                // console.log(this.allProps.depSelf.map(o=>o.name),e.value[0],1
                // includes(o=>o==));
                if((this.allProps.module1=="managementFees")&&(this.allProps.depSelf.map(o=>o.name).includes(e.value[0]))){
                    let index = this.materialDetails.findIndex(o=>o.field =="REIM_DEPT")
                    this.materialDetails[index].value = this.allProps.depSelf.find(o=>o.name==e.value[0])?.depId
                    console.log(index,this.materialDetails[index],this.allProps.depSelf.find(o=>o.name==e.value[0]));
                    this.materialDetails = [...this.materialDetails]
                }

                if (this.chooseItem.TICKET_TYPE) {

                    this.formData[this.childTableName][this.chooseChildTableOrder].invoiceDetailedList[this
                        .curChooseInvoice.k_index].TICKET_TYPE = e.value[0]
                    this.pickerShow = false
                    this.formData = {
                        ...this.formData
                    }

                    return
                }
                this.pickerShow = false
                switch (this.chooseItem.selectType) {
                    case "date":
                        this.chooseItem.value = moment(new Date(e.value)).format("YYYY-MM-DD")
                        break;
                    case "page":
                        //选择物料,供应商
                        break;
                    default:
                        this.chooseItem.value = e.value[0]
                        break;
                }
                this.formItems = [...this.formItems]
                this.saveMainTable()
                this.$store.commit("formData", this.formData)
                this.$store.commit("materialdetails", this.materialDetails)
            },

            async pageSelect(item) {
                if (!this.editMode) {
                    return
                }
                //选择物料,供应商
                if (item.type == "select" && item.pageType == "material") {
                    return
                    uni.$once(`select-goods`, data => {
                        this.lastChooseMateria = _.cloneDeep(data) //拷贝一份，待会保存后把物料所有信息保存到formData
                        this.materialDetails.forEach((e) => {
                            for (let key in data) {
                                if (e.field == key) {
                                    e.value = data[key]
                                }
                            }
                            if (e.field == "LINE_NUM") {
                                e.value = this.chooseChildTableOrder + 1
                            }
                        })
                        this.materialDetails = [...this.materialDetails]
                    })
                    uni.navigateTo({
                        url: `/pages/common/SelectStockNumber` //跳转至查询
                    })
                } else {
                    console.log(item.title);
                    this.pageItem = item
                    this.$store.commit("formData", this.formData)
                    this.$store.commit("dataTitle", item.title)
                }
            },

            getPostData() { //保存
                let COST_REIN_INVOICE_DTL = []
                const orderData = _.cloneDeep(this.formData[mainTableName])
                const orderProductData = _.cloneDeep(this.formData[childTableName])


                this.formData[childTableName] = _.cloneDeep(this.formData[childTableName]).map((o, i) => {
                    console.log(o);
                    if (!o.invoiceDetailedList) {
                        uni.showModal({
                            title: "错误提示",
                            conten: `请在第${i}条明细中选择发票!`,
                            showCancel: false,


                        })
                        o.invoiceDetailedList = []
                    }
                    return o
                })
                this.formData[childTableName].forEach((e) => {
                    console.log(e.invoiceDetailedList);
                    COST_REIN_INVOICE_DTL = [...COST_REIN_INVOICE_DTL, ...e.invoiceDetailedList]
                })
                this.formData = {
                    ...this.formData
                }

                let result = {
                    COST_REIM_MainList: JSON.stringify(orderData),
                    COST_REIM_SubList: JSON.stringify(orderProductData),
                    COST_REIM_INVOICE_DTL: JSON.stringify(COST_REIN_INVOICE_DTL),
                    COST_REIM_LOAN_DTL: `[]`,
                }

                if (this.mode !== 'create') {
                    result.keyValue = this.formData.F_OrderId
                }
                return result
            },

            //删除对象无值属性
            deleteNull(obj) {
                let tempObj = JSON.parse(JSON.stringify(obj))
                for (let key in tempObj) {
                    if ((!tempObj[key]) && tempObj[key] !== 0 && tempObj[key] !== "0") {
                        delete tempObj[key]
                    }
                }
                return tempObj
            },

            //拿到数据带出子表
            carryMateria(dataObj) {
                console.log(dataObj);
                this.formData[this.childTableName].push(dataObj)
                this.formItems = [...this.formItems]
            },
            //拿到数据赋值给主表
            assignmentMainTable(dataObj) {
                console.log(dataObj);
                this.formData[this.mainTableName] = {
                    ...this.formData[this.mainTableName],
                    ...this.deleteNull(dataObj)
                }
                this.formData = {
                    ...this.formData
                }
                this.formItems.forEach((e) => {
                    for (let key in dataObj) {
                        if (e.field == key) {
                            e.value = dataObj[key]
                        }
                    }
                })
                this.formItems = [...this.formItems]
            },
            //拿到数据赋值给子表
            assignmentMateriaTable(dataObj) {
                console.log(dataObj);
                this.materialDetails.forEach((e) => {
                    for (let key in dataObj) {
                        if (e.field == key) {
                            e.value = dataObj[key]
                        }
                    }
                })
                this.materialDetails = [...this.materialDetails]
                this.$store.commit("materialdetails", this.materialDetails)
            },
            newGuid() {
                var guid = "";
                for (var i = 1; i <= 32; i++) {
                    var n = Math.floor(Math.random() * 16.0).toString(16);
                    guid += n;
                    if ((i == 8) || (i == 12) || (i == 16) || (i == 20)) guid += "-";
                }
                return guid;
            },
        },
        watch: {

            AllComputedData(new1) {
                this.allComputedData = _.cloneDeep(new1)
            },

            mainCal() {
                this.saveMainTable()
            },
            chooseChildTableOrder(newValue) {
                this.updateMaterialDetails(this.formData[this.allProps.childTableName][newValue])
            },

            showPopup(state) {
                if (state == false) {
                    this.isNewAdd = false
                    this.useDataMt = true
                    this.chooseChildTableType = ""
                    this.chooseChildTableOrder = -1
                }
                if (state == true) {
                    this.$store.commit("materialdetails", this.materialDetails)
                    this.useDataMt = true
                }
            },
            dataValue(m) {
                if (m.IS_PARENT) {
                    uni.showToast({
                        icon: "error",
                        title: "不能选取父级科目!",
                        duration: 2000
                    })
                    return
                }

                this[this.pageItem.popupInfo.function](m);
            },

            //实时将此vue示例data返回给父组件
            '$data': {
                handler: function(n, o) {
                    // console.log(this);
                    this.$emit("childData", {
                        data: n
                    })
                },
                deep: true
            },

        },
        beforeCreate() {
            vm = this
        },
        beforeUpdate() {
            if (!this._pickerShow) {
                this.pickerShow = false
                this.$store.commit("dataShow", false)
                this.$nextTick(() => {
                    this._pickerShow = true
                    this.$store.commit("dataTitle", '')

                })
            }

        },
        beforeDestroy() {
            uni.$off("save-form")
        }


    }
</script>

<style scoped lang="less">
    .page {
        padding-bottom: 100rpx;

        .aLine {
            background-color: white;
            height: 100rpx;
            margin-bottom: 2px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 15px;

            .left {
                display: flex;
                justify-content: flex-start;
                align-items: center;
            }

            .right {
                display: flex;
                justify-content: flex-end;
                align-items: center;

            }

            .must {
                color: red;
                font-size: 1.2em;
            }

            .title {
                text-align: justify;
                padding-right: 15px;
                padding-left: 2px;
                font-size: 15px;
                position: relative;
                height: 30px;
                line-height: 30px;
                white-space: nowrap;
            }

            input {

                width: 100%;
                text-align: right;
                font-size: 14px;
                opacity: 0.9;

            }

            &::v-deep .uni-input-wrapper {
                .uni-input-input {
                    display: flex;
                    justify-content: flex-end;
                    align-items: flex-end;
                    margin-bottom: 2px;

                }
            }

        }

        .hidden {
            display: none;
        }

        .icon {
            margin-left: 5px;
            display: flex;
            justify-content: center;
            align-items: center;

        }

        .title {
            padding: 0;

            .circle {
                background-color: #0081ff;
                width: 20rpx;
                height: 20rpx;
                border-radius: 50%;
                margin: 10px;
            }

            .text {
                font-size: 18px;
                color: #666666;
            }
        }

        .fixbar {
            position: fixed;
            bottom: 10px;
            bottom: calc(10px + constant(safe-area-inset-bottom));
            bottom: calc(10px + env(safe-area-inset-bottom));
            right: 5px;
            z-index: 997;
            font-size: 16px;

            .btn {
                display: inline-block;
                padding: 4px 6px;
                margin: 0 3px;
                border-radius: 3px;
                background-color: #fff;
                border: currentColor 1px solid;
            }
        }

        .commodity {
            box-sizing: border-box;
            width: 100vw;
            padding: 20rpx 40rpx;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 110px;
            background-color: white;
            margin: 1px 0;

            // background-color: #f1f0f0;
            image {
                height: 90%;
                width: auto;
                min-width: 80px;
                background-color: #fafafa;
                border-radius: 2px;
                box-sizing: border-box;
                padding: 20rpx;
                // margin-right: 20px;
            }

            .right {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .info {
                    height: 95%;
                    display: flex;
                    justify-content: flex-start;
                    align-items: flex-start;
                    flex-direction: column;
                    box-sizing: border-box;
                    padding: 0rpx 20rpx;
                    font-size: 12px;
                    line-height: 20px;
                    max-width: 380rpx;
                    white-space: nowrap;
                    overflow: auto;

                    .an_info {
                        &:first-child {
                            max-height: 19px;
                        }
                    }

                    text {
                        display: block;
                    }
                }

                .operatingBtn {
                    text-align: center;

                    &>view {
                        margin-top: 20px;
                    }

                    &>:nth-child(1) {
                        margin-top: 0px;
                    }

                    .showDetail {
                        color: #0075ff;
                        font-size: 12px;

                    }


                    .deleGood {
                        color: #0075ff;
                        font-size: 12px;
                        text-align: center;
                    }
                }
            }
        }

        .k-u-popup {
            position: relative;
            z-index: 998;
            height: 80vh;
            overflow-y: auto;

            .invoice {
                .operator {
                    overflow: auto;
                    max-height: 500px;
                }


                .btns {
                    margin-top: 10rpx;
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                    padding: 0px 25px;
                    padding-top: 0;

                    button {
                        margin: 0;
                        font-size: 13px;
                        // color: white;
                    }
                }
            }


            &::v-deep .u-popup__content {
                // max-width: 81%;
                overflow: hidden;
                border-radius: 12px;
                background-color: transparent;
                max-width: 100%;
                max-height: 90%;
            }

            .k-popup {
                max-width: 100%;
                margin-bottom: 50px;
                // padding-top: 30px;
                position: relative;
                max-height: 80vh;
                overflow: auto;
                border-radius: 12px;


                &::v-deep .picker-arrow {
                    &>div {
                        // background-color: red;
                        // display: flex;
                        // justify-content: flex-end;
                        // align-items: center;
                        text-align: right;
                    }
                }

                &::v-deep uni-input,
                ::v-deep .picker {
                    // max-width: 100%;
                    overflow: auto;
                }

                // &::v-deep .picker{
                // 	background-color: red;
                // }


                .modeExplain {
                    background-color: #eeeeee;
                    // position: absolute;
                    text-align: center;
                    font-size: 16px;
                    line-height: 40px;
                    font-weight: bolder;
                    left: calc(50% - 30px);

                }

                .aLine {
                    margin-bottom: 0px;
                    border-bottom: 0.5px solid #eee;

                    &:last-child {
                        border-bottom: 0;
                        border-bottom-left-radius: 12px;
                        border-bottom-right-radius: 12px;
                    }
                }
            }

            .buttonBox {
                width: 100%;
                position: absolute;
                z-index: 5;
                display: flex;
                justify-content: center;
                // align-items: center;
                bottom: 0;

                button {
                    margin: 0;
                    width: 80px;
                    margin-right: 15px;

                    &:nth-child(1) {}
                }

            }
        }

    }
</style>
