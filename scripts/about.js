class Circle {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.scaledX = x;
        this.scaledY = y;
        this.scaledRadius = radius;
        this.animationSpeed = 0.01;
        this.translationalAmplitude = rem2Px(1);
        this.minScale = 0.8;
        this.maxScale = 1.2;
        this.scaleDiff = this.maxScale - this.minScale;
        this.mouseTranslateX = 0;
        this.mouseTranslateY = 0;
        this.distanceThres = rem2Px(1800);
        this.mouseTranslateScale = 1e-9; //rem2Px(0.1);
    }

    drawStroke() {
        ctx.beginPath();
        ctx.arc(this.scaledX + this.mouseTranslateX, this.scaledY + this.mouseTranslateY, this.scaledRadius, 0, Math.PI * 2, false);
        ctx.strokeStyle = "black";
        ctx.stroke();
    }

    drawFill() {
        ctx.beginPath();
        ctx.arc(this.scaledX + this.mouseTranslateX, this.scaledY + this.mouseTranslateY, this.scaledRadius, 0, Math.PI * 2, false);
        ctx.fillStyle = "#ab97c4"
        ctx.fill();
    }

    translate(offsetX, offsetY) {
        this.scaledX = this.x + offsetX;
        this.scaledY = this.y + offsetY;
    }

    scale(factor) {
        this.scaledRadius = this.radius * factor;
    }

    animate(delay) {
        // const sineOffset = Math.sin((delay / this.animationSpeed) % (2 * Math.PI));
        const sineOffset = Math.sin(delay * this.animationSpeed);
        this.translate(this.translationalAmplitude * sineOffset, this.translationalAmplitude * sineOffset);
        this.scale((sineOffset + 1) / 2 * this.scaleDiff + this.minScale);
        this.drawFill();
    }

    mouseTranslate(mouseX, mouseY) {
        const sqrDistance = Math.pow(this.x - mouseX, 2) + Math.pow(this.y - mouseY, 2);
        if (sqrDistance < this.distanceThres) {
            const offsetMagnitude = this.mouseTranslateScale * Math.pow(sqrDistance - this.distanceThres, 2);
            this.mouseTranslateX = offsetMagnitude * (this.x - mouseX);
            this.mouseTranslateY = offsetMagnitude * (this.y - mouseY);
        } else {
            this.mouseTranslateX = 0;
            this.mouseTranslateY = 0;
        }
        // const sqrDiffX = Math.pow(this.X - mouseX, 2);
        // const sqrDiffY = Math.pow(this.Y - mouseY, 2);
    }
}



