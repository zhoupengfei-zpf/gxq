<template>
	<Layout>
		<Content>
			<Breadcrumb>
				<BreadcrumbItem>安全保障平台</BreadcrumbItem>
				<BreadcrumbItem>备份设置</BreadcrumbItem>
			</Breadcrumb>
			<Card>
				<Form ref="formData" :modal="formData" :rules="ruleValidate" inline :label-width="120">
					<FormItem label="数据库类型" :label-width="72">
						<Select v-model="formData.dbType" style="width: 100px;">
							<Option value="-1">全部</Option>
							<Option v-for="(value,key) of dataDictionary.dbTypes" :value="key" :key="key">{{value}}</Option>
						</Select>
					</FormItem>
					<FormItem label="备份系统名称">
						<Select v-model="formData.applicationName" style="width: 150px;">
							<Option value="-1">全部</Option>
							<Option v-for="(name,index) in visibleForSelf" :value="name.name" :key="index">{{name.name}}</Option>
						</Select>
					</FormItem>
					<FormItem :label-width="30">
						<Button type="primary" @click="search" v-if="checkButton('security_backup_monitor_settings_search')">查询</Button>
					</FormItem>
					<Button type="primary" @click="addBackup" v-if="checkButton('security_backup_monitor_settings_add')">新增</Button>
				</Form>
				<hy-table border ref="table" :data="data" :columns="columns" :current="pageOption.current" :total="pageOption.total" :page-size="pageOption.pageSize" @on-change="pageChange" @on-page-size-change="changePageSize" show-sizer show-elevator/>
			</Card>
		</Content>
		<Modal @on-visible-change="closeCallBack" v-model="modal" :title="modelTitle" width="60%" :mask-closable="false">
			<Form ref="addBackupForm" :model="addBackupForm" :rules="ruleValidate" :label-width="100">
				<Row>
					<Col span="11">
					<FormItem label="备份名称" prop="name">
						<Input v-model="addBackupForm.name" :disabled="modalType=='edit'" :maxlength="20"></Input>
					</FormItem>
					</Col>
					<Col span="11" offset="2">
					<FormItem label="备份系统名称" prop="appId">
						<Select v-model="addBackupForm.appId" :label-in-value="true" :disabled="modalType=='edit'"  @on-query-change="appChange" style="width: 150px;">
							<Option v-for="(item,index) in visibleForSelf" :value="item.appId" :key="index" :label="item.name"></Option>
						</Select>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span="11">
					<FormItem label="服务器地址" prop="serverIp">
						<Input v-model="addBackupForm.serverIp" :maxlength="20"></Input>
					</FormItem>
					</Col>
					<Col span="11" offset="2">
					<FormItem label="服务器账号" prop="serverAccount">
						<Input v-model="addBackupForm.serverAccount" :maxlength="30"></Input>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span="11">
					<FormItem label="数据库类型" prop="dbType">
						<Select v-model="addBackupForm.dbType" style="width: 150px;">
							<Option v-for="(value,key) of dataDictionary.dbTypes" :value="key" :key="key">{{value}}</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="11" offset="2">
					<FormItem label="服务器密码" prop="serverPasswd">
						<Input type="password" v-model="addBackupForm.serverPasswd" :maxlength="30"></Input>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span="11">
					<FormItem label="备份路径" prop="path">
						<Input v-model="addBackupForm.path"></Input>
					</FormItem>
					</Col>
					<Col span="13" style="padding-left: 20px;color: #999;"> 备份路径是系统日期类型用YYYYMMDD表示。</Col>
				</Row>
				<Row>
					<Col span="11">
					<FormItem label="备份文件后缀" prop="fileExt">
						<Select v-model="addBackupForm.fileExt">
							<Option value=".rar">.rar</Option>
							<Option value=".sql">.sql</Option>
						</Select>
					</FormItem>
					</Col>
					<Col span="11" offset="2">
					<FormItem label="备份频率" prop="backupFrequency">
						<Select v-model="addBackupForm.backupFrequency">
							<Option value="每天">每天</Option>
							<Option value="每月">每月</Option>
						</Select>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span="11">
					<FormItem label="开始日期" prop="startTime">
						<date-picker type="date" :value="addBackupForm.startTime" @on-change="getFormateDate" style="width: 100%;"></date-picker>
					</FormItem>
					</Col>
				</Row>
				<FormItem label="检查标志" prop="checkMark">
					<Col span="2">
					<i-switch v-model="addBackupForm.checkMark">
						<span slot="open">开</span>
						<span slot="close">关</span>
					</i-switch>
					</Col>
					<Col span="22" style="padding-left: 20px;color: #999;"> 开启该标志，系统会自动检查是否备份，如果没有备份则再预警模块提醒</Col>
				</FormItem>
				<FormItem label="备注" prop="remarks">
					<Row>
						<Col span="24">
						<Input v-model="addBackupForm.remarks" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="请输入备注内容" :maxlength="255"></Input>
						</Col>
					</Row>
				</FormItem>
			</Form>
			<div slot="footer">
				<Button type="text" @click="closeModal">取消</Button>
				<Button type="primary" @click="handleSubmit('addBackupForm')">确认</Button>
			</div>
		</Modal>
	</Layout>
