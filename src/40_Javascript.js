// --------- Javascript area -----------
'use strict';

const eleDbgout = document.getElementById('debugout');
// eleDbgout.value = 

// オプション設定情報の構造体定義的なもの
function OptionalInformation(items, width, height, addpos, bg, anim, mag) {
	this.startupItemCount			= items;	// 起動時の表示Item数
	this.startupWindowWidth			= width;	// 起動時のWindow幅
	this.startupWindowHeight		= height;	// 起動時のWindow高さ
	this.startupAdditionalPosition	= addpos;	// 起動時のItem追加位置
	this.startupBackgroundImage		= bg;		// 起動時の背景画像番号
	this.displayAnimation			= anim;		// アニメーション表示
	this.displayMagnification 		= mag;		// Itemの表示倍率
}

// 🅻🅾🅰🅳 🅰🅽🅳 🆂🅰🆅🅴 🆂🅴🆃🆃🅸🅽🅶 🅸🅽🅵🅾🆁🅼🅰🆃🅸🅾🅽.
// 設定ファイル(JSON形式)を読み込み、構造体っぽいオブジェクトとして返す
var PathStrSetting = "コピペ補助.hta:SettingData";	// 設定ファイル
function LoadDefaultSettingInformation(){
	return new OptionalInformation(1, 470, 300, "BOTTOM", 1, "true", 0.8);
}
function LoadSettingInformation(filepath){
	let fsObject = new ActiveXObject("Scripting.FileSystemObject");
	if( !fsObject.FileExists(filepath) ){
		alert("設定ファイル(" + filepath + ")が見つかりません。\r\n初期値を設定します。");
		fsObject = null;			// 参照削除(解放) 
		return LoadDefaultSettingInformation();
	}

	let settingStream = fsObject.OpenTextFile(
								filepath, 			// 読み込み対象ファイル
								1,					// Read Open (RWは存在しない…)
								false,				// ファイルが無い場合に作成しない
								-1);				// Unicode形式で開く
	let settingStr = settingStream.ReadAll();	// BOM付きならBOMを削除した内容を渡してくれる・・・っぽい
	settingStream.Close();
	fsObject = null;				// 参照削除(解放) 

	return JSON.parse(settingStr);
}
// 設定情報(JSON object)をHTAファイルのADSに保存
function SaveSettingInformation(filepath, settings){
	let saveStr = JSON.stringify(settings);
	let fsObject = new ActiveXObject("Scripting.FileSystemObject");
	let settingStream = fsObject.OpenTextFile(
								filepath, 	// 書き込み対象ファイル
								2,					// Write Open (上書き)
								true,				// ファイルが無い場合は作成する
								-1);				// Unicode形式で開く
	settingStream.Write(saveStr);
	settingStream.Close();
	fsObject = null;				// 参照削除(解放) 
}
// 設定情報保持
var Option = LoadSettingInformation(PathStrSetting);

// 終了時に設定を保存
function onPagehide(event){
	SaveSettingInformation(PathStrSetting, Option);
}
window.addEventListener("pagehide", onPagehide );

eleDbgout.value = JSON.stringify(Option);


// 🅸🅼🅿🅾🆁🆃 & 🅴🆇🅿🅾🆁🆃
let eleImport = document.getElementById('import');
function onImport(){
	// 読み込んだファイルに全パラメータが揃っていない可能性があるため
	// デフォルト設定で初期化後に読み込み
	Option = LoadDefaultSettingInformation();
	Option = LoadSettingInformation( eleImport.value );	// IEはフルパスを返してくる……
	alert("設定を更新しました。再起動してください。");
}
eleImport.addEventListener("change", onImport);

function Export(){
	let ret = window.confirm("HTAファイルと同じ📂に\r\nExportSettings.jsonというファイルを作成します。\r\nよろしいですか？\r\n(同名ファイルがある場合は上書きされます)");
	if(ret){
		SaveSettingInformation(".\\ExportSettings.json", Option);
	}
}

// 🅳🆁🅰🅶 🅰🅽🅳 🅳🆁🅾🅿
// HTML5 の機能を使っているが、要素の入れ替えはflexboxのorder property頼り。
// Dropイベントで order番号を振り直している。

let draggingEle = null;	/* Drag中の要素を保持。Drag中以外はnull */
let draggingEleHeight = 0;

