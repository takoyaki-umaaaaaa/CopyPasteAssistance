# Visual Studio Codeの設定情報

### Linterの有効化
Codeの種別が適用されれば、種別に応じた Linterが動作する（拡張機能が入っていれば）。
Code種別の適用は [*.htaファイルの Code highligt有効化](#htaファイルの-code-highligt有効化) を参照

### *.htaファイルの Code highligt有効化

1. メニューバーから[表示] ➠ [コマンドパレット]を開く
1. 次を入力<br>`>Preferences: Open Settings (Json)`
1. settings.jsonが開くので、次の設定を記入  
1. <code style="white-space: pre;">"files.associations": {<br>&#009;"*.hta": "html"`  <br>}</code>
1. 保存して*.htaなファイルを開く

