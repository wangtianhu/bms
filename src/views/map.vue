<template>
  <div class="mapFindHouse" v-loading.fullscreen="loading">
    <div class="topNav">
      <div class="title">地图找房</div>
      <div class="icon">
        <div @click="()=>{this.$router.go(-1)}">
          <img src="https://qiniu.harbourhome.com.cn/g_m_23.png?x-oss-process=style/wx-microapp-2" alt />
        </div>
        <div class="lastIcon" @click="()=>{this.$router.push({name:'index'})}">
          <img src="https://qiniu.harbourhome.com.cn/g_m_26.png?x-oss-process=style/wx-microapp-2" alt />
        </div>
      </div>
      <img
        @click="showDrawer = !showDrawer"
        class="avatar"
        v-show="userInfo.img"
        :src="userInfo.img"
        alt
      />
      <img
        @click="()=>{this.$router.replace({name:'login'})}"
        v-show="!userInfo.img"
        src="https://qiniu.harbourhome.com.cn/g_m_16.png?x-oss-process=style/wx-microapp-2"
        alt
      />
    </div>
    <!-- 选择城市 -->
    <div @click="()=>{this.$router.push({name:'chooseCity'})}" class="chooseCity">
      <img src="https://qiniu.harbourhome.com.cn/g_m_14.png?x-oss-process=style/wx-microapp-2" alt />
      {{nowCity.cityName}}
    </div>

    <img
      @click="huizheng"
      class="huizheng"
      :style="{'bottom':this.$store.state.showDownApp ? '1.6rem' : '.6rem'}"
      src="https://qiniu.harbourhome.com.cn/g_m_29.png?x-oss-process=style/wx-microapp-2"
      alt
    />

    <!-- 地图容器 -->
    <div class="baidumap" id="allmap"></div>

    <!-- 社区详情的框 -->
    <div
      :class="shequInfo.houseItemName ? 'mapShequ active' : 'mapShequ'"  
      :style="{'transform': `translateY(${(shequMoveNum/ 2  > 0 ? shequMoveNum / 2  : 0 ) + '%'})`,'padding-bottom':this.$store.state.showDownApp ? '1.8rem' : '.8rem'}"
    >
    <!-- bindtouchstart="mapStar" bindtouchmove="mapMove" bindtouchend="mapEnd" -->
      <div class="tuodong" @touchstart='mapStar' @touchmove='mapMove' @touchend='mapEnd'>
        <img src="https://qiniu.harbourhome.com.cn/wx_index_107.png" />
      </div>

      <div class="shequInfo">
        <img
          @click.stop="collect(-1)"
          style="z-index:100;"
          class="shequCollect"
          :src="`https://qiniu.harbourhome.com.cn/wx_index_${!shequInfo.isAttention ? 35 : 36}.png?x-oss-process=style/wx-microapp-2`"
        />
        <div class="title text_ov">
          {{shequInfo.houseItemName}}
          <div>
            <img src="https://qiniu.harbourhome.com.cn/wx_index_37.png?x-oss-process=style/wx-microapp-2" />
            <div class="text_ov">{{shequInfo.houseItemAddr}}</div>
          </div>
        </div>
        <div class="background" :style="{'background':`url(${shequInfo.houseItemPic ? shequInfo.houseItemPic: 'https://qiniu.harbourhome.com.cn/wx_index_zhanwei.png'})`,'background-size':'cover','background-position':'center'}">
          <div class="cover" @click="toShequ">
            <div class="bounid">{{shequInfo.houseItemNameEng}}</div>
            <div class="line"></div>
            <div class="price">
              <div>¥</div>
              <div class="priceNm">{{~~shequInfo.minMoney + " "}}</div>
              <div>元/月起</div>
            </div>
            <div :class="shequInfo.houseCount > 0 ? 'kezu' : 'kezu active' ">{{shequInfo.houseCount > 0 ? shequInfo.houseCount + '间可租' : '已满租'}}</div>
          </div>
        </div>
        <div class="roomList">
          <div
            class="roomItem"
            v-for="(item,index) in shequInfo.list"
            :key="index"
            @click.prevent="toFx(index)"
          >
            <div class="shequCollect"  @click.stop="collect(index)">
              <img
                :src="`https://qiniu.harbourhome.com.cn/wx_index_${ !item.isAttention ? 33 : 34}.png?x-oss-process=style/wx-microapp-2`"
              />
            </div>
            <div class="room" :style="{'background':`url(${item.roomTypeJson.pics[0] ? item.roomTypeJson.pics[0].big : 'https://qiniu.harbourhome.com.cn/wx_index_zhanwei.png'})`,'background-size':'cover','background-position':'center'}">
            </div>
            <div class="roomInfo">
              <div
                :class="item.reservationCount > 0 ? 'roomKz' : 'active roomKz'"
              >{{item.reservationCount > 0 ? item.reservationCount + '间可租' : '已满租'}}</div>
              <div class="roomName">{{item.name}}</div>
              <div class="roomMinpri" v-if="item.minPrice">￥{{~~item.minPrice}}元/月起</div>
            </div>
          </div>
        </div>
      </div>
      <img
        v-show='shequInfo.houseItemName'
        :class="this.$store.state.showDownApp ? 'closeInfo active' : 'closeInfo'"
        src="https://qiniu.harbourhome.com.cn/wx_index_106.png?x-oss-process=style/wx-microapp-2"
        @click="shouqi"
      />
    </div>

    <!-- 下载横条 -->
    <download-app @closeDownApp="closeDownApp"></download-app>
    <!-- 用户抽屉 -->
    <user-drawer @closeDrawer="closeDrawerB" :showDraw="showDrawer" @touchmove.prevent="()=>{}"></user-drawer>

    <!-- 筛选抽屉 -->
    <el-drawer
      :visible.sync="showSeachDrawer"
      direction="rtl"
      :before-close="handleClose"
      size="82.4%"
      :custom-class="'myDrawer'"
      :modal-append-to-body='false'
      :show-close='false'
    >
      <div class="Seachwrap">
        <!-- 区域 -->
        <div class="areaWrap">
          <div class="title">请选择行政区域</div>
          <ul>
            <li :class="areaIndex == -1 ? 'active' : ''" @click="chooseArea(-1)">不限</li>
            <li
              :class="areaIndex == index ? 'active' : ''"
              @click="chooseArea(index)"
              v-for="(item,index) in areaArr"
              :key="index"
            >{{item.eareName}}</li>
          </ul>
        </div>

        <!-- 品牌 -->
        <div class="boundWrap">
          <div class="title">请选择品牌</div>
          <ul>
            <li @click="chooseBounid(-1)" :class="bounIndex == -1 ? 'active' : ''">不限</li>
            <li
              @click="chooseBounid(index)"
              :class="bounIndex == index ? 'active' : ''"
              v-for="(item,index) in brandArr"
              :key="index"
              v-show="item.logoPic"
            >{{item.key}}</li>
          </ul>
        </div>
        <div class="priceWrap">
          <div class="title">请选择品牌</div>
          <ul>
            <li @click="choosePrice(-1)" :class="priceIndex == -1 ? 'active' : ''">不限</li>
            <li
              @click="choosePrice(index)"
              :class="priceIndex == index ? 'active' :''"
              v-for="(item,index) in priceArr"
              :key="index"
            >{{item.txt}}</li>
          </ul>
        </div>
        <div class="btnWrap">
          <div @click="reset">重置</div>
          <div @click="seachHouse">确定</div>
        </div>
      </div>
    </el-drawer>
    <div class="toastWrap" v-if='showToast'>
        <div class="content">
            {{isCollect?'收藏成功':'取消收藏'}}
        </div>
    </div>
  </div>
