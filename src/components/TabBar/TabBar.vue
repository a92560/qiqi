<template>
    <footer id="footer">
      <ul>
        <router-link tag="li" :class="{active: '/movie'===$route.path}" class="iconfont icon-dianying" to="/movie">
          <p>电影</p>
        </router-link>
        <router-link tag="li" :class="{active: '/cinema'===$route.path}" class="iconfont icon-yingyuan" to="/cinema">
          <p>影院</p>
        </router-link>
        <router-link tag="li" :class="{active: '/mine'===$route.path}" class="iconfont icon-wode" to="/mine">
          <p>我的</p>
        </router-link>
      </ul>
    </footer>
</template>

<script>
    export default {
        name: "TabBar"
    }
</script>

<style scoped>
  #footer{ width:100%; height:50px; background: white; border-top:2px #ebe8e3 solid; position: fixed; left: 0; bottom:0;z-index: 1}
  #footer ul{ display: flex; text-align: center; height:50px; align-items:center;width: 100%;}
  #footer ul li{ flex:1; height:40px;margin-top: 8px}
  #footer ul li.router-link-active{ color: #f03d37;}
  #footer ul i{ font-size: 20px;}
  #footer ul p{ font-size: 12px; line-height: 18px;}
</style>
