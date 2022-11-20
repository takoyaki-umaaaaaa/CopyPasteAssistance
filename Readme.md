# コピペ補助

### Project repository (public)

<style>
.container::after {
	content: "";
	display: block;
	clear: both;}
}
</style>

<div class="container">
<img src="doc/images/画面.png" alt="動作画面"  align="left"  style="float: left; width: 35%; max-width: 150px; margin-right: 30px" align="left" >

#### Project保存先
https://dev.azure.com/takoyaki0084/コピペ補助

「コピペ補助.hta」以外は設定ファイル。
環境は、主に Visual Studio 2019を使用。

[環境設定などは Wiki参照](docs/1_StartPage.md)
</div>


### 設定ファイル
設定を保存するために、保存先としてADSを使用。
そのためCopyやText編集で設定情報が消える可能性が高い。

#### 形式
1. 名前：SettingData
1. 文字コード：UTF-16LE BOMなし
1. 形式：JSON

#### 編集方法
Text editorを使うのが一番簡単。
コマンドプロンプトから、次の形でファイル名として渡して呼び出し。
`<editor> コピペ補助.hta:SettingData`

例：`C:\work> notepad コピペ補助.hta:SettingData`
