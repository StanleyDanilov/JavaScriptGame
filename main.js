window.addEventListener('load', () => {

  let showTime = document.querySelector('.show-time');
  let gameScore = document.querySelector('.game-score-number');
  let gameField = document.querySelector('.game-field');
  let btnBegin = document.querySelector('.btn-begin-dis');

  let inputTime = document.querySelector('.form-input');
  let confirmBtn = document.querySelector('.btn-submit');
  let cancelBtn = document.querySelector('.btn-cancel');
  let scoreTable = document.querySelector('.score-table');
  let newGameBtn = document.querySelector('.btn-new-game');

  let scoreCount = 0; // вставить в таймаут

  confirmBtn.addEventListener('click', e => {
    e.preventDefault();

    showTime.innerHTML = `Time is ${inputTime.value} sec`;

    inputTime.toggleAttribute('disabled');
    confirmBtn.toggleAttribute('disabled');
    cancelBtn.toggleAttribute('disabled');

    btnBegin.toggleAttribute('disabled');
    btnBegin.classList.toggle('btn-after-disable');
  });

  if (!(cancelBtn.getAttribute("disabled") == 'disabled')) {
    cancelBtn.addEventListener('click', e => {
    e.preventDefault();

    showTime.innerHTML = 'You need to set the time.';
    inputTime.toggleAttribute('disabled');
    confirmBtn.toggleAttribute('disabled');
    cancelBtn.toggleAttribute('disabled');

    btnBegin.toggleAttribute('disabled');
    btnBegin.classList.toggle('btn-after-disable');
    });
  };

  btnBegin.addEventListener('click', function() {
    btnBegin.classList.toggle('hide-item');
    gameField.style.background = '#fff';
    let gameTime = inputTime.value;
    
    createTarget();

    // let timeCount = setInterval(function() {
    //   showTime.innerHTML = `${gameTime--} sec left`;
    //   if (gameTime < 0) { clearInterval(timeCount) }
    // }, 1000);

    //чекнуть у Минина =====================================================================================

    let timeCount = function() {
      showTime.innerHTML = `${gameTime--} sec left`;
      if (gameTime < 0) {
        clearInterval(startTimer);
        document.querySelector('.game-target').remove();
        gameField.removeAttribute('style');
        scoreTable.classList.toggle('hide-item');
        scoreTable.innerHTML = `Time left. <br> Your score is ${scoreCount}`;
        newGameBtn.classList.toggle('hide-item');
        newGameBtn.classList.toggle('btn-after-disable');
        cancelBtn.toggleAttribute('disabled');
      }
    };

    timeCount();

    let startTimer = setInterval(timeCount, 1000);

    cancelBtn.addEventListener('click', () => {
      clearInterval(startTimer);
      document.querySelector('.game-target').remove();
      gameField.removeAttribute('style');
      btnBegin.classList.toggle('hide-item');
      gameScore.innerHTML = 0;
    });

  });

  gameField.addEventListener('click', e => {
    if (e.target.classList.contains('game-target')) {
      scoreCount++;
      gameScore.innerHTML = scoreCount;
      gameField.removeChild(e.target);
      createTarget();
    };
  });

  newGameBtn.addEventListener('click', () => {
    scoreTable.classList.toggle('hide-item');
    newGameBtn.classList.toggle('hide-item');
    showTime.innerHTML = 'You need to set the time.';
    inputTime.toggleAttribute('disabled');
    confirmBtn.toggleAttribute('disabled');
    btnBegin.classList.toggle('hide-item');
    btnBegin.classList.remove('btn-after-disable');
    btnBegin.toggleAttribute('disabled');
    scoreCount = 0;
    gameScore.innerHTML = scoreCount;
  })

  function createTarget() {
    let fieldWidth = gameField.getBoundingClientRect().width;
    let fieldHeight = gameField.getBoundingClientRect().height;
    let gameTarget = document.createElement('div');
    let targetBorderRadius = ['0%', '50%'];
    let targetSize = Math.floor((Math.random() * 40) + 30);

    gameTarget.classList.add('game-target');
    gameTarget.style.backgroundColor = getRandomColor();
    gameTarget.style.width = gameTarget.style.height = targetSize + 'px';
    gameTarget.style.borderRadius = targetBorderRadius[Math.round(Math.random())];
    gameTarget.style.top = (Math.floor(Math.random() * (fieldHeight - targetSize))) + 'px';
    gameTarget.style.left = (Math.floor(Math.random() * (fieldWidth - targetSize))) + 'px';

    gameField.insertAdjacentElement('afterbegin', gameTarget);
  };

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    };
    return color;
  };

});


