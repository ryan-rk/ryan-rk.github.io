function expandMenu() {
    console.log('expand menu activated');
    const expandedMenu = document.getElementById('expanded-menu');
    const triangleLeft = document.getElementById('nav-click-triangle');
    // // var menuTriangle = document.getElementById("menu-triangle");
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
            navListTriangle.style.filter = "contrast(100%)";
            currentPageBg.style.transform = 'scaleY(1)'
            currentPageTriangle.style.filter = 'contrast(0%)';
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
    }

    const allh1 = document.querySelectorAll('h1');
    for (h1 of allh1) {
        const h1BCR = h1.getBoundingClientRect();
        if (h1BCR.top <= viewHeight * 3 / 5) {
            h1.style.transform = 'scaleX(1)';
            h1.style.opacity = 1;
        }
    }
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
    return dotsContainerWidth;
}

function transformDots(scrollRatio = 0.0) {
    // const dotsContainer = document.getElementById("dots-bg");
    // const dotsContainerBCR = dotsContainer.getBoundingClientRect();
    // const dotsContainerWidth = dotsContainerBCR.right - dotsContainerBCR.left;
    const numRow = 10;
    const numCol = Math.floor(dotsContainerWidth / rem2Px(3.6));
    const waveCycle = dotsContainerWidth / rem2Px(18);
    const dots = document.getElementsByClassName('small-dots');
    const maxDist = Math.sqrt(Math.pow(numRow, 2) + Math.pow(numCol, 2));
    for (let i = 0; i < numRow; i++) {
        for (let j = 0; j < numCol; j++) {
            const dot = dots[i * numCol + j];
            const dotDistTopLeft = Math.sqrt(Math.pow(i, 2) + Math.pow(j, 2));
            shiftMag = -1 * Math.sin(dotDistTopLeft * waveCycle * Math.PI / numCol + scrollRatio);
            dot.style.transform = `translate(${shiftMag}rem, ${shiftMag}rem)`;
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
    transformDots(scrollRatio, dotsContainerWidth);
}

function maskScroll() {
    // const maskContainer = document.getElementsByClassName('mask-container');
    const mask = document.getElementById('mask');
    const maskText = document.getElementsByClassName('mask-text');
    // const maskBCR = maskContainer[0].getBoundingClientRect();
    const maskTextContainer = document.getElementById('mask-text-container');
    const maskFragmentsClass = document.getElementsByClassName('mask-fragments');
    if ((maskTextContainer.getBoundingClientRect().top + maskTextContainer.getBoundingClientRect().bottom) / 2 <= (viewHeight * 6 / 10)) {
        maskText[0].style.opacity = 1;
        // setTimeout(() => {
        //     maskText[1].style.opacity = 1;
        // }, 5000);
        setTimeout(() => {
            for (const maskFragment of maskFragmentsClass) {
                // maskFragment.style.animation = 'fade-in-animation 1000ms ease-in forwards';
                maskFragment.style.animationName = 'fade-in-animation';
                maskFragment.style.animationDuration = '10ms';
                // maskFragment.style.transition = 'transform 1500ms cubic-bezier(.73, .06, .82, .38)';
            }
        }, 2000);
        setTimeout(() => {
            // mask.style.opacity = 1;
            maskText[1].style.display = 'block';
            shatterMask(1);
            // maskTextContainer.style.transform = 'scale(1)';
            // mask.style.animation = 'mask-animation 2s cubic-bezier(.93,.01,.4,1) 1800ms forwards'
        }, 5000);
        setTimeout(() => {
            shatterMask(0),
                mask.style.transform = 'scale(0.8)',
                mask.style.filter = 'blur(0.5rem)',
                mask.style.opacity = 0.6,
                mask.style.zIndex = 1;
        }, 6400);
        window.removeEventListener("scroll", maskScroll);
    }
    // else {
    //     for (const maskFragment of maskFragmentsClass) {
    //         maskFragment.style.transition = 'transform 1500ms cubic-bezier(.38, .82, .06, .73)';
    //     }
    //     // shatterMask(1);
    // }
    // mask.style.opacity = 1;
    // shatterMask(1);
}

function shatterMask(scale_factor) {
    // const maskSvg = document.getElementById('mask');
    // const leftMaskFragments = maskSvg.children[0].children[0].children[0].children;
    // const rightMaskFragments = maskSvg.children[0].children[0].children[1].children;
    const maskFragments = document.getElementsByClassName('mask-fragments');
    // for (const fragment of leftMask.children) {
    //     fragmentPoint = fragment.getAttribute('points').split(' ');
    for (let i = 0; i < maskFragments.length; i++) {
        fragmentOffsetX = scale_factor * 8 * maskFragmentsOffset[i][0];
        fragmentOffsetY = scale_factor * 10 * maskFragmentsOffset[i][1];
        if (scale_factor === 0) {
            maskFragments[i].style.transition = 'transform 1500ms cubic-bezier(.73, .06, .82, .38)';
        } else {
            maskFragments[i].style.transition = 'transform 1500ms cubic-bezier(.38, .82, .06, .73)';
        }
        maskFragments[i].style.transform = `translate(${fragmentOffsetX}%, ${fragmentOffsetY}%)`;
    }
}

function calcMaskOffset() {
    // const maskSvg = document.getElementById('mask');
    const maskFragments = document.getElementsByClassName('mask-fragments');
    // const leftMaskFragments = maskSvg.children[0].children[0].children[0].children;
    // const rightMaskFragments = maskSvg.children[0].children[0].children[1].children;
    var maskFragmentsOffset = [];
    // var leftMaskOffset = [];
    // var rightMaskOffset = [];
    var maskOverallXOffset = [];
    // for (const leftMaskFragment of leftMaskFragments) {
    for (var fragment = 0; fragment < maskFragments.length; fragment++) {
        fragmentPoints = maskFragments[fragment].getAttribute('points').split(' ');
        var totalX = 0;
        var totalY = 0;
        for (var i = 0; i < (fragmentPoints.length) / 2; i++) {
            totalX += parseFloat(fragmentPoints[(2 * i)]);
            totalY += parseFloat(fragmentPoints[(2 * i) + 1]);
        }
        // the cumulative x coor of each point is divided by total number of points / 2 since fragmentPoints contains both x and y coor
        const fragmentMeanXCoor = (totalX * 2 / fragmentPoints.length);
        const fragmentMeanYCoor = (totalY * 2 / fragmentPoints.length);
        if (fragment < 25) {
            maskFragmentsOffset.push([(fragmentMeanXCoor - 147.5), (fragmentMeanYCoor - 80)]);
            maskOverallXOffset.push(147.5 - fragmentMeanXCoor);
        } else {
            maskFragmentsOffset.push([(fragmentMeanXCoor), (fragmentMeanYCoor - 80)]);
            maskOverallXOffset.push(fragmentMeanXCoor);
        }
    }
    var xOffsetSortOrder = new Array(maskOverallXOffset.length);
    for (var i = 0; i < maskOverallXOffset.length; ++i) {
        xOffsetSortOrder[i] = i;
    }
    xOffsetSortOrder.sort(function(a, b) { return maskOverallXOffset[a] < maskOverallXOffset[b] ? -1 : maskOverallXOffset[a] > maskOverallXOffset[b] ? 1 : 0; });
    for (let i = 0; i < maskFragments.length; i++) {
        // maskFragments[i].style.animationDelay = `${i*100}ms`;
        maskFragments[xOffsetSortOrder[i]].style.animationDelay = `${(Math.log(i*0.25+0.5)-Math.log(0.5))*600}ms`;
        // maskFragments[i].setAttribute('fill', `rgb(${maskOverallXOffset[i]*3},0,0)`);
    }
    return maskFragmentsOffset;
}

function uiuxScroll() {
    const uiuxBCR = uiuxCont[0].getBoundingClientRect();
    if (uiuxBCR.top <= (viewHeight * 8 / 10)) {
        uiuxCont[0].style.opacity = 1;
        window.removeEventListener("scroll", uiuxScroll);
    }
}

function skillDirecScroll() {
    const skillsDirec = document.getElementById('skills-direc');
    if (skillsDirec.getBoundingClientRect().top <= (viewHeight * 5 / 10)) {
        // skillsDirec.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)';
        skillsDirec.style.transform = 'scale(1)';
        window.removeEventListener("scroll", skillDirecScroll);
    }
}

function softSkillsScroll() {
    const softSkillsUl = document.getElementById('soft-skills-ul');
    const softSkillsSwipe = document.getElementById('soft-skills-swipe');
    if (softSkillsUl.getBoundingClientRect().top <= (viewHeight * 6 / 10)) {
        softSkillsUl.style.opacity = 1;
        softSkillsSwipe.style.opacity = 1;
        softSkillsSwipe.children[0].style.animation = 'softskills-arrow-animation 5s cubic-bezier(0.075, 0.82, 0.165, 1) infinite';
        window.removeEventListener("scroll", softSkillsScroll);
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
        window.removeEventListener("scroll", projectIconScroll);
    }
}

function footerLineScroll() {
    const footerLine = document.getElementsByClassName('footer-line');
    const footer = document.querySelector('footer');
    if (footer.getBoundingClientRect().top <= (0.95 * viewHeight)) {
        footer.style.opacity = 1;
        footerLine[0].style.transform = 'scaleX(1)';
        window.removeEventListener("scroll", footerLineScroll);
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
        mailBack.style.animation = 'mail-back-animation 1s ease-in-out forwards';
        mailBack.style.animationDelay = '1s';
        mailFront.style.animation = 'mail-front-animation 1s ease-in-out forwards';
        mailFront.style.animationDelay = '1s';
        setTimeout(() => {
            mailBack.style.display = 'none';
        }, 1500);
        window.removeEventListener("scroll", contactScroll);
    }
}


const maskFragmentsOffset = calcMaskOffset();
const viewHeight = document.documentElement.clientHeight;
const viewWidth = document.documentElement.clientWidth;
const uiuxCont = document.getElementsByClassName('uiux-container');
const generalDirec = document.getElementById('general-direc');
const skillsCategories = document.getElementsByClassName('skills-category');
// const skillsCategory = document.getElementById('web-development');
const dotsContainerWidth = createDots();
transformDots(0);
// shatterMask(0);
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
// window.addEventListener('resize', () => {
//     createDots();
//     transformDots(0);
// });
const dotBG = document.querySelector(".scroll-wrapper");
dotBG.addEventListener("scroll", dotScroll, false);
// shatterMask();
// const maskSvg = document.getElementById('mask');
// const leftMask = maskSvg.children[0].children[0].children[0];
// const rightMask = maskSvg.children[0].children[0].children[1];
// const leftMaskPoints = leftMask.children[0].getAttribute("points");
// const leftMaskPointsArray = leftMaskPoints.split(' ');

// fix issue of nav bar display changed to none after clicking collapse menu button in mobile mode
if (matchMedia) {
    const mq = window.matchMedia("(min-width: 50rem)");
    mq.addEventListener("change", () => {
        navBarOnResize(mq);
    });
}

function navBarOnResize(mq) {
    const expandedMenu = document.getElementById('expanded-menu');
    const navBar = document.querySelector('nav');
    const triangleLeft = document.getElementById('nav-click-triangle');
    const menuButton = document.getElementById('collapse-menu-button');
    if (mq.matches) {
        triangleLeft.style.left = '0%';
        triangleLeft.style.transform = 'rotate(0deg)';
        menuButton.innerHTML = '{...}';

        navBar.style.height = '4.4rem';
        expandedMenu.style.display = 'flex';
        expandedMenu.style.opacity = 1;
    } else {
        expandedMenu.style.display = 'none';
        expandedMenu.style.opacity = 0;
    }
}