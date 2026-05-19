// Các hàm tiện ích (helper functions) được đặt trong thư mục này

/**
 * Định dạng giá tiền theo VNĐ
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

/**
 * Rút gọn chuỗi văn bản
 */
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};
