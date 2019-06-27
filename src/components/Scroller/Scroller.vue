<template>
    <div class="wrapper">
      <slot></slot>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        name: "Scroller",
        mounted() {
          var scroll = new BScroll('.wrapper',{
            probeType : 2,
            tap : true
          })

          scroll.on('scroll',(pos)=>{
            this.handleToScroll(pos)
          })

          scroll.on('touchEnd',(pos)=>{
            this.handleToTouchEnd(pos)
          })

        },
        props : {
          handleToScroll : {
            type : Function,
            default : function () {
            }
          },
          handleToTouchEnd : {
            type : Function,
            default : function () {
            }
          }
        }
    }
</script>

<style scoped>
  .wrapper{
    height: 100%;
  }
</style>
