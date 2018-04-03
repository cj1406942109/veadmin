<template>
  <div class="content-wrapper">
    <el-row :gutter="20">
      <el-col v-for="card in cardList" :key="card.id" :xs="24" :sm="12"  :md="6">
        <el-card class="box-card">
          <div slot="header">
            <span class="card-title">{{card.title}}</span>
          </div>
          <div class="card-content">
            {{card.content}}
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  data () {
    return {
      cardList: [
        {
          id: 1,
          title: '心血管病一级预防',
          content: '心血管病一级预防'
        },
        {
          id: 2,
          title: '冠心病二级预防',
          content: '冠心病二级预防'
        },
        {
          id: 3,
          title: '脑卒中二级预防',
          content: '脑卒中二级预防'
        },
        {
          id: 4,
          title: '外周血管病二级预防',
          content: '外周血管病二级预防'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .content-wrapper {
    // height: 1500px;
    .box-card {
      margin-bottom: 20px;
      height: 200px;
      color: #fff;
      cursor: pointer;
      .card-title {
        font-size: 18px;
        font-weight: bold;
      }
      .card-content {
        font-size: 16px;
      }
    }
    .el-col:nth-of-type(1) .box-card {
      background-color: #265a88;
    }
    .el-col:nth-of-type(2) .box-card {
      background-color: #5cb85c;
    }
    .el-col:nth-of-type(3) .box-card {
      background-color: #f0ad4e;
    }
    .el-col:nth-of-type(4) .box-card {
      background-color: #d9534f;
    }
  }
</style>
