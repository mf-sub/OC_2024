
window.onload = function() {
  // ページ読み込み後に短い遅延を置いて一番下までスクロール
  setTimeout(function() {
	window.scrollTo(0, document.body.scrollHeight);
  }, 100);
};

// ハンバーガーメニュー
const ham = document.querySelector('#js-hamburger');
const nav = document.querySelector('#js-nav');


document.getElementById('js-hamburger').addEventListener('click',function() {
document.getElementById('js-nav').classList.toggle('active');
});


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

document.addEventListener('DOMContentLoaded', () => {
    const apngImages = document.querySelectorAll('.ko-title_frame');
	const keyImages = document.querySelectorAll('.ko-key');

    apngImages.forEach(apngImage => {
        const apngSrc = apngImage.src;
        let timer;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const target = entry.target;
                if (entry.isIntersecting) {
                    target.classList.add('title-up');
                    timer = setTimeout(() => {
                        const newImg = target.cloneNode();
                        target.src = apngSrc;
                    }, 70);
                } else {
                    target.classList.remove('title-up');
                    clearTimeout(timer);
                }
            });
        });

        observer.observe(apngImage);
    });

    setTimeout(() => {
        keyImages.forEach(keyImage => {
            const keySrc = keyImage.src;
			// keyImages.classList.add('key-up');
            const keynewImg = keyImage.cloneNode();
            keyImage.src = keySrc;
        });
    }, 2500);
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
