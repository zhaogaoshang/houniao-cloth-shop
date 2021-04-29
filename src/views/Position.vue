<template>
  <div class="public-column category">
    <user>
      <search @search="handleSearch()" v-model="params.modelInfo"></search>
      <discolor-btn typeStyle="middle" @click.native="handelAdd">添加部位名称</discolor-btn>
    </user>
    <div class="public-row bottom-info">
      <shadow-box>
        <div class="title">部位管理</div>
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
              label="所属性别">
              <template slot-scope="scope">
                {{scope.row.sex === 0 ? '男' : '女'}}
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="部位名称">
            </el-table-column>
            <el-table-column
              prop="code"
              label="部位编码">
            </el-table-column>
            <el-table-column
              prop="address"
              label="操作">
              <template slot-scope="scope">
                <i class="el-icon-edit" @click="handleEdite(scope.row)"></i>
                &nbsp;
                &nbsp;
                &nbsp;
                <i class="el-icon-delete" @click="handleDeitTip(scope.row)"></i>
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
          <el-form-item label="类型名称：" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="部位编码：" prop="code">
            <el-input v-model="ruleForm.code"></el-input>
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
        code: ''
      },

      params: {
        name: '',
        code: '',
        modelInfo: '',
        currentPage: 1,
        pageSize: 10
      },

      tableData: {},

      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        code: [
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
    //
    _initParams (data) {
      this.params = {
        name: '',
        code: '',
        modelInfo: '',
        currentPage: 1,
        pageSize: 10,
        ...data
      }
    },

    // 添加
    handelAdd () {
      this.isShowAdd = 'add'
      this.ruleForm.name = ''
      this.ruleForm.code = ''
    },

    // 搜索
    handleSearch () {
      this._initParams({
        modelInfo: this.params.modelInfo
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
          console.log('error submit!!')
          return false
        }
      })
    },

    // 量体部位添加
    _setData () {
      this.$http.post(this.$apis.api_modelConfig_save, this.ruleForm).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.isShowAdd = 'none'
        this.$message.success('操作成功')
        this._getList()
      })
    },

    // 获取列表
    _getList () {
      this.$http.post(this.$apis.api_modelConfig_list, this.params).then(res => {
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
      console.log(e)
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
      this.$http.post(this.$apis.api_modelConfig_update, this.ruleForm).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.isShowAdd = 'none'
        this._getList()
      })
    },

    // 删除
    _delete (e) {
      this.$http.post(this.$apis.api_modelConfig_update, {
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
        pageSize: e,
        modelInfo: this.params.modelInfo
      })
      this._getList()
    },

    // 页码
    handleCurrentChange (e) {
      this._initParams({
        currentPage: e,
        modelInfo: this.params.modelInfo
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
    margin-bottom: 20px;
  }
}
</style>
