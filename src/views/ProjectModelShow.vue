<template>
  <div class="public-column out-box">
    <div class="public-heng">
      <btn>
        <el-dropdown @command="handleDisableEnable">
          <!-- <span class="el-dropdown-link">
            全部启用<i class="el-icon-arrow-down el-icon--right"></i>
          </span> -->
          <span class="el-dropdown-link">
            <div v-if="tableData.every(item => item.status == 1)">
              全部禁用
              <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <div v-else>
              全部启用
              <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="{item: null, type: 0, all: true}">启用</el-dropdown-item>
            <el-dropdown-item :command="{item: null, type: 1, all: true}">禁用</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </btn>
    </div>
    <div class="middle-box">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <!-- <el-table-column
          prop="systemNamePrefix"
          label="模型名称">
          <template slot-scope="scope">
            <span>{{scope.row.systemNamePrefix}}</span>
            <span>-</span>
            <span>{{scope.row.systemNameSuffix}}</span>
          </template>
        </el-table-column> -->
        <el-table-column
          label="中文名称">
          <template slot-scope="scope">
            {{scope.row.name}}
          </template>
        </el-table-column>
        <el-table-column
          label="英文名称">
          <template slot-scope="scope">
            {{scope.row.englishName}}
            &nbsp;
            &nbsp;
            &nbsp;
            <i class="el-icon-edit" @click="handleShowAddEdit('edit', scope.row)"></i>
          </template>
        </el-table-column>
        <el-table-column
          label="是否上传">
          <template slot-scope="scope">
            <div v-if="scope.row.modelPath">已上传</div>
            <div v-if="!scope.row.modelPath">未上传</div>
          </template>
        </el-table-column>
        <el-table-column
          label="封面图">
          <template slot-scope="scope">
            <img class="feng-mian" :src="$apis.photoHost + scope.row.photoPath">
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column> -->
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <div class="public-row handle-box">
              <i class="public-row__center defalut-box active" @click="handleDefault({item: scope.row, type: 1})" v-if="scope.row.defaultStatus === 0">
                <i class="inner"></i>
              </i>
              <i class="public-row__center defalut-box" @click="handleDefault({item: scope.row, type: 0})" v-if="scope.row.defaultStatus === 1">
              </i>
              &nbsp;
              默认
              &nbsp;
              &nbsp;
              <btn>
                <el-dropdown @command="handleDisableEnable">
                  <span class="el-dropdown-link">
                    {{scope.row.status == 0 ? '启用' : '禁用'}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="{item: scope.row, type: 0, all: false}">启用</el-dropdown-item>
                    <el-dropdown-item :command="{item: scope.row, type: 1, all: false}">禁用</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </btn>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="public-row__center total-box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="params.pageSize"
        layout="prev, pager, next, sizes, total"
        :total="tableData.totalCount">
      </el-pagination>
    </div> -->

    <el-dialog
      title="新增模型"
      :show-close="false"
      :visible="isShowAddEdit !== 'none'"
      width="40%"
      center>
      <div class="public-row dialog-box">
        <div>
          <div class="public-row__center">
            <span>是否为模型：</span>
            <el-select class="input-add" v-model="ruleForm.type" placeholder="请选择" disabled>
              <el-option
                label="是"
                :value="1">
              </el-option>
              <el-option
                label="否"
                :value="2">
              </el-option>
            </el-select>
            <!-- <div>{{ruleForm.type === 1 ? '是' : '否'}}</div> -->
          </div>
          &nbsp;
          &nbsp;
          <div class="public-row__center" v-if="ruleForm.type === 1">
            <span>部位名称：</span>
            &nbsp;
            &nbsp;
            <el-select v-model="ruleForm.modelConfigId" placeholder="请选择" disabled>
              <el-option
                v-for="item in positionList.items"
                :key="item.value"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <br/>
          <div class="public-row__center">
            <span>模型名称：</span>
            &nbsp;
            &nbsp;
            <el-input class="input-add" v-model="ruleForm.systemName" placeholder="名称和对于名称中间加'-'" disabled></el-input>
          </div>
          <br/>
          <div class="public-row__center">
            <span>中文名称：</span>
            &nbsp;
            &nbsp;
            <el-input class="input-add" v-model="ruleForm.name" disabled></el-input>
          </div>
          <br/>
          <div class="public-row__center">
            <span>英文名称：</span>
            &nbsp;
            &nbsp;
            <el-input class="input-add" v-model="ruleForm.englishName"></el-input>
          </div>
          <br/>
        </div>
        &nbsp;
        &nbsp;
        &nbsp;
        <div class="public-row" v-if="ruleForm.type === 1">
          <el-upload
            disabled
            v-if="ruleForm.systemName && ruleForm.name"
            class="avatar-uploader"
            name="imgUpload"
            :data="{
              merchantCode: $store.state.user.userInfo.merchantCode,
              superMerchantCode: $store.state.user.userInfo.superMerchantCode,
              systemName: ruleForm.systemName,
              name: ruleForm.name
            }"
            :action="$apis.api_upload_modelByData"
            :show-file-list="false"
            :on-success="handleModelSuccess">
            <div v-if="ruleForm.modelPath" class="public-column__center avatar-uploader-icon">模型已上传</div>
            <div class="public-column__center avatar-uploader-icon" v-else>
              <i class="el-icon-plus public-row__center"></i>
              <div>上传模型</div>
            </div>
          </el-upload>
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
          <el-upload
            disabled
            v-if="ruleForm.systemName && ruleForm.name"
            class="avatar-uploader"
            name="imgUpload"
            :data="{
              merchantCode: $store.state.user.userInfo.merchantCode,
              superMerchantCode: $store.state.user.userInfo.superMerchantCode,
              systemName: ruleForm.systemName,
              name: ruleForm.name
            }"
            :action="$apis.api_upload_modelByPhoto"
            :show-file-list="false"
            :on-success="handleImageSuccess">
            <img v-if="ruleForm.photoPath" :src="$apis.photoHost + ruleForm.photoPath" class="avatar-uploader-icon">
            <div class="public-column__center avatar-uploader-icon" v-else>
              <i class="el-icon-plus public-row__center"></i>
              <div>上传图片</div>
            </div>
          </el-upload>

        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowAddEdit = 'none'">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import Btn from '../components/Btn.vue'
