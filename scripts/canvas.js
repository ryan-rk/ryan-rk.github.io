// // --- Functions for canvas ---
// function initCanvas() {
//     canvas.width = viewWidth();
//     canvas.height = viewHeight();
//     return canvas.getContext('2d');
// }

// function canvasResize() {
//     canvas.width = viewWidth();
//     canvas.height = viewHeight();
// }

// function animateCanvas() {
//     requestAnimationFrame(animateCanvas);
//     ctx.clearRect(0, 0, innerWidth, innerHeight);
//     frameIndex += 1;
// }

// const viewHeight = () => { return document.documentElement.clientHeight };
// const viewWidth = () => { return document.documentElement.clientWidth };

// const canvas = document.querySelector('canvas');
// const ctx = initCanvas();
// var frameIndex = 0;
// // animateCanvas();
// window.addEventListener('resize', canvasResize);






var w = c.width = window.innerWidth,
    h = c.height = window.innerHeight,
    ctx = c.getContext('2d'),

    opts = {

        len: 200, //20,
        count: 10, // 50,
        baseTime: 50, // 10,
        addedTime: 5, // 10,
        dieChance: .05,
        spawnChance: 1, //1,
        sparkChance: 0, //.1,
        sparkDist: 10,
        sparkSize: 1, // 2,

        color: 'hsl(hue,48%,light%)',
        // color: 'hsl(264°, 48%, 69%',
        baseLight: 69,
        addedLight: 5, // [50-10,50+10]
        shadowToTimePropMult: 1, // 6,
        baseLightInputMultiplier: .01,
        addedLightInputMultiplier: .02,

        cx: w / 2,
        cy: h / 2,
        repaintAlpha: 0.1, //0.01, // .02,
        hueChange: 0.1
    },

    tick = 0,
    lines = [],
    dieX = w / 2 / opts.len,
    dieY = h / 2 / opts.len,

    // baseRad = Math.PI * 2 / 6;
    baseRad = Math.PI * 1 / 2;

var bgGradient = ctx.createLinearGradient(0, 0, 0, h);
bgGradient.addColorStop(0, "rgb(238, 193, 213)");
bgGradient.addColorStop(1, "rgb(168, 193, 221)");
ctx.fillStyle = bgGradient;
// ctx.fillStyle = 'black';
ctx.fillRect(0, 0, w, h);

function loop() {

    window.requestAnimationFrame(loop);

    ++tick;

    ctx.globalCompositeOperation = 'source-over';
    ctx.shadowBlur = 0;
    var bgGradient = ctx.createLinearGradient(0, 0, 0, h);
    bgGradient.addColorStop(0, "rgb(238, 193, 213, alp)".replace('alp', opts.repaintAlpha));
    bgGradient.addColorStop(1, "rgb(168, 193, 221, alp)".replace('alp', opts.repaintAlpha));
    ctx.fillStyle = bgGradient;
    // ctx.fillStyle = 'rgba(238,193,213,0.02)';
    // ctx.fillStyle = 'rgba(0,0,0,alp)'.replace('alp', opts.repaintAlpha);
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';

    if (lines.length < opts.count && Math.random() < opts.spawnChance)
        lines.push(new Line);

    lines.map(function(line) { line.step(); });
}

function Line() {

    this.reset();
}
Line.prototype.reset = function() {

    this.x = 0;
    this.y = 0;
    this.addedX = 0;
    this.addedY = 0;

    this.rad = 0;

    this.lightInputMultiplier = opts.baseLightInputMultiplier + opts.addedLightInputMultiplier * Math.random();

    // this.color = opts.color.replace('hue', tick * opts.hueChange);
    this.color = opts.color.replace('hue', 264);
    this.cumulativeTime = 0;

    this.beginPhase();
}
Line.prototype.beginPhase = function() {

    this.x += this.addedX;
    this.y += this.addedY;

    this.time = 0;
    this.targetTime = (opts.baseTime + opts.addedTime * Math.random()) | 0;
    // this.targetTime = (opts.baseTime) | 0;

    this.rad += baseRad * (Math.random() < .5 ? 1 : -1);
    this.addedX = Math.cos(this.rad);
    this.addedY = Math.sin(this.rad);

    if (Math.random() < opts.dieChance || this.x > dieX || this.x < -dieX || this.y > dieY || this.y < -dieY)
        this.reset();
}
Line.prototype.step = function() {

    ++this.time;
    ++this.cumulativeTime;

    if (this.time >= this.targetTime)
        this.beginPhase();

    var prop = this.time / this.targetTime,
        wave = prop, // Math.sin(prop * Math.PI / 2),
        x = this.addedX * wave,
        y = this.addedY * wave;

    ctx.shadowBlur = prop * opts.shadowToTimePropMult;
    ctx.fillStyle = ctx.shadowColor = this.color.replace('light', opts.baseLight + opts.addedLight * Math.sin(this.cumulativeTime * this.lightInputMultiplier));
    ctx.fillRect(opts.cx + (this.x + x) * opts.len, opts.cy + (this.y + y) * opts.len, 2, 2);

    if (Math.random() < opts.sparkChance)
        ctx.fillRect(opts.cx + (this.x + x) * opts.len + Math.random() * opts.sparkDist * (Math.random() < .5 ? 1 : -1) - opts.sparkSize / 2, opts.cy + (this.y + y) * opts.len + Math.random() * opts.sparkDist * (Math.random() < .5 ? 1 : -1) - opts.sparkSize / 2, opts.sparkSize, opts.sparkSize)
}

setTimeout(() => {
    loop();
}, 5000);

window.addEventListener('resize', function() {

    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;
    var bgGradient = ctx.createLinearGradient(0, 0, 0, h);
    bgGradient.addColorStop(0, "rgb(238, 193, 213)");
    bgGradient.addColorStop(1, "rgb(168, 193, 221)");
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, w, h);
    // ctx.fillStyle = 'black';
    // ctx.fillRect(0, 0, w, h);

    opts.cx = w / 2;
    opts.cy = h / 2;

    dieX = w / 2 / opts.len;
    dieY = h / 2 / opts.len;
});