<template>
  <div>
    <HeaderTop title="琪琪电影"/>
      <Loading v-show="isLoading"/>
      <div id="content">
        <div class="movie_menu">
          <router-link to="/movie/city"  tag="div" class="city_name">
            <span>{{this.$store.state.City.nm}}</span><i class="iconfont icon-lower-triangle"></i>
          </router-link>
          <router-link to="/movie/nowplaying"  tag="div" class="hot_switch">
            <div class="hot_item" :class="{active: '/movie/nowplaying'===$route.path}">正在热映</div>
          </router-link>
          <router-link to="/movie/comingsoon"  tag="div" class="hot_switch">
            <div class="hot_item" :class="{active: '/movie/comingsoon'===$route.path}">即将上映</div>
          </router-link>
          <router-link to="/movie/search" tag="div" class="search_entry">
            <i class="iconfont icon-sousuo"></i>
          </router-link>
        </div>
        <keep-alive>
          <router-view/>
        </keep-alive>
      </div>
    <AlertTip :alertText="alertText" :alertLocation="alertLocation" :btn_left="btn_left"
              :btn_right="btn_right" @switchLocation="switchLocation" @confirmTip="confirmTip"
              v-show="showAlert"/>
    <TabBar/>
    <router-view name="detail"></router-view>
  </div>
</template>

<script>
    import HeaderTop from '../../components/HeaderTop/HeaderTop'
    import TabBar from '../../components/TabBar/TabBar'
    import AlertTip from '../../components/AlertTip/AlertTip'
    import {MessageBox} from 'mint-ui'
    export default {
        name: "Movie",
        data(){
          return{
            isLoading : false, //是否加载loading动画
            alertText : '检测到你的位置为',  //弹窗提示文本
            alertLocation : '' ,  //弹窗提示地址
            showAlert : false , //是否显示弹窗
            locationAllow : false, //是否允许获取位置
            cityNm:'',//
            cityId: -1 ,//
            btn_left : '确定',
            btn_right: '切换定位'
          }
        },
        components : {
          HeaderTop,
          TabBar,
          AlertTip
        },
        methods:{
          //是否允许获取位置
          allowLocation(){
            MessageBox.confirm('是否允许获取你的位置').then((action) =>{
              this.locationAllow = true
            },(action) =>{
              return false
            })
          },
          //点击了切换定位
          switchLocation(){
            this.showAlert = false
            this.$router.push('/movie/city')

          },
          //点击了确定
          confirmTip(){
            this.showAlert = false
            //将城市的名字和id信息存储到本地存储
            window.localStorage.setItem('nowNm',this.cityNm)
            window.localStorage.setItem('nowId',this.cityId)
            window.location.reload()
          }
        },
        activated() {
            //判断本地是否有存储的城市名字和id  如果有 代表已经授权 直接获取渲染重载页面即可
            if(window.localStorage.getItem('nowId')&&window.localStorage.getItem('nowNm')){
              return false
            } else{
              this.allowLocation()
              //如果允许获取位置
              setTimeout(() =>{
                if(this.locationAllow){
                  this.axios.get('/api/getLocation')
                    .then((res) =>{
                      let msg = res.data.msg
                      if(msg==='ok'){
                        //存储得到的城市的名字
                        this.cityNm = res.data.data.nm
                        this.cityId = res.data.data.id
                        this.alertLocation = this.cityNm
                        this.showAlert = true
                      }
                    })
                }
              },3000)
            }

        }
    }
</script>

<style scoped>
  #content .movie_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-between; align-items:center; background:white; z-index:10;}
  .movie_menu .city_name{ margin-left: 20px; height:100%; line-height: 45px;}
  .movie_menu .city_name.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
  .movie_menu .city_name.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
  .movie_menu .hot_switch{ display: flex; height:100%; line-height: 45px;}
  .movie_menu .hot_item{ font-size: 15px; color:#666; width:80px; text-align:center; margin:0 12px; font-weight:700;}
  .movie_menu .hot_item.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
  .movie_menu .hot_item.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
  .movie_menu .search_entry{ margin-right:20px; height:100%; line-height: 45px;}
  .movie_menu .search_entry.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
  .movie_menu .search_entry.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
  .movie_menu .search_entry i{  font-size:24px; color:red;}

  .slide-enter-active{ animation : 13s detailMove;}
  @keyframes detailMove{
    0%{
      transform : translateX(100%);
    }
    100%{
      transform : translateX(0);
    }
  }
</style>
