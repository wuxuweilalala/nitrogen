<template>
  <div class="container">
    <div class="return" @click="$router.push('/')">
      <Icon name="return"></Icon>
      <span>返回</span>
    </div>
    <div class="tableWrapper">
      <div class="header">
        <div class="leftSide">
          <span class="name">设备列表</span>
          <div class="bottomSide">
            <span class="englishName">Device List</span>
            <div class="first"></div>
            <div class="end"></div>
          </div>
        </div>
        <div class="icons">
            <el-dropdown @command="handleCommand" trigger="click">
                <el-button type="primary">
                    正常状态<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="1">正常</el-dropdown-item>
                    <el-dropdown-item command="2">异常</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
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
          <td class="name">{{ item.name }}</td>
          <td>{{ item.speed }}</td>
          <td>{{ item.ppm }}</td>
          <td>{{ item.speed }}</td>
          <td class="control">{{ item.control }}</td>
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
      formLabelWidth: "120px",
      gridData: [
        {
          id: "001",
          position: "线体一",
          status: "正常"
        },
        {
          id: "001",
          position: "线体一",
          status: "正常"
        },
        {
          id: "001",
          position: "线体一",
          status: "正常"
        },
        {
          id: "001",
          position: "线体一",
          status: "正常"
        }
      ],
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
      deviceData: {
        title: "设备列表",
        totalPages: 5,
        number: 20,
        currentPage: 4,
        tableHeader: ["设备id", "设备位置", "设备状态"],
        key: ["id", "position", "status"],
        seachKey: "status",
        seachKeyVal: ["正常", "异常"],
        data: [
          {
            id: "001",
            position: "线体一",
            status: "正常"
          },
          {
            id: "001",
            position: "线体一",
            status: "正常"
          }
        ]
      }
    };
  },
  methods: {
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

<style>
.el-table .warning-row1 {
  background: rgba(0, 0, 0, 0.06);
}

.el-table .success-row1 {
  background: rgba(0, 255, 255, 0.06);
}
</style>
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
            ::v-deep.el-dropdown {
                margin-right: 1.09vw;
                .el-button--primary {
                    border-color:#005d5d;
                    background-color:unset;
                    width: 9.32vw;
                    height: 1.56vw;
                    padding: 0;
                }
            }
        }
    }
  }
}
</style>
