<template>
	<div class="left-bar">

		<div class="bar-list">
			<!-- 页面主体区域 -->
		<el-row class="tac">
			<el-col class="tac-content" :span="2">
                <div class="conpany-pic">
                    <img src="@/assets/image/myLogo.jpg" alt="" />
			    </div>
                <div class="userInfo">
                    <img src="@/assets/image/personLogo.jpg" alt="">
                    <p>{{user.accountName}}</p>
                    <p>{{user.nickName}}</p>
                </div>
				<el-menu
					class="el-menu-vertical-demo"
					background-color="#263E4A"
					text-color="#fff"
					:default-active="this.$route.path"
					active-text-color="#ffd04b"
                     unique-opened
					 router
					 
				>
					<template  v-for="(item,index) in menulist">
						<el-submenu :index="item.path"  v-if="item.children.length>1">
							<template slot="title">
								<i class="el-icon-location"></i>
								<span>{{item.authName}}</span>
							</template>
							<el-menu-item-group>
								<el-menu-item :index="sonItem.path"   v-for="(sonItem,index1) in item.children">{{sonItem.authName}}</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
						<el-menu-item  :index='item.path'  v-else >
							<i class="el-icon-menu"></i>
							<span slot="title">{{item.authName}}</span>
						</el-menu-item>
					</template>
					</el-submenu>
				</el-menu>
			</el-col>
		</el-row>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	name: 'leftBar',
	data() {
		return {
			// 左侧菜单数据
			isCollapse: true,
			activePath: '',
			defaulUrl: '/index/workbench/workbench'
		}
	},
	watch: {
		// $route: 'getPath'
	},
	inject: ['reload'],
	computed: {
		...mapState(['user', 'menulist'])
	},
	created() {
		// this.getPath()
		console.log('加载')
		// 页面刷新
	},
	methods: {
		getPath() {
			let listIndex = 0;
			let sonIndex = 0;
			let barList = [];
			this.menulist.forEach((el, index) => {
				el.children.find((el1,index2) => {
					if (el1.path&&this.$route.path.indexOf(el1.path)!==-1) {
						listIndex = index;
						sonIndex = index2
					}
				});
			});
			this.defaultUrl = this.menulist[listIndex].children[sonIndex]
		},
		logout() {},
		toggleCollapse() {},
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.left-bar{
	background-color: #263E4A;
	position: fixed;
	.bar-list{
		overflow: scroll;
	}
}
.tac-content {
	background-color: #263E4A;
	width: 150px;
}
.conpany-pic {
	width: 100%;
}
.conpany-pic img {
	width: 80%;
    padding: 10%
}
.userInfo {
	width: 100%;
	/* background-color: #fff; */
	color: #fff;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.userInfo img {
	width: 60px;
}
.userInfo > p {
	margin: 0;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 150px;
	min-height: 400px;
}
.el-submenu .el-menu-item {
	min-width: 150px;
}
</style>
