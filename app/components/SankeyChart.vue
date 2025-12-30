<template>
	<VChart autoresize :option="option" style="height: 100%" />
</template>
<script setup lang="ts">
const option = computed(() => ({
	tooltip: { trigger: 'item', triggerOn: 'mousemove' },
	series: [
		{
			type: 'sankey',
			layout: 'none',
			emphasis: { focus: 'adjacency' },
			data: [
				{ name: '火电' },
				{ name: '水电' },
				{ name: '光伏' },
				{ name: '用电' },
				{ name: '储能' }
			],
			links: [
				{ source: '火电', target: '用电', value: 60 },
				{ source: '水电', target: '用电', value: 30 },
				{ source: '光伏', target: '储能', value: 20 },
				{ source: '光伏', target: '用电', value: 10 },
				{ source: '储能', target: '用电', value: 15 }
			],
			lineStyle: { color: 'gradient', curveness: 0.5 }
		}
	]
}))
</script>