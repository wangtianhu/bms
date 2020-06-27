<template>
	<div class="login-section">
		<div class="login-content" :style="{ height: scrollerHeight }">
			<div class="login-title">
				测试管理后台系统
			</div>
			<el-form
				:model="loginUser"
				:rules="rules"
				ref="loginForm"
				class="loginForm"
				label-width="60px"
			>
				<el-form-item label="邮箱" prop="email">
					<el-input
						v-model="loginUser.email"
						placeholder="请输入邮箱"
					></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input
						v-model="loginUser.password"
						placeholder="请输入密码"
						type="password"
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-button
						type="primary"
						@click="login('loginForm')"
						class="submit_btn"
						>登 录</el-button
					>
				</el-form-item>
				<div class="tiparea">
					<!-- <p>还没有账号？现在<router-link to='/register'>注册</router-link></p> -->
				</div>
			</el-form>
		</div>
	</div>
</template>

<script>
import Message from "@/mixins/message.js";

export default {
	name: "login",
	data() {
		var validUsername = (rule, value, callback) => {
			var re = /^(?![^A-Za-z]+$)(?![^0-9]+$)[0-9A-Za-z_]{4,15}$/; //判断字符串是否为数字和字母组合
			if (!re.test(value)) {
				callback();
				// new Error(
				// 	'用户名要求数字、字母、下划线的组合 数字和字母必须存在 长度为4-15个字符'
				// )
			} else {
				callback();
			}
		};
		var validUserpass = (rule, value, callback) => {
			var re = /^(?![^A-Za-z]+$)(?![^0-9]+$)[0-9A-Za-z_]{4,15}$/; //判断字符串是否为数字和字母组合
			if (!re.test(value)) {
				callback(
					new Error(
						"用户名要求数字、字母、下划线的组合 数字和字母必须存在 长度为4-15个字符"
					)
				);
			} else {
				callback();
			}
		};
		return {
			loginUser: {
				email: "",
				password: "",
			},
			rules: {
				email: [
					{
						required: true,
						validator: validUsername,
						message: "用户名要求数字、字母、下划线的组合",
						trigger: "blur",
					},
				],
				password: [
					{
						required: true,
						message: "密码不能为空",
						validator: validUserpass,
						trigger: "blur",
					},
					{
						min: 6,
						max: 30,
						message: "长度在 6 到 30 个字符",
						trigger: "blur",
					},
				],
			},
		};
	},
	mixins: [Message],
	watch: {},
	computed: {
		// 设置滚动区高度，减去头部标题和底部tabbar的高度
		scrollerHeight: function() {
			return window.clientHeight - 150 - 150 + "px";
		},
	},
	methods: {
		login(el) {
			this.$refs[el].validate(async (valid) => {
				if (!valid) return;
				let params = {
					gcid: "021137",
					accountName: this.loginUser.email,
					accountPwd: this.loginUser.password,
				};
				let res = await this.$api.loginApi(params);
				const {
					result,
					status: { msg, code },
				} = JSON.parse(res);
				if (code != 200) {
					// 假如返回码不是200  说明登录信息错误
					this.showWarning(msg);
					return;
				}
				// setItems('gcid', sendData.gcid) //gcid
				// setItems('chaoJiName', sendData.accountName) //管理员账号
				// setItems('JJuserOperateTime', new Date().getTime()) //当前登录时间
				// setItemsObj(currentJJRUser, data.result)
				// layer.msg('登录成功！')
				const { token } = result;
				window.sessionStorage.setItem("token", token);
				window.sessionStorage.setItem("setUser", JSON.stringify(result));
				this.showSuccess("登录成功");
				// 1. 将登录成功之后的 token，保存到客户端的 sessionStorage 中
				//   1.1 项目中出了登录之外的其他API接口，必须在登录之后才能访问
				//   1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
				// // 存储数据
				this.$store.dispatch(
					"setIsAutnenticated",
					!this.isEmpty(token)
				);
				this.$store.dispatch("setUser", result);
				// 2. 通过编程式导航跳转到后台主页，路由地址是 /home
				this.$router.push("/index");
			});
		},
		isEmpty(obj) {
			if (typeof obj == "undefined" || obj == null || obj == "") {
				return true;
			} else {
				return false;
			}
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.login-section {
	background-image: url(../assets/image/login_bg.jpg);
	background-size: 100% 100%;
	width: 100%;
	height: 100%;
}
.login-content {
	width: 400px;
	height: 400px;
	min-height: 300px;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	/* margin: 0 auto; */
	background-color: #fff;
	border-radius: 10px;
	box-sizing: border-box;
	padding: 10px;
	.login-title{
		font-size: 20px;
		color: red;
	}
}
.login-title {
	width: 100%;
	text-align: center;
	margin: 50px 0;
}
.submit_btn {
	margin-left: -60px;
}
.loginForm{

}
</style>
