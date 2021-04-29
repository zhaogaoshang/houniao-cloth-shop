<template>
  <div>
    <div class="public-row__align title-box">
      <div>组件管理（{{$route.query.name}}）</div>
      <discolor-btn typeStyle="mini" @click.native="handleIsShowRelation('add')">新增关联</discolor-btn>
    </div>
    <div class="item-box" v-for="(item, index) in tableData" :key="index">
      <div class="public-row__align item-title">
        <span>关联表（{{item.name}}）</span>
        <div class="right">
          <i class="el-icon-edit" @click="handleIsShowRelation('edit', item)"></i>
          &nbsp;
          &nbsp;
          <i class="el-icon-delete" @click="handleDeleteTable(item)"></i>
          &nbsp;
          &nbsp;
          <btn typeStyle="su" @click.native="handleIsShowRelationModel('add', item)">新增关联模型</btn>
        </div>
      </div>
      <div class="public-heng item-data" v-for="(only, index) in item.list" :key="only.id">
        <span class="public-left">{{index+1}}:</span>
        &nbsp;
        &nbsp;
        <span class="public-center">{{only.modelDataJson | jsonToString}}</span>
        &nbsp;
        &nbsp;
        <span class="publicright">
          <i class="el-icon-edit" @click="handleIsShowRelationModel('edit', item, only)"></i>
          &nbsp;
          &nbsp;
          <i class="el-icon-delete" @click="handleDeleteModel(only)"></i>
        </span>
      </div>
    </div>

    <h1 class="public-row__center" v-if="tableData.length===0">暂无数据</h1>

    <!-- 新增关联表 -->
    <el-dialog
      title="新增关联表"
      :show-close="false"
      :visible="isShowAddEditRelation !== 'none'"
      width="40%"
      center>
      <div class="public-row">
        <span>选择关联部位：</span>
        &nbsp;
        &nbsp;
        <div class="volume-box">
          <el-checkbox-group v-model="relationTableParams.categoryUuIds">
            <el-checkbox :label="item.uuid" v-for="(item, index) in relationTable.children" :key="index">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowAddEditRelation = 'none'">取 消</el-button>
        <el-button type="primary" @click="submitFormRelation">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 新增关联模型 -->
    <el-dialog
      title="新增关联模型"
      :show-close="false"
      :visible="isShowRelationModel !== 'none'"
      width="40%"
      center>
      <div class="public-row">
        <span>选择关联模型:</span>
        &nbsp;
        &nbsp;
        <div class="volume-box">
          <el-checkbox v-model="item.active" v-for="(item, index) in modelList" :key="index">{{item.systemNamePrefix}}-{{item.systemNameSuffix}}</el-checkbox>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowRelationModel = 'none'">取 消</el-button>
        <el-button type="primary" @click="submitRelationModel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Btn from '../components/Btn.vue'
