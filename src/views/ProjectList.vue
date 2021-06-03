<template>
  <div class="public-column category">
    <user>
      <search @search="handleSearch" v-model="params.userInfo"></search>
    </user>
    <div class="public-row bottom-info">
      <shadow-box>
        <div class="pick-box">
          <btn :typeStyle="params.clientSideType === item.clientSideType ? 'su': 'moren'" v-for="(item, index) in pickList" :key="index" @click.native="handleSwitchPick(item)">{{item.name}}</btn>
        </div>
        <div>
          <el-table
            :data="tableData.items"
            style="width: 100%">
            <el-table-column
              width="200px"
              type="index"
              label="序号">
            </el-table-column>
            <el-table-column
              prop="name"
              label="账号名称">
            </el-table-column>
            <el-table-column
              prop="address"
              width="200px"
              label="账号权限">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <div>
                  <discolor-btn typeStyle="mini" v-if="scope.row.clientSideType === -100" @click.native="handleOpenFunction(scope.row)">开通</discolor-btn>
                  <div v-if="scope.row.clientSideType === 100">
                    <btn>
                      <el-dropdown @command="handleDisableEnable">
                        <span class="el-dropdown-link">
                          {{scope.row.clientSideStatus == 0 ? '启用' : '禁用'}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="{item: scope.row, type: 0}">启用</el-dropdown-item>
                          <el-dropdown-item :command="{item: scope.row, type: 1}">禁用</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </btn>
                    &nbsp;
                    <btn typeStyle="su" @click.native="handelGoModel(scope.row)">分类模型管理</btn>
                    &nbsp;
                    <btn typeStyle="su" @click.native="handelGoBrand(scope.row)" v-if="params.clientSideType == 1">面料品牌供应管理</btn>
                    <btn typeStyle="su" @click.native="handelGoBrandByCloth(scope.row)" v-if="params.clientSideType == 2">品牌管理</btn>
                    &nbsp;
                    <btn typeStyle="su" @click.native="handleUpdata(scope.row)">更新</btn>
                  </div>
                </div>
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
      title="开通账号"
      :visible.sync="isShowOpen"
      width="30%"
      center>
      <div class="open-box">
        <div class="public-row__align">
          <span class="title-box">企业名称</span>
          <span>:</span>
          &nbsp;
          &nbsp;
          <span>{{openData.name}}</span>
        </div>
        <div class="public-row__align">
          <span class="title-box">地址</span>
          <span>:</span>
          &nbsp;
          &nbsp;
          <span>{{openData.province}}-{{openData.city}}-{{openData.area}}</span>
        </div>
        <div class="public-row__align">
          <span class="title-box">开通权限</span>
          <span>:</span>
          &nbsp;
          &nbsp;
          <span>{{_openName()}}</span>
        </div>
        <div class="public-row__align">
          <span class="title-box">手机号</span>
          <span>:</span>
          &nbsp;
          &nbsp;
          <span>{{openData.phone}}</span>
        </div>
        <div class="public-row__align">
          <span class="title-box">开通密码</span>
          <span>:</span>
          &nbsp;
          &nbsp;
          <el-input class="input-password" v-model="openData.password"/>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowOpen = false">取 消</el-button>
        <el-button type="primary" @click="handleOpen">确 定</el-button>
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
  name: 'ProjectList',

  data () {
    return {
      params: {
        userInfo: '',
        type: 0,
        currentPage: 1,
        pageSize: 10,
        clientSideType: 1 // 1门店端2面料端3生产端
      },
      tableData: {},

      pickList: [
        {
          clientSideType: 1,
          name: '门店端'
        },
        {
          clientSideType: 2,
          name: '面料端'
        },
        {
          clientSideType: 3,
          name: '生产端'
        }
      ],

      isShowOpen: false,
      openData: {}
    }
  },

  /*
  在实例创建完成后被立即调用。
  在这一步，实例已完成以下的配置：数据观测 (data observer)，property 和方法的运算，watch/event 事件回调。
  然而，挂载阶段还没开始，el property 目前尚不可用。
  */
  created () {
  },

  activated () {
    this._getList()
  },

  computed: {
  },

  methods: {
    // 搜索
    handleSearch () {
      this._getList()
    },

    // 去面料端的品牌管理
    handelGoBrandByCloth (data) {
      this.$router.push({
        path: '/project/cloth/brand',
        query: {
          clientMerchantCode: data.clientMerchantCode,
          name: data.name,
          id: data.id
        }
      })
    },

    // 列表 参数初始化
    _initParams (data) {
      this.params = {
        userInfo: '',
        type: 0,
        currentPage: 1,
        pageSize: 10,
        clientSideType: 1, // 1门店端2面料端3生产端
        ...data
      }
    },

    // 获取列表
    _getList () {
      this.$http.post(this.$apis.api_merchant_list, this.params).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.tableData = res.result
      })
    },

    // 去模型管理
    handelGoModel (data) {
      this.$router.push({
        path: '/project/model',
        query: {
          clientMerchantCode: data.clientMerchantCode
        }
      })
    },

    // 面料品牌管理
    handelGoBrand (data) {
      this.$router.push({
        path: '/project/brand/List',
        query: {
          clientMerchantCode: data.clientMerchantCode,
          name: data.name
        }
      })
    },

    // 禁用或者启用
    handleDisableEnable (data) {
      if (data.item.clientSideStatus === data.type) return false
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

    // 更新
    handleUpdata (data) {
      this.$confirm(`此操作将更新用户最新数据, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this._updata(data)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    // 更新
    _updata (data) {
      this.$http.post(this.$apis.api_merchant_synUpdate, {
        clientMerchantCode: data.clientMerchantCode
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.$message.success('操作成功')
      })
    },

    // 修改状态
    _editStatus (data) {
      this.$http.post(this.$apis.api_merchant_update, {
        merchantId: data.item.merchantId,
        status: data.type
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        data.item.clientSideStatus = data.type
      })
    },

    // 切换
    handleSwitchPick (e) {
      this._initParams({
        clientSideType: e.clientSideType
      })
      this._getList()
    },

    // 开通功能
    handleOpenFunction (data) {
      this.isShowOpen = true
      this.openData = data
      this.$set(this.openData, 'password', '')
    },

    //
    handleOpen () {
      this._openFunction(this.openData)
    },

    // 开通功能
    _openFunction (data) {
      this.$http.post(this.$apis.api_merchant_save, {
        userId: data.id,
        clientSideType: this.params.clientSideType,
        password: this.openData.password
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.isShowOpen = false
        this.$message.success('开通成功')
        this._getList()
      }).catch(res => {
        alert('post')
      })
    },

    // 开通功能的name 1门店端2面料端3生产端
    _openName () {
      if (this.params.clientSideType === 1) return '门店端'
      if (this.params.clientSideType === 2) return '面料端'
      if (this.params.clientSideType === 3) return '生产端'
    },

    // 页容量
    handleSizeChange (e) {
      this._initParams({
        pageSize: e,
        clientSideType: this.params.clientSideType
      })
      this._getList()
    },

    // 页码
    handleCurrentChange (e) {
      this._initParams({
        currentPage: e,
        clientSideType: this.params.clientSideType
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
  .pick-box .btn{
    margin-right: 20px;
  }
  .top-user{
    justify-content: space-between;
  }
  .total-box{
    flex: 1;
    align-items: flex-end;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: white;
  }
}

.title-box{
  width: 120px;
  font-weight: 500;
  color: #666666;
  line-height: 48px;
  text-align-last: justify;
}

.input-password{
  width: 210px;
}

.open-box{
  font-size: 18px;
}
</style>
