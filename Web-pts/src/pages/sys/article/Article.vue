<template>
  <div class="my_article">
    <!-- 按钮 -->
    <div class="btns">
      <el-row>
        <el-col :span="18">
          <el-form :inline="true" :model="param" size="small">
            <el-form-item label="标题">
              <el-input v-model="param.title"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6" style="text-align:right">
          <el-button type="primary" size="small" @click="toPublishArticle">发布资讯</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 表格 -->
    <el-table :data="articleData.list" style="width: 100%" size="mini" v-loading="loading" @row-click="toDetails">
      <el-table-column label="封面" width="150">
        <template slot-scope="scope">
          <img :src="scope.row.cover" alt="" style="width:100%">
        </template>
      </el-table-column>
      <el-table-column label="风采" >
        <template slot-scope="scope">
          <h3>{{scope.row.title}}</h3>
          <div>{{scope.row.category && scope.row.category.name}}</div>
          {{moment(scope.row.publishTime).format("YYYY-MM-DD")}}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === '审核通过'" type="success">{{scope.row.status}}</el-tag>
          <el-tag v-else-if="scope.row.status === '审核不通过'" type="danger">{{scope.row.status}}</el-tag>
          <el-tag v-else-if="scope.row.status === '推荐'" type="warning">{{scope.row.status}}</el-tag>
          <el-tag v-else type="info">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
    
      <el-table-column prop="readTimes" label="阅读次数" width="100" align="center"/>
      <el-table-column prop="thumpUp" label="点赞次数" width="100" align="center" />
      <!-- <el-table-column prop="thumpDown" label="状态" width="80" /> -->
     
      <el-table-column fixed="right" label="操作" align="center" width="100" >
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click.prevent="toEditArticle(scope.row)">编辑</el-button>
          <el-button type="text" size="mini" @click.prevent="deleteArticleById(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
     <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" small
      :hide-on-single-page="true"
      :total="articleData.total" 
      :page-size="articleData.pageSize" 
      :current-page="articleData.page"
      @current-change="currentChangeHandler">
    </el-pagination>
  </div>
</template>

<script>
import {get} from '@/utils/request'
import moment from 'moment'
import {mapGetters} from 'vuex'
export default {
  // 模板中要用到的变量
  data() {
    return {
      tableData: [],
      loading:false,
      param:{
        page:1,
        pageSize:13,
        categoryId:3    //风采
      },
      articleData:{
        list:[]
      }
    }
  },
  // 声明周期钩子函数
  created() {
    // 查询所有资讯信息
    this.loadArticles();
  },
  computed:{
    ...mapGetters(['user'])
  },
  watch:{
    param:{
      handler:function(old,now){
        this.loadArticles();
      },
      deep:true
    }
  },
  // 方法，模块中要用到的方法，
  methods: {
    moment,
    toDetails(row){
      this.$router.push({
        path:"/sys/article/Details",
        query:{id:row.id}
      })
    },  
    // 通过id删除
    deleteArticleById(row){
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        get('/article/deleteById',{id:row.id})
        .then(response =>{
          this.$message({type:'success',message:response.message})
          this.loadArticles();
        })
      })
    },
    loadArticles(){
      this.loading = true;
      this.param.authorId = this.user.id;
      get('/article/pageQuery',this.param)
      .then(response => {
        this.articleData = response.data
        this.loading = false;
      })
    },
    toPublishArticle() {
      // 跳转页面
      this.$router.push({
         path: '/sys/article/Publish' 
      })
    },
    toEditArticle(row) {
      this.$router.push({
        path: '/sys/article/Publish',
        query:row
      })
    },
    // 当前页发生改变
    currentChangeHandler(page){
      this.param.page = page;
    }
  }
}
</script>
