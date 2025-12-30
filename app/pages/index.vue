<script setup lang="ts">
import LineChart from "~/components/LineChart.vue";
import PieChart from "~/components/PieChart.vue";
import BottomPanel from "~/components/BottomPanel.vue";

const months = ['1月', '2月', '3月', '4月', '5月', '6月']
const stackSeries = ref([
	{ name: '火电', stack: 'total', data: [120, 132, 101, 134, 90, 230] },
	{ name: '水电', stack: 'total', data: [60, 72, 81, 54, 50, 90] },
	{ name: '光伏', stack: 'total', data: [40, 45, 60, 70, 80, 120] }
])
</script>

<template>
	<div class="bg-img w-screen h-screen text-white">
		<header class="w-full h-[9vh] mt-4 flex items-start justify-center">
			<h1 class="text-5xl font-bold">综合能源与电网互动交易平台</h1>
		</header>
		<div class="w-full h-[90vh] flex justify-center items-center">
			<section class="w-[25%] h-full flex flex-col justify-center items-center gap-3">
				<card >
					<template #header>
						资源
					</template>
					<MapChart />
				</card>
				<card>
					<template #header>
						负荷
					</template>
					<LineChart />
				</card>
				<card>
					<template #header>
						计划方案
					</template>
					<div class="grid md:grid-cols-3 gap-4 text-center">
						<div>
							<div class="text-2xl font-bold text-green-400">聚合可调能力评价</div>
							<div class="text-sm text-gray-400 mt-1">协调优化决策</div>
						</div>
						<div>
							<div class="text-2xl font-bold text-blue-400">电网互动支撑</div>
							<div class="text-sm text-gray-400 mt-1">多市场交易</div>
						</div>
						<div>
							<div class="text-2xl font-bold text-orange-400">园区总功率</div>
							<div class="text-sm text-gray-400 mt-1">2024-04-01</div>
						</div>
					</div>
				</card>
			</section>

			<section class="w-[50%] h-full flex flex-col justify-center items-center gap-3">
				<head-panel />
				<CenterGraph />
				<bottom-panel />
			</section>

			<section class="w-[25%] h-full flex flex-col justify-center items-center gap-3">
				<card>
					<template #header>
						能流
					</template>
					<SankeyChart height="20vh"/>
				</card>
				<card>
					<template #header>
						出力
					</template>
					<StackChart type="bar" :x-data="months" :series="stackSeries" height="20vh" />
				</card>
				<card>
					<template #header>
						成本
					</template>
					<PieChart height="20vh" />
				</card>
			</section>
		</div>
	</div>
</template>

<style scoped>
.bg-img {
	@apply bg-cover bg-center bg-no-repeat;
	background-image: url('/images/bg.jpeg');
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
</style>