function expandMenu() {
    const expandedMenu = document.getElementById('expanded-menu');
    const triangleLeft = document.getElementById('nav-title-triangle');
    // // var menuTriangle = document.getElementById("menu-triangle");
    const navBar = document.querySelector('nav');
    const menuButton = document.getElementById('collapse-menu-button');
    if (expandedMenu.style.display !== 'flex') {
        menuButton.innerHTML = '&nbsp;{';
        navBar.style.height = '18rem';

        triangleLeft.style.left = '100%';
        triangleLeft.style.transform = 'rotate(180deg)';
        setTimeout(() => { expandedMenu.style.display = 'flex', expandedMenu.style.opacity = "1"; }, 200);
    } else {
        triangleLeft.style.left = '0%';
        triangleLeft.style.transform = 'rotate(0deg)';
        expandedMenu.style.opacity = "0";
        setTimeout(() => { navBar.style.height = "4.4rem", expandedMenu.style.display = "none"; }, 200);
        setTimeout(() => { menuButton.innerHTML = '{...}'; }, 500);
    }
}

function hideNavTitle() {
    var navTitle = document.getElementById("nav-title");
    var navBar = document.querySelector("nav");
    // this.scrollY > 40 ? navTitle.style.display = "none" : navTitle.style.display = "inline-block";
    if (this.scrollY > rem2Px(4)) {
        navTitle.style.display = "none";
        navBar.style.width = "calc(8rem)";
    } else {
        navTitle.style.display = "inline-block";
        navBar.style.width = "calc(100% - 1.6rem)";
    }
}

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
            currentPageBg.style.transform = 'scaleY(1)'
            currentPageTriangle.style.filter = 'contrast(0%)';
            navListTriangle.style.filter = "contrast(100%)";
        })
    }
}

function lineDecorScroll() {
    const verticalLines = document.getElementsByClassName("vertical-dotline");
    // const lineDecor = verticalLines[0].children[1];
    // console.log(verticalLines)
    // console.log(lineDecor);
    // lineDecor.style.animation = 'line-decor-animation 2s linear 0s forwards';
    // var vlBCR = verticalLines[0].getBoundingClientRect();
    // console.log(`vlbcr: ${vlBCR.top}`);
    // if (vlBCR.top <= document.documentElement.clientHeight/2) {
    // }
    for (verticalLine of verticalLines) {
        const vlBCR = verticalLine.getBoundingClientRect();
        if (vlBCR.top <= viewHeight / 2) {
            // verticalLine.children[1].style.animation = 'line-decor-animation 2s ease-out 0s forwards';
            verticalLine.children[0].style.opacity = 1;
            verticalLine.children[1].style.transform = 'scaleY(1)';
            verticalLine.children[2].style.opacity = 1;
        }
        // if (vlBCR.top >= viewHeight * 4 / 5) {
        //     // verticalLine.children[1].style.animation = 'line-decor-animation 2s ease-out 0s forwards';
        //     verticalLine.children[0].style.opacity = 0;
        //     verticalLine.children[1].style.transform = 'scaleY(0)';
        //     verticalLine.children[2].style.opacity = 0;
        // }
    }

    const allh2 = document.querySelectorAll('h2');
    for (h2 of allh2) {
        const h2BCR = h2.getBoundingClientRect();
        if (h2BCR.top <= viewHeight * 7 / 10) {
            h2.style.opacity = 1;
        }
        // else {
        //     h2.style.opacity = 0;
        // }
    }

    const allh1 = document.querySelectorAll('h1');
    for (h1 of allh1) {
        const h1BCR = h1.getBoundingClientRect();
        if (h1BCR.top <= viewHeight * 3 / 5) {
            h1.style.transform = 'scaleX(1)';
            h1.style.opacity = 1;
        }
        // else {
        //     h1.style.transform = 'scaleX(0)';
        //     h1.style.opacity = 0;
        // }
    }
    // if (((viewHeight / 2 - maskBCR.top) >= 0) && ((viewHeight / 2 - maskBCR.top) <= 100)) {
    //     console.log(`${maskBCR.top}`);
    // }
    //     var vlBCR = verticalLine.getBoundingClientRect();
    //     cpRadius = 31 - (vlBCR.top / 20);
    //     if (cpRadius >= 10) {
    //         cpRadius = 10;
    //     } else if (cpRadius <= 2) {
    //         cpRadius = 2;
    //     } else {
    //         cpRadius = cpRadius;
    //     }
    //     cpString = `circle(${cpRadius}rem at 50% -0.5rem)`
    //     verticalLine.style["clip-path"] = cpString;
    // }
}

