<template>
	<VChart
		autoresize
		:option="option"
		:style="{ height }"
	/>
</template>
<script setup lang="ts">
import type { MapSeriesOption } from 'echarts/charts'
import type { GeoComponentOption } from 'echarts/components'
import type { ComposeOption } from 'echarts/core'
import * as echarts from "echarts/core"
import {defineComponent} from "vue";

type ECOption = ComposeOption<GeoComponentOption | MapSeriesOption>

const props = defineProps({
	height: {
		type: String,
		default: '400px'
	}
})

const option = ref<ECOption>()

onMounted(async () => {
	const china = await $fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json')
	echarts.registerMap('china', china as any)
	option.value = {
		tooltip: {
			trigger: 'item',
			backgroundColor: 'rgba(0,0,0,0.7)',
			textStyle: { color: '#fff' }
		},
		geo: {
			map: 'china',
			label: { show: false },
			roam: false,
			itemStyle: {
				borderColor: '#111',
				borderWidth: 1,
				areaColor: '#222'
			},
			emphasis: {
				itemStyle: {
					areaColor: 'rgba(34,211,238,.3)'
				}
			},
			select: {
				itemStyle: {
					areaColor: '#22d3ee'
				}
			}
		},
		series: [
			{
				type: 'map',
				map: 'china',
				data: [
					{
						name: '陕西省',
						itemStyle: {
							areaColor: '#22d3ee'
						}
					},
					{
						name: '山东省',
						itemStyle: {
							areaColor: '#22d3ee'
						}
					}
				]
			}
		]
	}
})
</script>