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
                <span class="name">{{barTitle}}</span>
                <div class="bottomSide">
                  <span class="englishName">Nitrogen dosage</span>
                  <div class="first"></div>
                  <div class="end"></div>
                </div>
              </div>
              <el-date-picker
                      v-model="value1"
                      type="daterange"
                      range-separator=""
                      start-placeholder="选择时间段"
                      end-placeholder="">
              </el-date-picker>
            </div>
            <div class="chartWrapper">
              <div class="chartHeader">
                <div class="dateChange">
                  <span  v-show="dateChangeShow" v-for="(item,index) in barChange"  :class="{ active: time === index }" :key="index">{{item}}</span>
                <!--  <span :class="{ active: time === 2 }">近七天</span>
                  <span :class="{ active: time === 1 }">近四周</span>
                  <span :class="{ active: time === 0 }">近三月</span>-->
                </div>
                <div class="rightIcon">
                  <div @click="exportExcel('bar', barTitle)">
                    <Icon name="downLoad"></Icon>
                  </div>
                  <div @click="refreshBar">
                    <Icon name="refresh"></Icon>
                  </div>
                </div>
              </div>
              <Bar id="barChart" :barOption="barOption"></Bar>
            </div>
          </div>
          <div class="bottomList line">
            <div class="header">
              <div class="leftSide">
                <span class="name">{{lineTitle}}</span>
                <div class="bottomSide">
                  <span class="englishName">Clockwise curve</span>
                  <div class="first"></div>
                  <div class="end"></div>
                </div>
              </div>
              <el-date-picker
                      @change="setLineData"
                v-model="value2"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </div>
            <div class="chartWrapper">
              <div class="chartHeader">
                <div class="dateChange">
                  <span v-for="(item,index) in lineChange" :key="index">{{item}}</span>
                </div>
                <div class="rightIcon">
                  <div @click="exportExcel('line', lineTitle)">
                    <Icon name="downLoad"></Icon>
                  </div>
                  <div>
                    <Icon name="refresh"></Icon>
                  </div>
                </div>
              </div>
              <LineChart id="lineChart" :lineOption="lineOption"></LineChart>
            </div>
          </div>
        </div>
      </section>

      <!-- 右边 -->
      <section class="rightSection">
        <div class="header">
          <div class="leftSide">
            <span class="name">{{lineData.title}}</span>
            <div class="bottomSide">
              <span class="englishName">Line body real-time monitoring</span>
              <div class="first"></div>
              <div class="end"></div>
            </div>
          </div>
          <div @click="exportExcel('myTabel', '线体实时检测')">
            <Icon name="downLoad"></Icon>
          </div>
        </div>
        <table id="myTabel" border="0" cellpadding="0" cellspacing="0">
          <tr class="tabelHeader">
            <td v-for="(item, index) in lineData.tableHeader" :key="index">
              {{ item }}
            </td>
          </tr>
          <tr
            v-for="(item, index) in tableData"
            :key="index"
            :class="[{ tabelRow: index % 2 === 1, tabelRow1: index % 3 === 1 }]"
            @click="setBarData(item)"
          >
            <td v-for="(sonItem,sonIndex) in item" :key="sonIndex">{{sonItem}}</td>
          </tr>
        </table>
      </section>
    </main>

    <!-- echarts 图表数据导出为 excel表格 -->
    <div style="display: none">
      <table id="line">
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

    <div style="display: none">
      <table id="bar">
        <tbody>
        <tr>
          <td></td>
          <td v-for="(item, index) in barOption.xAxis.data" :key="index">
            <span>{{ item }}</span>
          </td>
        </tr>
        <tr v-for="(list, i) in barOption.series" :key="i">
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
      dateChangeShow:true,
      webSocket: null,
      wsUrl: "ws://36.111.35.27:9501",
      URL: "http://120.76.22.80:8089",
      cid:'81b2ccac-ea0e-e711-80e8-a55521da1859',
      time: 0,
      value1: "",
      value2: "",
      barTime: undefined,
      posterImg: "",
      barTitle:'氮气用量',
      lineTitle:'瞬时曲线',
      totalData: [
        {
          name: "",
          englishName: "Total number of equipment",
          val: 0,
          status: 0,
          type: 1
        },
        {
          name: "正常设备",
          englishName: "Normal equipment",
          val: 0,
          status: 0,
          type: 1
        },
        {
          name: "离线设备",
          englishName: "Offline equipment",
          val: 0,
          status: 1,
          type: 1
        },
        {
          name: "报警设备",
          englishName: "Alarm equipment",
          val: 0,
          status: 1,
          type: 2
        }
      ],
      barOption: {
        xAxis: {
          type: "category",
          data: ["3月", "4月", "5月"],
          axisLabel: {
            color: "#fff"
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        yAxis: {
          type: "value",
          axisLabel: {
            color: "#fff"
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        height: "80%",
        grid: {
          top: "5%",
          left: "3%",
          right: "4%",
          bottom: "5%",
          containLabel: true
        },
        series: [
          {
            data: [120, 200, 150],
            type: "bar",
            barWidth: "40%",
            showBackground: true,
            itemStyle: {
              color: "#00ffb1"
            },
            backgroundStyle: {
              color: "#000000"
            }
          }
        ]
      },
      barData:[],
      barChange:[],
      lineChange:[],
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
          show: false,
          data: ["昨日", "今日"]
        },
        height: "80%",
        grid: {
          top: "5%",
          left: "3%",
          right: "4%",
          bottom: "5%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisLabel: {
            color: "#fff"
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value",
          axisLabel: {
            color: "#fff"
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        series: [
          {
            name: "昨日",
            type: "line",
            smooth: true,
            lineStyle: {
              color: "#00ffb1",
              width: 2
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "今日",
            type: "line",
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(0,255,177,.1)"
                },
                {
                  offset: 1,
                  color: "rgba(0,255,177,0)"
                }
              ])
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          }
        ]
      },
      lineData: {
      },
      currentLineId:'',
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
    initEchart(){
      window.onresize=function(){
        console.log(1);
        const barChart = echarts.init(document.getElementById('barChart'));
        const lineChart = echarts.init(document.getElementById('lineChart'));
        barChart.resize();
        lineChart.resize();
      }
    },
    setLineData(){
      const date = document.querySelector('.line .el-input__inner').value;
      this.getClockwise(this.currentLineId,date)
      console.log(date);
    },
    // 获取瞬时曲线数据
    getClockwise(selectKey,date){
      this.axios.get('http://120.76.22.80:8089/api/bidata/showparadata',{
        params:{
          cid:this.cid,
          selectKey,
          date
        }
      }).then(res=>{
        console.log('res');
        console.log(res.data);
        this.lineTitle = res.data.title;
        this.lineChange = res.data.data.legend
        this.lineOption.legend.data = res.data.data.legend;
        this.lineOption.xAxis.data = JSON.parse(res.data.data.xAxis);
        this.lineOption.series[0].name = res.data.data.series[0].name;
        this.lineOption.series[0].data = JSON.parse(res.data.data.series[0].data);
        this.lineOption.series[1].name = res.data.data.series[1].name;
        this.lineOption.series[1].data = JSON.parse(res.data.data.series[1].data);
      })
    },
    // 点击右边表格的每一项来切换柱状图的数据
    setBarData(item){
      this.value2='';
      this.currentLineId =item[0];
      clearInterval(this.barTime);
      this.getNitrogen('init',item[0]);
      this.getClockwise(item[0])
    },
    // 重置柱状图
    refreshBar(){
      this.value1 = "";
      clearInterval(this.barTime);
      this.changeBarTime();
    },
    getNitrogen(type,mid,timeType,startTime,endTime) {
        this.axios.get('http://120.76.22.80:8089/api/bidata/getmeteruse',{
          params:{
            cid:this.cid,
            mid,
            timeType,
            startTime,
            endTime
          }
        }).then(res=>{
          // 取消定时器
          if(type === 'init') {
            this.barTitle = res.data.title;
            this.barData = res.data.data;
            this.barChange= res.data.timeType;
            this.changeBarTime()
          }else {
            this.dateChangeShow= false;
            window.clearInterval(this.barTime);
            this.barOption.xAxis.data = JSON.parse(res.data.data[0]).xAxis ;
            this.barOption.series[0].data = JSON.parse(res.data.data[0]).series ;
          }
        })
    },
    getData(){
      this.webSocket = new WebSocket(this.wsUrl);
      this.webSocket.onmessage = evt=>{
        const data = JSON.parse(evt.data);

        let dataIndexTable = {
          // 标题
          bititle:()=>{
            const title = data.bititle.title.split("'")[1];
            this.$store.commit('setTitle',title)
          },
          // 总览数据
          getalarmcount:()=>{
            this.totalData = data.getalarmcount;
          },
          // 右侧表格数据
          getmetermonitor:()=>{
            data.getmetermonitor.tableHeader = JSON.parse(data.getmetermonitor.tableHeader)
            data.getmetermonitor.data = JSON.parse(data.getmetermonitor.data);
            this.lineData = data.getmetermonitor;
            this.tableData = data.getmetermonitor.data;
            this.tableData.push(this.tableData[1])
            this.tableData.push(this.tableData[1])
            this.tableData.push(this.tableData[1])
            this.currentLineId = data.getmetermonitor.data[0][0];
          },
          // 氮气用量数据
          /*getmeteruse:()=>{
            this.barTitle = data.getmeteruse.title;
            this.barData = data.getmeteruse.data;
            this.barChange= data.getmeteruse.timeType;
          }*/
        };

        for (let key in dataIndexTable) {
          if (key in data) {
            dataIndexTable[key]();
          }
        }

      };
      this.webSocket.onopen =  evt=> {
        var interfaceData = [{
          time: 5000,
          is_first: true,
          data: [
            {
              url: this.URL + "/api/bidata/bititle",
              key: "bititle",
              type:'get',
              is_ssl:false,
              headers:'',
              param:{"cid":this.cid}
            }
          ]
        },
          {
            time: 5000,
            is_first: true,
            data: [
              {
                url: this.URL + "/api/bidata/getalarmcount",
                key: "getalarmcount",
                type: "get",
                is_ssl: false,
                headers: "",
                param:{"cid":this.cid}
              }
            ]
          },
          {
            time: 5000,
            is_first: true,
            data: [
              {
                url: this.URL + "/api/bidata/getmetermonitor",
                key: "getmetermonitor",
                type: "get",
                is_ssl: false,
                headers: "",
                param:{"cid":this.cid}
              }
            ]
          },
       /*   {
            time: 5000,
            is_first: true,
            data: [
              {
                url: this.URL + "/api/bidata/getmeteruse",
                key: "getmeteruse",
                type: "get",
                is_ssl: false,
                headers: "",
                param:{"cid":this.cid,mid:this.tableData[0][0]}
              }
            ]
          },*/
        ];
        this.webSocket.send(JSON.stringify(interfaceData));
      };

    },
    // 柱状图数据切换
    changeBarTime() {
      this.dateChangeShow = true;
      const barData1 = {};
      this.barData.forEach((item,index)=>{
        barData1[index] = ()=>{
          this.barOption.xAxis.data = JSON.parse(item).xAxis ;
          this.barOption.series[0].data = JSON.parse(item).series ;
        }
      })
      /*const barData = {
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
      };*/
      barData1[0]();
      this.barTime = setInterval(() => {
        this.time++;
        if (this.time === this.barData.length) {
          this.time = 0;
        }
        barData1[this.time]();
      }, 3000);
    },
    // 导出为 excel 图表
    exportExcel(id, name) {
      /* generate workbook object from table */
      const wb = XLSX.utils.table_to_book(document.querySelector("#" + id));
      /* get binary string as output */
      const wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          `${name}.xlsx`
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    // 首页 table 组件 样式
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    // dialog 展示
    diaLogShow(item) {
      console.log(item);
      if (item.type === 0) return;
      if (item.type === 1) {
        this.$router.push(`/device?status=${item.status}`);
        return;
      }
      if (item.type === 2) {
        this.$router.push(`/device?status=${item.status}`);
      }
    }
  },
  watch:{
    'tableData.length':{
      handler(val){
        this.getNitrogen('init',this.currentLineId);
        this.getClockwise(this.currentLineId)
      }
    },
    // 柱状图时间筛选
    value1:{
      handler(val){
        if(val) {
          this.$nextTick(()=>{
            const startTime = document.querySelectorAll('.el-range-input')[0].value;
            const endTime = document.querySelectorAll('.el-range-input')[1].value;
            this.getNitrogen('change',this.currentLineId,'day',startTime,endTime)
          });
        }
      }
    }
  },
  mounted() {
    // 动态改变柱状图数据(三个月，四周，七天)
    //this.changeBarTime();
    this.getData()
  },
  beforeDestroy() {
    window.clearInterval(this.barTime);
  }
};
</script>



<style>
.el-table .warning-row {
  background: rgba(255, 0, 0, 0.13);
}

.el-table .success-row {
  background: rgba(0, 255, 255, 0.06);
}
.el-table thead {
  color: #fff;
}
.el-table th,
.el-table tr {
  background-color: rgb(3, 10, 13);
}
.el-table td,
.el-table th.is-leaf {
  border: none;
}
.el-range-editor.el-input__inner {
  width: 11.32vw;
  height: 2.78vh;
  border: 1px solid #005d5d;
}
.el-date-editor .el-range-input, .el-date-editor  {
  font-size: 0.75vw;
  color: #fff;
  background-color: unset;
}
.el-range-separator {
  display: none;
}
.el-input__inner{
  background-color: unset;
}
.el-icon-date:before {
  display: none;
}
.el-date-editor .el-range__icon {
  display: none;
}
.el-date-editor .el-range__close-icon {
  line-height: 1.9vh;
}
.el-date-editor .el-range-input {
  width: 4vw;
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
        background: url("~@/assets/imgs/totalBg.png") no-repeat;
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
          background: url("~@/assets/imgs/totalListBg.png") no-repeat;
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
        background: url("~@/assets/imgs/chartBg.png");
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
            border-bottom: 1px solid rgba(0, 255, 255, 0.15);
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
                background-color: unset;
                padding: 0 10px !important;
                height: 2.78vh;
                font-size: 0.75vw;
                border: 1px solid #005d5d;
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
                    content: "";
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
      background: url("~@/assets/imgs/tabelBg.png");
      background-size: 100% 100%;
      width: 36.25vw;
      height: 75.93vh;
      overflow-y: scroll;
      padding: 2.78vh 2.45vw 0 2.03vw;
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1.85vh;
        padding-bottom: 1.2vh;
        border-bottom: 1px solid rgba(0, 255, 255, 0.15);
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
        display: block;
        tr {
          height: 4.44vh;
          color: #fff;
          text-align: center;
          cursor: pointer;
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
          background-color: rgba(0, 255, 255, 0.06);
        }
        .tabelRow1 {
          color: #fff;
          background: rgba(255, 0, 0, 0.13);
        }
      }
    }
  }
}
</style>
<style lang="scss">
  .el-button+.el-button {
    background-color: unset;
    border: none;
    color: #409EFF;
  }
  .el-button.is-plain:focus, .el-button.is-plain:hover{
    background-color: unset;
  }
  .el-date-picker__time-header {
    border-bottom: 1px solid #00ffff;
  }
  .el-picker-panel__footer {
    border-top: 1px solid #00ffff;
  }
  .el-input__inner {
    border: 1px solid #00ffff;
  }
  .el-date-range-picker__content.is-left {
    border-right: 1px solid #00ffff;
  }
  .el-picker-panel {
    border: 1px solid #00ffff;
  }
  .el-picker-panel__body-wrapper {
    background-color: #020b0c ;
  }
  .el-date-table td {
    color: #fff;
  }
  .el-date-range-picker__content .el-date-range-picker__header div {
    color: #fff;
  }
  .el-date-table th {
    color: #00ffff;
    border-bottom: 1px solid #00ffff;
  }
  .el-picker-panel__icon-btn {
    color: #00ffff;
  }
  .el-date-table td.today {
    background-color: #00ffff;
    border-radius: 50%;
    span {
      color: #000000;
    }
  }
  .el-date-table td.in-range div, .el-date-table td.in-range div:hover, .el-date-table.is-week-mode .el-date-table__row.current div, .el-date-table.is-week-mode .el-date-table__row:hover div {
    background-color: rgba(0,255,255,0.2);
  }
  .el-date-table td.end-date span, .el-date-table td.start-date span {
    background-color: #00ffff;
    color: #000000;
    width: 31px;
    height: 28px;
  }
  .el-picker-panel__footer {
    background-color: #020b0c ;
  }
  .el-date-picker__header-label {
    color: #ffffff;
  }
  .el-time-panel {
    background-color: #020b0c;
  }
  .el-time-spinner__item {
    color: #fff;
  }
  .el-time-spinner__item.active:not(.disabled) {
    color: #00ffff;
  }
  .el-time-spinner__item:hover:not(.disabled):not(.active) {
    background-color: unset;
  }
</style>
