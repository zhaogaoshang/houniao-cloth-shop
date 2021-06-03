
// process.env.NODE_ENV = ""production
// process.env.NODE_ENV = 'development'

// let host = process.env.NODE_ENV === 'development' ? 'http://localhost:8081' : ''
const apis = {}

// apis.host = 'http://192.168.0.5:8090/' // 域名
apis.host = 'http://192.168.0.110:8090' // 域名
apis.photoHost = 'http://192.168.0.110:8090' // 域名

const $apis = {
  host: apis.host,
  photoHost: apis.photoHost,
  api_login_login: 'api/login/login',

  // 获取地址
  api_address_all: 'api/address/all', // 获取地址

  // 上传文件
  api_upload_modelByData: 'api/upload/modelByData', // 模型上传
  api_upload_shopByPhoto: 'api/upload/shopByPhoto', // 上传图片
  api_upload_modelByPhoto: 'api/upload/modelByPhoto', // 模型图片上传
  api_upload_categoryByPhoto: 'api/upload/categoryByPhoto', // 分类上传图片
  api_upload_userByBusinessPhotos: 'api/upload/userByBusinessPhotos', // 上传营业执照

  // 分类
  api_category_list: 'api/category/list', // 列表
  api_category_save: 'api/category/save', // 添加
  api_category_update: 'api/category/update', // 修改
  api_category_categoryList: 'api/category/categoryList', // 调用3级分类
  api_volumeBodilyConfiguration_save: 'api/volumeBodilyConfiguration/save', // 量体部位配置
  api_volumeBodilyConfiguration_list: 'api/volumeBodilyConfiguration/list', // 量体部位配置 列表
  api_volumeBodilyConfiguration_update: 'api/volumeBodilyConfiguration/update', // 量体部位配置 修改

  // 量体部位
  api_volumeBodily_list: 'api/volumeBodily/list', // 列表
  api_volumeBodily_save: 'api/volumeBodily/save', // 添加
  api_volumeBodily_update: 'api/volumeBodily/update', // 修改

  // 特体信息管理
  api_specialBodily_list: 'api/specialBodily/list', // 特体信息管理 列表
  api_specialBodily_save: 'api/specialBodily/save', // 父级特体
  api_specialBodily_update: 'api/specialBodily/update', // 修改
  api_specialBodily_subsetUpdate: 'api/specialBodily/subsetUpdate', // 修改子集

  // 模型管理
  api_model_list: 'api/model/list', // 列表
  api_model_save: 'api/model/save', // 添加
  api_model_update: 'api/model/update', // 删除
  api_model_enableAllAndDeleteAll: 'api/model/enableAllAndDeleteAll', // 全部修改

  // 模型关联
  api_relevancy_list: 'api/relevancy/list',
  api_relevancy_save: 'api/relevancy/save', // 新增关联表
  api_relevancy_update: 'api/relevancy/update', // 修改关联表
  api_relevancy_saveByModel: 'api/relevancy/saveByModel', // 新增管理模型
  api_relevancy_listByModel: 'api/relevancy/listByModel', // 获取模型列表
  api_relevancy_updateByModel: 'api/relevancy/updateByModel', // 修改关联模型

  // 账号管理
  api_user_save: 'api/user/save', // 添加
  api_user_select: 'api/user/select', // 查找
  api_user_update: 'api/user/update', // 修改

  // 项目管理
  api_merchant_list: 'api/merchant/list', // 列表
  api_merchant_save: 'api/merchant/save', // 开通
  api_merchant_update: 'api/merchant/update', // 修改
  api_merchant_synUpdate: 'api/merchant/synUpdate', // 更新用户数据

  // 部位管理
  api_modelConfig_list: 'api/modelConfig/list', // 列表
  api_modelConfig_save: 'api/modelConfig/save', // 部位添加
  api_modelConfig_update: 'api/modelConfig/update', // 部位修改

  // 面料的配置
  api_materialConfig_list: 'api/materialConfig/list', // 列表
  api_materialConfig_save: 'api/materialConfig/save', // 添加
  api_materialConfig_update: 'api/materialConfig/update', // 修改

  // 面料
  api_material_list: 'api/material/list', // 面料列表
  api_material_update: 'api/material/update', // 面料编辑
  api_material_synMaterial: 'api/material/synMaterial' // 面料同步
}

apis.install = function (Vue, options) {
  Vue.prototype.$apis = $apis
}

export default apis
