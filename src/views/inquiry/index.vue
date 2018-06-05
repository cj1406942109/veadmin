<template>
  <div class="content-wrapper">
    <div class="step-wrapper">
      <el-steps :active="activeStep" align-center finish-status="success">
        <el-step :title="item.title" :description="item.desc" v-for="item in stepList" :key="item.id"></el-step>
      </el-steps>
      <el-collapse>
        <el-collapse-item name="1">
          <template slot="title">
            <el-button type="text" icon="el-icon-info">预测评估结果</el-button>
          </template>
          <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
          <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <el-form ref="inquiryForm" :model="inquiryForm" :rules="rules" label-width="100px" :label-position="position">
      <el-card v-if="activeStep===0">
        <div slot="header" class="clearfix">
          <span>典型症状相关信息</span>
        </div>
        <div>
          <h3>胸痛</h3>
          <el-form-item label="部位">
            <el-checkbox-group v-model="inquiryForm.chestPain.bodyParts">
              <el-checkbox v-for="item in localIndex.bodyPartList" :key="item.id" :label="item.id">{{item.text}}</el-checkbox>
            </el-checkbox-group>
            <el-input clearable v-model="inquiryForm.chestPain.diseaseBodyPartsOthers"
            v-if="inquiryForm.chestPain.bodyParts.indexOf('13')>=0"
            placeholder="填写其他部位"></el-input>
          </el-form-item>
          <el-form-item label="放射部位">
            <el-checkbox-group v-model="inquiryForm.chestPain.radiationSites">
              <el-checkbox v-for="item in localIndex.radiationSiteList" :key="item.id" :label="item.id">{{item.text}}</el-checkbox>
            </el-checkbox-group>
            <el-input clearable v-model="inquiryForm.chestPain.radiationSitesOthers"
            v-if="inquiryForm.chestPain.radiationSites.indexOf('13')>=0"
            placeholder="填写其他放射部位"></el-input>
          </el-form-item>
          <el-form-item label="范围">
            <el-radio-group v-model="inquiryForm.chestPain.range">
              <el-radio :label="item.id" v-for="item in localIndex.rangeList" :key="item.id">{{item.text}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="性质">
            <el-checkbox-group v-model="inquiryForm.chestPain.qualityOfPain">
              <el-checkbox v-for="item in localIndex.qualityList" :key="item.id" :label="item.id">{{item.text}}</el-checkbox>
            </el-checkbox-group>
            <el-input clearable v-model="inquiryForm.chestPain.qualityOfPainOthers"
            v-if="inquiryForm.chestPain.qualityOfPain.indexOf('14')>=0"
            placeholder="填写其他性质"></el-input>
          </el-form-item>
          <el-form-item label="程度">
            <el-radio-group v-model="inquiryForm.chestPain.degree">
              <el-radio :label="item.id" v-for="item in localIndex.degreeList" :key="item.id">{{item.text}}</el-radio>
            </el-radio-group>
            <el-select v-model="inquiryForm.chestPain.progression" placeholder="请选择发展方式" style="margin-left: 20px;">
              <el-option :label="item.text" :value="item.id" v-for="item in localIndex.progressionList" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="突发">
            <el-radio-group v-model="inquiryForm.chestPain.sudden">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="持续时间">
            <el-radio-group v-model="inquiryForm.chestPain.duration">
              <el-radio :label="item.id" v-for="item in localIndex.durationList" :key="item.id">{{item.text}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="缓解因素">
            <el-checkbox-group v-model="inquiryForm.chestPain.relievingFactors">
              <el-checkbox v-for="item in localIndex.relievingFactorList" :key="item.id" :label="item.id">{{item.text}}</el-checkbox>
            </el-checkbox-group>
            <el-input clearable v-model="inquiryForm.chestPain.relievingFactorsOthers"
            v-if="inquiryForm.chestPain.relievingFactors.indexOf('5')>=0"
            placeholder="填写其他缓解因素"></el-input>
          </el-form-item>
          <el-form-item label="诱因">
            <el-checkbox-group v-model="inquiryForm.chestPain.precipitatingFactors">
              <el-checkbox v-for="item in localIndex.precipitatingFactorList" :key="item.id" :label="item.id">{{item.text}}</el-checkbox>
            </el-checkbox-group>
            <el-input clearable v-model="inquiryForm.chestPain.precipitatingFactorsOthers"
            v-if="inquiryForm.chestPain.precipitatingFactors.indexOf('9')>=0"
            placeholder="填写其他诱因"></el-input>
          </el-form-item>
          <el-form-item label="伴随症状">
            <el-checkbox-group v-model="inquiryForm.chestPain.simultaneousPhenomena">
              <el-checkbox v-for="item in localIndex.simultaneousPhenomenonList" :key="item.id" :label="item.id">{{item.text}}</el-checkbox>
            </el-checkbox-group>
            <el-input clearable v-model="inquiryForm.chestPain.simultaneousPhenomenonOthers"
            v-if="inquiryForm.chestPain.simultaneousPhenomena.indexOf('31')>=0"
            placeholder="填写其他伴随症状"></el-input>
          </el-form-item>
          <h3>呼吸困难</h3>
          <el-form-item label="原因不明">
            <el-radio-group v-model="inquiryForm.dyspnea.unknownOrigin">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="突发">
            <el-radio-group v-model="inquiryForm.dyspnea.isSudden">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="端坐呼吸">
            <el-radio-group v-model="inquiryForm.dyspnea.orthopnoea">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="程度">
            <el-radio-group v-model="inquiryForm.dyspnea.degree">
              <el-radio :label="item.id" v-for="item in localIndex.degreeList" :key="item.id">{{item.text}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
      </el-card>
      <el-card v-if="activeStep===1">
        <div slot="header" class="clearfix">
          <span>危险因素相关信息</span>
        </div>
        <div>
          <el-form-item label="年龄" prop="age">
            <el-input clearable v-model.number="inquiryForm.age"></el-input>
          </el-form-item>
          <el-form-item label="冠心病">
            <el-checkbox-group v-model="inquiryForm.riskFactors.acs">
              <el-checkbox v-for="item in localIndex.riskFactorList1" :key="item.id" :label="item.id">{{item.text}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="主动脉夹层">
            <el-checkbox-group v-model="inquiryForm.riskFactors.aorticDissection">
              <el-checkbox v-for="item in localIndex.riskFactorList2" :key="item.id" :label="item.id">{{item.text}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="其他">
            <el-checkbox-group v-model="inquiryForm.riskFactors.others">
              <el-checkbox v-for="item in localIndex.riskFactorList3" :key="item.id" :label="item.id">{{item.text}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>
      </el-card>
      <el-card v-if="activeStep===2">
        <div slot="header" class="clearfix">
          <span>体格检查相关信息</span>
        </div>
        <div>
          <el-form-item label="视诊">
            <el-checkbox-group v-model="inquiryForm.physicalExamination.visualExam">
              <el-checkbox v-for="item in localIndex.visualExamList" :key="item.id" :label="item.id">{{item.text}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="触诊">
            <el-checkbox-group v-model="inquiryForm.physicalExamination.palpation">
              <el-checkbox v-for="item in localIndex.palpationList" :key="item.id" :label="item.id">{{item.text}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="叩诊">
            <el-checkbox-group v-model="inquiryForm.physicalExamination.percussion">
              <el-checkbox v-for="item in localIndex.percussionList" :key="item.id" :label="item.id">{{item.text}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="听诊">
            <el-checkbox-group v-model="inquiryForm.physicalExamination.auscultation">
              <el-checkbox v-for="item in localIndex.auscultationList" :key="item.id" :label="item.id">{{item.text}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="动诊">
            <el-checkbox-group v-model="inquiryForm.physicalExamination.dynamicDiag">
              <el-checkbox v-for="item in localIndex.dynamicDiagList" :key="item.id" :label="item.id">{{item.text}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>
      </el-card>
      <el-card v-if="activeStep===3">
        <div slot="header" class="clearfix">
          <span>一般检查相关信息</span>
        </div>
        <div>
          <el-form-item label="心电图">
          </el-form-item>
          <el-form-item label="生化">
          </el-form-item>
          <el-form-item label="胸片">
          </el-form-item>
          <el-form-item label="超声">
          </el-form-item>
        </div>
      </el-card>
    </el-form>
    <div class="step-btn">
      <el-button icon="el-icon-d-arrow-left" v-if="activeStep>=1" @click="lastStep">上一步</el-button>
      <el-button type="primary" :icon="activeStep===stepList.length?'el-icon-check':'el-icon-d-arrow-right'" @click="nextStep">{{activeStep===stepList.length?'提交':'下一步'}}</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      stepList: [
        { title: '典型症状', desc: '' },
        { title: '危险因素', desc: '' },
        { title: '体格检查', desc: '' },
        { title: '一般检查', desc: '' }
      ],
      localIndex: {
        bodyPartList: [
          { id: '1', text: '前胸' },
          { id: '2', text: '整个胸部' },
          { id: '3', text: '后背' },
          { id: '4', text: '胸骨后' },
          { id: '5', text: '心前区' },
          { id: '6', text: '心尖' },
          { id: '7', text: '剑突下' },
          { id: '8', text: '咽颈部' },
          { id: '9', text: '下颌部' },
          { id: '10', text: '上腹部' },
          { id: '11', text: '一侧胸痛' },
          { id: '12', text: '肩胛间' },
          { id: '13', text: '其他' }
        ],
        radiationSiteList: [
          { id: '1', text: '左上臂尺侧' },
          { id: '2', text: '左肩' },
          { id: '3', text: '无名指或小指' },
          { id: '4', text: '左颈' },
          { id: '5', text: '面颊部' },
          { id: '6', text: '背部' },
          { id: '7', text: '上腹部' },
          { id: '8', text: '下颌部' },
          { id: '9', text: '下腹部' },
          { id: '10', text: '腰部' },
          { id: '11', text: '两侧腹股沟' },
          { id: '12', text: '下肢' },
          { id: '13', text: '其他' }
        ],
        rangeList: [
          { id: '1', text: '手掌大小' },
          { id: '2', text: '横贯前胸' },
          { id: '3', text: '沿主动脉移动性' }
        ],
        qualityList: [
          { id: '1', text: '压迫感' },
          { id: '2', text: '紧缩感' },
          { id: '3', text: '压榨样' },
          { id: '4', text: '刀割' },
          { id: '5', text: '烧灼' },
          { id: '6', text: '闷痛' },
          { id: '7', text: '针刺样' },
          { id: '8', text: '感胀痛' },
          { id: '9', text: '隐痛' },
          { id: '10', text: '梗塞' },
          { id: '11', text: '绞痛' },
          { id: '12', text: '撕裂性' },
          { id: '13', text: '不适' },
          { id: '14', text: '其他' }
        ],
        durationList: [
          { id: '1', text: '< 10 分钟' },
          { id: '2', text: '10 ~ 20 分钟' },
          { id: '3', text: '> 20 分钟' }
        ],
        degreeList: [
          { id: '1', text: '轻度' },
          { id: '2', text: '中度' },
          { id: '3', text: '重度' },
          { id: '4', text: '极重度' }
        ],
        progressionList: [
          { id: '1', text: '进行性加重' },
          { id: '2', text: '数分钟达到顶峰' }
        ],
        relievingFactorList: [
          { id: '1', text: '休息' },
          { id: '2', text: '舌下含化合物' },
          { id: '3', text: '硝酸酯类药物' },
          { id: '4', text: '不缓解' },
          { id: '5', text: '其他' }
        ],
        precipitatingFactorList: [
          { id: '1', text: '上感' },
          { id: '2', text: '体力活动' },
          { id: '3', text: '情绪' },
          { id: '4', text: '大餐' },
          { id: '5', text: '吸烟' },
          { id: '6', text: '排便' },
          { id: '7', text: '气候变化' },
          { id: '8', text: '休息' },
          { id: '9', text: '其他' }
        ],
        simultaneousPhenomenonList: [
          { id: '1', text: '呼吸困难' },
          { id: '2', text: '窒息感' },
          { id: '3', text: '大汗' },
          { id: '4', text: '心悸' },
          { id: '5', text: '晕厥' },
          { id: '6', text: '紫绀' },
          { id: '7', text: '休克' },
          { id: '8', text: '焦虑' },
          { id: '9', text: '面色苍白' },
          { id: '10', text: '皮肤湿冷' },
          { id: '11', text: '气促' },
          { id: '12', text: '咳血' },
          { id: '13', text: '表情紧张' },
          { id: '14', text: '烦躁不安' },
          { id: '15', text: '昏迷' },
          { id: '16', text: '咯血' },
          { id: '17', text: '烦躁' },
          { id: '18', text: '咳嗽' },
          { id: '19', text: '吐痰' },
          { id: '20', text: '恶心' },
          { id: '21', text: '呕吐' },
          { id: '22', text: '上腹胀' },
          { id: '23', text: '上腹痛' },
          { id: '24', text: '黑朦' },
          { id: '25', text: '乏力' },
          { id: '26', text: '头晕' },
          { id: '27', text: '头昏' },
          { id: '28', text: '肢体麻木' },
          { id: '29', text: '意识障碍' },
          { id: '30', text: '濒死感' },
          { id: '31', text: '其他' }
        ],
        riskFactorList1: [
          { id: '1', text: '高血脂' },
          { id: '2', text: '高血压' },
          { id: '3', text: '高血糖' },
          { id: '4', text: '吸烟' },
          { id: '5', text: '肥胖' },
          { id: '6', text: '冠心病家族史' }
        ],
        riskFactorList2: [
          { id: '1', text: '马凡综合征' },
          { id: '2', text: '先天性主动脉瓣畸形' },
          { id: '3', text: '严重高血压病' },
          { id: '4', text: '代谢综合征' },
          { id: '5', text: '动脉粥样硬化' },
          { id: '6', text: '睡眠呼吸暂停低通气综合征' },
          { id: '7', text: '慢性炎症性疾病' },
          { id: '8', text: '医源性因素' }
        ],
        riskFactorList3: [
          { id: '1', text: '紧张' },
          { id: '2', text: '饮酒' },
          { id: '3', text: '熬夜' },
          { id: '4', text: '高兴至极' },
          { id: '5', text: '更年期女性' }
        ],
        visualExamList: [
          { id: '1', text: '心室增大' },
          { id: '2', text: '颈静脉怒张' },
          { id: '3', text: '双下肢有浮肿或静脉曲张或不对称' },
          { id: '4', text: '胸廓饱满' },
          { id: '5', text: '胸部饱胀' },
          { id: '6', text: '胸廓畸形' },
          { id: '7', text: '脊柱畸形' },
          { id: '8', text: '带状疱疹皮肤病灶' },
          { id: '9', text: '缺乏睡眠' }
        ],
        palpationList: [
          { id: '1', text: '血压升高' },
          { id: '2', text: '血压降低' },
          { id: '3', text: '两侧肢体脉搏及血压不对称' },
          { id: '4', text: '肋间隙变宽' },
          { id: '5', text: '胸壁局限性压痛' },
          { id: '6', text: '骨折' },
          { id: '7', text: '上腹部触压痛' },
          { id: '8', text: '胸骨触痛点明显' }
        ],
        percussionList: [
          { id: '1', text: '浊音界轻至中度增大' },
          { id: '2', text: '鼓音' }
        ],
        auscultationList: [
          { id: '1', text: '心率增快' },
          { id: '2', text: '心律失常' },
          { id: '3', text: '心音第三第四奔马律' },
          { id: '4', text: '心尖收缩期杂音' },
          { id: '5', text: '急性心梗可能有心包摩擦音' },
          { id: '6', text: '大血管杂音' },
          { id: '7', text: '急性主动脉瓣反流杂音' },
          { id: '8', text: '肺部哮鸣音和细湿啰音' },
          { id: '9', text: '肺动脉瓣区第二音亢进' },
          { id: '10', text: '三尖瓣区收缩期杂音' },
          { id: '11', text: '呼吸音减弱或消失' }
        ],
        dynamicDiagList: [
          { id: '1', text: '深吸气痛' },
          { id: '2', text: '胸膈或胸膜' },
          { id: '3', text: '扩胸运动胸膜或肋间' },
          { id: '4', text: '伸曲运动' },
          { id: '5', text: '转胸运动胸椎' }
        ]
      },
      activeStep: 0,
      rules: {
        'age': [
          // { required: true, message: '年龄不能为空', trigger: 'blur' },
          { type: 'number', message: '年龄必须为数字值', trigger: 'blur' }
        ]
      },
      inquiryForm: {
        chestPain: {
          bodyParts: [],
          bodyPartsOthers: '',
          radiationSites: [],
          radiationSitesOthers: '',
          range: '',
          qualityOfPain: [],
          qualityOfPainOthers: [],
          degree: '',
          progression: '',
          sudden: '',
          duration: '',
          relievingFactors: [],
          relievingFactorsOthers: '',
          precipitatingFactors: [],
          precipitatingFactorsOthers: '',
          simultaneousPhenomena: [],
          simultaneousPhenomenonOthers: ''
        },
        dyspnea: {
          unknownOrigin: '',
          isSudden: '',
          orthopnoea: '',
          degree: ''
        },
        age: '',
        riskFactors: {
          acs: [],
          aorticDissection: [],
          others: []
        },
        physicalExamination: {
          visualExam: [],
          palpation: [],
          percussion: [],
          auscultation: [],
          dynamicDiag: []
        },
        normalExamination: {
          ecg: [],
          biochemical: [],
          sternum: [],
          ultrasonic: []
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'screen'
    ]),
    position () {
      if (this.screen.size.id < 2) {
        return 'top'
      } else {
        return 'right'
      }
    }
  },
  methods: {
    // FIXME: 将repeater进行封装

    // repeate输入框添加方法
    addRow (array, row) {
      array.push(row)
    },
    removeRow (array, index) {
      this.$confirm('是否删除该行数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        array.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    lastStep () {
      if (this.activeStep > 0) {
        this.activeStep--
      }
    },
    nextStep () {
      if (this.activeStep < 4) {
        this.activeStep++
      }
    }
  },
  mounted () {
    // this.$store.dispatch('GetStaticIndex')
  }
}
</script>

<style lang="scss" scoped>
  .content-wrapper {
    .step-wrapper {
      background-color: #fff;
      padding: 20px;
      border-radius: 5px;
      .el-collapse {
        margin-top: 20px;
      }
    }
    .el-form {
      margin-top: 20px;
      .el-input {
        max-width: 300px;
      }
    }
    .step-btn {
      margin-top: 20px;
      text-align: center;
      button {
        width: 300px;
        margin: 10px;
      }
    }
  }
</style>
