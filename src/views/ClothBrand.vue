<template>
  <div class="public-column category">
    <user>
        <!-- <search @search="handleSearch" v-model="params.systemName"></search> -->
        <div></div>
        <!-- <discolor-btn typeStyle="middle" @click.native="handleIsShowParentSpecial('add')">添加品牌</discolor-btn> -->
        <discolor-btn typeStyle="middle" @click.native="handleIsShowSonSpecial('add')">添加品牌</discolor-btn>
    </user>

    <div class="public-row bottom-info">
      <shadow-box>
        <div class="title">面料品牌管理</div>
        <el-row class="row-item" v-for="(item, index) in tableData.items" :key="index">
          <el-col :span="23">
            <div class="title-name">品牌：{{item.name}}</div>
            <span class="discription-item">选项：</span>
            <span class="discription" v-for="(only, index) in item.configurationList" :key="index">
              <span>{{only.name}}</span>
              &nbsp;
            </span>

            <!-- <div class="discription" v-for="(only, index) in item.systemName" :key="index"> -->
              <!-- <span class="discription-item" v-for="(the, index) in only.systemName" :key="index">{{the.name}}</span> -->
              <!-- <i class="el-icon-setting" @click="handleIsShowSonSpecial(only)"></i> -->
            <!-- </div> -->
          </el-col>
          <el-col :span="1">
            <!-- <i class="el-icon-edit" @click="handleIsShowParentSpecial('edit', item)"></i> -->
            <i class="el-icon-edit" @click="handleIsShowSonSpecial('edit', item)"></i>
            &nbsp;
            &nbsp;
            <i class="el-icon-delete" @click="handleDeleteParent(item)"></i>
          </el-col>
        </el-row>
        <br/>
        <br/>
        <br/>
        <div class="public-row__center" v-if="tableData.items.length === 0">暂无数据</div>
        <br/>
        <br/>
        <br/>
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

    <!-- <el-dialog
      title="选项管理"
      :visible="isShowParentSpecial !== 'none'"
      width="30%"
      :show-close="false"
      center>
      <div class="public-heng">
        <div class="public-left">特体名称：</div>
        <div class="public-row__align public-center">
          <div class="input-item" v-for="(item, index) in addParentParams.systemName" :key="index">
            <el-input clear="" v-model="addParentParams.systemName[index]" clearable></el-input>
            <i class="el-icon-error" @click="addParentParams.systemName.splice(index, 1)"></i>
          </div>
        </div>
        <div class="publicright">
          <btn typeStyle="su" @click.native="addParentParams.systemName.push('')">新增</btn>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowParentSpecial = 'none'">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog> -->

    <!-- 选项 -->
    <el-dialog
      title="选项管理"
      :visible="isShowSonSpecial !== 'none'"
      width="30%"
      :show-close="false"
      center>
      <div class="public-row__center">
        <span>信息名称：</span>
        <el-input class="input-name" v-model="editSonParams.name"></el-input>
        <!-- <span>{{editSonParams.name}}</span> -->
      </div>
      <br/>
      <br/>
      <div class="public-heng">
        <div class="public-left">属性选项：</div>
        <div class="public-row__align public-center">
          <div class="input-item" v-for="(item, index) in editSonParams.configurationList" :key="index">
            <el-input clear="" v-model="editSonParams.configurationList[index].name" :value="item.name"></el-input>
            <!-- <el-input clear="" :value="item.name"></el-input> -->
            <i class="el-icon-error" @click="editSonParams.configurationList.splice(index, 1)"></i>
          </div>
        </div>
        <div class="publicright">
          <btn typeStyle="su" @click.native="editSonParams.configurationList.push({
            name: ''
          })">新增</btn>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowSonSpecial = 'none'">取 消</el-button>
        <el-button type="primary" @click="handleSubmitSon">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Btn from '../components/Btn.vue'
import User from '../components/User.vue'
import Search from '../components/Search.vue'
import ShadowBox from '../components/ShadowBox.vue'
import DiscolorBtn from '../components/DiscolorBtn.vue'