import DiscolorBtn from '../components/DiscolorBtn.vue'
export default {
  components: { DiscolorBtn, Btn },
  data () {
    return {
      isShowAddEdit: 'none', // none add edit
      params: {
        currentPage: 1,
        pageSize: 10,
        categoryUuId: this.$route.query.id,
        systemName: this.$route.query.searchInfo
      },

      ruleForm: {
        categoryUuId: this.$route.query.id,
        name: '',
        modelConfigId: '',
        modelConfigCode: '',
        systemName: '',
        photoPath: '',
        type: 1,
        modelPath: ''
      },

      tableData: [], // 列表

      // 部位列表
      positionList: {
        items: []
      }
    }
  },

  created () {
    this._initParams()
    this._getList()
    this._getPosition()
  },

  // 监听
  watch: {
    $route (to, from) {
      this._initParams()
      this._getList()
    }
  },
  mounted: function () {
  },

  computed: {
  },

  methods: {
    // 删除
    // handleDelete (e) {
    //   this.$confirm('此操作将永久删除该, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     this._delete(e)
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     })
    //   })
    // },

    // 禁用或者启用
    handleDisableEnable (data) {
      if (!data.all) {
        if (data.item.status === data.type) return false
      }

      this.$confirm(`此操作将修改状态, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (data.all) {
          this._editAllStauts(data)
        } else {
          this._editStatus(data)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    // 修改全部
    _editAllStauts (data) {
      this.$http.post(this.$apis.api_model_enableAllAndDeleteAll, {
        categoryUuId: this.params.categoryUuId,
        status: data.type,
        merchantCode: this.$route.query.clientMerchantCode,
        superMerchantCode: this.$route.query.clientMerchantCode
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.$message.success('操作成功')
        this._getList()
      })
    },

    // 修改状态
    _editStatus (data) {
      this.$http.post(this.$apis.api_model_update, {
        id: data.item.id,
        status: data.type,
        merchantCode: this.$route.query.clientMerchantCode,
        superMerchantCode: this.$route.query.clientMerchantCode
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.$message.success('操作成功')
        data.item.status = data.type
      })
    },

    // 修改默认
    handleDefault (data) {
      if (data.item.defaultStatus === data.type) return false
      this.$http.post(this.$apis.api_model_update, {
        id: data.item.id,
        categoryUuId: data.item.categoryUuId,
        defaultStatus: data.type,
        merchantCode: data.item.merchantCode,
        superMerchantCode: data.item.merchantCode
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.$message.success('操作成功')
        data.item.defaultStatus = data.type
      })
    },

    // 获取部位
    _getPosition () {
      this.$http.post(this.$apis.api_modelConfig_list, {}).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.positionList = res.result
      })
    },

    // 删除
    _delete (data) {
      this.$http.post(this.$apis.api_model_update, {
        id: data.id,
        status: 2,
        superMerchantCode: this.$route.query.clientMerchantCode,
        merchantCode: this.$route.query.clientMerchantCode
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.$message.success('操作成功')
        this._getList()
      })
    },

    // 模型上传
    handleModelSuccess (e) {
      this.ruleForm.modelPath = e.result
    },

    // 封面上传
    handleImageSuccess (e) {
      this.ruleForm.photoPath = e.result
    },

    // 显示添加或者修改
    handleShowAddEdit (e, data) {
      this.isShowAddEdit = e
      if (e === 'add') {
        // this._initForm()
      } else {
        let newData = JSON.parse(JSON.stringify(data))
        this.ruleForm = {
          ...newData,
          modelConfigId: newData.modelConfigId,
          systemName: newData.systemNamePrefix + '-' + newData.systemNameSuffix
        }
      }
    },

    // 切换
    handleSwitch (e) {
      this.$confirm('此操作将修改状态, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        // 提交修改状态
        this.$http.post(this.$apis.api_volumeBodilyConfiguration_update, {
          id: e.id,
          type: e.type === 0 ? 1 : 0
        }).then(res => {
          if (res.code !== 'SUCCESS') return this.$message(res.msg)
          this.$message.success('操作成功')
          this.handleSetSwitch(e)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    // 设置数据
    handleSetSwitch (data) {
      this.tableData.items.forEach(item => {
        if (item.id === data.id) {
          item.type = item.type === 0 ? 1 : 0
        }
      })
    },

    // 初始化form
    // _initForm (e) {
    //   this.ruleForm = {
    //     categoryUuId: this.$route.query.id,
    //     name: '',
    //     systemName: '',
    //     photoPath: '',
    //     type: 1,
    //     modelPath: '',
    //     ...e
    //   }
    // },

    // 初始化请求参数
    _initParams (e) {
      this.params = {
        currentPage: 1,
        pageSize: 10,
        categoryUuId: this.$route.query.id,
        systemName: this.$route.query.searchInfo,
        ...e
      }
    },

    // 获取列表
    _getList () {
      this.$http.post(this.$apis.api_model_list, {
        ...this.params,
        superMerchantCode: this.$route.query.clientMerchantCode,
        merchantCode: this.$route.query.clientMerchantCode
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        // if (res.result.items.length === 0 && this.params.currentPage > 1) {
        //   --this.params.currentPage
        //   this._getList()
        // } else {
        //   this.tableData = res.result
        // }
        this.tableData = res.result
      })
    },

    // 提交验证
    submitForm () {
      if (this.isShowAddEdit === 'add') {
        this._setModel()
      } else {
        this._updataModel()
      }
    },

    // 修改模型
    _updataModel () {
      delete this.ruleForm.createTime
      let filterData = this.positionList.items.filter(item => this.ruleForm.modelConfigId === item.id)
      this.$http.post(this.$apis.api_model_update, {
        ...this.ruleForm,
        modelConfigCode: filterData.length > 0 ? filterData[0].id : ''
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.$message.success('操作成功')
        this.isShowAddEdit = 'none'
        this._getList()
      })
    },

    // 添加模型
    _setModel () {
      let filterData = this.positionList.items.filter(item => this.ruleForm.modelConfigId === item.id)
      this.$http.post(this.$apis.api_model_save, {
        ...this.ruleForm,
        modelConfigCode: filterData.length > 0 ? filterData[0].id : ''
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.$message.success('操作成功')
        this.isShowAddEdit = 'none'
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
.out-box{
  height: 100%;
  .middle-box{
    flex: 1;
  }
  .avatar-uploader-icon{
    width: 80px;
    height: 80px;
    border: 1px dashed #e6e6e6;
    border-radius: 8px;
  }
  .input-add{
    flex: 1;
  }
  .public-heng{
    justify-content: flex-end;
    font-size: 16px;
    color: $lan;
  }
  .dialog-box{
    min-height: 200px;
    .pick-box{
      flex: 1;
    }
    .item-checkbox{
      margin-bottom: 10px;
    }
  }
  .title-name{
    font-size: 20px;
    font-weight: bold;
  }

  .pick-box__active{
    width: 13px;
    height: 13px;
    background: #007FCC;
    border-radius: 3px;
    color: white;
    font-size: 12px;
  }
  .pick-box__disabel{
    width: 13px;
    height: 13px;
    border: 1px solid #999999;
    border-radius: 3px;
  }

  .feng-mian{
    width: 40px;
    height: 40px;
    border-radius: 4px;
  }

  .el-icon-edit{
    color: $lan;
  }

  .defalut-box{
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid #666;
    .inner{
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #666;
    }
  }
  .handle-box{
    align-items: center;
  }
  /deep/ .el-dropdown-link{
    color: white;
  }
}
</style>
