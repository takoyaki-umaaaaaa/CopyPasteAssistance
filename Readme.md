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
<img src=".\画面.png" alt="動作画面"  align="left"  style="float: left; width: 35%; max-width: 150px; margin-right: 30px" align="left" >

https://dev.azure.com/takoyaki0084/%E3%82%B3%E3%83%94%E3%83%9A%E8%A3%9C%E5%8A%A9

「コピペ補助.hta」以外は設定ファイル。
環境は、主に Visual Studio 2019を使用。
</div>

### Visual Studio Codeで .hta fileの Code highligt

1. メニューバーから[表示] ➠ [コマンドパレット]を開く
1. 次を入力<br>`>Preferences: Open Settings (Json)`
1. settings.jsonが開くので、次の設定を記入  
1. <code style="white-space: pre;">"files.associations": {<br>&#009;"*.hta": "http"`  <br>}</code>
1. 保存して*.htaなファイルを開く