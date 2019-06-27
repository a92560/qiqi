<template>
  <div>
    <HeaderTop title="琪琪影院"/>
      <div id="content">
        <div class="cinema_menu">
          <div class="city_switch">
            全城<i class="iconfont icon-lower-triangle"></i>
          </div>
          <div class="brand_switch">
            品牌<i class="iconfont icon-lower-triangle"></i>
          </div>
          <div class="feature_switch">
            特色<i class="iconfont icon-lower-triangle"></i>
          </div>
        </div>
      </div>
      <CinemaList/>
    <TabBar/>
  </div>
</template>

<script>
    import HeaderTop from '../../components/HeaderTop/HeaderTop'
    import TabBar from '../../components/TabBar/TabBar'
    import CinemaList from '../../components/CinemaList/CinemaList'
    export default {
        name: "Cinema",
        components : {
          HeaderTop,
          TabBar,
          CinemaList
        }
    }
</script>

<style scoped>
  #content .cinema_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-around; align-items:center; background:white;}
</style>