</template>
<script>
let that,
  moveStart = 0,
  canCollect,
  map,
  nowChooseShequ,
  CanADDMap = true;
import $ from "jquery";
import BMap from "BMap"; // 导入百度地图
import BMapSymbolSHAPEPOINT from "BMap_Symbol_SHAPE_POINT"; //导入百度地图
import DownloadApp from "../components/DownloadApp"; //下载App组件
import UserDrawer from "../components/UserDrawer"; //右侧用户侧边栏 抽屉组件

export default {
  data() {
    return {
      isCollect:true, //是否收藏
      showToast:false, 
      showSeachDrawer: false, //是否显示  搜索的抽屉
      showDrawer: false, //是否显示用户侧边栏
      loading: false,
      MarkerArr: [], //地图上的圈
      seachSendData: { circle: "", priceRange: "", brandId: "" }, //这个是发送的数据
      shequList: {}, //社区所有的列表
      areaArr: [], //当前城市的商业圈
      brandArr: [], //品牌的数组
      baseShequArr: [], //最基础的数据
      nowCity: this.$store.state.nowCity, //现在的城市名称
      showChooseShequ: -1, //当用户点击地图上的 横条覆盖物的时候  左边显示的数据的索引
      userInfo:this.$store.state.userInfo,
      priceArr: [
        {
          txt: "2000元以下",
          search_money: "0元-2000元"
        },
        {
          txt: "2000元-4000元",
          search_money: "2000元-4000元"
        },
        {
          txt: "4000元-6000元",
          search_money: "4000元-6000元"
        },
        {
          txt: "6000元-8000元",
          search_money: "6000元-8000元"
        },
        {
          txt: "8000元以上",
          search_money: "8000元-30000元"
        }
      ],
      areaIndex: -2, //选择区域
      bounIndex: -2, //选择品牌
      priceIndex: -2, //选择价格
      shequInfo: {}, //社区详情
      shequMoveNum:0, //社区下拉移动的位数
    };
  },
  beforeCreate() {
    // 这个是获取 品牌的
    this.$http
      .post(`${this.$baseUrl3}/v2/sys/zi_dian/get_brandList_by_mark`, {
        mark: "b3a20a28-223f-4cfc-80db-70373111c9c2",
        gcid: "021137"
      })
      .then(r => {
        this.brandArr = r.data.result.list;
      })
      .catch(e => {});
  },
  created() {
    window.scrollTo(0,0);

    that = this;
    // 获取当前区域列表
    that.getCityArea();
    this.seachFun({}, true)
      .then(r => {
        that.baseShequArr = r;
      })
      .catch(e => {
      });
  },
  mounted() {
    that.getAreaShequ();
  },
  components: {
    DownloadApp,
    UserDrawer
  },
  methods: {
    closeToast(){
      setTimeout(()=>{
        this.showToast = false;
      },2000)
    },
    // 触摸开始
    mapStar(e){
      moveStart = e.changedTouches[0].clientY;
      e.preventDefault();
    },
    // 触摸移动
    mapMove(e){
      this.shequMoveNum = Math.floor((e.changedTouches[0].clientY - moveStart) / 2);
      e.preventDefault();
    },
    // 触摸结束
    mapEnd(e){
      e.preventDefault();
      if(this.shequMoveNum >= 40){
        that.shouqi();
      }else{
        this.shequMoveNum = 0;
      }
    },

    // 收起 社区详情的框
    shouqi(){
      nowChooseShequ.init()
      this.shequInfo = {};
    },
    // 前往 房型页面
    toFx(e){
      this.$router.push({name:'roomStyle',params:{communityId:that.shequInfo.houseItemeId,currentIndex:e}});
    },
    // 去社区详情页
    toShequ(){
      this.$router.push({name:'communityDetails',params:{communityId:this.shequInfo.houseItemeId}})
    },
     // 点击收藏
  collect(e) {
    if (!canCollect) {
      canCollect = true;
      if (this.userInfo.phone) {
        let url = `${this.$baseUrl3}/v2/myCollection/my_collection/insert`; //收藏的接口
        // collectionType 1 社区  2 是房型
        let data = {
          collectionType: 1,
          phone: this.userInfo.phone,
          collectionId: that.shequInfo.houseItemeId
        }; //默认是社区的收藏
        if (e == -1) {
          if (that.shequInfo.isAttention) {
            // 点击前是  收藏的状态  点击则是取消收藏
            url = `${this.$baseUrl3}/v2/myCollection/my_collection/delete_my_collection`; //收藏的接口
          }
        } else {
          data.collectionType = 2;
          data.collectionId = that.shequInfo.list[e].id;
          if (that.shequInfo.list[e].isAttention) {
            url = `${this.$baseUrl3}/v2/myCollection/my_collection/delete_my_collection`; //收藏的接口
          }
        }
        this.$http.post(url,data).then(r => {
          if (e == -1) {
            that.shequInfo.isAttention = !that.shequInfo.isAttention;
            that.isCollect = that.shequInfo.isAttention;
          } else {
            let obj = that.shequInfo.list[e]
            obj.isAttention = !obj.isAttention;
            that.shequInfo.list[e]= obj;
            this.isCollect = obj.isAttention;
          }
          that.showToast = true;
          that.closeToast();
          canCollect = false;
        }).catch(e => {
          canCollect = false;
        })
      } else {
        this.$router.push({name:'login'})
        canCollect = false;
      }
    }
  },
    // 重置
    reset() {
      that.seachSendData = { circle: "", brandId: "", priceRange: "" };
      this.areaIndex = -2; //选择区域
      this.bounIndex = -2; //选择品牌
      this.priceIndex = -2; //选择价格
    },
    // 搜索社区
    seachHouse() {
      this.shequInfo = {};
      that.seachFun(that.seachSendData);
      that.showSeachDrawer = false;
    },
    // 点击会正
    huizheng() {
      map.centerAndZoom(that.nowCity.cityName);
    },
    // 关闭筛选抽屉
    handleClose() {
      this.showSeachDrawer = false;
    },
    // 关闭侧边栏
    closeDrawerB(e) {
      this.showDrawer = e;
      // 判断当前用户是否退出登录
    },
    // 关闭下载App
    closeDownApp(e) {
      this.$store.commit("closeApp", e);
      this.showDownApp = false;
    },
    // 获取当前城市的 区域社区分布
    getAreaShequ() {
      that.loading = true;
      // that.nowCity.cityId
      var arr = {};
      arr["gcid"] = "021137";
      arr["cityId"] = that.nowCity.cityId;
      var jsonstr = JSON.stringify(arr);
      this.$http({
        method: "POST",
        url: `${that.$baseUrl3}/v2/myCollection/district/get_district_list?data={\"cityId\":\"${that.nowCity.cityId}\",\"gcid\":\"021137\"}`,
        dataType: "json"
      })
        .then(r => {
          that.MarkerArr = r.data.result.list;
          this.baiduMap(); //实例化百度地图
          that.loading = false;
        })
        .catch(e => {
          that.loading = false;
          that.$message.error("找不到该房源", 2000);
        });
    },
    // 获取城市区域详情
    getCityArea() {
      this.$http
        .post(`${that.$baseUrl3}/v2/item/house_item/get_trading_area_list`, {
          hiCityId: that.nowCity.cityId,
          gcid: "021137"
        })
        .then(r => {
          that.areaArr = r.data.result.list;
        })
        .catch(e => {
          that.$message.error("找不到该房源");
        });
    },
    // 用户选择区域
    chooseArea(e) {
      that.seachSendData.circle = e >= 0 ? that.areaArr[e].eareId : "";
      that.areaIndex = e;
    },
    // 选择品牌
    chooseBounid(e) {
      this.bounIndex = e;
      this.seachSendData.brandId = e >= 0 ? that.brandArr[e].id : "";
    },
    // 选择价格
    choosePrice(e) {
      that.priceIndex = e;
      this.seachSendData.priceRange =   e >= 0 ? that.priceArr[e].search_money : "0元-30000元";
    },
    // 查询的公共方法
    seachFun(data = {}, creat, arrA) {
      return new Promise((res, rej) => {
        that.loading = true;
        this.$http
          .post(
            `${that.$baseUrl4}/harbour-app/appservice/search/houseList`,
            this.$qs.stringify({
              hiCityId: that.nowCity.cityId,
              pageNo: 1,
              pageSize: "500",
              ...data
            })
          )
          .then(r => {
            that.loading = false;
            if (
              (r.data.http_status_code >= 200 &&
                r.data.http_status_code < 300) ||
              r.data.http_status_code == 304
            ) {
              if (r.data.data && r.data.data.list.length > 0) {
                // 处理数据异常的问题
                that.shequList = r.data.data;
                if (!creat) {
                  map.clearOverlays();
                  map.setZoom(13);
                  that.mapPoint(r.data.data.list);
                  map.panTo(new BMap.Point(
                  r.data.data.list[0].lng - 0,
                  (r.data.data.list[0].lat - 0) - 0.02
                  ))
                }
                that.$message({
                  message: `已帮您匹配到${r.data.data.list.length}个社区`,
                  type: "success",
                  duration: 2500
                });
                
                res(r.data.data);
              } else {
                that.$message({
                  message: "未搜索到符合条件的社区",
                  type: "error",
                  duration: 2500
                });
                that.shequList = that.baseShequArr;
              }
            } else {
              that.$message.error("找不到该房源");
              rej(false);
            }
          })
          .catch(e => {
            that.loading = false;
            that.$message.error("找不到该房源");
            rej(e);
          });
      });
    },
    // 百度地图的构建
    baiduMap() {
      // 百度地图API功能
      map = new BMap.Map("allmap", {
        minZoom: 11,
        enableMapClick: false
      });
      map.centerAndZoom(that.nowCity.cityName, 11);
      // 地图
      map.addEventListener("zoomend", function(ev) {
        if (CanADDMap) {
          if (map.getZoom() >= 12) {
            map.clearOverlays();
            that.mapPoint(that.shequList.list);
          }
          if (map.getZoom() == 11) {
            map.clearOverlays();
            that.shequList = that.baseShequArr;
            that.seachSendData = { circle: "", priceRange: "", brandId: "" }; //这个是发送的数据
            that.drawCri(map);
            that.showChooseShequ = -1;
            if(nowChooseShequ){
              that.shouqi();
            }
            that.shequMoveNum = 0;
            that.shequInfo = {};
          }
        }
      });
      function ZoomControl() {
        // 默认停靠位置和偏移量
        this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
        this.defaultOffset = new BMap.Size(10, 60);
      }

      // 通过JavaScript的prototype属性继承于BMap.Control
      ZoomControl.prototype = new BMap.Control();
      // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
      // 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
      ZoomControl.prototype.initialize = function(map) {
        // 创建一个DOM元素
        var div = document.createElement("div");
        // 添加文字说明
        let p1 = div.appendChild(document.createElement("P"));
        let pimg1 = p1.appendChild(document.createElement("img"));
        pimg1.style.width = ".84rem";
        pimg1.style.height = ".84rem";
        pimg1.src = "https://qiniu.harbourhome.com.cn/g_m_27.png?x-oss-process=style/wx-microapp-2";

        p1.style.margin = "0 0 .24rem";
        let p2 = div.appendChild(document.createElement("P"));
        let pimg2 = p2.appendChild(document.createElement("img"));
        pimg2.style.width = ".84rem";
        pimg2.style.height = ".84rem";
        pimg2.src = "https://qiniu.harbourhome.com.cn/g_m_28.png?x-oss-process=style/wx-microapp-2";
        div.childNodes.forEach((item, index) => {
          item.style.width = ".84rem";
          item.style.height = ".84rem";
          item.style.textAlign = "center";
          item.style.lineHeight = ".84rem";
          item.style.fontSize = ".48rem";
          item.style.color = index == 0 ? "#666" : "#D8D8D8";
          item.style.borderRadius = ".08rem";
        });
        // 点击显示筛选
        p1.onclick = function(e) {
          that.showSeachDrawer = true;
        };
        // 点击 前往快速找房
        p2.onclick = function(e) {
          that.$router.push({name:"fastFindHouse"});
        };
        // 添加DOM元素到地图中
        map.getContainer().appendChild(div);
        // 将DOM元素返回
        return div;
      };
      // 创建控件
      var myZoomCtrl = new ZoomControl();
      // 添加到地图当中
      map.addControl(myZoomCtrl); //添加版权控件
    },
    // 画气泡
    drawCri(map) {
      // 复杂的自定义覆盖物
      function ComplexCustomOverlay(point, info, index) {
        this._point = point;
        this.info = info;
        this.index = index;
      }
      ComplexCustomOverlay.prototype = new BMap.Overlay();

      ComplexCustomOverlay.prototype.initialize = function(map) {
        let _this = this; // _this 是  实例化的对象
        this._map = map;
        let circle = (this._wrap = document.createElement("div")); //这个总的容器
        circle.className = `circle_${_this.index}`;
        circle.style.position = "absolute";
        circle.style.zIndex = BMap.Overlay.getZIndex(_this._point.lat);
        circle.style.width = "1.32rem";
        circle.style.height = "1.32rem";
        circle.style.borderRadius = "50%";
        circle.style.background = "#003B62";
        circle.style.textAlign = "center";
        circle.style.color = "white";
        circle.style.fontSize = ".26rem";
        circle.style.opacity = "0.85";
        circle.style.paddingTop = ".32rem";

        circle.addEventListener("touchend", function() {
          CanADDMap = false;
          map.panTo(
            new BMap.Point(
              _this.info.districtList[0].lng,
              _this.info.districtList[0].lat
            )
          );
          map.setZoom(12);
          map.clearOverlays();
          that.seachSendData.circle = _this.info.districtId;
          that.seachFun({ circle: _this.info.districtId },false,_this.info.districtList).then(r => {
              CanADDMap = true;
            });
        });

        let p1 = circle.appendChild(document.createElement("p"));
        p1.appendChild(document.createTextNode(this.info.districtName + "区"));
        let p2 = circle.appendChild(document.createElement("p"));
        p2.appendChild(document.createTextNode(this.info.districtCount + "家"));
        p2.style.fontSize = "14px";
        map.getPanes().labelPane.appendChild(circle);
        return circle;
      };
      // 这个是用来设置当前容器的位置的
      ComplexCustomOverlay.prototype.draw = function() {
        var map = this._map;
        var pixel = map.pointToOverlayPixel(this._point);
        this._wrap.style.left = pixel.x + "px";
        this._wrap.style.top = pixel.y + "px";
      };
      this.MarkerArr.forEach((item, index) => {
        var point = new BMap.Point(item.districtLng, item.districtLat);
        var myCompOverlay = new ComplexCustomOverlay(point, item, index); //传入的 经纬度
        map.addOverlay(myCompOverlay);
      });
    },
    // 画社区详情地点
    mapPoint(mapPointArr) {
      // 复杂的自定义覆盖物
      function ComplexCustomOverlay(point, text, info, marker) {
        this._point = point;
        this._text = text;
        this.pointInfo = info;
        this.marker = marker;
      }

      ComplexCustomOverlay.prototype = new BMap.Overlay();

      ComplexCustomOverlay.prototype.initialize = function(map) {
        let _this = this; // _this 是  实例化的对象
        this._map = map;
        let wrap = (this._wrap = document.createElement("div")); //这个总的容器

        // *******************  横条的样式及子元素
        let div = (_this._div = wrap.appendChild(
          document.createElement("div")
        )); // 这个是横条容器
        // 这个是横条
        div.style.position = "absolute";
        div.style.zIndex = BMap.Overlay.getZIndex(_this._point.lat);
        div.style.color = "white";
        div.style.fontSize = ".28rem";
        div.style.background = "white";
        div.style.whiteSpace = "nowrap";
        div.style.borderRadius = ".06rem";
        div.style.top = "2rem";
        div.style.cursor = "pointer";

        let p1 = div.appendChild(document.createElement("p"));
        p1.appendChild(document.createTextNode(_this._text));
        p1.style.display = "inline-block";
        p1.style.background = "#003B62";
        p1.style.lineHeight = ".6rem";
        p1.style.padding = "0  0.12rem";
        p1.style.margin = "0";
        p1.style.border = "solid 1px #003B62";
        p1.style.borderRadius = ".06rem";
        p1.style.position = "relative";

        div.appendChild(p1);

        let arrow = (this._arrow = document.createElement("div"));
        arrow.style.position = "absolute";
        arrow.style.borderRight = "solid  9px transparent";
        arrow.style.borderLeft = "solid  9px transparent";
        arrow.style.borderTop = "solid 9px #003B62";
        arrow.style.bottom = "-9px";
        arrow.style.left = "calc(50% - 10px)";
        p1.appendChild(arrow);

        // *******************  横条的样式及子元素 结束

        div.addEventListener("touchend", function(ev) {
          that.shequMoveNum = 0
          nowChooseShequ = _this;
          // 初始化当前的 覆盖物
          map.getOverlays().forEach((item, index) => {
            if (item._arrow) {
              // 更改标注的图片
              item.marker.setIcon(
                new BMap.Icon(
                  item.pointInfo.newLogoPic
                    ? item.pointInfo.newLogoPic
                    : "http://wanliu.oss-cn-shanghai.aliyuncs.com/_70f4f40f-4d93-4e8a-8a8e-d8cf69cf4a0b_b.png?x-oss-process=style/wx-microapp-2",
                  new BMap.Size(30, 30),
                  {
                    imageSize: new BMap.Size(30, 30)
                  }
                )
              );
              item._div.style.zIndex =  item._div.style.zIndex> 0 ? -(item._div.style.zIndex) : item._div.style.zIndex;
              item._div.children[0].style.background = "#003B62";
              item._div.children[0].style.border = "solid 1px #003B62";
              item._div.children[0].children[0].style.borderTop = "solid .18rem #003B62";
            }
          });
          map.panTo(new BMap.Point(
              _this._point.lng,
              _this._point.lat - (0.05 * Math.pow(0.5,map.getZoom()- 13))
            ))
          ev.target.parentElement.style.zIndex = (0 - ev.target.parentElement.style.zIndex);
          ev.target.style.background = "#DAB35F";
          ev.target.style.border = "solid 1px #DAB35F";
          ev.target.children[0].style.borderTop = "solid .18rem #DAB35F";

          // 更改当前标注的图片
          _this.marker.setIcon(
            new BMap.Icon(
              _this.pointInfo.selectedlogoPic
                ? _this.pointInfo.selectedlogoPic
                : "http://wanliu.oss-cn-shanghai.aliyuncs.com/_c9364d85-882d-44d2-9986-7d5571cefdc4_b.png",
              new BMap.Size(30, 30),
              { imageSize: new BMap.Size(30, 30) }
            )
          );
          that.shequList.list.forEach((item, index) => {
            if (
              item.lat == _this.pointInfo.lat &&
              _this.pointInfo.lng == item.lng
            ) {
              that.showChooseShequ = index;
            }
          });
          // 获取当前社区的详情
          that.loading = true;
          that.$http
            .post(`${that.$baseUrl3}/v2/item/room_type/get_map_item_list_new`, {
              phone: that.userInfo.phone,
              houseItemid: _this.pointInfo.hiItemid,
              gcid: "021137",
              pageNo: 1,
              pageSize: 100
            })
            .then(r => {
              that.loading = false;
              if(r.data.result.houseItemPic){
                r.data.result.houseItemPic = r.data.result.houseItemPic.split('?')[0] + '?x-oss-process=style/wx-microapp-2'
              }
              r.data.result.list.forEach(item=>{
                if(item.roomTypeJson.pics[0].big){
                  item.roomTypeJson.pics[0].big = item.roomTypeJson.pics[0].big.split('?')[0] + '?x-oss-process=style/wx-microapp-2'
                }
              })
              that.shequInfo = r.data.result;
            })
            .catch(e => {
              that.loading = false;
              that.$message.error("网络连接异常，请稍后再试");
            });
        });
        map.getPanes().labelPane.appendChild(wrap);
        return wrap;
      };
      // 实现隐藏方法 隐藏 横条的方法 target 要隐藏的容器
      ComplexCustomOverlay.prototype.init = function(target) {
          this._div.style.zIndex = - (this._div.style.zIndex)
          this._div.children[0].style.background = "#003B62";
          this._div.children[0].style.border = "solid 1px #003B62";
          this._div.children[0].children[0].style.borderTop = "solid .18rem #003B62";

           // 更改当前标注的图片
          this.marker.setIcon(
            new BMap.Icon(
              this.pointInfo.newLogoPic
                ? this.pointInfo.newLogoPic
                : "http://wanliu.oss-cn-shanghai.aliyuncs.com/_70f4f40f-4d93-4e8a-8a8e-d8cf69cf4a0b_b.png",
              new BMap.Size(30, 30),
              { imageSize: new BMap.Size(30, 30) }
            )
          );
      };
      // 这个是用来设置当前容器的位置的
      ComplexCustomOverlay.prototype.draw = function() {
        var map = this._map;
        var pixel = map.pointToOverlayPixel(this._point);
        this._div.style.left = (pixel.x - parseInt(this._div.offsetWidth * 0.5)) + "px";
        this._div.style.top = (pixel.y - 50)  + "px";
      };
      // 这个修改 标注的图标
      mapPointArr.forEach(item => {
        let pt = new BMap.Point(item.lng, item.lat);
        let myIcon = new BMap.Icon(
          item.newLogoPic
            ? item.newLogoPic
            : "http://wanliu.oss-cn-shanghai.aliyuncs.com/_70f4f40f-4d93-4e8a-8a8e-d8cf69cf4a0b_b.png",
          new BMap.Size(30, 30),
          { imageSize: new BMap.Size(30, 30) }
        );
        let marker2 = new BMap.Marker(pt, { icon: myIcon }); // 创建标注
        var myCompOverlay = new ComplexCustomOverlay(
          pt, //传入的 经纬度
          item.hiItemName, //社区的名字
          item, //社区的详情数据
          marker2 //当前标注的信息
        );
        map.addOverlay(myCompOverlay);
        map.addOverlay(marker2);
      });
    }
  }
};
</script>

