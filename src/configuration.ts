// https://github.com/ddzyan/midway-example
import { join } from 'path';
import { Configuration, App, Logger } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { IMidwayLogger } from '@midwayjs/logger';

// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import { ExceptionMiddleware } from './middleware/exception.middleware';

// add upload @api => http://www.midwayjs.org/docs/extensions/upload
import * as upload from '@midwayjs/upload';
// add swagger @api => http://www.midwayjs.org/docs/extensions/swagger
// import * as swagger from '@midwayjs/swagger';

// add jwt @api => http://www.midwayjs.org/docs/extensions/passport
import * as passport from '@midwayjs/passport';
import * as jwt from '@midwayjs/jwt';

// add view ejs
import * as view from '@midwayjs/view-ejs';

// add static-file
import * as staticFile from '@midwayjs/static-file';

// import axios from 'axios';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Configuration({
  imports: [
    koa,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
    validate,
    view,
    // {
    //   component: swagger,
    //   enabledEnvironment: ['local'],
    // },
    jwt,
    passport,
    upload,
    staticFile,
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  @Logger()
  readonly logger: IMidwayLogger;

  async onReady() {
    // add middleware
    this.app.useMiddleware([ExceptionMiddleware, ReportMiddleware]);
    // add filter
    // this.app.useFitter([NotFoundFilter, DefaultErrorFilter]);
    // register
    // this.app.getApplicationContext().registerObject('httpclient', axios);

    this.logger.info('[ Prisma ] Prisma Client Connected');
    this.app.getApplicationContext().registerObject('prisma', prisma);
    this.logger.info('[ Prisma ] Prisma Client Injected');
  }
}
