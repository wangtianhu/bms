<template>
	<div class="dealList">
		<div class="noDealList">
			<h3>待处理服务清单</h3>
			<ul>
				<li v-for="(item, index) in dealList" :key="index">
					<img :src="item.pic" alt="" />
					<div class="dealListItem-right">
						<p>{{ item.title }}</p>
						<p>{{ item.num }}</p>
					</div>
				</li>
			</ul>
		</div>
		<div class="yuyueList">
			<ul>
				<li v-for="(item, index) in yuyueListArr">
					<div class="yuyue-item-let">
						<p>
							<span>{{ item.title }}</span
							><span>{{ item.tag }}</span>
						</p>
						<p>{{ item.num }}</p>
					</div>
					<img :src="item.pic" alt="" />
				</li>
			</ul>
		</div>
		<div class="bill-contract">
			<div class="bill">
				<h3>营收账单</h3>
				<ul>
					<li>
						<p>1020</p>
						<p>7日内&nbsp;代收账单</p>
					</li>
					<li>
						<p>1020</p>
						<p>7日内&nbsp;代收账单</p>
					</li>
					<li>
						<p>1020</p>
						<p>7日内&nbsp;代收账单</p>
					</li>
					<li>
						<p>1020</p>
						<p>7日内&nbsp;代收账单</p>
					</li>
				</ul>
			</div>
			<div class="constract">
				<h3>合同管理</h3>
				<ul>
					<li>
						<div class="constract-li">
							<p>
								<img
									src="@/assets/image/workbench/takein.png"
									alt=""
								/>
							</p>
							<div class="constract-item">
								<div class="constract-item-left">
									<p>0</p>
									<p>今日搬入</p>
								</div>
								<div class="constract-item-right">
									<p>本周<span>1</span></p>
									<p>本月<span>68</span></p>
								</div>
							</div>
						</div>
					</li>
					<li>
						<div class="constract-li">
							<p>
								<img
									src="@/assets/image/workbench/takeoff.png"
									alt=""
								/>
							</p>
							<div class="constract-item">
								<div class="constract-item-left">
									<p>0</p>
									<p>今日搬出</p>
								</div>
								<div class="constract-item-right">
									<p>本周<span>1</span></p>
									<p>30天内<span>68</span></p>
								</div>
							</div>
						</div>
					</li>
					<li>
						<div class="constract-li">
							<p>
								<img
									src="@/assets/image/workbench/delay.png"
									alt=""
								/>
							</p>
							<div class="constract-item">
								<div class="constract-item-left">
									<p>0</p>
									<p>昨日到期</p>
								</div>
								<div class="constract-item-right">
									<p>15天以内<span>1</span></p>
									<p>15天以上<span>68</span></p>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	name: "dealList",
		props: {
		hourseIdList: {
			type: Array,
			default: [],
		},
	},
	data() {
		return {
			dealList: [
				{
					title: "空房水电报警（昨天）",
					pic: require("@/assets/image/workbench/kongfang.png"),
					num: 222,
				},
				{
					title: "智能设备异常",
					pic: require("@/assets/image/workbench/zhineng.png"),
					num: 222,
				},
				{
					title: "维修订单",
					pic: require("@/assets/image/workbench/kongfang.png"),
					num: 222,
				},
				{
					title: "投诉服务",
					pic: require("@/assets/image/workbench/zhineng.png"),
					num: 222,
				},
				{
					title: "自动退组申请",
					pic: require("@/assets/image/workbench/kongfang.png"),
					num: 222,
				},
			],
			yuyueListArr: [
				{
					title: "预约看房",
					tag: "待受理",
					num: 123,
					pic: require("@/assets/image/workbench/book.png"),
				},
				{
					title: "预约看房",
					tag: "待受理",
					num: 123,
					pic: require("@/assets/image/workbench/book.png"),
				},
				{
					title: "预约看房",
					tag: "待受理",
					num: 123,
					pic: require("@/assets/image/workbench/book.png"),
				},
			],
		};
	},
	created() {
		console.log("重新加载");
	},
	computed:{
		...mapState(['user'])
	},
	watch: {
		hourseIdList(o,n){
			if(n){
				this.getHorseIdData()
			}
		}
	},
	mounted(){
		console.log('我缓存了');
		
	},
	methods: {
			async getHorseIdData() {
			let params = {
				gcid: this.user.gcid,
				token: this.user.token,
				userid: this.user.id,
				params: {
					houseItemIds: this.hourseIdList.join(','),
					isPower:1
				}
			}
			const hourseId = await this.$api.weakenData(params)
			const {data} = JSON.parse(hourseId)
			// 给数据进行赋值
			this.dealList[0].num = data.emptyWEAlarm
			this.dealList[1].num = data.expiredWithin
			this.dealList[2].num = data.complaintService
			this.dealList[3].num = data.expiredYesterday
			this.dealList[4].num = data.moveOutWeek
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.dealList {
	margin: 20px 0;
	.noDealList {
		background-color: #fff;
		padding: 20px;
		h3 {
			height: 22px;
			line-height: 22px;
			font-size: 16px;
			color: #464646;
			margin-bottom: 30px;
			font-weight: bold;
		}
		ul {
			display: flex;
			justify-content: space-around;
			li {
				cursor: pointer;
				display: flex;
				align-items: center;
				img {
					width: 60px;
				}
				div {
					margin-left: 15px;
					p {
						&:nth-child(1) {
							font-size: 12px;
						}
					}
				}
			}
		}
	}
	.yuyueList {
		margin-top: 30px;
		ul {
			display: flex;
			justify-content: space-between;
			li {
				width: calc((100% - 40px) / 3);
				padding: 20px;
				box-sizing: border-box;
				background-color: #fff;
				display: flex;
				justify-content: space-between;
				cursor: pointer;
				.yuyue-item-let {
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					justify-content: center;
					p {
						span {
							&:nth-child(1) {
								font-size: 16px;
								font-weight: bold;
							}
							&:nth-child(2) {
								display: inline-block;
								height: 18px;
								line-height: 18px;
								font-size: 12px;
								padding: 0 2px;
								border: 1px solid #4797de;
								border-radius: 2px;
								margin-left: 8px;
							}
						}
					}
				}
				img {
					width: 120px;
				}
			}
		}
	}
	.bill-contract {
		display: flex;
		margin-top: 20px;
		justify-content: space-between;
		.bill {
			padding: 20px;
			width: calc((100% - 40px) / 3);
			background-color: #fff;
			box-sizing: border-box;
			h3 {
				font-weight: bold;
				font-size: 16px;
			}
			ul {
				display: flex;
				justify-content: space-between;
				align-items: center;
				flex-wrap: wrap;
				li {
					text-align: center;
					width: 50%;
					box-sizing: border-box;
					padding: 10px 0;
					&:nth-child(2n + 1) {
						border-right: 1px solid #e8e8e8;
					}
					p {
						text-align: center;
						&:nth-child(1) {
							color: #4797de;
							font-size: 28px;
						}
						&:nth-child(2) {
							font-size: 13px;
							color: #464646;
						}
					}
				}
			}
		}
		.constract {
			background-color: #fff;
			width: calc((100% - 20px) - (100% - 40px) / 3);
			// flex-grow: 1;
			margin-left: 20px;
			padding: 20px;
			box-sizing: border-box;
			h3 {
				font-weight: bold;
				font-size: 16px;
			}
			ul {
				height: calc(100% - 40px);
				width: calc(100% + 20px);
				margin-left: -10px;
				display: flex;
				li {
					padding: 0 10px;
					flex: 1;
					.constract-li {
						background-color: #f1f7fc;
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						height: 100%;
						// padding: 10px;
						p {
							display: flex;
							justify-content: center;
							img {
								width: 50%;
							}
						}
						.constract-item {
							display: flex;
							width: 70%;
							margin-left: 15%;
							justify-content: space-between;
						}
					}
				}
			}
		}
	}
}
</style>
