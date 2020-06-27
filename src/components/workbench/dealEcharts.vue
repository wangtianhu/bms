<template>
	<div class="dealEcharts">
		 <div class="swiper-container tigerji-swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide"  v-for="(item, index) in dataArr" :key="index"><img class="myImg" :src="item.imgSrc" alt="">
                     <div class="tigerlunbo_info">
                        <p class="filmName" v-text="item.name"></p>
                        <span class="tigerBuyTicket"></span>
                    </div>
                    </div>
                </div>
                <!-- 如果需要分页器 -->
                <div class="swiper-pagination"></div>
                <!-- 如果需要导航按钮 -->
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </div>
	</div>
</template>

<script>
import Swiper from "swiper";
import '@/assets/css/swiper.css';
export default {
	name: "dealEcharts",
	data() {
		return {
			dataArr: [
				{
					name: "name1",
					imgSrc:
						"//f.wetest.qq.com/gqop/10001/image/ycdcce51fb8b423d8069317eec8d534787efc3e596b9c938a02f88b0fcf7bd82e68d54a12cb38f23d240c3d1214f8a46f3c9422f1bbe2791fb?r=78730344&token=21ebbe8ee78a0007f9e9e9d8112f06269ea88eab",
				},
				{
					name: "name2",
					imgSrc:
						"//f.wetest.qq.com/gqop/10001/image/yc7b78cbd8154c44119a76185886ae579bb875536760ad81a9d8b60f81d4a994a39024eb8cb4c4597a304c3e40cc8398c4ba1c7ab5d54434e9?r=59071912&token=0eb3fcb7c3a4260860588b625ad4fcda1d01b3d3",
				},
				{
					name: "name3",
					imgSrc:
						"//f.wetest.qq.com/gqop/10001/image/yc5a1cb29a2cffa8bd040415445293932451b87b2005d154893f5dafce74d4d9ab32c486b24fbf145fc75cf6ec4715e4fc31dadada751d2690?r=8702793&token=dea0c3c5698fa4da752c281c55e6c4e6bda3417b",
				},
				{
					name: "name4",
					imgSrc:
						"//f.wetest.qq.com/gqop/10001/image/yc5a1cb29a2cffa8bd040415445293932451b87b2005d154893f5dafce74d4d9ab32c486b24fbf145fb63c4bb8b74549451d3d4db901cf277e?r=8702793&token=9cc81dc6ae609bd9623dd6faa045e8a53eb8317c",
				},
				{
					name: "name5",
					imgSrc:
						"//f.wetest.qq.com/gqop/10001/image/yc5a1cb29a2cffa8bd040415445293932451b87b2005d154893f5dafce74d4d9ab32c486b24fbf145f128b3d0f1b87f8e673d0e8afee564381?r=8702793&token=14498ce9fe89e846548a1ce99f7cfefaaa392bcf",
				},
				{
					name: "name6",
					imgSrc:
						"//f.wetest.qq.com/gqop/10001/image/yc5a1cb29a2cffa8bd040415445293932451b87b2005d154893f5dafce74d4d9ab32c486b24fbf145fb0305d669cd9455a6d7ea85792b974ed?r=8702793&token=5543fd7210735a9fe7cc582e8b678d32217c182c",
				},
			],
			mySwiperIns: null,
		};
	},
	watch: {},
	created(){
		this.mySwiper()
	},
	methods: {
		enlarge() {},
		mySwiper() {
			/* eslint-disable no-new */
			this.mySwiperIns = new Swiper(
				'.tigerji-swiper',
				{
					 loop: true,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                pagination: '.swiper-pagination',
				}
			);
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
