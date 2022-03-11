// eslint-disable-next-line prettier/prettier
import { Inject, Controller, Post, Body, Query, Get } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { FlowService } from '../service/flow.service';
import { res } from '../utils/res';

@Controller('/api/flow')
export class FlowController {
  @Inject()
  ctx: Context;
  @Inject()
  flowService: FlowService;
  /** 读取flow信息 */
  @Get('')
  async getFlow(@Query() obj: any) {
    const data: any = await this.flowService.read(obj);
    console.log(data);
    return res(data);
  }
  /** 写入flow信息 */
  @Post('/save')
  async saveFlow(@Body() obj: any) {
    const data: any = await this.flowService.save(obj);
    console.log(data);
    return res(data);
  }
}
