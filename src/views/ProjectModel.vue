<template>
  <div class="public-column category">
    <user>
      <search @search="handleSearch" v-model="searchInfo"></search>
    </user>
    <div class="public-row bottom-info">
      <shadow-box class="left-box category-box">
        <div class="public-row__align all-category">
          <span>全部分类</span>
          <!-- <el-tooltip placement="right">
            <div slot="content">
              <div class="public-shou handle-categorty" @click="handleAddEditCategory('add', {id: 0, packageType: categoryList.length + 1})">新增子级分类</div>
              <div class="public-shou handle-categorty" @click="handleShowAllCategory()">编辑</div>
            </div>
            <i class="el-icon-s-unfold"></i>
          </el-tooltip> -->
        </div>
        <div>
          <el-tree
            @node-click="handleClickItem"
            :data="categoryList"
            node-key="id"
            :props="defaultProps"
            accordion
            :expand-on-click-node="false">
            <div class="custom-tree-node" slot-scope="{ node ,data }">
              <span :style="'font-size:' + (20-(node.level-1)*2) +'px; color: '+ (node.level < 3? '#333333;' : '#666666;font-weight: 500;')" class="disable-item" v-if="data.status == 1">{{ node.label }}</span>
              <span :style="'font-size:' + (20-(node.level-1)*2) +'px; color: '+ (node.level < 3? '#333333;' : '#666666;font-weight: 500;')" :class="[clickItem.id == node.id && data.status == 0 ? 'pick-item': '']" v-if="data.status == 0">{{ node.label }}</span>
              <el-tooltip placement="right" v-if="node.level==1">
                <div slot="content">
                  <!-- <div class="public-shou handle-categorty" @click="handleAddEditCategory('add', data)">新增子级分类</div> -->
                  <div class="public-shou handle-categorty" @click="handleAddEditCategory('edit', data)">编辑</div>
                  <!-- <div class="public-shou handle-categorty" @click="handleAddDeleteCategory(data)">删除</div> -->
                </div>
                <i class="el-icon-s-unfold" :style="'font-size:' + (20-(node.level-1)*2) +'px'"></i>
              </el-tooltip>
              <el-tooltip placement="right" v-if="node.level==2">
                <div slot="content">
                  <!-- <div class="public-shou handle-categorty" @click="handleAddEditCategory('add', data)">新增子级分类</div> -->
                  <div class="public-shou handle-categorty" @click="handleGoMeasureConfig(data)">量体部位配置</div>
                  <div class="public-shou handle-categorty" @click="handleAddEditCategory('edit', data)">编辑</div>
                  <!-- <div class="public-shou handle-categorty" @click="handleAddDeleteCategory(data)">删除</div> -->
                  <div class="public-shou handle-categorty" @click="handleAddEditDisableOrEnable(data)" v-if="data.status == 0">禁用</div>
                  <div class="public-shou handle-categorty" @click="handleAddEditDisableOrEnable(data)" v-if="data.status == 1">启用</div>
                </div>
                <i class="el-icon-s-unfold" :style="'font-size:' + (20-(node.level-1)*2) +'px'"></i>
              </el-tooltip>
              <el-tooltip placement="right" v-if="node.level==3">
                <div slot="content">
                  <!-- <div class="public-shou handle-categorty" @click="handleAddEditCategory('add', data)">新增子级分类</div> -->
                  <!-- <div class="public-shou handle-categorty" @click="handleGoCategoryModelManage(data)">组件管理</div> -->
                  <div class="public-shou handle-categorty" @click="handleAddEditCategory('edit', data)">编辑</div>
                  <!-- <div class="public-shou handle-categorty" @click="handleAddDeleteCategory(data)">删除</div> -->
                  <div class="public-shou handle-categorty" @click="handleAddEditDisableOrEnable(data)" v-if="data.status == 0">禁用</div>
                  <div class="public-shou handle-categorty" @click="handleAddEditDisableOrEnable(data)" v-if="data.status == 1">启用</div>
                </div>
                <i class="el-icon-s-unfold" :style="'font-size:' + (20-(node.level-1)*2) +'px'"></i>
              </el-tooltip>
              <el-tooltip placement="right" v-if="node.level==4">
                <div slot="content">
                  <!-- <div class="public-shou handle-categorty" @click="handleAddEditCategory('add', data)">新增子级分类</div> -->
                  <div class="public-shou handle-categorty" @click="handleAddEditCategory('edit', data)">编辑</div>
                  <!-- <div class="public-shou handle-categorty" @click="handleAddDeleteCategory(data)">删除</div> -->
                  <div class="public-shou handle-categorty" @click="handleAddEditDisableOrEnable(data)" v-if="data.status == 0">禁用</div>
                  <div class="public-shou handle-categorty" @click="handleAddEditDisableOrEnable(data)" v-if="data.status == 1">启用</div>
                </div>
                <i class="el-icon-s-unfold" :style="'font-size:' + (20-(node.level-1)*2) +'px'"></i>
              </el-tooltip>
              <el-tooltip placement="right" v-if="node.level==5">
                <div slot="content">
                  <div class="public-shou handle-categorty" @click="handleAddEditCategory('edit', data)">编辑</div>
                  <!-- <div class="public-shou handle-categorty" @click="handleAddDeleteCategory(data)">删除</div> -->
                  <div class="public-shou handle-categorty" @click="handleAddEditDisableOrEnable(data)" v-if="data.status == 0">禁用</div>
                  <div class="public-shou handle-categorty" @click="handleAddEditDisableOrEnable(data)" v-if="data.status == 1">启用</div>
                </div>
                <i class="el-icon-s-unfold" :style="'font-size:' + (20-(node.level-1)*2) +'px'"></i>
              </el-tooltip>
            </div>
          </el-tree>
        </div>
      </shadow-box>
      <shadow-box class="right-box">
        <router-view></router-view>
      </shadow-box>
    </div>

    <!-- 操作全部分类 -->
    <el-dialog
      :title="editCategory == 'add' ? '添加分类' : '编辑分类'"
      :visible="editCategory !== 'none'"
      width="30%"
      :show-close="false"
      center>
      <div class="public-row__align caterogy-name__box">
        <span class="name-text">分类名称：</span>
        <el-input :value="handelCategory.name" v-model="handelCategory.name"></el-input>
      </div>
      <div class="public-row__align caterogy-name__box" v-if="handelCategory.name">
        <span class="name-text">分类图片：</span>
        <!-- <el-upload
          disabled
          class="avatar-uploader"
          name="imgUpload"
          :action="$apis.api_upload_categoryByPhoto"
          :show-file-list="false"
          :data="{
            superMerchantCode: $store.state.user.userInfo.superMerchantCode,
            merchantCode: $store.state.user.userInfo.merchantCode,
            name: handelCategory.name
          }"
          :on-success="handleAvatarSuccess">
          <img v-if="handelCategory.photoPath" :src="$apis.photoHost + handelCategory.photoPath" class="avatar avatar-about">
          <i v-else class="el-icon-plus avatar-uploader-icon public-row__center avatar-about"></i>
        </el-upload> -->

        <f-upload
          disabled
          class="avatar-uploader"
          :upData="{
            typeName: 'introduce'
          }"
          @on-success="handleDiscriptionImage"
          :url="$apis.api_upload_shopByPhoto">
            <img v-if="handelCategory.photoPath" :src="$apis.photoHost + handelCategory.photoPath" class="avatar avatar-about">
            <i v-else class="el-icon-plus avatar-uploader-icon public-row__center avatar-about"></i>
          </f-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCategory = 'none'">取 消</el-button>
        <el-button type="primary" @click="handleSubmitCategory">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import FUpload from '../components/FUpload.vue'
