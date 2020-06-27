<template>
	<div class="workbench">
		<div class="workbench-bar">
			<ul class="cf">
				<template v-for="(item, index) in workList">
					<li
						@click="choseWorkCotent(index)"
						:class="{ active: item.chose === true }"
					>
						{{ item.title }}
					</li>
				</template>
			</ul>
		</div>
		<keep-alive>
			<dealList 
				:hourseIdList="hourseIdList"
				v-show="workList[0].chose"
			></dealList>
		</keep-alive>
		<dealEcharts v-show="workList[1].chose"></dealEcharts>
	</div>
</template>

<script>
import dealList from "./dealList";
import dealEcharts from "./dealEcharts";
import { mapState } from "vuex";
export default {
	name: "workbench",
	components: {
		dealList,
		dealEcharts,
	},
	data() {
		return {
			workList: [
				{
					pathName: "dealList",
					title: "待办",
					chose: true,
				},
				{
					pathName: "dealEcharts",
					title: "待办",
					chose: false,
				},
			],
			testArray: [],
			hourseIdList: [],
			testString: "123",
		};
	},
	watch: {},
	computed: {
		...mapState(["user"]),
	},
	activated() {},
	beforeRouteEnter(to, from, next) {
		// 设置下一个路由的 meta
		console.log(from);
		console.log(to);
		
		if (from.name == "resources") {
			to.meta.keepAlive = true;
		} else{
			to.meta.keepAlive = false;
		}
		next();
	},
	mounted() {
		console.log("组件mounted 了");
	},
	created() {
		this.getHorseIdData();
		setTimeout(() => {
			this.testArray = [
				{ name: "111", show: true },
				{ name: "222", show: true },
				{ name: "333", show: true },
			];
		});
		// 获取当前用户权限社区
	},
	methods: {
		choseWorkCotent(index) {
			this.workList.forEach((el) => (el.chose = false));
			this.workList[index].chose = true;
		},
		async getHorseIdData() {
			let params = {
				gcid: this.user.gcid,
				token: this.user.token,
				userid: this.user.id,
				params: {
					flag: "2",
				},
			};
			const hourseId = await this.$api.allHourseIdApi(params);
			const {
				result: { list },
			} = JSON.parse(hourseId);
			list.forEach((item, index) => {
				this.hourseIdList.push(item.id);
			});
		},
		changedata() {
			setTimeout(() => {
				this.hourseIdList = ["asdqwdfcasfca"];
			}, 1000);
		},
		do() {
			console.log("子组件mounted 了");
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.cf {
	clear: both;
}
.cf::after {
	content: "";
	height: 0;
	line-height: 0;
	display: block;
	visibility: hidden;
	clear: both;
}
.active {
	border-bottom: 3px solid #02cab0;
}
.workbench {
	background: #f2f6f7;
	padding: 20px;
	box-sizing: border-box;
	width: 100%;
	margin-top: 60px;
	.workbench-bar {
		display: flex;
		align-items: center;
		position: relative;
		ul {
			li {
				cursor: pointer;
				float: left;
				width: 60px;
				text-align: center;
				height: 30px;
				line-height: 30px;
				font-size: 15px;
				padding-bottom: 10px;
				height: 100%;
				&:hover {
					border-bottom: 3px solid #02cab0;
				}
			}
		}
		.hourseIdLIst {
			height: 36px;
			line-height: 36px;
			width: 440px;
			background-color: #fff;
			border-radius: 3px;
			border: 1px solid rgba(232, 235, 238, 1);
			text-indent: 10px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			padding-right: 40px;
			position: relative;
			color: #666666;
			margin-left: 40px;
		}
	}
}
</style>
