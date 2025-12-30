<template>
	<VChart autoresize :option="option" style="height: 100%" />
</template>
<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		type?: 'bar' | 'line' | 'area'
		xData: string[]
		series: { name: string; data: number[]; stack: string }[]
		height?: string
	}>(),
	{ type: 'bar', height: '400px' }
)

const option = computed(() => ({
	tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
	legend: { data: props.series.map(s => s.name) },
	grid: { left: 40, right: 20, bottom: 40, top: 40 },
	xAxis: { type: 'category', data: props.xData },
	yAxis: { type: 'value' },
	series: props.series.map(s => ({
		name: s.name,
		type: props.type === 'area' ? 'line' : props.type,
		stack: s.stack,
		areaStyle: props.type === 'area' ? {} : undefined,
		emphasis: { focus: 'series' },
		data: s.data
	}))
}))
</script>
