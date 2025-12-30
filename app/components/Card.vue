<script setup lang="ts">
</script>

<template>
	<div class="w-full h-full flex flex-col justify-center items-center">
		<div class="w-full flex items-center">
			<div class="h-10 w-10">
				<img src="/images/icon.png"  alt=""/>
			</div>
			<div class="layout-container flex items-center ">
				<slot name="header" />
			</div>
		</div>
		<div class="w-full flex-1 flex items-center justify-center">
			<slot />
		</div>
	</div>
</template>

<style scoped>
/* 核心：布局容器样式 */
.layout-container {
	/* 基础尺寸：占满视口高度 */
	width: 100%;
	height: 50%;
	/* 内部背景：左上角→右下角渐变（你要的渐变方向） */
	background: linear-gradient(to right, rgba(240, 249, 255, 0.2), rgba(14, 165, 233, 0.2));
	/* 相对定位：让伪元素边框层基于此定位 */
	position: relative;
	/* 内容内边距：避免文字贴边框 */
	padding: 1rem;
	/* 可选：圆角（需与伪元素一致） */
	border-radius: 2px;
	/* 溢出隐藏：避免圆角处边框溢出 */
	overflow: hidden;
}

/* 伪元素：单独的边框层（核心实现混合模式） */
.layout-container::before {
	content: "";
	/* 绝对定位：完全覆盖父容器 */
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	/* 控制四个边框的宽度（核心：你要的四边框定制） */
	//border-top: 2px solid #0ea5e9;   /* 上边框：2px + 主色 */
	//border-right: 4px solid #0ea5e9; /* 右边框：4px + 主色 */
	//border-bottom: 6px solid #0ea5e9;/* 下边框：6px + 主色 */
	//border-left: 8px solid #0ea5e9;  /* 左边框：8px + 主色 */
	/* 混合模式：让边框与背景平滑过渡（关键） */
	mix-blend-mode: overlay; /* 可选：multiply/screen/soft-light，效果更自然 */
	/* 半透明：进一步弱化边框，过渡更丝滑 */
	opacity: 0.8;
	/* 层级：置于背景层，不遮挡内容 */
	z-index: 0;
	/* 圆角：与父容器一致，避免缺口 */
	border-radius: 8px;
	/* 不拦截鼠标交互 */
	pointer-events: none;
}

/* 内容层：确保在边框层上方 */
.layout-container > * {
	position: relative;
	z-index: 1;
}
</style>