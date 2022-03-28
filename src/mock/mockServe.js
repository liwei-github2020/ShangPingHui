import Mock from 'mockjs';
// 引入模拟数据文件
import banner from './banner.json'
import floor from './floor.json'

Mock.mock("/mock/banner", { code: 200, data: banner });
Mock.mock("/mock/floor", { code: 200, data: floor });