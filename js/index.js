let bgmusic = document.getElementById('bgmusic')

function start() {
  bgmusic.play();
  let timer = document.getElementById('timer');
  timer.innerHTML = 5;
  let period = 4;
  let my_timer = setInterval(function () {
    timer.innerHTML = period;
    period--;
    if (period <= -1) {
      clearInterval(my_timer)
      let cards_front = document.getElementsByClassName('front')
      let cards_back = document.getElementsByClassName('back')
      for (let i = 0; i < cards_front.length; i++) {
        cards_front[i].style.transform = 'rotateY(180deg)';
        cards_back[i].style.transform = 'rotateY(360deg)';
      }
    }
  }, 1000)
  let title = document.getElementById('title').classList.add('d-none');
  let cards = document.getElementById('cards').classList.remove('d-none');
  createCards();
}

const volumeControl = () => {
  let volumeIcon = document.getElementById('volumeButton').children[0]
  if (volumeIcon.classList.contains('fa-volume-up')) {
    volumeIcon.classList.remove('fa-volume-up')
    volumeIcon.classList.add('fa-volume-mute')
    bgmusic.pause()
  }
  else {
    volumeIcon.classList.remove('fa-volume-mute')
    volumeIcon.classList.add('fa-volume-up')
    bgmusic.play()
  }
}

function getRandomNumber(min = 1, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let randomNumbers = [];
let cardAmount = 4;
var trueAnswers = 0;

function createCards() {
  let card_list = document.getElementById('cards');

  for (let i = 0; i < cardAmount; i++) {
    let num = getRandomNumber();
    randomNumbers.push(num);
    card_list.innerHTML +=
      `<div class="col-md-2 col-sm-6 col-6 px-2">
      <div class="myCard">
        <div class="front"><span id="number${i}">${randomNumbers[i]}</span></div>
        <div class="back" onclick="choice(event)"></div>
      </div>
    </div>`
  }
}

function choice(event) {
  let sorted = [...randomNumbers].sort((a, b) => a - b);
  let back = event.target;
  let front = back.previousElementSibling;
  back.style.transform = 'rotateY(180deg)';
  front.style.transform = 'rotateY(0deg)';
  let valueToCheck = parseInt(back.parentElement.innerText);
  if (valueToCheck === sorted[0]) {
    let myIndex = randomNumbers.indexOf(sorted[0])
    if (myIndex !== -1) {
      randomNumbers.splice(myIndex, 1);
    }
    trueAnswers++;
    console.log(trueAnswers)
    if (trueAnswers == cardAmount) {
      setTimeout(function () { showMessage('Siz yutdingiz!', 'rgba(25, 135, 84, 0.8)', 'fa-play', 'nextLevel()') }, 1000);
    }
  }
  else {
    setTimeout(function () { showMessage('Siz yutqazdingiz!', '#dc3848cc', 'fa-refresh', 'reload()') }, 1000);
  }
}

let showMessage = (text, bgColor, buttonIcon, callback) => {
  let message = document.getElementById('message')
  message.classList.remove('d-none')
  document.getElementById('result-message').innerHTML = `${text}`;
  document.getElementById('result-box').style.backgroundColor = `${bgColor}`
  let btn = document.getElementById('messageButton');
  btn.classList.add(buttonIcon);
  btn.setAttribute('onclick', `${callback}`);
}

function reload() {
  window.location.reload(true)
}

