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

let number1 = document.getElementById('number1')
let number2 = document.getElementById('number2')
let number3 = document.getElementById('number3')
let number4 = document.getElementById('number4')

let randomNumbers = [getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber()]
number1.innerHTML = randomNumbers[0]
number2.innerHTML = randomNumbers[1]
number3.innerHTML = randomNumbers[2]
number4.innerHTML = randomNumbers[3]
var trueAnswers = 0;
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
    trueAnswers++
    console.log(trueAnswers)
    if (trueAnswers == 4) {
      let show = () => {
        let message = document.getElementById('message')
        message.classList.remove('d-none')
        document.getElementById('result-message').innerHTML = 'Siz yutdingiz!';
      }
      setTimeout(show(), 3000);
    }
  }
  else {
    let message = document.getElementById('message')
    message.classList.remove('d-none')
    document.getElementById('result-message').innerHTML = 'Siz yutqazdingiz!';
    document.getElementById('result-box').style.backgroundColor = '#DC3545'
  }
}

function reload() {
  window.location.reload(true)
}

