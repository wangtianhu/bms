<template>
	<div class="hourseList-chose">
		<input id="hourseList" v-model="myList" type="text">
		<template v-for="(item,index) in testArray">
			<p v-if="item.show" @click="changeShow(index)">{{item.name}}</p>
		</template>
		<div @click="changeHourseId()" class="shequListContent"></div>
	</div>
</template>

<script>
export default {
	name: "hourseIdist",
	props: {
		hourseIdList: {
			type: Array,
			default: [],
		},
		testString:{
			type:String,
			default:''
		},
		testArray:{
			type:Array,
			default:[]
		}
	},
	data() {
		return {
			
		};
	},
	watch: {},
	computed:{
		myList(){
		 return	this.hourseIdList
		},
		myTestArray(){
			return this.testArray
		}
	},
	methods: {
		changeHourseId(){
			console.log(66);
			console.log(this.$parent);
			
			this.myList.shift()
			this.mySting+='444'
		},
		changeShow(i){
			this.testArray[i].show=false;
		}
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hourseList-chose {
	border: none;
	height: auto;
	padding: 5px 10px;
	width: 200px;
	margin-top: 2px;
	background: #ffffff;
	box-shadow: 0px 5px 10px 0px rgba(58, 71, 97, 0.1);
	position: absolute;
	top: 38px;
	left: 0;
	z-index: 100;
	box-sizing: border-box;
	#hourseList{
		width: 100%;
		height: 40px;
	}
	.shequListContent {
		display: flex;
		height: 320px;
		overflow: auto;
	}
}
</style>