</template>
<script>
	import api from '@/api/axiosApi'
	import apiList from '@/api/securityApiList'
	import { mapState } from 'vuex'
	export default {
		data() {
		  const vm = this
			const slgLineStyle =  {
      	maxHeight: '36px',
      	overflow: 'hidden',
      	margin: '10px 0',
      	textOverflow: 'ellipsis',
      	whiteSpace: 'nowrap'
	    }
			return {
				modal: false, //莫态框的显隐标识
				modalType: 'add', //莫态框类型，新增：add,编辑：edit
				selectedId: '', //点击编辑时对应的id
				modelTitle: '',
				pageOption: { //分页配置
					current: 1,
					total: 0,
					pageSize: 10
				},
				systemNames: [], //系统名称列表
				formData: { //查询表单
					dbType: '-1',
					applicationName: '-1'
				},
				ruleValidate: { //表单验证
					name: [{
						required: true,
						message: '备份名称不能为空',
						trigger: 'blur'
					}],
					appId: [{
						required: true,
						message: '备份系统名称不能为空',
						trigger: 'change'
					}],
					backupFrequency: [{
						required: true,
						message: '备份频率不能为空',
						trigger: 'blur'
					}],
					startTime: [{
						required: true,
						message: '开始日期不能为空',
						trigger: 'blur'
					}],
					dbType: [{
						required: true,
						message: '数据库类型不能为空',
						trigger: 'change'
					}],
					path: [{
						required: true,
						message: '备份路径不能为空',
						trigger: 'blur'
					}/* , {
						type: 'url',
						message: '路径错误，请输入正确路径（如：http://www.baidu.com)',
						trigger: 'blur'
					} */],
					serverIp: [{
            trigger: 'blur',
            validator: (rule, value, cb) => {
              if (!vm.addBackupForm.serverIp) {
                cb()
                return
              } else {
                let reg=/^(?=(\b|\D))(((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))(?=(\b|\D))$/
                if (!reg.test(value)) {
                  cb(new Error('请输入正确的IP地址'))
                  return
                }
                cb()
              }
            }
          }],
					fileExt: [{
						required: true,
						message: '备份文件后缀不能为空',
						trigger: 'change'
					}],
				},
				addBackupForm: { //新增表单
					name:'',
					appId:'',
					serverIp:'',
					backupFrequency: '每天',
					dbType: '1',
					fileExt: '.rar',
					checkMark: true,
					startTime: null,
					remarks:''
				},
				columns: [{ //备份表格的表头
						title: '序号',
						type: 'index',
						width: 60,
						align: 'center'
					},
					{
						title: '备份名称',
						key: 'name'
					},
					{
						title: '备份系统名称',
						key: 'applicationName'
					},
					{
						title: '备份文件后缀',
						key: 'fileExt'
					},
					{
						title: '备份路径',
						key: 'path',
				         render: (h, params) => {
				            const html = params.row.path || '--'
				            return h('div', {
				                style: {...slgLineStyle},
				                attrs: {
				                  title: html
				                }
				            },html)
				         }
					},
					{
						title: '备份频率',
						key: 'backupFrequency'
					},
					{
						title: '开始时间',
						key: 'startTime'
					},
					{
						title: '检查标志',
						key: 'checkMark',
						width: 100,
						align: 'center',
						render(h, params) {
							let text;
							params.row.checkMark ? (text = '是') : (text = '否');
							return h('div', [
								h('span', {

								}, text)
							])
						}
					},
					{
						title: '操作',
						key: 'act',
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										type: 'primary',
										size: 'small'
									},
									style: {
										marginRight: '5px',
										display:this.checkButton('security_backup_monitor_settings_edit')?'inline-block':'none'
									},
									on: {
										click: () => {
											this.selectedId = params.row.id;
											this.modalType = 'edit';
											this.modelTitle = '修改备份'
											this.modal = true;
										}
									}
								}, '编辑')
							]);
						}
					},
				],
				data: [] //备份表格的数据
			}
		},
		computed: {
			...mapState([
				'dataDictionary',
				'authButton',
				'visibleForSelf'
			])
		},
		methods: {
			init() {
				this.getBackup();
      },
      search() {
				this.pageOption.current=1;
				this.getBackup();
      },
			getBackup() {
				let params = {
					data: this.formData,
					pageNo: this.pageOption.current,
					pageSize: this.pageOption.pageSize
				}
				api(apiList.getBackup, params).then((res) => {
					console.log(res);
					if(res.status == 200) {
            this.data = res.data.data.list;
            this.pageOption.total = res.data.data.total
					} else {
						this.$Message.error('获取备份设置数据失败');
					}
				}, (err) => {
					//do something...
				});
			},
			getBackupById() {
				var _this = this;
				api(apiList.viewBackup, {
					id: this.selectedId
				}).then((res) => {
					if(res.status == 200) {
						res.data.data.dbType = res.data.data.dbType.toString();
						this.addBackupForm = res.data.data;
					}
				}, (err) => {
					//do something...
				})
			},
			appChange(data){
				this.visibleForSelf.forEach(item => {
					if(item.appId == this.addBackupForm.appId){
						this.addBackupForm.applicationName = item.name;
					}
				});
			},
			closeCallBack(status) {
				if(status) {
					if(this.modalType == 'edit') {
						this.getBackupById();
					}
				} else {
					this.$refs['addBackupForm'].resetFields();
					this.addBackupForm.startTime = '';
				}
			},
			closeModal() {
				this.modal = false;
			},
			addBackup() {
				this.modalType = 'add';
				this.modelTitle = '新增备份'
				this.modal = true;
			},
			save() {
				let urlObj;
				if(this.modalType == 'add') {
					urlObj = apiList.createBackup
				} else {
					urlObj = apiList.editBackup
					this.addBackupForm.id = this.selectedId;
				}
				api(urlObj, this.addBackupForm).then((res) => {
					console.log(res)
					if(res.status == 200) {
						this.modal = false;
						this.getBackup();
						this.$Message.success('保存成功！');
					} else {
						this.$Message.error('保存失败！');
					}
				}, (err) => {
					//do something...
				})
			},
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						if(this.modalType == 'edit') {
							this.save();
						} else {
							api(apiList.validBackupName, {
								name: this.addBackupForm.name
							}).then((res) => {
								if(res.data.data == 0) {
									this.save();
								} else {
									this.$Message.warning('备份名称不唯一');
								}
							})
						}
					}
				})
			},
			getFormateDate(fdate, type) {
				this.addBackupForm.startTime = fdate;
			},
			pageChange(num) { //页码改变的回调
				this.pageOption.current = num;
				this.getBackup();
			},
			changePageSize(num) { //切换每页条数时的回调
				this.pageOption.pageSize = num;
				this.getBackup();
			},
			checkButton(code){
				if(this.authButton.indexOf(code) >= 0){
					return true;
				}else{
					return false;
				}
			}
		},
		mounted() {
			this.init();
		}
	}
</script>