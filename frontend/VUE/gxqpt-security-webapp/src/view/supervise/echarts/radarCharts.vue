<!-- 人员预警处理对比分析图 -->
<template>
	<div id="radarCharts"></div>
</template>

<script>
	export default {
		data() {
			return {
				indicatorList:[],
				dataList:[],
			}
		},
		methods: {
			refresh(indicatorList, dataList) {
				this.indicatorList = indicatorList;
				this.dataList = dataList;
				this.initLineBar();
			},
			initLineBar() {
				// 基于准备好的dom，初始化echarts实例
				var lineBar = this.$echarts.init(document.getElementById('radarCharts'))
				const option = {
					title: {
						text: ''
					},
					tooltip: {},
					legend: {
						data: []
					},
					radar: {
						radius: '60%',
						// shape: 'circle',
						name: {
							textStyle: {
								color: '#fff',
								backgroundColor: '#999',
								borderRadius: 3,
								padding: [3, 5]
							}
						},
						indicator: this.indicatorList
					},
					series: [{
						name: '预算 vs 开销（Budget vs spending）',
						type: 'radar',
						// areaStyle: {normal: {}},
						data: this.dataList
					}]
				};

				// 使用刚指定的配置项和数据显示图表。
				lineBar.setOption(option);
			}
		}
	}
</script>

<style lang="less" scoped>
	#radarCharts {
		width: 100%;
		height: 100%;
	}
</style>