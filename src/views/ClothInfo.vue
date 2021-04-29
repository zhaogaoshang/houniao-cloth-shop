<template>
  <div class="public-column category">
    <user>
      <div class="public-row__align">
        <div class="miaobao-left">面料管理 </div>
        &nbsp;
        <div class="mianbao-middle"> > </div>
        &nbsp;
        <div class="mianbao-right"> 面料信息管理 </div>
        &nbsp;
        &nbsp;
        <btn class="mianbao-back" @click.native="$router.go(-1)">返回上一级</btn>
      </div>
    </user>

    <div class="public-row bottom-info">
      <shadow-box>
        <div class="public-heng title">
          <div class="public-left">面料信息管理</div>
          <div class="public-center"></div>
          <div class="publicright">
            <discolor-btn typeStyle="mini">添加面料信息</discolor-btn>
          </div>
        </div>
        <el-row class="row-item">
          <el-col :span="23">
            <div class="title-name">信息名称：面料品牌</div>
            <div class="discription">
              <span class="discription-item">品牌选项：</span>
              <span class="discription-item">PD</span>
              <span class="discription-item">ZV</span>
              <i class="el-icon-setting"></i>
            </div>
          </el-col>
          <el-col :span="1">
            <i class="el-icon-edit"></i>
            &nbsp;
            &nbsp;
            <i class="el-icon-delete"></i>
          </el-col>
        </el-row>

        <div class="public-row__center total-box">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="params.currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="100"
            layout="prev, pager, next, sizes, total"
            :total="100">
          </el-pagination>
        </div>
      </shadow-box>
    </div>

    <el-dialog
      title="添加特体"
      :visible.sync="isShowAddSpecial"
      width="30%"
      center>
      <div class="public-heng">
        <div class="public-left">特体名称：</div>
        <div class="public-row__align public-center">
          <div class="input-item">
            <el-input clear=""></el-input>
            <i class="el-icon-error"></i>
          </div>
          <div class="input-item">
            <el-input clear=""></el-input>
            <i class="el-icon-error"></i>
          </div>
          <div class="input-item">
            <el-input clear=""></el-input>
            <i class="el-icon-error"></i>
          </div>
          <div class="input-item">
            <el-input clear=""></el-input>
            <i class="el-icon-error"></i>
          </div>
          <div class="input-item">
            <el-input clear=""></el-input>
            <i class="el-icon-error"></i>
          </div>
        </div>
        <div class="publicright">
          <btn typeStyle="su">新增</btn>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowAddSpecial = false">取 消</el-button>
        <el-button type="primary" @click="isShowAddSpecial = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 特体选项 -->
    <el-dialog
      title="特体选项"
      :visible.sync="isShowSpecialPick"
      width="30%"
      center>
      <div>
        <span>特体名称：</span>
        <span>特体名称</span>
      </div>
      <br/>
      <br/>
      <div class="public-heng">
        <div class="public-left">挺胸选项：</div>
        <div class="public-row__align public-center">
          <div class="input-item">
            <el-input clear=""></el-input>
            <i class="el-icon-error"></i>
          </div>
          <div class="input-item">
            <el-input clear=""></el-input>
            <i class="el-icon-error"></i>
          </div>
          <div class="input-item">
            <el-input clear=""></el-input>
            <i class="el-icon-error"></i>
          </div>
          <div class="input-item">
            <el-input clear=""></el-input>
            <i class="el-icon-error"></i>
          </div>
          <div class="input-item">
            <el-input clear=""></el-input>
            <i class="el-icon-error"></i>
          </div>
        </div>
        <div class="publicright">
          <btn typeStyle="su">新增</btn>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowSpecialPick = false">取 消</el-button>
        <el-button type="primary" @click="isShowSpecialPick = false">确 定</el-button>
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
  components: { ShadowBox, User, Search, DiscolorBtn, Btn },
  name: '',

  data () {
    return {
      isShowAddSpecial: false, // 是否添加特体
      isShowSpecialPick: false, // 选项管理
      params: {
        currentPage: ''
      }
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
    handleCurrentChange () {}
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
    .discription-item{
      margin-right: 30px;
    }
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
