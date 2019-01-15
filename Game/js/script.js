$(document).ready(function() {
  var size = 10;
  var cell = 6;
  var score = 0;
  var time = 59;
  var hp = 100;

  for (var i = 0; i < cell; i++) {
    var row = '<div class="row">';
    for (var j = 0; j < size; j++) {
      row += '<div class="cell"></div>';
    }
    row += '</div>';
    $('.game-grid').append(row);
  }

  var gameOver = function() {
    $('.game-end').fadeIn();
    $('.game-start').fadeOut();
    $('.game-play').fadeOut();
    $('.score-title-value').text(score);
    $('.elf').remove();
  };

  $('.button-play').click(function() {
    $('.game-start').fadeOut();
    $('.game-end').fadeOut();
    $('.game-play').fadeIn();

    hp = 100;
    $('.game-hp').text(hp);

    start();
    time = 59;
    score = 0;
  });

  var position = [5, 0];

  var goLeft = function() {
    if (position[1] > 0) {
      position[1]--;
    }
  };

  var goRigth = function() {
    if (position[1] < size - 1) {
      position[1]++;
    }
  };

  var goTop = function() {
    if (position[0] > 0) {
      position[0]--;
    }
  };

  var goBottom = function() {
    if (position[0] < cell - 1) {
      position[0]++;
    }
  };

  var pressAtack = false;
  var pressDef = false;

  var showStep = function() {
    $('.cell--active').removeClass('cell--active');
    $('.cell--active').text('');
    $('.row')
      .eq(position[0])
      .find('.cell')
      .eq(position[1])
      .addClass('cell--active');
  };

  $(document).bind('keydown', function(e) {
    switch (e.keyCode) {
      case 37: // left
        goLeft();
        break;
      case 38: // top
        goTop();
        break;
      case 39: // right
        goRigth();
        break;
      case 40: // bottom
        goBottom();
        break;
      case 88:
        pressAtack = true;
        break;
      case 90:
        pressDef = true;
        break;
    }
    showStep();
  });

  $(document).bind('keyup', function(e) {
    switch (e.keyCode) {
      case 88:
        pressAtack = false;
        break;
      case 90:
        pressDef = false;
        break;
    }
    showStep();
  });
  showStep();

  var start = function() {
    $('.game-timer').text();

    if (time > 0) {
      setTimeout(function() {
        time--;
        $('.game-timer').text();

        var elf = $('<div class="elf"></div>');
        $('.game-play').append(elf);
        drawElf(elf);
        start();
      }, 2000);
    } else {
      gameOver();
    }
  };

  var fight = function(elf) {
    var hp = parseInt($('.game-hp').text());
    if (!pressDef && !pressAtack) {
      hp -= 20;
      $('.game-hp').text(hp + 'HP');
      if (hp < 0) {
        time = 0;
        gameOver();
      }
    }
    if (pressAtack) {
      elf.remove();
    }
  };

  var drawElf = function(elf) {
    var left_position = 9;
    var top_position = Math.ceil(Math.random() * 5) * 80;

    elf.css({
      left: left_position * 80,
      top: top_position
    });
    
    var step = function(elf, left, top) {
      if (elf.length > 0) {
        left--;
        var offset = $('.cell--active').offset();
        $('.cell--active').text();
        if (left < 0) {
          elf.remove();
        } else {
          if (
            (left + 1) * 80 - offset.left > -150 &&
            (left + 1) * 80 - offset.left < -60 &&
            offset.top - top === 80
          ) {
            fight(elf);
            left++;
          } else {
            elf.animate(
              {
                left: left * 80
              },
              100
            );
            elf.text();
          }
        }

        setTimeout(function() {
          step(elf, left, top);
        }, 1000);
      }
    };
    setTimeout(function() {
      step(elf, left_position, top_position);
    }, 1000);

  
  };
});
