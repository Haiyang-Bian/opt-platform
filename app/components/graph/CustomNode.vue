<template>
	<div class="custom-node">
		<div class="node-icon">{{ data.icon }}</div>
		<div class="node-name">{{ data.label }}</div>
		<div class="node-value" v-if="data.value">{{ data.value }}</div>
	</div>
	<Handle type="source" id="outlet1" :position="Position.Right"/>
	<Handle type="target" id="inlet1" :position="Position.Left"/>
	<Handle type="target" id="inlet2" :position="Position.Top"/>
	<Handle type="source" id="outlet2" :position="Position.Bottom"/>
</template>

<script setup lang="ts">
import {Handle, Position} from "@vue-flow/core";
import type {INodeData} from "~/types/global";

defineOptions({
	inheritAttrs: false
})
defineProps<{
	id: string;
	data: INodeData;
}>();
</script>

<style scoped>
.custom-node {
	border: 2px solid #0ea5e9;
	border-radius: 8px;
	padding: 8px;
	min-width: 80px;
	text-align: center;
	color: white;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	user-select: none;
}
.node-icon { font-size: 20px; margin-bottom: 4px; }
.node-name { font-size: 12px; margin-bottom: 2px; }
.node-value { font-size: 10px; color: #e0f2fe; }
</style>