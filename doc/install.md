## 开发环境部署/安装

基于 Laravel6.x 与 iview 4.x 开发的后台管理系统，开发环境 linux｜windows

**tips:** 下文中的所有 `art` 是 `php artisan` 命令的别名

### 运行环境

- PHP 7.4
- laravel/framewor:6.x
- composer1.8.4
- Nginx1.14.0
- Mysql 8.0.11
- PHP OpenSSL 扩展
- PHP PDO 扩展
- PHP Mbstring 扩展
- PHP Tokenizer 扩展
- PHP XML 扩展
- PHP 开启 proc_open、proc_get_status 函数
- Node 11.0.0

`storage` 和 `bootstrap/cache` 要有写的权限

### 基础安装
- 克隆源代码

克隆 lucmsee 源代码到本地：

> git@gitee.com:zhjaa/lucmsee.git

#### php 配置修改
1). 配置本地环境，根目录指向 `public`

2). 安装 composer
```html
composer install
```

3). 生成配置文件
```html
cp .env.example .env
你可以根据情况修改 .env 文件里的内容，如数据库连接、缓存、邮件设置等：
```


4). 目录访问权限配置

```text
  $ chmod -R 777 storage
```


5). 配置 .env  ，修改数据库信息 . ....
```sh
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:IKlBaIonliiolP7yK0QWP8Ixwgc1Z5R2ylxEA6CD3nA=
APP_DEBUG=true
APP_LOG_LEVEL=debug
APP_URL=http://lucms.test

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=lucms
DB_USERNAME=root
DB_PASSWORD=route
.

.

.
QUEUE_DRIVER=sync 「同步模式，不使用任何队列」 => redis

.

.

.
```

6). 生成数据表及生成测试数据

```sh
$ art migrate 或执行bin/autosql.bin
$ art db:seed
默认账号：dev@lucms.com 密码：123456
```

7). 安装 passport 客户端, vue api 请求 token 认证要用到
```sh
 $ art passport:install --force

 # 以下内容复制到 .env 中
 Client ID: 2
 Client Secret: qtbbnoYSKM1QkAfbcs614iCiWmMvBWNdRloJNbDi

```

8). 配置 .env  ，修改数据库信息 . ....
```sh
.

.

.
OAUTH_GRANT_TYPE=password
OAUTH_CLIENT_ID=2
OAUTH_CLIENT_SECRET=p7XaeU3D9RASxQ18eiF5CT1uL9xUJRYjT6O8BJFt
OAUTH_SCOPE=*

.

.

.
```


9). 生成密钥
```html
art key:generate
```

10). 设定图片上传软链接 
```
$ art storage:link
```

#### 修改 js 配置

1). 全局修改基本域名 http://lucms.test => https://xxxxx

```html
cp  lu/eg.vue.config.js lu/vue.config.js
```

`lucms/lu/vue.config.js`
```js
const BASE_URL = env === 'development'
  ? '/iview-admin/'
  : 'https://lucms.com/lu/dist/'
  
  .
  .
  .
  
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  devServer: {
    port: 8089,
    proxy: {
      '/api': {
        target: 'http://lucmsee.test/',
        changeOrigin: true
      }
    }
  } 
```

`lucms/lu/src/config/index.js`
```js
// 找到要修改的位置并修改配置
```

### 工具 tools 

tools 工具类在 `/tools` 目录下

修改对应的 `webpack.config.js` 文件中的主域名地址后即可打包

> npm run build


### vuejs 安装与运行

1). 开发环境
```
$ cd lu
$ cnpm install
$ npm run dev
```

2). 生产环境
```
$ cd lu
$ npm run build
```
