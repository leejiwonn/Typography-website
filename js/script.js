
$(document).ready(function(){ 
  
  /* text rolling */
  
  console.clear();
  var texts = $('.text-roll-mask .text');
  var indexText = -1;
  var preIndexText;
  var rollTextTimer;
  var rollText = function() {
    if (indexText == -1 || indexText == texts.length-1 ) {
      indexText = 0;
      preIndexText = texts.length-1;
    } else {
      preIndexText = indexText;
      ++indexText;
    }
    
    texts.removeClass('rol');
    texts.parent()
      .removeClass('rol-active')
      .removeClass('rol-pre');
    
    texts.eq(indexText).addClass('rol');
    texts.eq(indexText).parent().addClass('rol-active');
    texts.eq(preIndexText).parent().addClass('rol-pre');
    
    var h = $('.text-roll-mask .rol').height();
    $('.text-roll-mask').css('height', h + 'px');
    rollTextTimer = setTimeout(rollText, 2000);
  }
  rollText();

  /* 돋보기 */

  window.onload = function(){
    var target = $('.target');
    var zoom = target.data('zoom');
  
    $(".fontBox")
      .on('mousemove', magnify)
      .prepend("<div class='magnifier'></div>")
      .children('.magnifier').css({
      "background": "url('" + target.attr("src") + "') no-repeat",
      "background-size": target.width() * zoom + "px " + target.height() * zoom+ "px"
    });
  
    var magnifier = $('.magnifier');
  
    function magnify(e) {
  
      // 마우스 위치에서 .magnify의 위치를 차감해 컨테이너에 대한 마우스 좌표를 얻는다.
      var mouseX = e.pageX - $(this).offset().left;
      var mouseY = e.pageY - $(this).offset().top;
  
      // 컨테이너 밖으로 마우스가 벗어나면 돋보기를 없앤다.
      if (mouseX < $(this).width() && mouseY < $(this).height() && mouseX > 0 && mouseY > 0) {
        magnifier.fadeIn(100);
      } else {
        magnifier.fadeOut(100);
      }
  
      //돋보기가 존재할 때
      if (magnifier.is(":visible")) {
  
        // 마우스 좌표 확대될 이미지 좌표를 일치시킨다.
        var rx = -(mouseX * zoom - magnifier.width() /2 );
        var ry = -(mouseY * zoom - magnifier.height() /2 );
  
        //돋보기를 마우스 위치에 따라 움직인다.
        //돋보기의 width, height 절반을 마우스 좌표에서 차감해 마우스와 돋보기 위치를 일치시킨다.
        var px = mouseX - magnifier.width() / 2;
        var py = mouseY - magnifier.height() / 2;
  
        //적용
        magnifier.css({
          left: px,
          top: py,
          backgroundPosition: rx + "px " + ry + "px"
        });
      }
    }
  };

  /* scroll top */

  $( window ).scroll( function() {
      if ( $( this ).scrollTop() > 0 ) {
          $( '.topUp' ).fadeIn();
      } else {
          $( '.topUp' ).fadeOut();
      }

      if ($(window).scrollTop() > 12000) {
        console.log("hide");
        $("body").stop().animate({'opacity':'0'}, 2000, 'easeOutQuint').delay(100);
        $("body").stop().animate({'background-color':'#000'}, 2000, 'easeOutQuint').delay(100);
        }
  } );

  $( '.topUp' ).click( function() {
      $( 'html, body' ).animate( { scrollTop : 0 }, 2000);
      return false;
  } );


  
});

/* scroll smooth */

var viewportWidth;
var inertia = 0;
var force = 5;
var programmaticallyScrolling = false;

function roundTo(x, roundedTo) {
  var mod = x % roundedTo;
  var over = mod > (roundedTo / 2);
  return over ? (x + roundedTo - mod) : (x - mod);
}

function resizePages() {
  viewportWidth = $('li').innerWidth();
  $('li').width(viewportWidth);
  var kludge = 8;
  $('ul').width(viewportWidth * 4 + kludge);
}

function scrollContent(ev) {
  if (programmaticallyScrolling) {
    return;
  }
  // allow a human to interupt
  inertia = 0;
}

function gravitate() {
  var $content = $('.content');
  var currScroll = $content.scrollLeft();
  var gravitateTo = roundTo(currScroll, viewportWidth + 3);

  if (currScroll !== gravitateTo) {
    var dir = currScroll < gravitateTo ? 1 : -1;
    var whereToNext = currScroll + inertia + (dir * force);
    whereToNext = dir === 1 ?
      Math.min(whereToNext, gravitateTo) :
      Math.max(whereToNext, gravitateTo);

    programmaticallyScrolling = true;
    $content.scrollLeft(whereToNext);
    programmaticallyScrolling = false;

    inertia += dir;
  } else {
    inertia = 0;
  }
}

function frame(time) {
  gravitate();
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

$(function() {
  $(window).resize(resizePages);
  $('.content').scroll(scrollContent);
  resizePages();
});

var detail = document.querySelectorAll('#p4-1 img');

var oneInterval = setInterval(function(){
  for(var i = 0; i < detail.length; i++){
    TweenMax.to(detail[i], 0.2, {transform: "scale(1.1)"}, { ease: Elastic.easeOut.config(1, 0.3), y: -500 }).delay(0.5);
      TweenMax.to(detail[i], 0.15, {transform: "scale(0.9)"}, { ease: Elastic.easeOut.config(1, 0.3), y: -500 }).delay(0.7);
      TweenMax.to(detail[i], 0.15, {transform: "scale(1.1)"}, { ease: Elastic.easeOut.config(1, 0.3), y: -500 }).delay(0.8);
      TweenMax.to(detail[i], 0.1, {transform: "scale(1.0)"}, { ease: Elastic.easeOut.config(1, 0.3), y: -500 }).delay(0.9);
  }
}, 2000);
