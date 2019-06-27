<template>
  <div>
    <div class="head_introduction">琪琪管理后台欢迎你：{{$store.state.User.username}}</div class="head_introduction">
    <el-breadcrumb separator="/" style="margin-top: 20px;margin-left: 20px;font-size: 30px">
      <el-breadcrumb-item :to="{ path: '/admin/accountmanagement' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/admin/moviemanagement' }">电影管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/admin/cinemamanagement' }" style="cursor: pointer">影院管理</el-breadcrumb-item>
    </el-breadcrumb>
    <router-view/>
  </div>
</template>

<script>
    export default {
        name: "Admin",
        data(){
          return {
          }
        },
        beforeMount() {
          this.axios.get('/api2/admin').then((res) =>{
            var status = res.data.status
            if(status === 0){
            }else{
              this.$router.push('/mine/login')
            }
          })
        }
    }
</script>

<style scoped>
.head_introduction{
  font-size: 36px;
  margin-left: 20px;
  margin-top: 20px;
  margin-bottom: 30px;
  font-weight: 700;
}
</style>
