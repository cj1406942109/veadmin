<template>
  <div class="content-wrapper">
    <div class="function-wrapper">
      <el-button type="primary"  icon="el-icon-plus" @click="goAdd">新增病历</el-button>
    </div>
    <div class="table-wrapper">
      <el-table :data="mrList" v-loading.body="mrListLoading" style="width: 100%" stripe>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="name" label="姓名" width="100" sortable></el-table-column>
        <el-table-column prop="gender" label="性别" width="100" sortable
        :filters="[{text:'男', value: '1'}, {text: '女', value: '0'}]"
        :filter-method="filterGender">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.gender === '1' ? '' : 'danger'"
              close-transition>{{scope.row.gender === '1' ? '男' : '女'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="contactInfo" label="联系方式"></el-table-column>
        <el-table-column prop="IdCardNo" label="身份证号"></el-table-column>
        <el-table-column prop="medicalCardNo" label="医保卡号" sortable></el-table-column>
        <el-table-column prop="admissionNo" label="住院号" sortable></el-table-column>
        <el-table-column prop="bedNo" label="床位号" sortable></el-table-column>
        <el-table-column prop="doctor" label="主治医生" width="150" sortable></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
            <el-button type="success" icon="el-icon-info" size="mini">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[20, 50, 100, 200, 500]"
      :page-size="50"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
    </div>
  </div>
</template>

<script>
import { getMrList } from '@/api/mr'
export default {
  data () {
    return {
      mrList: null,
      mrListLoading: true
    }
  },
  created () {
    this.getMrList()
  },
  methods: {
    getMrList () {
      getMrList().then(response => {
        this.mrList = response.data
        this.mrListLoading = false
      })
    },
    goAdd () {
      this.$router.push({path: '/mr/add'})
    },
    filterGender (value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
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
