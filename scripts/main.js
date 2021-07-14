function expandMenu() {
    console.log('Menu expanded')
    const expandedMenu = document.getElementById('expanded-menu');
    const triangleLeft = document.getElementById('triangle-left');
    // // var menuTriangle = document.getElementById("menu-triangle");
    const navBar = document.querySelector('nav');
    const menuButton = document.getElementById('collapse-menu-button');
    if (expandedMenu.style.display !== 'flex') {
        //     // if (expandedMenu.style.opacity === "0") {
        //     // expandedMenu.style.display = "block";
        //     // menuTriangle.style.display = "block";
        menuButton.innerHTML = '&nbsp;&nbsp;&nbsp;{';
        //         // navBar.style.width = "calc(100% - 1.6rem)";
        navBar.style.height = '19rem';
        expandedMenu.style.display = 'flex';
        //         // triangleLeft.style.opacity = "0";
        // navLeft.style.justifyContent = 'space-between';
        triangleLeft.style.left = '100%';
        triangleLeft.style.transform = 'rotate(180deg)';
        setTimeout(() => expandedMenu.style.opacity = "1", 200);
    } else {
        // navBar.style.height = '4.4rem';
        // expandedMenu.style.display = 'none';
        // navLeft.style.justifyContent = 'flex-start';
        triangleLeft.style.left = '0%';
        triangleLeft.style.transform = 'rotate(0deg)';
        // menuTriangle.style.display = "none";
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
    var verticalLines = document.getElementsByClassName("vertical-dotline");
    for (verticalLine of verticalLines) {
        var vlBCR = verticalLine.getBoundingClientRect();
        cpRadius = 31 - (vlBCR.top / 20);
        if (cpRadius >= 10) {
            cpRadius = 10;
        } else if (cpRadius <= 2) {
            cpRadius = 2;
        } else {
            cpRadius = cpRadius;
        }
        cpString = `circle(${cpRadius}rem at 50% -0.5rem)`
        verticalLine.style["clip-path"] = cpString;
    }
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
// window.addEventListener("scroll", lineDecorScroll, false);
// window.addEventListener('resize', createDots, false);
// const dotBG = document.querySelector(".scroll-wrapper");
// dotBG.addEventListener("scroll", dotScroll, false);