<style scoped>
.mapFindHouse {
  overflow: hidden;
  height: 100%;
  -webkit-overflow-scrolling: touch;
  -webkit-transform:translateZ(0);
}
#allmap {
  height:100%;
  width: 100%;
}

.chooseCity {
  position: fixed;
  width: 1.32rem;
  height: 0.6rem;
  line-height: 0.6rem;
  text-align: center;
  font-size: 0.26rem;
  color: #666666;
  top: 1.2rem;
  left: 0.24rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 0.1rem 0px rgba(0, 0, 0, 0.08);
  border-radius: 0.32rem;
  z-index: 9;
}
.chooseCity img {
  width: 0.2rem;
  height: auto;
}

.huizheng {
  position: fixed;
  width: 0.84rem;
  height: 0.84rem;
  bottom: 1.6rem;
  left: 0.14rem;
  z-index: 9;
}
.myDrawer .el-drawer__header{
  display: none !important;
}
.Seachwrap {
  position: relative;
  padding: 0 0.38rem 0 0.6rem;
  margin-top: -0.72rem;
  height: 100%;
}
.Seachwrap > div {
  margin-bottom: 0.2rem;
}
.Seachwrap .title {
  color: #2a2a2a;
  font-size: 0.32rem;
  font-weight:800;
  margin-bottom: 0.2rem;
}
.Seachwrap ul {
  overflow: hidden;
}
.Seachwrap ul li {
  float: left;
  color: #9f9f9f;
  font-size: 0.26rem;
  line-height: 0.56rem;
  border-radius: 0.06rem;
  border: solid 1px #f5f5f5;
  margin-right: 0.2rem;
  margin-bottom: 0.2rem;
  width: 2.4rem;
  background: #f5f5f5;
  text-align: center;
}
.Seachwrap ul li.active {
  color: #003b62;
  border: solid 1px #003b62;
  background: white;
}
.Seachwrap .areaWrap ul li {
  width: 1.52rem;
  margin-bottom: .15rem
}

