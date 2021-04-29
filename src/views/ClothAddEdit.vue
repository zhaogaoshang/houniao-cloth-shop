<template>
  <div class="public-column store-page">
    <el-form ref="form" :model="form" label-width="100px">
      <user>
        <div class="public-row__align">
          <div class="public-miaobao-left">客户管理 </div>
          <div class="public-mianbao-middle"> > </div>
          <div class="public-mianbao-right"> 编辑面料 </div>
          <btn class="public-mianbao-back" @click.native="$router.go(-1)">返回上一级</btn>
        </div>
      </user>
      <shadow-box>
        <div class="title">编辑面料</div>
        <el-row>
          <el-col :span="16" class="middle-box">
            <div class="middle-box">
              <el-form-item label="面料图片：">
                <!-- <el-upload
                  :disabled="type == 'info'"
                  class="upload-demo"
                  name="imgUpload"
                  :data="{
                    merchantCode: $store.state.user.userInfo.merchantCode,
                    superMerchantCode: $store.state.user.userInfo.superMerchantCode,
                    typeName: 'introduce'
                  }"
                  :action="$apis.api_upload_shopByPhoto"
                  :show-file-list="false"
                  :on-success="handleDiscriptionImage">
                  <btn typeStyle="su">上传</btn>
                </el-upload> -->

                <f-upload
                  :disabled="type == 'info'"
                  class="avatar-uploader"
                  :upData="{
                    typeName: 'introduce'
                  }"
                  @on-success="handleDiscriptionImage"
                  :url="$apis.api_upload_shopByPhoto">
                    <btn typeStyle="su">上传</btn>
                  </f-upload>

              </el-form-item>
              <img class="store-avatar" v-if="ruleForm.logoPath" :src="$apis.photoHost + ruleForm.logoPath">
            </div>
            <div class="middle-box">
              <el-form-item label="材质球：">
                <!-- <el-upload
                  :headers="{
                    token: $store.state.user.token
                  }"
                  :disabled="type == 'info'"
                  class="upload-demo"
                  name="imgUpload"
                  :data="{
                    merchantCode: $store.state.user.userInfo.merchantCode,
                    superMerchantCode: $store.state.user.userInfo.superMerchantCode,
                    typeName: 'introduce'
                  }"
                  :action="$apis.api_upload_shopByPhoto"
                  :show-file-list="false"
                  :on-success="handleDiscriptionImage">
                  <btn typeStyle="su">上传</btn>
                </el-upload> -->

                <f-upload
                  :disabled="type == 'info'"
                  class="avatar-uploader"
                  :upData="{
                    typeName: 'introduce'
                  }"
                  @on-success="handleDiscriptionImage"
                  :url="$apis.api_upload_shopByPhoto">
                    <btn typeStyle="su">上传</btn>
                  </f-upload>
              </el-form-item>
              <img class="store-avatar" v-if="ruleForm.logoPath" :src="$apis.photoHost + ruleForm.logoPath">
            </div>
            <el-form-item label="面料品牌：" prop="name">
              <el-input v-model="ruleForm.abbreviationName" :disabled="type == 'info'"></el-input>
            </el-form-item>

            <el-form-item label="面料编号：" prop="region">
              <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="面料名称：" prop="region">
              <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="面料颜色：" prop="region">
              <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="面料属性：" prop="region">
              <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="面料成分：" prop="region">
              <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="面料册：" prop="name">
              <el-input v-model="ruleForm.abbreviationName" :disabled="type == 'info'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <div class="applicable-title">适用品类</div>
            <div>
              <el-form-item label="单品：" prop="type">
                <el-checkbox-group v-model="ruleForm.type">
                  <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                  <el-checkbox label="地推活动" name="type"></el-checkbox>
                  <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                  <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="套装：" prop="type">
                <el-checkbox-group v-model="ruleForm.type">
                  <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                  <el-checkbox label="地推活动" name="type"></el-checkbox>
                  <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                  <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <div class="public-row__center">
          <discolor-btn typeStyle="middle" @click.native="submitForm('ruleForm')">保存</discolor-btn>
          &nbsp;
        </div>
      </shadow-box>
    </el-form>
  </div>
