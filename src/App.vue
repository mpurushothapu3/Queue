<template>
	<div id="app">
		<navigation/>
		<router-view/>

	</div>
</template>

<script>
import Navigation from './components/Navigation.vue'
export default {
	components: {
		Navigation
	}
}
</script>

<style>

*, *::before, *::after {
	box-sizing: border-box;
}

#app {
	max-width: 400px;
	margin: 0 auto;
	line-height: 1.4;
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #32485F;
}

h1 {
	text-align: center;
}
</style>