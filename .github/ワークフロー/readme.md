
### Code QL 設定
コードの脆弱性チェック  
対象言語：javascript  
対象ファイル：？？  
実行時間1：毎日 12:00 (UTC 3:00)  
実行時間2: 毎日 17:00 (UTC 8:00)  


### 使用中の Action
* **[Checkout V3](https://github.com/marketplace/actions/checkout)**  
指定の repositoryを downloadしてくれる


### 覚えておいたほうが良さそうな Action
* **[GitHub Script](https://github.com/marketplace/actions/github-script)**  
いくつかのパッケージへの参照を提供
* **[Super-Linter](https://github.com/marketplace/actions/super-linter)**  
様々なlinterが使える action。コピペチェックもある。

### 参考サイト
1. https://nkon.github.io/GitHub_Actions/  
ほぼそのまま使えそう。windows-latestを使っている。
1. https://docs.github.com/ja/actions/learn-github-actions/essential-features-of-github-actions#sharing-data-between-jobs  
変数の使い方、artifactのアップダウン。
1. https://github.com/actions/upload-artifact  
アップロードアーティファクトv3
1. https://github.com/actions/download-artifact  
ダウンロード-アーティファクトv3

### 覚え書き
1. **Web上で GitHub Actionのメニューから環境を作成するとき、Browser翻訳機能は OFFにすること。**  
自動的に作成される📂名が日本語に翻訳された状態で作成され、Actionが動かなくなる……
1. **初期状態は gitが入っている以外はまっさらな状態。**  
まずは repositoryの checkoutから始める。  
あとは apt-getか wingetかでコマンド追加するらしい。
3. 今のところ windows-latestしか使っていないため、linuxでも同じかは不明
   1. **`run:` による shell呼び出しは`cmd /c`として1回限りの環境として呼び出される。**  
そのため `cd` や `chcp` を行っても次のコマンドではまた初期状態になる。  
連続した処理は batchファイルにまとめて callで呼び出す形にする。
   1. **日本語ファイル名での処理、Localの Windows sandboxで通っても windows-latest(2022)で失敗する。**  
makecab.exeの作りが悪いだけのような気もするが、気になる。
