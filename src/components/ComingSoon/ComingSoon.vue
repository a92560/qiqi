<template>
    <div class="movie_body">
      <Loading v-show="isLoading"/>
      <div class="movie_wrapper" ref="movie_wrapper">
        <ul>
          <li v-for="(coming,index) in comingList" :key="index">
            <div class="pic_show" @tap="handleToDetail(coming.id)"><img :src="coming.img|setWH('128.180')" alt="正在加载中"></div>
            <div class="info_list">
              <h2 @tap="handleToDetail(coming.id)">{{coming.nm}}<img src="../../assets/maxs.png" v-if="coming.version"></h2>
              <p><span class="person">{{coming.wish}}</span> 人想看</p>
              <p>主演: {{coming.star}}</p>
              <p>{{coming.showInfo}}</p>
            </div>
            <div class="btn_pre">
              预售
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        name: "ComingSoon",
        data(){
          return {
            comingList : [], //即将上映电影数组
            isLoading : false, //是否显示等待动画
            preCityId : -1 , //之前选择的城市ID
          }
        },
        activated() {
          //动态计算movie_wrapper的高度
          var clientHeight = document.documentElement.clientHeight || document.body.clientHeight
          this.$refs.movie_wrapper.style.height = clientHeight-51-52-46+'px'

          var cityId = this.$store.state.City.id
          if(this.preCityId === cityId){
            return false
          }
          this.isLoading = true
          this.axios.get('/api/movieComingList?cityId='+cityId)
            .then((res) =>{
              //console.log(res)
              let msg = res.data.msg
              if(msg==='ok'){
                this.comingList = res.data.data.comingList
                this.preCityId = cityId
                this.isLoading = false
              }
            })
            .catch((error) =>{
              console.log(error)
            })
            this.$nextTick(()=>{
              new BScroll('.movie_wrapper',{
                click : true,
                probeType : 2,
                tap : true
              })
            })
        },
        methods:{
          handleToDetail(movieId){
            this.$router.push(`/movie/detail/2/${movieId}`)
          }
        }
    }
</script>

<style scoped>
  #content .movie_body{ flex:1; overflow:hidden;}
  .movie_body ul{ margin:0 12px; overflow: hidden;}
  .movie_body .movie_wrapper{ height: 517px}
  .movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
  /*.movie_body ul li:last-child{ margin-bottom: 52px;}*/
  .movie_body .pic_show{ width:64px; height: 90px;}
  .movie_body .pic_show img{ width:100%;}
  .movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
  .movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
  .movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
  .movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
  .movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
  .movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
  .movie_body .btn_pre{ background-color: #3c9fe6;}
</style>
