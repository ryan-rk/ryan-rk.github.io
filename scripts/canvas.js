// --- Functions for canvas ---
function initCanvas() {
    canvas.width = viewWidth();
    canvas.height = viewHeight();
    return canvas.getContext('2d');
}

function canvasResize() {
    canvas.width = viewWidth();
    canvas.height = viewHeight();
}

function animateCanvas() {
    requestAnimationFrame(animateCanvas);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    frameIndex += 1;
}

const viewHeight = () => { return document.documentElement.clientHeight };
const viewWidth = () => { return document.documentElement.clientWidth };

const canvas = document.querySelector('canvas');
const ctx = initCanvas();
var frameIndex = 0;
// animateCanvas();
window.addEventListener('resize', canvasResize);