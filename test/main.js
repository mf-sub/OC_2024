// ハンバーガーメニュー
const ham = document.querySelector('#js-hamburger');
const nav = document.querySelector('#js-nav');


document.getElementById('js-hamburger').addEventListener('click',function() {
document.getElementById('js-nav').classList.toggle('active');
});

$('a[href*="index.html#"]').click(function () {
	document.getElementById('js-nav').classList.remove('active');
	var elmHash = this.hash; //ページ内リンクのHTMLタグhrefから、リンクされているエリアidの値を取得
	var pos = $(elmHash).offset().top - 30;  //idの上部の距離を取得
	$('html, body').animate({scrollTop: pos}, 500); //取得した位置にスクロール。500の数値が大きくなるほどゆっくりスクロール
	return false;
});

// ヘッダー登場
$(window).scroll(function () {           /* スクロールされた時 */
  var pos = $('.about').offset();          /* mvを過ぎたmainタグの高さを取得して変数[pos]に格納 */
  if ($(this).scrollTop() > pos.top) {   /* 変数[pos]より、スクロールされていたら */
    $('header').fadeIn();                /* ヘッダーをふわっと表示 */
  } else {                               /* それ以外の場合 */
    $('header').fadeOut();               /* ヘッダーをふわっと非表示 */
  }
});


$('.slider-inner').slick({
	autoplay: true,//自動的に動き出すか。初期値はfalse。
	infinite: true,//スライドをループさせるかどうか。初期値はtrue。
	slidesToShow: 3,//スライドを画面に3枚見せる
	slidesToScroll: 3,//1回のスクロールで3枚の写真を移動して見せる
	prevArrow: '<div class="slick-prev"></div>',//矢印部分PreviewのHTMLを変更
	nextArrow: '<div class="slick-next"></div>',//矢印部分NextのHTMLを変更
	dots: true,//下部ドットナビゲーションの表示
	responsive: [
		{
		breakpoint: 900,//モニターの横幅が769px以下の見せ方
		settings: {
			slidesToShow: 2,//スライドを画面に2枚見せる
			slidesToScroll: 2,//1回のスクロールで2枚の写真を移動して見せる
		}
	},
	{
		breakpoint: 650,//モニターの横幅が426px以下の見せ方
		settings: {
			slidesToShow: 1,//スライドを画面に1枚見せる
			slidesToScroll: 1,//1回のスクロールで1枚の写真を移動して見せる
		}
	}
]
});
