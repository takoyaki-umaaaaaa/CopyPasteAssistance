@echo off
rem "表示をunicodeに切り替えるのは、結合後の出力ファイル名に日本語を使っているため。"
rem "cmd /u で コマンド出力データは UTF-16になるが、ファイル名は無理らしい。"
chcp 65001

cd src
rem "copy /a (== Ascii mode) option で結合しているため、BOMが付けられる"
cmd.exe /u /c "copy /a 10_top.html+20_style.css+30_body.html+40_Javascript.js+50_bottom.html ..\\コピペ補助.hta"
echo "結合完了"

cd ..
rem "type コマンドで copyすると BOMは失われる……"
cmd.exe /u /c "type settings.json > コピペ補助.hta:SettingData"
echo "設定情報コピー完了"

chcp 932
exit
