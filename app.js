const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.querySelectorAll('.jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');
const reset = document.getElementById('jsReset');

const INITIAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = 700;

// canvas 면적
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// 기본 채우기 색상
// css로 설정한 배경화면은 브라우저에서만 보이기 떄문
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

// 기본 선 색상 및 굵기
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = '2.5';



let painting = false;
let filling = false;

// 그리기 구현
const startPainting = (e) => {
    painting = true;
}
const stopPainting = (e) => {
    painting = false;
}
const onMouseMove = (e) => {
    const x = e.offsetX;
    const y = e.offsetY;

    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

// 색상 변경
const handleColorClick = (e) => {
    const color = e.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

// 굵기 변경
const handleRangeChange = (e) => {
    const size = e.target.value;
    ctx.lineWidth = size;
}

// 채우기 버튼 글짜 변경
const handleModeClick = () => {
    if (filling === true) {
        filling = false;
        mode.innerText = 'Fill';
    } else {
        filling = true;
        mode.innerText = 'Paint';
    }
}

// 채우기 설정
const handleCanvasClick = () => {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

// 그림 저장하기
const handleCM = (e) => {
    e.preventDefault();
}

const handleSaveClick = () => {
    const image = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = image;
    link.download = '내가그린그림';
    link.click();
}

// 그림판 초기화
const handleReset = () => {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

// 이벤트
if (canvas) {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('contextmenu', handleCM);
}

Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick));

if (range) {
    range.addEventListener('input', handleRangeChange);
}

if (mode) {
    mode.addEventListener('click', handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener('click', handleSaveClick);
}

if (reset) {
    reset.addEventListener('click', handleReset);
}