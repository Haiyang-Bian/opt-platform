<template>
	<VChart :option="option" autoresize style="height: 100%" />
</template>
<script setup lang="ts">
const option = ref({
	tooltip: { trigger: 'item' },
	legend: { bottom: 0, textStyle: { color: '#ccc' } },
	series: [{
		type: 'pie',
		radius: ['40%', '70%'],
		avoidLabelOverlap: false,
		itemStyle: { borderRadius: 6, borderColor: '#111', borderWidth: 2 },
		label: { show: false, position: 'center' },
		emphasis: { label: { show: true, fontSize: 20, fontWeight: 'bold' } },
		labelLine: { show: false },
		data: [
			{ value: 40, name: '充电桩功率', itemStyle: { color: '#38bdf8' } },
			{ value: 60, name: '楼宇功率', itemStyle: { color: '#f87171' } }
		]
	}]
})
</script>