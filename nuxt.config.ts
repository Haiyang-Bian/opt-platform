// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	modules: [
		'@nuxt/ui',
		'nuxt-echarts'
	],
	css: ['~/assets/css/main.css'],

	ui: {
		fonts: false
	},
	echarts: {
		charts: [
			'BarChart',
			'LineChart',
			'PieChart',
			'HeatmapChart',
			'GaugeChart',
			'MapChart',
			'SankeyChart'
		],
		components: [
			'GridComponent',
			'TooltipComponent',
			'LegendComponent',
			'VisualMapComponent',
			'TitleComponent',
			'GeoComponent'
		]
	},

	routeRules: {
		'/': { prerender: true }
	},
})