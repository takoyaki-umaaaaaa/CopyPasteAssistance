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
<img src="https://dev.azure.com/takoyaki0084/23a52cdd-b722-4524-98d9-7bac2e28c4e0/_apis/git/repositories/e579511e-8136-42e0-9745-58823d8f1ac9/Items?path=/docs/images/%E7%94%BB%E9%9D%A2.png&download=false&resolveLfs=true&%24format=octetStream&api-version=5.0-preview.1&sanitize=true&versionDescriptor.version=master" alt="動作画面"  align="left"  style="float: left; width: 35%; max-width: 150px; margin-right: 30px" align="left" >

#### Project保存先
https://dev.azure.com/takoyaki0084/コピペ補助

「コピペ補助.hta」以外は設定ファイル。
環境は、主に Visual Studio 2019を使用。

[環境設定などは Wiki参照](docs/StartPage.md)
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
