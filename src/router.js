import Vue from "vue";
import Router from "vue-router";
// import Index from './views/Index.vue'
import Register from "./views/register.vue";
// import Nofind from './views/404'
import Login from "./views/login.vue";
import Index from "./views/index.vue";
const Workbench = () => import("@/components/workbench/workbench.vue");
const DealList = () => import("@/components/workbench/dealList.vue");
const DealEcharts = () => import("@/components/workbench/dealEcharts.vue");
const SpecilResources = () => import("@/components/resources/specilResources.vue");
const Resources = () => import("@/components/resources/index.vue");

Vue.use(Router);

const router = new Router({
	mode: "hash",
	base: process.env.BASE_URL,
	routes: [
		{ path: '/', redirect: '/index' },
		{ path: "/register", name: "register", component: Register },
		{ path: "/login", name: "login", component: Login },
		{
			path: "/index",
			name: "index",
			component: Index,
			children: [
				{ path: "", redirect: "workbench/workbench" },
				{
					path: "workbench/workbench",
					name: "workbench",
					component: Workbench,
					meta:{
						keepAlive:false
					}
				
				},
				{ path: "resources", redirect: "resources/resources" },
				{
					path: "resources/resources",
					name: "resources",
					component: Resources,
				},
				{
					path: "resources/specal",
					name: "specilResources",
					component: SpecilResources,
				}
			],
		},
	],
});

// 添加路由守卫
router.beforeEach((to, from, next) => {
	// 获取token
	const isLogin = window.sessionStorage.getItem("token") ? true : false;
	if (to.path == "/login" || to.path == "/register") {
		next();
	} else {
		isLogin ? next() : next("/login");
	}
});

export default router;
