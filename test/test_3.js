// ウィンドウがスクロールされるたびにこの関数が呼び出される
window.onscroll = function() {
    var video = document.getElementById('fixed-video');

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
