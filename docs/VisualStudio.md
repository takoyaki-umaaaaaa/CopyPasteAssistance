# Visual Studio 2019 設定情報

### Project設定
情報元：https://stackoverflow.com/questions/28603601/using-visual-studio-to-build-an-hta-or-single-page-local-html-file-application

※未確認

1. 新規プロジェクトとして「HTMLアプリケーション」を選択
1. "index.html" を "index.hta" に rename
1. ビルドプロパティ ➠ 外部プログラムとして開くに mshta.exe
1. コマンドライン引数として targetの HTA のフルパスを渡す