.btnWrap {
  position: absolute;
  margin-bottom: 0;
  font-size: 0;
  bottom: -.7rem;
  letter-spacing: -0.5em;
}
.btnWrap div {
  width: 2.38rem;
  height: 0.72rem;
  line-height: 0.72rem;
  text-align: center;
  font-size: 0.26rem;
  color: #464646;
  border-radius: 0.06rem;
  background: #ebebeb;
  display: inline-block;
  letter-spacing: 0;
}
#el-drawer__title{
  margin: 0 !important;
}
.btnWrap div:last-child {
  margin-left: 0.24rem;
  background: #003b62;
  color: white;
}

/* 社区详情 */
.mapFindHouse .mapShequ{
  width: 100%;
  height: 56%;
  background: white;
  border-radius: .2rem .2rem 0px 0px;
  padding: 0 .4rem;
  position: fixed;
  transition: all 0.3s;
  z-index: 98;
  bottom: -56%;
  left: 0;
}
.mapFindHouse .mapShequ.active{
  bottom: 0;
  padding-bottom: .5rem;
}

.mapFindHouse .tuodong {
  text-align: center;
  padding: .1rem 0;
  font-size: 0;
  letter-spacing: -0.5em;

}

.mapFindHouse .tuodong img {
  width: .32rem;
  height: auto;
  margin: .14rem auto;
}


