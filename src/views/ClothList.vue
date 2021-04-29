<template>
  <div class="container public-column">
    <div>
      <user>
        <search @search="handleSearch" v-model="params.name"></search>
        <div>
          <discolor-btn class="discolor" typeStyle="middle" @click.native="$router.push({
            path: '/cloth/brand',
            query: {
              type: 1
            }
          })">品牌管理</discolor-btn>
          &nbsp;
          &nbsp;
          &nbsp;
          <discolor-btn class="discolor" typeStyle="middle" @click.native="$router.push({
            path: '/cloth/brand',
            query: {
              type: 3
            }
          })">属性管理</discolor-btn>
          &nbsp;
          &nbsp;
          &nbsp;
          <discolor-btn class="discolor" typeStyle="middle" @click.native="$router.push({
            path: '/cloth/brand',
            query: {
              type: 2
            }
          })">颜色管理</discolor-btn>
          <!-- <discolor-btn class="discolor" typeStyle="middle" @click.native="$router.push('/cloth/info')">颜色管理</discolor-btn> -->
        </div>
      </user>
    </div>
    <shadow-box>
      <div class="public-heng">
        <!-- <div class="client-title">客户列表</div> -->
        <div>
          <el-select v-model="params.brandId" placeholder="品牌选择">
            <el-option
              v-for="item in brandList.items"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>

          <el-select v-model="params.attributeId" placeholder="属性选择">
            <el-option
              v-for="item in attributeList.items"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>

          <el-select v-model="params.colourId" placeholder="颜色">
            <el-option
              v-for="item in colorList.items"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>

      <el-table
        :data="tableData.items">
        <el-table-column
          type="index"
          label="序号">
        </el-table-column>
        <el-table-column
          label="面料图">
        </el-table-column>
          <!-- <template slot-scope="scope">
            <img :src="$apis.photoHost + scope.row.photoPath">
          </template> -->
        <el-table-column
          prop="brandName"
          label="面料品牌">
        </el-table-column>
        <!-- <el-table-column
          prop="workPosition"
          label="面料编号">
        </el-table-column> -->
        <el-table-column
          prop="name"
          label="面料名称">
        </el-table-column>
        <el-table-column
          prop="colourName"
          label="面料颜色">
        </el-table-column>
        <el-table-column
          prop="attributeName"
          label="面料属性">
        </el-table-column>
        <el-table-column
          prop="materialComponent"
          label="面料成分">
        </el-table-column>
        <!-- <el-table-column
          prop="remark"
          label="适用品类">
        </el-table-column> -->
        <!-- <el-table-column
          label="是否上传材质球">
        </el-table-column> -->
        <el-table-column
          prop="address"
          label="操作">
          <template slot-scope="scope">
            <i class="el-icon-edit" @click="handleGoAddEdit(scope.row)"></i>
            &nbsp;
            &nbsp;
            <i class="el-icon-delete" @click="handleDeitTip(scope.row)"></i>
          </template>
        </el-table-column>
      </el-table>
      <div class="total-box">
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
</template>
<script>
import Btn from '../components/Btn.vue'
import DiscolorBtn from '../components/DiscolorBtn.vue'
import Search from '../components/Search.vue'
import ShadowBox from '../components/ShadowBox.vue'
import User from '../components/User.vue'
export default {
  name: 'ClothList',
  components: { User, ShadowBox, Search, DiscolorBtn, Btn },
  data () {
    return {
      params: {
        currentPage: 1, // 当前页 默认为1
        pageSize: 10, // 每页条数 默认10
        name: '', // 名字
        brandId: '', // 品牌
        attributeId: '', // 属性
        colourId: '' // 颜色
      },

      tableData: {
        items: []
      },

      options: [{
        value: '选项1',
        label: '黄金糕'
      }],
      value: '',

      brandList: {},
      colorList: {},
      attributeList: {}
    }
  },
  created () {
    this._getBrand()
    this._getColor()
    this._getAttribute()
  },
  computed: {},
  activated () {
    this._getList()
  },
  methods: {
    // 获取品牌
    _getBrand () {
      this.$http.post(this.$apis.api_materialConfig_list, {
        type: 1 // 1品牌2颜色3属性
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.brandList = res.result
      })
    },
    // 获取颜色
    _getColor () {
      this.$http.post(this.$apis.api_materialConfig_list, {
        type: 2 // 1品牌2颜色3属性
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.colorList = res.result
      })
    },
    // 获取属性
    _getAttribute () {
      this.$http.post(this.$apis.api_materialConfig_list, {
        type: 3 // 1品牌2颜色3属性
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.attributeList = res.result
      })
    },

    // 获取列表
    _getList () {
      this.$http.post(this.$apis.api_material_list, this.params).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        if (res.result.items.length === 0 && this.params.currentPage > 1) {
          --this.params.currentPage
          this._getList()
        } else {
          this.tableData = res.result
        }
      })
    },

    _initParams (e = {}) {
      this.params = {
        currentPage: 1, // 当前页 默认为1
        pageSize: 10, // 每页条数 默认10
        name: '', // 名字
        brandId: '', // 品牌
        attributeId: '', // 属性
        colourId: '', // 颜色
        ...e
      }
    },

    // 修改
    handleGoAddEdit (data) {
      this.$store.commit('cloth/setagent', data)
      this.$router.push({
        path: '/cloth/add/edit'
      })
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

    // 删除
    _delete (e) {
      this.$http.post(this.$apis.api_material_update, {
        id: e.id,
        status: 2
      }).then(res => {
        if (res.code !== 'SUCCESS') return this.$message(res.msg)
        this.$message.success('操作成功')
        this._getList()
      })
    },

    // 搜索
    handleSearch () {
      this._initParams({
        name: this.params.name
      })
    },

    // 页容量
    handleSizeChange (e) {
      this._initParams({
        pageSize: e,
        name: this.params.name
      })
      this._getList()
    },

    // 页码
    handleCurrentChange (e) {
      this._initParams({
        currentPage: e,
        name: this.params.name
      })
      this._getList()
    }
  }
}
</script>
<style lang="scss" scoped>
.total-box{
  margin-top: 30px;
  text-align: center;
}
.discolor{
  margin-right: 20px;
}
.client-title{
  font-size: 22px;
  font-weight: 800;
}
</style>
