<template>
  <div id="content">
    <Loading v-show="isLoading"/>
    <div class="city_body">
      <div class="city_list">
        <div>
          <div class="city_hot">
            <h2>热门城市</h2>
            <ul class="clearfix">
              <li v-for="(city,index) in hotList" :key="index" @tap="handleToCity(city.nm,city.id)">{{city.nm}}</li>
            </ul>
          </div>
          <div class="city_sort" ref="city_sort">
            <div v-for="(cities,index) in cityList" :key="index">
              <h2>{{cities.index}}</h2>
              <ul>
                <li v-for="(city,index) in cities.list" :key="index" @tap="handleToCity(city.nm,city.id)">{{city.nm}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="city_index">
        <ul>
          <li v-for="(city,index) in cityList" :key="index" @click="handleToIndex(index)" >{{city.index}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        name: "City",
        data(){
          return{
            cityList: [],   //全部城市
            hotList: [],    //热门城市
            isLoading : false
          }
        },
        mounted() {
          //判断是否有本地存储
          let cityList = window.localStorage.getItem('cityList')
          let hotList = window.localStorage.getItem('hotList')
          if(cityList&&hotList){
            this.isLoading = true
            this.cityList = JSON.parse(cityList)
            this.hotList = JSON.parse(hotList)
            var cityScroll = new BScroll('.city_list',{
              probeType : 2 ,
              tap : true,
              click : true,
            })
            this.isLoading = false
          }else{
            this.isLoading = true
            this.axios.get('/api/cityList').then((res) =>{
              var msg = res.data.msg;
              if(msg==="ok"){
                var cities = res.data.data.cities;
                //[{index:'A',list:[{nm:'acheng',id:123}]}]
                var {cityList,hotList} = this.formatCityList(cities)
                this.cityList = cityList
                this.hotList = hotList
                this.$nextTick(() =>{
                  console.log(1)
                  var cityScroll = new BScroll('.city_list',{
                    probeType : 2 ,
                    tap : true,
                    click : true,
                  })
                })
                this.isLoading = false
                window.localStorage.setItem('cityList',JSON.stringify(this.cityList))
                window.localStorage.setItem('hotList',JSON.stringify(this.hotList))
              }
            })
          }
        },
        methods:{
          //格式化取来的数据
          formatCityList(cities){
            var cityList = [];
            var hotList = [];

            cities.forEach((city) =>{
              if(city.isHot===1){
                hotList.push(city)
              }
            })

            for(var i = 0 ; i < cities.length;i++){
              var firstLetter = cities[i].py.substring(0,1).toUpperCase()
              if(toCom(firstLetter)){    //新添加的索引
                cityList.push({index:firstLetter,list:[{nm:cities[i].nm,id:cities[i].id}]})
              }else{  //已有索引
                for(var j = 0 ; j < cityList.length ; j ++){
                  if(cityList[j].index===firstLetter){
                    cityList[j].list.push({nm:cities[i].nm,id:cities[i].id})
                  }
                }
              }
            }

            //排序  ASCII码
            cityList.sort((n1,n2) =>{
              if(n1.index>n2.index){
                return 1
              }else if(n1.index < n2.index){
                return -1
              }else{
                return 0
              }
            })

            function toCom(firstLetter) {
              for(var i = 0 ; i < cityList.length;i++){
                if(cityList[i].index === firstLetter){
                  return false
                }
              }
              return true
            }
            // console.log(hotList)
            // console.log(cityList)
            return {
              hotList,
              cityList
            }
          },
          //点击对应的字母跳转到对应位置
          handleToIndex(index){
            var h2 = this.$refs.city_sort.getElementsByTagName('h2');
            this.$refs.city_sort.parentNode.parentNode.scrollTop = h2[index].offsetTop
            // console.log(index)
          },
          //跳转到指定的城市
          handleToCity(nm,id){
            this.$store.commit('City/CITY_INFO',{nm,id})
            //本地存储你上次选择的城市的名字和id
            // window.localStorage.setItem('nowNm',nm);
            // window.localStorage.setItem('nowId',id);
            this.$router.push('/movie/nowplaying');
          }
        }

    }
</script>

<style scoped>
  #content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
  .city_body .city_list{ flex:1; overflow: hidden; background: #FFF5F0;}
  .city_body .clearfix:after {
    content: "";
    display: block;
    clear: both;
  }
  .city_body .city_hot{ margin-top: 20px;}
  .city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
  .city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
  .city_body .city_sort div{ margin-top: 20px;}
  .city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
  .city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
  .city_body .city_sort ul li{ line-height: 30px;}
  .city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;background-color: #fff}
  .city_body .city_index li{padding: 1px 0}
</style>