import Search from '../components/Search.vue'
import ShadowBox from '../components/ShadowBox.vue'
import User from '../components/User.vue'

export default {
  components: { ShadowBox, User, Search, FUpload },
  name: '',

  data () {
    return {
      searchInfo: '', // 搜索内容
      editCategory: 'none', // 是否 编辑，添加分类 是否显示 none add edit
      // 编辑 或添加 的分类
      handelCategory: {
        parentId: 0,
        type: 0,
        name: '',
        photoPath: '',
        packageType: 1,
        status: 0,
        children: []
      },
      // 点击的分类
      clickItem: {
        id: ''
      },

      // 分类的列表
      categoryList: [],
      // 添加分类的参数
      addCategoryParas: {
        name: '',
        type: '',
        packageType: '',
        photoPath: '',
        parentId: 0
      },

      // 分类的绑定属性
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },

  /*
  在实例创建完成后被立即调用。
  在这一步，实例已完成以下的配置：数据观测 (data observer)，property 和方法的运算，watch/event 事件回调。
  然而，挂载阶段还没开始，el property 目前尚不可用。
  */
  created () {
    this._getCategory()
  },

  computed: {
  },

  methods: {
    // 组件管理
    handleGoCategoryModelManage (e) {
      let newData = JSON.parse(JSON.stringify(e))
      newData.children.forEach(item => {
        item.avtive = false
        item.children = []
      })
      this.$store.commit('category/agent', newData)
      this.$router.push({
        path: '/category/model/relation',
        query: {
          name: e.name,
          id: e.id
        }
      })
    },
    // 量体部位配置
    handleGoMeasureConfig (e) {
      this.$router.push({
        path: '/category/model/measure/config',
        query: {
          name: e.name,
          id: e.id
        }
      })
    },

    // 删除分类
    handleAddDeleteCategory (data) {
      this.$confirm('此操作将删除分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.clickItem = {}
        this.$http.post(this.$apis.api_category_update, {
          id: data.id,
          status: 2
        }).then(res => {
          if (res.code !== 'SUCCESS') return this.$message(res.msg)
          this.$message.success('操作成功')
          this.$utils.deleteCategory({
            id: data.id
          }, this.categoryList)
        })
      }).catch(() => {})
    },

    // 上传图片成功
    handleAvatarSuccess (e) {
      this.handelCategory.photoPath = e.result
    },

    // 编辑全部分类
    handleShowAllCategory () {
      this.isShowAllCategory = true
    },

    // node 节点
    handleClickItem (obj, node, component) {
      this.clickItem = node
      if (node.level === 5) {
        this.$router.push({
          path: '/project/model/show',
          query: {
            name: obj.name,
            id: obj.uuid,
            clientMerchantCode: this.$route.query.clientMerchantCode
          }
        })
      }
    },

    handleSearch () {
      this.$router.push({
        path: '/project/model/show',
        query: {
          id: this.$route.query.id,
          searchInfo: this.searchInfo,
          clientMerchantCode: this.$route.query.clientMerchantCode
        }
      })
    },

    // 修改启用或者禁用状态
    handleAddEditDisableOrEnable (data) {
      this.$confirm('此操作将会修改分类状态, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.clickItem = {}
        this.$http.post(this.$apis.api_category_update, {
          id: data.id,
          status: data.status === 0 ? 1 : 0
        }).then(res => {
          if (res.code !== 'SUCCESS') return this.$message(res.msg)
          this.$message.success('操作成功')
          this.$utils.setCategoryStatus({
            id: data.id
          }, this.categoryList)

          this.handelCategory = {
            parentId: 0,
            type: 0,
            name: '',
            photoPath: '',
            packageType: 1,
            status: 0,
            children: []
          }

          this.editCategory = 'none'
        })
      }).catch(() => {})
    },

    // 提交操作分类
    handleSubmitCategory () {
      if (this.editCategory === 'add') {
        this._addCategory()
      } else {
        this._editCategory()
      }
    },

    // 修改分类
    _editCategory () {
      if (!this.handelCategory.name || !this.handelCategory.photoPath) {
        this.$message.error('请填写完整信息')
        return
      }
      this.$http.post(this.$apis.api_category_update, {
        id: this.handelCategory.id,
        name: this.handelCategory.name,
        photoPath: this.handelCategory.photoPath
        // superMerchantCode: this.$route.query.clientMerchantCode,
        // merchantCode: this.$route.query.clientMerchantCode
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.$message.success('操作成功')
        this.$utils.setCategoryName({
          id: this.handelCategory.id,
          name: this.handelCategory.name,
          photoPath: this.handelCategory.photoPath
        }, this.categoryList)

        this.handelCategory = {
          parentId: 0,
          type: 0,
          name: '',
          photoPath: '',
          packageType: 1,
          status: 0,
          children: []
        }

        this.editCategory = 'none'
      })
    },

    // 添加分类
    _addCategory () {
      if (!this.handelCategory.name || !this.handelCategory.photoPath) {
        this.$message.error('请填写完整信息')
        return
      }
      this.$http.post(this.$apis.api_category_save, {
        ...this.handelCategory
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.$utils.setCategory({
          ...this.handelCategory,
          id: res.result.id,
          uuid: res.result.uuid,
          parentUuid: res.result.parentUuid
        }, this.categoryList)

        this.handelCategory = {
          parentId: 0,
          type: 0,
          name: '',
          photoPath: '',
          packageType: 1,
          status: 0,
          children: []
        }

        this.editCategory = 'none'
      })
    },

    // 添加 编辑 显示分类
    handleAddEditCategory (type, data) {
      this.editCategory = type // add edit

      if (type === 'add') {
        this.handelCategory = {
          // parentId: data.id,
          parentUuid: data.uuid,
          type: 0,
          name: '',
          photoPath: '',
          packageType: data.packageType,
          status: 0,
          children: []
        }
      } else {
        this.handelCategory = {
          ...JSON.parse(JSON.stringify(data)),
          parentId: data.id,
          type: 0
        }
      }
    },

    // 获取分类
    _getCategory () {
      this.$utils.handleShowLoading()
      this.$http.post(this.$apis.api_category_list, {
        type: 0,
        parentId: 0,
        superMerchantCode: this.$route.query.clientMerchantCode,
        merchantCode: this.$route.query.clientMerchantCode
      }).then(res => {
        this.$utils.handleHiddenLoading()
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.categoryList = res.result
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.category{
  flex: 1;
  .bottom-info{
    flex: 1;
  }
  .left-box{
    width: 300px;
    margin-right: 30px;
  }
  .right-box{
    width: 1230px;
  }
  .left-box,
  .right-box{
    height: 720px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .all-category{
    justify-content: space-between;
    margin-bottom: 60px;
    font-size: 22px;
    font-weight: 800;
    .el-icon-s-unfold{
      font-size: 20px;
    }
  }
  .handle-categorty{
    font-size: 14px;
    padding: 10px 15px;
    font-weight: 500;
  }
  .category-box{
    /deep/ .el-tree-node__expand-icon{
      font-size: 20px;
    }
    /deep/ .el-tree-node__content{
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 5px 0;
    }
    .custom-tree-node{
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }
  .pick-item{
    color: $lan !important;
  }
  .disable-item{
    color: #CC0026 !important;
    text-decoration: line-through
  }
  .caterogy-name__box{
    margin-bottom: 20px;
    >>> .el-input{
      width: 200px;
    }
    .name-text{
      margin-right: 10px;
    }
    .avatar-about{
      width: 80px;
      height: 80px;
      border: 1px dashed #666;
      border-radius: 8px;
      box-sizing: border-box;
    }
  }
}
</style>
