let bgmusic = document.getElementById('bgmusic');
let firstStep = true;
let randomNumbers = [];
let cardAmount = 3;
var trueAnswers = 0;
let chance = 4;
let level = 1;
document.getElementById('level').innerHTML = level;

function start() {
  let volumeIcon = document.getElementById('volumeButton').children[0]
  if (volumeIcon.classList.contains('fa-volume-up')) bgmusic.play()
  else bgmusic.pause()
  document.getElementById('message').classList.add('d-none')
  timeControl();
  let title = document.getElementById('title').classList.add('d-none');
  let cards = document.getElementById('cards').classList.remove('d-none');
  createCards(cardAmount);
  chance--;
  document.getElementById('chance').innerHTML = chance;
  console.log(chance)
}

function timeControl(time = 5) {
  let timer = document.getElementById('timer');
  timer.innerHTML = time;
  let period = time - 1;
  timer.removeAttribute('onclick')
  let my_timer = setInterval(function () {
    timer.innerHTML = period;
    period--;
    if (period <= -1) {
      clearInterval(my_timer)
      if (chance > 0) timer.setAttribute('onclick', 'start()');
      timer.innerHTML = `<i class="fa fa-refresh" aria-hidden="true"></i>`;
      let cards_front = document.getElementsByClassName('front')
      let cards_back = document.getElementsByClassName('back')
      for (let i = 0; i < cards_front.length; i++) {
        cards_front[i].style.transform = 'rotateY(180deg)';
        cards_back[i].style.transform = 'rotateY(360deg)';
      }
    }
  }, 1000)
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

function createCards(cardAmount) {
  let card_list = document.getElementById('cards');
  randomNumbers = [];
  card_list.innerHTML = '';
  let cell = 6;
  if (cardAmount >= 5 && cardAmount <= 9) cell = 4;
  if (cardAmount > 9 ) cell = 3;
  for (let i = 0; i < cardAmount; i++) {
    let num = getRandomNumber();
    randomNumbers.push(num);
    card_list.innerHTML +=
      `<div class="col-md-2 col-sm-${cell} col-${cell} px-2">
      <div class="myCard">
        <div class="front"><span id="number${i}">${randomNumbers[i]}</span></div>
        <div class="back" onclick="choice(event)"></div>
      </div>
    </div>`
  }
}

function nextLevel() {
  document.getElementById('level').innerHTML = level;
  trueAnswers = 0
  cardAmount++;
  let message = document.getElementById('message')
  message.classList.add('d-none')
  createCards(cardAmount);
  timeControl();
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
      level++;
      setTimeout(function () { showMessage('Keyingi bosqich sizni kutmoqda!', 'rgba(25, 135, 84, 0.8)', 'fa-play', 'nextLevel()') }, 1500);
    }
  }
  else {
    bgmusic.pause();
    document.getElementById('fail').play();
    cardAmount = 3;
    trueAnswers = 0;
    let result = level;
    chance = 4;
    setTimeout(function () { showMessage(`Siz natijangiz <br>${result}-bosqich`, '#dc3848cc', 'fa-refresh', 'start()') }, 1500);
    level = 1;
    document.getElementById('level').innerHTML = level;
  }
}

let showMessage = (text, bgColor, buttonIcon, callback) => {
  let message = document.getElementById('message')
  message.classList.remove('d-none')
  document.getElementById('result-message').innerHTML = `${text}`;
  document.getElementById('result-box').style.backgroundColor = `${bgColor}`
  let btn = document.getElementById('messageButton');
  btn.className = "fa fa-3x";
  btn.classList.add(buttonIcon);
  btn.setAttribute('onclick', `${callback}`);
}

