<template>
    <view class="base-content">
            <view class="range-wrap" style="justify-content: center;">
                <view class="range-label" style="font-size: 28rpx;text-align: left;">
                    {{pval}}:{{val}}
                </view>
                <view class="range-area" style="width: 200px;">
                    <view class="next-range" dir="ltr">
                        <view class="next-range-inner">
                            <view class="next-range-scale"></view>
                            <view class="next-range-track"></view>
                            <view>
                                <view class="next-range-selected" style="left: 0%;" :style="{width:positionX+'%'}"></view>
                                <movable-area style="width: 210px;" class="" role="slider">
                                    <movable-view @change="movetouch" direction="horizontal" :x="positionX*2">
                                        <view class="next-range-slider-inner"> </view>
                                    </movable-view>
                                </movable-area>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                positionX:50,
                val:0,
                mName:"",
            }
        },
        props:{
            pval:{
                type:String,
                default:"进度条"
            },
            methodName:{
                type:String,
                default:"change"
            }
        },
        created:function(){
            let vm = this;
            vm.mName=vm.methodName;
        },
        onLoad() {
        },
        methods: {
            movetouch(e) {
                let vm = this;
                let pX = e.detail.x;
                vm.positionX=pX/2;
                if(vm.positionX==50){
                    vm.val=0
                }else if(vm.positionX<50){
                    vm.val=parseFloat((vm.positionX-50)*10).toFixed(2)
                    
                }else if(vm.positionX>50){
                    vm.val=parseFloat((vm.positionX-50)*10).toFixed(2)
                }
                // console.log("vm.mName:",vm.mName,vm.val)
                this.$emit(vm.mName,vm.val)
            },
        }
    }
</script>

<style lang="scss">
    .base-content {
        padding: 14px 6px 12px
    }
    .base-content .range-wrap {
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -moz-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        margin-bottom: 18px;
        font-size: 13px
    }
    .base-content .range-wrap .range-label {
        width: 120px;
        color: #2b3554
    }
    .base-content .range-wrap .range-area {
        width: 280px;
        margin-right: 5px
    }
    .next-range {
        width: 100%;
        font-family: inherit;
        font-weight: 400;
        font-size: inherit;
        line-height: inherit;
        vertical-align: baseline;
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: -moz-box;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        -webkit-flex-direction: column;
        -moz-box-orient: vertical;
        -moz-box-direction: normal;
        flex-direction: column;
        cursor: pointer
    }
    .next-range,
    .next-range *,
    .next-range :after,
    .next-range :before {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box
    }
    .next-range .next-range-inner {
        position: relative
    }
    .next-range .next-range-inner:only-child {
        margin-top: auto;
        margin-bottom: auto
    }
    .next-range .next-range-track {
        width: 100%
    }
    .next-range .next-range-selected,
    .next-range .next-range-track {
        position: absolute;
        top: 50%;
        -webkit-border-radius: 0;
        -moz-border-radius: 0;
        border-radius: 0
    }
    .next-range .next-range-selected {
        width: 0;
        left: 0
    }
    .next-range .next-range-scale {
        position: relative;
        width: 100%;
        height: 12px
    }
    .next-range .next-range-slider {
        position: absolute;
        top: 50%;
        left: 0;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%
    }
    .next-range .next-range-slider-inner {
        position: absolute;
        top: 50%;
        left: 50%;
        border: 1px solid #dedede;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        -webkit-transition: border-color .4s cubic-bezier(.23, 1, .32, 1), -webkit-transform .4s cubic-bezier(.23, 1, .32, 1);
        transition: border-color .4s cubic-bezier(.23, 1, .32, 1), -webkit-transform .4s cubic-bezier(.23, 1, .32, 1);
        -o-transition: border-color .4s cubic-bezier(.23, 1, .32, 1), -o-transform .4s cubic-bezier(.23, 1, .32, 1);
        -moz-transition: transform .4s cubic-bezier(.23, 1, .32, 1), border-color .4s cubic-bezier(.23, 1, .32, 1), -moz-transform .4s cubic-bezier(.23, 1, .32, 1);
        transition: transform .4s cubic-bezier(.23, 1, .32, 1), border-color .4s cubic-bezier(.23, 1, .32, 1);
        transition: transform .4s cubic-bezier(.23, 1, .32, 1), border-color .4s cubic-bezier(.23, 1, .32, 1), -webkit-transform .4s cubic-bezier(.23, 1, .32, 1), -moz-transform .4s cubic-bezier(.23, 1, .32, 1), -o-transform .4s cubic-bezier(.23, 1, .32, 1);
        transition: transform .4s cubic-bezier(.23, 1, .32, 1), border-color .4s cubic-bezier(.23, 1, .32, 1), -webkit-transform .4s cubic-bezier(.23, 1, .32, 1)
    }
    .next-range .next-range-track,
    .next-range .next-range-track:hover {
        background-color: #f5f5f5
    }
    .next-range .next-range-selected,
    .next-range .next-range-selected:hover {
        background-color: #0070cc
    }
    .next-range .next-range-slider-inner {
        background-color: #fff;
        border-color: #dedede
    }
    .next-range .next-range-slider-inner:hover {
        background-color: #fff;
        -webkit-box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, .13);
        -moz-box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, .13);
        box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, .13);
        -webkit-transform: scale(1.2);
        -moz-transform: scale(1.2);
        -o-transform: scale(1.2);
        transform: scale(1.2)
    }
    .next-range .next-range-selected,
    .next-range .next-range-track {
        height: 4px;
        margin-top: -2px
    }
    .next-range .next-range-slider {
        -webkit-box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, .13);
        -moz-box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, .13);
        box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, .13)
    }
    .next-range .next-range-slider,
    .next-range .next-range-slider-inner {
        height: 16px;
        width: 16px;
        margin-top: -14px;
        margin-left: -8px
    }
</style>
