#### Prisma CLI 命令、参数和选项

```
prisma
Hide CLI results
Prisma是一个用于查询、迁移和建模数据库的现代数据库工具包(https://prisma.io)

用法

  $ prisma [command]

命令

            init   为你的应用程序安装Prisma
        generate   生成工件（例如Prisma Client）
              db   管理数据库架构和生命周期
         migrate   迁移数据库
          studio   使用Prisma Studio浏览您的数据
          format   格式化您的模式

标记

     --preview-feature   运行预览Prisma命令

示例

  创建新的Prisma项目
  $ prisma init

  生成artifacts（例如Prisma Client）
  $ prisma generate

  浏览您的数据
  $ prisma studio

  从Prisma模型创建迁移，将其应用于数据库，生成artifacts（例如Prisma Client）
  $ prisma migrate dev

  从现有数据库中提取模式，更新Prisma模型
  $ prisma db pull

  将Prisma模型状态推送到数据库
  $ prisma db push
```

#### Prisma CLI 例子

```
@doc:
    https://prisma.yoga/reference/api-reference/command-reference#db
    http://www.midwayjs.org/docs/hooks/prisma
"prisma:pull": "npx prisma db pull --schema ./prisma/schema.prisma",  // 同步现在有的数据库
"prisma:push": "npx prisma db push --schema ./prisma/schema.prisma",  // 根据文件生成数据库
"prisma:generate": "npx prisma generate --schema ./prisma/schema.prisma",  // 生成初始化文件

```
#### 连接已有的数据库
```
│    yarn add --dev prisma@latest                         │
│    yarn add @prisma/client@latest   
     yarn prisma pull
     yarn prisma generate  
```

#### Sql [Api](https://prisma.yoga/concepts/components/prisma-client/crud#%E5%88%9B%E5%BB%BA-create)
```
# 增加记录
const user = await prisma.user.create({
  data: {
    email: 'elsa@prisma.io',
    name: 'Elsa Prisma',
  },
})

# 增加多条记录
const createMany = await prisma.user.createMany({
  data: [
    { name: 'Bob', email: 'bob@prisma.io' },
    { name: 'Bobo', email: 'bob@prisma.io' }, // 唯一键重复!
    { name: 'Yewande', email: 'yewande@prisma.io' },
    { name: 'Angelique', email: 'angelique@prisma.io' },
  ],
  skipDuplicates: true, // 跳过重复 'Bobo'
})

# update 修改记录
# updateMany 修改多条记录
# delete 删除

// 查询按唯一标识符
const user = await prisma.user.findUnique({
  where: {
    email: 'elsa@prisma.io',
  },
})

# findUnique 按唯一标识符
# findMany 查询所有
# findFirst 查询第一条

# run sql
const result = await prisma.$queryRaw(Prisma.sql`SELECT * FROM User WHERE email = elsa@prisma.io` )
```