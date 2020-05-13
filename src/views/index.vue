<template>
  <div>
    <Bar :barOption="barOption"></Bar>
    <LineChart :lineOption="lineOption"></LineChart>
  </div>
</template>

<script>
import Bar from "@/views/Bar.vue";
import LineChart from "@/views/Line.vue";
import echarts from "echarts";
export default {
  name: "index",
  components: {
    Bar,
    LineChart
  },
  data() {
    return {
      barOption: {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
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
  }
};
</script>

<style>
</style>
