<template>
  <div class="container" @click="statusPopupShow=false">
    <div class="return" @click="$router.push('/')">
      <Icon name="return"></Icon>
      <span>返回</span>
    </div>
    <div class="tableWrapper">
      <div class="header">
        <div class="leftSide">
          <span class="name">{{lineData.title.split("'")[0]}}</span>
          <div class="bottomSide">
            <span class="englishName">Device List</span>
            <div class="first"></div>
            <div class="end"></div>
          </div>
        </div>
        <div class="icons">
           <!-- <div class="status" @click.stop="statusPopupShow = !statusPopupShow">
                <span>正常状态</span>
                <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
            </div>
            <div class="statusPopup" v-show="statusPopupShow">
              <div class="popupList" @click="changeData()">正常</div>
              <div class="popupList" @click="statusPopupShow">异常</div>
            </div>-->
          <Icon name="downLoad" @click.native="exportExcel"></Icon>
        </div>
      </div>

      <table id="myTabel" border="0" cellpadding="0" cellspacing="0">
        <tr class="tabelHeader">
          <td v-for="(item, index) in lineData.tableHeader" :key="index">
            {{ item }}
          </td>
        </tr>
        <tr
          v-for="(item, index) in lineData.data"
          :key="index"
          :class="[{ tabelRow: index % 2 === 1, tabelRow1: index % 2 !== 1 }]"
        >
          <td v-for="(list,sonIndex) in item" :key="sonIndex">{{ list }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import Icon from "../components/Icon";
import XLSX from "xlsx";
import FileSaver from "file-saver";
export default {
  name: "DevicePopup",
  components: {
    Icon
  },
  data() {
    return {
      cid:'81b2ccac-ea0e-e711-80e8-a55521da1859',
      statusPopupShow:false,
      lineData: {
        title: "线体实时监控",
        tableHeader: [
          "设备编号",
          "设备位置",
          "状态",
          "最后一次报警内容",
          "最后一次报警时间"
        ],
        key: ["id", "name", "ppm"],
        selectKey: "id",
        data: [
          {
            id: "001",
            name: "线体一",
            speed: 40,
            ppm: 80,
            control: "自动"
          },
          {
            id: "001",
            name: "线体一",
            speed: 40,
            ppm: 80,
            control: "自动"
          },
          {
            id: "001",
            name: "线体一",
            speed: 40,
            ppm: 80,
            control: "自动"
          },
          {
            id: "001",
            name: "线体一",
            speed: 40,
            ppm: 80,
            control: "自动"
          },
          {
            id: "001",
            name: "线体一",
            speed: 40,
            ppm: 80,
            control: "自动"
          },
          {
            id: "001",
            name: "线体一",
            speed: 40,
            ppm: 80,
            control: "自动"
          },
          {
            id: "001",
            name: "线体一",
            speed: 40,
            ppm: 80,
            control: "自动"
          },
          {
            id: "001",
            name: "线体一",
            speed: 40,
            ppm: 80,
            control: "自动"
          }
        ]
      },
    };
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData(){
      this.axios.get('http://120.76.22.80:8089/api/bidata/meterstatuslist',{
        params:{
          cid:this.cid,
          status:this.$route.query.status
        }
      }).then(res=>{
        console.log(res.data);
        res.data.data = JSON.parse(res.data.data);
        res.data.key = JSON.parse(res.data.key);
        res.data.tableHeader = JSON.parse(res.data.tableHeader);
        this.lineData = res.data
      })
    },
    tableRowClassName({ row, rowIndex }) {
      console.log(row);
      if (rowIndex % 2 === 1) {
        return "warning-row1";
      } else if (rowIndex !== 1) {
        return "success-row1";
      }
      return "";
    },
      handleCommand(command){
          console.log(command);
      },
      // 导出为 excel 图表
      exportExcel() {
          /* generate workbook object from table */
          const wb = XLSX.utils.table_to_book(document.querySelector("#myTabel" ));
          /* get binary string as output */
          const wbout = XLSX.write(wb, {
              bookType: "xlsx",
              bookSST: true,
              type: "array"
          });
          try {
              FileSaver.saveAs(
                  new Blob([wbout], { type: "application/octet-stream" }),
                  `设备列表.xlsx`
              );
          } catch (e) {
              if (typeof console !== "undefined") console.log(e, wbout);
          }
          return wbout;
      },
  }
};
</script>

<style lang="scss" scoped>
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
  }
  .tabelRow1 {
    color: #fff;
      background-color: rgba(0, 255, 255, 0.06);
  }
}
.container {
  .return {
    cursor: pointer;
    width: 6.09vw;
    height: 3.24vh;
    background: url("~@/assets/imgs/return.png") no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 10px;
    margin-bottom: 1.94vh;
    span {
      color: #00ffff;
      font-size: 1.04vw;
    }
  }
  .tableWrapper {
    border: 2px solid #00ffff;
    padding: 2.87vh 1.88vw 3.43vh 2.08vw;
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
        .icons {
            display: flex;
          align-items: center;
          position: relative;
          .status {
            color: #fff;
            width: 9.32vw;
            height: 2.78vh;
            border: 1px solid #005d5d;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            font-size: 0.75vw;
            margin-right: 1.09vw;
            cursor: pointer;
          }
          .statusPopup {
            position: absolute;
            color: #fff;
            font-size: 0.75vw;
            border: 1px solid #005d5d;
            bottom: -5.7vh;
            border-top: none;
            .popupList {
              width: 9.2vw;
              height: 2.78vh;
              cursor: pointer;
              padding-left: 1.2vw;
              display: flex;
              align-items: center;
              &:hover {
                background-color: rgba(0,255,255,.2);
                color: #00ffff;
              }
            }
          }
        }
    }
  }
}
</style>

<style>
    .el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover {
        background-color: rgba(0,255,255,.2);
        color: #00ffff;
        display: none;
    }
    .el-popper[x-placement^=bottom] .popper__arrow {
        display: none;
        border-bottom-color: #005d5d;
    }
    .el-popper[x-placement^=bottom] .popper__arrow::after {
        border-bottom-color: #005d5d;
    }
    .el-dropdown-menu {
        background-color: #020b0c;
        border: 1px solid #005d5d;
        width: 9.32vw;
        margin: 0;
        border-top: none;
    }
    .el-popper[x-placement^=bottom] {
        margin: 0;
    }
    .el-dropdown-menu__item {
        color: #fff;
        height: 2.78vh;
        display: flex;
        align-items: center;
    }
    .el-icon--right {
        margin-left: 26px;
    }
    .el-table .warning-row1 {
        background: rgba(0, 0, 0, 0.06);
    }

    .el-table .success-row1 {
        background: rgba(0, 255, 255, 0.06);
    }
</style>
