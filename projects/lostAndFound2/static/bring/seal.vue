<template>
    <view class="seal">
        <view class="main">
            <view class="outCircle"></view>
        </view>

        <view class="progressBar">
            <bestjhh  @change="change($event)"></bestjhh>
        </view>
    </view>
</template>

<script>
    import bestjhh from "@/components/zhkl-wrapController/zhkl-wrapController.vue"
    export default {
        components: {
            bestjhh
        },
        data() {
            return {
                outCircleStyle: {
                    borderWidth:5
                }
            }
        },

        methods: {
            change(e) {
                console.log(e);
            }
        }
    }
</script>

<style scoped lang="less">
    .seal {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .progressBar {
        flex-shrink: 0;
    }
</style>