// --- Functions for general purposes ---
// convert rem value to pixel
function rem2Px(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function initializePage() {
    const fgContainer = document.getElementById("fg-container");
    fgContainer.style.opacity = 1;
    const background = document.getElementById("background");
    background.style.opacity = 1;
    canvas.style.transform = "scale(1)";
    canvas.style.opacity = 1;
}

function leavingPage() {
    const fgContainer = document.getElementById("fg-container");
    fgContainer.style.opacity = 0;
    const background = document.getElementById("background");
    background.style.opacity = 0;
    canvas.style.opacity = 0;
    const navBar = document.querySelector('nav');
    navBar.style.animation = 'nav-disappear-animation 500ms ease-in-out 0s forwards';
}


// --- Functions for Navbar ---
// Functions dealing with click to expand/hide mobile menu
function expandMenu() {
    // console.log('expand menu activated');
    const expandedMenu = document.getElementById('expanded-menu');
    const triangleLeft = document.getElementById('nav-click-triangle');
    const navBar = document.querySelector('nav');
    const menuButton = document.getElementById('collapse-menu-button');
    if (expandedMenu.style.display !== 'flex') {
        menuButton.innerHTML = '&nbsp;{';
        navBar.style.height = '18rem';
        triangleLeft.style.left = '100%';
        triangleLeft.style.transform = 'rotate(180deg)';
        setTimeout(() => { expandedMenu.style.display = 'flex', expandedMenu.style.opacity = "1"; }, 300);
    } else {
        triangleLeft.style.left = '0%';
        triangleLeft.style.transform = 'rotate(0deg)';
        expandedMenu.style.opacity = "0";
        setTimeout(() => { navBar.style.height = "4.4rem", expandedMenu.style.display = "none"; }, 200);
        setTimeout(() => { menuButton.innerHTML = '{...}'; }, 500);
    }
}

// Set animation for hover over navbar menu, default selecting current page
function navListHover(pageID) {
    const navMenuLists = document.getElementById('nav-menu-list');
    const currentPageBg = document.getElementById(pageID.concat('-list-bg'));
    const currentPageTriangle = document.getElementById(pageID.concat('-list-triangle'));
    currentPageBg.style.transform = 'scaleY(1)'
    currentPageTriangle.style.filter = 'contrast(0%)';
    let navListBg = 0;
    let navListTriangle = 0;
    for (const navMenuList of navMenuLists.children) {
        navMenuList.addEventListener('mouseover', event => {
            navListBg = document.getElementById(navMenuList.id.concat('-bg'));
            navListTriangle = document.getElementById(navMenuList.id.concat('-triangle'));
            currentPageBg.style.transform = 'scaleY(0)'
            currentPageTriangle.style.filter = 'contrast(100%)';
            navListBg.style.transform = 'scaleY(1)';
            navListTriangle.style.filter = "contrast(0%)";
        })
        navMenuList.addEventListener('mouseleave', event => {
            navListBg = document.getElementById(navMenuList.id.concat('-bg'));
            navListTriangle = document.getElementById(navMenuList.id.concat('-triangle'));
            navListBg.style.transform = 'scaleY(0)';
            navListTriangle.style.filter = "contrast(100%)";
            currentPageBg.style.transform = 'scaleY(1)'
            currentPageTriangle.style.filter = 'contrast(0%)';
        })
    }
}

function homeOnClick() {
    leavingPage();
    setTimeout(() => {
        window.location.href = './index.html';
    }, 1500);
}

function projectsOnClick() {
    leavingPage();
    setTimeout(() => {
        window.location.href = './projects.html';
    }, 1500);
}



// --- Functions for canvas ---
function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    return canvas.getContext('2d');
}

function canvasResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gridCircles = generateGridCircles();
}

function animateCanvas() {
    requestAnimationFrame(animateCanvas);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < gridCircles.length; i++) {
        for (let j = 0; j < gridCircles[i].length; j++) {
            gridCircles[i][j].animate(frameIndex + 30 * i + 30 * j);
        }
    }
    frameIndex += 1;
}


function generateGridCircles() {
    const circleRadius = rem2Px(0.15);
    const gridTopPadding = rem2Px(14);
    const gridPadding = window.innerWidth * 0.05;
    const gridInterval = Math.max(rem2Px(2.5), window.innerWidth / 22);
    const numCol = Math.floor((window.innerWidth - 2 * gridPadding) / gridInterval);
    const numRow = Math.floor((window.innerHeight - gridTopPadding - gridPadding) / gridInterval);
    const startX = (window.innerWidth - (numCol * gridInterval)) / 2;
    const startY = gridTopPadding;
    var gridCircles = [];
    for (let i = 0; i <= numCol; i++) {
        var gridCol = [];
        for (let j = 0; j <= numRow; j++) {
            const posX = startX + (i * gridInterval);
            const posY = startY + (j * gridInterval);
            const circle = new Circle(posX, posY, circleRadius);
            gridCol.push(circle);
            circle.drawFill();
        }
        gridCircles.push(gridCol);
    }
    return gridCircles;
}



// --- Functions to track mouse locations ---
function mousemove(event) {
    for (let i = 0; i < gridCircles.length; i++) {
        for (let j = 0; j < gridCircles[i].length; j++) {
            gridCircles[i][j].mouseTranslate(event.clientX, event.clientY);
        }
    }
}



const viewHeight = () => { return document.documentElement.clientHeight };
const viewWidth = () => { return document.documentElement.clientWidth };
const appHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--app-height', `${window.innerHeight}px`)
}
window.addEventListener('resize', appHeight)
appHeight()

navListHover('aboutme');
const homeButton = document.getElementById('home-list');
homeButton.addEventListener('click', homeOnClick, false);
const projectsButton = document.getElementById('projects-list');
projectsButton.addEventListener('click', projectsOnClick, false);

window.addEventListener('mousemove', mousemove);

const canvas = document.querySelector('canvas');
const ctx = initCanvas();
var gridCircles = generateGridCircles();
var frameIndex = 0;
animateCanvas();
window.addEventListener('resize', canvasResize);

initializePage();