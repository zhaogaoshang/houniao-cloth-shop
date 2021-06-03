<template>
  <div class="public-column store-page">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
      <user>
        <div class="public-row__align">
          <div class="public-miaobao-left">面料管理 </div>
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
                <f-upload
                  class="avatar-uploader"
                  :upData="{
                    typeName: 'introduce'
                  }"
                  @on-success="handleDiscriptionImage"
                  :url="$apis.api_upload_shopByPhoto">
                  <div class="public-row__align">
                    <img class="store-avatar" v-if="ruleForm.photoPath" :src="$apis.photoHost + ruleForm.photoPath">
                    <btn typeStyle="su">上传</btn>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    <span class="ticp">温馨提示：图片建议尺寸：800*800px,图片格式为JPG.</span>
                  </div>
                  </f-upload>
              </el-form-item>
            </div>
            <div class="middle-box">
              <el-form-item label="材质球：">
                <f-upload
                  class="avatar-uploader"
                  :upData="{
                    typeName: 'introduce'
                  }"
                  @on-success="handlemodelImage"
                  :url="$apis.api_upload_shopByPhoto">
                  <div class="public-row__align">
                    <div class="public-row__center store-avatar" v-if="!ruleForm.modelPath">
                      <i class="el-icon-plus"></i>
                    </div>
                    <div class="public-column__center store-avatar" v-if="ruleForm.modelPath">
                      <span>已经</span>
                      <span>上传</span>
                    </div>
                    <btn typeStyle="su">上传</btn>
                  </div>
                  </f-upload>
              </el-form-item>
            </div>
            <div class="public-row__align">
              <el-form-item label="面料货号：" prop="materialArticleNumber">
                <el-input v-model="ruleForm.materialArticleNumber"></el-input>
              </el-form-item>
              <el-form-item label="面料编号：" prop="materialNo">
                <el-input v-model="ruleForm.materialNo"></el-input>
              </el-form-item>
            </div>

            <div class="public-row__align">
              <el-form-item label="面料品牌：" prop="brandUuid">
                <el-select v-model="ruleForm.brandUuid" placeholder="面料品牌" @change="handlePickCloth">
                  <el-option :label="item.name" :value="item.uuid" v-for="(item, index) in brandList.items" :key="index"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="面料名称：" prop="name">
                <el-select v-model="ruleForm.name" placeholder="面料名称">
                  <el-option :label="item.name" :value="item.name" v-for="(item, index) in brandName" :key="index"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="面料册：" prop="materialVolume">
                <el-input v-model="ruleForm.materialVolume"></el-input>
              </el-form-item>
            </div>

            <el-form-item label="面料成分：" prop="materialComponent">
              <el-input v-model="ruleForm.materialComponent"></el-input>
            </el-form-item>

            <el-form-item label="面料属性：" prop="attributeUuid">
              <el-select v-model="ruleForm.attributeUuid" placeholder="属性">
                <el-option :label="item.name" :value="item.uuid" v-for="(item, index) in attributeList.items" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="面料颜色：" prop="colourUuid">
              <el-select v-model="ruleForm.colourUuid" placeholder="请选择活动区域">
                <el-option :label="item.name" :value="item.uuid" v-for="(item, index) in colorList.items" :key="index"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="面料产地：" prop="materialOrigin">
              <el-input v-model="ruleForm.materialOrigin"></el-input>
            </el-form-item>

            <div class="public-row__align">
              <el-form-item label="面料价格：" prop="materialPrice">
                <el-input v-model="ruleForm.materialPrice" type="number"></el-input>
              </el-form-item>
              &nbsp;
              &nbsp;
              <span>元/m</span>
            </div>

            <el-form-item label="面料幅度：" prop="materialRange">
              <el-input v-model="ruleForm.materialRange" type="number"></el-input>
            </el-form-item>

            <el-form-item label="面料纱支：" prop="materialYarn">
              <el-input v-model="ruleForm.materialYarn" type="number"></el-input>
            </el-form-item>

            <div class="public-row__align">
              <el-form-item label="面料克重：" prop="materialGramWeight">
                <el-input v-model="ruleForm.materialGramWeight" type="number"></el-input>
              </el-form-item>
              &nbsp;
              &nbsp;
              <span>g/m</span>
            </div>

            <el-form-item label="洗涤说明：">
              <el-input v-model="ruleForm.washExplain" type="textarea" :rows="2"></el-input>
            </el-form-item>

            <div>
              <div class="category-shiyong">适用品类</div>
              <el-form-item label="单品：" prop="type">
                <el-checkbox-group v-model="activeSingleList">
                  <el-checkbox :label="item.uuid" v-for="(item, index) in categoty.singleList" :key="index">{{item.name}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="套装：" prop="type">
                <el-checkbox-group v-model="activeSuitList">
                  <el-checkbox :label="item.uuid" v-for="(item, index) in categoty.suitList" :key="index">{{item.name}}</el-checkbox>
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
        id: '', // 主键id
        photoPath: '', // 图片路径
        materialArticleNumber: '', // 面料货号
        materialNo: '', // 面料编号
        brandId: '', // 品牌id
        brandUuid: '', // 品牌uuid
        brandParentId: '', // 品牌父id
        materialComponent: '', // 面料成分
        attributeId: '', // 属性id
        attributeUuid: '', // 属性id
        colourId: '', // 颜色id
        colourUuid: '', // 颜色id
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
        name: '', // 面料名称
        materialVolume: '' // 面料册
      },

      // 分类列表
      categoty: {
        singleList: [], // 单品
        suitList: [] // 套装
      },
      activeSingleList: [], // 选中的单品
      activeSuitList: [], // 选中的套装

      // 面料品牌
      brandList: {
        items: []
      },
      brandName: [], // 面料名称选项
      attributeList: {}, // 面料属性
      colorList: {}, // 面料颜色

      rules: {
        // 面料货号
        materialArticleNumber: [
          { required: true, message: '面料货号', trigger: 'blur' }
        ],
        // 面料编号
        materialNo: [
          { required: true, message: '面料编号', trigger: 'blur' }
        ],
        // 面料品牌
        brandUuid: [
          { required: true, message: '面料品牌', trigger: 'blur' }
        ],
        // 面料名称
        name: [
          { required: true, message: '面料名称', trigger: 'blur' }
        ],
        // 面料册
        materialVolume: [
          { required: true, message: '面料册', trigger: 'blur' }
        ],
        // 面料成分
        materialComponent: [
          { required: true, message: '面料成分', trigger: 'blur' }
        ],
        // 面料属性
        attributeUuid: [
          { required: true, message: '面料属性', trigger: 'blur' }
        ],
        // 面料颜色
        colourUuid: [
          { required: true, message: '面料颜色', trigger: 'blur' }
        ],
        // 面料产地
        materialOrigin: [
          { required: true, message: '面料产地', trigger: 'blur' }
        ],
        // 面料价格：
        materialPrice: [
          { required: true, message: '面料价格', trigger: 'blur' }
        ],
        // 面料幅度：
        materialRange: [
          { required: true, message: '面料幅度', trigger: 'blur' }
        ],
        // 面料纱支：
        materialYarn: [
          { required: true, message: '面料纱支', trigger: 'blur' }
        ],
        // 面料克重：
        materialGramWeight: [
          { required: true, message: '面料克重', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
  },
  created () {
    this._getInfo()
  },
  computed: {
  },
  methods: {
    // 获取分类
    _getCategory () {
      this.$http.post(this.$apis.api_category_categoryList, {}).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.categoty = res.result
      }).catch(res => {
        alert('post')
      })
    },

    // 获取详情
    _getInfo () {
      this.ruleForm = {
        ...this.ruleForm,
        ...this.$store.state.cloth.agent
      }
      this._getBrand()
      this._getColor()
      this._getCategory()
      this._getAttribute()
      this._handleCategoryActive()
    },

    // 筛选使用的品类
    _handleCategoryActive () {
      let data = JSON.parse(this.ruleForm.categoryJson)
      this.activeSingleList = data.filter(item => item.packageType === 1).map(only => only.uuid)
      this.activeSuitList = data.filter(item => item.packageType === 2).map(only => only.uuid)
    },

    // 退出
    handleSignOut () {
      this.type = 'info'
      this._getInfo()
    },

    // 介绍图片
    handleDiscriptionImage (e) {
      this.ruleForm.photoPath = e.result
    },

    // 材质球
    handlemodelImage (e) {
      this.ruleForm.modelPath = e.result
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

    //
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },

    // 提交表单
    _handleSubmit () {
      let params = JSON.parse(JSON.stringify(this.ruleForm))
      // 单品
      let singleList = this.categoty.singleList.filter(item => {
        if (this.activeSingleList.includes(item.uuid)) {
          return item
        }
      })
      // 套装
      let suitList = this.categoty.suitList.filter(item => {
        if (this.activeSuitList.includes(item.uuid)) {
          return item
        }
      })

      this.$http.post(this.$apis.api_material_update, {
        ...params,
        categoryJson: JSON.stringify([...singleList, ...suitList])
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.$message({
          type: 'success',
          message: '操作成功'
        })
        this.$router.go(-1)
      }).catch(res => {
        alert('post')
      })
    },

    // 获取品牌
    _getBrand () {
      this.$http.post(this.$apis.api_materialConfig_list, {
        type: 1, // 1品牌2颜色3属性
        merchantCode: '',
        superMerchantCode: ''
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.brandList = res.result
        this.handlePickCloth(true)
      })
    },

    // 品牌子集
    handlePickCloth (first = false) {
      if (!first) {
        this.ruleForm.name = ''
      }
      this.brandList.items.forEach(item => {
        if (item.uuid === this.ruleForm.brandUuid) {
          this.brandName = item.configurationList
        }
      })
    },

    // 获取颜色
    _getColor () {
      this.$http.post(this.$apis.api_materialConfig_list, {
        type: 2, // 1品牌2颜色3属性
        merchantCode: '',
        superMerchantCode: ''
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.colorList = res.result
      })
    },

    // 获取属性
    _getAttribute () {
      this.$http.post(this.$apis.api_materialConfig_list, {
        type: 3, // 1品牌2颜色3属性
        merchantCode: '',
        superMerchantCode: ''
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
    height: 40px;
    width: 40px;
    border: 1px solid #999;
    border-radius: 6px;
    margin-right: 10px;
    span{
      font-size: 8px;
      line-height: 18px;
    }
  }
  .bei-zhu{
    width: 400px;
  }
  /deep/ .el-input{
    width: 170px;
  }
  .model-box{
    width: 40px;
    height: 40px;
  }
  .ticp{
    font-size: 14px;
    font-weight: 500;
    color: #0081CC;
  }
  .category-shiyong{
    font-size: 18px;
    font-weight: bold;
    color: #666666;
  }
}
</style>
