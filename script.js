// 초기값
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;
ctx.strokeStyle = 'black';
ctx.lineWidth = 1;

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

// 원점
ctx.beginPath();
ctx.arc(250, 250, 1, 0, 2 * Math.PI);
ctx.stroke();

// // 세로선
// ctx.beginPath();
// ctx.moveTo(250, 0);
// ctx.lineTo(250, 500);
// ctx.stroke();

// // 연습선
// ctx.beginPath();
// ctx.moveTo(250, 250);
// ctx.lineTo(500, 80);
// ctx.stroke();

function onMouseMove() {
    const x = event.offsetX;
    const y = event.offsetY;
    console.log(x, y);
}
canvas.addEventListener('mousemove', onMouseMove);