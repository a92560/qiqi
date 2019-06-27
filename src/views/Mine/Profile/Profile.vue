<template>
  <div>
    <h6>个人中心</h6>
    <div>
      用户名:{{$store.state.User.username || ''}} <button @click="handleToLogout">退出</button>
    </div>
    <div v-if="isAdmin">用户身份：管理员 <router-link to="/admin" target="_blank">进入管理界面</router-link></div>
    <div v-else>用户身份：普通会员</div>
    <AlertTipLogin :alert-text="alertText" v-show="showAlert" @closeTip="closeTip"/>
  </div>

</template>

<script>
    import AlertTipLogin from '../../../components/AlertTipLogin/AlertTipLogin'
    import {MessageBox} from 'mint-ui'
    export default {
        name: "Profile",
        data(){
          return{
            username : '', //需要渲染到此页面的用户名
            alertText : '',
            showAlert : false ,
            isAdmin : false  //是否是管理员
          }
        },
        //防止用户在地址栏输入
        beforeMount() {
          this.axios.get('api2/user/getUser').then((res) =>{
            var status = res.data.status
            if(status === 0){
              var username = res.data.data.username
              this.isAdmin = res.data.data.isAdmin
              localStorage.setItem('username',username)
              localStorage.setItem('isAdmin',this.isAdmin)
              this.$store.commit('User/USER_INFO',{username : username,isAdmin:this.isAdmin})
            }else{
              this.$router.push('/mine/login')
            }
          })
        },
        components : {
          AlertTipLogin
        },
        methods : {

          closeTip(){
            if(this.alertText === '服务器错误,请稍后再试' ){
              this.showAlert = false
            }
            this.showAlert = false
            this.$router.push('/mine/login')
          },
          handleToLogout(){
            //确认是否退出
            MessageBox.confirm('确定要退出吗').then((action) =>{
              this.axios.get('/api2/user/logout').then((res) =>{
                var status = res.data.status
                if(status === 0){
                  localStorage.removeItem('username')
                  localStorage.removeItem('isAdmin')
                  this.$store.commit('User/USER_INFO',{username:'',isAdmin:false})
                  this.$router.push('/mine/login')
                }else{
                  this.showAlert = true
                  this.alertText = '服务器错误,请稍后再试'
                }
              })
            },(action) =>{
              console.log('cancel')
            })

          },
        }
    }
</script>

<style scoped>

</style>
