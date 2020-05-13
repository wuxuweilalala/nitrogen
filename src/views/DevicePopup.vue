<template>
  <el-dialog :title="deviceData.title" :visible.sync="dialogTableVisible">
    <el-table :data="gridData">
        <el-table-column
                v-for="(item,index) in deviceData.tableHeader"
                :key="index"
                :property="deviceData.key[index]"
                :label="item"
                width="150"
        ></el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  name: "DevicePopup",
  data() {
    return {
      dialogTableVisible: false,
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
  }
};
</script>

<style lang="scss" scoped></style>