::-webkit-scrollbar {
  width: 0 !important;
  height: 0 !important;
  color: transparent !important;
  opacity: 0 !important;
}
.mapFindHouse  .closeInfo{
  position: fixed;
  width: 1.36rem;
  height: .6rem;
  bottom: .28rem;
  right: .32rem;
  z-index: 99999 !important;
}
.mapFindHouse  .closeInfo.active{
  bottom: 1.18rem;
}
.mapFindHouse .shequInfo {
  position: relative;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  width: 100%;
}

.mapFindHouse .shequInfo .title {
  font-size: .36rem;
  color: #2a2a2a;
  font-weight:800;
  max-width: 5.8rem;
  margin-bottom: .24rem;
}

.mapFindHouse .shequInfo .title div {
  font-weight: normal;
  font-size: .2rem;
  color: #4a4a4a;
  margin-top: .08rem;
}

.mapFindHouse .shequInfo .title div img {
  width: .24rem;
  height: auto;
  margin-right: .1rem;
  margin-bottom: -0.04rem;
}

.mapFindHouse .shequInfo .title div div,
.mapFindHouse .shequInfo .title div img {
  display: inline-block;
  vertical-align: middle;
}

.mapFindHouse .shequInfo .title div div {
  max-width: 5.44rem;
}