function findAll(selector) {
	const nodeList = document.querySelectorAll(selector);
	const nodes = Array.prototype.slice.call(nodeList);
	return nodes;
}

function onDragStart(event) {
	event.dataTransfer.effectAllowed = 'all';
//	event.dataTransfer.setData('Text', this.id);

	draggingEle = event.target.parentElement;
	draggingEleHeight = draggingEle.style.height;
	draggingEle.style.height = (20 * Option.displayMagnification) + "px";	// calcを使うと transitionしなくなる対策
	console.log("onDragStart");
	return false;
}


function onDragEnter(event) {
	if (event.preventDefault) event.preventDefault();

	let dragEle = draggingEle;
	let dropEle = event.currentTarget;

	let sourceOrder = parseInt(dragEle.style.order);
	let targetOrder = parseInt(dropEle.style.order);
	let shiftArray = (targetOrder < sourceOrder)? 1: -1;	// ずらす方向の決定
	findAll('.item').forEach(function (node) {
		// 順序入れ替えの影響範囲に絞る。影響範囲はDrag対象番号～Drop対象番号内。
		if(Math.min(targetOrder,sourceOrder) <= node.style.order && node.style.order <= Math.max(targetOrder,sourceOrder)) {
			if( node != dragEle )
				node.style.order = parseInt(node.style.order) + shiftArray;
		}
	});
	dragEle.style.order = targetOrder;

	return false;
}

function onDragOver(event) {
	if (event.preventDefault) event.preventDefault();
	this.classList.add('over');

	return false;
}

function onDragLeave(event) {
	if (event.preventDefault) event.preventDefault();
	this.classList.remove('over');

	return false;
}

function onDragEnd(event) {
	if( draggingEle ){
		draggingEle.style.height = draggingEleHeight;
		draggingEle = null;
	}

	return false;
}

function onDrop(event) {
	if (event.preventDefault) event.preventDefault();
	this.classList.remove('over');

	let dragEle = draggingEle;
	let dropEle = event.currentTarget;

	let sourceOrder = parseInt(dragEle.style.order);
	let targetOrder = parseInt(dropEle.style.order);
	let shiftArray = (targetOrder < sourceOrder)? 1: -1;	// ずらす方向の決定
	findAll('.item').forEach(function (node) {
		// 順序入れ替えの影響範囲に絞る。影響範囲はDrag対象番号～Drop対象番号内。
		if(Math.min(targetOrder,sourceOrder) <= node.style.order && node.style.order <= Math.max(targetOrder,sourceOrder)) {
			if( node != dragEle )
				node.style.order = parseInt(node.style.order) + shiftArray;
		}
	});
	dragEle.style.order = targetOrder;
//	dragEle.style.height = draggingEleHeight;	// onDragEndで対応

	return false;
}

