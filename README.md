[midway 文档](https://midwayjs.org)

### prisma

- prisma [prisma 文档](https://prisma.yoga/getting-started/quickstart/)

```bash
# npm install prisma --save-dev
# npm install @prisma/client

# touch schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

# touch .env
DATABASE_URL="mysql://root:[pass]@127.0.0.1:3306/[db]?schema=public"

# npx prisma init 第一次使用
# npx prisma db pull 同步已经存在的数据库结构
# npx prisma generate 生成ts model

```

### 代码阅读顺序

```javascript

src/configuration.ts
-> src/config/ *.config.ts
-> src/middleware/ *.middleware.ts
-> src/controller/ *.controller.ts
-> src/service/ *.service.ts
```

### 目录结构

```bash
#  src
#   controller      // 路由
#   middleware      // 中间件
#   filter          // 过滤器
#   aspect          // 拦截器
#   service         // 服务逻辑
#   entity          // 数据库实体
#   config          // 业务插件配置
#   util            // 工具类
#   interface.ts    // typescript interface

```

### 本地开发

```bash
$ yarn && yarn dev
$ open http://localhost:5050/
```

### 部署

```bash
$ yarn start
```
