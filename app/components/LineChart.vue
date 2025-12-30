<template>
	<VChart :option="option" autoresize style="height: 100%" />
</template>
<script setup lang="ts">
const option = ref({
	tooltip: { trigger: 'axis' },
	grid: { left: 40, right: 20, top: 20, bottom: 30 },
	xAxis: {
		type: 'category',
		data: Array.from({ length: 24 }, (_, i) => `${i}:00`),
		axisLine: { lineStyle: { color: '#888' } },
		axisLabel: { color: '#ccc' }
	},
	yAxis: {
		type: 'value',
		name: 'kW',
		nameTextStyle: { color: '#ccc' },
		axisLine: { lineStyle: { color: '#888' } },
		axisLabel: { color: '#ccc' },
		splitLine: { lineStyle: { color: '#444' } }
	},
	series: [{
		data: Array.from({ length: 24 }, () => 40 + Math.random() * 20),
		type: 'line',
		smooth: true,
		lineStyle: { color: '#22d3ee', width: 3 },
		areaStyle: { color: 'rgba(34,211,238,0.15)' }
	}]
})
</script>