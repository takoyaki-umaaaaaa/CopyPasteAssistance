<img src="docs/images/画面.png" alt="動作画面"  style="float: left; width: 20%; max-width: 150px; margin-right: 30px" align="left" >

# コピペ補助 (Copy Paste Assistance)[^1]

[^1]: 実際には copy しか補助しません。

### 機能
[Push to Copy]ボタン押下で textareaの文字列を clipboardに copyする。  
まだまだ実装中。とりあえずCopyはできる。

### 作成理由
仕事でコピペを多くする機会があったから。<kbd>Ctrl</kbd>+<kbd>C</kbd>と<kbd>Ctrl</kbd>+<kbd>V</kbd>を繰り返し続けると指が攣りそうになるので……

### 最も力を入れている箇所
機能は単純でいい。  
とにかく見た目を派手にしたい。

### Project repository
https://github.com/takoyaki-umaaaaaa/CopyPasteAssistance

----

## 内部処理の話
### 設定ファイルについて
設定項目（実装中）の保存先として[ADS（代替データストリーム）](https://ja.wikipedia.org/wiki/%E3%83%95%E3%82%A9%E3%83%BC%E3%82%AF_(%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0))を使用している。単体ファイルで完結させたかったから。自己書き換えとかできれば良かったが……
そのためHTAファイルを編集したり、サーバー経由でのCopyで設定情報が消える可能性が高い。まあいいか。

#### 設定ファイルの形式

| ADS Name     | Character code | Format |
| :---         | :---         | :---         |
| SettingData   | UTF-16LE non-BOM | JSON    |

設定項目等は下記参照。名前からだいたい判断。パラメータの種類はどこかに書く必要有りか……
https://github.com/takoyaki-umaaaaaa/CopyPasteAssistance/blob/c11214b9e3f2abefac2e91b059a9319a52d0bbe2/settings.json#L1-L7

#### 設定の直接編集方法
Text editorを使うのが一番簡単。  
コマンドプロンプトから、次の形でファイル名として渡して呼び出し。  
`<editor> コピペ補助.hta:SettingData`  

例：`C:\work> notepad コピペ補助.hta:SettingData`  
