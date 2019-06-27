<template>
  <div style="margin-top: 35px">
    <el-table
      :data="userList"
      border
      style="width: 95%;margin: 20px">
      <el-table-column
        fixed
        prop="username"
        label="用户名"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.isSet">
              <el-input size="mini" placeholder="请输入内容" v-model="scope.row.username">
              </el-input>
          </span>
          <span v-else>{{scope.row.username}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="注册日期">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="handleToFreeze(scope.$index,scope.row)" size="middle">{{scope.row.isFreeze?'已冻结':'未冻结'}}</el-button>
          <el-button type="danger" size="small" @click="handleToDelete(scope.$index,scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {_throttle,_debounce} from "../../utils/throttle";
  export default {
    methods: {

      handleToFreeze : _throttle(function(index,row) {
        this.axios.post('/api2/admin/updateFreeze',{
          email : row.email,
          isFreeze : !row.isFreeze
        }).then((res) =>{
          var status = res.data.status
          if(status ===0){
            this.fetch()
            this.$message({
              type: 'success',
              message: '冻结操作成功'
            })
          }
        })
      },2000),

    /* handleToFreeze : _debounce(function (index,row) {
       this.axios.post('/api2/admin/updateFreeze',{
         email : row.email,
         isFreeze : !row.isFreeze
       }).then((res) =>{
         var status = res.data.status
         if(status ===0){
           this.fetch()
           this.$message({
             type: 'success',
             message: '冻结操作成功'
           })
         }
       })
     },1000),*/
      handleToDelete(index,id){
        this.axios.post('/api2/admin/deleteUser',{
          id:id
        }).then((res) =>{
          var status = res.data.status
          if(status === 0){
            this.$message({
              type: 'success',
              message: '删除操作成功'
            })
            this.fetch()
          }else{
            this.$message({
              type: 'error',
              message: '删除操作成功'
            })
          }
        })
      },
      //获取数据
      fetch(){
        this.axios.get('/api2/admin/userList').then((res) =>{
          var status = res.data.status
          if(status === 0){
            this.userList = res.data.data.userList
          }
        })
      },

    },

    data() {
      return {
        userList : [],  //用户列表
      }
    },
    mounted() {
      this.fetch()
    },
    computed : {
    }
  }
</script>

<style scoped>

</style>
