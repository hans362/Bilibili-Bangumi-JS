# Bilibili-Bangumi-JS

> 📺 Render your Bilibili bangumi progress on a static web page

[![](https://img.shields.io/npm/v/bilibili-bangumi-js.svg?style=flat-square)](https://www.npmjs.com/package/bilibili-bangumi-js)
[![](https://img.shields.io/badge/Author-Hans362-blue.svg?style=flat-square)](https://hans362.cn)
[![](https://img.shields.io/npm/l/bilibili-bangumi-js.svg?style=flat-square)](https://github.com/hans362/Bilibili-Bangumi-JS/blob/master/LICENSE)
[![](https://data.jsdelivr.com/v1/package/npm/bilibili-bangumi-js/badge)](https://www.jsdelivr.com/package/npm/bilibili-bangumi-js)

一个基于前端 + Serverless Function 的 Bilibili 追番进度展示页面。

## 起源

如今许多博客主题都附带有追番展示页面，并且也有实现这一功能的相关插件，然而这些主题/插件多为基于 PHP 的博客程序（如 Wordpress、Typecho 等）设计，像我这种 Hexo 用户就只能哭了。

受制于静态博客的特殊性，尽管前端可以通过 POST 请求 Bilibili API 获得特定用户的追番列表，但无法得知用户的观看进度，除非 POST 请求中带上对应用户的 Cookies。然而众所周知，将 Cookies 这种敏感信息光明正大地写死在前端页面中是十分危险的，所以依然需要有一个后端程序来处理这件事情。

后端程序的运行离不开独立的服务器，然而静态博客用户们本就是为了节约购买服务器的费用才选择前端静态页面托管服务（如 Github Pages 等），于是我想到了 Vercel Serverless Function，提供了后端程序的运行环境及一定的免费配额，搭配前端页面就能够完美实现这一需求。

所以，就有了这个项目啦 :-)

## Demo

- https://bilibili-bangumi-js.vercel.app/
- https://blog.hans362.cn/bangumi/

## 特性

1. 适用于 Hexo、Hugo 等无后端静态博客程序及静态网页。
2. 利用 Bilibili Cookies 实现持久化登录，实时更新追番进度。
3. 后端专为 Vercel Serverless Function 设计，无需独立的服务器即可运行。
4. 敏感信息（如 Cookies）存储于 Vercel 后端环境变量中，无需担心前端隐私泄露。

## 安装

安装分为后端安装和前端安装两步，均需要完成。

### 后端安装

#### 方案一：基于 Vercel Serverless Function

1. Fork 本项目。
2. 前往 Vercel 官网注册或登录。
3. 在 Vercel Dashboard 中点击 New Project，授权 GitHub，选择账户下 Fork 出来的本项目，点击 Deploy 完成部署。
4. 点击 Vercel Dashboard 上的本项目。
![](https://cdn.jsdelivr.net/gh/hans362/Bilibili-Bangumi-JS/assets/1.jpeg)
5. 点击 Settings > Environment Variables，添加新的环境变量，选择 Secret 类型，变量名为`COOKIES`，内容为你的 Bilibili Cookies（获取方式：Chrome 中登录 Bilibili 账号，按下 F12 > Application > Cookies，找到`SESSDATA`，对应的值即为 Cookies）。
![](https://cdn.jsdelivr.net/gh/hans362/Bilibili-Bangumi-JS/assets/2.jpeg)
6. 记录下 Vercel 分配的 Production 域名（如 bilibili-bangumi-js.vercel.app）。

#### 方案二：自建服务器

1. Clone 本项目。
2. 安装 NodeJS 环境（包括 NPM）。
3. 设置环境变量`COOKIES`为你的 Bilibili Cookies（获取方式：Chrome 中登录 Bilibili 账号，按下 F12 > Application > Cookies，找到`SESSDATA`，对应的值即为 Cookies）。
4. `npm start`即可将服务运行在`localhost:3000`，自己想个办法让它保持在后台运行着就可以了。
5. 解析一个域名到服务器，当然你也可以用 IP，需要 SSL 的话可以再搞个反代。

### 前端安装

#### 方案一：直接引入

在需要添加追番列表的页面中直接引入 CSS 和 JS。

```html
<script src="https://cdn.jsdelivr.net/npm/jquery@3.3.1"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bilibili-bangumi-js@latest/dist/bilibili-bangumi.css">
<script>
var apiUrl = "https://bilibili-bangumi-js.vercel.app/api"; /* 替换成你的后端域名，后面加上 /api */
var userId = "66745436"; /* 替换成你的 Bilibili UID，可在个人空间中查看 */
</script>
<script src="https://cdn.jsdelivr.net/npm/bilibili-bangumi-js@latest/dist/bilibili-bangumi.js"></script>
```
上面的代码使用了 JsDelivr 的 CDN 加载了相关资源，你也可以下载本项目`dist`文件夹中的编译好的 CSS 和 JS 进行引入。

引入完成后在页面中需要添加追番列表的地方添加一个容器：
```html
<div class="bgm-container">
    <div class="bgm-collection" id="bgm-collection">
        <img style="margin: 0 auto;" src="https://cdn.jsdelivr.net/gh/hans362/Bilibili-Bangumi-JS/assets/bilibili.gif">
    </div>
</div>
```

#### 方案二：静态博客插件

Hexo 用户请参阅 [hexo-tag-bilibili-bangumi](https://github.com/hans362/hexo-tag-bilibili-bangumi)。

Hugo 等其它静态博客用户再等等吧，欢迎好心人开发其它博客的插件。

## 感谢❤️

- [jquery/jquery](https://github.com/jquery/jquery) - 本项目中 JS 的前置依赖
- [BigCoke233/Miracles](https://github.com/BigCoke233/miracles) - 提供了解析 Bilibili API 返回数据的思路
- [Red-Asuka/bilibili-bangumi-api](https://github.com/Red-Asuka/bilibili-bangumi-api.git) - 提供后端实现
- [AlanDecode/PandaBangumi-Typecho-Plugin](https://github.com/AlanDecode/PandaBangumi-Typecho-Plugin) - 提供前端 CSS 原型
- [SukkaW/DisqusJS](https://github.com/SukkaW/DisqusJS) - 提供示例页面的 CSS 样式
