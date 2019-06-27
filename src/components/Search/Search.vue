<template>
    <div class="search_body">
      <Loading v-show="isLoading"/>
      <div class="search_input">
        <div class="search_input_wrapper">
          <i class="icon-sousuo iconfont"></i>
          <input type="text" v-model="search_kw" placeholder="请输入需要搜索的内容">
        </div>
      </div>
      <div class="search_result" v-show="isShowSearch">
        <h3>电影/电视/综艺</h3>
        <ul>
          <li v-for="(search_movie,index) in moviesList" :key="index">
            <div class="img" @click="handleToDetail(search_movie.id)">
              <img :src="search_movie.img|setWH('128.180')" alt="">
            </div>
            <div class="info">
              <p><span @click="handleToDetail(search_movie.id)">{{search_movie.nm}}</span></p>
              <p>{{search_movie.enm}}</p>
              <p>{{search_movie.cat}}</p>
              <p>{{search_movie.pubDesc}}</p>
            </div>
            <div class="rating">
              {{search_movie.sc}}
            </div>
          </li>
          <!--<li>
            <div class="img">
              <img src="./image/1.png" alt="">
            </div>
            <div class="info">
              <p><span>无名之辈</span>8.5</p>
              <p>A cool fish</p>
              <p>剧情/喜剧/犯罪</p>
              <p>12点17分</p>
            </div>
          </li>-->
        </ul>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Search",
        data(){
          return{
            search_kw :'', //搜索关键词
            moviesList : [] , //搜索返回来的电影数组
            isShowSearch : false, //是否显示搜索返回来的电影数组
            isLoading : false, //时候显示loading组件
          }
        },
        methods:{
          cancelRequest(){
            if(typeof this.source ==='function'){
              this.source('终止请求')
            }
          },
          handleToDetail(movieId){
            this.$router.push(`/movie/detail/1/${movieId}`)
          }
        },
        watch : {
          search_kw(newValue){
            //函数防抖  多次请求
            //判断没有搜索关键字的时候
            if(!newValue){
              this.isShowSearch = false
              return
            }
            var cityId = this.$store.state.City.id
            this.isShowSearch = true
            var that = this
            this.cancelRequest()
            this.isLoading = true
            this.axios.get(`/api/searchList?cityId=${cityId}&kw=${newValue}`,{
              cancelToken: new this.axios.CancelToken(function(c){
                  that.source = c;
              })
            }).then((res) =>{
                //console.log(res)
                let movies = res.data.data.movies.list
                if(movies){
                  this.moviesList = movies
                  this.isLoading = false
                }
              }).catch((error) =>{
                if(this.axios.isCancel(error)){
                  console.log('Request Canceled' , error.msg)  //请求如果取消，这里是返回取消的message
                }else{
                  console.log(error)
                }
              })
          }
        }
    }
</script>

<style>
  #content .search_body{ flex:1; overflow:auto;}
  .search_body .search_input{ padding: 8px 10px; background-color: #f5f5f5; border-bottom: 1px solid #e5e5e5;}
  .search_body .search_input_wrapper{ padding: 0 10px; border: 1px solid #e6e6e6; border-radius: 5px; background-color: #fff; display: flex; line-height: 20px;}
  .search_body .search_input_wrapper i{font-size: 16px; padding: 4px 0;}
  .search_body .search_input_wrapper input{ border: none; font-size: 13px; color: #333; padding: 4px 0; outline: none; margin-left: 5px; width:100%;}
  .search_body .search_result h3{ font-size: 15px; color: #999; padding: 9px 15px; border-bottom: 1px solid #e6e6e6;}
  .search_body .search_result li{ border-bottom:1px #c9c9c9 dashed; padding: 10px 15px; box-sizing:border-box; display: flex;}
  .search_body .search_result li:last-child{ margin-bottom: 52px}
  .search_body .search_result .img{ width: 60px; float:left; }
  .search_body .search_result .img img{ width: 100%; }
  .search_body .search_result .info{ float:left; margin-left: 15px; flex:1;}
  .search_body .search_result .rating{ position: relative;right: -5px;color:#fc7103;font-size: 16px}
  /*.search_body .search_result .info p{ overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}*/
  .search_body .search_result .info p{ height: 22px; display: flex;width:270px; line-height: 22px; font-size: 12px;}
  .search_body .search_result .info p:nth-of-type(1) span:nth-of-type(1){ font-size: 16px; flex:1; overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
  /*.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(2){ font-size: 16px; color:#fc7103;}*/
</style>
