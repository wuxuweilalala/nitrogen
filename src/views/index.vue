<template>
  <div class="container">
    <Header @setImage="setImage" @screen="screen"></Header>

    <section class="topSection">
      <!-- 左边总览数据 -->
      <div class="leftSection">
        <div
          :class="[
            { blueBg: item.status === 0, redBg: item.status === 1 },
            'totalList'
          ]"
          v-for="(item, index) in totalData"
          :key="index"
          @click="diaLogShow(item)"
        >
          <span>{{ item.name }}</span>
          <span>{{ item.val }}</span>
        </div>
      </div>
      <!-- 右边线体实时监测 -->
      <div class="rightSection">
        <el-table
          :data="tableData"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column v-for="(item,index) in lineData.tableHeader" :key="index" :prop="lineData.key[index]" :label="item" width="180">
          </el-table-column>
        </el-table>
      </div>
    </section>

    <section class="bottomSection">
      <div class="bottomList">
        <div class="header">
          <span>氮气用量</span>
          <div class="rightIcon">
            <el-date-picker
              v-model="value1"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
            <div class="icon" @click="exportExcel">下载</div>
            <div class="icon">重载</div>
          </div>
        </div>
        <Bar :barOption="barOption"></Bar>
      </div>
      <div class="bottomList">
        <div class="header">
          <span>瞬时曲线</span>
          <div class="rightIcon">
            <el-date-picker
              v-model="value1"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
            <div class="icon" @click="exportExcel">下载</div>
            <div class="icon">重载</div>
          </div>
        </div>
        <LineChart :lineOption="lineOption"></LineChart>
      </div>
    </section>

    <!-- echarts 图表数据导出为 excel表格 -->
    <div style="display: none">
      <table id="js_table_xlsx">
        <tbody>
          <tr>
            <td></td>
            <td v-for="(item, index) in lineOption.xAxis.data" :key="index">
              <span>{{ item }}</span>
            </td>
          </tr>
          <tr v-for="(list, i) in lineOption.series" :key="i">
            <td>{{ list.name }}</td>
            <td v-for="(tdList, tdIndex) in list.data" :key="tdIndex">
              <span>{{ tdList }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 设备列表弹出框 -->
    <DevicePopup ref="device"></DevicePopup>
    <!-- 报警列表弹出框 -->
    <WarnPopup ref="warn"></WarnPopup>
  </div>
</template>

<script>
import Header from "../components/Header";
import Bar from "@/views/Bar.vue";
import LineChart from "@/views/Line.vue";
import DevicePopup from "./DevicePopup";
import WarnPopup from "./WarnPopup";
import echarts from "echarts";
import html2canvas from "html2canvas";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  name: "index",
  components: {
    Bar,
    LineChart,
    DevicePopup,
    WarnPopup,
    Header
  },
  data() {
    return {
      time: 0,
      value1: "",
      barTime: undefined,
      posterImg: "",
      totalData: [
        {
          name: "总设备数量",
          val: 76,
          status: 0,
          type: 1
        },
        {
          name: "正常",
          val: 70,
          status: 0,
          type: 1
        },
        {
          name: "离线",
          val: 0,
          status: 1,
          type: 1
        },
        {
          name: "报警",
          val: 6,
          status: 1,
          type: 2
        }
      ],
      barOption: {
        xAxis: {
          type: "category",
          data: ["3月", "4月", "5月"]
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
      lineOption: {
        dataZoom: [
          {
            type: "inside",
            zoomOnMouseWheel: false,
            startValue: 0,
            endValue: 3
          }
        ],
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["昨日", "今日"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "昨日",
            type: "line",
            smooth: true,
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "今日",
            type: "line",
            smooth: true,
            data: [220, 182, 191, 234, 290, 330, 310]
          }
        ]
      },
      lineData: {
        title: "线体实时监控",
        tableHeader: ["线体编号", "线体名称", "PPM"],
        key: ["id", "name", "ppm"],
        selectKey: "id",
        data: [
          {
            id: '001',
            name: "线体一",
            ppm: 30
          },
          {
            id: '001',
            name: "线体一",
            ppm: 30
          },
          {
            id: '001',
            name: "线体一",
            ppm: 30
          }
        ]
      },

      tableData: [
        {
          id: "001",
          name: "线体一",
          ppm: 30
        },
        {
          id: "001",
          name: "线体一",
          ppm: 30
        },
        {
          id: "001",
          name: "线体一",
          ppm: 30
        },
        {
          id: "2001",
          name: "线体一",
          ppm: 30
        }
      ]
    };
  },
  methods: {
    // 柱状图数据切换
    changeBarTime() {
      const barData = {
        0: () => {
          // 近三月
          this.barOption.xAxis.data = ["3月", "4月", "5月"];
          this.barOption.series[0].data = [120, 200, 150];
        },
        1: () => {
          // 近四周
          this.barOption.xAxis.data = ["第一周", "第二周", "第三周", "第四周"];
          this.barOption.series[0].data = [120, 200, 150, 200];
        },
        2: () => {
          // 近七天
          this.barOption.xAxis.data = [
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun"
          ];
          this.barOption.series[0].data = [120, 200, 150, 80, 70, 110, 130];
        }
      };
      this.barTime = setInterval(() => {
        this.time++;
        if (this.time === 3) {
          this.time = 0;
        }
        barData[this.time]();
      }, 3000);
    },
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
    // 导出为 excel 图表
    exportExcel() {
      /* generate workbook object from table */
      const wb = XLSX.utils.table_to_book(
        document.querySelector("#js_table_xlsx")
      );
      /* get binary string as output */
      const wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "氮气用量.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    // 首页 table 组件 样式
    tableRowClassName({ row, rowIndex }) {
      console.log(row);
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    // dialog 展示
    diaLogShow(item) {
      if (item.type === 0) return;
      if (item.type === 1) {
        this.$refs.device.dialogTableVisible = true;
        return;
      }
      if (item.type === 2) {
        this.$refs.warn.dialogTableVisible = true;
      }
    }
  },
  mounted() {
    // 动态改变柱状图数据(三个月，四周，七天)
    this.changeBarTime();
  },
  beforeDestroy() {
    window.clearInterval(this.barTime);
  }
};
</script>
<style>
.el-table .warning-row {
  background: rgb(195, 147, 147);
}

.el-table .success-row {
  background: rgb(153, 202, 173);
}
</style>
<style lang="scss" scoped>
.container {
  .topSection {
    display: flex;
    .leftSection {
      width: 30vw;
      display: flex;
      flex-wrap: wrap;
      .totalList {
        width: 14vw;
        height: 10vh;
        margin-right: 1vw;
        margin-bottom: 1vh;
        border: 1px solid red;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &.blueBg {
          background-color: blue;
        }
        &.redBg {
          background-color: red;
        }
        &:nth-child(even) {
          margin: 0;
        }
      }
    }
  }
  .bottomSection {
    display: flex;
    .bottomList {
      .header {
        display: flex;
        .rightIcon {
          display: flex;
        }
      }
    }
  }
}
</style>
