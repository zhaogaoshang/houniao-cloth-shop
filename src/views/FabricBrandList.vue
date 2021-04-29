<template>
  <div class="public-column category public-wait">
    <user>
      <div class="public-row top-user">
        <search></search>
      </div>
    </user>
    <div class="public-row bottom-info">
      <shadow-box>
        <div class="title">面料品牌管理</div>
        <div>
          <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="date"
              label="序号">
            </el-table-column>
            <el-table-column
              prop="name"
              label="面料品牌">
            </el-table-column>
            <el-table-column
              prop="address"
              label="面料LOGO">
            </el-table-column>
            <el-table-column
              prop="date"
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
                <i class="el-icon-edit" @click=" $router.push({
                  path: '/fabric/brand/edit',
                  query: {
                    data: JSON.stringify(scope.row)
                  }
                })"></i>
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
            :page-size="100"
            layout="prev, pager, next, sizes, total"
            :total="tableData.totalCount">
          </el-pagination>
        </div>
      </shadow-box>
    </div>
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
      params: {
        currentPage: 1
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },

  /*
  在实例创建完成后被立即调用。
  在这一步，实例已完成以下的配置：数据观测 (data observer)，property 和方法的运算，watch/event 事件回调。
  然而，挂载阶段还没开始，el property 目前尚不可用。
  */
  created () {
  },

  computed: {
  },

  methods: {
    handleSizeChange () {},
    handleCurrentChange () {},
    handleGoAdd () {
      this.$router.push({path: '/account/add/edit'})
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
