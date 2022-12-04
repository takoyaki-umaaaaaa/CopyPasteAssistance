@echo off
rem makecabがshift-jisしか日本語ファイル名を受け付けないため、切り替える
chcp 932
dir
makecab /F CompressReleaseInfo.ddf

rem makecabが出力先directory指定を無視するため、自前で後処理する
move disk1\* release
rmdir disk1
