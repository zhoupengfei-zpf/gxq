<!-- 预警级别 -->
<template>
	<div id="levelPieCharts"></div>
</template>

<script>
	export default {
		data () {
			return {
				echartData: [],
				lineBar: '',
				GxqptPublicLevel:{1:'一般',2:'较重',3 :'严重 ',4:'特别严重'},
			}
		},
		methods: {
			initLineBar() {
				// 基于准备好的dom，初始化echarts实例
				if (!this.lineBar) {
					this.lineBar = this.$echarts.init(document.getElementById('levelPieCharts'))
				}
				const option = {
					color: ['#55CFF4', '#FFD851', '#FFA358', '#FD7F7F'],
					title: {
						text: '预警级别',
						subtext: '',
						x: 'center',
						top: '20px'
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						data: []
					},
					series: [{
						name: '',
						type: 'pie',
						radius: '40%',
						center: ['50%', '55%'],
						// label:{
						// 	position:'inside',
						// },
						data: this.echartData,
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						},
						label:{
							normal:{
								formatter(v) {
									let text = v.name
									return text.length <= 4 
										? text 
										: `${text.slice(0,4)}\n${text.slice(4)}`
								}
							}  
						}
					}]
				};

				// 使用刚指定的配置项和数据显示图表。
				this.lineBar.setOption(option);
			},
			refresh (data) {
				this.echartData = data
				this.echartData = JSON.parse(JSON.stringify(this.echartData).replace(/level/g,"name"));
				this.echartData = JSON.parse(JSON.stringify(this.echartData).replace(/count/g,"value"));
				for(let i = 0; i < this.echartData.length; i++){
					this.echartData[i].name = this.GxqptPublicLevel[this.echartData[i].name];
				}
				this.initLineBar()
			}
		}
	}
</script>

<style lang="less" scoped>
	#levelPieCharts {
		width: 100%;
		height: 100%;
	}
</style>