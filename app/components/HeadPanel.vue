<script setup lang="ts">
const items = [
	{ title: '聚合可调能力评价', value: '85%', subtitle: '协调优化决策', color: 'text-green-400' },
	{ title: '电网互动支撑', value: '78%', subtitle: '多市场交易', color: 'text-blue-400' },
	{ title: '园区总功率', value: '120MW', subtitle: '2024-04-01', color: 'text-orange-400' },
	{ title: '可再生能源占比', value: '65%', subtitle: '持续增长中', color: 'text-yellow-400' },
	{ title: '能效提升率', value: '15%', subtitle: '较去年同期', color: 'text-purple-400' },
	{ title: '碳排放减少量', value: '200吨', subtitle: '环保贡献', color: 'text-teal-400' },
]
</script>

<template>
	<div
		class="w-full grid grid-cols-6 gap-3"
	>
		<StatCard
			:title="items[0]!.title"
			:value="items[0]!.value"
			:unit="items[0]!.subtitle"
			class="col-span-2"
		/>
		<StatCard
			:title="items[1]!.title"
			:value="items[1]!.value"
			:unit="items[1]!.subtitle"
			class="col-span-2"
		/>
		<StatCard
			:title="items[2]!.title"
			:value="items[2]!.value"
			:unit="items[2]!.subtitle"
			class="col-span-2"
		/>
		<StatCard
			:title="items[3]!.title"
			:value="items[3]!.value"
			:unit="items[3]!.subtitle"
			class="col-span-2"
		/>
		<StatCard
			:title="items[4]!.title"
			:value="items[4]!.value"
			:unit="items[4]!.subtitle"
			class="col-span-2"
		/>
		<StatCard
			:title="items[5]!.title"
			:value="items[5]!.value"
			:unit="items[5]!.subtitle"
			class="col-span-2"
		/>
	</div>
</template>

<style scoped>

</style>