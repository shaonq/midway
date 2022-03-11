// eslint-disable-next-line prettier/prettier
import { Inject, Controller, Get, Post, Query, Body } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { res } from '../utils/res';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;
  /** 读取用户信息 */
  @Get('/getUserInfo')
  async getUser(@Query('uid') uid: string) {
    const user = await this.userService.getUserInfo({ uid });
    return res({ data: user });
  }
  /** 插入用户数据 */
  @Post('/login')
  async postLogin(@Body('mobile') mobile: string) {
    console.log('ʕ•ﻌ•ʔ  ​​​', mobile, this.ctx.request.body);
    if (!mobile) throw new Error('10086');
    const user = await this.userService.login({ mobile });
    // this.ctx.cookies.set('sys_user_info', JSON.stringify(user));
    return res({ data: user });
  }
}
