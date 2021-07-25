function expandMenu() {
    const expandedMenu = document.getElementById('expanded-menu');
    const triangleLeft = document.getElementById('triangle-left');
    // // var menuTriangle = document.getElementById("menu-triangle");
    const navBar = document.querySelector('nav');
    const menuButton = document.getElementById('collapse-menu-button');
    if (expandedMenu.style.display !== 'flex') {
        menuButton.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;{';
        navBar.style.height = '17rem';

        triangleLeft.style.left = '100%';
        triangleLeft.style.transform = 'rotate(180deg)';
        setTimeout(() => { expandedMenu.style.display = 'flex', expandedMenu.style.opacity = "1"; }, 200);
    } else {
        triangleLeft.style.left = '0%';
        triangleLeft.style.transform = 'rotate(0deg)';
        expandedMenu.style.opacity = "0";
        setTimeout(() => { navBar.style.height = "4.4rem", expandedMenu.style.display = "none", menuButton.innerHTML = '{...}'; }, 200);
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

function createDots(scrollRatio = 0.0) {
    var softSkills = document.getElementById("dots-bg");
    softSkills.innerHTML = "";
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const numCol = Math.floor(vw / rem2Px(1.9));
    const waveWidth = (vw - (rem2Px(1.8) * numCol)) / 2;
    softSkills.style.marginLeft = `${waveWidth}px`;
    numRow = 20;
    for (let i = 0; i < numRow; i++) {
        let tableRow = document.createElement("tr")
        for (let j = 0; j < numCol; j++) {
            let tableElem = document.createElement("td");
            tableElem.classList.add("small-dots");
            shiftMag = -20 * Math.sin(j * 2 * Math.PI / numCol + scrollRatio);
            tableElem.style.transform = `translate(0, ${shiftMag}px)`;
            // tableElem.style.width = `${1/numCol*100}%`
            tableRow.appendChild(tableElem);
        }
        softSkills.appendChild(tableRow);
        // document.body.appendChild(tag);
    }
}

function dotScroll() {
    const scrollRatio = 2 * Math.PI * (this.scrollLeft / (this.scrollWidth - this.clientWidth));
    // console.log(`horizontal scrolling: ${this.scrollLeft}`)
    // console.log(`scroll percentage:${scrollPercentage}`);
    createDots(scrollRatio);
}

function maskScroll() {
    // const maskContainer = document.getElementsByClassName('mask-container');
    const mask = document.getElementById('mask');
    // const maskBCR = maskContainer[0].getBoundingClientRect();
    const maskBCR = mask.getBoundingClientRect();
    const maskText = document.getElementById('mask-text');
    // console.log(maskBCR.top);
    if ((viewHeight * 4 / 10) >= maskBCR.top) {
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
    if ((viewHeight * 8.5 / 10) >= maskBCR.top) {
        mask.style.opacity = 1;
    }
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
        // leftMaskFragments[i].style.transform = `translate(${fragmentOffsetX}%, ${fragmentOffsetY}%) rotateY(${scale_factor*leftMaskRotate[i][0]}deg)`;
        // leftMaskFragments[i].style.transform = `translate(${fragmentOffsetX}%, ${fragmentOffsetY}%) rotate3d(${scale_factor*leftMaskRotate[i][0]}, ${scale_factor*leftMaskRotate[i][1]}, ${scale_factor*leftMaskRotate[i][2]}, ${scale_factor*leftMaskRotate[i][3]}deg)`;
    }
    for (let j = 0; j < rightMaskFragments.length; j++) {
        fragmentOffsetX = scale_factor * 1 / 4 * rightMaskOffset[j][0];
        fragmentOffsetY = scale_factor * 1 / 3 * rightMaskOffset[j][1];
        rightMaskFragments[j].style.transform = `rotateX(${scale_factor*rightMaskRotate[j][0]}deg) rotateY(${scale_factor*rightMaskRotate[j][1]}deg) rotateZ(${scale_factor*rightMaskRotate[j][2]}deg) translate(${fragmentOffsetX}%, ${fragmentOffsetY}%)`;
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
        leftMaskRotate.push([(90 * Math.random()) - 45, (80 * Math.random()) - 40, (80 * Math.random()) - 40]);
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
    if ((viewHeight * 8 / 10) >= uiuxBCR.top) {
        uiuxCont[0].style.opacity = 1;
    }
}

// createDots(0);
const { leftMaskOffset, rightMaskOffset, leftMaskRotate, rightMaskRotate } = calcMaskOffset();
const viewHeight = document.documentElement.clientHeight;
const uiuxCont = document.getElementsByClassName('uiux-container');
shatterMask(1);
window.addEventListener("scroll", lineDecorScroll, false);
window.addEventListener("scroll", maskScroll, false);
window.addEventListener("scroll", uiuxScroll, false);
// console.log(rightMaskOffset);
// window.addEventListener('resize', createDots, false);
// const dotBG = document.querySelector(".scroll-wrapper");
// dotBG.addEventListener("scroll", dotScroll, false);
// shatterMask();
// const maskSvg = document.getElementById('mask');
// const leftMask = maskSvg.children[0].children[0].children[0];
// const rightMask = maskSvg.children[0].children[0].children[1];
// const leftMaskPoints = leftMask.children[0].getAttribute("points");
// const leftMaskPointsArray = leftMaskPoints.split(' ');
// console.log(leftMaskPointsArray.length);