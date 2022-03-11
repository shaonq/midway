/**
 * @description User-Service parameters
 */

// 定义接口数据返回格式
export interface ResData {
  data?: any;
  code?: number;
  message?: string;
}
export interface IUserOptions {
  uid: string;
}
