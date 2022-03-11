import { Provide, Inject } from '@midwayjs/decorator';
import { PrismaClient } from '@prisma/client';
@Provide()
export class UserService {
  @Inject('prisma')
  prisma: PrismaClient;
  /** 读取用户信息 */
  async getUserInfo(opts: { uid: string }) {
    const data: any = await this.prisma.sys_user.findFirst({
      where: { uid: opts.uid } as object,
    });
    return {
      uid: data.uid,
      nickname: data.nickname,
      mobile: data.mobile,
      avatar: data.avatar,
    };
  }
  /** 用户登录 */
  async login(opts: { mobile: string; password?: string }) {
    const data: any = await this.prisma.sys_user.findFirst({
      where: { mobile: opts.mobile, password: opts.password } as object,
    });
    return {
      uid: data.uid,
      nickname: data.nickname,
      mobile: data.mobile,
      avatar: data.avatar,
    };
  }
}
