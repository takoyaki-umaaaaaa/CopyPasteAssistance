rem "―――設定情報反映用バッチファイル――――"
rem "使い方："
rem "設定ファイル(Settings.jsonなど)をこのバッチファイルにドロップして起動"
chcp 65001
cmd.exe /u /c "type %1 > コピペ補助.hta:SettingData"
pause
chcp 932
