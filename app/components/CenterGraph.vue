<template>
	<div class="system-diagram">
		<!-- 分区标题 -->
		<div class="section-title">
			<div class="electric-title">电</div>
			<div class="heat-gas-title">热&气</div>
		</div>

		<!-- Vue Flow 核心容器 -->
		<VueFlow
			:nodes="nodes"
			:edges="edges"
			class="flow-'custom-container'"
			fit-view-on-init
			:node-types="nodeTypes"
			:draggable="false"
			:zoom-on-scroll="false"
			:edge-label-position="'middle'"
			:connection-line-options="{
				style: {
					'z-index': 10,
				}
			}"
		>
			<Controls :show-minimap="false" :show-zoom="false" />
		</VueFlow>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { VueFlow, useVueFlow } from '@vue-flow/core';
import CustomNode from './graph/CustomNode.vue';
import '@vue-flow/core/dist/style.css';
import '@vue-flow/controls/dist/style.css';
import {Controls} from "@vue-flow/controls";
import ContainerNode from "~/components/graph/ContainerNode.vue";

// 注册自定义节点类型
const nodeTypes = {
	custom: CustomNode,
	'custom-container': ContainerNode,
};

// 节点配置（坐标/内容/样式）
const nodes = ref([
	// 左侧「电」区域节点
	{
		id: 'title-electric',
		type: 'custom-container',
		position: { x: 60, y: -20 },
		data: { label: '电', icon: '⚡' },
	},
	{
		id: 'title-heat-gas',
		type: 'custom-container',
		position: { x: 510, y: -20 },
		data: { label: '热&气', icon: '🔥🛢️' },
	},
	{
		id: 'pv',
		type: 'custom',
		parentNode: 'title-electric',
		position: { x: 60,  y: 30 },
		data: { label: '光伏', value: '0 kW', icon: '☀️' }
	},
	{
		id: 'storage',
		type: 'custom',
		parentNode: 'title-electric',
		position: { x: 160, y: 30 },
		data: { label: '储能', value: '0 kW', icon: '🔋' }
	},
	{
		id: 'wind',
		type: 'custom',
		parentNode: 'title-electric',
		position: { x: 60,  y: 130 },
		data: { label: '风电', value: '0 kW', icon: '💨' }
	},
	{
		id: 'e-load',
		type: 'custom',
		parentNode: 'title-electric',
		position: { x: 160, y: 130 },
		data: { label: '电负荷', value: '0 kW', icon: '📊' }
	},
	{
		id: 'e-boiler',
		type: 'custom',
		parentNode: 'title-electric',
		position: { x: 110, y: 230 },
		data: { label: '电锅炉', icon: '🔥' },
		extent: 'parent' // 限制在父节点内移动
	},
	{
		id: 'grid',
		type: 'custom',
		position: { x: 310, y: 130 },
		data: { label: '电网', icon: '🏭' },
	},
	// 右侧「热&气」区域节点
	{
		id: 'gas',
		type: 'custom',
		parentNode: 'title-heat-gas',
		position: { x: 80, y: 30 },
		data: { label: '天然气', icon: '⛽' }
	},
	{
		id: 'cchp',
		type: 'custom',
		parentNode: 'title-heat-gas',
		position: { x: 80, y: 130 },
		data: { label: '冷热电三联供', icon: '♻️' }
	},
	{
		id: 'h-load',
		type: 'custom',
		parentNode: 'title-heat-gas',
		position: { x: 20, y: 230 },
		data: { label: '热负荷', icon: '🌡️' }
	},
	{
		id: 'g-load',
		type: 'custom',
		parentNode: 'title-heat-gas',
		position: { x: 100, y: 230 },
		data: { label: '气负荷', icon: '🌀' }
	},
]);