export default {
  components: { ShadowBox, User, Search, DiscolorBtn, Btn },
  name: '',
  data () {
    return {
      isShowSonSpecial: 'none', // add edit none
      isShowParentSpecial: 'none', // add edit none
      params: {
        currentPage: 1,
        pageSize: 10,
        name: '',
        status: 0,
        systemName: '',
        type: this.$route.query.type
      },

      addParentParams: {
        name: '',
        status: 0,
        systemName: ['']
      },

      editSonParams: {
        id: '',
        name: '',
        configurationList: [{
          name: ''
        }]
      },

      tableData: {
        items: []
      }
    }
  },

  /*
  在实例创建完成后被立即调用。
  在这一步，实例已完成以下的配置：数据观测 (data observer)，property 和方法的运算，watch/event 事件回调。
  然而，挂载阶段还没开始，el property 目前尚不可用。
  */
  created () {
    this._initParams()
    this._getList()
  },

  computed: {
  },

  methods: {
    // 搜索
    handleSearch () {
      this._initParams({
        systemName: this.params.systemName
      })
      this._getList()
    },

    // 显示子集
    handleIsShowSonSpecial (e, data) {
      this.isShowSonSpecial = e
      if (e === 'add') {
        this.editSonParams = {
          id: '',
          name: '',
          configurationList: [{
            name: ''
          }]
        }
      } else {
        this.editSonParams = JSON.parse(JSON.stringify(data))
      }
    },

    // 提交
    handleSubmitSon () {
      if (this.isShowSonSpecial === 'add') {
        this._addSub()
      } else {
        this._handleSubmitSon()
      }
    },

    // 添加
    _addSub () {
      this.$http.post(this.$apis.api_materialConfig_save, {
        type: this.$route.query.type,
        name: this.editSonParams.name,
        systemName: this.editSonParams.configurationList.map(item => item.name).join(',')
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.$message.success('操作成功')
        this.isShowSonSpecial = 'none'
        this._getList()
      })
    },

    // 编辑子集
    _handleSubmitSon () {
      delete this.editSonParams.createTime
      this.$http.post(this.$apis.api_materialConfig_update, {
        name: this.editSonParams.name,
        id: this.editSonParams.id,
        type: this.$route.query.type,
        systemName: this.editSonParams.configurationList.map(item => item.name).join(',')
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.$message.success('操作成功')
        this.isShowSonSpecial = 'none'
        this._getList()
      })
    },

    // 提交添加父级
    handleSubmit () {
      if (this.isShowParentSpecial === 'add') {
        this._addParent()
      } else {
        this._editParent()
      }
    },

    // 添加父级
    _addParent () {
      this.$http.post(this.$apis.api_specialBodily_save, {
        status: 0,
        name: this.addParentParams.systemName.join('/'),
        systemName: this.addParentParams.systemName.join(',')
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.$message.success('操作成功')
        this.isShowParentSpecial = 'none'
        this._getList()
      })
    },

    // 提交修改父类
    _editParent () {
      this.$http.post(this.$apis.api_specialBodily_update, {
        status: 0,
        id: this.addParentParams.id,
        name: this.addParentParams.systemName.join('/'),
        systemName: this.addParentParams.systemName.join(',')
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.$message.success('操作成功')
        this.isShowParentSpecial = 'none'
        this._getList()
      })
    },

    // 删除父级的特体
    handleDeleteParent (data) {
      this.$confirm('此操作将会删除特体, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this._deleteParent(data)
      }).catch(() => {})
    },

    // 删除
    _deleteParent (data) {
      this.$http.post(this.$apis.api_materialConfig_update, {
        status: 2,
        id: data.id,
        type: this.$route.query.type
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.$message.success('操作成功')
        this._getList()
      })
    },

    // 是否显示添加父亲
    handleIsShowParentSpecial (e, data) {
      this.isShowParentSpecial = e
      if (e === 'add') {
        this.addParentParams = {
          name: '',
          status: 0,
          systemName: ['']
        }
      } else {
        this.addParentParams.systemName = data.systemName.split('/')
        this.addParentParams.id = data.id
      }
    },

    // 初始化参数
    _initParams (data) {
      this.params = {
        currentPage: 1,
        pageSize: 10,
        name: '',
        status: 0,
        systemName: '',
        type: this.$route.query.type,
        ...data
      }
    },

    // 获取列表
    _getList () {
      this.$http.post(this.$apis.api_materialConfig_list, this.params).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)

        res.result.items.forEach(element => {
          element.systemName = element.systemName.split(',')
        })

        if (res.result.items.length === 0 && this.params.currentPage > 1) {
          --this.params.currentPage
          this._getList()
        } else {
          this.tableData = res.result
        }
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
  .input-name{
    flex: 1;
  }
  .title{
    font-size: 22px;
    font-weight: 800;
    margin-bottom: 20px;
  }
  .row-item{
    padding: 20px 0;
    border-bottom: 1px dashed #000000;
    align-items: center;
  }
  .title-name{
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
  }
  .discription{
    font-size: 16px;
    font-weight: 500;
    color: #666666;
    padding: 14px 0;
  }
  .discription-item{
    margin-right: 10px;
    font-size: 16px;
    font-weight: 500;
  }
  i{
    color: $lan;
    font-size: 16px;
  }
  .total-box{
    flex: 1;
    align-items: flex-end;
  }
  .input-item{
    position: relative;
    width: 120px;
    height: 33px;
    margin-right: 10px;
    margin-bottom: 20px;
    .el-icon-error{
      position: absolute;
      top: -6px;
      right: -6px;
      color: #CC0026;
    }
  }

  .public-center{
    flex-wrap: wrap;
  }
}
</style>