.mapFindHouse .shequInfo .background {
  width:6.7rem;
  height: 3.4rem;
  border-radius: .1rem;
  position: relative;
  margin-bottom: .32rem;
  background-size:cover !important;
  background-position: center !important;
  border-radius: .1rem;
  overflow: hidden;
}

.mapFindHouse .shequInfo .background .cover {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
  color: white;
  padding-top:.94rem;
  font-size: 0;
  letter-spacing: -0.5em;
}

.mapFindHouse .shequInfo .background .cover .bounid {
  position: relative;
  padding-bottom: 0.04rem;
  margin-bottom: .1rem;
  font-size: .18rem;
  line-height: .26rem;
}

.mapFindHouse .shequInfo .background .cover .line {
  width: .24rem;
  height: .02rem;
  position: absolute;
  background: rgba(255, 255, 255, 0.5);
  top: 1.22rem;
  left: 3.24rem;
}

.mapFindHouse .shequInfo .background .cover .price {
  font-size: .28rem;
  margin-bottom: .22rem;
  font-weight: 800;
}

.mapFindHouse .shequInfo .background .cover .price div {
  display: inline-block;
  vertical-align: middle;
}

.mapFindHouse .shequInfo .background .cover .price .priceNm {
  font-size: .4rem;
  text-align: center;
  border-right: solid 5px rgba(0, 0, 0, 0);
  border-left: solid 5px rgba(0, 0, 0, 0);
}

