@echo off
rem "―――Release用ファイル圧縮バッチ――――"
rem "※ Github actionから呼び出しています。"

chcp 65001

rem "Readme.mdとHTA本体を合わせて圧縮"
powershell Compress-Archive -Path .\*.hta, Readme.md -DestinationPath release\コピペ補助.zip -Force
