// --- Functions for general purposes ---
// convert rem value to pixel
function rem2Px(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}



// --- Functions for Navbar ---
// Functions dealing with click to expand/hide mobile menu
function expandMenu() {
    console.log('expand menu activated');
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



// --- Functions dealing with mask animation in biodata section ---
// Shatter or unshatter the mask
function shatterMask(isShatter) {
    const maskFragments = document.getElementsByClassName('mask-fragments');
    for (let i = 0; i < maskFragments.length; i++) {
        fragmentOffsetX = isShatter * 8 * maskFragmentsOffset[i][0];
        fragmentOffsetY = isShatter * 10 * maskFragmentsOffset[i][1];
        if (isShatter === 0) {
            maskFragments[i].style.transition = 'transform 1500ms cubic-bezier(.73, .06, .82, .38)';
        } else {
            maskFragments[i].style.transition = 'transform 1500ms cubic-bezier(.38, .82, .06, .73)';
        }
        const randomDeg = Math.random() * (90 + 90) - 90;
        const randomAxis1 = Math.random() * 2 - 1;
        const randomAxis2 = Math.random() * 2 - 1;
        const randomAxis3 = Math.random() * 2 - 1;
        // maskFragments[i].style.transform = `translate(${fragmentOffsetX}%, ${fragmentOffsetY}%) rotate(${isShatter * randomDeg}deg)`;
        maskFragments[i].style.transform = `translate(${fragmentOffsetX}%, ${fragmentOffsetY}%) rotate3d(${randomAxis1}, ${randomAxis2}, ${randomAxis3}, ${isShatter * randomDeg}deg)`;
    }
}

// Generate a random offset for each of the mask fragments based on distance from center
function calcMaskOffset() {
    const maskFragments = document.getElementsByClassName('mask-fragments');
    var maskFragmentsOffset = [];
    var maskOverallXOffset = [];
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
    // Calculate and set the animation delay of each fragments by sorting with the distance from center
    var xOffsetSortOrder = new Array(maskOverallXOffset.length);
    for (var i = 0; i < maskOverallXOffset.length; ++i) {
        xOffsetSortOrder[i] = i;
    }
    xOffsetSortOrder.sort(function(a, b) { return maskOverallXOffset[a] < maskOverallXOffset[b] ? -1 : maskOverallXOffset[a] > maskOverallXOffset[b] ? 1 : 0; });
    for (let i = 0; i < maskFragments.length; i++) {
        maskFragments[xOffsetSortOrder[i]].style.animationDelay = `${(Math.log(i*0.25+0.5)-Math.log(0.5))*600}ms`;
    }
    return maskFragmentsOffset;
}



// --- Functions dealing with skills directory in skills section ---
// Minimizing and maximizing the root directory
function generalDirecMinMax(isMin) {
    if (isMin) {
        generalDirec.style.transform = 'scale(0.8)';
        generalDirec.style.opacity = 0;
    } else {
        generalDirec.style.transform = 'scale(1)';
        generalDirec.style.opacity = 1;
    }
}

// Minimizing and maximizing the clicked directory
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

// Calculate the transform origin for each directory based on location on screen
function calcDirecTransOrigin(skillsCategory) {
    const generalDirecBCR = generalDirec.getBoundingClientRect();
    const skillsCategoryBCR = skillsCategory.getBoundingClientRect();
    const direcIconX = (skillsCategoryBCR.left + skillsCategoryBCR.right) / 2;
    const direcIconY = (skillsCategoryBCR.top + skillsCategoryBCR.bottom) / 2;
    const direcIconOffsetX = 100 * (direcIconX - generalDirecBCR.left) / (generalDirecBCR.right - generalDirecBCR.left);
    const direcIconOffsetY = 100 * (direcIconY - generalDirecBCR.top) / (generalDirecBCR.bottom - generalDirecBCR.top);
    return { direcIconOffsetX, direcIconOffsetY };
}



// --- Functions dealing with swipe arrow and dots bg in softskills section ---
// Create swipe arrow svg to indicate softskills horizontal scrolling
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
    swipeLineLong.setAttribute("fill", "url(#SwipeGradient)");
    swipeLineLong.setAttribute("points", `${0.2*svgWidth+arrowOffset} 0 ${svgWidth} 0 ${svgWidth-arrowOffset} ${svgHeight/2} ${svgWidth} ${svgHeight} ${0.2*svgWidth+arrowOffset} ${svgHeight} ${0.2*svgWidth} ${svgHeight/2}`);
    swipeLineSVG.appendChild(swipeLineLong);
    softSkillsSwipe.appendChild(swipeLineSVG);
}

