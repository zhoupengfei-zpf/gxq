<template>
  <Layout>
    <Content>
      <!--<Breadcrumb>
        <BreadcrumbItem>首页</BreadcrumbItem>
      </Breadcrumb>-->
      <Card>
        <chart-card title="数据概览">
          <div class="card-container">
            <div class="card-list">
              <Card>
                <div class="card-content">
                  <p style="line-height: 42px;">总运维人员：{{operationPerson || 0}}人</p>
                </div>
              </Card>
            </div>
            <div class="card-list">
              <Card>
                <div class="card-content">
                  <p>总故障数：{{faultCount}}个</p>
                  <p>本月故障数：{{monthFaultCount}}个</p>
                </div>
              </Card>
            </div>
            <div class="card-list">
              <Card>
                <div class="card-content">
                  <p>总运维服务次数：{{operationServiceCount}}次</p>
                  <p>本月运维服务次数：{{monthOperationServiceCount}}次</p>
                </div>
              </Card>
            </div>
            <div class="card-list">
              <Card>
                <div class="card-content">
                  <p>总培训次数：{{trainCount}}次</p>
                  <p>本月培训次数：{{monthTrainCount}}次</p>
                </div>
              </Card>
            </div>
          </div>
        </chart-card>
        <Row type="flex" justify="space-between">
          <Col style="width: 49%">
            <chart-card title="运维服务数量分析">
              <lineChart ref="serviceNum">
                <div id="serviceNum" style="height: 400px;"></div>
              </lineChart>
            </chart-card>
          </Col>
          <Col style="width: 49%">
            <chart-card title="故障处理分析">
              <barChart ref="bugDeal">
                <div id="bugDeal" style="height: 400px;"></div>
              </barChart>
            </chart-card>
          </Col>
        </Row>
        <chart-card title="故障分析">
          <Table
            border
            :columns="tableList.columns"
            :data="tableList.data"></Table>
        </chart-card>
      </Card>
      <msgModal />
    </Content>
  </Layout>
</template>

<script>
import api from '@/api/axiosApi'
import operationApiList from '@/api/operationApiList'
// echart图外层容器，包括卡片样式
import chartCard from '@/view/home/chartCard.vue'
import lineChart from '@/view/home/lineChart.vue'
import barChart from '@/view/home/barChart.vue'
import msgModal from './home/msgModal.vue'

export default {
  components:{
    chartCard,
    lineChart,
    barChart,
    msgModal
  },
  data() {
    return {
      operationPerson: 0,
      faultCount: 0,
      monthFaultCount: 0,
      operationServiceCount: 0,
      monthOperationServiceCount: 0,
      trainCount: 0,
      monthTrainCount: 0,
      tableList: {
        columns: [{
          title: '应用和服务',
          key: 'systemName',
          align: 'center'
        }, {
          title: '故障数',
          key: 'count',
          align: 'center'
        }, {
          title: '未处理故障数',
          key: 'wclCount',
          align: 'center'
        }],
        data: []
      }
    }
  },
  mounted () {
    this.getHomePageCount()
  },
  methods: {
    getHomePageCount() {
      const vm = this
      api(operationApiList.getHomePageCount)
      .then(res => {
        if (res.data.errcode === 0) {
          const data = res.data.data
          vm.operationPerson = data.operationPerson
          vm.faultCount = data.faultCount
          vm.monthFaultCount = data.monthFaultCount
          vm.operationServiceCount = data.operationServiceCount
          vm.monthOperationServiceCount = data.monthOperationServiceCount
          vm.trainCount = data.trainCount
          vm.monthTrainCount = data.monthTrainCount
          vm.tableList.data = data.dtoList
          vm.drawServiceNum(data.yearServiceMap)
          vm.drawBugDeal(data.yearFaultMap)
        } else {
          vm.$Message.info(res.data.errmsg)
        }
      }, err => {console.log(err)})
    },
    // 绘制运维服务数量分析图表
    drawServiceNum (yearServiceMap) {
      const vm = this
      const opts = {
        el: 'serviceNum',
        xAxis: {
          name: '月份',
          data: yearServiceMap.monthList
        },
        yAxis: {
          name: '次数'
        },
        series: [{
          name: '服务次数',
          type:'line',
          data: yearServiceMap.data
        }]
      }
      vm.$refs.serviceNum.refresh(opts)
    },
    // 绘制故障处理分析图表
    drawBugDeal (yearFaultMap) {
      const vm = this
      const opts = {
        el: 'bugDeal',
        legend: {
          left: 'center',
          bottom: 10,
          textStyle: {
            fontSize: '16px'
          },
          data: ['故障数', '已处理故障数']
        },
        xAxis: {
          name: '月份',
          data: yearFaultMap.monthList
        },
        yAxis: {
          name: '个数'
        },
        series: [{
          name: '故障数',
          data: yearFaultMap.data,
          barWidth: '40%'
        }, {
          name: '已处理故障数',
          data: yearFaultMap.ycldata,
          barWidth: '40%'
        }]
      }
      vm.$refs.bugDeal.refresh(opts)
    }
  }
}
</script>

<style lang="less" scoped>
.card-container{
  margin-top: 10px;
  &:after{
    content: '';
    clear: both;
    display: block;
  }
  .card-list{
    float: left;
    width: 22%;
    margin-left: 4%;
    text-align: center;
    &:nth-child(1){
      margin-left: 0;
    }
    .card-content{
      display: inline-block;
      text-align: left;
      font-size: 14px;
      height: 42px;
    }
  }
}
</style>
<style lang="less">
.ivu-message{
  z-index: 9999;
}
</style>
