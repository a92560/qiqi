import Vue from 'vue'
import Router from 'vue-router'
import Cinema from '../views/Cinema/Cinema'
import Mine from '../views/Mine/Mine'
import Movie from '../views/Movie/Movie'
import Admin from "../views/Admin/Admin"
import Test from "../components/AccountManagement/Test";
Vue.use(Router)

export default new Router({
  //mode : 'history',  //去掉#号的配置
  routes: [
    {
      path: '/cinema',
      name: 'Cinema',
      component: Cinema
    },
    {
      path:'/test',
      name:'Test',
      component : Test
    },
    {
      path:'/admin',
      name : 'Admin',
      component:Admin,
      children : [
        {
          path : 'moviemanagement',
          component : () => import('../components/MovieManagement/MovieManagement')
        },
        {
          path : 'accountmanagement',
          component : () => import('../components/AccountManagement/AccountManagement')
        },
        {
          path : 'cinemamanagement',
          component : () => import('../components/CinemaManagement/CinemaManagement')
        },
        {
          path : '/admin',
          redirect : '/admin/accountmanagement'
        }
      ]
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine,
      children: [
        {
          path:'login',
          component : () => import('../components/Login/Login')  //注意这里是component
        },
        {
          path:'profile',
          component : () => import('../views/Mine/Profile/Profile')
        },
        {
          path:'/mine*',
          redirect : '/mine/login'
        },
      ]
    },
    {
      path: '/movie',
      name: 'Movie',
      component: Movie,
      children : [
        {
          path:'city',
          component : () => import('../components/City/City')
        },
        {
          path:'nowplaying',
          component : () => import('../components/NowPlaying/NowPlaying')
        },
        {
          path:'comingsoon',
          component : () => import('../components/ComingSoon/ComingSoon')
        },
        {
          path:'search',
          component : () => import('../components/Search/Search')
        },
        {
          path:'detail/1/:movieId',
          components : {
            default : ()=>import('../components/NowPlaying/NowPlaying'),
            detail : ()=>import('../views/Movie/MovieDetail/MovieDetail')
          },
          props:{
            detail : true
          }
        },
        {
          path:'detail/2/:movieId',
          components : {
            default : ()=>import('../components/ComingSoon/ComingSoon'),
            detail : ()=>import('../views/Movie/MovieDetail/MovieDetail')
          },
          props:{
            detail : true
          }
        },
        {
          path:'/movie',
          redirect: '/movie/nowplaying'
        }
      ]
    },
    {
      path:'/',
      redirect:'/movie'
    }
  ]
})
