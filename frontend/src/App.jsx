import React, { useState, useEffect } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState('trangchu');
  const [htmlContent, setHtmlContent] = useState('');

  const PAGES = {
    trangchu: { file: 'pages/user/Trangchu.html', title: 'Trang chủ - UrbanNest' },
    dangtin: { file: 'pages/user/Dangtin.html', title: 'Tin đăng - UrbanNest' },
    dangnhap: { file: 'pages/user/Dangnhap.html', title: 'Đăng nhập - UrbanNest' },
    dangky: { file: 'pages/user/Dangky.html', title: 'Đăng ký - UrbanNest' },
    chitietphong: { file: 'pages/user/Chitietphong.html', title: 'Chi tiết phòng - UrbanNest' },
    
    // User profile pages
    tongquan: { file: 'pages/user/canhan/Tongquan.html', title: 'Tổng quan - UrbanNest' },
    tindang_user: { file: 'pages/user/canhan/Tindang.html', title: 'Tin đăng của tôi - UrbanNest' },
    tinnhan_user: { file: 'pages/user/canhan/Tinnhan.html', title: 'Tin nhắn - UrbanNest' },
    lichxem_user: { file: 'pages/user/canhan/Lichxem.html', title: 'Lịch xem phòng - UrbanNest' },
    caidat_user: { file: 'pages/user/canhan/Caidat.html', title: 'Cài đặt - UrbanNest' },

    // Admin pages
    dashboard_admin: { file: 'pages/admin/Dashboard.html', title: 'Admin Dashboard - UrbanNest' },
    quanlytindang_admin: { file: 'pages/admin/Quanlytindang.html', title: 'Quản lý tin đăng - UrbanNest' },
    quanlynguoidung_admin: { file: 'pages/admin/Quanlynguoidung.html', title: 'Quản lý người dùng - UrbanNest' },
    duyetbai_admin: { file: 'pages/admin/Duyetbai.html', title: 'Duyệt bài - UrbanNest' },
    phantichdulieu_admin: { file: 'pages/admin/Phantichdulieu.html', title: 'Phân tích dữ liệu - UrbanNest' },
    caidat_admin: { file: 'pages/admin/Caidat.html', title: 'Cài đặt hệ thống - UrbanNest' },
  };

  // Các trang không hiển thị Header/Footer
  const noFramePages = ['dangnhap', 'dangky'];
  const showFrame = !noFramePages.includes(currentPage);

  useEffect(() => {
    async function loadPage() {
      const page = PAGES[currentPage];
      if (!page) return;

      document.title = page.title;
      try {
        const response = await fetch(page.file);
        const html = await response.text();
        
        // Trích xuất nội dung cần thiết
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Tìm container chính (có thể chứa cả sidebar) hoặc thẻ main
        const wrapper = doc.querySelector('.flex.flex-1') || doc.querySelector('main');
        
        if (wrapper) {
            setHtmlContent(wrapper.innerHTML);
        } else {
            setHtmlContent(doc.body.innerHTML);
        }
        
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Lỗi khi tải trang:", error);
        setHtmlContent('<h2>Không thể tải nội dung trang.</h2>');
      }
    }
    loadPage();
  }, [currentPage]);

  // Hàm chuyển trang
  const navigateTo = (pageKey) => {
    setCurrentPage(pageKey);
  };

  return (
    <div className="App min-h-screen flex flex-col">
      {/* GLOBAL HEADER */}
      {showFrame && (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-outline-variant h-20">
          <div className="flex justify-between items-center w-full px-margin-desktop max-w-container-max mx-auto h-full">
            <div className="flex items-center gap-12">
              <a onClick={() => navigateTo('trangchu')} className="text-title-lg font-display font-black tracking-tight text-primary cursor-pointer">UrbanNest</a>
              <nav className="hidden md:flex items-center gap-8">
                <a onClick={() => navigateTo('trangchu')} className={`cursor-pointer py-1 text-body-md transition-colors ${currentPage === 'trangchu' ? 'text-primary font-bold border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary font-medium'}`}>Trang chủ</a>
                <a onClick={() => navigateTo('dangtin')} className={`cursor-pointer py-1 text-body-md transition-colors ${currentPage === 'dangtin' ? 'text-primary font-bold border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary font-medium'}`}>Tin đăng</a>
                <a className="text-on-surface-variant hover:text-primary transition-colors text-body-md font-medium cursor-pointer">Blog</a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => navigateTo('dangnhap')} className="hidden sm:flex text-on-surface-variant hover:text-primary font-title-md px-4 py-2 transition-all">Đăng nhập</button>
              <button onClick={() => navigateTo('dangtin')} className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-title-md hover:bg-primary/90 active:scale-95 transition-all shadow-md">Đăng tin</button>
            </div>
          </div>
        </header>
      )}

      {/* DYNAMIC CONTENT AREA */}
      <div 
        className={`${showFrame ? "pt-20 flex-grow" : "flex-grow"} ${['trangchu', 'dangtin'].includes(currentPage) ? 'scale-90 origin-top transition-transform duration-500' : ''}`}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        onClick={(e) => {
          // Bắt sự kiện click vào các phần tử có data-page trong nội dung HTML được inject
          const target = e.target.closest('[data-page]');
          if (target) {
            e.preventDefault();
            navigateTo(target.dataset.page);
          }
        }}
      />

      {/* GLOBAL FOOTER */}
      {showFrame && (
        <footer className="bg-white border-t border-outline-variant mt-20">
          <div className="w-full py-20 px-margin-desktop flex flex-col items-center gap-12 max-w-container-max mx-auto">
            <div className="w-full flex flex-col md:flex-row justify-between items-start gap-16">
              <div className="max-w-sm">
                <h2 className="font-display text-headline-lg text-primary mb-6">UrbanNest</h2>
                <p className="text-on-surface-variant font-medium text-body-md leading-relaxed">Cung cấp giải pháp tìm kiếm bất động sản và phòng trọ chuyên nghiệp, minh bạch và hiệu quả nhất tại thành phố Vinh.</p>
              </div>
            </div>
            <div className="w-full h-px bg-outline-variant"></div>
            <p className="text-on-surface-variant font-medium text-body-sm text-center">© 2024 UrbanNest. Nền tảng tìm kiếm phòng trọ hàng đầu tại Vinh.</p>
          </div>
        </footer>
      )}

    </div>
  );
}

export default App;
