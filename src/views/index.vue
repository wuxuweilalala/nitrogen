<template>
  <div class="container">
    <main>
      <!-- 左边 -->
      <section class="leftSection">
        <!-- 上边总览数据 -->
        <div class="topSection">
          <div
                  :class="[
            { blueBg: item.status === 0, redBg: item.status === 1 },
            'totalList'
          ]"
                  v-for="(item, index) in totalData"
                  :key="index"
                  @click="diaLogShow(item)"
          >
            <span class="num">{{ item.val }}</span>
            <div class="nameWrapper">
              <span class="chineseName">{{ item.name }}</span>
              <span class="englishName">{{ item.englishName }}</span>
            </div>

          </div>
        </div>
        <!-- 下边图表 -->
        <div class="bottomSection">
          <div class="bottomList">
            <div class="header">
              <div class="leftSide">
                <span class="name">氮气用量</span>
                <div class="bottomSide">
                  <span class="englishName">Nitrogen dosage</span>
                  <div class="first"></div>
                  <div class="end"></div>
                </div>
              </div>
              <el-date-picker
                      v-model="value1"
                      type="datetime"
                      placeholder="选择日期时间"
              >
              </el-date-picker>
            </div>
            <div class="chartWrapper">
              <div class="chartHeader">
                <div class="dateChange">
                  <span :class="{active:time===2}">近七天</span>
                  <span :class="{active:time===1}">近四周</span>
                  <span :class="{active:time===0}">近三月</span>
                </div>
                <div class="rightIcon">
                  <div @click="exportExcel">
                    <Icon name="downLoad"></Icon>
                  </div>
                  <div>
                    <Icon name="refresh"></Icon>
                  </div>
                </div>
              </div>
              <Bar :barOption="barOption"></Bar>
            </div>

          </div>
          <div class="bottomList">
            <div class="header">
              <div class="leftSide">
                <span class="name">顺时曲线</span>
                <div class="bottomSide">
                  <span class="englishName">Clockwise curve</span>
                  <div class="first"></div>
                  <div class="end"></div>
                </div>
              </div>
              <el-date-picker
                      v-model="value1"
                      type="datetime"
                      placeholder="选择日期时间"
              >
              </el-date-picker>
            </div>
            <div class="chartWrapper">
              <div class="chartHeader">
                <div class="dateChange">
                  <span>今日</span>
                  <span>昨日</span>
                </div>
                <div class="rightIcon">
                  <div @click="exportExcel">
                    <Icon name="downLoad"></Icon>
                  </div>
                  <div>
                    <Icon name="refresh"></Icon>
                  </div>
                </div>
              </div>
              <LineChart :lineOption="lineOption"></LineChart>
            </div>
          </div>
        </div>
      </section>

      <!-- 右边 -->
      <section class="rightSection">
        <div class="header">
          <div class="leftSide">
            <span class="name">线体实时监测</span>
            <div class="bottomSide">
              <span class="englishName">Line body real-time monitoring</span>
              <div class="first"></div>
              <div class="end"></div>
            </div>
          </div>
          <Icon name="downLoad"></Icon>
        </div>
        <table id="myTabel"  border="0" cellpadding="0" cellspacing="0">
          <tr class="tabelHeader">
            <td v-for="(item,index) in lineData.tableHeader" :key="index">{{item}}</td>
          </tr>
          <tr v-for="(item,index) in lineData.data" :key="index" :class="[{tabelRow:index % 2===1,tabelRow1:index % 3===1}]">
            <td class="name">{{item.name}}</td>
            <td>{{item.speed}}</td>
            <td>{{item.ppm}}</td>
            <td>{{item.speed}}</td>
            <td class="control">{{item.control}}</td>
          </tr>
        </table>
     <!--   <el-table
                :data="tableData"
                style="width: 100%"
                :row-class-name="tableRowClassName"
        >
          <el-table-column v-for="(item,index) in lineData.tableHeader" :key="index" :prop="lineData.key[index]" :label="item" >
          </el-table-column>
        </el-table>-->

      </section>
    </main>


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

  </div>
</template>