</template>
<script>
import Btn from '../components/Btn.vue'
import DiscolorBtn from '../components/DiscolorBtn.vue'
import FUpload from '../components/FUpload.vue'
import ShadowBox from '../components/ShadowBox.vue'
import User from '../components/User.vue'
export default {
  components: { User, ShadowBox, DiscolorBtn, Btn, FUpload },
  data () {
    return {
      ruleForm: {
        // type: 0,
        // name: '', // 门店名称
        // abbreviationName: '', // 简称
        // phone: '', // 手机
        // remark: '', // 备注
        // address: '', // 地址
        // logoPath: '' // 图片路径
        id: '', // 主键id
        photoPath: '', // 图片路径
        materialArticleNumber: '', // 面料货号
        materialNo: '', // 面料编号
        brandId: '', // 品牌id
        brandParentId: '', // 品牌父id
        materialComponent: '', // 面料成分
        attributeId: '', // 属性id
        colourId: '', // 颜色id
        materialOrigin: '', // 面料产地
        materialPrice: '', // 面料价格
        discountId: '', // 优惠id
        materialRange: '', // 面料幅度
        materialYarn: '', // 面料砂支
        materialGramWeight: '', // 面料克重
        washExplain: '', // 洗涤说明
        modelPath: '', // 模型路径
        materialCoverName: '', // 面料封面名称
        materialCoverPath: '', // 面料封面图
        materialDetailName: '', // 面料详情名称
        materialDetailPath: '', // 面料详情图
        materialIntroducePath: '', // 面料介绍图
        status: 0, // 0可用1禁用2删除
        name: '' // 面料名称
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    // this._getInfo()
    this._getBrand()
    this._getColor()
    this._getAttribute()
  },
  computed: {
  },
  methods: {
    // 获取详情
    _getInfo () {
      this.$http.post(this.$apis.api_user_detail, {
        id: this.$store.state.user.userInfo.userId
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.ruleForm = {
          ...this.ruleForm,
          ...res.result
        }
      }).catch(res => {
        alert('post')
      })
    },

    // 退出
    handleSignOut () {
      this.type = 'info'
      this._getInfo()
    },

    // 介绍图片
    handleDiscriptionImage (e) {
      this.ruleForm.logoPath = e.result
    },

    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this._handleSubmit()
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },

    // 提交表单
    _handleSubmit () {
      this.$http.post(this.$apis.api_user_update, this.ruleForm).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.$message({
          type: 'success',
          message: '操作成功'
        })
        this.type = 'info'
      }).catch(res => {
        alert('post')
      })
    },

    // 获取品牌
    _getBrand () {
      this.$http.post(this.$apis.api_materialConfig_list, {
        type: 1 // 1品牌2颜色3属性
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.brandList = res.result
      })
    },
    // 获取颜色
    _getColor () {
      this.$http.post(this.$apis.api_materialConfig_list, {
        type: 2 // 1品牌2颜色3属性
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.colorList = res.result
      })
    },
    // 获取属性
    _getAttribute () {
      this.$http.post(this.$apis.api_materialConfig_list, {
        type: 3 // 1品牌2颜色3属性
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.attributeList = res.result
      })
    }
  },
  beforeDestroy () {
    this.$store.commit('cloth/setagent', null)
  }
}
</script>
<style lang="scss" scoped>
.store-page{
  color: #666666;
  flex: 1;
  .Shadow-box{
    flex: 1;
  }
  .applicable-title{
    font-size: 18px;
    font-weight: bold;
    margin: 0 0 30px 40px;
  }
  .middle-box{
    flex: 1;
  }
  .title{
    font-size: 22px;
    font-weight: 800;
    margin-bottom: 20px;
  }
  .store-avatar{
    height: 100px;
    width: 100px;
    margin-left: 100px;
  }
  .bei-zhu{
    width: 400px;
  }
}
</style>
