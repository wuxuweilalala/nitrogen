<template>
  <div id="app">
    <Header @setImage="setImage" @screen="screen"></Header>
    <router-view  ref="myChild"  />
  </div>
</template>

<script>
  import Header from "./components/Header";
  import html2canvas from "html2canvas";
  import echarts from 'echarts'
  export default  {
    components:{
      Header
    },
    methods:{
      // 使用 html2canvas 进行截图
      setImage() {
        const domObj = document.getElementById("app");
        html2canvas(domObj).then(canvas => {
          const imgUrl = canvas.toDataURL("image/png"); // 获取生成的图片的url
          this.saveFile(imgUrl, "images.jpg");
        });
      },
      // 下载图片
      saveFile(data, filename) {
        const save_link = document.createElementNS(
                "http://www.w3.org/1999/xhtml",
                "a"
        );
        save_link.href = data;
        save_link.download = filename;
        const event = document.createEvent("MouseEvents");
        event.initMouseEvent(
                "click",
                true,
                false,
                window,
                0,
                0,
                0,
                0,
                0,
                false,
                false,
                false,
                false,
                0,
                null
        );
        save_link.dispatchEvent(event);
      },
      // 全屏
      screen() {
        let element = document.documentElement;
        if (this.fullscreen) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        } else {
          if (element.requestFullscreen) {
            element.requestFullscreen();
          } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
          } else if (element.msRequestFullscreen) {
            // IE11
            element.msRequestFullscreen();
          }
        }
        this.fullscreen = !this.fullscreen;
      },
    },
    mounted() {
      window.onresize=function(){
        console.log(1);
        const barChart = echarts.init(document.getElementById('barChart'));
        const lineChart = echarts.init(document.getElementById('lineChart'));
        barChart.resize();
        lineChart.resize();
      }
    }
  }
</script>
<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
  #app {
    width: 100vw;
    height: 100vh;
    background: url('~@/assets/imgs/bodyBg.png') no-repeat;
    background-size: 100% 100%;
    padding:0 5.2vw 0 5.8vw;
    overflow: hidden;
  }
</style>
