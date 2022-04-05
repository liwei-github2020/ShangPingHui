import request from "./request";
// mockjs
import mockRequest from "./mockAjax";

export const getcategory = () => {
  return request({ url: '/product/getBaseCategoryList', method: 'get' })
}
// mock请求轮播图数据
export const reqGetBannerList = () => mockRequest.get("/banner");

// 请求floor数据
export const reqGetFloorList = () => mockRequest.get("/floor")

// search组件
export const reqGetSearchInfo = (params) => request({ url: '/list', method: 'post', data: params })

// 根据id获取商品信息
export const reqGetGoodInfo = (id) => request({ url: `/item/${id}`, method: 'get' })