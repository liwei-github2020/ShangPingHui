import request from "./request";

export const getcategory = () => {
  return request({ url: '/api/product/getBaseCategoryList', method: 'get' })
}