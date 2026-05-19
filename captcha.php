<?php
session_start();

// Tạo chuỗi mã ngẫu nhiên gồm 5 ký tự
$permitted_chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
$captcha_string = '';
for ($i = 0; $i < 5; $i++) {
    $captcha_string .= $permitted_chars[rand(0, strlen($permitted_chars) - 1)];
}

// Lưu vào session để đối chiếu lúc submit form
$_SESSION['captcha'] = $captcha_string;

// Tạo background image cho captcha
$image = imagecreatetruecolor(120, 40);
$background_color = imagecolorallocate($image, 230, 230, 230);
imagefill($image, 0, 0, $background_color);

// Thêm các đường nhiễu tránh bot đọc
for ($i = 0; $i < 4; $i++) {
    $line_color = imagecolorallocate($image, rand(100, 200), rand(100, 200), rand(100, 200));
    imageline($image, rand(0, 120), rand(0, 40), rand(0, 120), rand(0, 40), $line_color);
}

// Ghi text captcha lên ảnh
$text_color = imagecolorallocate($image, rand(0, 100), rand(0, 100), rand(0, 100));
// Lưu ý: Sử dụng font mặc định tích hợp sẵn trong PHP (builtin font cỡ 5)
imagestring($image, 5, 35, 12, $captcha_string, $text_color);

// Xuất ảnh ra trình duyệt
header('Content-type: image/png');
imagepng($image);
imagedestroy($image);
?>
