<?php
require_once 'db.php';

$errors = [];
$success = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name']);
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    $phone = trim($_POST['phone']);
    $captcha = trim($_POST['captcha']);

    // --- RÀNG BUỘC DỮ LIỆU (VALIDATION) ---
    if (empty($name) || empty($username) || empty($email) || empty( $password ) || empty($captcha)) {
        $errors[] = "Vui lòng điền đầy đủ các trường bắt buộc (*).";
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Định dạng Email không hợp lệ.";
    }
    if (strlen($password) < 6) {
        $errors[] = "Mật khẩu phải có ít nhất 6 ký tự.";
    }
    if (strtoupper($captcha) !== $_SESSION['captcha']) {
        $errors[] = "Mã Captcha không chính xác.";
    }

    // Nếu không có lỗi form, kiểm tra tính trùng lặp trong DB
    if (empty($errors)) {
        // Kiểm tra username hoặc email đã tồn tại chưa
        $stmt = $conn->prepare("SELECT ID FROM user WHERE Username = ? OR Email = ?");
        $stmt->execute([$username, $email]);
        if ($stmt->rowCount() > 0) {
            $errors[] = "Tên đăng nhập hoặc Email đã được sử dụng.";
        } else {
            // Thực hiện thêm tài khoản mới (Mật khẩu nên được hash bằng password_hash() để bảo mật)
            // Tuy nhiên dựa theo DB mẫu đang lưu text thuần, ở đây sẽ lưu trực tiếp:
            $stmt = $conn->prepare("INSERT INTO user (Name, Username, Email, Password, Role, Phone) VALUES (?, ?, ?, ?, 0, ?)");
            if ($stmt->execute([$name, $username, $email, $password, $phone])) {
                $success = "Đăng ký tài khoản thành công! Đang chuyển hướng...";
                // Điều hướng sau 2 giây
                header("refresh:2;url=login.php");
            } else {
                $errors[] = "Có lỗi xảy ra trong quá trình đăng ký.";
            }
        }
    }
}
?>

<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Đăng Ký Tài Khoản</title>
    <style>
        .form-container { width: 400px; margin: 50px auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px; }
        .form-group { margin-bottom: 15px; }
        .form-group label { display: block; margin-bottom: 5px; }
        .form-group input { width: 100%; padding: 8px; box-sizing: border-box; }
        .error { color: red; margin-bottom: 10px; }
        .success { color: green; margin-bottom: 10px; }
        .captcha-box { display: flex; align-items: center; gap: 10px; margin-top: 5px; }
    </style>
</head>
<body>

<div class="form-container">
    <h2>Đăng Ký Hệ Thống</h2>
    
    <?php if (!empty($errors)): ?>
        <div class="error"><?php echo implode("<br>", $errors); ?></div>
    <?php endif; ?>
    <?php if (!empty($success)): ?>
        <div class="success"><?php echo $success; ?></div>
    <?php endif; ?>

    <form action="register.php" method="POST">
        <div class="form-group">
            <label>Họ và tên *</label>
            <input type="text" name="name" value="<?php echo isset($name) ? htmlspecialchars($name) : ''; ?>" required>
        </div>
        <div class="form-group">
            <label>Tên đăng nhập *</label>
            <input type="text" name="username" value="<?php echo isset($username) ? htmlspecialchars($username) : ''; ?>" required>
        </div>
        <div class="form-group">
            <label>Email *</label>
            <input type="email" name="email" value="<?php echo isset($email) ? htmlspecialchars($email) : ''; ?>" required>
        </div>
        <div class="form-group">
            <label>Số điện thoại</label>
            <input type="text" name="phone" value="<?php echo isset($phone) ? htmlspecialchars($phone) : ''; ?>">
        </div>
        <div class="form-group">
            <label>Mật khẩu * (Tối thiểu 6 ký tự)</label>
            <input type="password" name="password" required>
        </div>
        <div class="form-group">
            <label>Mã bảo mật (Captcha) *</label>
            <input type="text" name="captcha" required placeholder="Nhập chữ trong hình">
            <div class="captcha-box">
                <img src="captcha.php" id="captcha_img" alt="Captcha">
                <button type="button" onclick="document.getElementById('captcha_img').src='captcha.php?'+Math.random();">Đổi mã</button>
            </div>
        </div>
        <button type="submit" style="width: 100%; padding: 10px; background-color: #28a745; color: white; border: none; cursor: pointer;">Đăng Ký</button>
    </form>
    <p style="text-align: center; margin-top: 15px;">Đã có tài khoản? <a href="login.php">Đăng nhập ngay</a></p>
</div>

</body>
</html>
