<template>
  <div>
    <el-select v-model="location.province" placeholder="请选择省">
      <el-option :label="province" :value="province" v-for="province in provinceList" :key="province.id"></el-option>
    </el-select>
    <el-select v-model="location.city" placeholder="请选择市" :disabled="!cityList||cityList.length==0">
      <el-option :label="city" :value="city" v-for="city in cityList" :key="city.id"></el-option>
    </el-select>
    <el-select v-model="location.area" placeholder="请选择区" :disabled="!areaList||areaList.length==0" v-if="grade > 2">
      <el-option :label="area" :value="area" v-for="area in areaList" :key="area.id"></el-option>
    </el-select>
    <el-select v-model="location.town" placeholder="请选择街道" :disabled="!townList||townList.length==0" v-if="grade > 3">
      <el-option :label="town" :value="town" v-for="town in townList" :key="town.id"></el-option>
    </el-select>
  </div>
</template>

<script>
import address4 from './address4.json'

export default {
  props: {
    location: {
      type: Object,
      default: function () {
        if (this.grade === 2) {
          return {
            province: '',
            city: ''
          }
        }
        if (this.grade === 3) {
          return {
            province: '',
            city: '',
            area: ''
          }
        }
        if (this.grade === 4) {
          return {
            province: '',
            city: '',
            area: '',
            town: ''
          }
        }
      }
    },
    grade: {
      type: Number,
      validator: function (value) {
        return value >= 2 && value <= 4
      },
      default: 3
    }
  },
  data () {
    return {
      provinceList: [],
      cityList: [],
      areaList: [],
      townList: []
    }
  },
  created: function () {
    for (let province in address4) {
      this.provinceList.push(province)
    }
    if (this.location.province) {
      for (let city in address4[this.location.province]) {
        this.cityList.push(city)
      }
    }
    if (this.location.city) {
      for (let area in address4[this.location.province][this.location.city]) {
        this.areaList.push(area)
      }
    }
    if (this.location.area) {
      for (let town in address4[this.location.province][this.location.city][this.location.area]) {
        this.townList.push(address4[this.location.province][this.location.city][this.location.area][town])
      }
    }
  },
  watch: {
    'location.province': {
      handler: 'updateCity'
    },
    'location.city': {
      handler: 'updateArea'
    },
    'location.area': {
      handler: 'updateTown'
    }
  },
  methods: {
    updateCity (val, oldVal) {
      if (val !== oldVal) {
        this.cityList = []
        this.areaList = []
        this.townList = []
        if (address4[val]) {
          for (let city in address4[val]) {
            this.cityList.push(city)
          }
        }
        if (oldVal !== '') {
          this.location.city = ''
          if (this.grade > 3) {
            this.location.area = ''
            this.location.town = ''
          } else if (this.grade > 2) {
            this.location.area = ''
          }
        }
      }
    },
    updateArea (val, oldVal) {
      if (this.location.city) {
        if (val !== oldVal) {
          this.areaList = []
          this.townList = []
          for (let area in address4[this.location.province][val]) {
            this.areaList.push(area)
          }
          if (oldVal !== '') {
            if (this.grade > 3) {
              this.location.area = ''
              this.location.town = ''
            } else if (this.grade > 2) {
              this.location.area = ''
            }
          }
        }
      }
    },
    updateTown (val, oldVal) {
      if (this.location.area) {
        if (val !== oldVal) {
          this.townList = []
          for (var town in address4[this.location.province][this.location.city][val]) {
            this.townList.push(address4[this.location.province][this.location.city][val][town])
          }
          if (oldVal !== '') {
            if (this.grade > 3) {
              this.location.town = ''
            }
          }
        }
      }
    }
  }
}
</script>
