window.addEventListener('load', () => {

  let btnBegin = document.querySelector('.btn-begin');
  let gameField = document.querySelector('.game-field');
  let inputTime = document.querySelector('.form-input');
  let gameScore = document.querySelector('.game-score-number');
  let fieldWidth = gameField.getBoundingClientRect().width;
  let fieldHeight = gameField.getBoundingClientRect().height;
  let scoreCount = 0;
  
  inputTime.addEventListener('input', () => {
    document.querySelector('.show-time').innerHTML = inputTime.value;
  });

  btnBegin.addEventListener('click', () => {
    btnBegin.classList.add('hide-item');
    gameField.style.background = '#fff';
    
    createTarget();

    setTimeout(function() {
      btnBegin.classList.remove('hide-item');
    }, inputTime.value);
  });

  if (btnBegin.classList.contains('hide-item')) {

    gameField.addEventListener('click', e => {
      if (e.target.classList.contains('game-target')) {
        scoreCount++;
        gameScore.innerHTML = scoreCount;
        gameField.removeChild(e.target);
        createTarget();
      };
    });
  };

  function createTarget() {
    let gameTarget = document.createElement('div');
    let targetBorderRadius = ['0%', '50%'];
    let targetSize = Math.floor((Math.random() * 50) + 35);

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


