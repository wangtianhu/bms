<template>
	<div class="main">
		<!-- <headTop></headTop> -->
		<leftBar></leftBar>
		<div class="rightContainer">
			<headTop></headTop>
				<router-view v-if="isRouterAlive"></router-view>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import leftBar from "@/components/indexHome/leftBar";
import headTop from "@/components/indexHome/headTop";
export default {
	name: "index",
	data() {
		return {
			isRouterAlive:true
		}
	},
	created(){
	
	},
	components: {
		leftBar,
		headTop,
	},
	computed: {
		...mapState(['user'])
	},
	watch: {},

	methods: {
	
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
	display: flex;
}
.rightContainer {
	width: 100%;
	padding-left: 150px;
}
</style>
