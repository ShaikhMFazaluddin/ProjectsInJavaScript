let textGen = [
  "string", "how", "hello", "well", "what", "people", "monkey", "program", "develop", "white", 
  "back", "beach", "random", "street", "young", "world", "elder", "blue", "tangle", "frozen", "freeze", "smoke",
  "car", "road", "truck", "same", "name", "game", "honor", "wish", "perfect", "guest", "student", "teacher", 
  "school", "type", "computer", "again", "throw", "black", "sheep", "lion", "tiger", 
  "file", "animation", "paper", "person", "cat", "save", "class", "oil", "owl", 
  "cover", "power", "money", "faith", "scissors", "fall", "close", "open", "service", "customer", "length",
  "height", "document", "language", "text", "network", "web", "spider", "queen", "concept", "cloth", "mirror",
  "male", "hour", "bottle", "water", "region", "country", "story", "life", "depression",
  "unknown", "animal", "phone", "waste", "time", "stone", "space", "soul", "question", "zebra", "zinc",
  "candle", "don", "mist", "fire", "not", "work", "two", "one", "hold", "lead", "only", "fever", "too",
  "might", "mean"
];

let textDisplay = document.getElementById('displayText');
let disText = "";
let inputElement = document.getElementById('textInput');
let errorTyp = 0;
let timer = 0, timerSet = 15, correct, timeRange;
let timeDisplay = document.getElementById("timeDis");
document.onload = generateText();

function generateText() {
  errorTyp = 0;
  timer = 1;
  timerSet = 15;
  correct = 0;
  textDisplay = document.getElementById('displayText');
  inputElement.setAttribute('contenteditable', true);
  disText = "";
  inputElement.innerText = ""
  inputElement.focus();
  timeDisplay.innerText = ''

  textDisplay.innerText = '';
  for(let i = 0; i < 100; i++){
    let random = Math.floor(Math.random()*textGen.length-1)
    disText = disText.concat(textGen[random]+" ");
  }

  disText = disText.split('')
  disText.forEach(character => {
    const characterspan = document.createElement('span');
    characterspan.innerText = character;
    textDisplay.appendChild(characterspan);
  });
  timeOut(timer);
}

function timeOut(timer) {
  clearInterval(timeRange)
  timeRange = setInterval(() => {
    timeDisplay.innerText = timer;
    timer++;
  },1000);
  setTimeout(() => {
    divPop();
    calcWPM();
    clearInterval(timeRange);
  },timerSet*1000);
}

inputElement.addEventListener("input", key => {
  const charSpan = document.createElement('span');
  charSpan.innerText = key.data;

  const charArray = textDisplay.querySelectorAll('span');
  const inputArray = inputElement.innerText.split('');

  charArray.forEach((characterSpan, index) => {
    const character = inputArray[index];

    if(character === null) {
      characterSpan.classList.remove('wrong');
      characterSpan.classList.remove('correct');
    }
    else if(character === characterSpan.innerText){
      characterSpan.classList.remove('wrong');
      characterSpan.classList.add('correct');
    }
    else if(character != characterSpan.innerText && character != null){
      if(character != " " && characterSpan.innerText != ' ' && characterSpan.classList.value != 'wrong') {
        errorTyp++;
        console.log(characterSpan.classList.value)
      }
      characterSpan.classList.remove('correct');
      characterSpan.classList.add('wrong');
    }
  })
})

function divPop() {
  document.getElementById('modal-container').classList.add('active');
  document.getElementById('overlay').classList.add('active');
  inputElement.setAttribute('contenteditable', false);
}

document.getElementById('modal-close').addEventListener('click', () =>{
  generateText();
  return divClose();
})

document.getElementById('reset').addEventListener('click', () => {
  generateText();
  return divClose();
});

function divClose() {
  document.getElementById('modal-container').classList.remove('active');
  document.getElementById('overlay').classList.remove('active');
}

function calcWPM() {
  let typedWords = inputElement.innerText.length;
  let uncorrect = document.querySelectorAll('.wrong').length;
  correct = document.querySelectorAll('.correct').length;
  let time = timerSet/60;
  let rwpm = (typedWords/5)/time;
  let netwpm = ((typedWords/5)-uncorrect)/time;
  let accuracy = ( ( typedWords - errorTyp ) / typedWords ) * 100;
  
  document.getElementById('net').innerText = netwpm > 0 ? Math.round(netwpm) : 0;
  document.getElementById('raw').innerText = Math.round(rwpm);
  document.getElementById('accr').innerText = accuracy < 0 ? "Invalid" : Math.floor(accuracy)+"%";
  document.getElementById('correctW').innerText = correct;
  document.getElementById('wrongW').innerText = errorTyp;
}