/* act
----------------------------------------------*/
// $(window).on('scroll load',function (){
// 	let triggerClass = $('.jsAct');
// 	animateClass = ('is-act');
// 	$(triggerClass).each(function(){
// 	  let scroll = $(window).scrollTop(),
// 	  triggerTop   = $(this).offset().top,
// 	  windowHeight = $(window).height();
// 	  if (scroll > triggerTop - windowHeight){
// 		$(this).addClass(animateClass);
// 	  }
// 	});
//   });


// $.scrollify({
// 	section : ".box",//1ページスクロールさせたいエリアクラス名
// 	scrollbars:"false",//スクロールバー表示・非表示設定
// 	interstitialSection : "#header,#footer",//ヘッダーフッターを認識し、1ページスクロールさせず表示されるように設定
// 	easing: "swing", // 他にもlinearやeaseOutExpoといったjQueryのeasing指定可能
// 	  scrollSpeed: 1000, // スクロール時の速度
// 	  setHeights: true, // 要素の高さをwindowの高さに合わせるかどうか

// 	//以下、ページネーション設定
// 	before:function(i,panels) {
// 	  var ref = panels[i].attr("data-section-name");
// 		$(".pagination .active").removeClass("active");
// 		$(".pagination").find("a[href=\"#" + ref + "\"]").addClass("active");
// 	  },
// 	  afterRender:function() {
// 		var pagination = "<ul class=\"pagination\">";
// 		var activeClass = "";
// 		$(".box").each(function(i) {//1ページスクロールさせたいエリアクラス名を指定
// 		  activeClass = "";
// 		  if(i===$.scrollify.currentIndex()) {
// 			activeClass = "active";
// 		  }
// 		//   pagination += "<li><a class=\"" + activeClass + "\" href=\"#" + $(this).attr("data-section-name") + "\"><span class=\"hover-text\">" + $(this).attr("data-section-name").charAt(0).toUpperCase() + $(this).attr("data-section-name").slice(1) + "</span></a></li>";
// 		});
// 		// pagination += "</ul>";

// 		$("#box1").append(pagination);//はじめのエリアにページネーションを表示
// 		$(".pagination a").on("click",$.scrollify.move);
// 	  }

// 	});


// document.addEventListener("DOMContentLoaded", function() {
//     var contentsElement = document.querySelector('main');
//     var bkElement = document.querySelector('.bk');

//     function setBkHeight() {
//         var contentsHeight = contentsElement.offsetHeight;
//         bkElement.style.height = contentsHeight + 'px';
//     }

//     // 初回の高さ設定
//     setBkHeight();

//     // ウィンドウリサイズ時に高さを再設定
//     window.addEventListener('resize', setBkHeight);

//     // コンテンツの更新などで高さが変わる場合は、適宜再設定する処理を追加することが推奨されます。
// });


window.onload = function() {
  // ページ読み込み後に短い遅延を置いて一番下までスクロール
  setTimeout(function() {
	window.scrollTo(0, document.body.scrollHeight);
  }, 100);
};

// window.addEventListener("DOMContentLoaded", function() {
//     var contentsElement = document.querySelector('.top-inner');
//     var bkElement = document.querySelector('.bk');

//     function setBkHeight() {
//         var contentsHeight = contentsElement.offsetHeight;
//         bkElement.style.height = contentsHeight + 'px';
// 		console.log("contentsElement", contentsElement, "contentsHeight", contentsHeight, "bkElement.style.height", bkElement.style.height);
//     }

//     // 初回の高さ設定
//     setBkHeight();
// 	console.log("setBkHeight", bkElement.style.height);

//     // ウィンドウリサイズ時に高さを再設定
//     window.addEventListener('resize', setBkHeight);
//     // コンテンツの更新などで高さが変わる場合は、適宜再設定する処理を追加することが推奨されます。
// });


var SIZE = 290;
var tmp = {};
loadImageToTmp(290, 233);
var lastIndex = 0;
var sections = ["box1", "box2", "box3", "box4", "box5"];
var ref = "";
var currentIndex = "";
var previousIndex = "";

