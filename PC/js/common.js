/**
 * 进销存系统 - 公共JS组件
 */

// ===== 导航配置 =====
const NAV_CONFIG = [
    {
        id: 'home',
        name: '首页仪表盘',
        icon: '🏠',
        file: '00-首页仪表盘.html',
        group: null
    },
    {
        group: '采购部',
        groupIcon: '🛒',
        items: [
            { id: 'purchase-dashboard', name: '采购仪表盘', icon: '📊', file: '21-采购仪表盘.html' },
            { id: 'supplier', name: '供应商管理', icon: '📋', file: '01-供应商管理.html' },
            { id: 'purchase-request', name: '采购申请', icon: '📝', file: '02-采购申请.html' },
            { id: 'purchase-order', name: '采购订单', icon: '📄', file: '03-采购订单.html' },
            { id: 'purchase-inbound', name: '采购入库', icon: '📥', file: '04-采购入库.html' },
            { id: 'purchase-return', name: '采购退货', icon: '🔄', file: '22-采购退货.html' }
        ]
    },
    {
        group: '销售部',
        groupIcon: '💼',
        items: [
            { id: 'sales-dashboard', name: '销售报表', icon: '📊', file: '23-销售报表.html' },
            { id: 'customer', name: '客户管理', icon: '👥', file: '06-客户管理.html' },
            { id: 'sales-quote', name: '销售报价', icon: '💰', file: '07-销售报价.html' },
            { id: 'sales-order', name: '销售订单', icon: '📋', file: '08-销售订单.html' },
            { id: 'sales-outbound', name: '销售出库', icon: '📤', file: '09-销售出库.html' },
            { id: 'sales-return', name: '销售退货', icon: '🔄', file: '10-销售退货.html' },
            { id: 'complaint', name: '客诉单', icon: '📝', file: '24-客诉单.html' }
        ]
    },
    {
        group: '库存信息',
        groupIcon: '📦',
        items: [
            { id: 'product', name: '商品管理', icon: '📦', file: '11-商品管理.html' },
            { id: 'inbound', name: '其他入库', icon: '📥', file: '12-入库管理.html' },
            { id: 'outbound', name: '其他出库', icon: '📤', file: '13-出库管理.html' },
            { id: 'inventory-check', name: '库存盘点', icon: '🔍', file: '14-库存盘点.html' },
            { id: 'stock-detail', name: '出入库明细', icon: '📋', file: '20-出入库明细.html' }
        ]
    },
    {
        group: '财务部',
        groupIcon: '💰',
        items: [
            { id: 'receivable', name: '应收账款', icon: '💵', file: '16-应收账款.html' },
            { id: 'payable', name: '应付账款', icon: '💳', file: '17-应付账款.html' },
            { id: 'purchase-invoice', name: '采购发票', icon: '📄', file: '25-采购发票.html' },
            { id: 'sales-invoice', name: '销售发票', icon: '🧾', file: '26-销售发票.html' },
            { id: 'finance-report', name: '财务报表', icon: '📈', file: '18-财务报表.html' },
            { id: 'cost-calc', name: '成本核算', icon: '🧮', file: '19-成本核算.html' }
        ]
    }
];

// ===== 获取当前页面ID =====
function getCurrentPageId() {
    const path = window.location.pathname;
    // 兼容 Windows 本地文件路径 (file:///C:/...) 和 Web 服务器路径
    let filename = path.split('/').pop() || path.split('\\').pop();
    // 解码 URL 编码（处理中文文件名）
    filename = decodeURIComponent(filename);
    
    for (const nav of NAV_CONFIG) {
        if (nav.file === filename) return nav.id;
        if (nav.items) {
            for (const item of nav.items) {
                if (item.file === filename) return item.id;
            }
        }
    }
    return null;
}

// ===== 获取面包屑信息 =====
function getBreadcrumb(pageId) {
    for (const nav of NAV_CONFIG) {
        if (nav.id === pageId) {
            return { title: nav.name, group: null };
        }
        if (nav.items) {
            for (const item of nav.items) {
                if (item.id === pageId) {
                    return { title: item.name, group: nav.group };
                }
            }
        }
    }
    return { title: '未知页面', group: null };
}

