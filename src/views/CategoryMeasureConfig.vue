<template>
  <div class="public-column out-box">
    <div class="public-heng">
      <div class="public-left title-name">量体部位配置（{{$route.query.name}}）</div>
      <div class="public-center"></div>
      <div class="publicright">
        <discolor-btn typeStyle="mini" @click.native="isShowAddEdit = 'add'">添加配置</discolor-btn>
      </div>
    </div>
    <div class="middle-box">
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
          width="200"
          prop="volumeBodilyName"
          label="部位名称">
        </el-table-column>
        <el-table-column
          prop="address"
          width="200"
          label="是否必填">
          <template slot-scope="scope">
            <!-- <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small">
              移除
            </el-button> -->
            <div class="public-row__align public-shou" @click="handleSwitch(scope.row)">
              <div class="public-row__center el-icon-check pick-box__active" v-if="scope.row.type === 0"></div>
              <div class="public-row__center el-icon-check pick-box__disabel" v-if="scope.row.type === 1"></div>
              &nbsp;
              &nbsp;
              &nbsp;
              <div>必选</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
          <template slot-scope="scope">
            <!-- <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small">
              移除
            </el-button> -->
            <!-- <i class="public-wait-f el-icon-edit" @click="handelEdit(scope.row)"></i>  产品经理去除-->
            <i class="el-icon-delete" @click="handleDelete(scope.row)"></i>
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

    <el-dialog
      title="量体部位配置"
      :visible="isShowAddEdit !== 'none'"
      width="30%"
      center>
      <div class="public-row dialog-box">
        <div>待配置：</div>
        <div class="pick-box">
          <el-checkbox class="item-checkbox" v-model="item.checked" v-for="(item, index) in volumeList.items" :key="index">{{item.name}}</el-checkbox>
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
import DiscolorBtn from '../components/DiscolorBtn.vue'
export default {
  components: { DiscolorBtn },
  data () {
    return {
      isShowAddEdit: 'none', // none add edit
      params: {
        currentPage: 1,
        pageSize: 10,
        categoryId: this.$route.query.id
      },

      volumeList: {}, // 量体部位列表
      tableData: {} // 列表
    }
  },

  created () {
    this._initParams()
    this._getList()
    this._getVolumeListList()
  },

  // 监听
  watch: {
    $route (to, from) {
      this._initParams()
      this._getList()
    }
  },

  /*
  实例被挂载后调用，这时 el 被新创建的 vm.el 替换了。
  如果根实例挂载到了一个文档内的元素上，当 mounted 被调用时 vm.el 也在文档内。
  */
  mounted: function () {
  },

  computed: {
  },

  methods: {
    // 修改
    handelEdit (e) {
    },

    // 删除
    handleDelete (data) {
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

    // 删除
    _deleteModel (e) {
      // 提交修改状态
      this.$http.post(this.$apis.api_volumeBodilyConfiguration_update, {
        id: e.id,
        status: 2,
        type: 1,
        categoryUuid: this.$route.query.uuid
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.$message.success('操作成功')
        this._getList()
      })
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
          type: e.type === 0 ? 1 : 0,
          uuid: this.$route.query.uuid,
          categoryUuid: this.$route.query.uuid
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

    // 初始化请求参数
    _initParams (e) {
      this.params = {
        currentPage: 1,
        pageSize: 10,
        categoryId: this.$route.query.id,
        ...e
      }
    },

    // 获取量体部位信息列表
    _getVolumeListList () {
      this.$http.post(this.$apis.api_volumeBodily_list, {
        uuid: this.$route.query.uuid,
        categoryUuid: this.$route.query.uuid
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.volumeList = res.result
      })
    },

    // 获取列表
    _getList () {
      this.$http.post(this.$apis.api_volumeBodilyConfiguration_list, {
        ...this.params,
        categoryUuid: this.$route.query.uuid
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        if (res.result.items.length === 0 && this.params.currentPage > 1) {
          --this.params.currentPage
          this._getList()
        } else {
          this.tableData = res.result
        }
      })
    },

    // 提交验证
    submitForm () {
      let volumeList = this.volumeList.items.filter(item => item.checked)
      let newVolumeList = []
      volumeList.forEach(element => {
        newVolumeList.push({
          volumeBodilyId: element.id,
          volumeBodilyName: element.name
        })
      })

      this.$http.post(this.$apis.api_volumeBodilyConfiguration_save, {
        categoryId: this.$route.query.id,
        volumeJson: JSON.stringify(newVolumeList),
        categoryUuid: this.$route.query.uuid,
        categoryName: this.$route.query.name
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
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
}
</style>
