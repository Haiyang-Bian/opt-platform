<template>
	<div class="w-62.5 h-100 border-0">
		<div class="w-full h-[10%] flex items-center justify-center bg-blue-600">
			{{ data.label }}
		</div>
		<div class="w-full h-[90%] border-[#ccc] border-2"></div>
	</div>
	<Handle type="target" id="inlet1" :position="Position.Left"/>
	<Handle type="target" id="inlet2" :position="Position.Right"/>
	<Handle type="source" id="outlet" :position="Position.Right"/>
</template>

<script setup lang="ts">
import {Handle, Position} from "@vue-flow/core";
import type {INodeData} from "~/types/global";

defineOptions({
	inheritAttrs: false
})
defineProps<{id: string, data: INodeData}>();
</script>

<style scoped>
</style>