import DiscolorBtn from '../components/DiscolorBtn.vue'
export default {
  components: { DiscolorBtn, Btn },
  name: '',

  data () {
    return {
      isShowAddEditRelation: 'none', // none add edit 关联表
      isShowRelationModel: 'none', // none add edit 关联模型

      // 添加或者修改 关联表参数
      relationTableParams: {
        name: [], // 名称
        categoryParentUuId: this.$route.query.id, // 父级分类uuid
        categoryUuIds: [] // 选中分类uuid 多个用逗号隔开
      },

      // 列表参数
      params: {
        categoryParentUuId: this.$route.query.id
      },

      getModelParams: {}, // 获取模型的参数
      editModelPrams: {}, // 修改某个模型的参数

      tableData: [], // 页面展示列表
      modelList: [] // 模型列表
    }
  },

  created () {
    this._initParams()
    this._getList()
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
    ...mapState({
      relationTable: state => state.category.agent
    })
  },

  methods: {
    // 删除关联模型
    handleDeleteModel (data) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this._deleteModel(data)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    // 删除模型
    _deleteModel (data) {
      this.$http.post(this.$apis.api_relevancy_updateByModel, {
        id: data.id,
        status: 2
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.$message.success('操作成功')
        this.isShowRelationModel = 'none'
        this._getList()
      })
    },

    // 验证关联表
    submitFormRelation (e) {
      let ids = this.relationTableParams.categoryUuIds.join(',')
      this.relationTableParams.name = []
      this.relationTable.children.forEach(item => {
        if (ids.includes(item.uuid)) {
          this.relationTableParams.name.push(item.name)
        }
      })

      if (this.relationTableParams.categoryUuIds.length === 0) return this.$message.error('选择最少为一项')
      if (this.isShowAddEditRelation === 'add') {
        this._addRelationTab()
      } else {
        this._editRelationTab()
      }
    },

    // 关联模型 显示
    handleIsShowRelationModel (e, data, editModelPrams = {}) {
      this.isShowRelationModel = e
      this.getModelParams = data
      this.editModelPrams = editModelPrams
      this._getModelList(res => {
        if (e === 'add') {
        } else {
          this.modelList.forEach(item => {
            if (editModelPrams.modelDataUuIds.includes(item.uuid)) {
              item.active = true
            } else {
              item.active = false
            }
          })
        }
      })
    },

    // 修改关联模型
    handleEditModel () {},

    // 提交模型关联
    submitRelationModel () {
      let relation = this.modelList.filter(item => item.active)
      let modelDataUuIds = []
      relation.forEach(item => modelDataUuIds.push({
        uuid: item.uuid,
        systemNamePrefix: item.systemNamePrefix,
        systemNameSuffix: item.systemNameSuffix
      }))
      if (modelDataUuIds.length === 0) return this.$message.error('选择最少为一项')
      if (this.isShowRelationModel === 'add') {
        this._modelRelation(modelDataUuIds)
      } else {
        this._editRelationModel(modelDataUuIds)
      }
    },

    // 添加关联模型
    _modelRelation (data) {
      this.$http.post(this.$apis.api_relevancy_saveByModel, {
        moduleRelevancyUuId: this.getModelParams.uuid,
        modelDataUuIds: data.map(item => item.uuid).join(','),
        modelDataJson: JSON.stringify(data)
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.$message.success('操作成功')
        this.isShowRelationModel = 'none'
        this._getList()
      })
    },

    // 修改关联模型
    _editRelationModel (data) {
      this.$http.post(this.$apis.api_relevancy_updateByModel, {
        id: this.editModelPrams.id,
        modelDataUuIds: data.map(item => item.uuid).join(','),
        modelDataJson: JSON.stringify(data)
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.$message.success('操作成功')
        this.isShowRelationModel = 'none'
        this._getList()
      })
    },

    // 是否显示新增关联表
    handleIsShowRelation (e, data = {}) {
      this.isShowAddEditRelation = e
      if (e === 'add') {
        data.categoryUuIds = []
        this.relationTableParams = data
        this._initRelationTableParams()
        this.$store.commit('category/initActive')
      } else {
        data.categoryUuIds = data.categoryUuIds.split(',')
        this.relationTableParams = data
        this.$store.commit('category/setActives', this.relationTableParams)
      }
    },

    // 获取相关的模型
    _getModelList (cb) {
      this.$http.post(this.$apis.api_relevancy_listByModel, {
        categoryUuIds: this.getModelParams.categoryUuIds
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        res.result.forEach(item => {
          item.active = false
        })
        this.modelList = res.result
        cb()
      })
    },

    // 初始化 新增列表参数
    _initRelationTableParams (e) {
      this.relationTableParams = {
        name: [], // 名称
        categoryParentUuId: this.$route.query.id, // 父级分类uuid
        categoryUuIds: [], // 选中分类uuid 多个用逗号隔开
        ...e
      }
    },

    // 删除关联表
    handleDeleteTable (data) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this._deleteRelationTab(data)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    // 删除关联表
    _deleteRelationTab (data) {
      this.$http.post(this.$apis.api_relevancy_update, {
        id: data.id,
        status: 2
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.isShowAddEditRelation = 'none'
        this._getList()
      })
    },

    // 初始化请求参数
    _initParams (e) {
      this.params = {
        categoryParentUuId: this.$route.query.id,
        ...e
      }
    },

    // 新增关联表
    _addRelationTab (data) {
      this.$http.post(this.$apis.api_relevancy_save, {
        name: this.relationTableParams.name.join(','),
        categoryUuIds: this.relationTableParams.categoryUuIds.join(','),
        categoryParentUuId: this.relationTableParams.categoryParentUuId
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.isShowAddEditRelation = 'none'
        this.$message.success('操作成功')
        this._getList()
      })
    },

    // 修改关联表
    _editRelationTab (data) {
      this.$http.post(this.$apis.api_relevancy_update, {
        id: this.relationTableParams.id,
        name: this.relationTableParams.name.join(','),
        categoryUuIds: this.relationTableParams.categoryUuIds.join(',')
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.isShowAddEditRelation = 'none'
        this._getList()
      })
    },

    // 获取列表 api/relevancy/list
    _getList (data) {
      this.$http.post(this.$apis.api_relevancy_list, this.params).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        // if (res.result.items.length === 0 && this.params.currentPage > 1) {
        //   --this.params.currentPage
        //   this._getList()
        // } else {
        //   this.tableData = res.result
        // }
        this.tableData = res.result
      })
    }
  },
  beforeDestroy () {
    this.$store.commit('category/agent', null)
  }
}
</script>
<style lang="scss" scoped>
.title-box{
  font-size: 20px;
  font-weight: bold;
  justify-content: space-between;
  margin-bottom: 30px;
}
.item-title{
  justify-content: space-between;
  font-size: 18px;
  font-weight: 500;
  line-height: 28px;
  .right{
    color: $lan;
  }
}
.item-box{
  margin-top: 30px;
}
.item-data{
  padding: 15px;
  border-bottom: 1px dashed #e6e6e6;
  font-size: 16px;
}
.volume-box{
  flex: 1;
  >>> .el-checkbox{
    margin-bottom: 10px;
  }
}
</style>