/* 🅰🅳🅳 🅰🅽🅳 🆁🅴🅼🅾🆅🅴 🅴🅻🅴🅼🅴🅽🆃🆂 */
/*	コピペ用ワンセットとして、次の形式のHTML要素を作成・追加
	(Item追加位置はFlexboxの orderで制御。
	そのため DOM tree上はItem追加位置設定によらず、最後尾に追加)
	※ 0番目要素はダミー。flex-item要素が1つの場合はflex-start
	   固定になるIEのbugっぽい動作対策のため。
	<div class="item">
		<span class="handle" draggable="true">ハンドル</span>
		<button class="pushable">
			<span class="shadow"></span>
			<span class="edge"></span>
			<span class="front">Push to Copy</span>
		</button>
		<textarea class="textbox" contenteditable="true"></textarea>
	</div>
*/
let countOrder = 0;
let aniWaitTime = 150;
let aniMaxWait = aniWaitTime * 3;
function addItem() {

	// Itemの追加位置決定
	let addItemOrder = 0;
	if(Option.startupAdditionalPosition == "TOP"){
		// 追加要素を先頭にするため、現存する全itemのorderを1加算
		findAll('.item').forEach(function (node) {
			node.style.order++;
		});
		addItemOrder = 0;	// 追加要素は先頭表示
	}
	else {
		addItemOrder += findAll('.item').length + 1;	// 追加要素は末尾表示
	}

	// 	Itemの作成・追加
	const eleItem = document.getElementById('itemBody').insertBefore( document.createElement('div') );
	eleItem.classList.add("item");
	eleItem.classList.add("leftin");
	eleItem.classList.add("bgColor" + (countOrder++ % 4 + 1));
	eleItem.style.animation = "anileftin 250ms ease-out " + (eleItem.childNodes.length * aniWaitTime) + "ms forwards";
	eleItem.style.order = addItemOrder;
	eleItem.style.minWidth		= "calc(400px * " + Option.displayMagnification + ")";
	eleItem.style.maxWidth		= "calc(400px * " + Option.displayMagnification + ")";
	eleItem.style.height		= (150 * Option.displayMagnification) + "px";	// calcを使うと transitionしなくなる対策
	eleItem.style.borderRadius	= "calc( 20px * " + Option.displayMagnification + ")";
	eleItem.style.margin		= "calc( 10px * " + Option.displayMagnification + ") calc(20px * " + Option.displayMagnification + ")";
	eleItem.style.padding		= "calc(  8px * " + Option.displayMagnification + ")";


	// ドラッグ用ハンドル
	const eleHandle = eleItem.appendChild( document.createElement('span') );
	eleHandle.classList.add("handle");
	eleHandle.classList.add("leftin04");
	eleHandle.style.animation = "anileftin04 250ms ease-out " + (eleItem.childNodes.length * aniWaitTime) + "ms forwards";
	eleHandle.setAttribute('draggable', 'true');
	eleHandle.textContent = "";
	eleHandle.style.margin = "calc(5px * " + Option.displayMagnification + ")";
	eleHandle.style.height = "calc(100% - (10px * " + Option.displayMagnification + "))";
	// button作成
	const eleBtn = eleItem.appendChild( document.createElement('button') );
	eleBtn.classList.add("pushable");
	eleBtn.classList.add("leftin");
	eleBtn.style.animation = "anileftin 250ms ease-out " + (eleItem.childNodes.length * aniWaitTime) + "ms forwards";
	eleBtn.style.padding		= "calc(20px * " + Option.displayMagnification + ")";
	eleBtn.style.margin			= "calc( 5px * " + Option.displayMagnification + ")";
	eleBtn.style.outlineOffset	= "calc( 4px * " + Option.displayMagnification + ")";
		const eleBtnShadow = eleBtn.appendChild( document.createElement('span') );
		eleBtnShadow.classList.add("shadow");
		eleBtnShadow.style.top			= "calc( 8px * " + Option.displayMagnification + ")";
		eleBtnShadow.style.height		= "calc(100% - (16px * " + Option.displayMagnification + "))";
		const eleBtnEdge = eleBtn.appendChild( document.createElement('span') );
		eleBtnEdge.classList.add("edge");
		eleBtnEdge.style.top			= "calc( 8px * " + Option.displayMagnification + ")";
		eleBtnEdge.style.height			= "calc(100% - (16px * " + Option.displayMagnification + "))";
		const eleBtnFront = eleBtn.appendChild( document.createElement('span') );
		eleBtnFront.classList.add("front");
		eleBtnFront.textContent = "Push to Copy";
		eleBtnFront.style.top			= "calc( 8px * " + Option.displayMagnification + ")";
		eleBtnFront.style.height		= "calc(100% - (16px * " + Option.displayMagnification + "))";
		eleBtnFront.style.paddingTop	= "calc(10px * " + Option.displayMagnification + ")";
		eleBtnFront.style.fontSize		= "calc( 2rem * " + Option.displayMagnification + ")";
	// Textbox作成
	const eleTxt = eleItem.appendChild( document.createElement('textarea') );
	eleTxt.classList.add("textbox");
	eleTxt.classList.add("leftin");
	eleTxt.style.animation = "anileftin 250ms ease-out " + (eleItem.childNodes.length * aniWaitTime) + "ms forwards";
	eleTxt.setAttribute('contenteditable', 'true');
	eleTxt.style.height		= "calc(100% - (10px * " + Option.displayMagnification + "))";
	eleTxt.style.margin		= "calc( 5px * " + Option.displayMagnification + ")";
	eleTxt.style.padding	= "calc( 5px * " + Option.displayMagnification + ")";
	eleTxt.style.fontSize	= "calc(18px * " + Option.displayMagnification + ")";

	// Button 押下による clip board コピー
	eleBtn.addEventListener('click', copyToClipboard);

	// Drag and drop用 Event listener
	eleHandle.addEventListener('dragstart',	onDragStart);		// Dragし初めに来る
	eleHandle.addEventListener('dragend',	onDragEnd);			// Dragを止めた(右クリックを離したり)ら来る

	eleItem.addEventListener('dragenter',	onDragEnter);		// Drop target 上に入った時に来る
	eleItem.addEventListener('dragover',	onDragOver);		// Drop target 上に居る間来る
	eleItem.addEventListener('dragleave',	onDragLeave);		// Drop target から離れたら来る
	eleItem.addEventListener('drop',		onDrop);			// Drop target に dropしたら来る
	eleItem.addEventListener('dragend',		onDragEnd);			// Dragを止めた(右クリックを離したり)ら来る

}