function loadImageToTmp(start, end) {
    let imagesLoaded = 0;
	console.log("loadImageToTmp called with start:", start, "end:", end);
	if (start > end) {
    for (var i = start; i >= end; i--) {
        // console.log("loadImageToTmp called with start:", start, "end:", end);
        const _i = i;
        const img = new Image();
        tmp[_i] = null;
        const filename = "images/main_sp/main_sp_" + String(_i).padStart(5, '0') + ".png";
        img.src = filename;
        // console.log("Loading image:", filename);

        img.addEventListener("load", () => {
            tmp[_i] = img;
            imagesLoaded++;
            // console.log(`Image ${_i} loaded`);

            // Check if all images are loaded
            if (imagesLoaded === (start - end + 1)) {
                // console.log("All images loaded");
                startImageSwitch(start, end);
            }
        });
    }
} else {
	 for (var i = start; i <= end; i++) {
        const _i = i;
        const img = new Image();
        tmp[_i] = null;
        const filename = "images/mv_sp/mv_sp_" + String(_i).padStart(5, '0') + ".png";
        img.src = filename;

        img.addEventListener("load", () => {
            tmp[_i] = img;
            imagesLoaded++;

            // Check if all images are loaded
            if (imagesLoaded === (end - start + 1)) {
                startImageSwitch(start, end);
            }
        });
    }
}
}

function startImageSwitch(start, end) {
    let currentIndex = start;
	let interval = 18; // 初期値は20 milliseconds

    // box4 から box5 に移動する場合、もしくは box5 から box4 に移動する場合は interval を 10 に設定する
    if (start === 95 && end === 157){
        interval = 6;
		console.log("Interval set to", interval);
    }
	else if (start === 157 && end === 14){
        interval = 12;
		console.log("Interval set to", interval);
    }
    const imgElement = document.getElementById('anim_img');

    if (!imgElement) {
        console.error('Image element with id "image-display" not found.');
        return;
    }

    function switchImage() {
        if (start > end) { // Forward direction
            if (currentIndex >= end) {
                if (tmp[currentIndex]) {
                    imgElement.src = tmp[currentIndex].src;
                    // console.log(`Image switched to ${tmp[currentIndex].src}`);
                }
                currentIndex--;
                setTimeout(switchImage, interval);
            } else {
                console.log("Image switching completed");
            }
        } else { // Backward direction
            if (currentIndex <= end) {
                if (tmp[currentIndex]) {
                    imgElement.src = tmp[currentIndex].src;
                    // console.log(`Image switched to ${tmp[currentIndex].src}`);
                }
                currentIndex++;
                setTimeout(switchImage, interval);
            } else {
                console.log("Image switching completed");
            }
        }
    }
		switchImage();
}

$(document).ready(function() {
    $.scrollify({
        section: ".box",
        scrollbars: false,
        interstitialSection: "#footer",
        easing: "swing",
        scrollSpeed: 1000,
        setHeights: true,
        before: function(i, panels) {
            ref = panels[i].attr("id"); // 現在のセクションの id を取得する
            currentIndex = sections.indexOf(ref);
            previousIndex = sections.indexOf(lastIndex);

			$('a[href*="index.html#"]').click(function() {

				document.getElementById('js-nav').classList.remove('active');
				var elmHash = this.hash;
				console.log("elmHash", elmHash);
				var pos = $(elmHash).offset().top - 30;
				$('html, body').animate({scrollTop: pos}, 500);
					ref = $(elmHash).attr("id"); // 現在のセクションの id を取得する
					currentIndex = sections.indexOf(ref);
					previousIndex = sections.indexOf(lastIndex);
					console.log("クリック Current section id:", ref, "Current index:", currentIndex, "Previous index:", previousIndex);
					lastIndex = ref;
					if(previousIndex === currentIndex) {
						if (ref === "box1") {
							loadImageToTmp(289, 290);
						}
					}else {
						if (ref === "box1") {
							loadImageToTmp(233, 290);
						}
					}
					return false;
					lastIndex = 0;
					ref = "box1";
					currentIndex = 0;
					previousIndex = 0;
			});

			console.log("Current section id:", ref, "Current index:", currentIndex, "Previous index:", previousIndex);
            if(-1 === previousIndex || -1 === currentIndex) {
				if (ref === "box1") {
					loadImageToTmp(290, 289);
				} else if (ref === "box5" || ref === "footer") {
					loadImageToTmp(15, 14);
				}
            }
			else if (currentIndex > previousIndex) {
				if (ref === "box2") {
                    loadImageToTmp(290, 233);
                } else if (ref === "box3") {
                    loadImageToTmp(232, 180);
                } else if (ref === "box4") {
                    loadImageToTmp(179, 158);
                } else if (ref === "box5") {
                    loadImageToTmp(157, 14);
                }
            } else if (currentIndex < previousIndex) {
                if (ref === "box1") {
                    loadImageToTmp(233, 290);
                } else if (ref === "box2") {
                    loadImageToTmp(180, 232);
                } else if (ref === "box3") {
                    loadImageToTmp(158, 179);
                } else if (ref === "box4") {
                    loadImageToTmp(95, 157);
                }
            }

			lastIndex = ref;
        },
    });

    $('html, body').animate({ scrollTop: $(document).height() }, 100, function() {
        $.scrollify.move("#Area1");
    });
});