function rem2Px(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function createDots() {
    const dotsContainer = document.getElementById("dots-bg");
    dotsContainer.innerHTML = "";
    const dotsContainerBCR = dotsContainer.getBoundingClientRect();
    const dotsContainerWidth = dotsContainerBCR.right - dotsContainerBCR.left;
    const numRow = 10;
    const numCol = Math.floor(dotsContainerWidth / rem2Px(3.6));
    const maxDist = Math.sqrt(Math.pow(numRow, 2) + Math.pow(numCol, 2));
    // const waveCycle = dotsContainerWidth / rem2Px(18);
    dotsContainer.style.gridTemplateColumns = `repeat(${numCol}, 1fr)`;
    dotsContainer.style.gridTemplateRows = `repeat(${numRow}, 1fr)`;
    for (let i = 0; i < numRow; i++) {
        for (let j = 0; j < numCol; j++) {
            let gridElem = document.createElement("div");
            gridElem.classList.add("small-dots");
            // shiftMag = -30 * Math.sin(j * waveCycle * Math.PI / numCol);
            // gridElem.style.transform = `translate(0, ${shiftMag}px)`;
            const dotDistTopLeft = Math.sqrt(Math.pow(i, 2) + Math.pow(j, 2));
            const redOffset = 190 - 120 / maxDist * dotDistTopLeft;
            const greenOffset = 190 - 120 / maxDist * dotDistTopLeft;
            const blueOffset = 200 + 10 / maxDist * dotDistTopLeft;
            gridElem.style.backgroundColor = `rgb(${redOffset}, ${greenOffset}, ${blueOffset})`;
            // const dotAnimationDelay = 0.5 * viewWidth * Math.sqrt(Math.pow(i, 2) + Math.pow(j, 2));
            // gridElem.style.animationDelay = `${dotDistTopLeft*0.5*viewWidth}ms`;
            // gridElem.style.animation = `dots-animation 2s linear ${dotAnimationDelay} infinite;`
            // console.log(dotAnimationDelay);
            dotsContainer.appendChild(gridElem);
        }
    }
}

function transformDots(scrollRatio = 0.0) {
    const dotsContainer = document.getElementById("dots-bg");
    const dotsContainerBCR = dotsContainer.getBoundingClientRect();
    const dotsContainerWidth = dotsContainerBCR.right - dotsContainerBCR.left;
    const numRow = 10;
    const numCol = Math.floor(dotsContainerWidth / rem2Px(3.6));
    const waveCycle = dotsContainerWidth / rem2Px(18);
    const dots = document.getElementsByClassName('small-dots');
    const maxDist = Math.sqrt(Math.pow(numRow, 2) + Math.pow(numCol, 2));
    for (let i = 0; i < numRow; i++) {
        for (let j = 0; j < numCol; j++) {
            const dot = dots[i * numCol + j];
            shiftMag = -20 * Math.sin(j * waveCycle * Math.PI / numCol + scrollRatio);
            dot.style.transform = `translate(0, ${shiftMag}px)`;
            const dotDistTopLeft = Math.sqrt(Math.pow(i, 2) + Math.pow(j, 2));
            const redOffset = 190 - 120 / maxDist * dotDistTopLeft - 30 * scrollRatio;
            const greenOffset = 190 - 120 / maxDist * dotDistTopLeft;
            const blueOffset = 200 + 10 / maxDist * dotDistTopLeft;
            dot.style.backgroundColor = `rgb(${redOffset}, ${greenOffset}, ${blueOffset})`;
        }
    }
}

function dotScroll() {
    const scrollRatio = -2 * Math.PI * (this.scrollLeft / (this.scrollWidth - this.clientWidth));
    // console.log(`horizontal scrolling: ${this.scrollLeft}`)
    // console.log(`scroll percentage:${scrollPercentage}`);
    console.log(scrollRatio);
    transformDots(scrollRatio);
}

function maskScroll() {
    // const maskContainer = document.getElementsByClassName('mask-container');
    const mask = document.getElementById('mask');
    // const maskBCR = maskContainer[0].getBoundingClientRect();
    const maskBCR = mask.getBoundingClientRect();
    const maskText = document.getElementById('mask-text');
    // console.log(maskBCR.top);
    if (maskBCR.top <= (viewHeight * 4 / 10)) {
        mask.style.opacity = 1;
        shatterMask(0);
        mask.style.animation = 'mask-animation 2s cubic-bezier(.93,.01,.4,1) 1800ms forwards'
        setTimeout(() => {
            mask.style.zIndex = 1,
                maskText.style.transform = 'translateY(-50%) scale(1)';
        }, 2500);
        // mask.style.transform = 'rotateY(180deg)';
        //     mask.style.transform = 'rotateY(180deg)';
        //     mask.style.top = '50%';
    }
    // if (maskBCR.top <= (viewHeight * 8.5 / 10)) {
    //     mask.style.opacity = 1;
    // }
    /*else {
           shatterMask(1);
           // mask.style.transform = 'rotateY(0deg)';
           //     mask.style.transform = 'rotateY(0deg)';
           //     mask.style.top = '0%';
       }
       // if ((viewHeight * 3 / 10) >= maskBCR.top) {
       // } else {
       // }*/
}

function shatterMask(scale_factor) {
    const maskSvg = document.getElementById('mask');
    const leftMaskFragments = maskSvg.children[0].children[0].children[0].children;
    const rightMaskFragments = maskSvg.children[0].children[0].children[1].children;
    // for (const fragment of leftMask.children) {
    //     fragmentPoint = fragment.getAttribute('points').split(' ');
    for (let i = 0; i < leftMaskFragments.length; i++) {
        fragmentOffsetX = scale_factor * 1 / 4 * leftMaskOffset[i][0];
        fragmentOffsetY = scale_factor * 1 / 3 * leftMaskOffset[i][1];
        leftMaskFragments[i].style.transform = `rotateX(${scale_factor*leftMaskRotate[i][0]}deg) rotateY(${scale_factor*leftMaskRotate[i][1]}deg) rotateZ(${scale_factor*leftMaskRotate[i][2]}deg) translate(${fragmentOffsetX}%, ${fragmentOffsetY}%)`;
        leftMaskFragments[i].style.opacity = 1;
        // leftMaskFragments[i].style.transform = `translate(${fragmentOffsetX}%, ${fragmentOffsetY}%) rotateY(${scale_factor*leftMaskRotate[i][0]}deg)`;
        // leftMaskFragments[i].style.transform = `translate(${fragmentOffsetX}%, ${fragmentOffsetY}%) rotate3d(${scale_factor*leftMaskRotate[i][0]}, ${scale_factor*leftMaskRotate[i][1]}, ${scale_factor*leftMaskRotate[i][2]}, ${scale_factor*leftMaskRotate[i][3]}deg)`;
    }
    for (let j = 0; j < rightMaskFragments.length; j++) {
        fragmentOffsetX = scale_factor * 1 / 4 * rightMaskOffset[j][0];
        fragmentOffsetY = scale_factor * 1 / 3 * rightMaskOffset[j][1];
        rightMaskFragments[j].style.transform = `rotateX(${scale_factor*rightMaskRotate[j][0]}deg) rotateY(${scale_factor*rightMaskRotate[j][1]}deg) rotateZ(${scale_factor*rightMaskRotate[j][2]}deg) translate(${fragmentOffsetX}%, ${fragmentOffsetY}%)`;
        rightMaskFragments[j].style.opacity = 1;
        // rightMaskFragments[j].style.transform = `translate(${fragmentOffsetX}%, ${fragmentOffsetY}%) rotateY(${scale_factor*rightMaskRotate[j][0]}deg)`;
        // rightMaskFragments[j].style.transform = `translate(${fragmentOffsetX}%, ${fragmentOffsetY}%) rotate3d(${scale_factor*rightMaskRotate[j][0]}, ${scale_factor*rightMaskRotate[j][1]}, ${scale_factor*rightMaskRotate[j][2]}, ${scale_factor*rightMaskRotate[j][3]}deg)`;
    }
}

function calcMaskOffset() {
    const maskSvg = document.getElementById('mask');
    const leftMask = maskSvg.children[0].children[0].children[0];
    const rightMask = maskSvg.children[0].children[0].children[1];
    var leftMaskOffset = [];
    var rightMaskOffset = [];
    var leftMaskRotate = [];
    var rightMaskRotate = [];
    for (const fragment of leftMask.children) {
        fragmentPoints = fragment.getAttribute('points').split(' ');
        var totalX = 0;
        var totalY = 0;
        for (var i = 0; i < (fragmentPoints.length) / 2; i++) {
            totalX += Number(fragmentPoints[(2 * i)]);
            totalY += Number(fragmentPoints[(2 * i) + 1]);
        }
        leftMaskOffset.push([(totalX * 2 / fragmentPoints.length) - 140, (totalY * 2 / fragmentPoints.length) - 80])
            // leftMaskRotate.push([Math.random(), Math.random(), Math.random(), (180 * Math.random()) - 90]);
        leftMaskRotate.push([(180 * Math.random()) - 90, (180 * Math.random()) - 90, (180 * Math.random()) - 90]);
    }
    for (const fragment of rightMask.children) {
        fragmentPoints = fragment.getAttribute('points').split(' ');
        var totalX = 0;
        var totalY = 0;
        for (var i = 0; i < (fragmentPoints.length) / 2; i++) {
            totalX += Number(fragmentPoints[(2 * i)]);
            totalY += Number(fragmentPoints[(2 * i) + 1]);
        }
        rightMaskOffset.push([totalX * 2 / fragmentPoints.length, (totalY * 2 / fragmentPoints.length) - 80])
            // rightMaskRotate.push([Math.random(), Math.random(), Math.random(), (360 * Math.random()) - 180]);
        rightMaskRotate.push([(90 * Math.random()) - 45, (80 * Math.random()) - 40, (80 * Math.random()) - 40]);
    }
    return { leftMaskOffset, rightMaskOffset, leftMaskRotate, rightMaskRotate };
}

function uiuxScroll() {
    const uiuxBCR = uiuxCont[0].getBoundingClientRect();
    if (uiuxBCR.top <= (viewHeight * 8 / 10)) {
        uiuxCont[0].style.opacity = 1;
    }
}

function skillDirecScroll() {
    const skillsDirec = document.getElementById('skills-direc');
    if (skillsDirec.getBoundingClientRect().top <= (viewHeight * 5 / 10)) {
        // skillsDirec.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)';
        skillsDirec.style.transform = 'scale(1)';
    }
}

function softSkillsScroll() {
    const softSkillsUl = document.getElementById('soft-skills-ul');
    const softSkillsSwipe = document.getElementById('soft-skills-swipe');
    if (softSkillsUl.getBoundingClientRect().top <= (viewHeight * 5 / 10)) {
        softSkillsUl.style.opacity = 1;
        softSkillsSwipe.style.opacity = 1;
    }
}

function generalDirecMinMax(isMin) {
    if (isMin) {
        generalDirec.style.transform = 'scale(0.8)';
        generalDirec.style.opacity = 0;
    } else {
        generalDirec.style.transform = 'scale(1)';
        generalDirec.style.opacity = 1;
    }
}

function calcDirecTransOrigin(skillsCategory) {
    const generalDirecBCR = generalDirec.getBoundingClientRect();
    const skillsCategoryBCR = skillsCategory.getBoundingClientRect();
    const direcIconX = (skillsCategoryBCR.left + skillsCategoryBCR.right) / 2;
    const direcIconY = (skillsCategoryBCR.top + skillsCategoryBCR.bottom) / 2;
    const direcIconOffsetX = 100 * (direcIconX - generalDirecBCR.left) / (generalDirecBCR.right - generalDirecBCR.left);
    const direcIconOffsetY = 100 * (direcIconY - generalDirecBCR.top) / (generalDirecBCR.bottom - generalDirecBCR.top);
    return { direcIconOffsetX, direcIconOffsetY };
    // console.log(`${direcIconOffsetX}% ${direcIconOffsetY}%`);
    // console.log(`${(skillsCategoryBCR.left)}`)
}

function skillsCategoryClicked(skillID, openClose) {
    let direcClicked = '';
    let direcDisplayStyle = 'grid';
    if (!openClose) {
        skillIDSubstring = skillID.substring(0, skillID.indexOf("-back"));
    } else {
        skillIDSubstring = skillID;
    }
    switch (skillIDSubstring) {
        case "web-development":
            direcClicked = 'webdev-direc';
            break;

        case "game-development":
            direcClicked = 'gamedev-direc';
            break;

        case "mobile-development":
            direcClicked = 'mobiledev-direc';
            break;

        case "deep-learning":
            direcClicked = 'deeplearn-direc';
            break;

        case "engineering-softwares":
            direcClicked = 'engsoft-direc';
            break;

        case "design-skills":
            direcClicked = 'design-direc';
            break;

        case "others-skills":
            direcClicked = 'others-direc';
            break;

        case "terminal-skills":
            direcClicked = 'terminal';
            direcDisplayStyle = 'block';
            break;

        default:
            console.log('case not included');
            direcClicked = 'terminal';
            break;
    }
    const direcClickElem = document.getElementById(direcClicked);
    const { direcIconOffsetX, direcIconOffsetY } = calcDirecTransOrigin(document.getElementById(skillIDSubstring));
    direcClickElem.style.transformOrigin = `${direcIconOffsetX}% ${direcIconOffsetY}%`;
    if (openClose) {
        generalDirecMinMax(true);
        direcClickElem.style.display = direcDisplayStyle;
        setTimeout(() => {
            direcClickElem.style.opacity = 1,
                direcClickElem.style.transform = 'scale(1)';
        }, 10);
    } else {
        generalDirecMinMax(false);
        direcClickElem.style.opacity = 0;
        direcClickElem.style.transform = 'scale(0.2)';
        setTimeout(() => {
            direcClickElem.style.display = 'none';
        }, 500);
    }
}

function projectIconScroll() {
    const projectIconContainer = document.getElementsByClassName('project-icon-container');
    const projectIconBCR = projectIconContainer[0].getBoundingClientRect();
    const projectLines = document.getElementsByClassName('project-line');
    const tickSquares = document.getElementsByClassName('tick-square');
    if (projectIconBCR.top <= (viewHeight * 4 / 10)) {
        projectIconContainer[0].style.opacity = 1;
        for (let index = 0; index < projectLines.length; index++) {
            projectLines[index].style.animation = 'scalex-animation 2s cubic-bezier(0.075, 0.82, 0.165, 1) forwards';
            projectLines[index].style.animationDelay = `${index*500}ms`;
        }
        for (let index = 0; index < tickSquares.length; index++) {
            tickSquares[index].style.animation = 'clippath-bottomleft-topright 2s cubic-bezier(0.075, 0.82, 0.165, 1) forwards';
            tickSquares[index].style.animationDelay = `${index*500+200}ms`;
        }
    }
}

function footerLineScroll() {
    const footerLine = document.getElementsByClassName('footer-line');
    const footer = document.querySelector('footer');
    if (footer.getBoundingClientRect().top <= (0.95 * viewHeight)) {
        footer.style.opacity = 1;
        footerLine[0].style.transform = 'scaleX(1)';
    }
}

function createSoftSkillsSwipe() {
    const svgns = "http://www.w3.org/2000/svg";
    const softSkillsSwipe = document.getElementById('soft-skills-swipe');
    const swipeLineSVG = document.createElementNS(svgns, "svg");
    const svgDefs = document.createElementNS(svgns, 'defs');
    const svgGradient = document.createElementNS(svgns, 'linearGradient')
    const svgStop1 = document.createElementNS(svgns, 'stop');
    const svgStop2 = document.createElementNS(svgns, 'stop');
    svgStop1.setAttribute('offset', '0%');
    svgStop1.setAttribute('stop-color', 'rgba(140,140,140,1)');
    svgGradient.appendChild(svgStop1);
    svgStop2.setAttribute('offset', '100%');
    svgStop2.setAttribute('stop-color', 'rgba(255,255,255,0)');
    svgGradient.appendChild(svgStop2);
    svgGradient.id = 'SwipeGradient';
    // svgGradient.setAttribute('x1', '0');
    // svgGradient.setAttribute('x2', '0');
    // svgGradient.setAttribute('y1', '0');
    // svgGradient.setAttribute('y2', '1');
    svgDefs.appendChild(svgGradient);
    swipeLineSVG.appendChild(svgDefs);
    const svgWidth = viewWidth - rem2Px(8);
    const svgHeight = rem2Px(1);
    swipeLineSVG.setAttribute("width", `${svgWidth}px`);
    swipeLineSVG.setAttribute("height", `${svgHeight}px`);
    const arrowOffset = rem2Px(1);
    const swipeLineShort = document.createElementNS(svgns, "polygon");
    swipeLineShort.setAttribute("fill", "#aaaaaa");
    swipeLineShort.setAttribute("points", `${arrowOffset} 0 ${0.2*svgWidth} 0 ${0.2*svgWidth-arrowOffset} ${svgHeight/2} ${0.2*svgWidth} ${svgHeight} ${arrowOffset} ${svgHeight} 0 ${svgHeight/2}`);
    swipeLineSVG.appendChild(swipeLineShort);
    const swipeLineLong = document.createElementNS(svgns, "polygon");
    // swipeLineLong.setAttribute("fill", "#cccccc");
    swipeLineLong.setAttribute("fill", "url(#SwipeGradient)");
    swipeLineLong.setAttribute("points", `${0.2*svgWidth+arrowOffset} 0 ${svgWidth} 0 ${svgWidth-arrowOffset} ${svgHeight/2} ${svgWidth} ${svgHeight} ${0.2*svgWidth+arrowOffset} ${svgHeight} ${0.2*svgWidth} ${svgHeight/2}`);
    swipeLineSVG.appendChild(swipeLineLong);
    softSkillsSwipe.appendChild(swipeLineSVG);
}

function contactScroll() {
    const contactText = document.getElementById('contact-text');
    const mailContainer = document.getElementById('mail-container');
    const mailBack = document.getElementById('mail-back');
    const mailFront = document.getElementById('mail-front');
    if (contactText.getBoundingClientRect().top <= viewHeight * 7 / 10) {
        contactText.style.opacity = 1;
        contactText.style.transform = 'scale(1)';
        contactText.style.top = 0;
        mailBack.style.animation = 'mail-back-animation 2s ease-in-out forwards';
        mailBack.style.animationDelay = '1s';
        mailFront.style.animation = 'mail-front-animation 2s ease-in-out forwards';
        mailFront.style.animationDelay = '1s';
        setTimeout(() => {
            mailBack.style.display = 'none';
        }, 2000);
    }
}


const { leftMaskOffset, rightMaskOffset, leftMaskRotate, rightMaskRotate } = calcMaskOffset();
const viewHeight = document.documentElement.clientHeight;
const viewWidth = document.documentElement.clientWidth;
const uiuxCont = document.getElementsByClassName('uiux-container');
const generalDirec = document.getElementById('general-direc');
const skillsCategories = document.getElementsByClassName('skills-category');
// const skillsCategory = document.getElementById('web-development');
createDots();
transformDots(0);
shatterMask(1);
createSoftSkillsSwipe();
navListHover('home');
window.addEventListener("scroll", lineDecorScroll, false);
window.addEventListener("scroll", maskScroll, false);
window.addEventListener("scroll", uiuxScroll, false);
window.addEventListener("scroll", projectIconScroll, false);
window.addEventListener("scroll", skillDirecScroll, false);
window.addEventListener("scroll", softSkillsScroll, false);
window.addEventListener("scroll", contactScroll, false);
window.addEventListener("scroll", footerLineScroll, false);

for (const skillsCategory of skillsCategories) {
    skillsCategory.addEventListener("click", function() { skillsCategoryClicked(skillsCategory.id, true); }, false);
}

const backContainers = document.getElementsByClassName('back-container');
for (const backContainer of backContainers) {
    backContainer.addEventListener("click", function() { skillsCategoryClicked(backContainer.id, false); }, false);
}
const terminalBackButton = document.getElementById('terminal-skills-back');
terminalBackButton.addEventListener("click", function() { skillsCategoryClicked('terminal-skills-back', false); }, false);
// console.log(backContainers[0]);

// skillsCategories[0].addEventListener("click", skillsCategoryClicked);
// console.log(rightMaskOffset);
// window.addEventListener('resize', createDots, false);
const dotBG = document.querySelector(".scroll-wrapper");
dotBG.addEventListener("scroll", dotScroll, false);
// shatterMask();
// const maskSvg = document.getElementById('mask');
// const leftMask = maskSvg.children[0].children[0].children[0];
// const rightMask = maskSvg.children[0].children[0].children[1];
// const leftMaskPoints = leftMask.children[0].getAttribute("points");
// const leftMaskPointsArray = leftMaskPoints.split(' ');