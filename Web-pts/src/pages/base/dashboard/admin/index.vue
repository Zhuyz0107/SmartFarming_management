<!--
 * @Description:管理员首页
 * @Author: Ronda
 * @Date: 2022-01-24 12:07:40
 * @LastEditors: Ronda
 * @LastEditTime: 2022-04-14 17:02:31
-->
<template>
  <div>
    <!-- 管理员首页 -->
    <div class="counts">
      <div v-for="item in countData" :key="item.img" class="count">
        <img :src="item.img" alt="">
        <div class="count-title">
          <div>{{ item.value }}</div>
          <div>{{ item.name }}数量</div>
        </div>
      </div>
    </div>
    <div class="charts">
      <div id="left-chart" class="left-chart" />
      <div class="right-chart">
        <div id="top-chart" class="top-chart" />
        <div id="bottom-chart" class="bottom-chart" />
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { findCount, findCountDisease, findCountSales, findIndexCount } from '@/api/base/dashboard'
export default {
  data() {
    return {
      // 展示栏舍数量，栏圈数量，动物数量，冷库数量，员工数量
      countData: [],
      // 根据年获取1~12月的销售数量
      countSalesData: [],
      // 统计病症出现情况
      countDiseaseData: {},
      // 获取例如0-30 猪的数量，30-50斤的猪数量，50斤以上的数量
      indexCountData: []
    }
  },
  computed: {},
  created() {

  },
  async mounted() {
    const res1 = await findCount()
    this.countData = [
      {
        img: require('../../../../assets/dashboard/产出.png'),
        value: res1.data.value[0],
        name: res1.data.name[0]
      },
      {
        img: require('../../../../assets/dashboard/数据盘.png'),
        value: res1.data.value[1],
        name: res1.data.name[1]
      },
      {
        img: require('../../../../assets/dashboard/文件.png'),
        value: res1.data.value[2],
        name: res1.data.name[2]
      },
      {
        img: require('../../../../assets/dashboard/趋势.png'),
        value: res1.data.value[3],
        name: res1.data.name[3]
      },
      {
        img: require('../../../../assets/dashboard/叶子.png'),
        value: res1.data.value[4],
        name: res1.data.name[4]
      }
    ]

      const res2 = await findCountSales(new Date().getFullYear())
      this.countSalesData = res2.data
      this.drawLeft()

    const res3 = await findCountDisease()
    this.countDiseaseData = []
    for (const key in res3.data) {
      this.countDiseaseData.push({ name: key, value: res3.data[key] })
    }
    this.drawTop()

    const res4 = await findIndexCount()
    this.indexCountData = []
    for (const key in res4.data) {
      this.indexCountData.push({ name: key, value: res4.data[key] })
    }
    this.drawBottom()



  },
  methods: {
    drawLeft() {
      const myChart = echarts.init(document.getElementById('left-chart'))
      const option = {
        color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
        title: {
          text: '本年度12个月份销售统计',
          left: 'center'
        },
        xAxis: {
          type: 'category',
          data: this.countSalesData.name
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function (data) {
            return data[0].marker + data[0].axisValue + '<br/>' + '&nbsp;&nbsp;&nbsp;&nbsp;已销售' + data[0].value + '头动物'
          }
        },
        yAxis: {
          minInterval: 1,
          type: 'value'
        },
        series: [
          {
            data: this.countSalesData.value,
            type: 'line',
            smooth: true,
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      }
      myChart.setOption(option)
    },
    drawTop() {
      const myChart = echarts.init(document.getElementById('top-chart'))
      const option = {
        color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
        title: {
          text: '病症统计',
          left: 'center'
        },
        legend: {
          orient: 'vertical',
          left: 'right'
        },
        tooltip: {
          trigger: 'item',
          formatter: function (data) {
            return data.marker + data.name + '病症<br/>' + '&nbsp;&nbsp;&nbsp;&nbsp;动物数量：' + data.value + '头'
          }
        },
        series: [
          {
            name: '统计病症出现情况',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.countDiseaseData
          }
        ]
      }
      myChart.setOption(option)
    },
    drawBottom() {
      const myChart = echarts.init(document.getElementById('bottom-chart'))
      const option = {
        color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'].reverse(),
        title: {
          text: '体重统计',
          left: 'center'
        },
        legend: {
          orient: 'vertical',
          left: 'right'
        },
        tooltip: {
          trigger: 'item',
          formatter: function (data) {
            return '体重在<br/>' + data.marker + '(单位：KG)<br/>' + data.name + '&nbsp;&nbsp;&nbsp;&nbsp;动物数量：' + data.value + '头'
          }
        },
        series: [
          {

            name: '统计动物体重情况',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.indexCountData
          }
        ]
      }
      myChart.setOption(option)
    }

  }
}
</script>
<style lang="scss" scoped>
.counts {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;

  .count {
    &:first-child {
      background-color: #69CACC;
    }

    &:nth-child(2) {
      background-color: #FF6C5B;
    }

    &:nth-child(3) {
      background-color: #F9D435;
    }

    &:nth-child(4) {
      background-color: #52C8F5;
    }

    background:pink;
    border-radius: 20px;
    padding:10px;
    padding-right: 18px;

    .count-title {
      width: 100px;
      text-align: center;
      color: #fff;
      position: relative;
      top: -34px;
      font-weight: bold;
    }

    .count-title>*:first-child {
      font-size: 30px;
    }

    .count-title>*:last-child {
      margin-top: 5px;
    }

    &>* {
      display: inline-block;
    }

    img {
      width: 80px;
      height: 100px;
    }

  }
}

.charts {
  display: flex;
  height: 500px;
  margin-top: 10px;

  .left-chart {
    width: 60%;
  }

  .right-chart {
    width: 40%;

    .top-chart {
      height: 50%;
    }

    .bottom-chart {
      height: 50%;
    }
  }
}
</style>