// Create dots bg
function createDots() {
    const dotsContainer = document.getElementById("dots-bg");
    dotsContainer.innerHTML = "";
    const dotsContainerBCR = dotsContainer.getBoundingClientRect();
    const dotsContainerWidth = dotsContainerBCR.right - dotsContainerBCR.left;
    const numRow = 10;
    const numCol = Math.floor(dotsContainerWidth / rem2Px(3.6));
    const maxDist = Math.sqrt(Math.pow(numRow, 2) + Math.pow(numCol, 2));
    dotsContainer.style.gridTemplateColumns = `repeat(${numCol}, 1fr)`;
    dotsContainer.style.gridTemplateRows = `repeat(${numRow}, 1fr)`;
    for (let i = 0; i < numRow; i++) {
        for (let j = 0; j < numCol; j++) {
            let gridElem = document.createElement("div");
            gridElem.classList.add("small-dots");
            // const dotDistTopLeft = Math.sqrt(Math.pow(i, 2) + Math.pow(j, 2));
            // const redOffset = 190 - 120 / maxDist * dotDistTopLeft;
            // const greenOffset = 190 - 120 / maxDist * dotDistTopLeft;
            // const blueOffset = 200 + 10 / maxDist * dotDistTopLeft;
            // gridElem.style.backgroundColor = `rgb(${redOffset}, ${greenOffset}, ${blueOffset})`;
            dotsContainer.appendChild(gridElem);
        }
    }
    return dotsContainerWidth;
}