// ===== 渲染侧边栏 =====
function renderSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;
    
    const currentPageId = getCurrentPageId();
    
    let html = `
        <div class="sidebar-header">
            <div class="sidebar-logo">📊</div>
            <div class="sidebar-title">进销存系统</div>
            <a href="../mobile/m-00-首页仪表盘.html" class="switch-view-btn" title="切换到移动端">📱</a>
        </div>
        <nav class="nav-menu">
    `;
    
    for (const nav of NAV_CONFIG) {
        // 首页（无分组）
        if (!nav.group) {
            const isActive = nav.id === currentPageId ? ' active' : '';
            html += `
                <div class="nav-item${isActive}" data-page="${nav.file}">
                    <span class="nav-icon">${nav.icon}</span>
                    ${nav.name}
                </div>
            `;
        } 
        // 分组菜单
        else {
            // 检查当前页面是否在此分组
            let groupHasActive = false;
            if (nav.items) {
                groupHasActive = nav.items.some(item => item.id === currentPageId);
            }
            
            html += `
                <div class="nav-group${groupHasActive ? '' : ' collapsed'}">
                    <div class="nav-group-header">
                        ${nav.groupIcon} ${nav.group}
                        <span class="arrow">▼</span>
                    </div>
            `;
            
            if (nav.items) {
                for (const item of nav.items) {
                    const isActive = item.id === currentPageId ? ' active' : '';
                    html += `
                        <div class="nav-item${isActive}" data-page="${item.file}">
                            <span class="nav-icon">${item.icon}</span>
                            ${item.name}
                        </div>
                    `;
                }
            }
            
            html += `</div>`;
        }
    }
    
    html += `</nav>`;
    sidebar.innerHTML = html;
    
    // 绑定导航点击事件
    sidebar.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            if (page) {
                window.location.href = page;
            }
        });
    });
    
    // 绑定分组折叠事件
    sidebar.querySelectorAll('.nav-group-header').forEach(header => {
        header.addEventListener('click', function() {
            this.parentElement.classList.toggle('collapsed');
        });
    });
}

// ===== 渲染面包屑 =====
function renderBreadcrumb() {
    const breadcrumb = document.querySelector('.breadcrumb');
    if (!breadcrumb) return;
    
    const pageId = getCurrentPageId();
    const info = getBreadcrumb(pageId);
    
    let html = `<a href="00-首页仪表盘.html" style="color: inherit; text-decoration: none;">首页</a>`;
    
    if (info.group) {
        html += `<span class="breadcrumb-separator">/</span>${info.group}`;
    }
    
    html += `<span class="breadcrumb-separator">/</span>${info.title}`;
    
    breadcrumb.innerHTML = html;
}

// ===== 弹窗功能 =====
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// 初始化弹窗点击背景关闭
function initModals() {
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // ESC键关闭弹窗
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(modal => {
                modal.classList.remove('active');
            });
            document.body.style.overflow = '';
        }
    });
}

// ===== 刷新功能 =====
function refreshPage() {
    location.reload();
}

// ===== 导出功能（示例） =====
function exportData(format = 'excel') {
    alert(`导出功能开发中...\n格式: ${format}`);
}

// ===== 打印功能 =====
function printPage() {
    window.print();
}

// ===== 表格行添加 =====
function addTableRow(tableSelector, rowTemplate) {
    const tbody = document.querySelector(`${tableSelector} tbody`);
    if (tbody) {
        const tr = document.createElement('tr');
        tr.innerHTML = rowTemplate;
        tbody.appendChild(tr);
    }
}

// ===== 表格行删除 =====
function deleteTableRow(btn) {
    const tr = btn.closest('tr');
    if (tr) {
        tr.remove();
    }
}

// ===== 全选/取消全选 =====
function toggleSelectAll(checkbox, tableSelector) {
    const checkboxes = document.querySelectorAll(`${tableSelector} tbody input[type="checkbox"]`);
    checkboxes.forEach(cb => {
        cb.checked = checkbox.checked;
    });
}

// ===== 页面初始化 =====
function initPage() {
    renderSidebar();
    renderBreadcrumb();
    initModals();
    
    // 绑定全局按钮功能
    document.querySelectorAll('[data-action="refresh"]').forEach(btn => {
        btn.addEventListener('click', refreshPage);
    });
    
    document.querySelectorAll('[data-action="export"]').forEach(btn => {
        btn.addEventListener('click', () => exportData('excel'));
    });
    
    document.querySelectorAll('[data-action="print"]').forEach(btn => {
        btn.addEventListener('click', printPage);
    });
    
    document.querySelectorAll('[data-action="open-modal"]').forEach(btn => {
        btn.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            if (modalId) openModal(modalId);
        });
    });
    
    document.querySelectorAll('[data-action="close-modal"]').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal-overlay');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
}

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', initPage);
