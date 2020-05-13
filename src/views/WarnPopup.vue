<template>
  <el-dialog :title="warnData.title" :visible.sync="dialogTableVisible">
    <el-table :data="gridData">
      <el-table-column
        v-for="(item, index) in warnData.tableHeader"
        :key="index"
        :property="warnData.key[index]"
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
  }
};
</script>

<style lang="scss" scoped></style>
