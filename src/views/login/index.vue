<template>
  <div class="app-wrapper">
    <el-container>
      <el-header>
        <img src="./logo.png" alt="logo">
      </el-header>
      <el-main>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="12" :lg="16">
            <div class="info-wrapper">
              <!-- <img src="./tongji.jpg" alt="同济医院"> -->
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
                      <el-radio v-for="userType in userTypeList" :key="userType.id" :label="userType.index">{{userType.label}}</el-radio>
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
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        username: '',
        password: '',
        userType: ''
      },
      userTypeList: [
        {index: 1, label: '医疗专家诊断'},
        {index: 2, label: '大众健康评测'}
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
          this.$message({
            showClose: true,
            message: '登录成功',
            type: 'success'
          })
        } else {
          this.$message({
            showClose: true,
            message: '登录前请先填写账户信息',
            type: 'error'
          })
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
    img {
      height: 60px;
    }
  }
  .info-wrapper {
    img {
      width: 100%;
    }
  }
  .form-wrapper {
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
      .box-card {
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
  }
}
</style>
