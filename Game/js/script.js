$(document).ready(function () {
 //поле   
 var size = 47;
  for( var i = 0; i < size; i++){
      var row = '<div class="row">';
      for (var j = 0; j < size; j++){
          row += '<div class="cell"></div>'
      }
      row += '</div>';
      $('.field').append(row)
  }

 //кирпичи 
  var number = 8;
  for(var q = 0; q < number; q++){
      if(q == 1){
          var box_1 = 3;
          var form_1 = 27;
          for(var w = 0; w < box_1; w++ ){
              var wall_1 = '<div class="box1 wall__item  wall-'+w+'">';
              for(var e = 0; e < form_1; e++){
                  wall_1 += '<div class="form"></div>'
              }
           wall_1 += '</div>';
           $('.walls').append(wall_1)
          }
      }

      if(q == 2){
          var box_2 = 9;
          var form_2 = 9;
          for(var r = 3; r < box_2; r++){
              var wall_2 = '<div class="wall__item box2 wall-'+ r +'">';
              for(var t = 0; t < form_2; t++){
                  wall_2 += '<div class="form"></div>'
              }
           wall_2 += '</div>';
           $('.walls').append(wall_2)
          }
      }

      if(q == 3){
          var box_3 = 12;
          var form_3 = 10;
          for(var y = 9; y < box_3; y++){
              var wall_3 = '<div class="wall__item box3 wall-'+y+'">';
              for(var u = 0; u < form_3; u++ ){
                  wall_3 += '<div class="form"></div>'
              }
              wall_3 += '</div>';
              $('.walls').append(wall_3)
          }
      }

      if(q == 4){
          var box_4 = 15;
          var form_4 = 21;
          for(var o = 12; o < box_4; o++ ){
              var wall_4 = '<div class="wall__item box4 wall-'+o+'">';
              for(var p = 0; p < form_4; p++){
                  wall_4 += '<div class="form"></div>'
              }
              wall_4 += '</div>';
              $('.walls').append(wall_4)
          }
      }

      if(q == 5){
          var box_5 = 17;
          var form_5 = 45;
          for(var a = 15; a < box_5; a++){
              var wall_5 = '<div class="wall__item box5 wall-'+a+'">';
              for(var s = 0; s < form_5; s++){
                  wall_5 += '<div class="form"></div>'
              }
              wall_5 += '</div>';
              $('.walls').append(wall_5)
          }
      }

      if(q == 6){
          var box_6 = 21;
          var form_6 = 18;
          for(var d = 17; d < box_6; d++){
              var wall_6 = '<div class="wall__item box6 wall-'+d+'">';
              for(var f = 0; f < form_6; f++){
                  wall_6 += '<div class="form"></div> '
              }
              wall_6 += '</div>';
              $('.walls').append(wall_6)
          }
      }

      if(q == 7) {
          var box_7 = 25;
          var form_7 = 14;
          var form_8 = 5;
          var form_9 = 36;
          var form_10 = 8;
          for (var m = 21; m < box_7; m++) {
              var wall_7 = '<div class=" wall__item box7 wall-' + m + ' ">';
              if (m == 21) {
                  for (var n = 0; n < form_7; n++) {
                      wall_7 += '<div class="form"></div>'
                  }
              }
              if (m == 22) {
                  for (var l = 0; l < form_8; l++) {
                      wall_7 += '<div class="form"></div>'
                  }
              }
              if (m == 23) {
                  for (var g = 0; g < form_9; g++) {
                      wall_7 += '<div class="form"></div>'
                  }
              }
              if (m == 24) {
                  for (var h = 0; h < form_10; h++) {
                      wall_7 += '<div class="form"></div>'
                  }
              }
              wall_7 += '</div>';
              $('.walls').append(wall_7)
          }
      }
  }




    var cellActive = [3,0];


    var goLeft = function () {
        if(cellActive[1] > 0 ){
            cellActive[1]--;
        }
    };

    var goRight = function () {
        if(cellActive[1] < size-1){
            cellActive[1] ++;
        }
    };

    var goBottom = function () {
        if(cellActive[0] < size-2 ){
            cellActive[0]++;
        }
    };

    var goTop = function () {
        if(cellActive[0] > 3){
            cellActive[0] --;
        }
    };




    var calculation = {
        data: [],
        init:  function () {
            const _this = this;
            console.info("$('.wall__item')", $('.wall__item'));
            $('.wall__item').each(function(){
                const top = $(this).offset().top;
                const left = $(this).offset().left;
                const height = $(this).height();
                const width = $(this).width();
                calculation.data.push({
                    x: left,
                    y: top,
                    w: width,
                    h: height
                })
            })
        },

        check: (x, y) => {
        let hasNotFound = true;


    calculation.data.map(function(item){
        if (item.x <= x &&
            item.w-13 + item.x >= x &&
            item.y <= y &&
            item.y + item.h-13 >= y
        ) {
            hasNotFound = false;
            return false
        }
    });
    return hasNotFound;
}
};


    var showStep = function () {
        $('.cell-active').removeClass('cell-active');
        $('.row').eq(cellActive[0]).find('.cell').
        eq(cellActive[1]).addClass('cell-active');
    };
    $(document).bind('keydown', function (e) {
        const position = $('.cell-active').offset();
        const x = position.left;
        const y = position.top;
        switch(e.keyCode){
            case 37:
                if(calculation.check(x-13,y ) ){
            
                    goLeft();
                }
                e.preventDefault();
                break;
            case 38:
                if (calculation.check(x, y-13)) {
                    goTop();
                }
                e.preventDefault();
                break;
            case 39:
                if (calculation.check(x+13, y)) {
                    goRight();
                }
                e.preventDefault();
                break;
            case 40:
                if (calculation.check(x, y+13)) {
                    goBottom();
                }

                e.preventDefault();
                break;
        }
        showStep();
        var kvadrat1 = $('.cell-active').position().left;
        console.info(kvadrat1);
        var kvadrat2 = $('.cell-active').position().top;
        console.info(kvadrat2);
    });
    showStep();

$('.cell-active').css('background-color', 'black');

$('.game-start').click( function () {
    $('.circle').fadeOut();
    $('.el').fadeIn();
    $('.cell-active').fadeIn();
    $('.title-big').fadeOut();
    $('.game-play').fadeIn();
    goRight();
    showStep()


});

    var time = 10;
    var pause = false;
    var score = 0;

    var gameOut = function () {
        $('.circle').fadeIn();
        $('.el').fadeOut();
        $('.title-big').fadeIn();
        $('.game-play').fadeOut();
        $('.cell-active').css('background-color', 'black');

    };


    var drawCircle = function (circle) {
      var left_position = Math.floor(Math.random()*48)*13;
      var top_position = Math.floor(Math.random()*48)*13;
        circle.css({
            left: left_position,
            top: top_position
        });



        let step = function(circle, left, top){

            let position = $('.cell-active').position();


            if(left === position.left && (top+49) === position.top){
                score++;
                $('.game-score').text('Score: '+score);
                circle.remove();
            }else{

                setTimeout(function () {
                    step(circle, left, top)
                },10)
            }

        };

        setTimeout(function () {
            step(circle, left_position, top_position)
        },10)


    };

   var startTime = function () {
       $('.game-time').text(time);
       if( time > 0 || pause) {
           setTimeout(function () {
               time--;
               $('.game-time').text(time);
               let circle = $('<div class="kvadrat"></div>');
               drawCircle(circle);
               $('.game-play').append(circle);
               startTime()
           }, 1000);
       }    else{
               gameOut();
           }
       };





    $('.circle-play').click(function () {
        $('.game-start').fadeIn();
        $('.game-play').fadeIn();
        $('.score-end').fadeOut();
        $('.game-score').fadeIn();
        $('.pause').fadeIn();
        $('.game-time').fadeIn();
        if(!pause) {
            time = 60;
            score = 0;
            $('.game-score').text(score);
        }
        setTimeout(function(){
            calculation.init()

        }, 1000);
        startTime();
        pause = false;
    });

    $('.circle-again').click(function () {
        $('.kvadrat').remove();
        $('.game-start').fadeOut();
        $('.game-play').fadeIn();
        $('.score-end').fadeOut();
        $('.game-end').fadeOut();
        $('.game-score').fadeIn();
        $('.el').fadeIn();
        $('.game-time').fadeIn();
        $('.pause').fadeIn();
        if(!pause) {
            time = 60;
            score = 0;
            $('.game-score').text(score);

        }
        if( time == 0 ){
            gameOut()
        }

        startTime();
        pause = false;
    });

    $('.pause').click(function () {
        $('.circle').fadeIn();
        $('.el').fadeOut();
        $('.title-big').fadeIn();
        $('.pause').fadeOut();
        $('.game-time').fadeOut();
        $('.game-score').fadeOut();
        $('.score-end').fadeIn();
        $('.cell-active').css('background-color', 'black');
        pause = true;

    });

});

