const canvasGrid = document.getElementById('canvasGrid');

// backGroundCanvas 초기 설정
const backGroundCanvas = document.getElementById('backGroundCanvas');
const bgCtx = backGroundCanvas.getContext('2d');
backGroundCanvas.width = 500;
backGroundCanvas.height = 500;
bgCtx.strokeStyle = 'gray';
bgCtx.lineWidth = 1;

let color = 'black';
// 메인 canvas 초기 설정
let canvas = document.getElementsByClassName('canvas');
let ctx = [];
ctx[0] = canvas[0].getContext('2d');
canvas[0].width = 500;
canvas[0].height = 500;
ctx[0].strokeStyle = color;
ctx[0].lineWidth = 1;

// 원점 그리기
bgCtx.beginPath();
bgCtx.arc(250, 250, 1, 0, 2 * Math.PI);
bgCtx.stroke();

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

// 45도 돌아가게 해주는 함수
function rotateR45(x, y) {
  let result = [];
  
  return result;
}

// 원지름 그리는 함수
function paintBlackStroke() {
  bgCtx.strokeStyle = 'black';
  bgCtx.stroke();
  bgCtx.strokeStyle = color;
}
function paint90Line() {
  bgCtx.beginPath();
  bgCtx.moveTo(250, 0);
  bgCtx.lineTo(250, 500);
  paintBlackStroke();
}
function paint180Line() {
  bgCtx.beginPath();
  bgCtx.moveTo(0, 250);
  bgCtx.lineTo(500, 250);
  paintBlackStroke();
}
function paint45Line() {
  bgCtx.beginPath();
  bgCtx.moveTo(0, 0);
  bgCtx.lineTo(500, 500);
  paintBlackStroke();
}
function paint135Line() {
  bgCtx.beginPath();
  bgCtx.moveTo(0, 500);
  bgCtx.lineTo(500, 0);
  paintBlackStroke();
}

function degreesToRadians(degrees) {
  const pi = Math.PI;
  return degrees * (pi / 180);
}

function paintDegreeLine(degree) {
  degree = degree - 90;
  bgCtx.beginPath();
  bgCtx.moveTo(250, 250);
  let x = Math.cos(degreesToRadians(degree)) * 250;
  let y = Math.sin(degreesToRadians(degree)) * 250;
  bgCtx.lineTo(x + 250, y + 250);
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
function addMirror(divNum) {
  if(divNum === 2) {
    activeMirror(1);
  } else if(divNum === 4) {
    activeMirror(1);
    activeMirror(2);
    activeMirror(3);
  } else if(divNum === 8) {
    activeMirror(1);
    activeMirror(2);
    activeMirror(3);
    activeMirror(4);
    activeMirror(5);
    activeMirror(6);
    activeMirror(7);
  } else if(divNum === 16) {
    // todo 15개 만들어야 함
    activeMirror(1);
    // activeMirror(2);
    // activeMirror(3);
    // activeMirror(4);
    // activeMirror(5);
    // activeMirror(6);
    // activeMirror(7);
  }
}

const grid1 = document.getElementById('grid1');
function addSaveButton() { // 캡쳐 버튼 생성
  const saveButton = document.createElement('button');
  saveButton.id = 'saveButton';
  saveButton.innerText = '저장하기';
  grid1.append(saveButton);
}

// 지우기 버튼을 눌렀을 때
function clickEraseButton() {
  for(let i = 0; i < ctx.length; i++) {
    ctx[i].clearRect(0, 0, 500, 500);
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
    } else if(divNum === 16) {
      paint90Line();
      paint180Line();
      paint45Line();
      paint135Line();
      paintDegreeLine(22.5);
      paintDegreeLine(45 + 22.5);
      paintDegreeLine(90 + 22.5);
      paintDegreeLine(135 + 22.5);
      paintDegreeLine(180 + 22.5);
      paintDegreeLine(225 + 22.5);
      paintDegreeLine(270 + 22.5);
      paintDegreeLine(315 + 22.5);
      addMirror(divNum);
      replaceButtons();
    }  else {
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
  if(hasMouseDown) { // 마우스 클릭해서 그리기
    ctx[0].lineTo(x, y);
    if(divNum === 2) { // 2등분
      ctx[1].lineTo(reverse(x), y);
      if(x < 250) { hasMouseDown = false; } // 그리기 허용 영역을 넘어갔을 때 마우스 클릭이 풀림
      if(hasMouseDown) { ctx[1].stroke(); }
    } else if(divNum === 4) { // 4등분
      ctx[1].lineTo(reverse(x), y);
      ctx[2].lineTo(x, reverse(y));
      ctx[3].lineTo(reverse(x), reverse(y));
      if(x < 250 || y > 250) { hasMouseDown = false; }
      if(hasMouseDown) { 
        ctx[1].stroke(); 
        ctx[2].stroke(); 
        ctx[3].stroke(); 
      }
    } else if(divNum === 8) { // 8등분
      ctx[1].lineTo(500 - y, reverse(x));
      ctx[2].lineTo(500 - y, x);
      ctx[3].lineTo(x, reverse(y));
      ctx[4].lineTo(reverse(x), y);
      ctx[5].lineTo(reverse(500 - y), reverse(x));
      ctx[6].lineTo(reverse(500 - y), x);
      ctx[7].lineTo(reverse(x), reverse(y));
      if(x < 250 || reverse(y) < x) { hasMouseDown = false; }
      if(hasMouseDown) {
        ctx[1].stroke(); 
        ctx[2].stroke();
        ctx[3].stroke(); 
        ctx[4].stroke(); 
        ctx[5].stroke(); 
        ctx[6].stroke();
        ctx[7].stroke(); 
      }
    } else if(divNum === 16) {
      // todo
    }
    if(hasMouseDown) { ctx[0].stroke(); } // 그리기 허용 영역을 넘어가면 메인 stroke 발동 x
  
  } else {
    ctx[0].beginPath();
    ctx[0].moveTo(x, y);
    if(divNum === 2) { // 2등분
      ctx[1].beginPath();
      ctx[1].moveTo(reverse(x), y);
    } else if(divNum === 4) { // 4등분
      for(let i = 1; i < divNum; i++) {
        ctx[i].beginPath();
      }
      ctx[1].moveTo(reverse(x), y);
      ctx[2].moveTo(x, reverse(y));
      ctx[3].moveTo(reverse(x), reverse(y));
    } else if(divNum === 8) { // 8등분
      for(let i = 1; i < divNum; i++) {
        ctx[i].beginPath();
      }
      ctx[1].moveTo(500 - y, reverse(x));
      ctx[2].moveTo(500 - y, x);
      ctx[3].moveTo(x, reverse(y));
      ctx[4].moveTo(reverse(x), y);
      ctx[5].moveTo(reverse(500 - y), reverse(x));
      ctx[6].moveTo(reverse(500 - y), x);
      ctx[7].moveTo(reverse(x), reverse(y));
    } else if(divNum === 16) {
      // todo
    }
  }
}
canvas[0].addEventListener('mousemove', mouseMove);
canvas[0].addEventListener('mousedown', mouseDown);
canvas[0].addEventListener('mouseup', mouseUp);
canvas[0].addEventListener('mouseout', mouseOut);






