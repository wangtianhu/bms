<template>
  <div class="blg-carousel"
    :id="comData.id">
    <div class="blg-carousel-content">
      <section class="swiper-container">
        <div class="swiper-wrapper">
          <li class="swiper-slide bui-slide-item"
            :style="styleLi"
            v-for="(item, index) in dataArr"
            :key="index"
            @click="enlarge(index)">
            <img class="bui-slide-item-img"
              :src="item.imgSrc" @mousedown="preventImgDrag" />
            <div>
            </div>
          </li>
        </div>
        <!-- 如果需要滚动条 -->
        <div class="swiper-scrollbar"></div>
      </section>
      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper';
import { Button } from 'view-design';
import 'view-design/dist/styles/iview.css';
import Databinding from 'biligame-ui/src/mixins/databinding';
import autoResize from 'biligame-ui/src/mixins/autoResize';

export default {
  name: 'BlgCarousel',
  data() {
    return {
      index: 0,
      newdata: [],
      rotateAngle: 0,
      slidesPerView: 3.5,
      show: true,
      mySwiperIns: null,
    };
  },
  mixins: [Databinding, autoResize],
  components: {
    Button
  },
  biligame: { // 供caster系统解析的组件基础参数
    name: 'swiper 轮播图',
    noView: false, // 如果为true组件不可见
    style: {},
    slots: [],
    events: [],
    methods: [],
    defaultData: {
      static: JSON.stringify([
        {
          'name': 'name1',
          'imgSrc': '//f.wetest.qq.com/gqop/10001/image/ycdcce51fb8b423d8069317eec8d534787efc3e596b9c938a02f88b0fcf7bd82e68d54a12cb38f23d240c3d1214f8a46f3c9422f1bbe2791fb?r=78730344&token=21ebbe8ee78a0007f9e9e9d8112f06269ea88eab',
        },
        {
          'name': 'name2',
          'imgSrc': '//f.wetest.qq.com/gqop/10001/image/yc7b78cbd8154c44119a76185886ae579bb875536760ad81a9d8b60f81d4a994a39024eb8cb4c4597a304c3e40cc8398c4ba1c7ab5d54434e9?r=59071912&token=0eb3fcb7c3a4260860588b625ad4fcda1d01b3d3',
        },
        {
          'name': 'name3',
          'imgSrc': '//f.wetest.qq.com/gqop/10001/image/yc5a1cb29a2cffa8bd040415445293932451b87b2005d154893f5dafce74d4d9ab32c486b24fbf145fc75cf6ec4715e4fc31dadada751d2690?r=8702793&token=dea0c3c5698fa4da752c281c55e6c4e6bda3417b',
        },
        {
          'name': 'name4',
          'imgSrc': '//f.wetest.qq.com/gqop/10001/image/yc5a1cb29a2cffa8bd040415445293932451b87b2005d154893f5dafce74d4d9ab32c486b24fbf145fb63c4bb8b74549451d3d4db901cf277e?r=8702793&token=9cc81dc6ae609bd9623dd6faa045e8a53eb8317c',
        },
        {
          'name': 'name5',
          'imgSrc': '//f.wetest.qq.com/gqop/10001/image/yc5a1cb29a2cffa8bd040415445293932451b87b2005d154893f5dafce74d4d9ab32c486b24fbf145f128b3d0f1b87f8e673d0e8afee564381?r=8702793&token=14498ce9fe89e846548a1ce99f7cfefaaa392bcf',
        },
        {
          'name': 'name6',
          'imgSrc': '//f.wetest.qq.com/gqop/10001/image/yc5a1cb29a2cffa8bd040415445293932451b87b2005d154893f5dafce74d4d9ab32c486b24fbf145fb0305d669cd9455a6d7ea85792b974ed?r=8702793&token=5543fd7210735a9fe7cc582e8b678d32217c182c',
        },
      ], null, 2)
    }
  },
  props: {
    pageType: String, // 页面类型可能的值: pc、h5 ,(仅caster系统固定传递)
    comData: Object, // 遵循caster规范的组件数据,仅caster系统固定传递,可用于处理一些特殊操作
    option: { // 需要提供caster解析的组件配置
      type: Object,
      default() {
        return {};
      },
      _form: [
        {
          type: 'switch',
          field: 'isHide',
          title: '初始化时隐藏',
          info: '',
          value: false
        },
        {
          type: 'InputNumber',
          field: 'slidesPerView',
          title: '每屏显示数量',
          value: 3.5,
        },
        {
          type: 'InputNumber',
          field: 'slidesPerViewRotate',
          title: '旋转每屏显示数量',
          value: 2,
        },
      ]
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.updateCompShowStatus(!this.option.isHide);
    });
  },
  computed: {
    styleLi() {
      return `transform:rotate(${this.rotateAngle}deg);`;
    },
  },
  watch: {
    'comData.style.width': {
      handler(newName) {
        if (newName) {
          this.mySwiper();
        }
      },
      immediate: true
    },
    'comData.style.height': {
      handler(newName) {
        if (newName) {
          this.mySwiper();
        }
      },
      immediate: true
    },
    'option.slidesPerView': {
      handler(newName) {
        if (newName) {
          this.slidesPerView = this.option.slidesPerView;
          this.mySwiper();
        }
      },
      immediate: true
    },
    comParamData: {
      handler(newVal) {
        if (newVal) {
          this.rotateAngleFun(newVal.key);
        };
      },
      immediate: true,
      deep: true,
    }
  },
  methods: {
    mySwiper() {
      /* eslint-disable no-new */
      this.mySwiperIns = new Swiper(`#${this.comData.id} .swiper-container`, {
        initialSlide: 1,
        // slidesPerGroup: 3,
        slidesPerView: this.slidesPerView,
        // 如果需要前进后退按钮
        nextButton: `#${this.comData.id} .swiper-button-next`,
        prevButton: `#${this.comData.id} .swiper-button-prev`,
        // 如果需要滚动条
        scrollbar: `#${this.comData.id} .swiper-scrollbar`,
        autoHeight: true,
        simulateTouch: false,
        // observer: true,
        // observeParents: true,
      });
    },
    enlarge(index) {
      if (!window.$nuxt) {
        return;
      }

      this.index = index;
      this.newdata = JSON.parse(JSON.stringify(this.dataArr));
      const html = `<div class="showImageBox">
      <span class="showImage-left" id="showImage-left"></span>
      <span class="showImage-right" id="showImage-right"></span>
      <span class="showImage-close" id="showImage-close">×</span>
      <img class="showImage" />
      </div>`;
      let tempNode = document.createElement('div');
      tempNode.setAttribute('class', `boxWraper-${this.comData.id}`);
      tempNode.innerHTML = html;
      document.querySelector('body').appendChild(tempNode);
      document.querySelector(`.boxWraper-${this.comData.id} .showImage`).setAttribute('src', this.newdata[this.index].imgSrc);
      this.initEvent();
    },
    // 图片放大动态添加dom元素和事件
    initEvent() {
      document.querySelector(`.boxWraper-${this.comData.id} #showImage-close`).addEventListener('click', () => {
        const elem = document.querySelector(`.boxWraper-${this.comData.id}`);
        elem.parentNode.removeChild(elem);
      });

      document.querySelector(`.boxWraper-${this.comData.id} #showImage-left`).addEventListener('click', () => {
        this.index -= 1;
        if (this.index > -1) {
          document.querySelector(`.boxWraper-${this.comData.id} .showImage`).setAttribute('src', this.newdata[this.index].imgSrc);
        } else {
          this.index = 0;
          let tempNode = document.createElement('div');
          tempNode.setAttribute('class', 'tootip');
          tempNode.innerHTML = '已是首张图片';
          document.querySelector('body').appendChild(tempNode);
          setTimeout(() => {
            const elem = document.querySelector('.tootip');
            elem.parentNode.removeChild(elem);
          }, 2000);
        }
      });

      document.querySelector(`.boxWraper-${this.comData.id} #showImage-right`).addEventListener('click', () => {
        this.index += 1;
        if (this.index < this.newdata.length) {
          document.querySelector(`.boxWraper-${this.comData.id} .showImage`).setAttribute('src', this.newdata[this.index].imgSrc);
        } else {
          this.index = this.newdata.length - 1;
          let tempNode = document.createElement('div');
          tempNode.setAttribute('class', 'tootip');
          tempNode.innerHTML = '没有更多图片了';
          document.querySelector('body').appendChild(tempNode);
          setTimeout(() => {
            const elem = document.querySelector('.tootip');
            elem.parentNode.removeChild(elem);
          }, 2000);
        }
      });
    },
    // 图片旋转
    rotateAngleFun(param) {
      // const m = new Map([[1, 90], [0, 0], [-1, -90]]);
      // this.rotateAngle = m.get(param);
      switch (param) {
        case 1:
          this.rotateAngle = 90;
          this.slidesPerView = this.option.slidesPerViewRotate;
          break;
        case 0:
          this.rotateAngle = 0;
          this.slidesPerView = this.option.slidesPerView;
          break;
        case -1:
          this.rotateAngle = -90;
          this.slidesPerView = this.option.slidesPerViewRotate;;
          break;
        default:
          this.rotateAngle = 0;
          this.slidesPerView = this.option.slidesPerView;
      }
      // this.mySwiperIns ? this.mySwiperIns.update(true) : this.mySwiper();
      this.mySwiper();
    },
    // 禁止图片默认拖拽
    preventImgDrag(evt) {
      evt.preventDefault();
    },
    updateCompShowStatus(isShow) {
      this.show = isShow;
      this.$parent.$el.style.display = isShow ? 'block' : 'none';
      if (this.show) {
        this.$nextTick(() => {
          this.mySwiper();
        });
      }
    },
  },
};
</script>