// 连线配置（核心修改：Manhattan类型 + 动态虚线样式）
const edges = ref([
	// 风电 → 电网（绿色+0kW + 动态虚线）
	{
		id: 'e1',
		source: 'title-electric',
		sourceHandle: 'outlet1',
		target: 'grid',
		targetHandle: 'inlet1',
		type: 'step',
		animated: true,
		style: {
			stroke: '#10b981',
			strokeWidth: 2,
			strokeDasharray: '8, 4', // 虚线样式：实线段8px，空线段4px
			strokeLinecap: 'round'  // 线条端点圆润
		},
		labelStyle: { fill: 'white', fontSize: 10, background: 'rgba(0,0,0,0.5)', padding: '2px 6px', borderRadius: '4px' } },

	// 电网 → 电负荷（绿色+0kW + 动态虚线）
	{
		id: 'e2',
		source: 'grid',
		target: 'e-load',
		type: 'step',
		animated: true,
		style: {
			stroke: '#10b981',
			strokeWidth: 2,
			strokeDasharray: '8, 4',
			strokeLinecap: 'round'
		},
		labelStyle: {
			fill: 'white',
			fontSize: 10,
			background: 'rgba(0,0,0,0.5)',
			padding: '2px 6px',
			borderRadius: '4px'
		}
	},

	// 电锅炉 → 冷热电三联供（红色+α + 动态虚线）
	{
		id: 'e3',
		source: 'e-boiler',
		sourceHandle: 'outlet1',
		target: 'title-heat-gas',
		targetHandle: 'inlet',
		type: 'step',
		animated: true,
		style: {
			stroke: '#ef4444',
			strokeWidth: 2,
			strokeDasharray: '8, 4',
			strokeLinecap: 'round'
		},
		labelStyle: {
			fill: 'white',
			fontSize: 10,
			background: 'rgba(0,0,0,0.5)',
			padding: '2px 6px',
			borderRadius: '4px'
		}
	},

	// 天然气 → 冷热电三联供（红色 + 动态虚线）
	{
		id: 'e4',
		source: 'gas',
		sourceHandle: 'outlet2',
		target: 'cchp',
		targetHandle: 'inlet',
		type: 'step',
		animated: true,
		style: {
			stroke: '#ef4444',
			strokeWidth: 2,
			strokeDasharray: '8, 4',
			strokeLinecap: 'round'
		}
	},

	// 冷热电三联供 → 热负荷（橙色+0.01t + 动态虚线）
	{ id: 'e5', source: 'cchp', target: 'h-load', type: 'step',
		animated: true,
		style: {
			stroke: '#f97316',
			strokeWidth: 2,
			strokeDasharray: '8, 4',
			strokeLinecap: 'round'
		},
		labelStyle: { fill: 'white', fontSize: 10, background: 'rgba(0,0,0,0.5)', padding: '2px 6px', borderRadius: '4px' } },

	// 冷热电三联供 → 气负荷（橙色+0.01t + 动态虚线）
	{ id: 'e6', source: 'cchp', target: 'g-load', type: 'step',
		animated: true,
		style: {
			stroke: '#f97316',
			strokeWidth: 2,
			strokeDasharray: '8, 4',
			strokeLinecap: 'round'
		},
		labelStyle: { fill: 'white', fontSize: 10, background: 'rgba(0,0,0,0.5)', padding: '2px 6px', borderRadius: '4px' } },

	// 冷热电三联供标注0.02t（自定义位置）
	{ id: 'e7', source: 'cchp', target: 'cchp',
		style: { stroke: 'transparent' },
		labelStyle: { fill: 'white', fontSize: 10, transform: 'translate(20px, -20px)', background: 'rgba(0,0,0,0.5)', padding: '2px 6px', borderRadius: '4px' } },
]);

// 初始化视图适配
const { fitView } = useVueFlow();
setTimeout(() => fitView(), 100);
</script>

<style scoped>
.system-diagram {
	width: 100%;
	height: 600px;
	border-radius: 8px;
	padding: 16px;
}

/* 分区标题样式 */
.section-title {
	display: flex;
	justify-content: space-between;
	margin-bottom: 16px;
}
.electric-title, .heat-gas-title {
	color: #bae6fd;
	font-size: 18px;
	font-weight: bold;
	padding: 8px 16px;
	background: rgba(14, 165, 233, 0.2);
	border-radius: 4px;
}
.electric-title { margin-left: 80px; }
.heat-gas-title { margin-right: 80px; }

/* Flow容器样式 */
.flow-container {
	width: 100%;
	height: calc(100% - 60px);
	background: #567cd7;
}

/* 覆盖vue-flow默认样式 */
:deep(.vue-flow__edge-label) {
	background: rgba(0, 0, 0, 0.5);
	padding: 2px 6px;
	border-radius: 4px;
}
:deep(.vue-flow__edge) {
	z-index: 999;
}
:deep(.vue-flow__controls) { display: none; } /* 隐藏默认控制栏 */
</style>