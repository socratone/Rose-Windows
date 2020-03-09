// 초기값
let canvas = document.getElementsByClassName('canvas');
let ctx = [];
ctx[0] = canvas[0].getContext('2d');
canvas[0].width = 500;
canvas[0].height = 500;
ctx[0].strokeStyle = 'black';
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
function paint90Line() {
  ctx[0].beginPath();
  ctx[0].moveTo(250, 0);
  ctx[0].lineTo(250, 500);
  ctx[0].stroke();
}
function paint180Line() {
  ctx[0].beginPath();
  ctx[0].moveTo(0, 250);
  ctx[0].lineTo(500, 250);
  ctx[0].stroke();
}
function paint45Line() {
  ctx[0].beginPath();
  ctx[0].moveTo(0, 0);
  ctx[0].lineTo(500, 500);
  ctx[0].stroke();
}
function paint135Line() {
  ctx[0].beginPath();
  ctx[0].moveTo(0, 500);
  ctx[0].lineTo(500, 0);
  ctx[0].stroke();
}

// 거울 페인터
let mirror = [];
const canvasGrid = document.getElementById('canvasGrid');
function addMirror(divNum) {
  if(divNum === 2) {
    mirror[1] = document.createElement('canvas');
    mirror[1].classList.add('canvas');
    canvasGrid.prepend(mirror[1]);
    ctx[1] = mirror[1].getContext('2d');
    mirror[1].width = 500;
    mirror[1].height = 500;
    ctx[1].strokeStyle = 'blue';
    ctx[1].lineWidth = 1;
  }
  // todo 4, 8도 만들기
}

let divNum;
// 클릭 버튼을 클릭했을 때, ele를 지우고 선을 그린다.
const numButton = document.getElementById('numButton');
function clickNumButton() {
  divNum = Number(numInput.value);
  if(divNum) {
    if(divNum === 2) {
      paint90Line();
      addMirror(divNum);
      numInput.remove();
      numButton.remove();
    } else if(divNum === 4) {
      paint90Line();
      paint180Line();
      addMirror(divNum);
      numInput.remove();
      numButton.remove();
    } else if(divNum === 8) {
      paint90Line();
      paint180Line();
      paint45Line();
      paint135Line();
      addMirror(divNum);
      numInput.remove();
      numButton.remove();
    } else {
      alert('2, 4, 8 중의 숫자를 입력해주세요.')
    }
  } else {
    alert('숫자를 입력해주세요.');
  } 
}
numButton.addEventListener('click', clickNumButton);

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

function reverse90(num) {
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
  // 클릭할 때, 캔버스 위에 있을 때 통과
  if(hasMouseDown) {
    ctx[0].lineTo(x, y);
    ctx[0].stroke();
    if(divNum === 2) {
      ctx[1].lineTo(reverse90(x), y);
      ctx[1].stroke();
    }
  } else {
    ctx[0].beginPath();
    ctx[0].moveTo(x, y);
    if(divNum === 2) {
      ctx[1].beginPath();
      ctx[1].moveTo(reverse90(x), y);
    }
  }
}
canvas[0].addEventListener('mousemove', mouseMove);
canvas[0].addEventListener('mousedown', mouseDown);
canvas[0].addEventListener('mouseup', mouseUp);
canvas[0].addEventListener('mouseout', mouseOut);

