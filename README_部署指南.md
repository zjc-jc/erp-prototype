# 进销存系统原型 - 在线访问部署指南

## 🎯 目标
让其他人通过链接直接访问 HTML 页面，无需下载文件。

---

## ✅ 方案一：GitHub Pages（推荐，完全免费）

### 步骤 1：准备 GitHub 账号
1. 访问 https://github.com 注册账号（如已有可跳过）
2. 安装 Git：https://git-scm.com/download/win

### 步骤 2：创建仓库
```bash
# 进入页面目录
cd D:\Wukong\work\进销存页面

# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交
git commit -m "初始版本 - 进销存系统原型"
```

### 步骤 3：关联 GitHub 仓库
1. 在 GitHub 点击右上角 "+" → "New repository"
2. 仓库名：`erp-prototype`（或其他你喜欢的名字）
3. 设为 **Public**（公开）
4. 不要勾选 "Initialize this repository with a README"
5. 点击 "Create repository"

### 步骤 4：推送代码
```bash
# 替换为你的 GitHub 用户名
git remote add origin https://github.com/你的用户名/erp-prototype.git

# 推送
git branch -M main
git push -u origin main
```

### 步骤 5：启用 GitHub Pages
1. 进入仓库页面 → Settings → Pages
2. Source 选择 `main` 分支 → `/ (root)`
3. 点击 Save
4. 等待 1-2 分钟，页面会生成访问链接

**访问格式**：`https://你的用户名.github.io/erp-prototype/00-首页仪表盘.html`

---

## ✅ 方案二：Vercel 部署（更简单，推荐新手）

### 步骤 1：访问 Vercel
打开 https://vercel.com

### 步骤 2：导入 GitHub 仓库
1. 点击 "Add New Project"
2. 选择 "Import Git Repository"
3. 选择刚才创建的 `erp-prototype` 仓库
4. 点击 "Deploy"

### 步骤 3：获取访问链接
部署完成后会自动生成链接，格式：
`https://erp-prototype.vercel.app/00-首页仪表盘.html`

---

## ✅ 方案三：Netlify Drop（最简单，无需注册）

### 步骤 1：压缩文件
1. 选中 `进销存页面` 文件夹内的所有 24 个 HTML 文件
2. 右键 → 发送到 → 压缩 (zipped) 文件夹
3. 生成 `进销存页面.zip`

### 步骤 2：拖拽部署
1. 访问 https://app.netlify.com/drop
2. 将 zip 文件拖到页面上
3. 等待上传完成（约 30 秒）

### 步骤 3：获取链接
自动生成随机链接，格式：
`https://random-name-12345.netlify.app/00-首页仪表盘.html`

**优点**：无需注册，30 秒上线
**缺点**：链接是随机的，不适合长期使用

---

## ✅ 方案四：本地临时分享（快速测试）

### 使用 Python 快速启动服务器
```bash
# 进入页面目录
cd D:\Wukong\work\进销存页面

# 启动 HTTP 服务器（Python 3）
py -m http.server 8000
```

然后在浏览器访问：`http://localhost:8000/00-首页仪表盘.html`

**注意**：这只适合本地测试，外网无法访问。

---

## 🔗 分享链接示例

部署成功后，你可以分享以下链接给同事：

### 首页仪表盘
```
https://你的用户名.github.io/erp-prototype/00-首页仪表盘.html
```

### 采购模块
- 供应商管理：`.../01-供应商管理.html`
- 采购申请：`.../02-采购申请.html`
- 采购订单：`.../03-采购订单.html`
- 采购入库：`.../04-采购入库.html`

### 销售模块
- 客户管理：`.../06-客户管理.html`
- 销售订单：`.../08-销售订单.html`
- 销售出库：`.../09-销售出库.html`
- 销售退货：`.../10-销售退货.html`

### 库存模块
- 商品管理：`.../11-商品管理.html`
- 库存预警：`.../15-库存预警.html`

---

## 💡 最佳实践建议

### 1. 使用 GitHub Pages + Vercel 双备份
- GitHub Pages 作为主链接
- Vercel 作为备用链接

### 2. 创建导航索引页
我已经为你创建了 `index.html` 作为入口页面（见下方）

### 3. 添加访问说明
在分享链接时，附上简单的使用说明：
```
📋 进销存系统原型访问说明

访问地址：https://xxx.github.io/erp-prototype/
建议使用：Chrome / Edge 浏览器
注意事项：首次加载可能需要 5-10 秒

主要功能：
✅ 左侧导航栏可点击切换页面
✅ 所有按钮和表单都可交互
✅ 数据为演示数据，刷新后重置
```

---

## 📱 移动端适配提醒

当前页面为 PC 端设计，如需在手机/平板上查看：
1. 浏览器会自动缩放适配
2. 建议横屏观看以获得更好体验
3. 后续可单独开发移动端版本

---

## ❓ 常见问题

### Q: 页面显示空白或样式错乱？
A: 检查文件名是否包含中文字符，确保所有 HTML 文件的编码为 UTF-8

### Q: 图片无法显示？
A: 确保图片文件和 HTML 在同一相对路径下

### Q: 链接打不开？
A: 
- 检查仓库是否为 Public（公开）
- 等待 2-3 分钟让 GitHub Pages 生效
- 清除浏览器缓存后重试

### Q: 如何更新页面内容？
A:
```bash
# 修改文件后执行
git add .
git commit -m "更新说明"
git push
```
等待 1-2 分钟自动更新

---

## 📞 需要帮助？

如果在部署过程中遇到问题，可以：
1. 查看 GitHub Pages 官方文档：https://pages.github.com/
2. 查看 Vercel 文档：https://vercel.com/docs
3. 或直接联系我协助部署

---

**创建时间**：2026-04-09
**适用项目**：进销存管理系统原型
