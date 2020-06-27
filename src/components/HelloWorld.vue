<template>
  <div class="test">
    <div class="input-conten">
      <div class="iuput-enter">
        <input type="text" v-model="serachWord">
      </div>
      <div class="add-btn" @click="addlistText()">
        add
      </div>
    </div>
    <div class="add-list">
      <ul>
        <li v-for="(item ,index) in value" :key="index"><p class="add-text">{{item}}</p><p class="del-btn" @click="delAddListtext(index)"><a href="javascript:;">Remove</a></p></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
	name: 'HelloWorld',
	props: {
		value: Array
	},
	data() {
		return {
			serachWord: '',
			addLits: [
				{
					text: 'asdasd'
				}
			],
			debounceTimer: ''
		}
	},
	watch: {
		serachWord:{
			handler: function(newVal, oldVal){
				if (newVal.trim() == oldVal.trim()) return
				clearTimeout(this.debounceTimer)
				this.debounceTimer = setTimeout(() => {
					if (!newVal) {
						return
					}
					this.value.push(newVal.trim())
					this.serachWord = ''
				}, 500) //几毫秒进行
      },
      deep:true//对象内部的属性监听，也叫深度监听
		}
	},

	methods: {
		addlistText() {
			if (!this.serachWord) return
			this.value.push(this.serachWord.trim())
			this.serachWord = ''
		},
		delAddListtext(index) {
      this.value.splice(index, 1)
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
	margin: 40px 0 0;
}
ul {
	/* list-style-type: none; */
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
.test {
	width: 500px;
	margin: 0 auto;
}
.input-conten {
	width: 80%;
	margin-left: 10%;
	display: flex;
	justify-content: space-between;
	height: 40px;
}
.input-conten .iuput-enter {
	height: 100%;
	width: 75%;
	border-radius: 10px;
	border: 1px solid #eee;
}
.iuput-enter input {
	width: 100%;
	height: 100%;
	border: none;
	border: 1px solid #e6e6e6;
	font-size: 16px;
	outline: none;
}
.input-conten .add-btn {
	font-size: 16px;
	width: 20%;
	border-radius: 10px;
	height: 100%;
	text-align: center;
	background-color: red;
	color: #fff;
	line-height: 40px;
	cursor: pointer;
}
.add-list {
	width: 80%;
	margin-left: 10%;
}
.add-list ul li {
	display: flex;
	justify-content: last baseline;
	align-items: center;
}
.add-list ul li .add-text {
	font-size: 18px;
	font-weight: 700;
	margin-right: 10px;
}
</style>
