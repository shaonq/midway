/* eslint-disable prettier/prettier */
import { Controller, Inject, Get, Post, Files, Fields } from '@midwayjs/decorator';
import { JwtPassportMiddleware } from '../middleware/jwt.middleware';
import { JwtService } from '@midwayjs/jwt';
import { UserService } from '../service/user.service';

import { Context } from '@midwayjs/koa';
// dto 限制查询文件

@Controller('/')
export class HomeController {
  @Inject('userService')
  userService: UserService;

  @Inject()
  jwt: JwtService;

  @Inject()
  ctx: Context;

  @Get('/')
  async home(): Promise<any> {
    return await this.ctx.render('index.ejs', { data: 'world', });
  }

  @Post('/upload')
  async upload(@Files() files, @Fields() fields) {
    const data = <object>Object.assign({}, fields, { file: files[0] });
    /*
    files = [
      {
        filename: 'test.pdf',        // 文件原名
        data: '/var/tmp/xxx.pdf',    // mode 为 file 时为服务器临时文件地址
        fieldName: 'test1',          // 表单 field 名
        mimeType: 'application/pdf', // mime
      },
      // ...file 下支持同时上传多个文件
    ]
    */
    // return { files, fields }

    console.log('upload info => ', data);
    return { success: true, message: 'OK', data };
  }
  @Get('/jwt', { middleware: [JwtPassportMiddleware] })
  async checkJwt(): Promise<object> {
    console.log('jwt user: ', this.ctx);
    return this.ctx;
  }

  // @Get('/login')
  // async login(): Promise<object> {
  //   let user: any = 'no';
  //   try {
  //     user = await this.userService.getUserInfo({ uid: '45c468f4-768b-11e7-b52f-005056a31522' });
  //     console.log(user)
  //   } catch (error) {
  //     console.log(error)
  //   }
  //   // token
  //   return {
  //     token: await this.jwt.sign({ uid: '123456' }),
  //     user
  //   };
  // }
}
