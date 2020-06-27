import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const types = {
	SET_IS_AUTNENTIATED: "SET_IS_AUTNENTIATED", // 是否认证通过
	SET_USER: "SET_USER", // 用户信息
	SET_HEAD_BAR: "SET_HEAD_BAR", // 点击更改选中的bar
};

const state = {
	// 需要维护的状态
	isAutnenticated: false, // 是否认证
	user: {}, // 存储用户信息
	gcid:'021137',
	menulist: [
		{
			id: "ca3r",
			authName: "工作台",
			path: "/index/workbench/workbench",
			pic: "workPlace.jpg",
			chose: true,
			children: [
				{
					id: "cvsd43a",
					authName: "工作台",
					chose: true,
					path: "/index/workbench/workbench",
				},
			],
		},
		{
			id: "fsef23",
			authName: "资源",
			path: "/index/resources",
			pic: "workPlace.jpg",
			chose: false,
			children: [
				{
					id: "cvsd43a",
					authName: "资源",
					chose: false,
					path: "/index/resources/resources",
				},
				{
					id: "cvsd43aasdas",
					authName: "特殊资源",
					chose: false,
					path: "/index/resources/specal",
				},
			],
		},
		{
			id: "as324asdf",
			authName: "合同",
			path: "",
			chose: false,
			pic: "workPlace.jpg",
			children: [
				{
					id: "cvsd43aasdqweqw",
					authName: "租客合同",
					chose: false,
					path: "",
				},
				{
					id: "sd45asd3",
					authName: "租客审批",
					chose: false,
					path: "",
				},
			],
		},
	],
};

const getters = {};
const mutations = {
	[types.SET_IS_AUTNENTIATED](state, isAutnenticated) {
		if (isAutnenticated) state.isAutnenticated = isAutnenticated;
		else state.isAutnenticated = false;
	},
	[types.SET_USER](state, user) {
		if (user) state.user = user;
		else state.user = {};
	},
	[types.SET_HEAD_BAR](state, barList) {
		state.menulist = barList;
	},
};

const actions = {
	setIsAutnenticated: ({ commit }, isAutnenticated) => {
		commit(types.SET_IS_AUTNENTIATED, isAutnenticated);
	},
	setUser: ({ commit }, user) => {
		commit(types.SET_USER, user);
	},
	clearCurrentState: ({ commit }) => {
		commit(types.SET_IS_AUTNENTIATED, false);
		commit(types.SET_USER, null);
	},
	setHeadBar: ({ commit },barList) => {
		commit(types.SET_HEAD_BAR, barList);
	},
};

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
});
