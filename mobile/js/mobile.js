/**
 * 移动端进销存系统 - 公共JS
 */

// ===== 底部导航配置 =====
const BOTTOM_NAV = [
    { id: 'home', name: '首页', icon: '🏠', file: 'm-00-首页仪表盘.html' },
    { id: 'purchase', name: '采购', icon: '🛒', file: 'm-03-采购订单.html' },
    { id: 'sales', name: '销售', icon: '💼', file: 'm-08-销售订单.html' },
    { id: 'stock', name: '库存', icon: '📦', file: 'm-11-商品管理.html' },
    { id: 'mine', name: '我的', icon: '👤', file: 'm-99-我的.html' }
];

// ===== 获取当前页面ID =====
function getCurrentPageId() {
    const path = window.location.pathname;
    let filename = path.split('/').pop() || path.split('\\').pop();
    filename = decodeURIComponent(filename);
    
    for (const nav of BOTTOM_NAV) {
        if (nav.file === filename) return nav.id;
    }
    return null;
}

// ===== 渲染底部导航 =====
function renderBottomNav() {
    const nav = document.querySelector('.bottom-nav');
    if (!nav) return;
    
    const currentPageId = getCurrentPageId();
    
    let html = '';
    for (const item of BOTTOM_NAV) {
        const isActive = item.id === currentPageId ? ' active' : '';
        html += `
            <a href="${item.file}" class="nav-item${isActive}">
                <span class="nav-icon">${item.icon}</span>
                <span class="nav-label">${item.name}</span>
            </a>
        `;
    }
    
    nav.innerHTML = html;
}

// ===== 打开弹窗 =====
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// ===== 关闭弹窗 =====
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ===== 初始化弹窗 =====
function initModals() {
    // 点击遮罩关闭
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // 关闭按钮
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal-overlay');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
}

// ===== 下拉刷新 =====
function initPullRefresh() {
    let startY = 0;
    let isPulling = false;
    const threshold = 80;
    
    document.addEventListener('touchstart', function(e) {
        if (window.scrollY === 0) {
            startY = e.touches[0].clientY;
            isPulling = true;
        }
    });
    
    document.addEventListener('touchmove', function(e) {
        if (!isPulling) return;
        
        const currentY = e.touches[0].clientY;
        const diff = currentY - startY;
        
        if (diff > threshold) {
            // 显示刷新提示
        }
    });
    
    document.addEventListener('touchend', function(e) {
        if (isPulling) {
            isPulling = false;
        }
    });
}

// ===== Toast提示 =====
function showToast(message, duration = 2000) {
    // 移除已存在的toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0,0,0,0.75);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 9999;
        animation: fadeIn 0.2s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// ===== 确认对话框 =====
function showConfirm(message, onConfirm) {
    const overlay = document.createElement('div');
    overlay.className = 'confirm-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    `;
    
    overlay.innerHTML = `
        <div style="background: white; border-radius: 12px; width: 280px; overflow: hidden;">
            <div style="padding: 24px 20px; text-align: center;">
                <p style="font-size: 16px; color: #333;">${message}</p>
            </div>
            <div style="display: flex; border-top: 1px solid #f0f0f0;">
                <button class="confirm-cancel" style="flex: 1; padding: 14px; border: none; background: white; font-size: 16px; color: #666; cursor: pointer;">取消</button>
                <button class="confirm-ok" style="flex: 1; padding: 14px; border: none; background: #667eea; font-size: 16px; color: white; cursor: pointer;">确定</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    
    overlay.querySelector('.confirm-cancel').onclick = () => {
        overlay.remove();
        document.body.style.overflow = '';
    };
    
    overlay.querySelector('.confirm-ok').onclick = () => {
        overlay.remove();
        document.body.style.overflow = '';
        if (onConfirm) onConfirm();
    };
    
    overlay.onclick = (e) => {
        if (e.target === overlay) {
            overlay.remove();
            document.body.style.overflow = '';
        }
    };
}

// ===== 页面初始化 =====
function initPage() {
    renderBottomNav();
    initModals();
    initPullRefresh();
    
    // 返回按钮
    document.querySelectorAll('.back-btn').forEach(btn => {
        btn.addEventListener('click', () => history.back());
    });
}

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', initPage);
