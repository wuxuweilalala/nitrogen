<template>
  <div>
    <v-chart  ref="ecInstance" :options="lineOption"  @mouseover.native="stopDataZoom"
              @mouseout.native="startDataZoom" />
  </div>

</template>

<script>
  import ECharts from "vue-echarts";
  import "echarts/lib/chart/bar";
  import "echarts/lib/chart/line";
  import echarts from "echarts";
  export default {
    components: {
      "v-chart": ECharts
    },
    props: ["lineOption"],
    data(){
      return {
        dataZoomTimer: null,
        startValue: 0,
        endValue: 3
      }
    },
    methods: {
      stopDataZoom() {
        window.clearInterval(this.dataZoomTimer);
      },
      startDataZoom() {
        let vm = this;
        this.dataZoomTimer = setInterval(() => {
          vm.startValue++;
          vm.endValue++;
          if (vm.endValue === vm.lineOption.xAxis.data.length) {
            vm.startValue = 0;
            vm.endValue = 3;
          }
          vm.$refs.ecInstance.dispatchAction({
            type: "dataZoom",
            dataZoomIndex: 0,
            startValue: vm.startValue,
            endValue: vm.endValue
          });
        }, 3000);
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.startDataZoom();
      });
    },
    beforeDestroy() {
      window.clearInterval(this.dataZoomTimer);
    }

  };
</script>

<style>
</style>
