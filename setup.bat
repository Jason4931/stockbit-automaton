@echo off
setlocal

:: Check if Node.js is installed
where node > NUL 2>&1
if errorlevel 1 (
    echo Node.js is not installed.
    echo Installing Node.js...
    start https://nodejs.org/dist/v22.14.0/node-v22.14.0-x64.msi
    exit /b
)

:: Set working directory to the folder of this script
set "workdir=%~dp0"
set /p interval=Enter interval in minutes: 
set taskname=StockbitAutomaton
set "user=%COMPUTERNAME%\%USERNAME%"

:: Create the actual runner script
set runfile=%workdir%run_playwright.bat
(
    echo @echo off
    echo cd /d "%workdir%"
    echo npx playwright test ^> NUL 2^>^&1
    echo rd /s /q "%workdir%test-results"
    echo exit
) > "%runfile%"

:: Create the launcher that starts the runner minimized
set launcherfile=%workdir%launcher.bat
(
    echo @echo off
    echo cd /d "%workdir%"
    echo start /min "" "%runfile%"
    echo exit
) > "%launcherfile%"

:: Create scheduled task that calls the launcher script
schtasks /create ^
    /tn "%taskname%" ^
    /tr "cmd.exe /c \"%launcherfile%\"" ^
    /sc minute ^
    /mo %interval% ^
    /ru "%user%" ^
    /it ^
    /f

echo Task "%taskname%" created to run every %interval% minutes.
pause