// 初回呼び出しを記録するフラグ
let isFirstCall = true;

// 背景要素の高さを調整する関数
function setBkHeight() {
    // .contents 要素の高さを取得
    var contentHeight = document.querySelector('.contents').offsetHeight;

    // 初回呼び出しの場合、高さに 700px を足す
    if (isFirstCall) {
        contentHeight += 700;
        isFirstCall = false; // フラグを false に設定して、次回からは通常の高さを使用
    }

    // .bk 要素の高さを .contents 要素の高さと同じに設定
    document.querySelectorAll('.bk').forEach(function(bk) {
        bk.style.height = contentHeight + 'px';
    });
}

// DOM が完全に読み込まれた後に setBkHeight 関数を呼び出す
document.addEventListener('DOMContentLoaded', function() {
    setBkHeight();
});

// ウィンドウのサイズが変更されたときに setBkHeight 関数を呼び出す
window.addEventListener('resize', setBkHeight);

// $('a[href*="index.html#"]').click(function() {

// 	document.getElementById('js-nav').classList.remove('active');
// 	var elmHash = this.hash;
// 	console.log("elmHash", elmHash);
// 	var pos = $(elmHash).offset().top - 30;
// 	$('html, body').animate({scrollTop: pos}, 500);
// 		ref = $(elmHash).attr("id"); // 現在のセクションの id を取得する
// 		currentIndex = sections.indexOf(ref);
// 		previousIndex = sections.indexOf(lastIndex);
// 		console.log("クリック Current section id:", ref, "Current index:", currentIndex, "Previous index:", previousIndex);
// 		lastIndex = ref;
// 		if(previousIndex === currentIndex) {
// 			if (ref === "box1") {
// 				lastIndex = 0;
// 				previousIndex = 0;
// 				ref = "box1";
// 				console.log("クリック1 Current section id:", ref, "Current index:", currentIndex, "Previous index:", previousIndex);
// 				loadImageToTmp(289, 290);
// 			}
// 		}
// 		else if (currentIndex > previousIndex) {
// 			if (ref === "box2") {
// 				loadImageToTmp(290, 233);
// 			} else if (ref === "box3") {
// 				loadImageToTmp(232, 180);
// 			} else if (ref === "box4") {
// 				loadImageToTmp(179, 158);
// 			} else if (ref === "box5") {
// 				loadImageToTmp(157, 14);
// 			}
// 		} else if (currentIndex < previousIndex) {
// 			if (ref === "box1") {
// 				lastIndex = 0;
// 				previousIndex = 0;
// 				ref = "box1";
// 				console.log("クリック1 Current section id:", ref, "Current index:", currentIndex, "Previous index:", previousIndex);
// 				loadImageToTmp(233, 290);
// 			}
// 		}
// 	lastIndex = 0;
// 	previousIndex = 0;
// 	ref = "box1";
// 	return false;
// });



// 最下部スクロール
// $.scrollify({
// 	section : ".box",//1ページスクロールさせたいエリアクラス名
// 	scrollbars:"false",//スクロールバー表示・非表示設定
// 	interstitialSection : "#header,#footer",//ヘッダーフッターを認識し、1ページスクロールさせず表示されるように設定
// 	easing: "swing", // 他にもlinearやeaseOutExpoといったjQueryのeasing指定可能
// 	  scrollSpeed: 1000, // スクロール時の速度
// 	  setHeights: true, // 要素の高さをwindowの高さに合わせるかどうか

// 	//以下、ページネーション設定
// 	before:function(i,panels) {
// 	  var ref = panels[i].attr("data-section-name");
// 		$(".pagination .active").removeClass("active");
// 		$(".pagination").find("a[href=\"#" + ref + "\"]").addClass("active");
// 	  },
// 	  afterRender:function() {
// 		var pagination = "<ul class=\"pagination\">";
// 		var activeClass = "";
// 		$(".box").each(function(i) {//1ページスクロールさせたいエリアクラス名を指定
// 		  activeClass = "";
// 		  if(i===$.scrollify.currentIndex()) {
// 			activeClass = "active";
// 		  }
// 		//   pagination += "<li><a class=\"" + activeClass + "\" href=\"#" + $(this).attr("data-section-name") + "\"><span class=\"hover-text\">" + $(this).attr("data-section-name").charAt(0).toUpperCase() + $(this).attr("data-section-name").slice(1) + "</span></a></li>";
// 		});
// 		// pagination += "</ul>";