<script>
import Icon from "../components/Icon";
import Bar from "@/views/Bar.vue";
import LineChart from "@/views/Line.vue";
import echarts from "echarts";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  name: "index",
  components: {
    Bar,
    LineChart,
    Icon
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
          englishName:'Total number of equipment',
          val: 76,
          status: 0,
          type: 1
        },
        {
          name: "正常设备",
          englishName:'Normal equipment',
          val: 70,
          status: 0,
          type: 1
        },
        {
          name: "离线设备",
          englishName:'Offline equipment',
          val: 0,
          status: 1,
          type: 1
        },
        {
          name: "报警设备",
          englishName:'Alarm equipment',
          val: 6,
          status: 1,
          type: 2
        }
      ],
      barOption: {
        xAxis: {
          type: "category",
          data: ["3月", "4月", "5月"],
          axisLabel:{
            color:'#fff'
          },
          axisTick:{
            show:false
          },
          splitLine:{
            show:false
          },
          axisLine:{
            show:false
          }
        },
        yAxis: {
          type: "value",
          axisLabel:{
            color:'#fff'
          },
          splitLine:{
            show:false
          },
          axisTick:{
            show:false
          },
          axisLine:{
            show:false
          }
        },
        height:'90%',
        grid: {
          top:'5%',
          left: "3%",
          right: "4%",
          bottom: "0%",
          containLabel: true
        },
        series: [
          {
            data: [120, 200, 150],
            type: "bar",
            barWidth: '40%',
            showBackground: true,
            itemStyle:{
              color:"#00ffb1"
            },
            backgroundStyle: {
              color: "#000000"
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
          show:false,
          data: ["昨日", "今日"]
        },
        grid: {
          top:'3%',
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisLabel:{
            color:'#fff'
          },
          splitLine:{
            show:false
          },
          axisTick:{
            show:false
          },
          axisLine:{
            show:false
          },
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value",
          axisLabel:{
            color:'#fff'
          },
          splitLine:{
            show:false
          },
          axisTick:{
            show:false
          },
          axisLine:{
            show:false
          }
        },
        series: [
          {
            name: "昨日",
            type: "line",
            smooth: true,
            lineStyle: {
              color: '#00ffb1',
              width: 2
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "今日",
            type: "line",
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(0,255,177,.1)'
              }, {
                offset: 1,
                color: 'rgba(0,255,177,0)'
              }])
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          }
        ]
      },
      lineData: {
        title: "线体实时监控",
        tableHeader: ["线体", "流速度", "PPM","阀门开度",'控制模式'],
        key: ["id", "name", "ppm"],
        selectKey: "id",
        data: [
          {
            id: '001',
            name: "线体一",
            speed:40,
            ppm:80,
            control:"自动"
          },
          {
            id: '001',
            name: "线体一",
            speed:40,
            ppm:80,
            control:"自动"
          },
          {
            id: '001',
            name: "线体一",
            speed:40,
            ppm:80,
            control:"自动"
          },
          {
            id: '001',
            name: "线体一",
            speed:40,
            ppm:80,
            control:"自动"
          },
          {
            id: '001',
            name: "线体一",
            speed:40,
            ppm:80,
            control:"自动"
          },
          {
            id: '001',
            name: "线体一",
            speed:40,
            ppm:80,
            control:"自动"
          },
          {
            id: '001',
            name: "线体一",
            speed:40,
            ppm:80,
            control:"自动"
          }, {
            id: '001',
            name: "线体一",
            speed:40,
            ppm:80,
            control:"自动"
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
        this.$router.push('/device');
        return;
      }
      if (item.type === 2) {
        this.$router.push('/warn');
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
  background: rgba(255,0,0,0.13);
}

.el-table .success-row {
  background: rgba(0,255,255,.06);
}
.el-table thead {
  color: #fff;
}
.el-table th, .el-table tr {
  background-color: rgb(3,10,13);
}
.el-table td, .el-table th.is-leaf {
  border: none;
}
</style>
<style lang="scss" scoped>
.container {
  main {
    display: flex;
    .leftSection {
      width: 48.75vw;
      display: flex;
      flex-direction: column;
      .topSection {
        display: flex;
        flex-wrap: wrap;
        background: url('~@/assets/imgs/totalBg.png') no-repeat;
        background-size: 100% 100%;
        padding: 3.98vh 3.13vw 3.06vh 3.13vw;
        height: 32.59vh;
        margin-bottom: 3.24vh;
        .totalList {
          cursor: pointer;
          width: 20.21vw;
          height: 11.39vh;
          display: flex;
          align-items: center;
          justify-content: space-around;
          background: url('~@/assets/imgs/totalListBg.png') no-repeat;
          background-size: 100% 100%;
          margin-right: 1.77vw;
          margin-bottom: 2.69vh;
          &:nth-child(even) {
            margin-right: 0;
          }
          .num {
            color: #00ffb1;
            font-size: 1.98vw;
            font-family: TheklaExtended;
          }
          .nameWrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .chineseName {
              color: #fff;
              font-size: 1.15vw;
              margin-bottom: 0.65vh;
            }
            .englishName {
              font-size: 0.52vw;
              color: rgba(0, 255, 255, 0.5);
            }
          }
        }
      }
      .bottomSection {
        display: flex;
        width: 100%;
        height: 39.35vh;
        padding: 2.59vh 1.93vw 0 1.98vw;
        background: url('~@/assets/imgs/chartBg.png');
        background-size: 100% 100%;
        .bottomList {
          width: 20.52vw;
          &:first-child {
            margin-right: 4.74vw;
          }
          .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1.85vh;
            padding-bottom: 1.2vh;
            border-bottom: 1px solid rgba(0,255,255,0.15);
            .leftSide {
              .name {
                color: #fff;
                font-size: 1.15vw;
                margin-bottom: 0.74vh;
              }
              .bottomSide {
                display: flex;
                align-items: center;
                .englishName {
                  font-size: 0.52vw;
                  color: rgba(0, 255, 255, 0.5);
                  margin-right: 0.78vw;
                }
                .first {
                  width: 15px;
                  height: 2px;
                  background: #00ffff;
                  opacity: 0.7;
                  margin-right: 0.26vw;
                }
                .end {
                  width: 15px;
                  height: 2px;
                  background: #00ffff;
                  opacity: 0.4;
                }
              }
            }
            ::v-deep.el-input {
              cursor: pointer;
              width: 9.32vw;
              .el-input__inner {
                background-color: #005d5d;
                padding:0 10px!important;
                height: 2.78vh;
              }
              .el-input__prefix {
                display: none;
              }
            }
          }
          .chartWrapper {
            .chartHeader {
              display: flex;
              justify-content: space-between;
              align-items: center;
              .dateChange {
                span {
                  cursor: pointer;
                  color: #fff;
                  font-size: 0.72vw;
                  position: relative;
                  margin-right: 1.25vw;
                }
                .active {
                  color: #00ffff;
                  &::after {
                    position: absolute;
                    content: '';
                    bottom: -10px;
                    height: 2px;
                    width: 2.24vw;
                    left: 0;
                    background-color: #00ffff;
                  }
                }
              }
              .rightIcon {
                display: flex;
                > div {
                  cursor: pointer;
                  margin-right: 0.89vw;
                }
              }
            }
            ::v-deep.echarts {
              width: 20.47vw;
              height: 23.61vh;
              margin-top: 2.31vh;
            }
          }
        }
      }
    }
    .rightSection {
      margin-left: 3.07vw;
      background: url('~@/assets/imgs/tabelBg.png');
      background-size: 100% 100%;
      width: 36.25vw;
      padding: 2.78vh 2.45vw 0 2.03vw;
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1.85vh;
        padding-bottom: 1.2vh;
        border-bottom: 1px solid rgba(0,255,255,0.15);
        .leftSide {
          .name {
            color: #fff;
            font-size: 1.15vw;
            margin-bottom: 0.74vh;
          }
          .bottomSide {
            display: flex;
            align-items: center;
            .englishName {
              font-size: 0.52vw;
              color: rgba(0, 255, 255, 0.5);
              margin-right: 0.78vw;
            }
            .first {
              width: 15px;
              height: 2px;
              background: #00ffff;
              opacity: 0.7;
              margin-right: 0.26vw;
            }
            .end {
              width: 15px;
              height: 2px;
              background: #00ffff;
              opacity: 0.4;
            }
          }
        }
        .icon {
          cursor: pointer;
        }
      }
      #myTabel {
        width: 100%;
        tr {
          height: 4.44vh;
          color: #fff;
          text-align: center;
          .name {
            color: #00ffb1;
          }
          .control {
            color: #00ffff;
          }
        }
        .tabelHeader {
          color: #fff;
          height: 6vh;
        }
        .tabelRow {
          color: #fff;
          background-color: rgba(0,255,255,.06);
        }
        .tabelRow1 {
          color: #fff;
          background: rgba(255,0,0,0.13);
        }
      }
    }
  }

}
</style>
