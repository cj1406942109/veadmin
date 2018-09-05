<template>
  <div class="content-wrapper">
    <div class="function-wrapper">
      <el-button type="primary"  icon="el-icon-plus" @click="goAdd">新增病历</el-button>
      <el-input placeholder="请输入患者姓名" class="search-box" v-model="searchName" @input="search(0)">
        <template slot="prepend">
          <el-tooltip placement="top">
            <div slot="content">输入患者姓名自动对当前页进行检索<br>点击搜索按钮对所有页面进行检索</div>
            <el-button icon="el-icon-question"></el-button>
          </el-tooltip>
        </template>
        <el-button slot="append" icon="el-icon-search" @click="search(1)"></el-button>
      </el-input>
    </div>
    <div class="table-wrapper">
      <el-table :data="mrList" v-loading.body="mrListLoading" style="width: 100%" stripe>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="name" label="姓名" width="100" sortable></el-table-column>
        <el-table-column prop="gender" label="性别" width="100" sortable
        :filters="[{text:'男', value: '男'}, {text: '女', value: '女'}]"
        :filter-method="filterGender">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.gender === '男' ? '' : 'danger'"
              close-transition>{{scope.row.gender}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="100" sortable></el-table-column>
        <el-table-column label="联系方式">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>手机号1: {{ scope.row.cellphone1 }}</p>
              <p>手机号2: {{ scope.row.cellphone2 }}</p>
              <p>电话: {{ scope.row.telephone }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium" type="info">{{ scope.row.cellphone1 === '' ? '更多' : scope.row.cellphone1 }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="idNum" label="身份证号"></el-table-column>
        <el-table-column prop="medicalCardNum" label="医保卡号" sortable></el-table-column>
        <el-table-column prop="admissionNum" label="住院号" sortable></el-table-column>
        <el-table-column prop="bedNum" label="床位号" sortable></el-table-column>
        <el-table-column label="主治医生" width="150" sortable>
          <template slot-scope="scope">
            {{scope.row.doctor.name}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="goEdit(scope.row._id)">编辑</el-button>
            <!-- <el-button type="success" icon="el-icon-info" size="mini">详情</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.pageNum"
      :page-sizes="[5, 10, 20, 50, 100]"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.pageTotal">
    </el-pagination>
    </div>
  </div>
</template>

<script>
import { getMrList, getMrListByName } from '@/api/mr'
export default {
  data () {
    return {
      // 记录当前病历列表，用于筛选之后数据恢复
      currentMrList: null,
      mrList: null,
      mrListLoading: true,
      pagination: {
        pageSize: 20,
        pageTotal: 0,
        pageNum: 1
      },
      searchName: ''
    }
  },
  mounted () {
    this.getMrList()
  },
  methods: {
    getMrList () {
      getMrList(this.pagination.pageNum, this.pagination.pageSize).then(response => {
        this.mrListLoading = false
        if (response.data.data) {
          this.mrList = this.currentMrList = response.data.data
          this.pagination.pageTotal = response.data.total
        } else {
          this.$message({
            type: 'error',
            message: '病历数据加载失败，请重试'
          })
        }
      })
    },
    goAdd () {
      this.$router.push({ path: '/mr/add' })
    },
    goEdit (id) {
      this.$router.push({ path: `/mr/edit/${id}` })
    },
    filterGender (value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    handleSizeChange (val) {
      this.pagination.pageSize = val
      this.getMrList()
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.pagination.pageNum = val
      this.getMrList()
      // console.log(`当前页: ${val}`)
    },
    search (allPage) {
      if (allPage) {
        if (!this.searchName.trim()) {
          return false
        }
        // 访问后台接口在所有数据中查询
        this.mrListLoading = true
        getMrListByName(this.pagination.pageNum, this.pagination.pageSize, this.searchName).then(response => {
          this.mrListLoading = false
          console.log(response)
          if (response.data.data) {
            this.mrList = response.data.data
            this.pagination.pageTotal = response.data.total
          } else {
            this.$message({
              type: 'error',
              message: '病历数据加载失败，请重试'
            })
          }
        })
      } else {
        // 在当前页面的数据中查询
        console.log(this.searchName)
        let tempList = []
        for (let i = 0; i < this.currentMrList.length; i++) {
          if (this.currentMrList[i].name.indexOf(this.searchName.trim()) >= 0) {
            tempList.push(this.currentMrList[i])
          }
        }
        this.mrList = tempList
        this.pagination.pageTotal = this.mrList.length
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content-wrapper {
  padding: 20px;
  background-color: #fff;
  .function-wrapper {
    padding: 20px;
    .search-box {
      margin-top: 20px;
      max-width: 500px;
    }
  }
  .table-wrapper {
    padding: 0 20px;
    .el-table {
      text-align: center;
    }
    .el-pagination {
      margin: 20px 0;
      text-align: right;
      width: 100%;
      overflow: auto;
    }
  }
}

@media (max-width: 767px) {
  .table-wrapper {
    padding: 0;
  }
}
</style>
