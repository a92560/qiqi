<template>
  <div class="alert_container">
    <section class="tip_text_container">
      <div class="tip_icon">
        <span class="iconfont icon-weizhi"></span>
      </div>
      <p class="tip_text">{{alertText}}</p>
      <p class="tip_location">{{alertLocation}}</p>
      <div class="btn-wrapper">
        <div class="cancel" @click="confirmTip">{{btn_left}}</div>
        <div class="confirm" @click="switchLocation">{{btn_right}}</div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    props: {
      alertText: String,
      alertLocation : String ,
      btn_left : String,
      btn_right : String
    },
    methods: {
      switchLocation() {
        // 分发自定义事件(事件名: closeTip)
        this.$emit('switchLocation')
      },
      confirmTip(){
        this.$emit('confirmTip')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/stylus/mixins.styl';
  @keyframes tipMove
    0%
      transform: scale(1)
    35%
      transform: scale(.8)
    70%
      transform: scale(1.1)
    100%
      transform: scale(1)

  .alert_container
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
    background: rgba(0, 0, 0, .5)
    .tip_text_container
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -90px
      margin-left: -110px
      width: 60%
      animation: tipMove .4s;
      background-color: rgba(255, 255, 255, 1);
      border: 1px;
      padding-top: 20px
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border-radius: 5px
      .tip_icon
        width: 55px
        height: 55px
        border: 2px solid rgba(0, 0, 0, .3);
        border-radius: 50%;
        font-size 20px
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .iconfont
          font-size 32px
          text-align center
        /*span:nth-of-type(1)
          width: 2px
          height: 30px
          background-color: #f8cb86;
        span:nth-of-type(2)
          width: 2px
          height: 2px
          border: 1px;
          border-radius: 50%;
          margin-top: 2px
          background-color #f8cb86*/
      .tip_text
        font-size 14px
        color #333
        line-height 20px
        text-align center
        margin-top 15px
        padding 0 5px
      .tip_location
        font-size 18px
        font-weight bold
        color #333
        line-height 20px
        text-align center
        margin-top 10px
        padding 0 5px
      .btn-wrapper
        width 100%
        margin-top 20px
        .confirm
          font-size 18px
          font-weight bold
          margin-top 10px
          background-color #4cd964
          text-align center
          line-height 35px
          border 1px
          color #fff
          border-bottom-left-radius 5px
          border-bottom-right-radius 5px
          border-top-left-radius 5px
          float left
          width 50%
          &::after
            content ''
            display block
            clear both
        .cancel
          font-size 18px
          font-weight bold
          margin-top 10px
          background-color #4cd964
          text-align center
          line-height 35px
          border 1px
          color #fff
          border-bottom-left-radius 5px
          border-bottom-right-radius 5px
          border-top-right-radius 5px
          float left
          width 50%
          &::after
            content ''
            display block
            clear both
</style>
