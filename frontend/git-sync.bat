@echo off
title Git Auto Sync - UrbanNest Frontend
color 0A
cd /d d:\xampp\htdocs\frontend

echo ============================================
echo   GIT AUTO SYNC - URBANNEST FRONTEND
echo ============================================
echo.

:MENU
echo Chon thao tac:
echo [1] Pull - Lay code moi nhat tu GitHub
echo [2] Push - Day code cua ban len GitHub
echo [3] Status - Xem trang thai hien tai
echo [4] Full Sync (Pull roi Push)
echo [5] Thoat
echo.
set /p choice="Nhap lua chon (1-5): "

if "%choice%"=="1" goto PULL
if "%choice%"=="2" goto PUSH
if "%choice%"=="3" goto STATUS
if "%choice%"=="4" goto FULLSYNC
if "%choice%"=="5" goto END
goto MENU

:PULL
echo.
echo [PULL] Dang lay code moi nhat...
git pull origin main
echo.
echo [OK] Pull hoan tat!
pause
goto MENU

:PUSH
echo.
git status
echo.
set /p msg="Nhap mo ta commit (vi du: Them trang dang nhap): "
git add .
git commit -m "%msg%"
git push origin main
echo.
echo [OK] Push hoan tat!
pause
goto MENU

:STATUS
echo.
echo === TRANG THAI HIEN TAI ===
git status
echo.
echo === 5 COMMIT GAN NHAT ===
git log --oneline -5
echo.
pause
goto MENU

:FULLSYNC
echo.
echo [1/2] Dang Pull code moi nhat...
git pull origin main
echo.
echo [2/2] Dang Push code cua ban...
git status
set /p msg="Nhap mo ta commit: "
git add .
git commit -m "%msg%"
git push origin main
echo.
echo [OK] Full Sync hoan tat!
pause
goto MENU

:END
echo Tam biet!
exit