// 		$("#box1").append(pagination);//はじめのエリアにページネーションを表示
// 		$(".pagination a").on("click",$.scrollify.move);
// 	  }

// 	});


// const sectionIds = ['top', 'thema', 'event', 'opencampus', 'access', 'ask'];
// let currentIndex = sectionIds.length - 1; // 最後のセクションから開始
// let isScrolling = false;

// function scrollToSection(index) {
//   if (index >= 0 && index < sectionIds.length) {
// 	const section = document.getElementById(sectionIds[index]);
// 	section.scrollIntoView({ behavior: 'smooth', block: 'center' });
// 	currentIndex = index;
// 	isScrolling = true;

// 	setTimeout(() => {
// 	  isScrolling = false;
// 	}, 1000); // スクロールの完了を待つ時間を設定
//   }
// }

// window.onload = function() {
//   // ページ読み込み後に短い遅延を置いて一番下までスクロール
//   setTimeout(function() {
// 	window.scrollTo(0, document.body.scrollHeight);
//   }, 600);
// };

//   // loadings_animation
//   const spinner = document.getElementById('loading');
//   if (spinner) { // spinnerがnullでないか確認
// 	spinner.classList.add('loaded');
//   }
// };

// window.addEventListener('scroll', () => {
//   if (isScrolling) return;

//   const currentSection = document.getElementById(sectionIds[currentIndex]);
//   const currentSectionBottom = currentSection.getBoundingClientRect().bottom + window.scrollY;
//   const currentSectionTop = currentSection.getBoundingClientRect().top + window.scrollY;

//   if (window.scrollY + window.innerHeight >= currentSectionBottom - 20) {
// 	window.scrollTo(0, sectionIds[currentIndex + 1]);
//   } else if (window.scrollY <= currentSectionTop + 20) {
// 	window.scrollTo(0, sectionIds[currentIndex - 1]);
//   }
// });

// document.addEventListener('DOMContentLoaded', () => {
//   // 初期状態ではスクロールしない
//   // scrollToSection(currentIndex);
// });

// setInterval(function() {
//     window.scrollBy(0, -window.innerHeight);
// }, 7000);


// ハンバーガーメニュー
const ham = document.querySelector('#js-hamburger');
const nav = document.querySelector('#js-nav');


document.getElementById('js-hamburger').addEventListener('click',function() {
document.getElementById('js-nav').classList.toggle('active');
});

// メニューからスクロール
// $('a[href*="index.html#"]').click(function () {
// 	document.getElementById('js-nav').classList.remove('active');
// 	var elmHash = this.hash; //ページ内リンクのHTMLタグhrefから、リンクされているエリアidの値を取得
// 	console.log("elmHash", elmHash);
// 	var pos = $(elmHash).offset().top - 30;  //idの上部の距離を取得
// 	$('html, body').animate({scrollTop: pos}, 500); //取得した位置にスクロール。500の数値が大きくなるほどゆっくりスクロール
// 	return false;
// });


// スクロールでpng画像差し替え
// var SIZE = 280;

// var tmp = {};
// 	loadImageToTmp();
// 	function loadImageToTmp(){
// 		for(var i=10;i<=280;i++){
// 			const _i = i;
// 			const img = new Image();
// 			tmp[_i] = null;
// 			// img.src = "anim/hamoni_sp ("+_i+").png";
// 			const filename = "images/main_sp/main_sp_" + String(_i).padStart(5, '0') + ".png";
// 			img.src = filename;
// 			img.addEventListener("load",()=>{
// 				tmp[_i] = img;
// 			})
// 		}
// 	}


// const image = document.getElementById("anim_img");

// var SIZE = 280;

// const PX = 6; // 5px分の移動ごと画像を1枚進める
// const offset = $("#anim_img_box").offset(); // 画像を入れるdiv要素(position:stickyでトップに来たら固定される)
// 	$(window).scroll(function() {
// 		const y = $(window).scrollTop();
// 		const dy = y - offset.top;
// 		if(offset.top<y&&y<offset.top+SIZE*PX){
// 			$("#anim_img_box").css("top",0)
// 			const i = Math.floor(dy / PX);
// 			if(i<=10||i>=SIZE) return;
// 			if(tmp[i].src) image.src = tmp[i].src;
// 		}else if(y>=offset.top+SIZE*PX){
// 			$("#anim_img_box").css("top","-"+(dy-SIZE*PX)); // スクロール分が終了したときに移動を始める
// 		}
// 	});

// $("#anim_img_padding").height(SIZE*4.2);


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
