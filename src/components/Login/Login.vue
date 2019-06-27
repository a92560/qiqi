<template>
  <div>
    <div class="register_body" v-show="loginWay">
      <div>
        <span class="input_tip">账户:</span><input v-model="username" type="text" class="register_text" placeholder="账户名">
      </div>
      <div>
        <span class="input_tip">{{updatePwd?'新密码:':'密码:'}}</span><input v-model="password" type="password" class="register_text" placeholder="请输入您的密码">
      </div>
      <div class="email">
        <span class="input_tip">邮箱:</span><input v-model="email" type="text" class="register_text" placeholder="请输入您的邮箱">
        <button class="getVerification" @click="handleToVerify" :disabled="!rightEmail">{{this.computeTime?`已发送${this.computeTime}秒`:'获取验证码'}}</button>
      </div>
      <div>
        <span class="input_tip">验证码:</span><input v-model="verify" type="text" class="register_text" placeholder="请输入验证码">
      </div>
      <div class="register_btn" @click="handleToRegister">
        <input type="submit" :value="updatePwd?'修改':'注册'" ref="updatePwd">
      </div>
      <div class="register_link">
        <a href="javascript:;" @click="handleToUpdatePwd">{{updatePwd?'返回注册':'找回密码'}}</a>
        <a href="javascript:;" @click="toLoginCheck"><span class="register_tip">已有账号?直接</span>登录</a>
      </div>
    </div>
    <div class="login_body" v-show="!loginWay">
      <div>
        <span class="input_tip">账户:</span><input type="text" v-model="username" class="login_text" placeholder="账户名/手机号/email">
      </div>
      <div>
        <span class="input_tip">密码:</span><input type="password" v-model="password" class="login_text" placeholder="请输入您的密码" @keyup.enter="handleToLogin">
      </div>
      <div class="login_btn" @click="handleToLogin">
        <input type="submit" value="登录">
      </div>
      <div class="login_link">
        <a href="javascript:;" @click="refresh">返回注册</a>
        <a href="javascript:;" @click="handleToUpdatePwd">找回密码</a>
      </div>
    </div>
    <alert-tip-login :alertText="alertText" v-show="showAlert" @closeTip="closeTip"/>
  </div>

</template>

