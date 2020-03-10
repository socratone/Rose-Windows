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

function radiansToDegrees(radians) {
  const pi = Math.PI;
  return radians * (180 / pi);
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

function makePainter(divNum) {
  for(let i = 1; i < divNum; i++) {
    activeMirror(i);
  }
}

// painter를 생성한다.
let mirror = [];
function addMirror(divNum) {
  if(divNum === 2) {
    makePainter(divNum);
  } else if(divNum === 4) {
    makePainter(divNum);
  } else if(divNum === 8) {
    makePainter(divNum);
  } else if(divNum === 16) {
    makePainter(divNum);
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

// 좌표 뒤집는 함수
function reverse(num) {
  let result;
  if(num < 250) {
    result = 250 - num + 250;
  } else if(num >= 250) {
    result = 250 - (num - 250);
  }
  return result;
}

// 좌표 rotate 함수
function rotateX(degree, x, y) {
  let triangleX;
  let triangleY;
  if(x > 250) {
    triangleX = x - 250;
  } else {
    triangleX = 250 - x;
  }

  if(y > 250) {
    triangleY = y - 250;
  } else {
    triangleY = 250 - y;
  }
  let radius = Math.sqrt(Math.pow(triangleX, 2) + Math.pow(triangleY, 2));
  let triangleDegree = radiansToDegrees(Math.atan(triangleY / triangleX));
  // console.log('삼각형x:', triangleX, '삼각형y:', triangleY, '반지름:', radius, '90-각도:', 90 - triangleDegree);
  return 250 + Math.floor(radius * Math.sin(degreesToRadians(90 - triangleDegree + degree)));
}
function rotateY(degree, x, y) {
  y = 500 - y;
  let triangleX;
  let triangleY;
  if(x > 250) {
    triangleX = x - 250;
  } else {
    triangleX = 250 - x;
  }

  if(y > 250) {
    triangleY = y - 250;
  } else {
    triangleY = 250 - y;
  }
  let radius = Math.sqrt(Math.pow(triangleX, 2) + Math.pow(triangleY, 2));
  let triangleDegree = radiansToDegrees(Math.atan(triangleY / triangleX));
  // console.log('삼각형x:', triangleX, '삼각형y:', triangleY, '반지름:', radius, '90-각도:', 90 - triangleDegree);
  return 250 - Math.floor(radius * Math.cos(degreesToRadians(90 - triangleDegree + degree)));
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
      ctx[2].lineTo(rotateX(45, x, y), rotateY(45, x, y));
      ctx[4].lineTo(rotateX(90, x, y), rotateY(90, x, y));
      ctx[6].lineTo(rotateX(135, x, y), rotateY(135, x, y));
      ctx[8].lineTo(rotateX(180, x, y), rotateY(180, x, y));
      ctx[10].lineTo(rotateX(225, x, y), rotateY(225, x, y));
      ctx[12].lineTo(rotateX(270, x, y), rotateY(270, x, y));
      ctx[14].lineTo(rotateX(315, x, y), rotateY(315, x, y));
      ctx[2].stroke(); 
      ctx[4].stroke(); 
      ctx[6].stroke(); 
      ctx[8].stroke(); 
      ctx[10].stroke(); 
      ctx[12].stroke(); 
      ctx[14].stroke(); 
      const reverseX = 250 - (x - 250);
      ctx[1].lineTo(reverseX, y);
      ctx[3].lineTo(rotateX(-45, 500 - y, 500 - x), rotateY(-45, 500 - y, 500 - x));
      ctx[5].lineTo(rotateX(0, 500 - y, 500 - x), rotateY(0, 500 - y, 500 - x));
      ctx[7].lineTo(rotateX(45, 500 - y, 500 - x), rotateY(45, 500 - y, 500 - x));
      ctx[9].lineTo(rotateX(90, 500 - y, 500 - x), rotateY(90, 500 - y, 500 - x));
      ctx[11].lineTo(rotateX(135, 500 - y, 500 - x), rotateY(135, 500 - y, 500 - x));
      ctx[13].lineTo(rotateX(180, 500 - y, 500 - x), rotateY(180, 500 - y, 500 - x));
      ctx[15].lineTo(rotateX(225, 500 - y, 500 - x), rotateY(225, 500 - y, 500 - x));
      ctx[1].stroke(); 
      ctx[3].stroke(); 
      ctx[5].stroke(); 
      ctx[7].stroke(); 
      ctx[9].stroke(); 
      ctx[11].stroke(); 
      ctx[13].stroke(); 
      ctx[15].stroke();
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
      for(let i = 1; i < divNum; i++) {
        ctx[i].beginPath();
      }
      ctx[2].moveTo(rotateX(45, x, y), rotateY(45, x, y));
      ctx[4].moveTo(rotateX(90, x, y), rotateY(90, x, y));
      ctx[6].moveTo(rotateX(135, x, y), rotateY(135, x, y));
      ctx[8].moveTo(rotateX(180, x, y), rotateY(180, x, y));
      ctx[10].moveTo(rotateX(225, x, y), rotateY(225, x, y));
      ctx[12].moveTo(rotateX(270, x, y), rotateY(270, x, y));
      ctx[14].moveTo(rotateX(315, x, y), rotateY(315, x, y));
      const reverseX = 250 - (x - 250);
      ctx[1].moveTo(reverseX, y);
      ctx[3].moveTo(rotateX(-45, 500 - y, 500 - x), rotateY(-45, 500 - y, 500 - x));
      ctx[5].moveTo(rotateX(0, 500 - y, 500 - x), rotateY(0, 500 - y, 500 - x));
      ctx[7].moveTo(rotateX(45, 500 - y, 500 - x), rotateY(45, 500 - y, 500 - x));
      ctx[9].moveTo(rotateX(90, 500 - y, 500 - x), rotateY(90, 500 - y, 500 - x));
      ctx[11].moveTo(rotateX(135, 500 - y, 500 - x), rotateY(135, 500 - y, 500 - x));
      ctx[13].moveTo(rotateX(180, 500 - y, 500 - x), rotateY(180, 500 - y, 500 - x));
      ctx[15].moveTo(rotateX(225, 500 - y, 500 - x), rotateY(225, 500 - y, 500 - x));
    }
  }
}
canvas[0].addEventListener('mousemove', mouseMove);
canvas[0].addEventListener('mousedown', mouseDown);
canvas[0].addEventListener('mouseup', mouseUp);
canvas[0].addEventListener('mouseout', mouseOut);

