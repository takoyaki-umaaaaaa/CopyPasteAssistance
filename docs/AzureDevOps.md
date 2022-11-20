# Azure DevOps情報
<small style="color: #ccc;">~~MS公式 website、外部サイトからのタグ指定移動ができないっぽいけどどういうことか；´Д｀)まさか強調表示指定移動まで無視されるとは・・・~~ provisioned-vs-published-wikiページだけの問題っぽい；´Д｀)？URLに余計なパラメータが付いてidジャンプができなくなる </small>

### Wikiの作成
公式document：[プロジェクト用 wiki の作成](https://learn.microsoft.com/ja-jp/azure/devops/project/wiki/wiki-create-repo)

###### Wikiを Git管理と管理とする場合の注意点
* Code管理用の repositoryとは別に、Wiki用 repositoryに作成される。
* ~~Azure DevOps Webポータルには表示されない。詳細メニュー等にも出てこない。~~<br>公式サイトのdocumentが古い？ Overview ➠ [Wiki](https://dev.azure.com/takoyaki0084/コピペ補助/_wiki/wikis/コピペ補助.wiki) で表示できる。
* 

#### Wiki を発行
公式document：[Git リポジトリを Wiki に発行する](https://learn.microsoft.com/ja-jp/azure/devops/project/wiki/publish-repo-to-wiki)

<small style="color: #ccc;">発行……作成とはどう違うんだ……；´Д｀)<br>どうやら次の違いっぽい。
　作成：発行先を作成する。
　発行：作成したWikiを公開する。
それにしても管理が面倒そうだな……Code用Gitとは公開範囲も権限も違うから、内部的にも別管理になっているせいだろうか。
</small>

#### サポート機能
公式document：[サポートされている機能と運用上の相違点](https://learn.microsoft.com/ja-jp/azure/devops/project/wiki/provisioned-vs-published-wiki?view=azure-devops#supported-features-and-operational-differences)


### Markdown記法
公式document：[基本的な Markdown の使用に関する構文ガイダンス](https://learn.microsoft.com/ja-jp/azure/devops/project/wiki/markdown-guidance?view=azure-devops)




[Microsoftの Azure DevOps document top](https://learn.microsoft.com/ja-jp/azure/devops/)
