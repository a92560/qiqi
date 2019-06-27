<template>
  <div class="cinema_body">
    <Loading v-show="isLoading"/>
    <div class="cinema_wrapper" style="height: 517px">
      <ul>
        <li v-for="(cinema,index) in cinemaList" :key="index">
          <div>
            <span>{{cinema.nm}}</span>
            <span class="q"><span class="price">{{cinema.sellPrice}}</span> 元起</span>
          </div>
          <div class="address">
            <p><span>{{cinema.addr}}</span></p>
            <span class="distance">{{cinema.distance}}</span>
          </div>
          <div class="card">
            <div v-for="(cinema_card,key) in cinema.tag" :key="key"
                 v-if="cinema_card===1" :class="key|classCard">
              {{key | formatCard}}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    import BScroll from "better-scroll";

    export default {
        name: "CinemaList",
        data (){
          return {
            cinemaList : [], //影院列表数组
            isLoading : false, //是否显示等待动画
            preCityId : -1 , //之前选择的城市ID
          }
        },
        activated() {
          var cityId = this.$store.state.City.id
          if(this.preCityId === cityId){
            return false
          }
          this.isLoading = true
          this.axios.get('/api/cinemaList?cityId='+cityId)
            .then((res) =>{
              let msg = res.data.msg
              if(msg==='ok'){
                this.cinemaList = res.data.data.cinemas
                this.isLoading = false
                this.preCityId = cityId
                this.$nextTick(() =>{
                  new BScroll('.cinema_wrapper',{
                    click: true,
                    probeType : 2,
                  })
                })
              }
            })

        },
        filters : {
          formatCard(key){
            var cards = [
              {key : 'allowRefund',value : '允许退款'},
              {key : 'endorse',value : '赞同'},
              {key : 'sell',value : '折扣'},
              {key : 'snack',value : '小吃'},
            ]
            // cards.forEach((card) =>{
            //   console.log(card)
            // })
            for(var i = 0 ; i < cards.length ; i ++){
              if(cards[i].key===key){
                return cards[i].value
              }
            }
            return ''
          },
          classCard(key){
            var cards = [
              {key : 'allowRefund',value : 'or'},
              {key : 'endorse',value : 'or'},
              {key : 'sell',value : 'bl'},
              {key : 'snack',value : 'bl'},
            ]
            for(var i = 0 ; i < cards.length ; i ++){
              if(cards[i].key===key){
                return cards[i].value
              }
            }
            return ''
          }
        }
    }
</script>

<style scoped>
  .cinema_body{ flex:1; overflow:hidden;width: 100%}
  .cinema_body ul{ padding:20px;}
  .cinema_body li{  border-bottom:1px solid #e6e6e6; margin-bottom: 20px;}
  .cinema_body li:last-child{  border-bottom:1px solid #e6e6e6; margin-bottom: 0}
  .cinema_body div{ margin-bottom: 10px;}
  .cinema_body .q{ font-size: 11px; color:#f03d37;}
  .cinema_body .price{ font-size: 18px;}
  .cinema_body .address{ font-size: 13px; color:#666;width: 280px;padding: 3px 0;}
  .cinema_body .address p{ width: 280px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
  .cinema_body .address .distance{float: right;position: relative;right:-70px;top:12px; }
  .cinema_body .card{ display: flex;}
  .cinema_body .card div{ padding: 0 3px; height: 15px; line-height: 15px; border-radius: 2px; color: #f90; border: 1px solid #f90; font-size: 13px; margin-right: 5px;}
  .cinema_body .card div.or{ color: #f90; border: 1px solid #f90;}
  .cinema_body .card div.bl{ color: #589daf; border: 1px solid #589daf;}
</style>
