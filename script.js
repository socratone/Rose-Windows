let color = 'black';
// 초기값
let canvas = document.getElementsByClassName('canvas');
let ctx = [];
ctx[0] = canvas[0].getContext('2d');
canvas[0].width = 500;
canvas[0].height = 500;
ctx[0].strokeStyle = color;
ctx[0].lineWidth = 1;

// 원점 그리기
ctx[0].beginPath();
ctx[0].arc(250, 250, 1, 0, 2 * Math.PI);
ctx[0].stroke();

// numInput을 클릭했을 때 글자가 없어진다.
const numInput = document.getElementById('numInput');
let hasClickNumInput = false;
function clickNumInput() {
  if(!hasClickNumInput) {
    numInput.value = '';
    hasClickNumInput = true;
    numInput.classList.replace('fontColorGray', 'fontColorBlack');
  } 
}
numInput.addEventListener('click', clickNumInput);

// 원지름 그리는 함수
function paintBlackStroke() {
  ctx[0].strokeStyle = 'black';
  ctx[0].stroke();
  ctx[0].strokeStyle = color;
}
function paint90Line() {
  ctx[0].beginPath();
  ctx[0].moveTo(250, 0);
  ctx[0].lineTo(250, 500);
  paintBlackStroke();
}
function paint180Line() {
  ctx[0].beginPath();
  ctx[0].moveTo(0, 250);
  ctx[0].lineTo(500, 250);
  paintBlackStroke();
}
function paint45Line() {
  ctx[0].beginPath();
  ctx[0].moveTo(0, 0);
  ctx[0].lineTo(500, 500);
  paintBlackStroke();
}
function paint135Line() {
  ctx[0].beginPath();
  ctx[0].moveTo(0, 500);
  ctx[0].lineTo(500, 0);
  paintBlackStroke();
}

function activeMirror(i) {
  mirror[i] = document.createElement('canvas');
  mirror[i].classList.add('canvas');
  canvasGrid.prepend(mirror[i]);
  ctx[i] = mirror[i].getContext('2d');
  mirror[i].width = 500;
  mirror[i].height = 500;
  ctx[i].strokeStyle = color;
  ctx[i].lineWidth = 1;
}

// 거울 페인터
let mirror = [];
const canvasGrid = document.getElementById('canvasGrid');
function addMirror(divNum) {
  if(divNum === 2) {
    activeMirror(1);
  } else if(divNum === 4) {
    activeMirror(1);
    activeMirror(2);
    activeMirror(3);
  }
  // todo 4, 8도 만들기
}

const grid1 = document.getElementById('grid1');
function addSaveButton() { // 캡쳐 버튼 생성
  const saveButton = document.createElement('button');
  saveButton.id = 'saveButton';
  saveButton.innerText = '저장하기';
  grid1.append(saveButton);
}

// 지우기 버튼을 눌렀을 때, 다 지우고 분할획만 그려 넣는다.
function clickEraseButton() {
  for(let i = 0; i < ctx.length; i++) {
    ctx[i].clearRect(0, 0, 500, 500);
  }
  if(divNum === 2) {
    paint90Line();
  } else if(divNum === 4) {
    paint90Line();
    paint180Line();
  } else if(divNum === 8) {
    paint90Line();
    paint180Line();
    paint45Line();
    paint135Line();
  }
}

let eraseButton;
function addEraseButton() { // 지우기 버튼 생성
  eraseButton = document.createElement('button');
  eraseButton.id = 'eraseButton';
  eraseButton.innerText = '지우기';
  grid1.append(eraseButton);
  eraseButton.addEventListener('click', clickEraseButton);
}

function replaceButtons() {
  numInput.remove();
  numButton.remove();
  addSaveButton();
  addEraseButton();
}

let divNum;
// 클릭 버튼을 클릭했을 때, ele를 지우고 선을 그리고 지우기 버튼을 만든다.
const numButton = document.getElementById('numButton');
function clickNumButton() {
  divNum = Number(numInput.value);
  if(divNum) {
    if(divNum === 2) {
      paint90Line();
      addMirror(divNum);
      replaceButtons();
    } else if(divNum === 4) {
      paint90Line();
      paint180Line();
      addMirror(divNum);
      replaceButtons();
    } else if(divNum === 8) {
      paint90Line();
      paint180Line();
      paint45Line();
      paint135Line();
      addMirror(divNum);
      replaceButtons();
    } else {
      alert('2, 4, 8 중의 숫자를 입력해주세요.')
    }
  } else {
    alert('숫자를 입력해주세요.');
  } 
}
numButton.addEventListener('click', clickNumButton);

// 엔터 키를 눌렀을 때 클릭 버튼을 누른 것과 같다.
numInput.addEventListener('keypress', function(event) {
  if(event.key === 'Enter') {
    clickNumButton();
  }
});

// stroke 색깔 바꾸기
const colorButton = document.getElementsByClassName('colorButton');
for(let i = 0; i < colorButton.length; i++) {
  colorButton[i].addEventListener('click', function() {
    color = colorButton[i].style.backgroundColor;
    for(let j = 0; j < ctx.length; j++) {
      if(ctx[j]) { ctx[j].strokeStyle = color; }
    }
  });
}

let hasMouseDown = false;
function mouseDown() {
  hasMouseDown = true;
}
function mouseUp() {
  hasMouseDown = false;
}
function mouseOut() {
  hasMouseDown = false;
}

function reverse(num) {
  let result;
  if(num < 250) {
    result = 250 - num + 250;
  } else if(num >= 250) {
    result = 250 - (num - 250);
  }
  return result;
}

function mouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  // console.log(x , y);
  // 클릭할 때, 캔버스 위에 있을 때 통과
  if(hasMouseDown) {
    ctx[0].lineTo(x, y);
    ctx[0].stroke();
    if(divNum === 2) {
      ctx[1].lineTo(reverse(x), y);
      ctx[1].stroke();
    } else if(divNum === 4) {
      ctx[1].lineTo(reverse(x), y);
      ctx[2].lineTo(x, reverse(y));
      ctx[3].lineTo(reverse(x), reverse(y));
      ctx[1].stroke();
      ctx[2].stroke();
      ctx[3].stroke();
    }
  } else {
    ctx[0].beginPath();
    ctx[0].moveTo(x, y);
    if(divNum === 2) {
      ctx[1].beginPath();
      ctx[1].moveTo(reverse(x), y);
    } else if(divNum === 4) {
      ctx[1].beginPath();
      ctx[2].beginPath();
      ctx[3].beginPath();
      ctx[1].moveTo(reverse(x), y);
      ctx[2].moveTo(x, reverse(y));
      ctx[3].moveTo(reverse(x), reverse(y));
    }
  }
}
canvas[0].addEventListener('mousemove', mouseMove);
canvas[0].addEventListener('mousedown', mouseDown);
canvas[0].addEventListener('mouseup', mouseUp);
canvas[0].addEventListener('mouseout', mouseOut);






