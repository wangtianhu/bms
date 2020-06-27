<template>
	<div id="app">
		<router-view v-if="isRouterAC"></router-view>
	</div>
</template>

<script>
export default {
  name: "App",
  
	data() {
		return {
      isRouterAC:true
    };
  },
    provide(){
    return {
      reload:this.reload
    }
  },
	created() {
		if (sessionStorage.token) {
			this.$store.dispatch("setIsAutnenticated",!this.isEmpty(sessionStorage.token));
			this.$store.dispatch("setUser", JSON.parse(sessionStorage.setUser));
		}
	},
	watch: {},
	methods: {
		isEmpty(obj) {
			if (typeof obj == "undefined" || obj == null || obj == "") {
				return true;
			} else {
				return false;
			}
    },
        reload(){
      this.isRouterAC = false;
      this.$nextTick(() => {
        this.isRouterAC = true
      })
    }
	},
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>
