<template>
		<Layout>
			<Content>
				<Breadcrumb>
					<BreadcrumbItem>故障管理</BreadcrumbItem>
					<BreadcrumbItem>知识库</BreadcrumbItem>
				</Breadcrumb>
				<Card>
					<Form ref="formValidate" inline :label-width="90">
						<FormItem label="故障名称">
							<Input class="queryItem" type="text" v-model="seachData.faultName"> </Input>
						</FormItem>
						<FormItem label="故障级别">
							<Select v-model="seachData.faultLevel">
								<Option value="">全部</Option>
								<Option value="1">一级</Option>
								<Option value="2">二级</Option>
								<Option value="3">三级</Option>
							</Select>
						</FormItem>
						<FormItem label="创建时间">
							<DatePicker class="queryItem" :editable="false" @on-change="changeTime" format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="请选择日期"></DatePicker>
						</FormItem>
						<FormItem :label-width="20">
							<Button type="primary" @click="preSearch" v-if="authButton.includes('ops_fault_knowledgebase_query')">查询</Button>
						</FormItem>
					</Form>
					<hy-table
				        highlight-row
				        border
				        :current="pageInfo.pageNo"
				        :columns="columns"
				        :data="data"
				        :total="Number(pageInfo.total)"
				        :pageSize="Number(pageInfo.pageSize)"
				        pageType="small"
				        show-elevator
				        show-sizer
				        class="access-list"
				        ref="selection"
				        @on-page-change="pageChange" />
				</Card>
			</Content>
			<Modal v-model="modal" title="处理报告" width="60%" :mask-closable="false">
				<ledger-dealview ref="dealDetailPage" :dataView="dataView"></ledger-dealview>
				<div slot="footer">
					<Button type="text" @click="modal = false">关闭</Button>
				</div>
			</Modal>
		</Layout>
</template>

