// document.addEventListener("DOMContentLoaded", function() {
//     // img要素のsrc属性を変更
//     var imgElement = document.querySelector('img#shutter-video');
//     if (imgElement) {
//         imgElement.src = 'images/mv_opening.png';
//     }

//     // div要素にクラスを追加
//     var divElement = document.querySelector('div.shutter');
//     if (divElement) {
//         divElement.classList.add('shutter-up');
//     }
// });



var SIZE = 290;
var tmp = {};
loadImageToTmp(289, 290);
var ref = "box1";
var currentIndex = "";
var previousIndex = "";

function loadImageToTmp(start, end) {
    let imagesLoaded = 0;
	if (start > end) {
    for (var i = start; i >= end; i--) {

        const _i = i;
        const img = new Image();
        tmp[_i] = null;
        const filename = "images/mv_sp//mv_sp_" + String(_i).padStart(5, '0') + ".png";
        img.src = filename;

        img.addEventListener("load", () => {
            tmp[_i] = img;
            imagesLoaded++;

            if (imagesLoaded === (start - end + 1)) {
                startImageSwitch(start, end);
            }
        });
    }
} else {
	 for (var i = start; i <= end; i++) {
        const _i = i;
        const img = new Image();
        tmp[_i] = null;
        const filename = "images/mv_sp//mv_sp_" + String(_i).padStart(5, '0') + ".png";
        img.src = filename;

        img.addEventListener("load", () => {
            tmp[_i] = img;
            imagesLoaded++;

            if (imagesLoaded === (end - start + 1)) {
                startImageSwitch(start, end);
            }
        });
    }
}
}

function startImageSwitch(start, end) {
    let currentIndex = start;
	let interval = 15;

    if (start === 95 && end === 157){
        interval = 5;
    }
	else if (start === 157 && end === 14){
        interval = 8;
    }
    const imgElement = document.getElementById('anim_img');

    if (!imgElement) {
        console.error('Image element with id "image-display" not found.');
        return;
    }

    function switchImage() {
        if (start > end) {
            if (currentIndex >= end) {
                if (tmp[currentIndex]) {
                    imgElement.src = tmp[currentIndex].src;
                }
                currentIndex--;
                setTimeout(switchImage, interval);
            } else {
                // console.log("Image switching completed");
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
                // console.log("Image switching completed");
            }
        }
    }
		switchImage();
}


$(document).ready(function() {
	var lastIndex = 0;
	var sections = ["box1", "box2", "box3", "box4", "box5", "footer"];
	$.scrollify.move("#box1");

	$('a[href*="#"]').on('click', function() {
	  // panelsを取得
	//   window.scrollTo(0, document.body.scrollHeight);
	  var panels = $.map($(".box").add("#footer"), function(element) {
		return $(element);
		});

	  // before関数を手動で呼び出す
	//   beforeScrollify(5, panels);
	//   lastIndex = "box1";

	  document.getElementById('js-nav').classList.remove('active');
	  var elmHash = this.hash; //ページ内リンクのHTMLタグhrefから、リンクされているエリアidの値を取得
	  var pos = $(elmHash).offset().top;  //idの上部の距離を取得
	  $('html, body').animate({scrollTop: pos}, 500);
	});

    $.scrollify({
        section: ".box",
        scrollbars: true,
        interstitialSection: "#footer",
        easing: "swing",
        scrollSpeed: 1000,
        setHeights: true,
		before: beforeScrollify,
	});
	function beforeScrollify(i, panels) {
		ref =$(panels[i]).attr("id");// 現在のセクションの id を取得する
		currentIndex = sections.indexOf(ref);
		previousIndex = sections.indexOf(lastIndex);

		if(-1 === previousIndex || -1 === currentIndex) {
			if (ref === "box1") {
				loadImageToTmp(290, 289);
			} else if (ref === "box5" || ref === "footer") {
				loadImageToTmp(15, 14);
			}else if (ref === "box2") {
				loadImageToTmp(290, 233);
			}
		}
		else if (currentIndex > previousIndex) {
			if (ref === "box1") {
				loadImageToTmp(290, 289);
			}else if (ref === "box2") {
				loadImageToTmp(290, 233);
			} else if (ref === "box3") {
				loadImageToTmp(232, 180);
			} else if (ref === "box4") {
				loadImageToTmp(179, 158);
			} else if (ref === "box5"){
				loadImageToTmp(157, 14);
			}else if (ref === "footer") {
				loadImageToTmp(15, 14);
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
		setBkHeightForBoxes();
	}
});

function setBkHeightForBoxes() {
    var box1Height = document.querySelector('#box1').scrollHeight;
    var box2Height = document.querySelector('#box2').scrollHeight;
	var box3Height = document.querySelector('#box3').scrollHeight;
	var box4Height = document.querySelector('#box4').scrollHeight;
	var box5Height = document.querySelector('#box5').scrollHeight;

    document.querySelectorAll('.bk').forEach(function(bk) {
        bk.style.height = box1Height + box2Height + box3Height + box4Height + box5Height + 'px';
    });
}
window.addEventListener('load', setBkHeightForBoxes);

window.addEventListener('resize', setBkHeightForBoxes);
