<template>
  <div id="detailContainer" class="slide-enter-active">
    <Loading v-show="isLoading"/>
    <HeaderTop title="影片详情">
      <i class="iconfont icon-right" slot="icon" @touchstart="handleToBack"></i>
    </HeaderTop>
    <div id="content" ref="contentDetail" class="contentDetail">
      <div class="detail_list">
        <div class="detail_list_bg"></div>
        <div class="detail_list_filter"></div>
        <div class="detail_list_content">
          <div class="detail_list_img">
            <img :src="detailMovie.img | setWH('128.180')" alt="正在加载中">
          </div>
          <div class="detail_list_info">
            <h2>{{detailMovie.nm}}</h2>
            <p>{{detailMovie.enm}}</p>
            <p>{{detailMovie.sc}}</p>
            <p>{{detailMovie.cat}}</p>
            <p>{{detailMovie.src}} / {{detailMovie.dur}}</p>
            <p>{{detailMovie.pubDesc}}</p>
          </div>
        </div>
      </div>
      <div class="detail_intro">
        <p>{{detailMovie.dra}}</p>
      </div>
      <!--<div class="detail_player swiper-container" ref="detail_player">-->
      <!--<ul class="swiper-wrapper">-->
      <!--<li v-for="(photo,index) in detailMovie.photos" :key="index" class="swiper-slide">-->
      <!--<div>-->
      <!--<img :src="photo | setWH('340.249')" alt="">-->
      <!--</div>-->
      <!--</li>-->
      <!--</ul>-->
      <!--</div>-->
      <div class="pic-wrapper">
        <ul class="pic-list" ref="picsUl">
          <li class="pic-item" v-for="(photo, index) in detailMovie.photos" :key="index">
            <img :src="photo|setWH('350.250')"/>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
    import HeaderTop from "../../../components/HeaderTop/HeaderTop";
    import BScroll from 'better-scroll'
    export default {
        name: "MovieDetail",
        components :{
          HeaderTop
        },
        data(){
          return {
            detailMovie : [],  //详细电影数组
            isLoading : false, //是否显示等待动画
          }
        },
        props:['movieId'],
        methods:{
          handleToBack(){
            this.$router.back()
          },
          _initScroll () {
            // 动态计算ul的宽度
            const ul = this.$refs.picsUl
            const liWidth = 350
            const space = 6
            const count = this.detailMovie.photos.length
            ul.style.width = (liWidth + space) * count -space + 'px'

            new BScroll('.pic-wrapper', {
              scrollX: true // 水平滑动
            })
          }
        },
        mounted() {
          this.isLoading = true
          this.axios.get(`/api2/detailMovie?movieId=${this.movieId}`).then((res)=>{
            let msg = res.data.msg
            if(msg ==='ok'){
              this.detailMovie = res.data.data.detailMovie
              this.$nextTick(() =>{
                this.isLoading = false
                // new Swiper(this.$refs.detail_player,{
                //   slidesPerView : 'auto',
                //   freeMode : true,
                //   freeModeSticky: true
                // })
                this._initScroll()
              })
            }
          })
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  #detailContainer{ position: absolute; left:0; top:0; z-index: 100; width:100%; min-height:100%; background:white;}
  #detailContainer.slide-enter-active{ animation:.3s slideMove;}
  @keyframes slideMove{
    0%{ transform : translateX(100%); }
    100%{ transform : translateX(0); }
  }
  #content.contentDetail{ display: block; margin-bottom:0;}
  #content .detail_list{ height:200px; width:100%; position: relative; overflow: hidden;}
  .detail_list .detail_list_bg{ width:100%; height:100%; background: 0 40%; filter: blur(20px); background-size:cover; position: absolute; left: 0; top: 0;}
  .detail_list .detail_list_filter{ width:100%; height:100%; position: absolute;background-color: #40454d;opacity: .55; position: absolute; left: 0; top: 0; z-index: 1;}
  .detail_list .detail_list_content{ display: flex; width:100%; height:100%; position: absolute; left: 0; top: 0; z-index: 2;}
  .detail_list .detail_list_img{ width:108px; height: 150px; border: solid 1px #f0f2f3; margin:20px;}
  .detail_list .detail_list_img img{ width:100%; height: 100%;}
  .detail_list .detail_list_info{ margin-top: 20px;}
  .detail_list .detail_list_info h2{ font-size: 20px; color:white; font-weight: normal; line-height: 40px;}
  .detail_list .detail_list_info p{  line-height: 20px; font-size: 14px; color:#ccc;}
  #content .detail_intro{ padding: 10px;}
  /*.detail_player .swiper-wrapper{width: 100%;height: 100%}*/
  /*.detail_player .swiper-slide{ width:100%; height:100%; text-align: center; font-size: 14px;display: flex;justify-content :center; flex-direction: row;padding: 3px 0}*/
  /*.detail_player .swiper-slide img{ width:100%; height:100%;}*/

  .pic-wrapper
    width: 100%
    overflow: hidden
    white-space: nowrap
    margin-top 16px
    .pic-list
      font-size: 0
      .pic-item
        display: inline-block
        margin-right: 6px
        max-width: 350px
        max-height: 250px
        margin-bottom 10px
        &:last-child
          margin: 0
        &:first-child
          margin-left 5px
</style>
