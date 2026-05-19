document.addEventListener('DOMContentLoaded', () => {
    // Determine nesting level (subfolder vs root user pages)
    const isSubfolder = window.location.pathname.includes('/canhan/');
    const userPath = isSubfolder ? '../' : '';
    const canhanPath = isSubfolder ? '' : 'canhan/';

    // Target the authentication section in the header
    const authGroup = document.getElementById('header-auth-group');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (authGroup) {
        if (isLoggedIn) {
            // Render the User Profile Avatar Circle and Dropdown Menu
            authGroup.innerHTML = `
                <div class="relative inline-block text-left" id="user-menu-container">
                    <button id="user-menu-btn" class="flex items-center focus:outline-none transition-all active:scale-95 hover:opacity-90">
                        <img class="w-10 h-10 rounded-full object-cover border-2 border-primary/20 hover:border-primary shadow-md" 
                             src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_oesoV75mZN1cAjthWegrdxS4fA8wgGMcN5Yu2b_YLRWrUldOkYeBUuZSlXncK6jZF5oh0OLorOecM_ooR-IAy7QXCBwlg-ZyTyCR9jwrDFiR5QZ5QZEHzIpXTGhQzVzIPJ_IiQLvnwJ8F4MPtw36PIeQ5nD4qFrEg9buLuvEWXUq20nmGGPnGJFjqYkJKSwUbWBp1ByjKU7PMpvYbcPfXBazo41Mlr8Dl_9dOenwjXkPHr_Um79qfmnVkua33-v58KVXpSsmGKg" 
                             alt="User Avatar">
                    </button>
                    
                    <!-- Dropdown Menu -->
                    <div id="user-menu-dropdown" class="hidden absolute right-0 mt-3 w-56 rounded-2xl bg-white border border-outline-variant shadow-xl py-2 z-[999] transform origin-top-right transition-all duration-200">
                        <div class="px-4 py-3 border-b border-outline-variant/60">
                            <p class="font-title-md text-primary font-bold text-sm text-left">Nguyễn Minh Quân</p>
                            <p class="font-body-sm text-on-surface-variant truncate text-xs text-left">quan.nguyen@example.com</p>
                        </div>
                        <div class="py-1">
                            <a href="${userPath}${canhanPath}Tongquan.html" class="flex items-center gap-3 px-4 py-2.5 font-medium text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors text-sm">
                                <span class="material-symbols-outlined text-[18px]">dashboard</span>
                                <span class="font-label-md text-label-md">Tổng quan</span>
                            </a>
                            <a href="${userPath}${canhanPath}Tindang.html" class="flex items-center gap-3 px-4 py-2.5 font-medium text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors text-sm">
                                <span class="material-symbols-outlined text-[18px]">description</span>
                                <span class="font-label-md text-label-md">Tin đăng của tôi</span>
                            </a>
                            <a href="${userPath}${canhanPath}Tinnhan.html" class="flex items-center gap-3 px-4 py-2.5 font-medium text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors text-sm">
                                <span class="material-symbols-outlined text-[18px]">mail</span>
                                <span class="font-label-md text-label-md">Tin nhắn</span>
                            </a>
                            <a href="${userPath}${canhanPath}Lichxem.html" class="flex items-center gap-3 px-4 py-2.5 font-medium text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors text-sm">
                                <span class="material-symbols-outlined text-[18px]">event</span>
                                <span class="font-label-md text-label-md">Lịch xem phòng</span>
                            </a>
                            <a href="${userPath}${canhanPath}Caidat.html" class="flex items-center gap-3 px-4 py-2.5 font-medium text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors text-sm">
                                <span class="material-symbols-outlined text-[18px]">settings</span>
                                <span class="font-label-md text-label-md">Cài đặt</span>
                            </a>
                        </div>
                        <div class="border-t border-outline-variant/60 pt-1 mt-1">
                            <button id="dropdown-logout-btn" class="w-full flex items-center gap-3 px-4 py-2.5 font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors text-left text-sm">
                                <span class="material-symbols-outlined text-[18px]">logout</span>
                                <span class="font-label-md text-label-md">Đăng xuất</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;

            // Dropdown Toggle Logic
            const userMenuBtn = document.getElementById('user-menu-btn');
            const userMenuDropdown = document.getElementById('user-menu-dropdown');

            if (userMenuBtn && userMenuDropdown) {
                userMenuBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    userMenuDropdown.classList.toggle('hidden');
                });

                document.addEventListener('click', (e) => {
                    if (!userMenuDropdown.contains(e.target) && e.target !== userMenuBtn) {
                        userMenuDropdown.classList.add('hidden');
                    }
                });
            }

            // Bind Dropdown Logout Button
            const dropdownLogoutBtn = document.getElementById('dropdown-logout-btn');
            if (dropdownLogoutBtn) {
                dropdownLogoutBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    localStorage.removeItem('isLoggedIn');
                    window.location.href = `${userPath}Trangchu.html`;
                });
            }
        }
    }

    // Intercept Login Form submission (Simulate login success)
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            localStorage.setItem('isLoggedIn', 'true');
            // Redirect to home page
            window.location.href = 'Trangchu.html';
        });
    }

    // Intercept Register Form submission (Simulate register success)
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            localStorage.setItem('isLoggedIn', 'true');
            // Redirect to home page
            window.location.href = 'Trangchu.html';
        });
    }

    // Handle all other native sidebar "Đăng xuất" links on the dashboard
    document.querySelectorAll('a, button').forEach(el => {
        if (el.textContent.trim() === 'Đăng xuất') {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('isLoggedIn');
                window.location.href = `${userPath}Trangchu.html`;
            });
        }
    });
});
