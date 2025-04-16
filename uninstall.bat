@echo off
setlocal

:: Set the task name (must match setup.bat)
set "taskname=StockbitAutomaton"

:: Delete the task
schtasks /delete /tn "%taskname%" /f

:: Delete the helper .bat files if they exist
set "workdir=%~dp0"
set "runfile=%workdir%run_playwright.bat"
set "launcherfile=%workdir%launcher.bat"

if exist "%runfile%" del "%runfile%"
if exist "%launcherfile%" del "%launcherfile%"

echo Task "%taskname%" have been removed.
pause