.mapFindHouse .shequInfo .background .cover .kezu {
  display: inline-block;
  width: 1.24rem;
  height: .4rem;
  border-radius: 0.04rem;
  line-height: .4rem;
  font-size: .24rem;
  background: #dab35f;
}
.mapFindHouse .shequInfo .background .cover .kezu.active{
  background: black;
  color: white;
}

.mapFindHouse .shequCollect {
  position: absolute;
  width: .88rem;
  height: .88rem;
  top: 0;
  right: 0;
  z-index: 99;
  font-size: 0;
  letter-spacing: -0.5em;
} 
.mapFindHouse .shequInfo .roomList{
  width: 100%;
}
.mapFindHouse .shequInfo .roomList .roomItem {
  margin-bottom: .3rem;
  position: relative;
  z-index: 2;
  width: 6.7rem;
}
.mapFindHouse .shequInfo .roomList .roomItem .shequCollect{
  width: .8rem;
  height:.62rem;
  text-align: center;
  top: 0x;
  line-height: .62rem;
}
.mapFindHouse .shequInfo .roomList .roomItem .shequCollect img{
  width: .32rem;
  height: auto;
  display: inline-block;
  text-align: center;
}

.mapFindHouse .shequInfo .roomList .roomItem .roomInfo,
.mapFindHouse .shequInfo .roomList .roomItem .room {
  display: inline-block;
  vertical-align: middle;
  word-break: break-all;
  font-size: 0;
  letter-spacing: -.5em;
}
.mapFindHouse .shequInfo .roomList .roomItem .roomInfo{
  padding-left: .2rem;
}
.mapFindHouse .shequInfo .roomList .roomItem .roomInfo div {
  max-width: 4.1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: .28rem;
}

