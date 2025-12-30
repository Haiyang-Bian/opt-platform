<template>
	<div class="text-center border-2 border-[#22d3ee] h-20">
		<div class="text-sm text-gray-400">{{ title }}</div>
		<div class="text-3xl font-bold font-orbitron">
			{{ value }}<span class="text-lg ml-1">{{ unit }}</span>
		</div>
	</div>
</template>
<script setup lang="ts">
defineProps<{
	title: string
	value: string | number
	unit: string
}>()
</script>