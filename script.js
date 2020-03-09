// 초기값
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;
ctx.strokeStyle = 'black';
ctx.lineWidth = 1;

// 원점 그리기
ctx.beginPath();
ctx.arc(250, 250, 1, 0, 2 * Math.PI);
ctx.stroke();

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

function paint90Line() {
  // 세로선
  ctx.beginPath();
  ctx.moveTo(250, 0);
  ctx.lineTo(250, 500);
  ctx.stroke();
}

function paint180Line() {
  ctx.beginPath();
  ctx.moveTo(0, 250);
  ctx.lineTo(500, 250);
  ctx.stroke();
}

function paint45Line() {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(500, 500);
  ctx.stroke();
}

function paint135Line() {
  ctx.beginPath();
  ctx.moveTo(0, 500);
  ctx.lineTo(500, 0);
  ctx.stroke();
}

// 클릭 버튼을 클릭했을 때, ele를 지우고 선을 그린다.
const numButton = document.getElementById('numButton');
function clickNumButton() {
  const num = Number(numInput.value);
  if(num) {
    if(num === 2) {
      paint90Line();
      numInput.remove();
      numButton.remove();
    } else if(num === 4) {
      paint90Line();
      paint180Line();
      numInput.remove();
      numButton.remove();
    } else if(num === 8) {
      paint90Line();
      paint180Line();
      paint45Line();
      paint135Line();
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

// 마우스를 클릭해서 드래그할 때 그림을 그린다.
let paintEnable = false;

function mouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  // 클릭할 때, 캔버스 위에 있을 때 통과
  if(hasMouseDown) {
    ctx.lineTo(x, y);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.moveTo(x, y);
  }
}
canvas.addEventListener('mousemove', mouseMove);
canvas.addEventListener('mousedown', mouseDown);
canvas.addEventListener('mouseup', mouseUp);
canvas.addEventListener('mouseout', mouseOut);

