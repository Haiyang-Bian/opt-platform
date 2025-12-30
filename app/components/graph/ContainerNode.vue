<template>
	<div class="custom-container">
	</div>
	<Handle type="target" id="inlet1" :position="Position.Left"/>
	<Handle type="target" id="inlet2" :position="Position.Right"/>
	<Handle type="source" id="outlet" :position="Position.Right"/>
</template>

<script setup>
import {Handle, Position} from "@vue-flow/core";

defineProps({
	id: {
		type: String,
		required: true,
	},
	data: {
		type: Object,
		required: true,
		default: {
			label: { type: String, required: true }, // 节点名称
			icon: { type: String, default: '⚡' },   // 节点图标（可替换为SVG）
			value: { type: String, default: '+++' },    // 数值标注（如0 kW）
		},
	},
});
</script>

<style scoped>
.custom-container {
	width: 250px;
	height: 500px;
	border: 1px solid #ccc;
}
.node-icon { font-size: 20px; margin-bottom: 4px; }
.node-value { font-size: 10px; color: #e0f2fe; }
</style>