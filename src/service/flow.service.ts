import { Provide, Inject } from '@midwayjs/decorator';
import { PrismaClient, Prisma } from '@prisma/client';
@Provide()
export class FlowService {
  @Inject('prisma')
  prisma: PrismaClient;
  /** 读取 */
  async read(id: any) {
    try {
      id = 1;
      return await this.prisma.sys_flow.findUnique({ where: { id } });
      // console.log(
      //   await this.prisma.sys_flow.findUnique({ where: { id } }),
      //   await this.prisma.$queryRaw`SELECT * FROM sys_flow WHERE id = ${id}`,
      //   await this.prisma.$queryRaw( Prisma.sql`SELECT * FROM sys_flow WHERE id = ${id}`),
      // );
    } catch (error) {
      throw new Error('12002-查询失败');
    }
  }
  /** 写入 */
  async save(data: Prisma.sys_flowCreateManyInput) {
    await this.prisma.$queryRaw(
      Prisma.sql`SELECT * FROM sys_flow WHERE email = elsa@prisma.io`
    );
    console.log(data);
    try {
      return await this.prisma.sys_flow.createMany({ data });
    } catch (error) {
      throw '12003-保存失败';
    }
  }
}
