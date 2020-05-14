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
                    <Icon name="downLoad"></Icon>
                </div>

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
        </div>
    </div>
</template>

<script>
    import Icon from "../components/Icon";
export default {
  name: "DevicePopup",
    components:{
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
        }
      ],
        lineData: {
            title: "线体实时监控",
            tableHeader: ["设备编号", "设备位置", "状态","报警内容",'报警时间'],
            key: ["id", "name", "ppm"],
            selectKey: "id",
            data: [
                {
                    id: '001',
                    name: "001",
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
    methods:{
        tableRowClassName({ row, rowIndex }) {
            console.log(row);
            if (rowIndex % 2 === 1) {
                return "warning-row1";
            } else if (rowIndex !== 1) {
                return "success-row1";
            }
            return "";
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
            background: url('~@/assets/imgs/return.png') no-repeat;
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
</style>
