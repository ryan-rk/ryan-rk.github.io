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
    const viewHeight = document.documentElement.clientHeight;
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

    const maskContainer = document.getElementsByClassName('mask-container');
    const mask = document.getElementById('mask');
    const maskBCR = maskContainer[0].getBoundingClientRect();
    const maskOffset = (viewHeight * 7 / 10) - maskBCR.top;
    // console.log(maskBCR.top);
    if (maskOffset >= 0) {
        mask.style.transform = 'rotateY(180deg)';
        mask.style.top = '50%';
    }
    // else {
    //     mask.style.transform = 'rotateY(0deg)';
    //     mask.style.top = '0%';
    // }

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

function testFunc() {
    console.log('resized');
}

// createDots(0);
window.addEventListener("scroll", lineDecorScroll, false);
// window.addEventListener('resize', createDots, false);
// const dotBG = document.querySelector(".scroll-wrapper");
// dotBG.addEventListener("scroll", dotScroll, false);
const allh2 = document.querySelectorAll('h2');