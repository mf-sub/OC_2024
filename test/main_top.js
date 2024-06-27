
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
		console.log("loadImageToTmp called with start:", start, "end:", end);
        // console.log("loadImageToTmp called with start:", start, "end:", end);
        const _i = i;
        const img = new Image();
        tmp[_i] = null;
        const filename = "images/mv_sp//mv_sp_" + String(_i).padStart(5, '0') + ".png";
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
		console.log("loadImageToTmp called with start:", start, "end:", end);
        const _i = i;
        const img = new Image();
        tmp[_i] = null;
        const filename = "images/mv_sp//mv_sp_" + String(_i).padStart(5, '0') + ".png";
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
    }
	else if (start === 157 && end === 14){
        interval = 12;
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

	$('#menu').on('click', function() {
		console.log("box1 clicked");
	  // panelsを取得
	  window.scrollTo(0, document.body.scrollHeight);
	  var panels = $.map($(".box").add("#footer"), function(element) {
		return $(element);
		});

	  // before関数を手動で呼び出す
	  beforeScrollify(5, panels);
	  lastIndex = "box1";
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
			console.log("panels:", panels, "i", i, "Current section id:", ref, "Current index:", currentIndex, "Previous index:", previousIndex);
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
			console.log("Last index set to", lastIndex);
			setBkHeightForBoxes();
        }
    });

// box1とbox2の高さをbkに設定する関数
function setBkHeightForBoxes() {
    // box1の高さを取得
    var box1Height = document.querySelector('#box1').scrollHeight;
    var box2Height = document.querySelector('#box2').scrollHeight;
	var box3Height = document.querySelector('#box3').scrollHeight;
	var box4Height = document.querySelector('#box4').scrollHeight;
	var box5Height = document.querySelector('#box5').scrollHeight;

	// .bk 要素の高さを .contents 要素の高さと同じに設定
    document.querySelectorAll('.bk').forEach(function(bk) {
        bk.style.height = box1Height + box2Height + box3Height + box4Height + box5Height + 'px';
		// console.log("box1Height", box1Height, "box2Height", box2Height);
		console.log("bk height set to", box1Height + box2Height + box3Height + box4Height + box5Height);
    });
}
window.addEventListener('load', setBkHeightForBoxes);
// ウィンドウのサイズが変更されたときに高さを設定する関数を呼び出す
window.addEventListener('resize', setBkHeightForBoxes);
