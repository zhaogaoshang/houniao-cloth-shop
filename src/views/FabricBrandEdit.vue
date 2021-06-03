<template>
  <div class="public-wait public-column store-page">
    <user>
      <div class="public-row__align">
        <div class="public-miaobao-left">客户管理 </div>
        <div class="public-mianbao-middle"> > </div>
        <div class="public-mianbao-right"> 编辑品牌 </div>
        <btn class="public-mianbao-back" @click.native="$router.go(-1)">返回上一级</btn>
      </div>
    </user>
    <shadow-box>
      <div class="title">编辑品牌</div>
      <div class="middle-box">
        <el-form class="public-column" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
          <div class="middle-box">
            <el-form-item label="品牌名称：" prop="name">
              <el-input v-model="ruleForm.abbreviationName"></el-input>
            </el-form-item>
            <el-form-item label="营业执照：">
              <el-upload
                :headers="{
                  token: $store.state.user.token
                }"
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
              </el-upload>
            </el-form-item>
            <img class="store-avatar" v-if="ruleForm.logoPath" :src="$apis.photoHost + ruleForm.logoPath">
          </div>
          <el-form-item label="面料产地：" prop="address">
            <el-input v-model="ruleForm.address"></el-input>
          </el-form-item>
          <el-form-item label="品牌介绍：" prop="address">
            <el-input type="textarea" class="bei-zhu" v-model="ruleForm.address"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="public-row__center">
        <discolor-btn typeStyle="middle" @click.native="submitForm('ruleForm')">保存</discolor-btn>
        &nbsp;
      </div>
    </shadow-box>
  </div>
</template>
<script>
import Btn from '../components/Btn.vue'
import DiscolorBtn from '../components/DiscolorBtn.vue'
import ShadowBox from '../components/ShadowBox.vue'
import User from '../components/User.vue'
export default {
  components: { User, ShadowBox, DiscolorBtn, Btn },
  data () {
    return {
      ruleForm: {
        name: '', // 门店名称
        abbreviationName: '', // 简称
        phone: '', // 手机
        remark: '', // 备注
        address: '', // 地址
        logoPath: '' // 图片路径
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
      }).catch(res => {
        alert('post')
      })
    }
  },

  //
  beforeDestroy () {
    this.$store.commit('fabric/agent', null)
  }
}
</script>
<style lang="scss" scoped>
.store-page{
  flex: 1;
  .Shadow-box{
    flex: 1;
  }
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
</style>