// Transform each dots with translation and colors with scrolling amount
function transformDots(scrollRatio = 0.0) {
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

// Calling transform dots with horizontal scrolling
function dotScroll() {
    const scrollRatio = -2 * Math.PI * (this.scrollLeft / (this.scrollWidth - this.clientWidth));
    transformDots(scrollRatio, dotsContainerWidth);
}



// --- Functions dealing with transition/animation of elements when scrolled into position ---
function headingScroll() {
    const allh1 = document.querySelectorAll('h1');
    for (h1 of allh1) {
        const h1BCR = h1.getBoundingClientRect();
        if (h1BCR.top <= viewHeight * 3 / 5) {
            h1.style.transform = 'scaleX(1)';
            h1.style.opacity = 1;
        }
    }

    const allh2 = document.querySelectorAll('h2');
    for (h2 of allh2) {
        const h2BCR = h2.getBoundingClientRect();
        if (h2BCR.top <= viewHeight * 7 / 10) {
            h2.style.opacity = 1;
        }
    }
}

function lineDecorScroll() {
    const verticalLines = document.getElementsByClassName("vertical-dotline");
    for (verticalLine of verticalLines) {
        const vlBCR = verticalLine.getBoundingClientRect();
        if (vlBCR.top <= viewHeight / 2) {
            verticalLine.children[0].style.opacity = 1;
            verticalLine.children[1].style.transform = 'scaleY(1)';
            verticalLine.children[2].style.opacity = 1;
        }
    }
}

function scrollUpSignScroll() {
    const scrollUpSign = document.getElementsByClassName('scrollup-sign');
    if (scrollUpSign[0].getBoundingClientRect().top <= viewHeight * 3 / 10) {
        scrollUpSign[0].style.opacity = 0;
        setTimeout(() => {
            scrollUpSign[0].style.visibility = 'hidden',
                window.removeEventListener("scroll", scrollUpSignScroll);
        }, 500);
    }
}

function uiuxScroll() {
    const uiuxCont = document.getElementsByClassName('uiux-container');
    const uiuxBCR = uiuxCont[0].getBoundingClientRect();
    if (uiuxBCR.top <= (viewHeight * 8 / 10)) {
        uiuxCont[0].style.opacity = 1;
        window.removeEventListener("scroll", uiuxScroll);
    }
}

function maskScroll() {
    const mask = document.getElementById('mask');
    const maskText = document.getElementsByClassName('mask-text');
    const maskTextContainer = document.getElementById('mask-text-container');
    const maskFragmentsClass = document.getElementsByClassName('mask-fragments');
    if ((maskTextContainer.getBoundingClientRect().top + maskTextContainer.getBoundingClientRect().bottom) / 2 <= (viewHeight * 6 / 10)) {
        maskText[0].style.opacity = 1;
        setTimeout(() => {
            for (const maskFragment of maskFragmentsClass) {
                maskFragment.style.animationName = 'fade-in-animation';
                maskFragment.style.animationDuration = '10ms';
            }
        }, 1000);
        setTimeout(() => {
            maskText[1].style.display = 'block';
            shatterMask(1);
        }, 4000);
        setTimeout(() => {
            shatterMask(0),
                mask.style.transform = 'scale(0.8)',
                mask.style.filter = 'blur(0.5rem)',
                mask.style.opacity = 0.6,
                mask.style.zIndex = 1;
        }, 5400);
        window.removeEventListener("scroll", maskScroll);
    }
}

function skillDirecScroll() {
    const skillsDirec = document.getElementById('skills-direc');
    if (skillsDirec.getBoundingClientRect().top <= (viewHeight * 5 / 10)) {
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

function contactScroll() {
    const contactText = document.getElementById('contact-text');
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

function footerLineScroll() {
    const footerLine = document.getElementsByClassName('footer-line');
    const footer = document.querySelector('footer');
    if (footer.getBoundingClientRect().top <= (0.95 * viewHeight)) {
        footer.style.opacity = 1;
        footerLine[0].style.transform = 'scaleX(1)';
        window.removeEventListener("scroll", footerLineScroll);
    }
}

const maskFragmentsOffset = calcMaskOffset();
const viewHeight = document.documentElement.clientHeight;
const viewWidth = document.documentElement.clientWidth;
const generalDirec = document.getElementById('general-direc');
const skillsCategories = document.getElementsByClassName('skills-category');
const dotsContainerWidth = createDots();
transformDots(0);
createSoftSkillsSwipe();
navListHover('home');
window.addEventListener("scroll", scrollUpSignScroll, false);
window.addEventListener("scroll", headingScroll, false);
window.addEventListener("scroll", lineDecorScroll, false);
window.addEventListener("scroll", maskScroll, false);
window.addEventListener("scroll", uiuxScroll, false);
window.addEventListener("scroll", projectIconScroll, false);
window.addEventListener("scroll", skillDirecScroll, false);
window.addEventListener("scroll", softSkillsScroll, false);
window.addEventListener("scroll", contactScroll, false);
window.addEventListener("scroll", footerLineScroll, false);

// Click events for skills directory
for (const skillsCategory of skillsCategories) {
    skillsCategory.addEventListener("click", function() { skillsCategoryClicked(skillsCategory.id, true); }, false);
}

const backContainers = document.getElementsByClassName('back-container');
for (const backContainer of backContainers) {
    backContainer.addEventListener("click", function() { skillsCategoryClicked(backContainer.id, false); }, false);
}
const terminalBackButton = document.getElementById('terminal-skills-back');
terminalBackButton.addEventListener("click", function() { skillsCategoryClicked('terminal-skills-back', false); }, false);


// Horizontal scrolling for dots bg in softskills section
const dotBG = document.querySelector(".scroll-wrapper");
dotBG.addEventListener("scroll", dotScroll, false);



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