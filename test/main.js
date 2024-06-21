
// 最下部スクロール
window.onload = function() {
    // ページ読み込み後に短い遅延を置いて一番下までスクロール
    setTimeout(function() {
        window.scrollTo(0, document.body.scrollHeight);
    }, 600); // 10ミリ秒の遅延

	// loadings_animation
	const spinner = document.getElementById('loading');
	if (spinner) { // spinnerがnullでないか確認
        spinner.classList.add('loaded');
	}
};


// ハンバーガーメニュー
const ham = document.querySelector('#js-hamburger');
const nav = document.querySelector('#js-nav');


document.getElementById('js-hamburger').addEventListener('click',function() {
document.getElementById('js-nav').classList.toggle('active');
});

// メニューからスクロール
$('a[href*="index.html#"]').click(function () {
	document.getElementById('js-nav').classList.remove('active');
	var elmHash = this.hash; //ページ内リンクのHTMLタグhrefから、リンクされているエリアidの値を取得
	var pos = $(elmHash).offset().top - 30;  //idの上部の距離を取得
	$('html, body').animate({scrollTop: pos}, 500); //取得した位置にスクロール。500の数値が大きくなるほどゆっくりスクロール
	return false;
});


// スクロールでpng画像差し替え
var SIZE = 280;

var tmp = {};
	loadImageToTmp();
	function loadImageToTmp(){
		for(var i=10;i<=280;i++){
			const _i = i;
			const img = new Image();
			tmp[_i] = null;
			// img.src = "anim/hamoni_sp ("+_i+").png";
			const filename = "images/main_sp/main_sp_" + String(_i).padStart(5, '0') + ".png";
			img.src = filename;
			img.addEventListener("load",()=>{
				tmp[_i] = img;
			})
		}
	}


const image = document.getElementById("anim_img");

var SIZE = 280;

const PX = 12; // 5px分の移動ごと画像を1枚進める
const offset = $("#anim_img_box").offset(); // 画像を入れるdiv要素(position:stickyでトップに来たら固定される)
	$(window).scroll(function() {
		const y = $(window).scrollTop();
		const dy = y - offset.top;
		if(offset.top<y&&y<offset.top+SIZE*PX){
			$("#anim_img_box").css("top",0)
			const i = Math.floor(dy / PX);
			if(i<=10||i>=SIZE) return;
			if(tmp[i].src) image.src = tmp[i].src;
		}else if(y>=offset.top+SIZE*PX){
			$("#anim_img_box").css("top","-"+(dy-SIZE*PX)); // スクロール分が終了したときに移動を始める
		}
	});

$("#anim_img_padding").height(SIZE*4.2);


// ウィンドウがスクロールされるたびにこの関数が呼び出される
// window.onscroll = function() {
//     var video = document.getElementById('video-fix');

//     // ビデオの現在の再生位置を取得
//     var currentTime = video.currentTime;

//     // ページのスクロール量を取得
//     var scrollPosition = window.scrollY;

//     // ページの高さとビデオの長さを取得
//     var documentHeight = document.documentElement.scrollHeight - window.innerHeight;
//     var videoDuration = video.duration;

//     // スクロール位置をビデオの再生位置にマッピング
//     if (videoDuration) { // 動画のメタデータが読み込まれているか確認
//         var newTime = (scrollPosition / documentHeight) * videoDuration;
//         video.currentTime = newTime;
//     }
// };


// ビデオがロードされたときに自動再生を開始
// document.getElementById('fixed-video').addEventListener('loadeddata', function() {
//     this.play();
// });

// apngがhoverされたときに自動再生を開始
document.addEventListener("DOMContentLoaded", function() {
    const listItems = document.querySelectorAll(".icon-hover");

	listItems.forEach(function(listItem) {
        const img = listItem.querySelector("img");
        const apngSrc = img.src;

		listItem.addEventListener("mouseover", function() {
			// img.src = ""; // 一時的にsrcを空にする
			const newImg = img.cloneNode();
			setTimeout(() => {
				img.src = apngSrc; // 再度APNGのパスを設定
			}, 0); // 短い遅延を設定
		});
	});
});


// テキストアニメーション
// 動きのきっかけとなるアニメーションの名前を定義
function fadeAnime(){

//ふわっと動くきっかけのクラス名と動きのクラス名の設定
$('.fadeUpTrigger').each(function(){ //fadeInUpTriggerというクラス名が
	var elemPos = $(this).offset().top+800; //要素より、50px上の
	var scroll = $(window).scrollTop();
	var windowHeight = $(window).height();
	if (scroll >= elemPos - windowHeight){
	$(this).removeClass('fadeUp');
	// 画面内に入ったらfadeInというクラス名を追記
	}else{
		$(this).addClass('fadeUp');
	// 画面外に出たらfadeInというクラス名を外す
	}
	});

}//ここまでふわっと動くきっかけのクラス名と動きのクラス名の設定

// 画面をスクロールをしたら動かしたい場合の記述
	$(window).scroll(function (){
	fadeAnime();/* アニメーション用の関数を呼ぶ*/
	});// ここまで画面をスクロールをしたら動かしたい場合の記述

// 画面が読み込まれたらすぐに動かしたい場合の記述
	$(window).on('load', function(){
	fadeAnime();/* アニメーション用の関数を呼ぶ*/
	});// ここまで画面が読み込まれたらすぐに動かしたい場合の記述
