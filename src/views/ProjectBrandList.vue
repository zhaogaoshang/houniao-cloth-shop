<template>
  <div class="public-column category">
    <user>
      <div class="public-row__align">
        <div class="public-miaobao-left">项目管理 </div>
        <div class="public-mianbao-middle"> > </div>
        <div class="public-mianbao-right"> 面料品牌供应管理 </div>
        <btn class="public-mianbao-back" @click.native="$router.go(-1)">返回上一级</btn>
      </div>
    </user>
    <div class="public-row bottom-info">
      <shadow-box>
        <div class="public-heng">
          <div class="public-row__align public-left">
            <div class="title">面料品牌供应管理（{{$route.query.name}}）</div>
            &nbsp;
            &nbsp;
            &nbsp;
            <discolor-btn typeStyle="mini" @click.native="handleAddBrand">新增供应品牌</discolor-btn>
          </div>
          <div class="public-center"></div>
          <div class="publicright">
            <search @search="handleSearch()" v-model="params.name"></search>
          </div>
        </div>
        <div>
          <el-table
            :data="tableData.items"
            stripe
            style="width: 100%">
            <el-table-column
              type="index"
              width="100"
              label="序号">
            </el-table-column>
            <el-table-column
              prop="name"
              label="面料品牌">
              <!-- <template slot-scope="scope">
                {{scope.row.sex === 0 ? '男' : '女'}}
              </template> -->
            </el-table-column>
            <el-table-column
              prop="name"
              label="面料LOGO">
            </el-table-column>
            <el-table-column
              prop="name"
              label="品牌介绍">
            </el-table-column>
            <el-table-column
              prop="name"
              label="面料产地">
            </el-table-column>
            <el-table-column
              prop="address"
              label="操作">
              <template slot-scope="scope">
                <btn>
                  <el-dropdown @command="handleDisableEnable">
                    <span class="el-dropdown-link">
                      {{scope.row.status == 0 ? '启用' : '禁用'}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item :command="{item: scope.row, type: 0}">启用</el-dropdown-item>
                      <el-dropdown-item :command="{item: scope.row, type: 1}">禁用</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </btn>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="public-row__center total-box">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="params.currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="params.pageSize"
            layout="prev, pager, next, sizes, total"
            :total="tableData.totalCount">
          </el-pagination>
        </div>
      </shadow-box>
    </div>
    <el-dialog
      title="添加部位"
      :visible="isShowAdd !== 'none'"
      width="30%"
      center>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="部位名称：" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="所属性别：" prop="sex">
            <el-radio-group v-model="ruleForm.sex">
              <el-radio :label="0">男</el-radio>
              <el-radio :label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowAdd = 'none'">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Btn from '../components/Btn.vue'
import DiscolorBtn from '../components/DiscolorBtn.vue'
import Search from '../components/Search.vue'
import ShadowBox from '../components/ShadowBox.vue'
import User from '../components/User.vue'

export default {
  components: { ShadowBox, User, Btn, Search, DiscolorBtn },
  name: '',

  data () {
    return {
      isShowAdd: 'none', // none add edit
      ruleForm: {
        name: '',
        status: 0,
        sex: 0,
        bodyValue: 0
      },

      params: {
        superMerchantCode: this.$route.query.clientMerchantCode,
        merchantCode: '',
        type: 1,
        name: '',
        currentPage: 1,
        pageSize: 10
      },

      tableData: {},

      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ]
      }
    }
  },

  /*
  在实例创建完成后被立即调用。
  在这一步，实例已完成以下的配置：数据观测 (data observer)，property 和方法的运算，watch/event 事件回调。
  然而，挂载阶段还没开始，el property 目前尚不可用。
  */
  created () {
    this._getList()
  },

  computed: {
  },

  methods: {
    // 禁用或者启用
    handleDisableEnable (data) {
      if (data.item.status === data.type) return false
      this.$confirm(`此操作将修改用户状态, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this._editStatus(data)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    // 修改状态
    _editStatus (data) {
      this.$http.post(this.$apis.api_materialConfig_update, {
        // merchantId: data.item.merchantId,
        id: data.item.id,
        type: 1,
        status: data.type
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        data.item.status = data.type
      })
    },

    //
    handleAddBrand () {
      this.$router.push({
        path: '/project/brand/add',
        query: {
          clientMerchantCode: this.$route.query.clientMerchantCode
        }
      })
    },

    //
    _initParams (data) {
      this.params = {
        superMerchantCode: this.$route.query.clientMerchantCode,
        merchantCode: '',
        type: 1,
        name: '',
        currentPage: 1,
        pageSize: 10,
        ...data
      }
    },

    // 添加
    handelAdd () {
      this.isShowAdd = 'add'
      this.ruleForm.name = ''
    },

    // 搜索
    handleSearch () {
      this._initParams({
        name: this.params.name
      })
      this._getList()
    },

    // 验证表单
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isShowAdd === 'edit') {
            this._edit()
          } else {
            this._setData()
          }
        } else {
          return false
        }
      })
    },

    // 量体部位添加
    _setData () {
      this.$http.post(this.$apis.api_volumeBodily_save, this.ruleForm).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.isShowAdd = 'none'
        this.$message.success('操作成功')
        this._getList()
      })
    },

    // 获取列表
    _getList () {
      this.$http.post(this.$apis.api_materialConfig_list, this.params).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        if (res.result.items.length === 0 && this.params.currentPage > 1) {
          --this.params.currentPage
          this._getList()
        } else {
          this.tableData = res.result
        }
      })
    },

    // 修改
    handleEdite (e) {
      this.ruleForm = e
      this.isShowAdd = 'edit'
    },

    // 删除 提示
    handleDeitTip (e) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this._delete(e)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    // 修改
    _edit () {
      delete this.ruleForm.createTime
      this.$http.post(this.$apis.api_volumeBodily_update, this.ruleForm).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.isShowAdd = 'none'
        this._getList()
      })
    },

    // 删除
    _delete (e) {
      this.$http.post(this.$apis.api_volumeBodily_update, {
        id: e.id,
        status: 2
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this._getList()
      })
    },

    // 页容量
    handleSizeChange (e) {
      this._initParams({
        pageSize: e
      })
      this._getList()
    },

    // 页码
    handleCurrentChange (e) {
      this._initParams({
        currentPage: e
      })
      this._getList()
    }
  }
}
</script>
<style lang="scss" scoped>
.category{
  flex: 1;
  .Shadow-box,
  .bottom-info{
    flex: 1;
  }

  .top-user{
    justify-content: space-between;
  }
  .total-box{
    flex: 1;
    align-items: flex-end;
  }
  .title{
    font-size: 22px;
    font-weight: 800;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: white;
  }
}
</style>