.mapFindHouse .shequInfo .roomList .room {
  width: 2.36rem;
  height: 1.56rem;
  border-radius: .1rem;
  margin-right: 3 .08rem;
  background-size: cover !important;
  background-position: center !important;
}
.mapFindHouse .shequInfo .roomList .roomKz {
  height: .28rem;
  line-height: .28rem;
  text-align: center;
  font-size: .18rem !important;
  background: #dab35f;
  color: white;
  padding: 0  .08rem;
  border-radius:  .08rem;
  margin-bottom:  .08rem;
  display: inline-block;
  border: solid 1px rgba(0, 0, 0, 0);
  overflow: hidden;
}

.mapFindHouse .shequInfo .roomList .roomKz.active {
  background: #2a2a2a;
  color: white;
  font-size: .18rem !important;
}

.mapFindHouse .shequInfo .roomList .roomName {
  font-size: .28rem;
  color: #464646;
  margin-bottom: .14rem;
  font-weight:800;
  border: solid .02rem rgba(0, 0, 0, 0);
  width: 4.1rem;
}

.mapFindHouse .shequInfo .roomList .roomMinpri {
  font-size: .22rem !important;
  color: #838383;
  border: solid .02rem rgba(0, 0, 0, 0);
  width: 4.1rem;
}

</style>