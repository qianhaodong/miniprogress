// 域名
const BASE_URL = 'https://hdblog.online'

// 获取封装请求方法
const { getJSON } = require('./request')

// 启用 Mock 数据模拟
const getAllFoods = getJSON(`${BASE_URL}/api/getFoods`)

module.exports = {
  getAllFoods
}
