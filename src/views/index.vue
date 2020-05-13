<template>
  <div>
    <Bar :barOption="barOption"></Bar>
    <LineChart :lineOption="lineOption"></LineChart>
    <div @click="setImage">xxxx</div>
    <img :src="posterImg" alt="" style="height:200px;width:200px">
  </div>
</template>

<script>
import Bar from "@/views/Bar.vue";
import LineChart from "@/views/Line.vue";
import echarts from "echarts";
import html2canvas from 'html2canvas'
export default {
  name: "index",
  components: {
    Bar,
    LineChart
  },
  data() {
    return {
      time:0,
      barTime:undefined,
      posterImg:'',
      barOption: {
        xAxis: {
          type: "category",
          data: ['3月','4月','5月']
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [120, 200, 150],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)"
            }
          }
        ]
      },
      lineOption:{
        title: {
          text: '瞬时曲线',

        },
        dataZoom: [{
          type: 'inside',
          zoomOnMouseWheel: false,
          startValue: 0,
          endValue: 3
        }],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['昨日', '今日']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '昨日',
            type: 'line',
            smooth: true,
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '今日',
            type: 'line',
            smooth: true,
            data: [220, 182, 191, 234, 290, 330, 310]
          }
        ]
      }
    };
  },
  methods:{
    changeBarTime(){
      const barData = {
        0:()=>{
          // 近三月
          this.barOption.xAxis.data = ['3月','4月','5月'];
          this.barOption.series[0].data = [120, 200, 150];
        },
          1:()=>{
          // 近四周
          this.barOption.xAxis.data = ['第一周','第二周','第三周','第四周'];
          this.barOption.series[0].data = [120, 200, 150,200];
        },
          2:()=>{
          // 近七天
          this.barOption.xAxis.data = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
          this.barOption.series[0].data = [120, 200, 150, 80, 70, 110, 130];
        },
      };
      this.barTime = setInterval(()=>{
        this.time++;
        if(this.time === 3) {
          this.time = 0
        }
        barData[this.time]();
      },1000)
    },
    setImage(){
      const domObj = document.getElementById('app')
      html2canvas(domObj).then(canvas => {
        const imgUrl = canvas.toDataURL("image/png"); // 获取生成的图片的url
        console.log(imgUrl)
        this.saveFile(imgUrl,'images.jpg')
      });
    },
    saveFile(data, filename){
      const save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
      save_link.href = data;
      save_link.download = filename;

      const event = document.createEvent('MouseEvents');
      event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      save_link.dispatchEvent(event);
    }
  },
  mounted() {
    // 动态改变柱状图数据(三个月，四周，七天)
    this.changeBarTime()
  },
  beforeDestroy() {
    window.clearInterval(this.barTime)
  }
};
</script>

<style>
</style>
