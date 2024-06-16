// ハンバーガーメニュー
const ham = document.querySelector('#js-hamburger');
const nav = document.querySelector('#js-nav');


document.getElementById('js-hamburger').addEventListener('click',function() {
document.getElementById('js-nav').classList.toggle('active');
});

// $('a[href*="index.html#"]').click(function () {
// 	document.getElementById('js-nav').classList.remove('active');
// 	var elmHash = this.hash; //ページ内リンクのHTMLタグhrefから、リンクされているエリアidの値を取得
// 	var pos = $(elmHash).offset().top - 30;  //idの上部の距離を取得
// 	$('html, body').animate({scrollTop: pos}, 500); //取得した位置にスクロール。500の数値が大きくなるほどゆっくりスクロール
// 	return false;
// });


// ウィンドウがスクロールされるたびにこの関数が呼び出される
window.onscroll = function() {
    var video = document.getElementById('video-fix');

    // ビデオの現在の再生位置を取得
    var currentTime = video.currentTime;

    // ページのスクロール量を取得
    var scrollPosition = window.scrollY;

    // ページの高さとビデオの長さを取得
    var documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    var videoDuration = video.duration;

    // スクロール位置をビデオの再生位置にマッピング
    if (videoDuration) { // 動画のメタデータが読み込まれているか確認
        var newTime = (scrollPosition / documentHeight) * videoDuration;
        video.currentTime = newTime;
    }
};

// ビデオがロードされたときに自動再生を開始
// document.getElementById('fixed-video').addEventListener('loadeddata', function() {
//     this.play();
// });


