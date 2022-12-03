# コピペ補助 (Copy Paste Assistance)[^1]

<img src="docs/images/画面.png" alt="動作画面"  style="float: left; width: 20%; max-width: 150px; margin-right: 30px" align="left" >

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

| ADS Name     | Character code | Format | CR LF |
| :---         | :---         | :---         | :---         |
| SettingData   | UTF-16LE BOM or non-BOM | JSON    | LF |

設定項目等は下記参照。名前からだいたい判断。パラメータの種類コメント[^2]参照。  
https://github.com/takoyaki-umaaaaaa/CopyPasteAssistance/blob/b85f8ced92668799b5efe0a4bdd5dc17da8a730f/settings.json#L1-L16

[^2]: JSONファイルへのコメントとして、「JSON Perserは同じキーがある場合、大抵の環境では後のキーが有効になる」という動作を利用してコメントを入れている（JSON形式の公式定義では禁止されていたり明言されていなかったりらしい）。今回はHTAとして動かすので、IE11で動きさえすれば良い。

#### 設定の直接編集方法
Text editorを使うのが一番簡単。  
コマンドプロンプトから、次の形でファイル名として渡して呼び出し。  
`C:\><editor>.exe コピペ補助.hta:SettingData`  

例：`C:\work> notepad.exe コピペ補助.hta:SettingData`  

### ファイルごとの文字コードについて
Repositoryにある各ファイルは文字コードがそれぞれ違っている。

* Batch file: Shift-JIS
* Json file: UTF-16 LE BOM or non-BOM
* HTA file: UTF-16 BOM
* Markdown file: UTF-8 non-BOM

この状況は、そのファイルを使う環境がそれを求めるために発生している。  
やはり、ファイル名に日本語は使うものじゃないな……
