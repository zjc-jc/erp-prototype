@echo off
chcp 65001 >nul
echo ================================================================
echo           进销存系统原型 - GitHub Pages 快速部署脚本
echo ================================================================
echo.

REM 检查 Git 是否安装
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ 错误：未检测到 Git
    echo.
    echo 请先安装 Git: https://git-scm.com/download/win
    echo 安装完成后重新运行此脚本
    pause
    exit /b 1
)

echo ✅ Git 已安装
echo.

REM 检查是否已初始化
if not exist ".git" (
    echo 📦 初始化 Git 仓库...
    git init
    echo.
    
    echo 📝 添加所有文件...
    git add .
    echo.
    
    echo 💾 提交文件...
    git commit -m "初始版本 - 进销存系统原型"
    echo.
    
    echo ================================================================
    echo ✅ Git 仓库初始化完成！
    echo ================================================================
    echo.
    echo 下一步操作：
    echo 1. 访问 https://github.com 并登录你的账号
    echo 2. 点击右上角 "+" → "New repository"
    echo 3. 输入仓库名（例如：erp-prototype）
    echo 4. 选择 Public（公开）
    echo 5. 不要勾选 "Initialize this repository with a README"
    echo 6. 点击 "Create repository"
    echo.
    echo 创建完成后，在 GitHub 仓库页面复制以下命令并运行：
    echo.
    echo    git remote add origin https://github.com/你的用户名/仓库名.git
    echo    git branch -M main
    echo    git push -u origin main
    echo.
) else (
    echo ✅ Git 仓库已存在
    echo.
    
    REM 检查是否有远程仓库
    git remote -v >nul 2>nul
    if %ERRORLEVEL% NEQ 0 (
        echo ⚠️  未配置远程仓库
        echo.
        echo 请先在 GitHub 创建仓库，然后运行：
        echo    git remote add origin https://github.com/你的用户名/仓库名.git
        echo.
    ) else (
        echo 🔄 检测更改...
        git status
        echo.
        
        echo 📝 添加更改...
        git add .
        echo.
        
        set /p commit_msg="请输入提交说明（默认：更新页面内容）: "
        if "%commit_msg%"=="" set commit_msg=更新页面内容
        
        git commit -m "%commit_msg%"
        echo.
        
        echo 🚀 推送到 GitHub...
        git push
        echo.
        
        echo ================================================================
        echo ✅ 推送成功！
        echo ================================================================
        echo.
        echo 你的页面将在 1-2 分钟后生效
        echo 访问地址：https://你的用户名.github.io/仓库名/index.html
        echo.
    )
)

echo 💡 提示：
echo    - 查看部署指南：README_部署指南.md
echo    - 入口页面：index.html
echo.
pause
