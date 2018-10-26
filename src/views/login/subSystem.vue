<template>
  <div class="app-wrapper">
    <el-container>
      <el-header>
        <img src="./logo.png" alt="logo">
      </el-header>
      <el-main>
        <h2>心血管疾病三级防治管理系统</h2>
          <el-alert title="请选择要进入的子系统" type="warning" show-icon :closable="false"></el-alert>
        <el-row :gutter="20">
          <el-col v-for="card in cardList" :key="card.id" :xs="24" :sm="12"  :md="6">
            <el-card class="box-card" @click.native="goSystem(card)">
              <div slot="header">
                <span class="card-title">{{card.title}}</span>
              </div>
              <div class="card-content">
                {{card.content}}
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
      <el-footer>
        <span>{{new Date().getFullYear()}} &copy; <abbr title="Intelligent Medical">IM</abbr> </span>
        <span>Powered by <abbr title="WuHan University">WHU</abbr> |
          <a target="_blank" href="javascript:;">LiBingTeam</a>
        </span>
      </el-footer>
    </el-container>
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
          content: '心血管病一级预防子系统'
        },
        {
          id: 2,
          title: '冠心病二级预防',
          content: '冠心病二级预防子系统'
        },
        {
          id: 3,
          title: '脑卒中二级预防',
          content: '脑卒中二级预防子系统'
        },
        {
          id: 4,
          title: '外周血管病二级预防',
          content: '外周血管病二级预防子系统'
        }
      ]
    }
  },
  methods: {
    goSystem (system) {
      if (system.id === 2) {
        this.$router.push({ 'path': '/' })
      } else {
        this.$alert('该子系统暂时不可用，请重新选择', '系统说明', {
          confirmButtonText: '确定'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  .el-header {
    padding: 0 100px;
    border-bottom: 1px solid #eee;
    img {
      height: 60px;
    }
  }
  .el-footer {
    text-align: center;
    height: 60px;
    font-size: 10px;
    line-height: 60px;
    color: #333;
  }
  h2 {
    text-align: center;
    margin-bottom: 30px;
  }
  .el-alert {
    margin: 0 auto;
    max-width: 300px;
    margin-bottom: 30px;
  }
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
    background-color: rgba(#265a88, 0.7);
    cursor: not-allowed;
  }
  .el-col:nth-of-type(2) .box-card {
    background-color: rgba(#5cb85c, 1);
  }
  .el-col:nth-of-type(3) .box-card {
    background-color: rgba(#f0ad4e, 0.7);
    cursor: not-allowed;
  }
  .el-col:nth-of-type(4) .box-card {
    background-color: rgba(#d9534f, 0.7);
    cursor: not-allowed;
  }
}
@media (max-width: 767px) {
  .app-wrapper {
    .el-header {
      padding: 0 20px;
      img {
        height: 40px;
        margin-top: 10px;
      }
    }
  }
}
@media (min-width: 768px) and (max-width: 1200px) {
  .app-wrapper {
    .el-header {
      padding: 0 50px;
      img {
        height: 50px;
        margin-top: 5px;
      }
    }
  }
}
</style>
