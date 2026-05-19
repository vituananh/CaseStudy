// Các hàm gọi API được đặt trong thư mục này
// Ví dụ: authService.js, roomService.js, userService.js

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export default API_BASE;
