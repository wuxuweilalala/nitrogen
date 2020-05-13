<template>
  <div>
    <v-chart :options="barOption" />
  </div>

</template>

<script>
import ECharts from "vue-echarts";
import echarts from "echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
export default {
  components: {
    "v-chart": ECharts,
  },
  props: ["barOption"],
  data() {
    return {};
  }
};
</script>

<style>
</style>
