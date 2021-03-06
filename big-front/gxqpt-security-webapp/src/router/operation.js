/* 运维管理平台 */

// import Vue from 'vue'
// import Router from 'vue-router'
import store from '@/store'
// // 运维文档管理
// import operationPplMgr from '@/view/operation/operationPplMgr'// 运维人员管理
// import docQuery from '@/view/operation/docOperation/docQuery'// 运维文档管理-运维文档查询-文档管理
// import docClassify from '@/view/operation/docOperation/docClassify'// 运维文档管理-文档分类管理
// // 故障管理
// import ledger from '@/view/operation/stoppage/ledger'// 故障管理-故障台账
// import myTask from '@/view/operation/stoppage/myTask'// 故障管理-我的任务
// import monitor from '@/view/operation/stoppage/monitor'// 故障管理-故障监控
// import repository from '@/view/operation/stoppage/repository'// 故障管理-知识库
// import view from '@/view/operation/stoppage/view' // 故障管理-详情
// // 接入管理
// import accessList from '@/view/operation/access/accessList'// 接入管理-我的应用
// import accessInfo from '@/view/operation/access/accessInfo'// 接入管理-部署信息
// import accessUpgrade from '@/view/operation/access/accessUpgrade'// 接入管理-应用升级
// import accessAnalyze from '@/view/operation/access/accessAnalyze'// 接入管理-应用分析
// // 运维服务管理
// import serviceApply from '@/view/operation/service/serviceApply'// 运维服务管理-服务申请
// import serviceAudit from '@/view/operation/service/serviceAudit'// 运维服务管理-服务审核
// import serviceDeal from '@/view/operation/service/serviceDeal'// 运维服务管理-服务处理
// import serviceListMgr from '@/view/operation/service/serviceListMgr'// 运维服务管理-服务目录管理

