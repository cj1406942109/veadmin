<template>
  <div class="app-wrapper">
    <el-container>
      <el-header>
        <img src="./logo.png" alt="logo">
      </el-header>
      <el-main>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="12" :lg="16" class="hidden-xs-only">
            <div class="info-wrapper">
                <el-carousel indicator-position="outside" height="485px" :interval="5000">
                  <el-carousel-item v-for="item in 3" :key="item">
                    <img :src="imgList[item-1]" alt="同济医院">
                  </el-carousel-item>
                </el-carousel>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="8">
            <div class="form-wrapper">
              <el-card class="box-card">
                <div slot="header" class="form-title">
                  <span>登录到我的账户</span>
                </div>
                <el-form :model="loginForm" ref="loginForm" :rules="formRules" status-icon>
                  <el-form-item label="用户名" prop="username" placeholder="请输入邮箱">
                    <el-input v-model="loginForm.username"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="loginForm.password" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="用户类型" prop="userType">
                    <el-radio-group v-model="loginForm.userType">
                      <el-radio v-for="userType in userTypeList" :key="userType.id" :label="userType">{{userType.label}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item class="form-action">
                    <el-button type="primary" @click="submitForm('loginForm')" :loading="formStatus.loading">{{formStatus.loading?'正在登录...':'登录'}}</el-button>
                  </el-form-item>
                </el-form>
              </el-card>
            </div>
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
import img1 from './tongji_1.jpg'
import img2 from './tongji_2.jpg'
import img3 from './tongji_3.jpg'

export default {
  name: 'login',
  data () {
    return {
      imgList: [
        img1, img2, img3
      ],
      loginForm: {
        username: '',
        password: '',
        userType: ''
      },
      userTypeList: [
        { index: 1, label: '医疗专家诊断', desc: '医疗专家版本' },
        { index: 2, label: '大众健康评测', desc: '大众用户版本' }
      ],
      formStatus: {
        loading: false
      },
      formRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '密码长度为6到16位', trigger: ['blur', 'change'] }
        ],
        userType: [
          { required: true, message: '请选择用户类型', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formStatus.loading = true
          this.$store.dispatch('Login', this.loginForm).then((response) => {
            this.formStatus.loading = false
            console.log(response)
            const data = response.data
            if (data.code === 200) {
              this.$message({
                showClose: true,
                message: '登录成功',
                type: 'success'
              })
              // 跳转到子系统选择页面页面
              this.$router.push({ path: '/login/sub-system' })
            } else if (data.code === 401) {
              this.$message({
                showClose: true,
                message: '用户不存在',
                type: 'error'
              })
            } else if (data.code === 402) {
              this.$message({
                showClose: true,
                message: '用户名或密码错误',
                type: 'error'
              })
            } else {
              this.$message({
                showClose: true,
                message: '登录出错，请稍候再试',
                type: 'error'
              })
            }
          }).catch(() => {
            this.formStatus.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
  .el-main {
    .el-row {
      padding-top: 20px;
      padding-left: 80px;
      .el-col {
        .info-wrapper {
          margin-right: 100px;
          img {
            height: 485px;
          }
        }
        .form-wrapper {
          .box-card {
            max-width: 400px;
          }
          .form-title {
            font-weight: bold;
          }
          .el-radio-group {
            width: 100%;
          }
          .form-action {
            padding-top: 20px;
            button {
              width: 100%;
            }
          }
        }
      }
    }
  }
  .el-footer {
    text-align: center;
    height: 60px;
    font-size: 10px;
    line-height: 60px;
    color: #333;
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
    .el-main {
      padding: 0 30px;
      .el-row {
        padding-left: 0;
      }
      .box-card {
        margin: 0 auto;
        border: none;
        box-shadow: none;
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
    .el-main {
      .el-row {
        padding-left: 30px;
        .el-col {
          .info-wrapper {
            margin-right: 50px;
          }
        }
      }
    }
  }
}
</style>
