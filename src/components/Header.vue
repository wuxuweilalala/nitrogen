<template>
    <header>
        <div class="left">
            <Icon name="position"></Icon>
            <span class="position">广东深圳市</span>
            <div class="weather">
                <Icon name="weather"></Icon>
                <span>30℃</span>
            </div>
        </div>
        <div class="center">
            <div class="chineseName">
                {{title}}
            </div>
            <span  class="englishName">{{date}} {{nowTime}}</span>
        </div>
        <div class="right">
            <div @click="$emit('screen')">
                <Icon name="fullScreen"></Icon>
            </div>
            <div @click="$emit('setImage')" class="setImg">
                <Icon name="jietu"></Icon>
            </div>
        </div>
    </header>
</template>

<script>
    import { timeFormatter } from "@/utils/methods";
    import Icon from "./Icon";
    export default {
        name: "Header.vue",
        data(){
            return {
                timer: null,
                date: "00:00:00",
                nowTime: "0000/00/00"
            }
        },
        components:{
            Icon
        },
        computed:{
          title() {
              return this.$store.state.title
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
    align-items: center;
    color: #fff;
    padding-top: 2.22vh;
    margin-bottom: 8.33vh;
    .left {
        display: flex;
        .position {
            margin-right: 1.51vw;
        }
        .icon {
            margin-right: 0.7vw;
        }
    }
    .center {
        text-align: center;
        display: flex;
        flex-direction: column;
        .chineseName {
            font-size: 1.58vw;
            background: linear-gradient(to right, #adc3f2, #e6ffd9);
            -webkit-background-clip: text;
            color: transparent;
        }

        span {
            font-size: 0.89vw;
        }
    }
    .right {
        display: flex;
        > div {
            cursor: pointer;
            margin-right: 1.98vw;
        }
        .setImg {
            .icon {
                width: 1.72vw;
                height: 1.72vw;
            }
        }
    }
}
</style>