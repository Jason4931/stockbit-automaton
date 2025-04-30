@echo off
cd %~dp0
npx playwright codegen --save-storage=auth.json https://stockbit.com/login
exit