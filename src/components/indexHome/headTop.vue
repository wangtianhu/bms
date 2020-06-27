<template>
	<div class="fix-top-head">
		<div class="head-top">
			<!-- 头部区域 -->
			<div class="head-personInfo">
				<div class="head-personInfo-top">
					<img src="@/assets/image/personLogo.jpg" alt="" />
					<span>{{ user.nickName }}</span>
				</div>
				<ul class="head-personInfo-bottom">
					<li>修改密码</li>
					<li>系统消息</li>
					<li @click="loginOut()">退出</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import choseHourseId from "@/components/common/choseHourseId";

import { mapState } from "vuex";
export default {
	name: "headTop",
	data() {
		return {};
	},
	watch: {},
	components: {
		choseHourseId,
	},
	computed: {
		...mapState(["user"]),
	},
	methods: {
		loginOut() {
			sessionStorage.clear();
			this.$router.replace("/login");
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fix-top-head{
	position: fixed;
	width: calc(100% - 150px);
	background-color: #fff;
}
.head-top {
	height: 60px;

}
.head-personInfo {
	cursor: pointer;
	float: right;
	position: relative;
}
.head-personInfo-top {
	height: 60px;
	display: flex;
	justify-content: space-around;
	align-items: center;
}
.head-personInfo:hover .head-personInfo-bottom {
	display: block;
}
.head-personInfo-bottom {
	position: absolute;
	display: none;
	text-align: center;
	border: 1px solid #ccc;
	width: 100%;
	background-color: #fff;
}
.head-personInfo-bottom li {
	text-align: center;
	padding: 5px 0;
}
.head-personInfo-bottom li:hover {
	background-color: #e6e6e6;
}
.head-personInfo img {
	width: 35px;
}
.head-personInfo span {
	margin: 0 20px;
}
.personInfo-list {
	width: 100%;
}
</style>
