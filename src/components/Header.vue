<template>
    <header>
        <div class="left">
            <span>{{date}}{{nowTime}}</span>
            <span>深圳南山</span>
            <span>天气多云</span>
        </div>
        <div class="center">氮气能耗实时监测看板</div>
        <div class="right">
            <div @click="$emit('setImage')">截图</div>
            <div @click="$emit('screen')">全屏</div>
        </div>
    </header>
</template>

<script>
    import { timeFormatter } from "@/utils/methods";
    export default {
        name: "Header.vue",
        data(){
            return {
                timer: null,
                date: "00:00:00",
                nowTime: "0000/00/00"
            }
        },
        beforeMount() {
            this.timer = setInterval(() => {
                let time = timeFormatter({ prefix: true });
                this.date = time.date;
                this.nowTime = time.nowTime;
            }, 1000);
        }
    }
</script>

<style lang="scss" scoped>
header {
    display: flex;
    justify-content: space-between;
}
</style>