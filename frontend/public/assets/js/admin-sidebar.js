/**
 * admin-sidebar.js
 * Dynamically renders the shared admin sidebar.
 * Include with the correct relative path per nesting level:
 *   - admin root pages  (e.g. Dashboard.html)     → ../../assets/js/admin-sidebar.js
 *   - admin sub-pages   (e.g. Quanlytindang/*.html) → ../../../assets/js/admin-sidebar.js
 */
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;

    // inSubfolder = true when the page is inside admin/<SubFolder>/<Page>.html
    const inSubfolder = /\/admin\/[^/]+\/[^/]+\.html/.test(path);

    // adminBase = relative path prefix that points to the admin/ root directory
    // from admin/SubFolder/Page.html  →  '../'
    // from admin/Page.html            →  ''  (same dir)
    const adminBase = inSubfolder ? '../' : '';

    const isActive = (key) => path.includes(key);

    const navItems = [
        { key: 'Dashboard',       icon: 'dashboard',   label: 'Tổng quan',          href: `${adminBase}Dashboard.html` },
        { key: 'Quanlynguoidung', icon: 'group',        label: 'Quản lý người dùng', href: `${adminBase}Quanlynguoidung/Quanlynguoidung.html` },
        { key: 'Quanlytindang',   icon: 'description',  label: 'Quản lý tin đăng',   href: `${adminBase}Quanlytindang/Quanlytindang.html` },
        { key: 'Duyetbai',        icon: 'fact_check',   label: 'Duyệt bài',          href: `${adminBase}Duyetbai.html` },
        { key: 'Phantichdulieu',  icon: 'insights',     label: 'Phân tích dữ liệu',  href: `${adminBase}Phantichdulieu.html` },
        { key: 'Caidat',          icon: 'settings',     label: 'Cài đặt',            href: `${adminBase}Caidat.html` },
    ];

    const sidebarHTML = `
    <aside class="h-screen w-64 fixed left-0 top-0 bg-white border-r border-outline-variant flex flex-col z-50 shadow-sm">
        <!-- Brand -->
        <div class="px-5 py-4 border-b border-outline-variant flex items-center gap-3">
            <div class="w-8 h-8 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                <span class="material-symbols-outlined text-white text-[18px]">nest_multi_room</span>
            </div>
            <span class="font-black text-primary tracking-tight text-lg leading-none">UrbanNest</span>
            <span class="ml-auto text-[9px] font-bold uppercase bg-secondary-container text-primary px-2 py-0.5 rounded-full tracking-wider">Admin</span>
        </div>
        <!-- Profile -->
        <div class="flex items-center gap-3 px-4 py-3 border-b border-outline-variant/50 bg-surface-container-low/40">
            <div class="w-9 h-9 rounded-xl overflow-hidden ring-2 ring-primary/15 flex-shrink-0">
                <img alt="Admin" class="w-full h-full object-cover"
                     src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTTJYw52tysZ0-Jm7PBYw5dDfDPNL_mLJKAvH-EuCxEJjD5rDulqSNfe41SeaJ689dYASLDl6e7Q849Pe1jfKvSfBMBeioRYQ9p64Mh37Jl1SIi-A7yFtTF4JbZd9Dx8glFrcZcYzZZWNdjC98yY107hszjmXYNAwMXhTYiHHk1jGl5cW0bbBovzoDZaVA94iLOtnR9-mBoUlZZl9kWqBA1cGPQEcMbJ0BxnFWK3P2B0I5hh7gmkESLp--9t2cwIv7M2CijqHCdws">
            </div>
            <div class="flex flex-col min-w-0">
                <span class="font-semibold text-xs text-primary truncate">Nguyễn Văn Admin</span>
                <span class="text-[10px] text-on-surface-variant">Quản trị viên hệ thống</span>
            </div>
        </div>
        <!-- Navigation -->
        <nav class="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
            ${navItems.map(item => {
                const active = isActive(item.key);
                return `
                <a href="${item.href}"
                   class="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
                          ${active
                            ? 'bg-secondary-container text-primary font-semibold'
                            : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'}">
                    <span class="material-symbols-outlined text-[20px] transition-transform duration-200 group-hover:scale-110"
                          style="${active ? "font-variation-settings:'FILL' 1;" : ''}">
                        ${item.icon}
                    </span>
                    <span class="font-label-md text-label-md flex-1">${item.label}</span>
                    ${active ? '<span class="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>' : ''}
                </a>`;
            }).join('')}
        </nav>
        <!-- Footer -->
        <div class="px-3 py-3 border-t border-outline-variant space-y-0.5">
            <a href="#" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-primary transition-all group">
                <span class="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">help</span>
                <span class="font-label-md text-label-md">Hỗ trợ</span>
            </a>
            <button id="admin-logout-btn"
                    class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 transition-all group text-left">
                <span class="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">logout</span>
                <span class="font-label-md text-label-md">Đăng xuất</span>
            </button>
        </div>
    </aside>`;

    document.body.insertAdjacentHTML('afterbegin', sidebarHTML);

    // Logout handler
    document.getElementById('admin-logout-btn')?.addEventListener('click', () => {
        localStorage.removeItem('isLoggedIn');
        window.location.href = `${adminBase}../user/Dangnhap.html`;
    });
});