<script>
import {mapState} from 'vuex'
import api from '@/api/axiosApi'
import operationApiList from '@/api/operationApiList'
import ledgerView from './view'
import ledgerDealview from './dealView'
export default {
	data() {
		const vm = this
		return {
			modal: false,
			delectState: false,
			actId: null,
			seachData: { //查询参数对象
				"endTime": "",
				"faultHost": "",
				"faultInfo": "",
				"faultLevel": "",
				"faultName": "",
				"faultType": "",
				"isTrue": "",
				"startTime": "",
				"status": "",
				"systemId": ""
			},
			columns: [{
					type: 'index',
					title: '序号',
					width: 60,
					align: 'center'
				},
				{
					title: '故障名称',
					key: 'faultName'
				},
				{
					title: '故障类别',
					width: 180,
					key: 'faultType'
				},
				{
					title: '故障级别',
					key: 'faultLevel',
					width: 100,
					render: (h, params) => {
						return h('div', ['--', '一级', '二级', '三级', '四级'][params.row.faultLevel || 0])
					}
				},
				{
					title: '创建时间',
					width: 150,
					key: 'createTime'
				},
				{
					title: '创建者',
					key: 'createUser',
					width: 120,
					render: (h, params) => {
						return h('div', params.row.createUser || '--')
					}
				},
				{
					title: '操作',
					key: 'act',
					width: 200,
					align: 'center',
					render: (h, params) => {
						const dealReport = h('Button', {
							props: {
								type: 'primary',
								size: 'small'
							},
							style: {
								marginRight: '5px'
							},
							on: {
								click: () => {
									var ledgerId=params.row.id;
									this.faultGetById(ledgerId)
								}
							}
						}, '处理报告')
						const detail = h('Button', {
							props: {
								type: 'primary',
								size: 'small'
							},
							style: {
								marginRight: '5px'
							},
							on: {
								click: () => {
									this.$router.push({
										name: 'stopDetail',
										params: {
											id: params.row.id
										}
									})
								}
							}
						}, '详情')
						const remove = h('Button', {
							props: {
								type: 'primary',
								size: 'small'
							},
							style: {
								marginRight: '5px'
							},
							on: {
								click: () => {
									var id = params.row.id;
									this.delectRepository(id)
								}
							}
						}, '删除')
						const btns = []
						if (vm.authButton.includes('ops_fault_knowledgebase_report')) {
							btns.push(dealReport)
						}
						if (vm.authButton.includes('ops_fault_knowledgebase_detail')) {
							btns.push(detail)
						}
						if (vm.authButton.includes('ops_fault_knowledgebase_delete')) {
							btns.push(remove)
						}
						return h('div', btns)
					}
				},
			],
			data: [],
			pageInfo: { //分页参数
				pageNo: 1,
				total: 0,
				pageSize: 10
			},
			dataView:{},//详情数据
		}
	},
	computed: {
		...mapState(['authButton'])
	},
	components:{
		ledgerView,
		ledgerDealview
	},
	mounted(){
		this.pageKnowledgeBase();
	},
	methods: {
	    preSearch() {
	        this.pageInfo.pageNo = 1
	        this.pageKnowledgeBase()
	    },
	    pageChange(pageNo, pageSize) {
		    this.pageInfo.pageNo = pageNo
		    this.pageInfo.pageSize = pageSize
		    this.pageKnowledgeBase()
	    },
		seachBtn(){//查询
			this.pageKnowledgeBase();//获取故障台账列表
		},
		changeTime(val) {//选择时间
			if(val[0] && val[1]) {
				var startTime = val[0].replace(/\//g, "-");
				var endTime = val[1].replace(/\//g, "-");
				this.seachData.startTime = startTime + " 00:00:00";
				this.seachData.endTime = endTime + " 23:59:59";
			} else {
				this.seachData.startTime = "";
				this.seachData.endTime = "";
			}
		},
		pageKnowledgeBase() {//获取故障知识库列表
			const vm = this
			let searchString = (JSON.stringify(vm.seachData)).replace(/\ +/g,"")
			let searchJson = JSON.parse(searchString)
			searchJson.startTime = vm.seachData.startTime
			searchJson.endTime = vm.seachData.endTime
			var formData = {
				"data": searchJson,
				"pageNo": this.pageInfo.pageNo,
				"pageSize": this.pageInfo.pageSize
			};
			api(operationApiList.pageKnowledgeBase,formData).then(res => {
				if(res.data.errcode === 0) {
					vm.data = res.data.data.list;
					if(vm.data.length>0){
						vm.pageInfo.pageSize = res.data.data.pageSize;
						vm.pageInfo.total = res.data.data.total;
						vm.pageInfo.pageNo = res.data.data.pageNum;
					};
				}
			}, (error) => {console.log(error)})
		},
		changePageSize(num) { //切换每页条数时的回调
			this.pageInfo.pageSize = num;
			this.getWarnLedgerList();
		},
		faultGetById(ledgerId){//根据Id查询处理报告详情信息
			let _this = this;
			this.modal = true;
			api(operationApiList.faultGetById, {"id":ledgerId}).then((res) => {
				if(res.status == 200 && res.data.data) {
					_this.dataView = res.data.data;
					_this.$refs['dealDetailPage'].isJoinKnowPage();
				}
			}, (err) => {console.log(err)})
		},
		delectRepository(id) { //删除方法
			this.actId = id;
			this.$Modal.confirm({
				title: '删除确认',
				content: '确认删除吗？',
				onOk: () => {
					this.faultDelete()
				}
			})
		},
		faultDelete() { //删除知识库方法
			let deleteData={id:this.actId};
			api(operationApiList.faultDelete, deleteData).then((res) => {
				if(res.status == 200 && res.data.data) {
					this.$Message.success('删除成功！')
					this.pageKnowledgeBase()
					this.delectState = false
					this.actId = null
				}else{
					this.$Message.error(errormsg)
					this.delectState = false
					this.actId = null
				}
			}, (err) => {})
		}
	}
}
</script>

<style type="text/css" scoped>
.wAuto{
	width: 100%;
}
.queryTime{
	width: 180px;
}
.flow{
	margin-top: 20px ;
}
</style>
