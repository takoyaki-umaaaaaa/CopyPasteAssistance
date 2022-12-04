@echo off
chcp 65001
powershell Compress-Archive -Path .\*.hta, Readme.md -DestinationPath release\コピペ補助.zip -Force
