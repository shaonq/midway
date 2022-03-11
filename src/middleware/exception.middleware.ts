import { IMiddleware } from '@midwayjs/core';
import { Middleware, App } from '@midwayjs/decorator';
import { NextFunction, Context, Application } from '@midwayjs/koa';
import { res, ErrorCodeMap } from '../utils/res';

/**
 * 中间件 , 拦截错误
 */

@Middleware()
export class ExceptionMiddleware implements IMiddleware<Context, NextFunction> {
  @App()
  app: Application;

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      try {
        await next();
      } catch (err) {
        ctx.logger.error(err);
        // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
        // const status = (err instanceof ValidationError ? 422 : err.status) || 500;
        let status = err.status || -1;
        let message = err.message || err;
        ctx.set('Content-Type', 'application/json');
        // 已存在的错误类型 ErrorCodeMap
        const errInfo = String(message).split('-');
        const code = errInfo[0];
        if (ErrorCodeMap[code]) {
          status = code;
          message = ErrorCodeMap[code] || errInfo[1];
        }
        ctx.body = res({
          code: status,
          message,
        });
      }
    };
  }

  static getName(): string {
    return 'exception';
  }
}
