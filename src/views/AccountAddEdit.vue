<template>
  <div class="store-page">
    <user>
      <div class="public-row__align">
        <div class="public-miaobao-left">客户管理 </div>
        <div class="public-mianbao-middle"> > </div>
        <div class="public-mianbao-right" v-if="$route.query.type=='add'"> 添加账号 </div>
        <div class="public-mianbao-right" v-if="$route.query.type=='edit'"> 修改账号 </div>
        <btn class="public-mianbao-back" @click.native="$router.go(-1)">返回上一级</btn>
      </div>
    </user>
    <shadow-box>
      <div class="title">添加账号</div>
      <div class="middle-box">
        <el-form class="public-column" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
          <div class="middle-box">
            <el-form-item label="手机号：" prop="phone">
              <el-input v-model="ruleForm.phone" ></el-input>
            </el-form-item>
            <el-form-item label="登录密码：" prop="password">
              <el-input v-model="ruleForm.password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码：" prop="passwordConfirm">
              <el-input v-model="ruleForm.passwordConfirm" type="password"></el-input>
            </el-form-item>
            <el-form-item label="账号名称：" prop="name">
              <el-input v-model="ruleForm.name" ></el-input>
            </el-form-item>
            <el-form-item label="联系人：" prop="contacts">
              <el-input v-model="ruleForm.contacts" ></el-input>
            </el-form-item>
            <div v-if="ruleForm.phone">
              <br/>
              <el-form-item label="营业执照：" prop="businessPhotos">
                <!-- <el-upload
                  :headers="{
                    token: $store.state.user.token
                  }"
                  :http-request = changeheader
                  class="upload-demo"
                  name="imgUpload"
                  :data="{
                    merchantCode: $store.state.user.userInfo.merchantCode,
                    superMerchantCode: $store.state.user.userInfo.superMerchantCode,
                    phone: ruleForm.phone
                  }"
                  :action="$apis.api_upload_userByBusinessPhotos"
                  :show-file-list="false"
                  :on-success="handleDiscriptionImage">
                  <btn typeStyle="su">上传</btn>
                </el-upload> -->
                <f-upload
                  :url="$apis.api_upload_userByBusinessPhotos"
                  :upData="{
                    name: '1245',
                    age: '12',
                    phone: '13716171560'
                  }"
                  @on-success="handleDiscriptionImage">
                  <btn typeStyle="su">上传</btn>
                </f-upload>
              </el-form-item>
              <img class="store-avatar" v-if="ruleForm.businessPhotos" :src="$apis.photoHost + ruleForm.businessPhotos">
            </div>
            <br/>
            <br/>
          </div>
            <el-form-item label="地址：" required>
              <div class="public-row address-box">
                <el-form-item prop="province">
                  <el-select v-model="ruleForm.province" placeholder="请选择省份" @change="handleRegin">
                    <el-option :label="item.name" :value="item.name" v-for="(item, index) in address" :key="index"></el-option>
                  </el-select>
                </el-form-item>
                &nbsp;
                &nbsp;
                &nbsp;
                <el-form-item prop="city">
                  <el-select v-model="ruleForm.city" placeholder="请选择市" @change="handleCity">
                    <el-option :label="item.name" :value="item.name" v-for="(item, index) in city" :key="index"></el-option>
                  </el-select>
                </el-form-item>
                &nbsp;
                &nbsp;
                &nbsp;
                <el-form-item prop="area">
                  <el-select v-model="ruleForm.area" placeholder="请选择区">
                    <el-option :label="item" :value="item" v-for="(item, index) in area" :key="index"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-form-item>
            <el-form-item label="详细地址：" prop="address">
              <el-input v-model="ruleForm.address" ></el-input>
            </el-form-item>
            <el-form-item label="备注：">
              <el-input type="textarea" class="bei-zhu" v-model="ruleForm.remark" ></el-input>
            </el-form-item>
        </el-form>
      </div>
      <div class="public-row__center">
        <discolor-btn typeStyle="middle" @click.native="submitForm('ruleForm')">保存</discolor-btn>
      </div>
    </shadow-box>

  </div>
