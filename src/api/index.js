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

// 添加购物车请求
export const reqAddCart = (params) => request({ url: `/cart/addToCart/${params.skuId}/${params.skuNum}`, method: 'post' })

//获取购物车的数据
export const reqShopCartList = () => request({ url: '/cart/cartList', method: 'get' });

// 删除购物车商品
export const delShopCartList = (skuId) => request({ url: `/cart/deleteCart/${skuId}`, method: 'delete' });

// 更新购物车商品是否选中
export const reqUpdateShopCartListChecked = (skuId, isChecked) => request({ url: `cart/checkCart/${skuId}/${isChecked}`, method: 'get' });

// 注册用户
export const reqRegister = (info) => request({ url: `/user/passport/register`, method: 'post', data: info })

// 获取验证码
export const reqRegisterCode = (phone) => request({ url: `/user/passport/sendCode/${phone}`, method: 'get' })

// 登录
export const reqLogin = (data) => request({ url: `/user/passport/login`, method: 'post', data })

// 退出登录
export const reqLogOut = () => request({ url: `/user/passport/logout`, method: 'get' })

// 自动登录
export const reqGetUserInfo = () => request({ url: `/user/passport/auth/getUserInfo`, method: 'get' })