<script>
    import AlertTipLogin from '../../components/AlertTipLogin/AlertTipLogin'
    export default {
        name: "Login",
        data(){
          return{
            loginWay : true, // 默认表示注册页面
            username : '' ,//用户名
            password : '' ,//密码
            email : '' , //邮箱
            verify : '' , //验证码
            computeTime : 0 , //计算时间
            showAlert : false , //是否显示弹窗
            alertText : '' , //弹窗信息
            updatePwd : false , //
          }
        },
        computed :{
          rightEmail(){
            return /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(this.email)
          }
        },
        beforeMount() {
          this.axios.get('')
        },
        methods:{
          //刷新当前页面
          refresh(){
            window.location.reload()
          },
          //检验登录
          toLoginCheck(){
            //防止updatePwd是true  就跳到注册页面  每次初始化updatePwd的值
            this.updatePwd = false
            this.loginWay = false
          },

          //发送验证码请求
          handleToVerify(){
            if(!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(this.email)){
              this.alertShow('邮箱格式不正确')
            }
            if(this.computeTime){
              return false
            }
            this.axios.get(`/api2/user/verify?email=${this.email}`).then((res) =>{
              var status = res.data.status
              if(status ===0){
                //开启定时器
                this.computeTime = 30
                this.intervalId = setInterval(() =>{
                  this.computeTime --;
                  if(this.computeTime ===0){
                    clearInterval(this.intervalId)
                  }
                },1000)
              }
            })
          },

          handleToRegister(){
            console.log(this.$refs.updatePwd.value)
            if(this.$refs.updatePwd.value === '注册'){
              //处理注册逻辑
              const {username,password,email,verify} = this
              if(!username){
                this.alertShow('用户名不能为空')
                return
              }else if(!password){
                this.alertShow('密码不能为空')
                return
              }else if(!email){
                this.alertShow('邮箱不能为空')
                return
              }else if(!verify){
                this.alertShow('验证码不能为空')
              }else {
                this.axios.post('/api2/user/register',{
                  username : this.username,
                  password : this.password,
                  email : this.email ,
                  verify : this.verify
                }).then((res) =>{
                  var status = res.data.status
                  if(status === 0){
                    this.alertShow('注册成功')

                  }else{
                    this.alertShow('注册失败:' + res.data.msg)
                  }
                })
              }
            }
            else{
              const {username,password,email,verify} = this
              if(!username){
                this.alertShow('用户名不能为空')
                return
              }else if(!password){
                this.alertShow('密码不能为空')
                return
              }else if(!email){
                this.alertShow('邮箱不能为空')
                return
              }else if(!verify){
                this.alertShow('验证码不能为空')
              }else {
                this.axios.post('/api2/user/findPwd',{
                  username : this.username,
                  newPwd : this.password,
                  email : this.email ,
                  verify : this.verify
                }).then((res) =>{
                  var status = res.data.status
                  if(status === 0){
                    this.alertShow('修改成功')
                  }else{
                    this.alertShow('修改失败:' + res.data.msg)
                  }
                })
              }
            }

          },
          //弹窗方法
          alertShow(alertText){
            this.showAlert = true
            this.alertText = alertText
          },

          //点击确定关闭弹窗
          closeTip(){
            //自动登录功能
            if(this.alertText === '注册成功' || this.alertText === '修改成功'){
              this.showAlert = false
              this.loginWay = false
              this.handleToLogin()
            }
            this.showAlert = false
          },

          //处理登录
          handleToLogin(){
            this.axios.post('/api2/user/login',{
              username:this.username,
              password:this.password
            }).then((res) =>{
              var status = res.data.status
              if(status === 0){
                this.$router.push('/mine/profile')
              }else{
                this.alertShow('登录失败:' + res.data.msg)
              }
            })
          },

          handleToUpdatePwd(){
            //修改提示文字
            if(!this.loginWay){
              this.loginWay = true
            }
            this.updatePwd = !this.updatePwd
          }
        },
        components :{
          AlertTipLogin
        }
    }
</script>

<style scoped>
  .input_tip{line-height: 30px;display: inline-block}
  .register_body .register_tip{color: #4e555b}
  .register_body .register_text:first-child{padding-top: 15px}
  .register_body .email{position: relative}
  .register_body .getVerification{position: absolute;top:34px;right: 11px;border: 1px solid #ccc;padding: 12px;font-size: 12px;border-radius: 3px;cursor: pointer;background-color: #cccccc}
  .register_body .register_text{ width:100%; height: 40px; border:none; border-bottom: 1px #ccc solid; padding: 8px 0; outline: none; text-indent: 10px;line-height: 39px;font-size: 16px;}
  .register_body .register_btn{ height:50px; margin:10px;}
  .register_body .register_btn input{ width:100%; height:100%; background:#e54847; border-radius: 3px; border:none; display: block; color:white; font-size: 20px;}
  .register_body .register_link{ display: flex; justify-content:space-between;}
  .register_body .register_link a{ text-decoration: none; margin:5px 5px; font-size: 14px; color:#e54847;cursor: pointer}

  .login_body .login_text:first-child{padding-top: 15px}
  .login_body .login_text{ width:100%; height: 40px; border:none; border-bottom: 1px #ccc solid; padding: 8px 0; outline: none; text-indent: 10px;line-height: 39px;font-size: 16px}
  .login_body .login_btn{ height:50px; margin:10px;}
  .login_body .login_btn input{ width:100%; height:100%; background:#e54847; border-radius: 3px; border:none; display: block; color:white; font-size: 20px;}
  .login_body .login_link{ display: flex; justify-content:space-between;}
  .login_body .login_link a{ text-decoration: none; margin:5px 5px; font-size: 14px; color:#e54847;cursor: pointer}
</style>
