<template>
  <div class="container">
    <div class="return" @click="$router.push('/')">
      <Icon name="return"></Icon>
      <span>返回</span>
    </div>
    <div class="tableWrapper">
      <div class="header">
        <div class="leftSide">
          <span class="name">报警列表</span>
          <div class="bottomSide">
            <span class="englishName">Alarm list</span>
            <div class="first"></div>
            <div class="end"></div>
          </div>
        </div>
        <div class="Icons">
          <el-date-picker
                  v-model="value1"
                  type="daterange"
                  range-separator=""
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
          </el-date-picker>
          <Icon name="refresh"></Icon>
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
      value1: "",
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
        }
      ],
      lineData: {
        title: "线体实时监控",
        tableHeader: ["设备编号", "设备位置", "状态", "报警内容", "报警时间"],
        key: ["id", "name", "ppm"],
        selectKey: "id",
        data: [
          {
            id: "001",
            name: "001",
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
      warnData: {
        title: "警报列表",
        totalPages: 5,
        number: 20,
        currentPage: 4,
        tableHeader: ["设备id", "设备位置", "设备状态"],
        key: ["id", "position", "status"],
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
                `报警列表.xlsx`
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
        margin-left: 1.35vw;
      }
    }
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
  }
  .tabelRow1 {
    color: #fff;
    background-color: rgba(0, 255, 255, 0.06);
  }
}

::v-deep.el-input {
  cursor: pointer;
  width: 9.32vw;
  .el-input__inner {
    background-color: #005d5d;
    padding: 0 10px !important;
    height: 2.78vh;
  }
  .el-input__prefix {
    display: none;
  }
}
</style>
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
<style lang="scss">
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
</style>