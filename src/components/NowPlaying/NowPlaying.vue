<template>
    <div id="content">
      <Loading v-show="isLoading"/>
      <div class="movie_body" ref="movie_body">
        <div class="movie_wrapper" ref="movie_wrapper">
          <ul ref="movieListUl">
            <li v-for="(movie,index) in updateMovieList" :key="index">
              <div class="pic_show" @tap="handleToDetail(movie.id)">
                <img :src="movie.img|setWH('128.180')" alt="正在加载中">
              </div>
              <div class="info_list">
                <h2 @tap="handleToDetail(movie.id)">{{movie.nm}}<img src="../../assets/maxs.png" alt="" v-if="movie.version"></h2>
                <p>观众评 <span class="grade">{{movie.sc}}</span></p>
                <p>主演: {{movie.star}}</p>
                <p>{{movie.showInfo}}</p>
              </div>
              <div class="btn_mall">
                购票
              </div>
            </li>
            <!--<li v-show="pullDownMessage" class="pullDown">{{pullDownMessage}}</li>-->
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        name: "NowPlaying",
        data(){
          return {
            movieList : [],//热映电影数组
            count : 8, //每次上拉刷新得到的电影数据数量
            isLoading: false,  //显示等待动画
            preCityId : -1  //上次城市ID
          }
        },
        //mounted有本地存储的时候再次刷新页面不会触发
        //不会再触发这个事件咯
        //activated 每次切换路由都会触发
        activated() {
          //通过城市切换过来的才重新发请求  只有更新了我的城市ID才重新发请求
          //通过store 获得本地存储的城市ID

          var cityId = this.$store.state.City.id

          //动态计算movie_wrapper的高度
          //获得可视窗口的高度
          var clientHeight = document.documentElement.clientHeight || document.body.clientHeight
          this.$refs.movie_wrapper.style.height = clientHeight-51-52-46+'px'
          //判断有没有切换城市ID
          // if(this.preCityId === cityId){
          //   return false
          // }
          this.isLoading = true
          //切换路由也会重新执行此生命周期的函数
          //如果切换了城市  置空即将更新的电影列表数组
          /*if(this.preCityId !== this.$store.state.City.id){
            this.updateMovieList = []
            this.count = 1
          }*/
          this.axios.get('/api/movieOnInfoList?cityId='+cityId).then((res) =>{
            //console.log(1)
            var msg = res.data.msg;
            if(msg === 'ok'){
              this.movieList = res.data.data.movieList
              if(this.preCityId !== this.$store.state.City.id){
                this.count = 8
              }
              /*
              for(let i = 0 ; i<this.movieCount ; i ++){
                this.updateMovieList.push(this.movieList[i])
              }*/
              this.preCityId = cityId
              this.isLoading =false
              //规定每次拿8条电影数据
              this.$nextTick(() =>{
                // if(this.movieScroll){
                //   return
                // }
                this.movieScroll = new BScroll('.movie_wrapper',{
                  tap : true,
                  probeType :2,    //1表示滚动事件开启但不节流  2表示滚动事件开启但节流
                  // pullDownRefresh : {
                  //   threshold : 100,
                  //   stop : 50
                  // }
                })

                // this.movieScroll.on('scroll',(pos) =>{
                //   if(pos.y>30){
                //     this.pullDownMessage = '正在更新中'
                //   }else if(this.movieScroll.y <= (this.movieScroll.maxScrollY + 50)){
                //     this.UpMessage = '！！！！！！'
                //   }
                // })
                //没有切换路由也能执行
                this.movieScroll.on('touchEnd',(pos) =>{
                 /* if(this.updateMovieList.length >= this.movieList.length){
                    return false
                  }
                  if(this.movieScroll.y <= (this.movieScroll.maxScrollY +50)){
                    this.isLoading = true
                    this.count = this.updateMovieList.length / this.movieCount
                    this.count ++
                    console.log(this.count)
                    //this.$refs.movie_body.height = 487 + 20 + 'px'
                    // console.log(this.movieList)
                    setTimeout(() =>{
                      for(let i = this.updateMovieList.length * (this.count - 1) ; i <Math.min(this.movieList.length,(this.updateMovieList.length*this.count)) ; i++){
                        this.updateMovieList.concat(this.updateMovieList.push(this.movieList[i]))
                      }
                      this.isLoading = false
                    },1000)
                    // this.movieScroll.scrollTo(0,this.movieScroll.maxScrollY)
                    //this.$refs.movie_body.height = 487 + 'px'
                  }*/
                  if(this.count >= this.movieList.length){
                    return false
                  }
                  if(this.movieScroll.y <= (this.movieScroll.maxScrollY +50)) {
                    this.isLoading = true
                    setTimeout(() => {
                      this.count += this.count;
                      this.isLoading = false
                    }, 1000)
                  }
                })
              })
            }
          })

        },
        methods:{
          handleToDetail(movieId){
            this.$router.push(`/movie/detail/1/${movieId}`)
          }
        },
        computed : {
          updateMovieList(){
            return this.movieList.slice(0,this.count)
          }
        }
    }
</script>

<style scoped>
  #content .movie_body{ display: flex;flex-direction:column;overflow: hidden;}
  #content .movie_wrapper{ height: 517px;}
  .movie_body ul{ margin:0 12px; overflow: hidden;}
  .movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
  /*.movie_body ul li:last-child{ margin-bottom: 50px;}*/
  .movie_body .pic_show{ width:64px; height: 90px;}
  .movie_body .pic_show img{ width:100%;}
  .movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
  .movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:185px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
  .movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:230px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
  .movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
  .movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
  .movie_body .btn_mall { width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
  .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
  .movie_body .btn_pre{ background-color: #3c9fe6;}

  /*.movie_body .pullDown{ height: 50px;width:100%;text-align: center;margin: auto}*/
</style>
