import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1643336948816_3309',
  koa: {
    port: 7001,
  },
  jwt: {
    secret: 'wm.key', // fs.readFileSync('xxxxx.key')
    expiresIn: '2d', // https://github.com/vercel/ms
  },
  view: {
    defaultViewEngine: 'ejs',
    mapping: {
      '.ejs': 'ejs',
    },
  },
} as MidwayConfig;
