<template>
  <div>
    <HeaderTop title="我的琪琪"/>
    <router-view/>
    <TabBar/>
  </div>
</template>

<script>
    import HeaderTop from '../../components/HeaderTop/HeaderTop'
    import TabBar from '../../components/TabBar/TabBar'
    export default {
        name: "Mine",
        data(){
          return{
          }
        },
        components : {
          HeaderTop,
          TabBar,
        }
    }
</script>

<style scoped>

</style>
