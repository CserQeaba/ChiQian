# CHIQIAN · Premium Apparel Website

Official site for Hangzhou Chiqian Trading Co., Ltd. (English UI, light theme). Product photos live in `images/` (local apparel photography from Pexels).

## 本地预览

在项目目录下启动静态服务器：

```bash
# Python 3
python3 -m http.server 8080

# 或 Node.js (需安装 npx)
npx serve .
```

浏览器访问：http://localhost:8080

也可直接双击打开 `index.html`（部分动画在 file:// 协议下可能受限）。

## 文件结构

- `index.html` — 页面结构与内容
- `styles.css` — 样式与响应式布局
- `script.js` — 交互（导航、滚动动画、联系表单）
- `images/` — 本地服装产品图（部署时需一并上传）

## 部署

将 `index.html`、`styles.css`、`script.js` 及整个 `images/` 文件夹上传至任意静态托管（GitHub Pages、阿里云 OSS、腾讯云 COS 等）即可。

## 联系信息

- 联系人：王俊
- 企业：杭州驰乾贸易有限公司
- 邮箱：junwj9527@gmail.com
