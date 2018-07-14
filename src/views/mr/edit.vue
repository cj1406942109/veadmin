<template>
  <div class="content-wrapper">
    <!-- <el-alert :title="prompt" type="warning" close-text="知道了" style="margin-bottom: 20px;"></el-alert> -->
    <el-form ref="mrForm" :model="mr" :rules="rules" label-width="200px" :label-position="position" v-loading.body="mrLoading" v-if="mr">
      <el-tabs :tab-position="position" type="border-card" v-model="activeTab">
        <el-tab-pane label="患者基本信息">
          <div class="quick-anchor">
            <span>快速访问：</span>
            <el-tag @click.native="goAnchor('#anchor-submit-btn')">保存病历</el-tag>
          </div>
          <h3>患者基本信息</h3>
          <el-form-item label="姓名" prop="basicInfo.name">
            <el-input clearable v-model="mr.basicInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="住院号" prop="basicInfo.admissionNum">
            <el-input clearable v-model="mr.basicInfo.admissionNum"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="cellphone1|cellphone2|telephone">
            <el-input clearable placeholder="填写患者手机号1" v-model="mr.basicInfo.cellphone1"></el-input>
            <el-input clearable placeholder="填写患者手机号2" v-model="mr.basicInfo.cellphone2"></el-input>
            <el-input clearable placeholder="填写患者固定电话" v-model="mr.basicInfo.telephone"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="basicInfo.gender">
            <el-radio-group v-model="mr.basicInfo.gender"><el-radio label="男">男</el-radio><el-radio label="女">女</el-radio></el-radio-group>
          </el-form-item>
          <el-form-item label="年龄" prop="basicInfo.age">
            <el-input clearable v-model="mr.basicInfo.age"></el-input>
          </el-form-item>
          <el-form-item label="主治医生" prop="basicInfo.doctor">
            <el-select v-model="mr.basicInfo.doctor" placeholder="请选择主治医生">
              <el-option :label="item.name" :value="item" v-for="item in doctorList" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="记录者" prop="basicInfo.recorder">
            <el-input clearable v-model="mr.basicInfo.recorder"></el-input>
          </el-form-item>
          <el-form-item label="床位号" prop="basicInfo.bedNum">
            <el-input clearable v-model="mr.basicInfo.bedNum"></el-input>
          </el-form-item>
          <el-form-item label="就诊卡号" prop="basicInfo.medicalCardNum">
            <el-input clearable v-model="mr.basicInfo.medicalCardNum"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="basicInfo.idNum">
            <el-input clearable v-model="mr.basicInfo.idNum"></el-input>
          </el-form-item>
          <el-form-item label="住院时间" v-if="screen.size.id>=2">
            <el-date-picker v-model="mr.basicInfo.hospitalizationTime" type="datetimerange" range-separator="至" start-placeholder="住院开始日期" end-placeholder="住院结束日期" value-format="timestamp"></el-date-picker>
          </el-form-item>
          <template v-else>
            <el-form-item label="住院开始时间">
              <el-date-picker v-model="mr.basicInfo.hospitalizationTime[0]" type="datetime" placeholder="选择入院时间" value-format="timestamp"></el-date-picker>
            </el-form-item>
            <el-form-item label="住院结束时间">
              <el-date-picker v-model="mr.basicInfo.hospitalizationTime[1]" type="datetime" placeholder="选择出院时间" value-format="timestamp"></el-date-picker>
            </el-form-item>
          </template>
          <el-form-item label="住院时长">
            <el-input :value="hospitalizationDuration" readonly></el-input>
          </el-form-item>
          <el-form-item label="出院状态">
            <el-radio-group v-model="mr.basicInfo.dischargeStatus"><el-radio label="死亡">死亡</el-radio><el-radio label="存活">存活</el-radio></el-radio-group>
          </el-form-item>
          <el-form-item label="职业">
            <el-select v-model="mr.basicInfo.profession" placeholder="请选择职业">
              <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.professionList" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="民族">
            <el-select v-model="mr.basicInfo.nationality" placeholder="请选择民族">
              <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.nationalityList" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-date-picker type="date" placeholder="选择日期" v-model="mr.basicInfo.birthday" :picker-options="pickerOptions" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label="出生地">
            <location-picker :location="mr.basicInfo.birthAddress" :grade="2"></location-picker>
          </el-form-item>
          <el-form-item label="家庭住址">
            <location-picker :location="mr.basicInfo.address" :grade="4"></location-picker>
          </el-form-item>
          <el-form-item label="详细住址">
            <el-input clearable type="textarea" v-model="mr.basicInfo.address.detail"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="现病史">
          <div class="quick-anchor">
            <span>快速访问：</span>
            <el-tag type="info" @click.native="goAnchor('#anchor-chestPain')" v-if="mr.historyOfPresentIllness.careCauses.indexOf('1')>=0">胸痛</el-tag>
            <el-tag type="info" @click.native="goAnchor('#anchor-chestDistress')" v-if="mr.historyOfPresentIllness.careCauses.indexOf('2')>=0">胸闷</el-tag>
            <el-tag type="info" @click.native="goAnchor('#anchor-dyspnea')" v-if="mr.historyOfPresentIllness.careCauses.indexOf('3')>=0">呼吸困难</el-tag>
            <el-tag type="info" @click.native="goAnchor('#anchor-palpitation')" v-if="mr.historyOfPresentIllness.careCauses.indexOf('4')>=0">心悸</el-tag>
            <el-tag type="info" @click.native="goAnchor('#anchor-abnormalEcg')" v-if="mr.historyOfPresentIllness.careCauses.indexOf('5')>=0">心电图异常</el-tag>
            <el-tag @click.native="goAnchor('#anchor-submit-btn')">保存病历</el-tag>
          </div>
          <h3>现病史</h3>
          <el-form-item label="就诊原因">
            <el-checkbox-group v-model="mr.historyOfPresentIllness.careCauses">
              <el-checkbox v-for="disease in staticIndex.historyOfPresentIllnessCareCauses" :key="disease.id" :label="disease.id">{{disease.text}}</el-checkbox>
            </el-checkbox-group>
            <el-form-item label="其他就诊原因" v-if="mr.historyOfPresentIllness.careCauses.indexOf('-1')>=0">
              <el-input clearable v-model="mr.historyOfPresentIllness.careCauseOthers"></el-input>
            </el-form-item>
          </el-form-item>
          <el-card v-for="disease in staticIndex.historyOfPresentIllnessCareCauses" :key="disease.id"
          v-if="mr.historyOfPresentIllness.careCauses.indexOf(disease.id)>=0&&disease.id!=='-1'" :id="'anchor-'+historyOfPresentIllness[disease.id]">
            <div slot="header"><span>{{disease.text}}</span></div>
            <div>
              <el-form-item label="发病缓急" v-if="disease.id==='1'">
                <el-radio-group v-model="mr.historyOfPresentIllness[historyOfPresentIllness[disease.id]].urgencyDegree">
                  <el-radio v-for="item in staticIndex.urgencyDegreeList" :key="item.id" :label="item.id">{{item.text}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="发作频率">
                <el-input clearable v-model="mr.historyOfPresentIllness[historyOfPresentIllness[disease.id]].timesPerDay"><template slot="append">次/天</template></el-input>
                <el-input clearable v-model="mr.historyOfPresentIllness[historyOfPresentIllness[disease.id]].timesPerWeek"><template slot="append">次/周</template></el-input>
                <el-input clearable v-model="mr.historyOfPresentIllness[historyOfPresentIllness[disease.id]].timesPerMonth"><template slot="append">次/月</template></el-input>
                <el-input clearable v-model="mr.historyOfPresentIllness[historyOfPresentIllness[disease.id]].timesPerYear"><template slot="append">次/年</template></el-input>
              </el-form-item>
              <el-form-item label="发病时间（多选）">
                <el-checkbox-group v-model="mr.historyOfPresentIllness[historyOfPresentIllness[disease.id]].onsetTime">
                  <el-checkbox v-for="item in staticIndex.onsetTimeOfIllness" :key="item.id" :label="item.id">{{item.text}}</el-checkbox>
                </el-checkbox-group>
                <el-form-item label="其他发病时间" v-if="mr.historyOfPresentIllness[historyOfPresentIllness[disease.id]].onsetTime.indexOf('-1')>=0">
                  <el-input clearable v-model="mr.historyOfPresentIllness[historyOfPresentIllness[disease.id]].onsetTimeOthers"></el-input>
                </el-form-item>
              </el-form-item>
              <template v-if="disease.id=='3'">
                <el-form-item label="原因不明">
                  <el-radio-group v-model="mr.historyOfPresentIllness[historyOfPresentIllness[disease.id]].unknownOrigin">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="突发">
                  <el-radio-group v-model="mr.historyOfPresentIllness[historyOfPresentIllness[disease.id]].isSudden">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="程度">
                  <el-radio-group v-model="mr.historyOfPresentIllness[historyOfPresentIllness[disease.id]].degree">
                    <el-radio v-for="item in staticIndex.dyspneaDegree" :key="item.id" :label="item.id">{{item.text}}</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="端坐呼吸">
                  <el-radio-group v-model="mr.historyOfPresentIllness[historyOfPresentIllness[disease.id]].orthopnoea">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="呼吸会加重胸痛">
                  <el-radio-group v-model="mr.historyOfPresentIllness[historyOfPresentIllness[disease.id]].breathAggravateChestPain">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </template>
              <template v-if="disease.id<3">
                <el-form-item label="部位">
                  <el-button icon="el-icon-plus" size="mini" type="primary"
                  @click.prevent="addRow(mr.historyOfPresentIllness[historyOfPresentIllness[disease.id]].diseaseBodyParts,
                  {bodyPartName: '', bodyPartRange: '', bodyPartNameOthers: '',qualityOfPain: '',qualityOfPainOthers: '', durationOfPainMin: '', durationOfPainMax:'', durationOfPainOrdinary:'', painDegree:''})">
                  添加</el-button>
                </el-form-item>
                <el-form-item
                  v-for="(bodyPart, index) in mr.historyOfPresentIllness[historyOfPresentIllness[disease.id]].diseaseBodyParts"
                  :label="'部位' + (index + 1)"
                  :key="bodyPart.id">
                  <el-select v-model="bodyPart.bodyPartName" placeholder="请选择部位">
                    <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.diseaseBodyPartNames" :key="item.id"></el-option>
                  </el-select>
                  <el-input clearable v-model="bodyPart.bodyPartNameOthers" v-if="bodyPart.bodyPartName==='-1'" placeholder="其他部位"></el-input>
                  <el-select v-model="bodyPart.bodyPartRange" placeholder="请选择范围" v-if="disease.id==='1'">
                    <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.diseaseBodyPartRanges" :key="item.id"></el-option>
                  </el-select>
                  <el-select v-model="bodyPart.qualityOfPain" placeholder="请选择性质">
                    <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.diseaseQualityOfPain" :key="item.id"></el-option>
                  </el-select>
                  <el-input clearable v-model="bodyPart.qualityOfPainOthers" v-if="bodyPart.qualityOfPain==='-1'" placeholder="其他性质"></el-input>
                  <!-- <el-select v-model="bodyPart.durationOfPain" placeholder="请选择持续时间">
                    <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.diseaseDurationOfPain" :key="item.id"></el-option>
                  </el-select> -->
                  <el-input clearable v-model="bodyPart.durationOfPainMin" placeholder="最短持续时间" style="vertical-align:baseline;"><template slot="append">分钟</template></el-input>
                  <el-input clearable v-model="bodyPart.durationOfPainMax" placeholder="最长持续时间" style="vertical-align:baseline;"><template slot="append">分钟</template></el-input>
                  <el-input clearable v-model="bodyPart.durationOfPainOrdinary" placeholder="一般持续时间" style="vertical-align:baseline;"><template slot="append">分钟</template></el-input>
                  <el-select v-model="bodyPart.painDegree" placeholder="请选择程度">
                    <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.diseasePainDegree" :key="item.id"></el-option>
                  </el-select>
                  <el-button @click.prevent="removeRow(mr.historyOfPresentIllness[historyOfPresentIllness[disease.id]].diseaseBodyParts, index)" type="danger" icon="el-icon-delete"></el-button>
                </el-form-item>
                <el-form-item label="缓解因素（多选）">
                  <el-checkbox-group v-model="mr.historyOfPresentIllness[historyOfPresentIllness[disease.id]].relievingFactors">
                    <el-checkbox v-for="item in staticIndex.relievingFactors" :key="item.id" :label="item.id">{{item.text}}</el-checkbox>
                  </el-checkbox-group>
                  <el-form-item label="时间"
                  v-if="mr.historyOfPresentIllness[historyOfPresentIllness[disease.id]].relievingFactors.indexOf('1')>=0 ||
                    mr.historyOfPresentIllness[historyOfPresentIllness[disease.id]].relievingFactors.indexOf('2')>=0">
                    <el-input clearable v-model="mr.historyOfPresentIllness[historyOfPresentIllness[disease.id]].relievingDuration" placeholder="缓解时间"><template slot="append">分钟</template></el-input>
                  </el-form-item>
                  <el-form-item label="药物名称"
                  v-if="mr.historyOfPresentIllness[historyOfPresentIllness[disease.id]].relievingFactors.indexOf('2')>=0">
                    <el-input clearable v-model="mr.historyOfPresentIllness[historyOfPresentIllness[disease.id]].relievingDrugs" placeholder="舌下含药物名称"></el-input>
                  </el-form-item>
                  <el-form-item label="其他缓解因素" v-if="mr.historyOfPresentIllness[historyOfPresentIllness[disease.id]].relievingFactors.indexOf('-1')>=0">
                    <el-input clearable v-model="mr.historyOfPresentIllness[historyOfPresentIllness[disease.id]].relievingFactorsOthers"></el-input>
                  </el-form-item>
                </el-form-item>
                <el-form-item label="诱因（多选）">
                  <el-checkbox-group v-model="mr.historyOfPresentIllness[historyOfPresentIllness[disease.id]].precipitatingFactors">
                    <el-checkbox v-for="item in staticIndex.precipitatingFactors" :key="item.id" :label="item.id">{{item.text}}</el-checkbox>
                  </el-checkbox-group>
                  <el-form-item label="其他诱因" v-if="mr.historyOfPresentIllness[historyOfPresentIllness[disease.id]].precipitatingFactors.indexOf('-1')>=0">
                    <el-input clearable v-model="mr.historyOfPresentIllness[historyOfPresentIllness[disease.id]].precipitatingFactorsOthers"></el-input>
                  </el-form-item>
                </el-form-item>
                <el-form-item label="放射部位（多选）">
                  <el-checkbox-group v-model="mr.historyOfPresentIllness[historyOfPresentIllness[disease.id]].radiationSites">
                    <el-checkbox v-for="item in staticIndex.radiationSites" :key="item.id" :label="item.id">{{item.text}}</el-checkbox>
                  </el-checkbox-group>
                  <el-form-item label="其他放射部位" v-if="mr.historyOfPresentIllness[historyOfPresentIllness[disease.id]].radiationSites.indexOf('-1')>=0">
                    <el-input clearable v-model="mr.historyOfPresentIllness[historyOfPresentIllness[disease.id]].radiationSitesOthers"></el-input>
                  </el-form-item>
                </el-form-item>
                <el-form-item label="伴随症状（多选）">
                  <el-checkbox-group v-model="mr.historyOfPresentIllness[historyOfPresentIllness[disease.id]].simultaneousPhenomena">
                    <el-checkbox v-for="item in staticIndex.simultaneousPhenomena" :key="item.id" :label="item.id">{{item.text}}</el-checkbox>
                  </el-checkbox-group>
                  <el-form-item label="其他伴随症状" v-if="mr.historyOfPresentIllness[historyOfPresentIllness[disease.id]].simultaneousPhenomena.indexOf('-1')>=0">
                    <el-input clearable v-model="mr.historyOfPresentIllness[historyOfPresentIllness[disease.id]].simultaneousPhenomenonOthers"></el-input>
                  </el-form-item>
                </el-form-item>
              </template>
            </div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="既往史">
          <div class="quick-anchor">
            <span>快速访问：</span>
            <el-tag @click.native="goAnchor('#anchor-submit-btn')">保存病历</el-tag>
            <br><br><span>既往病史：</span>
            <el-tag type="info" @click.native="goAnchor('#anchor-lipid-abnormal')">血脂异常</el-tag>
            <el-tag type="info" @click.native="goAnchor('#anchor-essential-hypertension')">原发性高血压</el-tag>
            <el-tag type="info" @click.native="goAnchor('#anchor-dysglycemia')">血糖异常</el-tag>
            <el-tag type="info" @click.native="goAnchor('#anchor-gout')">痛风</el-tag>
            <el-tag type="info" @click.native="goAnchor('#anchor-heart-disease-history')">心脏病史</el-tag>
            <el-tag type="info" @click.native="goAnchor('#anchor-deep-venous-thrombosis')">深静脉血栓</el-tag>
            <el-tag type="info" @click.native="goAnchor('#anchor-old-ischemic-stroke')">既往缺血性卒中</el-tag>
            <el-tag type="info" @click.native="goAnchor('#anchor-vascular-diseases')">血管性疾病史</el-tag>
            <el-tag type="info" @click.native="goAnchor('#anchor-hemorrhage')">出血病史</el-tag>
            <el-tag type="info" @click.native="goAnchor('#anchor-bleeding')">出血史</el-tag>
            <br><br><span>危险因素：</span>
            <el-tag type="info" @click.native="goAnchor('#anchor-smoking')">吸烟</el-tag>
            <el-tag type="info" @click.native="goAnchor('#anchor-drinking')">饮酒</el-tag>
            <el-tag type="info" @click.native="goAnchor('#anchor-diet')">饮食习惯（每日摄入量）</el-tag>
            <el-tag type="info" @click.native="goAnchor('#anchor-social-psychology')">社会心理因素</el-tag>
            <el-tag type="info" @click.native="goAnchor('#anchor-exercise')">运动</el-tag>
            <el-tag type="info" @click.native="goAnchor('#anchor-central-obesity')">中心型肥胖</el-tag>
          </div>
          <h3>既往病史</h3>
          <el-card id="anchor-lipid-abnormal">
            <div slot="header"><span>血脂异常</span></div>
            <div>
              <el-form-item label="有无血脂异常">
                <el-radio-group v-model="mr.anamnesis.isLipidAbnormality">
                  <el-radio label="-1">不知道</el-radio>
                  <el-radio label="0">无</el-radio>
                  <el-radio label="1">有</el-radio>
                </el-radio-group>
                <template v-if="mr.anamnesis.isLipidAbnormality==='1'">
                  <el-form-item label="病史">
                    <el-input clearable v-model="mr.anamnesis.lipidAbnormalityDuration"><template slot="append">年</template></el-input>
                  </el-form-item>
                  <el-form-item label="类型">
                    <el-select v-model="mr.anamnesis.lipidAbnormalityType" placeholder="请选择类型">
                      <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.lipidAbnormalityTypes" :key="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="有无治疗">
                    <el-radio-group v-model="mr.anamnesis.isLipidAbnormalityUnderTreatment">
                      <el-radio label="0">无</el-radio>
                      <el-radio label="1">间断</el-radio>
                      <el-radio label="2">长期用药</el-radio>
                    </el-radio-group>
                    <el-form-item label="长期用药药名" v-if="mr.anamnesis.isLipidAbnormalityUnderTreatment==='2'">
                      <el-input clearable v-model="mr.anamnesis.lipidAbnormalityDrugName"></el-input>
                    </el-form-item>
                  </el-form-item>
                </template>
              </el-form-item>
            </div>
          </el-card>
          <el-card id="anchor-essential-hypertension">
            <div slot="header"><span>原发性高血压</span></div>
            <div>
              <el-form-item label="有无原发性高血压">
                <el-radio-group v-model="mr.anamnesis.isEssentialHypertension">
                  <el-radio label="-1">不知道</el-radio>
                  <el-radio label="0">无</el-radio>
                  <el-radio label="1">有</el-radio>
                </el-radio-group>
                <template v-if="mr.anamnesis.isEssentialHypertension==='1'">
                  <el-form-item label="病史">
                    <el-input clearable v-model="mr.anamnesis.essentialHypertensionDuration"><template slot="append">年</template></el-input>
                  </el-form-item>
                  <el-form-item label="有无治疗">
                    <el-radio-group v-model="mr.anamnesis.isEssentialHypertensionUnderTreatment">
                      <el-radio label="0">无</el-radio>
                      <el-radio label="1">间断</el-radio>
                      <el-radio label="2">长期用药</el-radio>
                    </el-radio-group>
                    <el-form-item label="长期用药药名" v-if="mr.anamnesis.isEssentialHypertensionUnderTreatment==='2'">
                      <el-input clearable v-model="mr.anamnesis.essentialHypertensionDrugName"></el-input>
                    </el-form-item>
                  </el-form-item>
                </template>
              </el-form-item>
              <el-form-item label="血压最高值">
                <el-input clearable v-model="mr.anamnesis.maximumBP.SBP" placeholder="收缩压/高压" style="vertical-align:baseline;"><template slot="append">mmHg</template></el-input>
                &nbsp;/&nbsp;
                <el-input clearable v-model="mr.anamnesis.maximumBP.DBP" placeholder="舒张压/低压" style="vertical-align:baseline;"><template slot="append">mmHg</template></el-input>
              </el-form-item>
              <el-form-item label="血压平时值">
                <el-input clearable v-model="mr.anamnesis.ordinaryBP.SBP" placeholder="收缩压/高压" style="vertical-align:baseline;"><template slot="append">mmHg</template></el-input>
                &nbsp;/&nbsp;
                <el-input clearable v-model="mr.anamnesis.ordinaryBP.DBP" placeholder="舒张压/低压" style="vertical-align:baseline;"><template slot="append">mmHg</template></el-input>
              </el-form-item>
            </div>
          </el-card>
          <el-card id="anchor-dysglycemia">
            <div slot="header"><span>血糖异常</span></div>
            <div>
              <el-form-item label="有无血糖异常">
                <el-radio-group v-model="mr.anamnesis.isDysglycemia">
                  <el-radio label="-1">不知道</el-radio>
                  <el-radio label="0">无</el-radio>
                  <el-radio label="1">有</el-radio>
                </el-radio-group>
                <el-form-item label="类型" v-if="mr.anamnesis.isDysglycemia=='1'">
                  <el-select v-model="mr.anamnesis.dysglycemiaType" placeholder="请选择类型">
                    <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.dysglycemiaTypes" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-form-item>
              <el-form-item label="是否糖尿病">
                <el-radio-group v-model="mr.anamnesis.isDiabetesMellitus">
                  <el-radio label="0">否</el-radio>
                  <el-radio label="1">是</el-radio>
                </el-radio-group>
                <template v-if="mr.anamnesis.isDiabetesMellitus==='1'">
                  <el-form-item label="病史">
                    <el-input clearable v-model="mr.anamnesis.diabetesMellitusDuration"><template slot="append">年</template></el-input>
                  </el-form-item>
                  <el-form-item label="类型">
                    <el-select v-model="mr.anamnesis.diabetesMellitusType" placeholder="请选择类型">
                      <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.diabetesMellitusTypes" :key="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="有无治疗" v-if="mr.anamnesis.isDiabetesMellitus==='1'">
                    <el-radio-group v-model="mr.anamnesis.isDiabetesMellitusUnderTreatment">
                      <el-radio label="0">无</el-radio>
                      <el-radio label="1">不规律</el-radio>
                      <el-radio label="2">规律治疗</el-radio>
                    </el-radio-group>
                    <el-form-item label="治疗方法（多选）"
                    v-if="mr.anamnesis.isDiabetesMellitusUnderTreatment==='1'||mr.anamnesis.isDiabetesMellitusUnderTreatment==='2'">
                      <el-checkbox-group v-model="mr.anamnesis.diabetesMellitusTreatmentMethod">
                        <el-checkbox v-for="item in staticIndex.diabetesMellitusTreatmentMethods" :key="item.id" :label="item.id">{{item.text}}</el-checkbox>
                      </el-checkbox-group>
                      <el-form-item label="口服药药名" v-if="mr.anamnesis.diabetesMellitusTreatmentMethod.indexOf('3')>=0">
                        <el-input clearable v-model="mr.anamnesis.diabetesMellitusOralDrugName"></el-input>
                      </el-form-item>
                    </el-form-item>
                  </el-form-item>
                </template>
              </el-form-item>
            </div>
          </el-card>
          <el-card id="anchor-gout">
            <div slot="header"><span>痛风</span></div>
            <div>
              <el-form-item label="有无痛风">
                <el-radio-group v-model="mr.anamnesis.isGout">
                  <el-radio label="0">无</el-radio>
                  <el-radio label="1">有</el-radio>
                </el-radio-group>
                <el-form-item label="病史" v-if="mr.anamnesis.isGout==='1'">
                  <el-input clearable v-model="mr.anamnesis.goutDuration"><template slot="append">年</template></el-input>
                </el-form-item>
              </el-form-item>
              <el-form-item label="血清尿酸">
                <el-input clearable v-model="mr.anamnesis.serumUricAcidLevel"><template slot="append">μmol/L</template></el-input>
              </el-form-item>
              <el-form-item label="有无肾功能不全">
                <el-radio-group v-model="mr.anamnesis.isRenalInsufficiency">
                  <el-radio label="-1">不知道</el-radio>
                  <el-radio label="0">无</el-radio>
                  <el-radio label="1">有</el-radio>
                </el-radio-group>
                <template v-if="mr.anamnesis.isRenalInsufficiency==='1'">
                  <el-form-item label="病史">
                    <el-input clearable v-model="mr.anamnesis.renalInsufficiencyDuration"><template slot="append">年</template></el-input>
                  </el-form-item>
                  <el-form-item label="病因">
                    <el-input clearable v-model="mr.anamnesis.renalInsufficiencyEtiology"></el-input>
                  </el-form-item>
                </template>
              </el-form-item>
              <el-form-item label="最高Cr">
                <el-input clearable v-model="mr.anamnesis.maximumCr"><template slot="append">μmol/L</template></el-input>
              </el-form-item>
              <el-form-item label="近期Cr">
                <el-input clearable v-model="mr.anamnesis.recentCr"><template slot="append">μmol/L</template></el-input>
              </el-form-item>
            </div>
          </el-card>
          <el-card id="anchor-heart-disease-history">
            <div slot="header"><span>心脏病史</span></div>
            <div>
              <el-form-item label="有无陈旧性心硬">
                <el-radio-group v-model="mr.anamnesis.isOldMyocardialInfarction">
                  <el-radio label="0">无</el-radio>
                  <el-radio label="1">有</el-radio>
                </el-radio-group>
                <template v-if="mr.anamnesis.isOldMyocardialInfarction==='1'">
                  <el-input clearable v-model="mr.anamnesis.oldMyocardialInfarctionOnsetTimeYear" placeholder="填写年份"><template slot="append">年</template></el-input>
                  <el-input clearable v-model="mr.anamnesis.oldMyocardialInfarctionOnsetTimeMonth" placeholder="填写月份"><template slot="append">月前</template></el-input>
                  <el-input clearable v-model="mr.anamnesis.oldMyocardialInfarctionOnsetFrequency" placeholder="填写发生次数"><template slot="prepend">发生</template><template slot="append">次</template></el-input>
                  <el-form-item label="部位（多选）">
                    <el-checkbox-group v-model="mr.anamnesis.oldMyocardialInfarctionLocation">
                      <el-checkbox v-for="item in staticIndex.oldMyocardialInfarctionLocations" :key="item.id" :label="item.id">{{item.text}}</el-checkbox>
                    </el-checkbox-group>
                    <el-form-item label="其他部位" v-if="mr.anamnesis.oldMyocardialInfarctionLocation.indexOf('-1')>='0'">
                      <el-input clearable v-model="mr.anamnesis.oldMyocardialInfarctionLocationOthers"></el-input>
                    </el-form-item>
                  </el-form-item>
                </template>
              </el-form-item>
              <el-form-item label="有无PCI史">
                <el-radio-group v-model="mr.anamnesis.isPciHistory">
                  <el-radio label="0">无</el-radio>
                  <el-radio label="1">有</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="有无CABG史">
                <el-radio-group v-model="mr.anamnesis.isCabgHistory">
                  <el-radio label="0">无</el-radio>
                  <el-radio label="1">有</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="有无冠脉造影≥50%狭窄史">
                <el-radio-group v-model="mr.anamnesis.isCasGt50History">
                  <el-radio label="0">无</el-radio>
                  <el-radio label="1">有</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="有无房颤">
                <el-radio-group v-model="mr.anamnesis.isAtrialFibrillation">
                  <el-radio label="0">无</el-radio>
                  <el-radio label="1">有</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="有无其他心脏病史">
                <el-radio-group v-model="mr.anamnesis.isOtherHeartDiseaseHistory">
                  <el-radio label="0">无</el-radio>
                  <el-radio label="1">有</el-radio>
                </el-radio-group>
                <template v-if="mr.anamnesis.isOtherHeartDiseaseHistory==='1'">
                  <el-form-item label="类型（多选）">
                    <el-checkbox-group v-model="mr.anamnesis.otherHeartDiseaseType">
                      <el-checkbox v-for="item in staticIndex.otherHeartDiseaseTypes" :key="item.id" :label="item.id">{{item.text}}</el-checkbox>
                    </el-checkbox-group>
                    <el-form-item label="其他类型" v-if="mr.anamnesis.otherHeartDiseaseType.indexOf('-1')>='0'">
                      <el-input clearable v-model="mr.anamnesis.otherHeartDiseaseTypeOthers"></el-input>
                    </el-form-item>
                  </el-form-item>
                </template>
              </el-form-item>
            </div>
          </el-card>
          <el-card id="anchor-deep-venous-thrombosis">
            <div slot="header"><span>深静脉血栓</span></div>
            <div>
              <el-form-item label="有无深静脉血栓">
                <el-radio-group v-model="mr.anamnesis.isDeepVenousThrombosis">
                  <el-radio label="0">无</el-radio>
                  <el-radio label="1">有</el-radio>
                </el-radio-group>
                <template v-if="mr.anamnesis.isDeepVenousThrombosis==='1'">
                  <el-input clearable v-model="mr.anamnesis.deepVenousThrombosisOnsetTimeYear" placeholder="填写年份"><template slot="append">年</template></el-input>
                  <el-input clearable v-model="mr.anamnesis.deepVenousThrombosisOnsetTimeMonth" placeholder="填写月份"><template slot="append">月前发生</template></el-input>
                  <el-form-item label="诱因（多选）">
                    <el-checkbox-group v-model="mr.anamnesis.deepVenousThrombosisInducements">
                      <el-checkbox v-for="item in staticIndex.deepVenousThrombosisInducements" :key="item.id" :label="item.id">{{item.text}}</el-checkbox>
                    </el-checkbox-group>
                    <el-form-item label="其他诱因" v-if="mr.anamnesis.deepVenousThrombosisInducements.indexOf('-1')>='0'">
                      <el-input clearable v-model="mr.anamnesis.deepVenousThrombosisInducementsOthers"></el-input>
                    </el-form-item>
                  </el-form-item>
                  <el-form-item label="症状（多选）">
                    <el-checkbox-group v-model="mr.anamnesis.deepVenousThrombosisSymptoms">
                      <el-checkbox v-for="item in staticIndex.deepVenousThrombosisSymptoms" :key="item.id" :label="item.id">{{item.text}}</el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                  <el-form-item label="诊断结果">
                    <el-radio-group v-model="mr.anamnesis.deepVenousThrombosisDiagnosisResult">
                      <el-radio :label="item.id" v-for="item in staticIndex.deepVenousThrombosisDiagnosisResults" :key="item.id">{{item.text}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </template>
              </el-form-item>
            </div>
          </el-card>
          <el-card id="anchor-old-ischemic-stroke">
            <div slot="header"><span>既往缺血性卒中</span></div>
            <div>
              <el-form-item label="有无既往缺血性卒中">
                <el-radio-group v-model="mr.anamnesis.isOldIschemicStroke">
                  <el-radio label="0">无</el-radio>
                  <el-radio label="1">有</el-radio>
                </el-radio-group>
                <template v-if="mr.anamnesis.isOldIschemicStroke==='1'">
                  <el-form-item label="类型">
                    <el-button icon="el-icon-plus" size="mini" type="primary"
                    @click.prevent="addRow(mr.anamnesis.oldIschemicStrokeTypes,
                    {typeName: '',onsetTimeYear: '',onsetTimeMonth: '',onsetFrequency: ''})">
                    添加</el-button>
                  </el-form-item>
                  <el-form-item
                    v-for="(type, index) in mr.anamnesis.oldIschemicStrokeTypes"
                    :label="'类型' + (index + 1)"
                    :key="type.id">
                    <el-select v-model="type.typeName" placeholder="请选择类型">
                      <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.oldIschemicStrokeTypes" :key="item.id"></el-option>
                    </el-select>
                    <el-input clearable v-model="type.onsetTimeYear" placeholder="填写年份" style="vertical-align:baseline;"><template slot="append">年</template></el-input>
                    <el-input clearable v-model="type.onsetTimeMonth" placeholder="填写月份" style="vertical-align:baseline;"><template slot="append">月前</template></el-input>
                    <el-input clearable v-model="type.onsetFrequency" placeholder="填写发生次数" style="vertical-align:baseline;"><template slot="prepend">发生</template><template slot="append">次</template></el-input>
                    <el-button @click.prevent="removeRow(mr.anamnesis.oldIschemicStrokeTypes, index)" type="danger" icon="el-icon-delete"></el-button>
                  </el-form-item>
                </template>
              </el-form-item>
            </div>
          </el-card>
          <el-card id="anchor-vascular-diseases">
            <div slot="header"><span>血管性疾病史</span></div>
            <div>
              <el-form-item label="有无血管性疾病史">
                <el-radio-group v-model="mr.anamnesis.isVascularDiseases">
                  <el-radio label="0">无</el-radio>
                  <el-radio label="1">有</el-radio>
                </el-radio-group>
                <template v-if="mr.anamnesis.isVascularDiseases==='1'">
                  <el-form-item label="类型（多选）">
                    <el-checkbox-group v-model="mr.anamnesis.vascularDiseasesTypes">
                      <el-checkbox v-for="item in staticIndex.vascularDiseasesTypes" :key="item.id" :label="item.id">{{item.text}}</el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </template>
              </el-form-item>
            </div>
          </el-card>
          <el-card id="anchor-hemorrhage">
            <div slot="header"><span>出血病史</span></div>
            <div>
              <el-form-item label="有无出血病史">
                <el-radio-group v-model="mr.anamnesis.isHemorrhage">
                  <el-radio label="0">无</el-radio>
                  <el-radio label="1">有</el-radio>
                </el-radio-group>
                <template v-if="mr.anamnesis.isHemorrhage==='1'">
                  <el-form-item label="类型">
                    <el-button icon="el-icon-plus" size="mini" type="primary"
                    @click.prevent="addRow(mr.anamnesis.hemorrhageTypes,
                    {typeName: '',onsetTime: '',onsetFrequency: ''})">
                    添加</el-button>
                  </el-form-item>
                  <el-form-item
                    v-for="(type, index) in mr.anamnesis.hemorrhageTypes"
                    :label="'类型' + (index + 1)"
                    :key="type.id">
                    <el-select v-model="type.typeName" placeholder="请选择类型">
                      <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.hemorrhageTypes" :key="item.id"></el-option>
                    </el-select>
                    <el-input clearable v-model="type.onsetTime" placeholder="填写发生时间"></el-input>
                    <el-input clearable v-model="type.onsetFrequency" placeholder="填写发生次数" style="vertical-align:baseline;"><template slot="append">次</template></el-input>
                    <el-button @click.prevent="removeRow(mr.anamnesis.hemorrhageTypes, index)" type="danger" icon="el-icon-delete"></el-button>
                  </el-form-item>
                </template>
              </el-form-item>
            </div>
          </el-card>
          <el-card id="anchor-bleeding">
            <div slot="header"><span>出血史</span></div>
            <div>
              <el-form-item label="有无出血史">
                <el-radio-group v-model="mr.anamnesis.isBleeding">
                  <el-radio label="0">无</el-radio>
                  <el-radio label="1">有</el-radio>
                </el-radio-group>
                <template v-if="mr.anamnesis.isBleeding==='1'">
                  <el-form-item label="病因">
                    <el-button icon="el-icon-plus" size="mini" type="primary"
                    @click.prevent="addRow(mr.anamnesis.bleedingCauses,
                    {cause: '',onsetTime: ''})">
                    添加</el-button>
                  </el-form-item>
                  <el-form-item
                    v-for="(cause, index) in mr.anamnesis.bleedingCauses"
                    :label="'病因' + (index + 1)"
                    :key="cause.id">
                    <el-select v-model="cause.typeName" placeholder="请选择病因">
                      <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.bleedingCauses" :key="item.id"></el-option>
                    </el-select>
                    <el-input clearable v-model="cause.onsetTime" placeholder="填写发生时间"></el-input>
                    <el-button @click.prevent="removeRow(mr.anamnesis.bleedingCauses, index)" type="danger" icon="el-icon-delete"></el-button>
                  </el-form-item>
                </template>
              </el-form-item>
            </div>
          </el-card>
          <h3>危险因素</h3>
          <el-card id="anchor-smoking">
            <div slot="header"><span>吸烟</span></div>
            <div>
              <el-form-item label="是否吸烟">
                <el-radio-group v-model="mr.riskFactors.isSomking">
                  <el-radio label="0">否</el-radio>
                  <el-radio label="1">是</el-radio>
                </el-radio-group>
                <template v-if="mr.riskFactors.isSomking==='1'">

                  <el-form-item label="烟龄">
                    <el-input clearable v-model="mr.riskFactors.smokingDuration"><template slot="append">年</template></el-input>
                  </el-form-item>
                  <el-form-item label="平均吸烟量">
                    <el-input clearable v-model="mr.riskFactors.piecesPerDay"><template slot="append">支/日</template></el-input>
                  </el-form-item>
                  <el-form-item label="吸烟类型（多选）">
                    <el-checkbox-group v-model="mr.riskFactors.cigretteType">
                      <el-checkbox v-for="item in staticIndex.cigretteTypes" :key="item.id" :label="item.id">{{item.text}}</el-checkbox>
                    </el-checkbox-group>
                    <el-form-item label="其他类型" v-if="mr.riskFactors.cigretteType.indexOf('-1')>= 0">
                      <el-input clearable v-model="mr.riskFactors.cigretteTypeOthers"></el-input>
                    </el-form-item>
                  </el-form-item>
                  <el-form-item label="是否戒烟">
                    <el-radio-group v-model="mr.riskFactors.isSmokingCessation">
                      <el-radio label="0">否</el-radio>
                      <el-radio label="1">是</el-radio>
                    </el-radio-group>
                    <el-form-item label="戒烟时长" v-if="mr.riskFactors.isSmokingCessation==='1'">
                      <el-input clearable v-model="mr.riskFactors.smokingCessationDuration"><template slot="append">年</template></el-input>
                    </el-form-item>
                  </el-form-item>
                </template>
              </el-form-item>
            </div>
          </el-card>
          <el-card id="anchor-drinking">
            <div slot="header"><span>饮酒</span></div>
            <div>
              <el-form-item label="是否饮酒">
                <el-radio-group v-model="mr.riskFactors.isDrinking">
                  <el-radio label="0">否</el-radio>
                  <el-radio label="1">是</el-radio>
                </el-radio-group>
                <template v-if="mr.riskFactors.isDrinking==='1'">
                  <el-form-item label="酒龄">
                    <el-input clearable v-model="mr.riskFactors.drinkingDuration"><template slot="append">年</template></el-input>
                  </el-form-item>
                  <el-form-item label="平均饮酒量">
                    <el-input clearable v-model="mr.riskFactors.talesPerDay"><template slot="append">两/日</template></el-input>
                  </el-form-item>
                  <el-form-item label="饮酒类型（多选）">
                    <el-checkbox-group v-model="mr.riskFactors.wineType">
                      <el-checkbox v-for="item in staticIndex.wineTypes" :key="item.id" :label="item.id">{{item.text}}</el-checkbox>
                    </el-checkbox-group>
                    <el-form-item label="其他类型" v-if="mr.riskFactors.wineType.indexOf('-1')>= 0">
                      <el-input clearable v-model="mr.riskFactors.wineTypeOthers"></el-input>
                    </el-form-item>
                  </el-form-item>
                  <el-form-item label="是否戒酒">
                    <el-radio-group v-model="mr.riskFactors.isTemperance">
                      <el-radio label="0">否</el-radio>
                      <el-radio label="1">是</el-radio>
                    </el-radio-group>
                    <el-form-item label="戒酒时长" v-if="mr.riskFactors.isTemperance==='1'">
                      <el-input clearable v-model="mr.riskFactors.temperanceDuration"><template slot="append">年</template></el-input>
                    </el-form-item>
                  </el-form-item>
                </template>
              </el-form-item>
            </div>
          </el-card>
          <el-card id="anchor-diet">
            <div slot="header"><span>饮食习惯（每日摄入量）</span></div>
            <div>
              <el-form-item label="饮水">
                <el-select v-model="mr.riskFactors.drinkingAmount" placeholder="请选择">
                  <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.dietHabitDrinkingAmouts" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="谷薯类">
                <el-select v-model="mr.riskFactors.paddyPotato" placeholder="请选择">
                  <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.dietHabitPaddyPotatoes" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="全谷物和杂豆">
                <el-select v-model="mr.riskFactors.grainMixedBeans" placeholder="请选择">
                  <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.dietHabitGrainMixedBeans" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="薯类">
                <el-select v-model="mr.riskFactors.potato" placeholder="请选择">
                  <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.dietHabitPotatoes" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="蔬菜类">
                <el-select v-model="mr.riskFactors.vegetables" placeholder="请选择">
                  <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.dietHabitVegetables" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="水果类">
                <el-select v-model="mr.riskFactors.fruits" placeholder="请选择">
                  <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.dietHabitFruits" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="畜禽肉">
                <el-select v-model="mr.riskFactors.livestockMeat" placeholder="请选择">
                  <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.dietHabitLivestockMeats" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="水产品">
                <el-select v-model="mr.riskFactors.aquaticProducts" placeholder="请选择">
                  <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.dietHabitAquaticProducts" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="蛋类">
                <el-select v-model="mr.riskFactors.eggs" placeholder="请选择">
                  <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.dietHabitEggs" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="奶及奶制品">
                <el-select v-model="mr.riskFactors.milkProducts" placeholder="请选择">
                  <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.dietHabitMilkProducts" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="大豆及坚果类">
                <el-select v-model="mr.riskFactors.soybeansNuts" placeholder="请选择">
                  <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.dietHabitSoybeansNuts" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="食盐">
                <el-select v-model="mr.riskFactors.salt" placeholder="请选择">
                  <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.dietHabitSalts" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="糖">
                <el-select v-model="mr.riskFactors.sugar" placeholder="请选择">
                  <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.dietHabitSugar" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="油">
                <el-select v-model="mr.riskFactors.oil" placeholder="请选择">
                  <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.dietHabitOils" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="肥肉">
                <el-input clearable v-model="mr.riskFactors.fatMeat"><template slot="append">克/周</template></el-input>
              </el-form-item>
              <el-form-item label="内脏">
                <el-input clearable v-model="mr.riskFactors.visceral"><template slot="append">克/周</template></el-input>
              </el-form-item>
            </div>
          </el-card>
          <el-card id="anchor-social-psychology">
            <div slot="header"><span>社会心理因素</span></div>
            <div>
              <el-form-item label="血型性格">
                <el-select v-model="mr.riskFactors.bloodType" placeholder="请选择血型">
                  <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.bloodTypes" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="有无长期心理压力">
                <el-radio-group v-model="mr.riskFactors.isLongtermPsychologicalStress">
                  <el-radio label="0">无</el-radio>
                  <el-radio label="1">有</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="有无抑郁症">
                <el-radio-group v-model="mr.riskFactors.isDepression">
                  <el-radio label="0">无</el-radio>
                  <el-radio label="1">有</el-radio>
                </el-radio-group>
                <span>（悲观、焦虑或反应迟钝、疲劳、缺乏自信、饮食睡眠改变）</span>
              </el-form-item>
            </div>
          </el-card>
          <el-card id="anchor-exercise">
            <div slot="header"><span>运动</span></div>
            <div>
              <el-form-item label="类型">
                <el-select v-model="mr.riskFactors.exerciseType" placeholder="请选择类型">
                  <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.exerciseTypes" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="每次时长">
                <el-select v-model="mr.riskFactors.exerciseDuration" placeholder="请选择时长">
                  <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.exerciseDuration" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="方式（多选）">
                <el-checkbox-group v-model="mr.riskFactors.exerciseMode">
                  <el-checkbox v-for="item in staticIndex.exerciseModes" :key="item.id" :label="item.id">{{item.text}}</el-checkbox>
                </el-checkbox-group>
                <el-form-item label="其他方式" v-if="mr.riskFactors.exerciseMode.indexOf('-1')>= 0">
                  <el-input clearable v-model="mr.riskFactors.exerciseModeOthers"></el-input>
                </el-form-item>
              </el-form-item>
            </div>
          </el-card>
          <el-card id="anchor-central-obesity">
            <div slot="header"><span>中心型肥胖</span></div>
            <div>
              <el-form-item label="有无中心型肥胖">
                <el-radio-group v-model="mr.riskFactors.isCentralObesity">
                  <el-radio label="0">无</el-radio>
                  <el-radio label="1">有</el-radio>
                </el-radio-group>
                <el-form-item label="病史" v-if="mr.riskFactors.isCentralObesity==='1'">
                  <el-input clearable v-model="mr.riskFactors.centralObesityDuration"><template slot="append">年</template></el-input>
                </el-form-item>
              </el-form-item>
              <el-form-item label="身高">
                <el-input clearable v-model="mr.riskFactors.height" @input="calcBMI"><template slot="append">cm</template></el-input>
              </el-form-item>
              <el-form-item label="体重">
                <el-input clearable v-model="mr.riskFactors.weight" @input="calcBMI"><template slot="append">kg</template></el-input>
              </el-form-item>
              <el-form-item label="BMI">
                <el-input readonly v-model="mr.riskFactors.BMI"><template slot="append">kg/m<sup>2</sup></template></el-input>
                <span>BMI：体重/身高<sup>2</sup>，kg/m<sup>2</sup></span>
              </el-form-item>
              <el-form-item label="腰围">
                <el-input clearable v-model="mr.riskFactors.waistline"><template slot="append">cm</template></el-input>
                <span>腰围：男性≥102cm,女性≥88cm（腰围/臀围：男性>1.0，女性>0.9）</span>
              </el-form-item>
              <el-form-item label="颈围">
                <el-input clearable v-model="mr.riskFactors.neckCircumference"><template slot="append">cm</template></el-input>
              </el-form-item>
              <el-form-item label="臀围">
                <el-input clearable v-model="mr.riskFactors.hipline"><template slot="append">cm</template></el-input>
              </el-form-item>
              <el-form-item label="踝围">
                <el-input clearable v-model="mr.riskFactors.ankleGirth"><template slot="append">cm</template></el-input>
              </el-form-item>
            </div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="家族史">
          <div class="quick-anchor">
            <span>快速访问：</span>
            <el-tag @click.native="goAnchor('#anchor-submit-btn')">保存病历</el-tag>
            <br><br><span>家族史：</span>
            <el-tag type="info" @click.native="goAnchor('#anchor-premature-chd')">早发冠心病</el-tag>
            <el-tag type="info" @click.native="goAnchor('#anchor-myocardial-infarction')">心肌梗塞</el-tag>
            <el-tag type="info" @click.native="goAnchor('#anchor-sudden-death')">猝死</el-tag>
            <el-tag type="info" @click.native="goAnchor('#anchor-chemic-stroke')">缺血性脑卒中</el-tag>
            <el-tag type="info" @click.native="goAnchor('#anchor-hemorrhagic-stroke')">出血性脑卒中</el-tag>
            <el-tag type="info" @click.native="goAnchor('#anchor-marfan-syndrome')">马凡综合征</el-tag>
            <el-tag type="info" @click.native="goAnchor('#anchor-other-family-history')">其他</el-tag>
          </div>
          <h3>家族史</h3>
          <el-card id="anchor-premature-chd">
            <div slot="header"><span>早发冠心病</span></div>
            <div>
              <el-form-item label="有无早发冠心病家族史">
                <el-radio-group v-model="mr.familyHistory.prematureChd.isPrematureChd">
                  <el-radio label="0">无</el-radio>
                  <el-radio label="1">有</el-radio>
                </el-radio-group>
                <template v-if="mr.familyHistory.prematureChd.isPrematureChd==='1'">
                  <el-form-item label="发病成员">
                    <el-button icon="el-icon-plus" size="mini" type="primary"
                    @click.prevent="addRow(mr.familyHistory.prematureChd.onsetMembers,
                    {onsetMember: '',gender: '',onsetAge:'', prematureChdType:''})">
                    添加</el-button>
                  </el-form-item>
                  <el-form-item
                    v-for="(member, index) in mr.familyHistory.prematureChd.onsetMembers"
                    :label="'发病成员' + (index + 1)"
                    :key="member.id">
                    <el-select v-model="member.onsetMember" placeholder="请选择发病成员" @change="selectOnsetMember(member)">
                      <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.familyMembers" :key="item.id"></el-option>
                    </el-select>
                    <el-select v-model="member.gender" placeholder="请选择性别">
                      <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.genderList" :key="item.id"></el-option>
                    </el-select>
                    <el-input clearable v-model="member.onsetAge" placeholder="填写发病年龄"></el-input>
                    <el-select v-model="member.prematureChdType" placeholder="请选择冠心病类型">
                      <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.prematureChdTypes" :key="item.id"></el-option>
                    </el-select>
                    <el-button @click.prevent="removeRow(mr.familyHistory.prematureChd.onsetMembers, index)" type="danger" icon="el-icon-delete"></el-button>
                  </el-form-item>
                </template>
              </el-form-item>
            </div>
          </el-card>
          <el-card id="anchor-myocardial-infarction">
            <div slot="header"><span>心肌梗塞</span></div>
            <div>
              <el-form-item label="有无心肌梗塞家族史">
                <el-radio-group v-model="mr.familyHistory.myocardialInfarction.isMyocardialInfarction">
                  <el-radio label="0">无</el-radio>
                  <el-radio label="1">有</el-radio>
                </el-radio-group>
                <template v-if="mr.familyHistory.myocardialInfarction.isMyocardialInfarction==='1'">
                  <el-form-item label="发病成员">
                    <el-button icon="el-icon-plus" size="mini" type="primary"
                    @click.prevent="addRow(mr.familyHistory.myocardialInfarction.onsetMembers,
                    {onsetMember: '',gender: '',onsetAge:''})">
                    添加</el-button>
                  </el-form-item>
                  <el-form-item
                    v-for="(member, index) in mr.familyHistory.myocardialInfarction.onsetMembers"
                    :label="'发病成员' + (index + 1)"
                    :key="member.id">
                    <el-select v-model="member.onsetMember" placeholder="请选择发病成员" @change="selectOnsetMember(member)">
                      <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.familyMembers" :key="item.id"></el-option>
                    </el-select>
                    <el-select v-model="member.gender" placeholder="请选择性别">
                      <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.genderList" :key="item.id"></el-option>
                    </el-select>
                    <el-input clearable v-model="member.onsetAge" placeholder="填写发病年龄"></el-input>
                    <el-button @click.prevent="removeRow(mr.familyHistory.myocardialInfarction.onsetMembers, index)" type="danger" icon="el-icon-delete"></el-button>
                  </el-form-item>
                </template>
              </el-form-item>
            </div>
          </el-card>
          <el-card id="anchor-sudden-death">
            <div slot="header"><span>猝死</span></div>
            <div>
              <el-form-item label="有无猝死家族史">
                <el-radio-group v-model="mr.familyHistory.suddenDeath.isSuddenDeath">
                  <el-radio label="0">无</el-radio>
                  <el-radio label="1">有</el-radio>
                </el-radio-group>
                <template v-if="mr.familyHistory.suddenDeath.isSuddenDeath==='1'">
                  <el-form-item label="发病成员">
                    <el-button icon="el-icon-plus" size="mini" type="primary"
                    @click.prevent="addRow(mr.familyHistory.suddenDeath.onsetMembers,
                    {onsetMember: '',gender: '',onsetAge:'', etiology: '', etiologyOthers:''})">
                    添加</el-button>
                  </el-form-item>
                  <el-form-item
                    v-for="(member, index) in mr.familyHistory.suddenDeath.onsetMembers"
                    :label="'发病成员' + (index + 1)"
                    :key="member.id">
                    <el-select v-model="member.onsetMember" placeholder="请选择发病成员" @change="selectOnsetMember(member)">
                      <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.familyMembers" :key="item.id"></el-option>
                    </el-select>
                    <el-select v-model="member.gender" placeholder="请选择性别">
                      <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.genderList" :key="item.id"></el-option>
                    </el-select>
                    <el-input clearable v-model="member.onsetAge" placeholder="填写发病年龄"></el-input>
                    <el-select v-model="member.etiology" placeholder="请选择发病原因">
                      <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.suddenDeathEtiologies" :key="item.id"></el-option>
                    </el-select>
                    <el-input clearable v-model="member.etiologyOthers" placeholder="填写其他病因" v-if="member.etiology==='-1'"></el-input>
                    <el-button @click.prevent="removeRow(mr.familyHistory.suddenDeath.onsetMembers, index)" type="danger" icon="el-icon-delete"></el-button>
                  </el-form-item>
                </template>
              </el-form-item>
            </div>
          </el-card>
          <el-card id="anchor-chemic-stroke">
            <div slot="header"><span>缺血性脑卒中</span></div>
            <div>
              <el-form-item label="有无缺血性脑卒中家族史">
                <el-radio-group v-model="mr.familyHistory.ischemicStroke.isIschemicStroke">
                  <el-radio label="0">无</el-radio>
                  <el-radio label="1">有</el-radio>
                </el-radio-group>
                <template v-if="mr.familyHistory.ischemicStroke.isIschemicStroke==='1'">
                  <el-form-item label="发病成员">
                    <el-button icon="el-icon-plus" size="mini" type="primary"
                    @click.prevent="addRow(mr.familyHistory.ischemicStroke.onsetMembers,
                    {onsetMember: '',gender: '',onsetAge:''})">
                    添加</el-button>
                  </el-form-item>
                  <el-form-item
                    v-for="(member, index) in mr.familyHistory.ischemicStroke.onsetMembers"
                    :label="'发病成员' + (index + 1)"
                    :key="member.id">
                    <el-select v-model="member.onsetMember" placeholder="请选择发病成员" @change="selectOnsetMember(member)">
                      <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.familyMembers" :key="item.id"></el-option>
                    </el-select>
                    <el-select v-model="member.gender" placeholder="请选择性别">
                      <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.genderList" :key="item.id"></el-option>
                    </el-select>
                    <el-input clearable v-model="member.onsetAge" placeholder="填写发病年龄"></el-input>
                    <el-button @click.prevent="removeRow(mr.familyHistory.ischemicStroke.onsetMembers, index)" type="danger" icon="el-icon-delete"></el-button>
                  </el-form-item>
                </template>
              </el-form-item>
            </div>
          </el-card>
          <el-card id="anchor-hemorrhagic-stroke">
            <div slot="header"><span>出血性脑卒中</span></div>
            <div>
              <el-form-item label="有无出血性脑卒中家族史">
                <el-radio-group v-model="mr.familyHistory.hemorrhagicStroke.isHemorrhagicStroke">
                  <el-radio label="0">无</el-radio>
                  <el-radio label="1">有</el-radio>
                </el-radio-group>
                <template v-if="mr.familyHistory.hemorrhagicStroke.isHemorrhagicStroke==='1'">
                  <el-form-item label="发病成员">
                    <el-button icon="el-icon-plus" size="mini" type="primary"
                    @click.prevent="addRow(mr.familyHistory.hemorrhagicStroke.onsetMembers,
                    {onsetMember: '',gender: '',onsetAge:''})">
                    添加</el-button>
                  </el-form-item>
                  <el-form-item
                    v-for="(member, index) in mr.familyHistory.hemorrhagicStroke.onsetMembers"
                    :label="'发病成员' + (index + 1)"
                    :key="member.id">
                    <el-select v-model="member.onsetMember" placeholder="请选择发病成员" @change="selectOnsetMember(member)">
                      <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.familyMembers" :key="item.id"></el-option>
                    </el-select>
                    <el-select v-model="member.gender" placeholder="请选择性别">
                      <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.genderList" :key="item.id"></el-option>
                    </el-select>
                    <el-input clearable v-model="member.onsetAge" placeholder="填写发病年龄"></el-input>
                    <el-button @click.prevent="removeRow(mr.familyHistory.hemorrhagicStroke.onsetMembers, index)" type="danger" icon="el-icon-delete"></el-button>
                  </el-form-item>
                </template>
              </el-form-item>
            </div>
          </el-card>
          <el-card id="anchor-marfan-syndrome">
            <div slot="header"><span>马凡综合征</span></div>
            <div>
              <el-form-item label="有无马凡综合征家族史">
                <el-radio-group v-model="mr.familyHistory.marfanSyndrome.isMarfanSyndrome">
                  <el-radio label="0">无</el-radio>
                  <el-radio label="1">有</el-radio>
                </el-radio-group>
                <template v-if="mr.familyHistory.marfanSyndrome.isMarfanSyndrome==='1'">
                  <el-form-item label="发病成员">
                    <el-button icon="el-icon-plus" size="mini" type="primary"
                    @click.prevent="addRow(mr.familyHistory.marfanSyndrome.onsetMembers,
                    {onsetMember: '',gender: '',onsetAge:''})">
                    添加</el-button>
                  </el-form-item>
                  <el-form-item
                    v-for="(member, index) in mr.familyHistory.marfanSyndrome.onsetMembers"
                    :label="'发病成员' + (index + 1)"
                    :key="member.id">
                    <el-select v-model="member.onsetMember" placeholder="请选择发病成员" @change="selectOnsetMember(member)">
                      <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.familyMembers" :key="item.id"></el-option>
                    </el-select>
                    <el-select v-model="member.gender" placeholder="请选择性别">
                      <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.genderList" :key="item.id"></el-option>
                    </el-select>
                    <el-input clearable v-model="member.onsetAge" placeholder="填写发病年龄"></el-input>
                    <el-button @click.prevent="removeRow(mr.familyHistory.marfanSyndrome.onsetMembers, index)" type="danger" icon="el-icon-delete"></el-button>
                  </el-form-item>
                </template>
              </el-form-item>
            </div>
          </el-card>
          <el-card id="anchor-other-family-history">
            <div slot="header"><span>其他</span></div>
            <div>
              <el-form-item label="有无其他家族史">
                <el-radio-group v-model="mr.familyHistory.otherFamilyHistory.isOtherFamilyHistory">
                  <el-radio label="0">无</el-radio>
                  <el-radio label="1">有</el-radio>
                </el-radio-group>
                <template v-if="mr.familyHistory.otherFamilyHistory.isOtherFamilyHistory==='1'">
                  <el-form-item label="发病成员">
                    <el-button icon="el-icon-plus" size="mini" type="primary"
                    @click.prevent="addRow(mr.familyHistory.otherFamilyHistory.onsetMembers,
                    {diseaseName: '',onsetMember: '',gender: '',onsetAge:''})">
                    添加</el-button>
                  </el-form-item>
                  <el-form-item
                    v-for="(member, index) in mr.familyHistory.otherFamilyHistory.onsetMembers"
                    :label="'发病成员' + (index + 1)"
                    :key="member.id">
                    <el-input clearable v-model="member.diseaseName" placeholder="填写疾病名称"></el-input>
                    <el-select v-model="member.onsetMember" placeholder="请选择发病成员" @change="selectOnsetMember(member)">
                      <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.familyMembers" :key="item.id"></el-option>
                    </el-select>
                    <el-select v-model="member.gender" placeholder="请选择性别">
                      <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.genderList" :key="item.id"></el-option>
                    </el-select>
                    <el-input clearable v-model="member.onsetAge" placeholder="填写发病年龄"></el-input>
                    <el-button @click.prevent="removeRow(mr.familyHistory.otherFamilyHistory.onsetMembers, index)" type="danger" icon="el-icon-delete"></el-button>
                  </el-form-item>
                </template>
              </el-form-item>
            </div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="体格检查">
          <div class="quick-anchor">
            <span>快速访问：</span>
            <el-tag @click.native="goAnchor('#anchor-submit-btn')">保存病历</el-tag>
          </div>
          <h3>体格检查</h3>
          <el-form-item label="体温">
            <el-input clearable v-model="mr.physicalExamination.bodyTemperature"><template slot="append">&#8451;</template></el-input>
          </el-form-item>
          <el-form-item label="呼吸">
            <el-form-item label="频率">
              <el-input clearable v-model="mr.physicalExamination.respiratoryRate"><template slot="append">次/分钟</template></el-input>
            </el-form-item>
            <el-form-item label="呼吸音">
              <el-radio-group v-model="mr.physicalExamination.isBreathSoundsNormal">
                <el-radio label="1">正常</el-radio>
                <el-radio label="0">异常</el-radio>
              </el-radio-group>
              <template v-if="mr.physicalExamination.isBreathSoundsNormal==='0'">
                <el-form-item label="类型" >
                  <el-select v-model="mr.physicalExamination.breathSoundsType" placeholder="请选择类型">
                    <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.breathSoundsTypes" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="部位" >
                  <el-select v-model="mr.physicalExamination.breathSoundsPart" placeholder="请选择部位">
                  <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.breathSoundsParts" :key="item.id"></el-option>
                </el-select>
                </el-form-item>
              </template>
            </el-form-item>
            <el-form-item label="肺部湿啰音">
              <el-radio-group v-model="mr.physicalExamination.isLungWetRales">
                <el-radio label="1">正常</el-radio>
                <el-radio label="0">异常</el-radio>
              </el-radio-group>
              <template v-if="mr.physicalExamination.isLungWetRales==='0'">
                <el-form-item label="范围" >
                  <el-select v-model="mr.physicalExamination.lungWetRalesRange" placeholder="请选择范围">
                    <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.lungWetRalesRanges" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="部位" >
                  <el-select v-model="mr.physicalExamination.lungWetRalesPart" placeholder="请选择部位">
                    <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.breathSoundsParts" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-form-item>
          </el-form-item>
          <el-form-item label="心率">
            <el-input clearable v-model="mr.physicalExamination.heartRate"><template slot="append">bpm</template></el-input>
          </el-form-item>
          <el-form-item label="心律">
            <el-select v-model="mr.physicalExamination.cardiacRhythm" placeholder="请选择类型">
              <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.cardiacRhythms" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="心音">
            <el-form-item label="S1">
              <el-select v-model="mr.physicalExamination.heartSoundS1Result" placeholder="请选择类型">
                <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.heartSoundS1Results" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="S3/S4奔马律">
              <el-radio-group v-model="mr.physicalExamination.isS3S4GallopRhythm">
                <el-radio label="0">无</el-radio>
                <el-radio label="1">有</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="P2明显亢进">
              <el-radio-group v-model="mr.physicalExamination.p2Hyperactivity">
                <el-radio label="0">无</el-radio>
                <el-radio label="1">有</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="心脏杂音">
              <el-checkbox-group v-model="mr.physicalExamination.cardiacSouffle">
                <el-checkbox v-for="item in staticIndex.cardiacSouffleList" :key="item.id" :label="item.id">{{item.text}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form-item>
          <el-form-item label="脉搏">
            <el-input clearable v-model="mr.physicalExamination.pulse"><template slot="append">次/分钟</template></el-input>
          </el-form-item>
          <el-form-item label="血压">
            <el-input clearable v-model="mr.physicalExamination.BP.SBP" placeholder="收缩压/高压" style="vertical-align:baseline;"><template slot="append">mmHg</template></el-input>
            &nbsp;/&nbsp;
            <el-input clearable v-model="mr.physicalExamination.BP.DBP" placeholder="舒张压/低压" style="vertical-align:baseline;"><template slot="append">mmHg</template></el-input>
          </el-form-item>
          <el-form-item label="肢体血压不对称">
            <el-radio-group v-model="mr.physicalExamination.isLimbBPAsymmetry">
              <el-radio label="0">无</el-radio>
              <el-radio label="1">有</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="蜘蛛指">
            <el-radio-group v-model="mr.physicalExamination.isArachnodactylySyndrome">
              <el-radio label="0">无</el-radio>
              <el-radio label="1">有</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="眼部异常">
            <el-radio-group v-model="mr.physicalExamination.isOcularAbnormal">
              <el-radio label="0">无</el-radio>
              <el-radio label="1">有</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="耳垂有纵向裂纹">
            <el-radio-group v-model="mr.physicalExamination.isEarLobeLongitudinalCrack">
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
            <el-form-item label="部位（多选）" v-if="mr.physicalExamination.isEarLobeLongitudinalCrack==='1'">
              <el-checkbox-group v-model="mr.physicalExamination.earLobeLongitudinalCrackParts">
                <el-checkbox v-for="item in staticIndex.earLobeLongitudinalCrackParts" :key="item.id" :label="item.id">{{item.text}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form-item>
          <el-form-item label="皮肤有黄色素瘤">
            <el-radio-group v-model="mr.physicalExamination.isSkinYellowPigmentTumor">
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
            <el-form-item label="部位（多选）" v-if="mr.physicalExamination.isSkinYellowPigmentTumor==='1'">
              <el-checkbox-group v-model="mr.physicalExamination.skinYellowPigmentTumorParts">
                <el-checkbox v-for="item in staticIndex.skinYellowPigmentTumorParts" :key="item.id" :label="item.id">{{item.text}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form-item>
          <el-form-item label="头顶脱发">
            <el-radio-group v-model="mr.physicalExamination.isAlopecia">
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
            <el-form-item label="部位（多选）" v-if="mr.physicalExamination.isAlopecia==='1'">
              <el-checkbox-group v-model="mr.physicalExamination.alopeciaParts">
                <el-checkbox v-for="item in staticIndex.alopeciaParts" :key="item.id" :label="item.id">{{item.text}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form-item>
          <el-form-item label="颈静脉怒张">
            <el-radio-group v-model="mr.physicalExamination.isDistentionOfJugularVein">
              <el-radio label="0">无</el-radio>
              <el-radio label="1">有</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="常规检查">
          <div class="quick-anchor">
            <span>快速访问：</span>
            <el-tag @click.native="goAnchor('#anchor-submit-btn')">保存病历</el-tag>
            <br><br><span>常规检查：</span>
            <el-tag type="info" @click.native="goAnchor('#anchor-blood-biochemistry')">血生化</el-tag>
            <el-tag type="info" @click.native="goAnchor('#anchor-coagulation-function')">凝血功能</el-tag>
            <el-tag type="info" @click.native="goAnchor('#anchor-blood-routine')">血常规</el-tag>
          </div>
          <h3>常规检查</h3>
          <el-card id="anchor-blood-biochemistry">
            <div slot="header"><span>血生化</span></div>
            <div>
              <el-form-item label="血脂全套">
                <el-form-item label="TC">
                  <el-input clearable v-model="mr.routineExamination.TC" @input="calcNotHDL"><template slot="append">mmol/L</template></el-input>
                </el-form-item>
                <el-form-item label="TG">
                  <el-input clearable v-model="mr.routineExamination.TG"><template slot="append">mmol/L</template></el-input>
                </el-form-item>
                <el-form-item label="LDL-C">
                  <el-input clearable v-model="mr.routineExamination.LDL"><template slot="append">mmol/L</template></el-input>
                </el-form-item>
                <el-form-item label="HDL-C">
                  <el-input clearable v-model="mr.routineExamination.HDL" @input="calcNotHDL"><template slot="append">mmol/L</template></el-input>
                </el-form-item>
                <el-form-item label="非HDL">
                  <el-input readonly v-model="mr.routineExamination.notHDL"><template slot="append">mmol/L</template></el-input>
                  <span>非HDL：[TC] - [HDL-C]</span>
                </el-form-item>
                <el-form-item label="APOA1">
                  <el-input clearable v-model="mr.routineExamination.APOA1"><template slot="append">mmol/L</template></el-input>
                </el-form-item>
                <el-form-item label="APOB">
                  <el-input clearable v-model="mr.routineExamination.APOB"><template slot="append">mmol/L</template></el-input>
                </el-form-item>
              </el-form-item>
              <el-form-item label="血糖">
                <el-form-item label="空腹">
                  <el-input clearable v-model="mr.routineExamination.bloodGlucoseFasting"><template slot="append">mmol/L</template></el-input>
                </el-form-item>
                <el-form-item label="餐后两小时">
                  <el-input clearable v-model="mr.routineExamination.bloodGlucose2hAfterMeal"><template slot="append">mmol/L</template></el-input>
                </el-form-item>
                <el-form-item label="随机">
                  <el-input clearable v-model="mr.routineExamination.bloodGlucoseRandom"><template slot="append">mmol/L</template></el-input>
                </el-form-item>
                <el-form-item label="糖化血红蛋白HbA1c">
                  <el-input clearable v-model="mr.routineExamination.HbA1c"><template slot="append">%</template></el-input>
                </el-form-item>
              </el-form-item>
              <el-form-item label="血清心肌坏死标志物">
                <el-radio-group v-model="mr.routineExamination.isSerumMyocardialNecrosisMarkers">
                  <el-radio label="0">否</el-radio>
                  <el-radio label="1">是</el-radio>
                </el-radio-group>
                <template v-if="mr.routineExamination.isSerumMyocardialNecrosisMarkers=='1'">
                  <el-form-item label="CK">
                    <el-input clearable v-model="mr.routineExamination.myocardialCK"><template slot="append">U/L</template></el-input>
                  </el-form-item>
                  <el-form-item label="CK-MB">
                    <el-input clearable v-model="mr.routineExamination.myocardialCKMB"><template slot="append">U/L</template></el-input>
                  </el-form-item>
                  <el-form-item label="cTnI">
                    <el-input clearable v-model="mr.routineExamination.myocardialCTnI"><template slot="append">μg/L</template></el-input>
                  </el-form-item>
                  <el-form-item label="hs-cTnI">
                    <el-input clearable v-model="mr.routineExamination.myocardialHsCTnI"><template slot="append">μg/L</template></el-input>
                  </el-form-item>
                  <el-form-item label="Mb">
                    <el-input clearable v-model="mr.routineExamination.myocardialMb"><template slot="append">μg/L</template></el-input>
                  </el-form-item>
                </template>
              </el-form-item>
              <el-form-item label="炎症标志物">
                <el-radio-group v-model="mr.routineExamination.isInflammatoryMarkers">
                  <el-radio label="0">否</el-radio>
                  <el-radio label="1">是</el-radio>
                </el-radio-group>
                <template v-if="mr.routineExamination.isInflammatoryMarkers=='1'">
                  <el-form-item label="CRP">
                    <el-input clearable v-model="mr.routineExamination.inflammationCRP"><template slot="append">mg/L</template></el-input>
                  </el-form-item>
                  <el-form-item label="hs-CRP">
                    <el-input clearable v-model="mr.routineExamination.inflammationHsCRP"><template slot="append">mg/L</template></el-input>
                  </el-form-item>
                  <el-form-item label="IL-6">
                    <el-input clearable v-model="mr.routineExamination.inflammationIL6"><template slot="append">pg/mL</template></el-input>
                  </el-form-item>
                  <el-form-item label="IL-1β">
                    <el-input clearable v-model="mr.routineExamination.inflammationIL1Beta"><template slot="append">pg/mL</template></el-input>
                  </el-form-item>
                  <el-form-item label="TNFα">
                    <el-input clearable v-model="mr.routineExamination.inflammationTNFAlpha"><template slot="append">μg/L</template></el-input>
                  </el-form-item>
                  <el-form-item label="ESR">
                    <el-input clearable v-model="mr.routineExamination.inflammationESR"><template slot="append">mm/h</template></el-input>
                  </el-form-item>
                </template>
              </el-form-item>
              <el-form-item label="心衰">
                <el-form-item label="BNP">
                  <el-input clearable v-model="mr.routineExamination.heartFailureBNP"><template slot="append">pg/mL</template></el-input>
                </el-form-item>
                <el-form-item label="NT-proBNP">
                  <el-input clearable v-model="mr.routineExamination.heartFailureNTproBNP"><template slot="append">pg/mL</template></el-input>
                </el-form-item>
              </el-form-item>
              <el-form-item label="电解质">
                <el-form-item label="Na">
                  <el-input clearable v-model="mr.routineExamination.electrolyteNa"><template slot="append">mmol/L</template></el-input>
                </el-form-item>
                <el-form-item label="K">
                  <el-input clearable v-model="mr.routineExamination.electrolyteK"><template slot="append">mmol/L</template></el-input>
                </el-form-item>
                <el-form-item label="Ca">
                  <el-input clearable v-model="mr.routineExamination.electrolyteCa"><template slot="append">mmol/L</template></el-input>
                </el-form-item>
                <el-form-item label="Mg">
                  <el-input clearable v-model="mr.routineExamination.electrolyteMg"><template slot="append">mmol/L</template></el-input>
                </el-form-item>
                <el-form-item label="Cl">
                  <el-input clearable v-model="mr.routineExamination.electrolyteCl"><template slot="append">mmol/L</template></el-input>
                </el-form-item>
              </el-form-item>
              <el-form-item label="肝功能">
                <el-radio-group v-model="mr.routineExamination.isLiverFunction">
                  <el-radio label="0">否</el-radio>
                  <el-radio label="1">是</el-radio>
                </el-radio-group>
                <template v-if="mr.routineExamination.isLiverFunction=='1'">
                  <el-form-item label="总蛋白">
                    <el-input clearable v-model="mr.routineExamination.totalProtein"><template slot="append">g/L</template></el-input>
                  </el-form-item>
                  <el-form-item label="白蛋白">
                    <el-input clearable v-model="mr.routineExamination.albumin"><template slot="append">g/L</template></el-input>
                  </el-form-item>
                  <el-form-item label="总胆红素">
                    <el-input clearable v-model="mr.routineExamination.totalBilirubin"><template slot="append">μmol/L</template></el-input>
                  </el-form-item>
                  <el-form-item label="直接胆红素">
                    <el-input clearable v-model="mr.routineExamination.directBilirubin"><template slot="append">μmol/L</template></el-input>
                  </el-form-item>
                  <el-form-item label="间接胆红素">
                    <el-input clearable v-model="mr.routineExamination.indirectBilirubin"><template slot="append">μmol/L</template></el-input>
                  </el-form-item>
                  <el-form-item label="ALT">
                    <el-input clearable v-model="mr.routineExamination.ALT"><template slot="append">U/L</template></el-input>
                  </el-form-item>
                  <el-form-item label="AST">
                    <el-input clearable v-model="mr.routineExamination.AST"><template slot="append">U/L</template></el-input>
                  </el-form-item>
                </template>
              </el-form-item>
              <el-form-item label="肾功能">
                <el-radio-group v-model="mr.routineExamination.isRenalFunction">
                  <el-radio label="0">否</el-radio>
                  <el-radio label="1">是</el-radio>
                </el-radio-group>
                <template v-if="mr.routineExamination.isRenalFunction=='1'">
                  <el-form-item label="Cr">
                    <el-input clearable v-model="mr.routineExamination.Cr"><template slot="append">μmol/L</template></el-input>
                  </el-form-item>
                  <el-form-item label="UA">
                    <el-input clearable v-model="mr.routineExamination.UA"><template slot="append">μmol/L</template></el-input>
                  </el-form-item>
                  <el-form-item label="BUN">
                    <el-input clearable v-model="mr.routineExamination.BUN"><template slot="append">mmol/L</template></el-input>
                  </el-form-item>
                  <el-form-item label="GFR">
                    <el-input clearable v-model="mr.routineExamination.GFR"><template slot="append">mL/min</template></el-input>
                  </el-form-item>
                  <el-form-item label="eGFR">
                    <el-input clearable v-model="mr.routineExamination.eGFR"><template slot="append">mL/min</template></el-input>
                  </el-form-item>
                </template>
              </el-form-item>
              <el-form-item label="肝肾疾病">
                <el-radio-group v-model="mr.routineExamination.isHepatorenalDisease">
                  <el-radio label="0">否</el-radio>
                  <el-radio label="1">是</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </el-card>
          <el-card id="anchor-coagulation-function">
            <div slot="header"><span>凝血功能</span></div>
            <div>
              <el-form-item label="APTT">
                <el-input clearable v-model="mr.routineExamination.APTT"><template slot="append">s</template></el-input>
              </el-form-item>
              <el-form-item label="PT">
                <el-input clearable v-model="mr.routineExamination.PT"><template slot="append">s</template></el-input>
              </el-form-item>
              <el-form-item label="TT">
                <el-input clearable v-model="mr.routineExamination.TT"><template slot="append">s</template></el-input>
              </el-form-item>
              <el-form-item label="FIB">
                <el-input clearable v-model="mr.routineExamination.FIB"><template slot="append">g/L</template></el-input>
              </el-form-item>
              <el-form-item label="D-二聚体">
                <el-input clearable v-model="mr.routineExamination.dDimer"><template slot="append">mg/L</template></el-input>
              </el-form-item>
              <el-form-item label="INR">
                <el-input clearable v-model="mr.routineExamination.INR"></el-input>
                <el-select v-model="mr.routineExamination.isINRStable" placeholder="请选择类型">
                  <el-option label="稳定" value="1"></el-option>
                  <el-option label="不稳定" value="0"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-card>
          <el-card id="anchor-blood-routine">
            <div slot="header"><span>血常规</span></div>
            <div>
              <el-form-item label="红细胞计数">
                <el-input clearable v-model="mr.routineExamination.redBloodCellCount"><template slot="append">x10^12/L</template></el-input>
              </el-form-item>
              <el-form-item label="红细胞比容">
                <el-input clearable v-model="mr.routineExamination.redBloodCellSpecificVolume"><template slot="append">%</template></el-input>
              </el-form-item>
              <el-form-item label="HGB">
                <el-input clearable v-model="mr.routineExamination.HGB"><template slot="append">g/L</template></el-input>
              </el-form-item>
              <el-form-item label="白细胞计数">
                <el-input clearable v-model="mr.routineExamination.leukocyteCount"><template slot="append">x10^9/L</template></el-input>
              </el-form-item>
              <el-form-item label="中性粒细胞">
                <el-input clearable v-model="mr.routineExamination.neutrophil"><template slot="append">x10^9/L</template></el-input>
              </el-form-item>
              <el-form-item label="嗜酸性粒细胞">
                <el-input clearable v-model="mr.routineExamination.eosinophil"><template slot="append">x10^9/L</template></el-input>
              </el-form-item>
              <el-form-item label="嗜碱性粒细胞">
                <el-input clearable v-model="mr.routineExamination.basophil"><template slot="append">x10^9/L</template></el-input>
              </el-form-item>
              <el-form-item label="淋巴细胞">
                <el-input clearable v-model="mr.routineExamination.lymphocyte"><template slot="append">x10^9/L</template></el-input>
              </el-form-item>
              <el-form-item label="单核细胞">
                <el-input clearable v-model="mr.routineExamination.monocyte"><template slot="append">x10^9/L</template></el-input>
              </el-form-item>
              <el-form-item label="血小板功能数量异常">
                <el-radio-group v-model="mr.routineExamination.isQualitativePlatelet">
                  <el-radio label="0">否</el-radio>
                  <el-radio label="1">是</el-radio>
                </el-radio-group>
                <template v-if="mr.routineExamination.isQualitativePlatelet==='1'">
                  <el-form-item label="血小板计数">
                    <el-form-item label="PLT">
                      <el-input clearable v-model="mr.routineExamination.PCPLT"><template slot="append">x10^9/L</template></el-input>
                    </el-form-item>
                    <el-form-item label="MPV">
                      <el-input clearable v-model="mr.routineExamination.PCMPV"><template slot="append">fL</template></el-input>
                    </el-form-item>
                    <el-form-item label="PDW">
                      <el-input clearable v-model="mr.routineExamination.PCPDW"><template slot="append">%</template></el-input>
                    </el-form-item>
                  </el-form-item>
                  <el-form-item label="血小板聚集率">
                    <el-form-item label="ADP">
                      <el-input clearable v-model="mr.routineExamination.PARADP"><template slot="append">x10^9/L</template></el-input>
                    </el-form-item>
                    <el-form-item label="肾上腺素">
                      <el-input clearable v-model="mr.routineExamination.PAREpinephrine"><template slot="append">%</template></el-input>
                    </el-form-item>
                    <el-form-item label="花生四烯酸">
                      <el-input clearable v-model="mr.routineExamination.PARArachidonicAcid"><template slot="append">%</template></el-input>
                    </el-form-item>
                    <el-form-item label="胶原">
                      <el-input clearable v-model="mr.routineExamination.PARCollagen"><template slot="append">%</template></el-input>
                    </el-form-item>
                    <el-form-item label="瑞斯托霉素">
                      <el-input clearable v-model="mr.routineExamination.PARRistocetin"><template slot="append">%</template></el-input>
                    </el-form-item>
                  </el-form-item>
                </template>
              </el-form-item>
            </div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="特殊检查">
          <div class="quick-anchor">
            <span>快速访问：</span>
            <el-tag @click.native="goAnchor('#anchor-submit-btn')">保存病历</el-tag>
            <br><br><span>特殊检查：</span>
            <el-tag type="info" @click.native="goAnchor('#anchor-ecg')">ECG</el-tag>
            <el-tag type="info" @click.native="goAnchor('#anchor-exercise-ecg')">运动ECG</el-tag>
            <el-tag type="info" @click.native="goAnchor('#anchor-holter-ecg')">长程ECG</el-tag>
            <el-tag type="info" @click.native="goAnchor('#anchor-ucg')">心脏彩超</el-tag>
            <el-tag type="info" @click.native="goAnchor('#anchor-cta')">CT血管造影</el-tag>
            <el-tag type="info" @click.native="goAnchor('#anchor-pci')">冠脉介入</el-tag>
          </div>
          <h3>特殊检查</h3>
          <el-card id="anchor-ecg">
            <div slot="header"><span>ECG</span></div>
            <div>
              <el-form-item label="病理性Q波">
                <el-radio-group v-model="mr.specialExamination.ecg.pathologicalQWave.isPathologicalQWave">
                  <el-radio label="0">无</el-radio>
                  <el-radio label="1">有</el-radio>
                </el-radio-group>
                <template v-if="mr.specialExamination.ecg.pathologicalQWave.isPathologicalQWave==='1'">
                  <el-form-item label="导联（多选）">
                    <el-checkbox-group v-model="mr.specialExamination.ecg.pathologicalQWave.qWaveLeads">
                      <el-checkbox v-for="item in staticIndex.leadSystem" :key="item.id" :label="item.id">{{item.text}}</el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </template>
              </el-form-item>
              <el-form-item label="ST段改变">
                <el-radio-group v-model="mr.specialExamination.ecg.stSegmentChange.isStSegmentChange">
                  <el-radio label="0">无</el-radio>
                  <el-radio label="1">有</el-radio>
                </el-radio-group>
                <template v-if="mr.specialExamination.ecg.stSegmentChange.isStSegmentChange==='1'">
                  <el-form-item label="ST段压低">
                    <el-radio-group v-model="mr.specialExamination.ecg.stSegmentChange.stSegmentDepression.isStSegmentDepression">
                      <el-radio label="0">无</el-radio>
                      <el-radio label="1">有</el-radio>
                    </el-radio-group>
                    <template v-if="mr.specialExamination.ecg.stSegmentChange.stSegmentDepression.isStSegmentDepression==='1'">
                      <el-form-item label="导联">
                        <el-button icon="el-icon-plus" size="mini" type="primary"
                        @click.prevent="addRow(mr.specialExamination.ecg.stSegmentChange.stSegmentDepression.changeDetail,
                        {lead: '',amplitude: ''})">
                        添加</el-button>
                      </el-form-item>
                      <el-form-item
                        v-for="(change, index) in mr.specialExamination.ecg.stSegmentChange.stSegmentDepression.changeDetail"
                        :label="'导联' + (index + 1)"
                        :key="change.id">
                        <el-select v-model="change.lead" placeholder="请选择导联">
                          <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.leadSystem" :key="item.id"></el-option>
                        </el-select>
                        <el-input clearable v-model="change.amplitude" placeholder="幅度" style="vertical-align:baseline;"><template slot="append">mV</template></el-input>
                        <el-button @click.prevent="removeRow(mr.specialExamination.ecg.stSegmentChange.stSegmentDepression.changeDetail, index)" type="danger" icon="el-icon-delete"></el-button>
                      </el-form-item>
                    </template>
                  </el-form-item>
                  <el-form-item label="ST段抬高">
                    <el-radio-group v-model="mr.specialExamination.ecg.stSegmentChange.stSegmentElevation.isStSegmentElevation">
                      <el-radio label="0">无</el-radio>
                      <el-radio label="1">有</el-radio>
                    </el-radio-group>
                    <template v-if="mr.specialExamination.ecg.stSegmentChange.stSegmentElevation.isStSegmentElevation==='1'">
                      <el-form-item label="导联">
                        <el-button icon="el-icon-plus" size="mini" type="primary"
                        @click.prevent="addRow(mr.specialExamination.ecg.stSegmentChange.stSegmentElevation.changeDetail,
                        {lead: '',amplitude: ''})">
                        添加</el-button>
                      </el-form-item>
                      <el-form-item
                        v-for="(change, index) in mr.specialExamination.ecg.stSegmentChange.stSegmentElevation.changeDetail"
                        :label="'导联' + (index + 1)"
                        :key="change.id">
                        <el-select v-model="change.lead" placeholder="请选择导联">
                          <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.leadSystem" :key="item.id"></el-option>
                        </el-select>
                        <el-input clearable v-model="change.amplitude" placeholder="幅度" style="vertical-align:baseline;"><template slot="append">mV</template></el-input>
                        <el-button @click.prevent="removeRow(mr.specialExamination.ecg.stSegmentChange.stSegmentElevation.changeDetail, index)" type="danger" icon="el-icon-delete"></el-button>
                      </el-form-item>
                    </template>
                  </el-form-item>
                </template>
              </el-form-item>
              <el-form-item label="T波改变">
                <el-radio-group v-model="mr.specialExamination.ecg.tWaveChange.isTWaveChange">
                  <el-radio label="0">无</el-radio>
                  <el-radio label="1">有</el-radio>
                </el-radio-group>
                <template v-if="mr.specialExamination.ecg.tWaveChange.isTWaveChange==='1'">
                  <el-form-item label="导联">
                    <el-button icon="el-icon-plus" size="mini" type="primary"
                    @click.prevent="addRow(mr.specialExamination.ecg.tWaveChange.changeDetail,
                    {lead: '',amplitude: '',waveform:''})">
                    添加</el-button>
                  </el-form-item>
                  <el-form-item
                    v-for="(change, index) in mr.specialExamination.ecg.tWaveChange.changeDetail"
                    :label="'导联' + (index + 1)"
                    :key="change.id">
                    <el-select v-model="change.lead" placeholder="请选择导联">
                      <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.leadSystem" :key="item.id"></el-option>
                    </el-select>
                    <el-select v-model="change.waveform" placeholder="请选择波形">
                      <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.ecgWaveforms" :key="item.id"></el-option>
                    </el-select>
                    <el-input clearable v-model="change.amplitude" placeholder="幅度" style="vertical-align:baseline;"><template slot="append">mV</template></el-input>
                    <el-button @click.prevent="removeRow(mr.specialExamination.ecg.tWaveChange.changeDetail, index)" type="danger" icon="el-icon-delete"></el-button>
                  </el-form-item>
                </template>
              </el-form-item>
              <el-form-item label="心律失常">
                <el-radio-group v-model="mr.specialExamination.ecg.arrhythmia.isArrhythmia">
                  <el-radio label="0">无</el-radio>
                  <el-radio label="1">有</el-radio>
                </el-radio-group>
                <template v-if="mr.specialExamination.ecg.arrhythmia.isArrhythmia==='1'">
                  <el-form-item label="类型（多选）">
                    <el-checkbox-group v-model="mr.specialExamination.ecg.arrhythmia.arrhythmiaTypes">
                      <el-checkbox v-for="item in staticIndex.arrhythmiaTypes" :key="item.id" :label="item.id">{{item.text}}</el-checkbox>
                    </el-checkbox-group>
                    <el-form-item label="其他类型" v-if="mr.specialExamination.ecg.arrhythmia.arrhythmiaTypes.indexOf('-1')>='0'">
                      <el-input clearable v-model="mr.specialExamination.ecg.arrhythmia.arrhythmiaTypeOthers"></el-input>
                    </el-form-item>
                  </el-form-item>
                </template>
              </el-form-item>
              <el-form-item label="ECG结果">
                <el-radio-group v-model="mr.specialExamination.ecg.isResultNormal">
                  <el-radio label="1">正常</el-radio>
                  <el-radio label="0">异常</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="检查结论">
                <el-input clearable type="textarea" v-model="mr.specialExamination.ecg.findings"></el-input>
              </el-form-item>
            </div>
          </el-card>
          <el-card id="anchor-exercise-ecg">
            <div slot="header"><span>运动ECG</span></div>
            <div>
              <el-form-item>
                <el-input clearable v-model="mr.specialExamination.exerciseEcg.exerciseDuration" ><template slot="prepend">运动</template><template slot="append">分钟后</template></el-input>
                <el-form-item label="心绞痛">
                  <el-radio-group v-model="mr.specialExamination.exerciseEcg.isExerciseAngina">
                    <el-radio label="0">无</el-radio>
                    <el-radio label="1">有</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="血压最高值">
                  <el-input clearable v-model="mr.specialExamination.exerciseEcg.maximumBP.SBP" placeholder="收缩压/高压" style="vertical-align:baseline;"><template slot="append">mmHg</template></el-input>
                  &nbsp;/&nbsp;
                  <el-input clearable v-model="mr.specialExamination.exerciseEcg.maximumBP.DBP" placeholder="舒张压/低压" style="vertical-align:baseline;"><template slot="append">mmHg</template></el-input>
                </el-form-item>
                <el-form-item label="血压最低值">
                  <el-input clearable v-model="mr.specialExamination.exerciseEcg.minimumBP.SBP" placeholder="收缩压/高压" style="vertical-align:baseline;"><template slot="append">mmHg</template></el-input>
                  &nbsp;/&nbsp;
                  <el-input clearable v-model="mr.specialExamination.exerciseEcg.minimumBP.DBP" placeholder="舒张压/低压" style="vertical-align:baseline;"><template slot="append">mmHg</template></el-input>
                </el-form-item>
              </el-form-item>
              <el-form-item label="ST段改变">
                <el-radio-group v-model="mr.specialExamination.exerciseEcg.stSegmentChange.isStSegmentChange">
                  <el-radio label="0">无</el-radio>
                  <el-radio label="1">有</el-radio>
                </el-radio-group>
                <template v-if="mr.specialExamination.exerciseEcg.stSegmentChange.isStSegmentChange==='1'">
                  <el-form-item label="ST段压低">
                    <el-radio-group v-model="mr.specialExamination.exerciseEcg.stSegmentChange.stSegmentDepression.isStSegmentDepression">
                      <el-radio label="0">无</el-radio>
                      <el-radio label="1">有</el-radio>
                    </el-radio-group>
                    <template v-if="mr.specialExamination.exerciseEcg.stSegmentChange.stSegmentDepression.isStSegmentDepression==='1'">
                      <el-form-item label="持续时间">
                        <el-input clearable v-model="mr.specialExamination.exerciseEcg.stSegmentChange.stSegmentDepression.duration"><template slot="append">分钟</template></el-input>
                      </el-form-item>
                      <el-form-item label="导联">
                        <el-button icon="el-icon-plus" size="mini" type="primary"
                        @click.prevent="addRow(mr.specialExamination.exerciseEcg.stSegmentChange.stSegmentDepression.changeDetail,
                        {lead: '',amplitude: ''})">
                        添加</el-button>
                      </el-form-item>
                      <el-form-item
                        v-for="(change, index) in mr.specialExamination.exerciseEcg.stSegmentChange.stSegmentDepression.changeDetail"
                        :label="'导联' + (index + 1)"
                        :key="change.id">
                        <el-select v-model="change.lead" placeholder="请选择导联">
                          <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.leadSystem" :key="item.id"></el-option>
                        </el-select>
                        <el-input clearable v-model="change.amplitude" placeholder="幅度" style="vertical-align:baseline;"><template slot="append">mV</template></el-input>
                        <el-button @click.prevent="removeRow(mr.specialExamination.exerciseEcg.stSegmentChange.stSegmentDepression.changeDetail, index)" type="danger" icon="el-icon-delete"></el-button>
                      </el-form-item>
                    </template>
                  </el-form-item>
                  <el-form-item label="ST段抬高">
                    <el-radio-group v-model="mr.specialExamination.exerciseEcg.stSegmentChange.stSegmentElevation.isStSegmentElevation">
                      <el-radio label="0">无</el-radio>
                      <el-radio label="1">有</el-radio>
                    </el-radio-group>
                    <template v-if="mr.specialExamination.exerciseEcg.stSegmentChange.stSegmentElevation.isStSegmentElevation==='1'">
                      <el-form-item label="持续时间">
                        <el-input clearable v-model="mr.specialExamination.exerciseEcg.stSegmentChange.stSegmentElevation.duration"><template slot="append">分钟</template></el-input>
                      </el-form-item>
                      <el-form-item label="导联">
                        <el-button icon="el-icon-plus" size="mini" type="primary"
                        @click.prevent="addRow(mr.specialExamination.exerciseEcg.stSegmentChange.stSegmentElevation.changeDetail,
                        {lead: '',amplitude: ''})">
                        添加</el-button>
                      </el-form-item>
                      <el-form-item
                        v-for="(change, index) in mr.specialExamination.exerciseEcg.stSegmentChange.stSegmentElevation.changeDetail"
                        :label="'导联' + (index + 1)"
                        :key="change.id">
                        <el-select v-model="change.lead" placeholder="请选择导联">
                          <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.leadSystem" :key="item.id"></el-option>
                        </el-select>
                        <el-input clearable v-model="change.amplitude" placeholder="幅度" style="vertical-align:baseline;"><template slot="append">mV</template></el-input>
                        <el-button @click.prevent="removeRow(mr.specialExamination.exerciseEcg.stSegmentChange.stSegmentElevation.changeDetail, index)" type="danger" icon="el-icon-delete"></el-button>
                      </el-form-item>
                    </template>
                  </el-form-item>
                </template>
              </el-form-item>
              <el-form-item label="T波改变">
                <el-radio-group v-model="mr.specialExamination.exerciseEcg.tWaveChange.isTWaveChange">
                  <el-radio label="0">无</el-radio>
                  <el-radio label="1">有</el-radio>
                </el-radio-group>
                <template v-if="mr.specialExamination.exerciseEcg.tWaveChange.isTWaveChange==='1'">
                  <el-form-item label="持续时间">
                    <el-input clearable v-model="mr.specialExamination.exerciseEcg.tWaveChange.duration"><template slot="append">分钟</template></el-input>
                  </el-form-item>
                  <el-form-item label="导联">
                    <el-button icon="el-icon-plus" size="mini" type="primary"
                    @click.prevent="addRow(mr.specialExamination.exerciseEcg.tWaveChange.changeDetail,
                    {lead: '',amplitude: '',waveform:''})">
                    添加</el-button>
                  </el-form-item>
                  <el-form-item
                    v-for="(change, index) in mr.specialExamination.exerciseEcg.tWaveChange.changeDetail"
                    :label="'导联' + (index + 1)"
                    :key="change.id">
                    <el-select v-model="change.lead" placeholder="请选择导联">
                      <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.leadSystem" :key="item.id"></el-option>
                    </el-select>
                    <el-select v-model="change.waveform" placeholder="请选择波形">
                      <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.ecgWaveforms" :key="item.id"></el-option>
                    </el-select>
                    <el-input clearable v-model="change.amplitude" placeholder="幅度" style="vertical-align:baseline;"><template slot="append">mV</template></el-input>
                    <el-button @click.prevent="removeRow(mr.specialExamination.exerciseEcg.tWaveChange.changeDetail, index)" type="danger" icon="el-icon-delete"></el-button>
                  </el-form-item>
                </template>
              </el-form-item>
              <el-form-item label="运动ECG结果">
                <el-radio-group v-model="mr.specialExamination.exerciseEcg.result">
                  <el-radio :label="item.id" v-for="item in staticIndex.ecgResults" :key="item.id">{{item.text}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="检查结论">
                <el-input clearable type="textarea" v-model="mr.specialExamination.exerciseEcg.findings"></el-input>
              </el-form-item>
            </div>
          </el-card>
          <el-card id="anchor-holter-ecg">
            <div slot="header"><span>长程ECG</span></div>
            <div>
              <el-form-item label="心博总数">
                <el-input clearable v-model="mr.specialExamination.holterEcg.totalHeartbeats"><template slot="append">次/天</template></el-input>
              </el-form-item>
              <el-form-item label="平均心率">
                <el-input clearable v-model="mr.specialExamination.holterEcg.averageHeartRate"><template slot="append">bpm</template></el-input>
              </el-form-item>
              <el-form-item label="最高心率">
                <el-input clearable v-model="mr.specialExamination.holterEcg.maximalHeartRate"><template slot="append">bpm</template></el-input>
                <el-input clearable v-model="mr.specialExamination.holterEcg.maximalHeartRateOccurrenceTime"><template slot="prepend">发生时间</template></el-input>
              </el-form-item>
              <el-form-item label="最低心率">
                <el-input clearable v-model="mr.specialExamination.holterEcg.minimalHeartRate"><template slot="append">bpm</template></el-input>
                <el-input clearable v-model="mr.specialExamination.holterEcg.minimalHeartRateOccurrenceTime"><template slot="prepend">发生时间</template></el-input>
              </el-form-item>
              <el-form-item label="心律失常">
                <el-radio-group v-model="mr.specialExamination.holterEcg.arrhythmia.isArrhythmia">
                  <el-radio label="0">无</el-radio>
                  <el-radio label="1">有</el-radio>
                </el-radio-group>
                <template v-if="mr.specialExamination.holterEcg.arrhythmia.isArrhythmia==='1'">
                  <el-form-item label="频度">
                    <el-input clearable v-model="mr.specialExamination.holterEcg.arrhythmia.frequentness"><template slot="append">次/天</template></el-input>
                  </el-form-item>
                  <el-form-item label="异常心博总数">
                    <el-input clearable v-model="mr.specialExamination.holterEcg.arrhythmia.totalAbnormalHeartbeats"><template slot="append">次/天</template></el-input>
                  </el-form-item>
                  <el-form-item label="类型">
                    <el-button icon="el-icon-plus" size="mini" type="primary"
                    @click.prevent="addRow(mr.specialExamination.holterEcg.arrhythmia.arrhythmiaTypes,
                    {arrhythmiaType: '',arrhythmiaTypeOthers: '',duration:''})">
                    添加</el-button>
                  </el-form-item>
                  <el-form-item
                    v-for="(type, index) in mr.specialExamination.holterEcg.arrhythmia.arrhythmiaTypes"
                    :label="'类型' + (index + 1)"
                    :key="type.id">
                    <el-select v-model="type.arrhythmiaType" placeholder="请选择类型">
                      <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.arrhythmiaTypes" :key="item.id"></el-option>
                    </el-select>
                    <el-input clearable v-model="type.arrhythmiaTypeOthers" placeholder="其他类型" v-if="type.arrhythmiaType==='-1'"></el-input>
                    <el-input clearable v-model="type.duration" placeholder="持续时间" style="vertical-align:baseline;"><template slot="append">分钟</template></el-input>
                    <el-button @click.prevent="removeRow(mr.specialExamination.holterEcg.arrhythmia.arrhythmiaTypes, index)" type="danger" icon="el-icon-delete"></el-button>
                  </el-form-item>
                </template>
              </el-form-item>
              <el-form-item label="病理性Q波">
                <el-radio-group v-model="mr.specialExamination.holterEcg.pathologicalQWave.isPathologicalQWave">
                  <el-radio label="0">无</el-radio>
                  <el-radio label="1">有</el-radio>
                </el-radio-group>
                <template v-if="mr.specialExamination.holterEcg.pathologicalQWave.isPathologicalQWave==='1'">
                  <el-form-item label="频度">
                    <el-input clearable v-model="mr.specialExamination.holterEcg.pathologicalQWave.frequentness"><template slot="append">次/天</template></el-input>
                  </el-form-item>
                  <el-form-item label="导联">
                    <el-button icon="el-icon-plus" size="mini" type="primary"
                    @click.prevent="addRow(mr.specialExamination.holterEcg.pathologicalQWave.qWaveLeadsDetail,
                    {time: '',qWaveLeads: []})">
                    添加</el-button>
                  </el-form-item>
                  <el-form-item
                    v-for="(lead, index) in mr.specialExamination.holterEcg.pathologicalQWave.qWaveLeadsDetail"
                    :label="'导联' + (index + 1)"
                    :key="lead.id">
                    <el-form-item label="时间">
                      <el-input clearable v-model="lead.time" placeholder="时间"></el-input>
                      <el-button @click.prevent="removeRow(mr.specialExamination.holterEcg.pathologicalQWave.qWaveLeadsDetail, index)" type="danger" icon="el-icon-delete"></el-button>
                    </el-form-item>
                    <el-form-item label="导联（多选）">
                      <el-checkbox-group v-model="lead.qWaveLeads">
                        <el-checkbox v-for="item in staticIndex.leadSystem" :key="item.id" :label="item.id">{{item.text}}</el-checkbox>
                      </el-checkbox-group>
                    </el-form-item>
                  </el-form-item>
                </template>
              </el-form-item>
              <el-form-item label="ST段改变">
                <el-radio-group v-model="mr.specialExamination.holterEcg.stSegmentChange.isStSegmentChange">
                  <el-radio label="0">无</el-radio>
                  <el-radio label="1">有</el-radio>
                </el-radio-group>
                <template v-if="mr.specialExamination.holterEcg.stSegmentChange.isStSegmentChange==='1'">
                  <el-form-item label="ST段压低">
                    <el-radio-group v-model="mr.specialExamination.holterEcg.stSegmentChange.stSegmentDepression.isStSegmentDepression">
                      <el-radio label="0">无</el-radio>
                      <el-radio label="1">有</el-radio>
                    </el-radio-group>
                    <template v-if="mr.specialExamination.holterEcg.stSegmentChange.stSegmentDepression.isStSegmentDepression==='1'">
                      <el-form-item label="频度">
                        <el-input clearable v-model="mr.specialExamination.holterEcg.stSegmentChange.stSegmentDepression.frequentness"><template slot="append">次/天</template></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button icon="el-icon-plus" size="mini" type="primary"
                        @click.prevent="addRow(mr.specialExamination.holterEcg.stSegmentChange.stSegmentDepression.changesDetail,
                        {duration: '',leads: []})">
                        添加</el-button>
                      </el-form-item>
                      <el-form-item
                        v-for="(change, index) in mr.specialExamination.holterEcg.stSegmentChange.stSegmentDepression.changesDetail"
                        :label="''+(index + 1)"
                        :key="change.id">
                        <el-form-item label="持续时间">
                          <el-input clearable v-model="change.duration" placeholder="持续时间" style="vertical-align:baseline;"><template slot="append">分钟</template></el-input>
                          <el-button @click.prevent="removeRow(mr.specialExamination.holterEcg.stSegmentChange.stSegmentDepression.changesDetail, index)" type="danger" icon="el-icon-delete"></el-button>
                        </el-form-item>
                        <el-form-item label="导联">
                          <el-button icon="el-icon-plus" size="mini" type="primary"
                          @click.prevent="addRow(change.leads,
                          {lead: '',amplitude: ''})">
                          添加</el-button>
                        </el-form-item>
                        <el-form-item
                          v-for="(detail, subIndex) in change.leads"
                          :label="'导联' + (subIndex + 1)"
                          :key="detail.id">
                          <el-select v-model="detail.lead" placeholder="请选择导联">
                            <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.leadSystem" :key="item.id"></el-option>
                          </el-select>
                          <el-input clearable v-model="detail.amplitude" placeholder="幅度" style="vertical-align:baseline;"><template slot="append">mV</template></el-input>
                          <el-button @click.prevent="removeRow(change.leads, subIndex)" type="danger" icon="el-icon-delete"></el-button>
                        </el-form-item>
                      </el-form-item>
                    </template>
                  </el-form-item>
                  <el-form-item label="ST段抬高">
                    <el-radio-group v-model="mr.specialExamination.holterEcg.stSegmentChange.stSegmentElevation.isStSegmentElevation">
                      <el-radio label="0">无</el-radio>
                      <el-radio label="1">有</el-radio>
                    </el-radio-group>
                    <template v-if="mr.specialExamination.holterEcg.stSegmentChange.stSegmentElevation.isStSegmentElevation==='1'">
                      <el-form-item label="频度">
                        <el-input clearable v-model="mr.specialExamination.holterEcg.stSegmentChange.stSegmentElevation.frequentness"><template slot="append">次/天</template></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button icon="el-icon-plus" size="mini" type="primary"
                        @click.prevent="addRow(mr.specialExamination.holterEcg.stSegmentChange.stSegmentElevation.changesDetail,
                        {duration: '',leads: []})">
                        添加</el-button>
                      </el-form-item>
                      <el-form-item
                        v-for="(change, index) in mr.specialExamination.holterEcg.stSegmentChange.stSegmentElevation.changesDetail"
                        :label="''+(index + 1)"
                        :key="change.id">
                        <el-form-item label="持续时间">
                          <el-input clearable v-model="change.duration" placeholder="持续时间" style="vertical-align:baseline;"><template slot="append">分钟</template></el-input>
                          <el-button @click.prevent="removeRow(mr.specialExamination.holterEcg.stSegmentChange.stSegmentElevation.changesDetail, index)" type="danger" icon="el-icon-delete"></el-button>
                        </el-form-item>
                        <el-form-item label="导联">
                          <el-button icon="el-icon-plus" size="mini" type="primary"
                          @click.prevent="addRow(change.leads,
                          {lead: '',amplitude: ''})">
                          添加</el-button>
                        </el-form-item>
                        <el-form-item
                          v-for="(detail, subIndex) in change.leads"
                          :label="'导联' + (subIndex + 1)"
                          :key="detail.id">
                          <el-select v-model="detail.lead" placeholder="请选择导联">
                            <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.leadSystem" :key="item.id"></el-option>
                          </el-select>
                          <el-input clearable v-model="detail.amplitude" placeholder="幅度" style="vertical-align:baseline;"><template slot="append">mV</template></el-input>
                          <el-button @click.prevent="removeRow(change.leads, subIndex)" type="danger" icon="el-icon-delete"></el-button>
                        </el-form-item>
                      </el-form-item>
                    </template>
                  </el-form-item>
                </template>
              </el-form-item>
              <el-form-item label="T波改变">
                <el-radio-group v-model="mr.specialExamination.holterEcg.tWaveChange.isTWaveChange">
                  <el-radio label="0">无</el-radio>
                  <el-radio label="1">有</el-radio>
                </el-radio-group>
                <template v-if="mr.specialExamination.holterEcg.tWaveChange.isTWaveChange==='1'">
                  <el-form-item label="频度">
                    <el-input clearable v-model="mr.specialExamination.holterEcg.tWaveChange.frequentness"><template slot="append">次/天</template></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button icon="el-icon-plus" size="mini" type="primary"
                    @click.prevent="addRow(mr.specialExamination.holterEcg.tWaveChange.changesDetail,
                    {duration: '',leads: []})">
                    添加</el-button>
                  </el-form-item>
                  <el-form-item
                    v-for="(change, index) in mr.specialExamination.holterEcg.tWaveChange.changesDetail"
                    :label="''+(index + 1)"
                    :key="change.id">
                    <el-form-item label="持续时间">
                      <el-input clearable v-model="change.duration" placeholder="持续时间" style="vertical-align:baseline;"><template slot="append">分钟</template></el-input>
                      <el-button @click.prevent="removeRow(mr.specialExamination.holterEcg.tWaveChange.changesDetail, index)" type="danger" icon="el-icon-delete"></el-button>
                    </el-form-item>
                    <el-form-item label="导联">
                      <el-button icon="el-icon-plus" size="mini" type="primary"
                      @click.prevent="addRow(change.leads,
                      {lead: '',amplitude: '',waveform:''})">
                      添加</el-button>
                    </el-form-item>
                    <el-form-item
                      v-for="(detail, subIndex) in change.leads"
                      :label="'导联' + (subIndex + 1)"
                      :key="detail.id">
                      <el-select v-model="detail.lead" placeholder="请选择导联">
                        <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.leadSystem" :key="item.id"></el-option>
                      </el-select>
                      <el-select v-model="detail.waveform" placeholder="请选择波形">
                        <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.ecgWaveforms" :key="item.id"></el-option>
                      </el-select>
                      <el-input clearable v-model="detail.amplitude" placeholder="幅度" style="vertical-align:baseline;"><template slot="append">mV</template></el-input>
                      <el-button @click.prevent="removeRow(change.leads, subIndex)" type="danger" icon="el-icon-delete"></el-button>
                    </el-form-item>
                  </el-form-item>
                </template>
              </el-form-item>
              <el-form-item label="检查结论">
                <el-input clearable type="textarea" v-model="mr.specialExamination.holterEcg.findings"></el-input>
              </el-form-item>
            </div>
          </el-card>
          <el-card id="anchor-ucg">
            <div slot="header"><span>心脏彩超</span></div>
            <div>
              <el-form-item label="左室舒张末期内径（LVD）">
                <el-input clearable v-model="mr.specialExamination.ucg.LVD"><template slot="append">mm</template></el-input>
              </el-form-item>
              <el-form-item label="左室舒张末期容量（EDV）">
                <el-input clearable v-model="mr.specialExamination.ucg.EDV"><template slot="append">mL</template></el-input>
              </el-form-item>
              <el-form-item label="左室收缩末期内径（LVS）">
                <el-input clearable v-model="mr.specialExamination.ucg.LVS"><template slot="append">mm</template></el-input>
              </el-form-item>
              <el-form-item label="左室收缩末期容量（ESV）">
                <el-input clearable v-model="mr.specialExamination.ucg.ESV"><template slot="append">mL</template></el-input>
              </el-form-item>
              <el-form-item label="左房内径（LAD）">
                <el-input clearable v-model="mr.specialExamination.ucg.LAD"><template slot="append">mm</template></el-input>
              </el-form-item>
              <el-form-item label="左室后壁厚度（LVPW）">
                <el-input clearable v-model="mr.specialExamination.ucg.LVPW"><template slot="append">mm</template></el-input>
              </el-form-item>
              <el-form-item label="室间隔厚度（IVST）">
                <el-input clearable v-model="mr.specialExamination.ucg.IVST"><template slot="append">mm</template></el-input>
              </el-form-item>
              <!-- <el-form-item label="LVEF < 40%">
                <el-radio-group v-model="mr.specialExamination.ucg.isLVEFLtFortyPercent">
                  <el-radio label="0">否</el-radio>
                  <el-radio label="1">是</el-radio>
                </el-radio-group>
                <template v-if="mr.specialExamination.ucg.isLVEFLtFortyPercent==='1'">
                  <el-form-item label="E/A">
                    <el-input clearable v-model="mr.specialExamination.ucg.ratioEToA"><template slot="append">%</template></el-input>
                  </el-form-item>
                  <el-form-item label="EF">
                    <el-input clearable v-model="mr.specialExamination.ucg.EF" placeholder=""></el-input>
                  </el-form-item>
                </template>
              </el-form-item> -->
              <el-form-item label="主动脉根部直径">
                <el-input clearable v-model="mr.specialExamination.ucg.aorticRootDiameter"><template slot="append">mm</template></el-input>
              </el-form-item>
              <el-form-item label="主动脉最粗直径">
                <el-input clearable v-model="mr.specialExamination.ucg.aorticThickestDiameter"><template slot="append">mm</template></el-input>
              </el-form-item>
              <el-form-item label="LVEF">
                <el-input clearable v-model="mr.specialExamination.ucg.LVEF"><template slot="append">%</template></el-input>
              </el-form-item>
              <el-form-item label="E/A">
                <el-input clearable v-model="mr.specialExamination.ucg.ratioEToA" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="EF">
                <el-input clearable v-model="mr.specialExamination.ucg.EF"><template slot="append">%</template></el-input>
              </el-form-item>
              <el-form-item label="FS">
                <el-input clearable v-model="mr.specialExamination.ucg.FS"><template slot="append">%</template></el-input>
              </el-form-item>
              <el-form-item label="肺动脉压力">
                <el-input clearable v-model="mr.specialExamination.ucg.pulmonaryArteryPressure"><template slot="append">mmHg</template></el-input>
              </el-form-item>
              <el-form-item label="心包积液">
                <el-radio-group v-model="mr.specialExamination.ucg.pericardialEffusion">
                  <el-radio label="0">否</el-radio>
                  <el-radio label="1">是</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="局部运动异常">
                <el-radio-group v-model="mr.specialExamination.ucg.isLocalMotionAbnormality">
                  <el-radio label="0">否</el-radio>
                  <el-radio label="1">是</el-radio>
                </el-radio-group>
                <template v-if="mr.specialExamination.ucg.isLocalMotionAbnormality==='1'">
                  <el-form-item label="部位（多选）">
                    <el-checkbox-group v-model="mr.specialExamination.ucg.localMotionAbnormalityParts">
                      <el-checkbox v-for="item in staticIndex.ucgParts" :key="item.id" :label="item.id">{{item.text}}</el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </template>
              </el-form-item>
              <el-form-item label="室壁瘤">
                <el-radio-group v-model="mr.specialExamination.ucg.isVntricularAneurysm">
                  <el-radio label="0">否</el-radio>
                  <el-radio label="1">是</el-radio>
                </el-radio-group>
                <template v-if="mr.specialExamination.ucg.isVntricularAneurysm==='1'">
                  <el-form-item label="部位（多选）">
                    <el-checkbox-group v-model="mr.specialExamination.ucg.vntricularAneurysmParts">
                      <el-checkbox v-for="item in staticIndex.ucgParts" :key="item.id" :label="item.id">{{item.text}}</el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </template>
              </el-form-item>
              <el-form-item label="附壁血栓">
                <el-radio-group v-model="mr.specialExamination.ucg.isVentricularThrombosis">
                  <el-radio label="0">否</el-radio>
                  <el-radio label="1">是</el-radio>
                </el-radio-group>
                <template v-if="mr.specialExamination.ucg.isVentricularThrombosis==='1'">
                  <el-form-item label="部位（多选）">
                    <el-checkbox-group v-model="mr.specialExamination.ucg.ventricularThrombosisParts">
                      <el-checkbox v-for="item in staticIndex.ventricularThrombosisParts" :key="item.id" :label="item.id">{{item.text}}</el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </template>
              </el-form-item>
              <el-form-item label="检查结论">
                <el-input clearable type="textarea" v-model="mr.specialExamination.ucg.findings"></el-input>
              </el-form-item>
            </div>
          </el-card>
          <el-card id="anchor-cta">
            <div slot="header"><span>CT血管造影</span></div>
            <div>
              <el-form-item label="冠脉CTA">
                <el-form-item label="冠脉分布">
                  <el-radio-group v-model="mr.specialExamination.cta.coronaryDistributionType">
                    <el-radio :label="item.id" v-for="item in staticIndex.coronaryDistributionTypes" :key="item.id">{{item.text}}</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="狭窄部位">
                  <el-button icon="el-icon-plus" size="mini" type="primary"
                  @click.prevent="addRow(mr.specialExamination.cta.narrowSites,
                  {lesionSite: '', percentage: ''})">
                  添加</el-button>
                </el-form-item>
                <el-form-item
                  v-for="(site, index) in mr.specialExamination.cta.narrowSites"
                  :label="'部位' + (index + 1)"
                  :key="site.id">
                  <el-select v-model="site.lesionSite" placeholder="请选择部位">
                    <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.lesionSiteList" :key="item.id"></el-option>
                  </el-select>
                  <el-input clearable v-model="site.percentage" placeholder="比例" style="vertical-align:baseline;"><template slot="append">%</template></el-input>
                  <el-button @click.prevent="removeRow(mr.specialExamination.cta.narrowSites, index)" type="danger" icon="el-icon-delete"></el-button>
                </el-form-item>
                <el-form-item label="冠脉畸形">
                  <el-radio-group v-model="mr.specialExamination.cta.isCoronaryMalformations">
                    <el-radio label="0">无</el-radio>
                    <el-radio label="1">有</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="侧枝循环">
                  <el-radio-group v-model="mr.specialExamination.cta.isCollateralCirculation">
                    <el-radio label="0">无</el-radio>
                    <el-radio label="1">有</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="心肌桥">
                  <el-radio-group v-model="mr.specialExamination.cta.isMyocardialBridge">
                    <el-radio label="0">无</el-radio>
                    <el-radio label="1">有</el-radio>
                  </el-radio-group>
                  <template v-if="mr.specialExamination.cta.isMyocardialBridge==='1'">
                    <el-form-item label="部位">
                      <el-input clearable v-model="mr.specialExamination.cta.myocardialBridgeSite"></el-input>
                    </el-form-item>
                  </template>
                </el-form-item>
              </el-form-item>
              <el-form-item label="大动脉CTA">
                <el-form-item label="类型">
                  <el-checkbox-group v-model="mr.specialExamination.cta.mainArteryTypes">
                    <el-checkbox v-for="item in staticIndex.mainArteryTypes" :key="item.id" :label="item.id">{{item.text}}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item label="内膜破口">
                  <el-radio-group v-model="mr.specialExamination.cta.isIntimalTear">
                    <el-radio label="0">无</el-radio>
                    <el-radio label="1">有</el-radio>
                  </el-radio-group>
                  <el-form-item label="部位" v-if="mr.specialExamination.cta.isIntimalTear==='1'">
                    <el-checkbox-group v-model="mr.specialExamination.cta.intimalTearSites">
                      <el-checkbox v-for="item in staticIndex.intimalTearSiteList" :key="item.id" :label="item.id">{{item.text}}</el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </el-form-item>
                <el-form-item label="主动脉重要分支受累或缺血">
                  <el-radio-group v-model="mr.specialExamination.cta.aortaImportantBranchInvolvementOrIschemia">
                    <el-radio label="0">无</el-radio>
                    <el-radio label="1">有</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="胸腔积液">
                  <el-radio-group v-model="mr.specialExamination.cta.pleuralEffusion">
                    <el-radio :label="item.id" v-for="item in staticIndex.pleuralEffusionList" :key="item.id">{{item.text}}</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="假腔内血栓形成">
                  <el-radio-group v-model="mr.specialExamination.cta.intravascularThrombusFormation">
                    <el-radio label="0">无</el-radio>
                    <el-radio label="1">有</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form-item>
              <el-form-item label="肺动脉CTA">
                <el-form-item label="肺栓塞">
                  <el-radio-group v-model="mr.specialExamination.cta.isPulmonaryEmbolism">
                    <el-radio label="0">无</el-radio>
                    <el-radio label="1">有</el-radio>
                  </el-radio-group>
                  <el-form-item label="部位类型" v-if="mr.specialExamination.cta.isPulmonaryEmbolism==='1'">
                    <el-checkbox-group v-model="mr.specialExamination.cta.pulmonaryEmbolismTypes">
                      <el-checkbox v-for="item in staticIndex.pulmonaryEmbolismTypes" :key="item.id" :label="item.id">{{item.text}}</el-checkbox>
                    </el-checkbox-group>
                    <img src="./cta-img.jpg" alt="肺栓塞部位图" style="border: 1px dashed #999;border-radius:5px;vertical-align:middle;max-width:100%">
                  </el-form-item>
                </el-form-item>
              </el-form-item>
            </div>
          </el-card>
          <el-card id="anchor-pci">
            <div slot="header"><span>冠脉介入</span></div>
            <div>
              <el-form-item label="编号">
                <el-input clearable v-model="mr.specialExamination.pci.num"></el-input>
              </el-form-item>
              <el-form-item label="日期">
                <el-date-picker type="date" placeholder="选择日期" v-model="mr.specialExamination.pci.date" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
              <el-form-item label="类型">
                <el-select v-model="mr.specialExamination.pci.pciType" placeholder="请选择类型">
                  <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.pciTypes" :key="item.id"></el-option>
                </el-select>
                <el-input clearable v-model="mr.specialExamination.pci.thrombolysisInterval"
                v-if="mr.specialExamination.pci.pciType==='3'||mr.specialExamination.pci.pciType==='4'"
                placeholder="PCI距溶栓时间"><template slot="append">小时</template></el-input>
              </el-form-item>
              <el-form-item>
                <el-input clearable v-model="mr.specialExamination.pci.onsetIntervalDay"><template slot="prepend">发病后</template><template slot="append">天</template></el-input>
                <el-input clearable v-model="mr.specialExamination.pci.onsetIntervalHour"><template slot="append">小时进行PCI</template></el-input>
                <el-input clearable v-model="mr.specialExamination.pci.stayTimePrehospital"><template slot="prepend">院前</template><template slot="append">分钟</template></el-input>
                <el-input clearable v-model="mr.specialExamination.pci.stayTimeEmergencyCall"><template slot="prepend">急/门诊</template><template slot="append">分钟</template></el-input>
                <el-input clearable v-model="mr.specialExamination.pci.stayTimeCCU"><template slot="prepend">CCU</template><template slot="append">分钟</template></el-input>
                <el-input clearable v-model="mr.specialExamination.pci.stayTimeConduitRoom"><template slot="prepend">导管室</template><template slot="append">分钟</template></el-input>
              </el-form-item>
              <el-form-item label="造影剂（多选）">
                <el-checkbox-group v-model="mr.specialExamination.pci.contrastMedia">
                  <el-checkbox v-for="item in staticIndex.contrastMedia" :key="item.id" :label="item.id">{{item.text}}</el-checkbox>
                </el-checkbox-group>
                <el-form-item label="其他造影剂" v-if="mr.specialExamination.pci.contrastMedia.indexOf('-1')>=0">
                  <el-input clearable v-model="mr.specialExamination.pci.contrastMediaOthers"></el-input>
                </el-form-item>
              </el-form-item>
              <el-form-item label="造影结果">
                <el-form-item label="冠脉分布">
                  <el-radio-group v-model="mr.specialExamination.pci.coronaryDistributionType">
                    <el-radio :label="item.id" v-for="item in staticIndex.coronaryDistributionTypes" :key="item.id">{{item.text}}</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="冠脉畸形">
                  <el-radio-group v-model="mr.specialExamination.pci.isCoronaryMalformations">
                    <el-radio label="0">无</el-radio>
                    <el-radio label="1">有</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="三支病变">
                  <el-radio-group v-model="mr.specialExamination.pci.isTripleVesselDisease">
                    <el-radio label="0">无</el-radio>
                    <el-radio label="1">有</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="血流TIMI0-2级">
                  <el-radio-group v-model="mr.specialExamination.pci.isBloodFlowTIMIGrade0to2">
                    <el-radio label="0">无</el-radio>
                    <el-radio label="1">有</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="CTO">
                  <el-radio-group v-model="mr.specialExamination.pci.isCTO">
                    <el-radio label="0">无</el-radio>
                    <el-radio label="1">有</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="侧枝循环">
                  <el-radio-group v-model="mr.specialExamination.pci.isCollateralCirculation">
                    <el-radio label="0">无</el-radio>
                    <el-radio label="1">有</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form-item>
              <el-form-item label="介入路径（多选）">
                <el-checkbox-group v-model="mr.specialExamination.pci.pciPaths">
                  <el-checkbox v-for="item in staticIndex.pciPaths" :key="item.id" :label="item.id">{{item.text}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="植入支架部位">
                <el-form-item label="LAD">
                  <el-input clearable v-model="mr.specialExamination.pci.implantedBracketCountLAD"><template slot="append">个</template></el-input>
                </el-form-item>
                <el-form-item label="LCX">
                  <el-input clearable v-model="mr.specialExamination.pci.implantedBracketCountLCX"><template slot="append">个</template></el-input>
                </el-form-item>
                <el-form-item label="RCA">
                  <el-input clearable v-model="mr.specialExamination.pci.implantedBracketCountRCA"><template slot="append">个</template></el-input>
                </el-form-item>
                <el-form-item label="LM">
                  <el-input clearable v-model="mr.specialExamination.pci.implantedBracketCountLM"><template slot="append">个</template></el-input>
                </el-form-item>
              </el-form-item>
              <el-form-item label="病变节段">
                <span>节段位置信息图</span>
                <img src="./pci-img.jpg" alt="节段位置信息图" style="border: 1px dashed #999;border-radius:5px;vertical-align:middle;max-width:100%">
              </el-form-item>
              <el-form-item>
                <el-button icon="el-icon-plus" size="mini" type="primary"
                @click.prevent="addRow(mr.specialExamination.pci.segmentalLesions,
                {num: '', stenosis: '', length: '', shape: '', isCalcification: '', isOstialLesion: '', isThrombus: '',
                TIMIGrade: '', kindsOfLesions: '', pciGuidewire: '',  balloon: '', stent: ''})">
                添加</el-button>
              </el-form-item>
              <el-form-item
                v-for="(segment, index) in mr.specialExamination.pci.segmentalLesions"
                :label="'病变节段' + (index + 1)"
                :key="segment.id">
                <el-select v-model="segment.num" placeholder="请选择病变节段">
                  <el-option :label="n" :value="n" v-for="n in 23" :key="n"></el-option>
                </el-select>
                <el-input clearable v-model="segment.stenosis" style="vertical-align:bottom;"><template slot="prepend">狭窄</template><template slot="append">%</template></el-input>
                <el-input clearable v-model="segment.length"  style="vertical-align:bottom;"><template slot="prepend">长</template><template slot="append">mm</template></el-input>
                <el-select v-model="segment.shape" placeholder="请选择形态">
                  <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.segmentalLesionsShapes" :key="item.id"></el-option>
                </el-select>
                <el-select v-model="segment.isCalcification" placeholder="请选择钙化">
                  <el-option label="有" value="1"></el-option>
                  <el-option label="无" value="0"></el-option>
                </el-select>
                <el-select v-model="segment.isOstialLesion" placeholder="请选择开口病变">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
                <el-select v-model="segment.isThrombus" placeholder="请选择血栓">
                  <el-option label="有" value="1"></el-option>
                  <el-option label="无" value="0"></el-option>
                </el-select>
                <el-select v-model="segment.TIMIGrade" placeholder="请选择TIMI">
                  <el-option label="0" value="0"></el-option>
                  <el-option label="I" value="I"></el-option>
                  <el-option label="II" value="II"></el-option>
                  <el-option label="III" value="III"></el-option>
                </el-select>
                <el-select v-model="segment.kindsOfLesions" placeholder="请选择病变类型">
                  <el-option label="A型" value="A"></el-option>
                  <el-option label="B型" value="B"></el-option>
                  <el-option label="C型" value="C"></el-option>
                </el-select>
                <el-input clearable v-model="segment.pciGuidewire" style="vertical-align:bottom;"><template slot="prepend">PCI导丝</template></el-input>
                <el-input clearable v-model="segment.balloon"><template slot="prepend">球囊</template></el-input>
                <el-input clearable v-model="segment.stent"><template slot="prepend">支架</template></el-input>
                <el-button @click.prevent="removeRow(mr.specialExamination.pci.segmentalLesions, index)" type="danger" icon="el-icon-delete" style="vertical-align:top;"></el-button>
              </el-form-item>
            </div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="入院诊断">
          <div class="quick-anchor">
            <span>快速访问：</span>
            <el-tag @click.native="goAnchor('#anchor-submit-btn')">保存病历</el-tag>
          </div>
          <h3>入院诊断</h3>
          <el-form-item label="无痛性心肌缺血">
            <el-radio-group v-model="mr.admissionDiagnosis.isSilentMyocardialIschemia">
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="冠脉微血管病变">
            <el-radio-group v-model="mr.admissionDiagnosis.isCoronaryMicrovascularDisease">
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="心肌梗死">
            <el-radio-group v-model="mr.admissionDiagnosis.isMyocardialInfarction">
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
            <template v-if="mr.admissionDiagnosis.isMyocardialInfarction==='1'">
              <el-form-item label="类型">
                <el-select v-model="mr.admissionDiagnosis.myocardialInfarctionType" placeholder="请选择类型">
                  <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.myocardialInfarctionTypes" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="部位">
                <el-input clearable v-model="mr.admissionDiagnosis.myocardialInfarctionPart"></el-input>
              </el-form-item>
            </template>
          </el-form-item>
          <el-form-item label="心绞痛">
            <el-radio-group v-model="mr.admissionDiagnosis.isAngina">
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
            <template v-if="mr.admissionDiagnosis.isAngina==='1'">
              <el-form-item label="类型">
                <el-select v-model="mr.admissionDiagnosis.anginaType" placeholder="请选择类型">
                  <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.anginaTypes" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="CCS分级">
                <el-select v-model="mr.admissionDiagnosis.anginaCcs" placeholder="请选择CCS分级">
                  <el-option label="I" value="I"></el-option>
                  <el-option label="II" value="II"></el-option>
                  <el-option label="III" value="III"></el-option>
                  <el-option label="IV" value="IV"></el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-form-item>
          <el-form-item label="缺血性心肌病">
            <el-radio-group v-model="mr.admissionDiagnosis.isIschemicCardiomyopathy">
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="冠心病猝死">
            <el-radio-group v-model="mr.admissionDiagnosis.isSuddenCoronaryDeath">
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="胸痛原因待查">
            <el-radio-group v-model="mr.admissionDiagnosis.isChestPainOfUnknownOrigin">
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="主动脉夹层">
            <el-radio-group v-model="mr.admissionDiagnosis.isAorticDissection">
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
            <el-form-item label="类型" v-if="mr.admissionDiagnosis.isAorticDissection==='1'">
              <el-select v-model="mr.admissionDiagnosis.aorticDissectionType" placeholder="请选择类型">
                <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.aorticDissectionTypes" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-form-item>
          <el-form-item label="肺动脉栓塞">
            <el-radio-group v-model="mr.admissionDiagnosis.isPulmonaryEmbolism">
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="马凡综合征">
            <el-radio-group v-model="mr.admissionDiagnosis.isMarfanSyndrome">
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="其他">
            <el-radio-group v-model="mr.admissionDiagnosis.isDiagnosisOthers">
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
            <el-form-item label="其他诊断" v-if="mr.admissionDiagnosis.isDiagnosisOthers==='1'">
              <el-input clearable v-model="mr.admissionDiagnosis.diagnosisOthers"></el-input>
            </el-form-item>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="出院诊断">
          <div class="quick-anchor">
            <span>快速访问：</span>
            <el-tag @click.native="goAnchor('#anchor-submit-btn')">保存病历</el-tag>
          </div>
          <h3>出院诊断</h3>
          <el-form-item label="无痛性心肌缺血">
            <el-radio-group v-model="mr.dischargeDiagnosis.isSilentMyocardialIschemia">
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="冠脉微血管病变">
            <el-radio-group v-model="mr.dischargeDiagnosis.isCoronaryMicrovascularDisease">
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="心肌梗死">
            <el-radio-group v-model="mr.dischargeDiagnosis.isMyocardialInfarction">
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
            <template v-if="mr.dischargeDiagnosis.isMyocardialInfarction==='1'">
              <el-form-item label="类型">
                <el-select v-model="mr.dischargeDiagnosis.myocardialInfarctionType" placeholder="请选择类型">
                  <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.myocardialInfarctionTypes" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="部位">
                <el-input clearable v-model="mr.dischargeDiagnosis.myocardialInfarctionPart"></el-input>
              </el-form-item>
            </template>
          </el-form-item>
          <el-form-item label="心绞痛">
            <el-radio-group v-model="mr.dischargeDiagnosis.isAngina">
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
            <template v-if="mr.dischargeDiagnosis.isAngina==='1'">
              <el-form-item label="类型">
                <el-select v-model="mr.dischargeDiagnosis.anginaType" placeholder="请选择类型">
                  <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.anginaTypes" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="CCS分级">
                <el-select v-model="mr.dischargeDiagnosis.anginaCcs" placeholder="请选择CCS分级">
                  <el-option label="I" value="I"></el-option>
                  <el-option label="II" value="II"></el-option>
                  <el-option label="III" value="III"></el-option>
                  <el-option label="IV" value="IV"></el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-form-item>
          <el-form-item label="缺血性心肌病">
            <el-radio-group v-model="mr.dischargeDiagnosis.isIschemicCardiomyopathy">
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="冠心病猝死">
            <el-radio-group v-model="mr.dischargeDiagnosis.isSuddenCoronaryDeath">
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="胸痛原因待查">
            <el-radio-group v-model="mr.dischargeDiagnosis.isChestPainOfUnknownOrigin">
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="主动脉夹层">
            <el-radio-group v-model="mr.dischargeDiagnosis.isAorticDissection">
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
            <el-form-item label="类型" v-if="mr.dischargeDiagnosis.isAorticDissection==='1'">
              <el-select v-model="mr.dischargeDiagnosis.aorticDissectionType" placeholder="请选择类型">
                <el-option :label="item.text" :value="item.id" v-for="item in staticIndex.aorticDissectionTypes" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-form-item>
          <el-form-item label="肺动脉栓塞">
            <el-radio-group v-model="mr.dischargeDiagnosis.isPulmonaryEmbolism">
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="马凡综合征">
            <el-radio-group v-model="mr.dischargeDiagnosis.isMarfanSyndrome">
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="其他">
            <el-radio-group v-model="mr.dischargeDiagnosis.isDiagnosisOthers">
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
            <el-form-item label="其他诊断" v-if="mr.dischargeDiagnosis.isDiagnosisOthers==='1'">
              <el-input clearable v-model="mr.dischargeDiagnosis.diagnosisOthers"></el-input>
            </el-form-item>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <div class="submit" id="anchor-submit-btn">
      <el-button type="primary" icon="el-icon-check" @click="submit">保存病历</el-button>
    </div>
  </div>
