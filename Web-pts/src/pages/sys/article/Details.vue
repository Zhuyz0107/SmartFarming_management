<template>
  <div class="details">
    <div><el-button @click="$router.back()" type="text" size="small">返回</el-button></div>
    <div class="header">
      <div class="title"> {{article.title}} </div>
      <div class="title_sub">
        <span> <strong>所属栏目：</strong> {{article.category && article.category.name}}</span>
        <span> <strong>发布时间：</strong> {{article.publishTime | fmtDate}}</span>
      </div>
    </div>
    <div class="content" v-html="article.content"></div>
    <!-- 评论 -->
    <!-- <div class="comment">
      <div>
        <div style="text-align:left; font-size:12px;color:#666;line-height:3em;height:3em">我要评论</div>
        <el-input type="textarea" v-model="form.comment"></el-input>
        <div style="text-align:right;margin:1em 0">
          <el-button type="primary" size="small" @click="submitCommentHandler">提交</el-button>
        </div>
      </div>
      <ul style="font-size:12px;color:#666">
        <li v-for="comment in article.comments" :key="comment.id" style="border-bottom:1px solid #ededed;padding-bottom:1em;margin:.5em 0">
          <div style="width:50px;float:left;overflow:hidden" v-if="comment.baseUser">
            <img style="width:50px;height:50px;border-radius:50%;" :src="comment.baseUser.userFace" alt="">
            
          </div>
          <div style="margin-left:60px;padding:0 .5em">
            <div style="line-height:2em"><strong>{{comment.baseUser.realname}}</strong></div>
            <div style="line-height:2em">{{comment.comment}}</div>
            <div style="line-height:2em">评论时间： {{comment.commentTime | fmtDate}} </div>
          </div>
        </li>
      </ul>
    </div> -->
  </div>
</template>
<script>
import {get,post} from '@/utils/request'
import {mapGetters} from 'vuex'
export default {
  data(){
    return {
      article:{},
      form:{},
      id:undefined
    }
  },
  computed:{
    ...mapGetters(["user"])
  },
  created(){
    this.id = this.$route.query.id;
    this.loadArticle();
  },
  methods:{
    loadArticle(){
      let url = '/article/findById'
      get(url,{id:this.id}).then(response =>{
        this.article = response.data;
      });
    },
    submitCommentHandler(){
      if(this.form.comment && this.form.comment.length>5){
        let url = "/comment/saveOrUpdate"
        this.form.userId = this.user.id;
        this.form.articleId = this.id; 
        post(url,this.form).then(response =>{
          this.$message({type:"success",message:response.message})
          this.form.comment = "";
          this.loadArticle()
        })
      } else {
        this.$message({type:"error",message:"评论内容不能少于5个字符！"})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.details {
  columns: #666666;
  .header {
    text-align: center;

    padding:1em 2em;
    border-bottom: 1px solid #ededed;
    .title {
      font-size: 20px;
      line-height: 2em;
    }
    .title_sub {
      color:#999;
      font-size: 12px;
      line-height: 2em;
    }
  }
  .content {
    padding:1em 0;
  }
  .comment {
    border-top: 1px solid #ededed;
    padding: 1em 0;
  }
  
}
</style>