/* DOM Tree上の最後尾の1件を削除 */
var delStackNum = 0;	// 削除処理完了待ちの数
function deleteLastItem() {
	let nodes = document.getElementById('itemBody').childNodes;
	if( 0 < nodes.length - delStackNum ) {
		delStackNum++;

		let targetEle = nodes[nodes.length - delStackNum];
		for(let child=0; child < targetEle.childNodes.length; child++ ){
			targetEle.childNodes[child].classList.remove("leftin");
			targetEle.childNodes[child].classList.add("leftout");
			targetEle.childNodes[child].style.animation = "anileftout 250ms ease-out " + (aniMaxWait - aniWaitTime * child) + "ms forwards";
		}
		targetEle.classList.remove("leftin");
		targetEle.style.animation = "anileftout 250ms ease-out 500ms forwards";	/* 600msでは遅すぎる…… */
		targetEle.classList.add("leftout");

		// 指定時間後に DOM tree から要素を削除
		setTimeout( function(){
			// 引数で削除対象要素を渡すと問題ありっぽいので、内部処理で1から指定。
			// (連続押下などで待ち時間中に DOM tree が変化すると渡した参照が無効になるらしい)
			let nodes = document.getElementById('itemBody').childNodes;
			nodes[nodes.length - 1].parentNode.removeChild( nodes[nodes.length - 1] );	// ここはdelStackNumを使う必要なし。削除回数が合っていれば良い。
			delStackNum--;
		}, 900);

		countOrder--;
	}
}


// 🅲🅻🅸🅿🅱🅾🅰🆁🅳
function copyToClipboard(event) {
	let nodes = event.target.parentNode.childNodes;
	let text = nodes[nodes.length - 1].value;
	window.clipboardData.setData('text', text);
}

// 背景パターン変更
// ptn = "bgImage1" ～ "bgImage3" のいずれか
function ChangeBackGround(ptn) {
	const bodyEle = document.querySelector('body');
	bodyEle.classList.remove(bodyEle.classList[0]);		// 現在の画像を削除
	bodyEle.classList.add( ptn );						// 新しい画像を貼り付け
}

// 背景パターン選択Control
function onChangeBG(event){
	ChangeBackGround( event.target.value );
}

const selectBgEle = document.querySelector('.selectBG');
selectBgEle.addEventListener('change', onChangeBG);

// 読み込んだ初期設定情報の背景画像を選択
// ChangeBackGround(Option.startupBackgroundImage);
function controlSelectBackGround(num){
	// optionの selectedを変更すると、前回選択中だったselectedは勝手に外れてくれるらしい
	const selectBgEle = document.getElementById('selectBG').options[num - 1].selected = "selected";
	// しかし change eventは発生しないので、自分で背景を切り替える。
	ChangeBackGround( "bgImage" + num );
}
controlSelectBackGround(Option.startupBackgroundImage);


// ***** 🎉 🆂🆃🅰🆁🆃 🅾🅵 🅼🅰🅸🅽 🅿🆁🅾🅲🅴🆂🆂 🎉 *****

window.resizeTo(Option.startupWindowWidth, Option.startupWindowHeight);

let startupAddDelayTimeOnce = 150;
let startupAddDelayTimeTotal = 0;
for( let cnt = 0; cnt < Option.startupItemCount; cnt++ ){
		setTimeout(function(){addItem();}, startupAddDelayTimeTotal);
		startupAddDelayTimeTotal += startupAddDelayTimeOnce;
}

</script>
