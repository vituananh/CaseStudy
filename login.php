<?php
require_once 'db.php';

$error = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username']);
    $password = $_POST['password'];

    if (empty($username) || empty($password)) {
        $error = "Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.";
    } else {
        // Truy vấn thông tin user dựa trên Username
        $stmt = $conn->prepare("SELECT * FROM user WHERE Username = ?");
        $stmt->execute([$username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // Kiểm tra tài khoản và mật khẩu (Dữ liệu gốc đang lưu dạng plain text)
        if ($user && $password === $user['Password']) {
            // Lưu thông tin vào Session
            $_SESSION['user_id'] = $user['ID'];
            $_SESSION['user_name'] = $user['Name'];
            $_SESSION['user_role'] = $user['Role'];

            // --- ĐIỀU HƯỚNG THEO VAI TRÒ (ROLE) ---
            if ($user['Role'] == 1) {
                // Nếu là Admin -> Điều hướng sang trang quản trị của Thăng hoặc Trí
                header("Location: admin_dashboard.php");
            } else {
                // Nếu là Người dùng thường -> Điều hướng về Trang chủ của Huy
                header("Location: index.php");
            }
            exit();
        } else {
            $error = "Tên đăng nhập hoặc mật khẩu không chính xác.";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Đăng Nhập Hệ Thống</title>
    <style>
        .form-container { width: 350px; margin: 100px auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px; }
        .form-group { margin-bottom: 15px; }
        .form-group label { display: block; margin-bottom: 5px; }
        .form-group input { width: 100%; padding: 8px; box-sizing: border-box; }
        .error { color: red; margin-bottom: 10px; }
    </style>
</head>
<body>

<div class="form-container">
    <h2>Đăng Nhập</h2>
    
    <?php if (!empty($error)): ?>
        <div class="error"><?php echo $error; ?></div>
    <?php endif; ?>

    <form action="login.php" method="POST">
        <div class="form-group">
            <label>Tên đăng nhập</label>
            <input type="text" name="username" required>
        </div>
        <div class="form-group">
            <label>Mật khẩu</label>
            <input type="password" name="password" required>
        </div>
        <button type="submit" style="width: 100%; padding: 10px; background-color: #007bff; color: white; border: none; cursor: pointer;">Đăng Nhập</button>
    </form>
    <p style="text-align: center; margin-top: 15px;">Chưa có tài khoản? <a href="register.php">Đăng ký tại đây</a></p>
</div>

</body>
</html>
