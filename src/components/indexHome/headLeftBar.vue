<template>
	<div class="headLeftBar">
		<ul>
			<template v-for="(item, index) in headBar.children">
				<li
					:class="{ active: $route.path.indexOf(item.path)!==-1 }"
					@click="chosePage(index, item)"
				>
					{{ item.authName }}
				</li>
			</template>
		</ul>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	name: "headLeftBar",
	props: ["headBarList"],
	data() {
		return {
			bar: [1, 2, 3],
		};
	},
	computed: {
		...mapState(["menulist"]),
		headBar() {
			let listIndex = 0;
			let barList = [];
			this.menulist.forEach((el, index) => {
				el.children.find((el1) => {
					if (el1.path&&this.$route.path.indexOf(el1.path)!==-1) {
						listIndex = index;
					}
				});
			});
			return this.menulist[listIndex];
		},
	},
	watch: {
		headBarList() {},
	},
	created() {
		// 刷新页面后判断
	},
	methods: {
		chosePage(index, item) {
			// 判断点击的是不是同一个bar
			if (this.$route.path.indexOf(item.path)!==-1) {
				this.$router.go(0);
			} else {
				this.$router.push(item.path);
			}
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.active {
	color: #02cab0;
	border-bottom: 2px solid #02cab0;
}
.headLeftBar {
	height: 100%;
	margin: 0 20px;
	/* position: fixed; */
}
.headLeftBar ul {
	height: 100%;
	display: flex;
	align-items: center;
}

.headLeftBar ul li {
	list-style: none;
	height: 100%;
	padding: 0 10px;
	cursor: pointer;
	line-height: 60px;
}
.headLeftBar ul li:hover {
	color: #02cab0;
	border-bottom: 2px solid #02cab0;
}
</style>