// import serviceView from '@/view/operation/service/serviceView'// 运维服务管理-服务详情页面
// // 运维分析
// import analyzeRate from '@/view/operation/analyze/analyzeRate'// 运维分析-运维评价
// // 课程管理
// import trainCourseList from '@/view/operation/trainMgr/trainCourseList'// 培训管理-培训课程目录
// import trainList from '@/view/operation/trainMgr/trainList'// 培训管理-培训列表
// import trainAudit from '@/view/operation/trainMgr/trainAudit'// 培训管理-培训审核
// import trainDeal from '@/view/operation/trainMgr/trainDeal'// 培训管理-培训处理
// import trainCourseMgr from '@/view/operation/trainMgr/trainCourseMgr'// 培训管理-培训课程管理
// import trainDetail from '@/view/operation/trainMgr/trainDetail'// 培训管理-培训详情
// // 咨询管理
// import referApply from '@/view/operation/refer/referApply'// 咨询管理-咨询申请
// import referCheck from '@/view/operation/refer/referCheck'// 咨询管理-咨询审核
// import referHandle from '@/view/operation/refer/referHandle'// 咨询管理-咨询处理
// import referDetail from '@/view/operation/refer/referDetail'// 咨询管理-咨询详情

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { // 首页
      path: '/home',
      name: 'home',
      component: resolve => require(['@/view/operation/home'], resolve)
    },
    { // 运维人员管理-人员管理
      path: '/operationPplMgr',
      name: 'operationPplMgr',
      component: resolve => require(['@/view/operation/operationPplMgr'], resolve)
    },
    { // 运维文档管理-运维文档查询 以及 运维文档管理,manage为1时是管理
      path: '/docQuery/:manage',
      name: 'docQuery',
      component: resolve => require(['@/view/operation/docOperation/docQuery'], resolve)
    },
    { // 运维文档管理-文档分类管理
      path: '/docClassify',
      name: 'docClassify',
      component: resolve => require(['@/view/operation/docOperation/docClassify'], resolve)
    },
    { // 接入管理-我的应用
      path: '/accessList',
      name: 'accessList',
      component: resolve => require(['@/view/operation/access/accessList'], resolve)
    },
    {// 运维服务管理-服务申请
      path: '/serviceApply',
      name: 'serviceApply',
      component: resolve => require(['@/view/operation/service/serviceApply'], resolve)
    },
    {// 运维服务管理-服务审核
      path: '/serviceAudit',
      name: 'serviceAudit',
      component: resolve => require(['@/view/operation/service/serviceAudit'], resolve)
    },
    {// 运维服务管理-服务处理
      path: '/serviceDeal',
      name: 'serviceDeal',
      component: resolve => require(['@/view/operation/service/serviceDeal'], resolve)
    },
    {// 运维服务管理-服务目录管理
      path: '/serviceListMgr',
      name: 'serviceListMgr',
      component: resolve => require(['@/view/operation/service/serviceListMgr'], resolve)
    },
    /* {// 运维服务管理-服务详情页面
      path: '/serviceDetail/:id',
      name: 'serviceDetail',
      component: resolve => require(['@/view/operation/operationPplMgr'], resolve),: serviceDetai
    }, */
    {// 运维服务管理-服务详情页面
      path: '/serviceView/:id',
      name: 'serviceView',
      meta: {
        hasParentName: true
      },
      component: resolve => require(['@/view/operation/service/serviceView'], resolve)
    },
    { // 故障管理-故障台账
      path: '/ledger',
      name: 'ledger',
      component: resolve => require(['@/view/operation/stoppage/ledger'], resolve)
    },
    { // 故障管理-我的任务
      path: '/myTask',
      name: 'myTask',
      component: resolve => require(['@/view/operation/stoppage/myTask'], resolve)
    },
    { // 故障管理-故障监控
      path: '/monitor',
      name: 'monitor',
      component: resolve => require(['@/view/operation/stoppage/monitor'], resolve)
    },
    { // 故障管理-知识库
      path: '/repository',
      name: 'repository',
      component: resolve => require(['@/view/operation/stoppage/repository'], resolve)
    },
    { // 故障管理-详情
      path: '/stopDetail/:id',
      name: 'stopDetail',
      meta: {
        hasParentName: true
      },
      component: resolve => require(['@/view/operation/stoppage/view'], resolve)
    },
    {// 接入管理-部署信息
      path: '/accessInfo',
      name: 'accessInfo',
      meta: {
        hasParentName: true
      },
      component: resolve => require(['@/view/operation/access/accessInfo'], resolve)
    },
    {// 接入管理-应用升级
      path: '/accessUpgrade',
      name: 'accessUpgrade',
      meta: {
        hasParentName: true
      },
      component: resolve => require(['@/view/operation/access/accessUpgrade'], resolve)
    },
    {// 接入管理-应用分析
      path: '/accessAnalyze',
      name: 'accessAnalyze',
      meta: {
        hasParentName: true
      },
      component: resolve => require(['@/view/operation/access/accessAnalyze'], resolve)
    },
    {// 运维分析-运维评价
      path: '/analyzeRate',
      name: 'analyzeRate',
      component: resolve => require(['@/view/operation/analyze/analyzeRate'], resolve)
    },
    {// 运维分析-共性模块监控
      path: '/analyzeModule',
      name: 'analyzeModule',
      component: resolve => require(['@/view/operation/analyze/analyzeModule'], resolve)
    },
    {// 运维分析-共性服务监控
      path: '/analyzeService',
      name: 'analyzeService',
      component: resolve => require(['@/view/operation/analyze/analyzeService'], resolve)
    },
    {// 运维分析-共性应用监控
      path: '/analyzeApp',
      name: 'analyzeApp',
      component: resolve => require(['@/view/operation/analyze/analyzeApp'], resolve)
    },
    {// 运维分析-网站监控
      path: '/analyzeWebsite',
      name: 'analyzeWebsite',
      component: resolve => require(['@/view/operation/analyze/analyzeWebsite'], resolve)
    },
    {// 运维分析-应用流量监控
      path: '/analyzeAppflow',
      name: 'analyzeAppflow',
      component: resolve => require(['@/view/operation/analyze/analyzeAppflow'], resolve)
    },
    {// 运维分析-平台流量监控
      path: '/analyzePlatformFlow',
      name: 'analyzePlatformFlow',
      component: resolve => require(['@/view/operation/analyze/analyzePlatformFlow'], resolve)
    },
    {// 告警管理-告警列表
      path: '/alarmList',
      name: 'alarmList',
      component: resolve => require(['@/view/operation/alarm/list'], resolve)
    },
    {// 告警管理-告警规则设置
      path: '/alarmRule',
      name: 'alarmRule',
      component: resolve => require(['@/view/operation/alarm/rule'], resolve)
    },
    {// 咨询管理-咨询申请
      path: '/referApply',
      name: 'referApply',
      component: resolve => require(['@/view/operation/refer/referApply'], resolve)
    },
    {// 咨询管理-咨询审核
      path: '/referCheck',
      name: 'referCheck',
      component: resolve => require(['@/view/operation/refer/referCheck'], resolve)
    },
    {// 咨询管理-咨询处理
      path: '/referHandle',
      name: 'referHandle',
      component: resolve => require(['@/view/operation/refer/referHandle'], resolve)
    },
    {// 咨询管理-咨询详情
      path: '/referDetail/:id',
      name: 'referDetail',
      meta: {
        hasParentName: true
      },
      component: resolve => require(['@/view/operation/refer/referDetail'], resolve)
    },
    {// 培训管理-培训课程目录
      path: '/trainCourseList',
      name: 'trainCourseList',
      component: resolve => require(['@/view/operation/trainMgr/trainCourseList'], resolve)
    },
    {// 培训管理-培训列表
      path: '/trainList',
      name: 'trainList',
      component: resolve => require(['@/view/operation/trainMgr/trainList'], resolve)
    },
    {// 培训管理-培训审核
      path: '/trainAudit',
      name: 'trainAudit',
      component: resolve => require(['@/view/operation/trainMgr/trainAudit'], resolve)
    },
    {// 培训管理-培训处理
      path: '/trainDeal',
      name: 'trainDeal',
      component: resolve => require(['@/view/operation/trainMgr/trainDeal'], resolve)
    },
    {// 培训管理-培训课程管理
      path: '/trainCourseMgr',
      name: 'trainCourseMgr',
      component: resolve => require(['@/view/operation/trainMgr/trainCourseMgr'], resolve)
    },
    {// 培训管理-培训详情页
      path: '/trainDetail/:id',
      name: 'trainDetail',
      meta: {
        hasParentName: true
      },
      component: resolve => require(['@/view/operation/trainMgr/trainDetail'], resolve)
    },
    {// 日志管理
      path: '/logs/operate',
      name: 'logsOperate',
      component: resolve => require(['@/view/operation/logs/list'], resolve)
    }
  ]
})

router.beforeEach((to, from, next) => {
  // if (to.matched.length === 0) {
  //   router.replace('/operationPplMgr')
  //   next(false)
  // }
  hy_auth_login('operation') // 登陆验证
  store.commit('GETUSERINFO') // 设置用户信息
  next()
})

export default router