</template>
<script>
import Btn from '../components/Btn.vue'
import User from '../components/User.vue'
import ShadowBox from '../components/ShadowBox.vue'
import DiscolorBtn from '../components/DiscolorBtn.vue'
import FUpload from '../components/FUpload.vue'
export default {
  components: { User, ShadowBox, DiscolorBtn, Btn, FUpload },
  data () {
    return {
      ruleForm: {
        name: '', // 账号名称：
        businessPhotos: '', // 营业执照  多个用逗号隔开
        phone: '', // 手机
        password: '', // 密码
        passwordConfirm: '', // 确认密码
        type: 0, // 0后台生成核心用户
        contacts: '', // 联系人
        province: '', // 省份
        city: '', // 城市
        area: '', // 区域
        address: '', // 地址
        remark: '' // 备注
      },
      rules: {
        // 手机
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ],
        // 密码
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        // 密码
        passwordConfirm: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        // 联系人
        contacts: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        // 账号名称：
        name: [
          { required: true, message: '请输入账号名称', trigger: 'blur' }
        ],
        // 营业执照
        businessPhotos: [
          { required: true, message: '请上传营业执照', trigger: 'blur' }
        ],
        // 省
        province: [
          { required: true, message: '请输入省', trigger: 'change' }
        ],
        // 市
        city: [
          { required: true, message: '请输入市', trigger: 'change' }
        ],
        // 区
        area: [
          { required: true, message: '请输入区', trigger: 'change' }
        ],
        // 详细地址
        address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ]
      },
      address: [], // 全部地址
      city: [], // 市
      area: [], // 区
      file: ''
    }
  },
  created () {
    this._getAddress() // 获取地址
  },
  computed: {
  },
  methods: {
    // 自定义上传事件
    changeheader (param) {
      let fileObject = param.file
      let pic = new FormData()
      pic.append('imgUpload', fileObject)
      pic.append('merchantCode', this.$store.state.user.userInfo.merchantCode)
      pic.append('superMerchantCode', this.$store.state.user.userInfo.merchantCode)
      pic.append('phone', this.ruleForm.phone)
      let config = {
        headers: {
          // 'Content-Type': 'multipart/form-data',
          'token': this.$store.state.user.token
        }
      }

      this.$http.post(this.$apis.api_upload_userByBusinessPhotos, param, config).then(res => {
        console.log(res)
      })

      // let fileObject = param.file
      // let pic = new FormData()
      // pic.append('fileName', fileObject)
      // let config = {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // }

      // this.$http.post(this.$apis.api_upload_userByBusinessPhotos, {
      //   merchantCode: this.$store.state.user.userInfo.merchantCode,
      //   superMerchantCode: this.$store.state.user.userInfo.superMerchantCode,
      //   phone: this.ruleForm.phone,
      //   imgUpload: pic
      // }, config).then(res => {
      //   console.log(res)
      // })

      // this.$http.post(this.$apis.api_upload_userByBusinessPhotos, pic).then(res => {
      //   console.log(res)
      // })

      // axios({
      //   method: 'post',
      //   url: this.$apis.api_upload_userByBusinessPhotos,
      //   data: pic,
      //   config: config
      // }).then(response => {
      //   console.log(response)
      // }).catch(error => {
      //   console.log(error)
      // })
    },
    // 省发生变化
    handleRegin (e, isClear = true) {
      if (isClear) {
        this.ruleForm.city = ''
        this.ruleForm.area = ''
      }
      this.address.forEach(item => {
        if (item.name === e) {
          this.city = item.city
        }
      })
      return Promise.resolve()
    },

    // 市发生变化
    handleCity (e, isClear = true) {
      if (isClear) {
        this.ruleForm.area = ''
      }
      this.city.forEach(item => {
        if (item.name === e) {
          this.area = item.area
        }
      })
      return Promise.resolve()
    },

    // 获取地址
    _getAddress () {
      this.$http.post(this.$apis.api_address_all).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.address = JSON.parse(res.result)
        this.type = this.$route.query.type
        if (this.type === 'edit') {
          let newObj = JSON.parse(JSON.stringify(this.$store.state.account.agent))
          newObj.passwordConfirm = newObj.password
          this.ruleForm = newObj
          this.handleRegin(this.ruleForm.province, false).then(_ => {
            this.handleCity(this.ruleForm.city, false)
          })
        }
      }).catch(res => {
        alert('post')
      })
    },

    // 营业执照
    handleDiscriptionImage (e) {
      console.log(e)
      this.ruleForm.businessPhotos = e.result
    },

    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.password !== this.ruleForm.passwordConfirm) return this.$message.error('密码不一致')
          if (this.type === 'add') {
            this._handleSubmit()
          } else {
            this._updata()
          }
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
      this.$http.post(this.$apis.api_user_save, this.ruleForm).then(res => {
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

    _updata () {
      delete this.ruleForm.createTime
      this.$http.post(this.$apis.api_user_update, this.ruleForm).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.$message({
          type: 'success',
          message: '操作成功'
        })
        this.$router.go(-1)
      }).catch(res => {
        alert('post')
      })
    }
  },
  beforeDestroy () {
    this.$store.commit('account/agent', null)
  }
}
</script>
<style lang="scss" scoped>
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
.address-box{
  /deep/ .el-input{
    width: 150px;
  }
}

.imh{
  height: 100px;
  width: 100px;
}
</style>
