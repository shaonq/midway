import { ResData } from '../interface';
export const ErrorCodeMap = {
  // 10000 - 99999 业务操作错误
  10000: '参数校验异常',
  10001: '用户名已存在',
  10002: '填写验证码有误',
  10003: '用户名密码有误',

  // token相关
  11001: '登录无效或无权限访问',
  11002: '登录身份已过期',
  11003: '无权限，请联系管理员申请权限',

  // 内部错误
  12001: '数据库连接失败',
  12002: '数据查询失败',
  12003: '数据写入失败', 
};
export function res(op?: ResData): ResData {
  return {
    data: op?.data ?? '',
    code: op?.code ?? 200,
    message: op?.code
      ? ErrorCodeMap[op!.code] || op?.message || 'unknown error'
      : op?.message || '',
  };
}