</template>

<script>
import { getMr, insertMr, updateMr } from '@/api/mr'
import { mapGetters } from 'vuex'
import LocationPicker from '@/components/location-picker'
export default {
  data () {
    // 自定义联系方式校验规则
    let checkContactInfo = (rule, value, callback) => {
      const inputGroup = rule.field.split('|')
      let cellphone1 = this.mr.basicInfo[inputGroup[0]]
      let cellphone2 = this.mr.basicInfo[inputGroup[1]]
      let telephone = this.mr.basicInfo[inputGroup[2]]
      if (!cellphone1 && !cellphone2 && !telephone) {
        callback(new Error('请至少填写联系方式中的一项'))
      } else {
        if (cellphone1 && !/1[0-9]{10}/.test(cellphone1)) {
          callback(new Error('手机号1格式错误'))
        }
        if (cellphone2 && !/1[0-9]{10}/.test(cellphone2)) {
          callback(new Error('手机号2格式错误'))
        }
        callback()
      }
    }
    return {
      // 页面提示信息
      prompt: '提示：填写完病历中患者的基本信息、现病史、既往史、家族史、体格检查和常规检查的相关数据后，可以选择点击保存病历，会自动生成初步分析结果以及后续的检查（特殊检查）建议',
      // 病历基本状态
      mr: null,
      mrLoading: true,
      activeTab: '0',

      // 日期选择框选项
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },

      // 患者基本信息校验规则

      // TODO:添加更详细的规则验证
      rules: {
        // 包含二级属性的值，需要加引号才能生效
        'basicInfo.name': [{ required: true, message: '患者姓名不能为空', trigger: 'blur' }],
        // 'basicInfo.medicalCardNum': [{ required: true, message: '患者就诊卡号不能为空', trigger: 'blur' }],
        'basicInfo.idNum': [{ pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/, message: '身份证号格式错误', trigger: 'blur' }],
        'cellphone1|cellphone2|telephone': [{ validator: checkContactInfo, trigger: 'blur' }],
        'basicInfo.gender': [{ required: true, message: '请选择患者性别', trigger: 'blur' }],
        'basicInfo.age': [{ required: true, message: '患者年龄不能为空', trigger: 'blur' }, { type: 'number', message: '年龄必须为数字值' }],
        'basicInfo.admissionNum': [{ required: true, message: '患者住院号不能为空', trigger: 'blur' }],
        // 'basicInfo.bedNum': [{ required: true, message: '患者床位号不能为空', trigger: 'blur' }],
        'basicInfo.doctor': [{ required: true, message: '请选择患者主治医生', trigger: 'blur' }],
        'basicInfo.recorder': [{ required: true, message: '记录者不能为空', trigger: 'blur' }]
      },

      // 现病史包含的疾病名，用于页面遍历，第一个为空，与staticIndex对应，从1开始
      historyOfPresentIllness: ['', 'chestPain', 'chestDistress', 'dyspnea', 'palpitation', 'abnormalEcg']
      // 家族史列表，修改数据库字段

      // familyHistoryIllness: []
    }
  },
  computed: {
    ...mapGetters([
      'emptyMr',
      'doctorList',
      'staticIndex',
      'screen'
    ]),
    position () {
      if (this.screen.size.id < 2) {
        return 'top'
      } else {
        return 'right'
      }
    },
    // 住院时长
    hospitalizationDuration () {
      if (this.mr.basicInfo.hospitalizationTime[1] && this.mr.basicInfo.hospitalizationTime[0]) {
        let timediff = (this.mr.basicInfo.hospitalizationTime[1] - this.mr.basicInfo.hospitalizationTime[0]) / 1000
        let days = parseInt(timediff / 86400)
        let hours = parseInt(timediff % 86400 / 3600)
        let mins = parseInt(timediff % 86400 % 3600 / 60)
        return days + '天' + hours + '小时' + mins + '分钟'
      } else {
        return ''
      }
    }
  },
  methods: {
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
    // 选择发病成员之后自动选择性别
    selectOnsetMember (member) {
      let maleMember = ['1', '3', '6', '8', '9']
      if (maleMember.indexOf(member.onsetMember) >= 0) {
        member.gender = '1'
      } else {
        member.gender = '2'
      }
    },
    calcBMI () {
      if (this.mr.riskFactors.height && this.mr.riskFactors.weight) {
        let height = this.mr.riskFactors.height
        let weight = this.mr.riskFactors.weight
        if (parseInt(height).toString() !== 'NaN' && parseInt(weight).toString() !== 'NaN') {
          this.mr.riskFactors.BMI = (weight / ((height / 100) * (height / 100))).toFixed(2)
        } else {
          this.mr.riskFactors.BMI = ''
        }
      } else {
        this.mr.riskFactors.BMI = ''
      }
    },
    calcNotHDL () {
      if (this.mr.routineExamination.TC && this.mr.routineExamination.HDL) {
        let TC = this.mr.routineExamination.TC
        let HDL = this.mr.routineExamination.HDL
        if (parseInt(TC).toString() !== 'NaN' && parseInt(HDL).toString() !== 'NaN') {
          this.mr.routineExamination.notHDL = (TC - HDL).toFixed(2)
        } else {
          this.mr.routineExamination.notHDL = ''
        }
      } else {
        this.mr.routineExamination.notHDL = ''
      }
    },
    submit () {
      this.$confirm('点击确定将保存已填写的所有信息，再次编辑需要在病历列表中选择操作, 是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.mr._id && this.mr._id !== '') {
          // 编辑
          updateMr(this.mr).then(response => {
            if (response.status) {
              this.$message({
                type: 'success',
                message: '保存成功!'
              })
              this.$router.push({ path: '/mr' })
            } else {
              this.$message({
                type: 'error',
                message: '保存失败，请稍后重试!'
              })
            }
          })
        } else {
          // 新增
          insertMr(this.mr).then(response => {
            if (response.status) {
              this.$message({
                type: 'success',
                message: '保存成功!'
              })
              this.$router.push({ path: '/mr' })
            } else {
              this.$message({
                type: 'error',
                message: '保存失败，请稍后重试!'
              })
            }
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消保存'
        })
      })
    },
    goAnchor (selector) {
      /**
       * offsetTop 是当前元素距离offsetParent的距离
       * offsetParent是距离当前元素最近的一个设置了postion属性的元素
       */
      let fixedHeight = this.$el.querySelector('.el-form').offsetTop - 50
      let anchor = this.$el.querySelector(selector)
      document.body.scrollTop = anchor.offsetTop + fixedHeight
      document.documentElement.scrollTop = anchor.offsetTop + fixedHeight
    }
  },
  mounted () {
    this.$store.dispatch('GetDoctorList')
    this.$store.dispatch('GetStaticIndex')
    getMr(this.$route.params.id).then(response => {
      // console.log(response)
      this.mr = response.data.data
      this.mrLoading = false
    }).catch(error => {
      console.log(error)
      this.$message({
        type: 'error',
        message: '病历数据加载失败，请重试'
      })
    })
  },
  watch: {
    // 监听路由变化，用于处理，从编辑页面跳转到添加页面，数据不重置的问题
    '$route' (to, from) {
      // console.log(to, from)
      this.mrLoading = true
      getMr(this.$route.params.id).then(response => {
        this.mr = response.data.data
        this.activeTab = '0'
        this.mrLoading = false
      }).catch(error => {
        console.log(error)
        this.$message({
          type: 'error',
          message: '病历数据加载失败，请重试'
        })
      })
    }
  },
  components: {
    LocationPicker
  }
}
</script>

<style lang="scss" scoped>
.content-wrapper {
  .el-form {
    h3 {
      color: #666;
      margin-bottom: 30px;
    }
    .el-input {
      max-width: 300px;
    }
    .el-textarea {
      max-width: 500px;
    }
    .el-card {
      margin-bottom: 20px;
    }
    .el-radio-group + span,
    .el-input + span {
      font-size:12px;
      color:#999;
      margin-left:10px;
    }
    .el-tag {
      cursor: pointer;
      margin: 5px 0;
    }
    .quick-anchor {
      padding: 10px 0;
      border-bottom: 1px solid #dcdfe6;
    }
  }
  .submit {
    margin-top: 20px;
    text-align: center;
    button {
      width: 300px;
    }
  }
}
@media (max-width: 767px) {
  .content-wrapper {
    .el-form {
      .el-radio-group + span,
      .el-input + span {
        margin-left:0;
      }
    }
    .submit {
      button {
        width: 100%;
      }
    }
  }
}
</style>
