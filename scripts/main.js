/// Please bear with the codes, I know they are definitely screaming for refactoring and I am definitely doing it whenever I am free


class CategorySection {
    constructor(name) {
        this.name = name;
        this.isActivated = false;
        this.sectionElement = document.getElementById(name);
        const sectionQuery = "#" + name;
        this.backButton = document.querySelectorAll(sectionQuery + " .back-button");
        this.backButton[0].addEventListener('click', () => { this.backButtonClickHandler() }, false);
        this.backButton[1].addEventListener('click', () => { this.backButtonClickHandler() }, false);
        this.allH1 = document.querySelectorAll(sectionQuery + ' h1');
        this.verticalLines = document.querySelectorAll(sectionQuery + ' .vertical-dotline');
        this.initSectionH1();
    }

    backButtonClickHandler() {
        this.setActivation(false);
    }

    setActivation(isActive) {
        if (isActive) {
            if (this.isActivated) { return; }
            this.isActivated = true;
            this.sectionElement.style.display = 'flex';
            this.setH1Explosion(true);
            setTimeout(() => {
                for (const h1 of this.allH1) {
                    h1.style.opacity = 1;
                }
                this.setH1Explosion(false),
                    this.setLineDecor(true),
                    this.sectionElement.style.opacity = 1,
                    this.sectionElement.style.transform = 'translateY(0)';
                // this.manageCategoryActivation(true);
            }, 100);
        } else {
            if (!this.isActivated) { return; }
            this.isActivated = false;
            this.sectionElement.style.opacity = 0;
            this.sectionElement.style.transform = 'translateY(10vh)';
            this.setLineDecor(false);
            // this.manageCategoryActivation(false);
            setTimeout(() => {
                this.sectionElement.style.display = 'none';
            }, 500);
            if (this.name == "main") {
                expandCategoriesDiamonds();
                startDiamondContainer.style.animation = 'none';
                startDiamondContainer.style.transform = 'scale(0)';
            }
        }
    }

    initSectionH1() {
        this.explodedCharsArray = []
        for (let i = 0; i < this.allH1.length; i++) {
            this.allH1[i].innerHTML = this.allH1[i].textContent.replace(/./g, `<span class=\"exploded-chars${this.name}-${i}\">$&</span>`);

            this.explodedCharsArray.push(document.getElementsByClassName(`exploded-chars${this.name}-${i}`));
        }
    }

    setH1Explosion(isExplode) {
        for (const explodedChars of this.explodedCharsArray) {
            for (let i = 0; i < explodedChars.length; i++) {
                explodedChars[i].style.position = "relative";
                if (isExplode) {
                    explodedChars[i].style.animation = 'none';
                    let top = (Math.random() + 1) * 0.2 * innerHeight;
                    if (Math.random() < 0.5) {
                        explodedChars[i].style.top = "-" + top + "px";
                    } else {
                        explodedChars[i].style.top = top + "px";
                    }
                } else {
                    explodedChars[i].style.animation = `defrag-fade-animation 1000ms cubic-bezier(.79,.01,.15,.99) ${Math.random() * 500}ms forwards`;
                }
            }
        }
    }

    setLineDecor(isActive) {
        for (const verticalLine of this.verticalLines) {
            // verticalLine.style.transform = isActive ? 'scaleY(1)' : 'scaleY(0)';
            verticalLine.style.clipPath = isActive ? 'circle(100%)' : 'circle(0%)';
            verticalLine.children[0].style.opacity = 1;
            verticalLine.children[2].style.opacity = 1;
        }
    }

    // manageCategoryActivation(isActive) {
    //     switch (this.name) {
    //         case "main":
    //             noticeContainerActivation(isActive);
    //             break;

    //         case "biodata":
    //             break;

    //         case "contact":
    //             // if (!isActive) {
    //             //     setTimeout(() => {
    //             //         resetContactScroll();
    //             //     }, 500);
    //             // }
    //             break;

    //         case "skills":
    //             break;

    //         case "soft-skills":
    //             break;

    //         default:
    //             console.log('category index not implemented');
    //             break;
    //     }
    // }

}


// --- Functions for general purposes ---
// convert rem value to pixel
function rem2Px(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function randomIntervalInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function initializePage() {
    const backdrop = document.getElementById("backdrop");
    setTimeout(() => {
        backdrop.style.opacity = 1;
    }, 100);
}

function leavingPage() {
    const docBody = document.querySelector('body');
    docBody.style.transition = 'opacity 500ms ease-in-out';
    docBody.style.opacity = 0;
    const navBar = document.querySelector('nav');
    navBar.style.animation = 'nav-disappear-animation 500ms ease-in-out 0s forwards';
}



// --- Functions for headings and text animations
// function explodeAllH1Text() {
//     const allh1 = document.querySelectorAll('h1');
//     for (let i = 0; i < allh1.length; i++) {
//         const h1 = allh1[i];
//         if (h1.id != 'home-title') {
//             explodeH1Text(h1, i);
//         }
//     }
// }

// function explodeH1Text(h1element, elementIndex) {
//     h1element.innerHTML = h1element.textContent.replace(/./g, `<span class=\"exploded-chars${elementIndex}\">$&</span>`);

//     let explodedChars = document.getElementsByClassName(`exploded-chars${elementIndex}`);
//     for (let i = 0; i < explodedChars.length; i++) {
//         explodedChars[i].style.position = "relative";
//         // let left = innerWidth * Math.random();
//         // let left = innerWidth;
//         // if (Math.random() < 0.5) {
//         //     explodedChars[i].style.left = "-" + left + "px";
//         // } else {
//         //     explodedChars[i].style.left = left + "px";
//         // }
//         let top = (Math.random() + 1) * 0.2 * innerHeight;
//         if (Math.random() < 0.5) {
//             explodedChars[i].style.top = "-" + top + "px";
//         } else {
//             explodedChars[i].style.top = top + "px";
//         }
//     }
// }


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

function projectsOnClick() {
    leavingPage();
    setTimeout(() => {
        window.location.href = './projects.html';
    }, 1500);
}

function aboutOnClick() {
    leavingPage();
    setTimeout(() => {
        window.location.href = './about.html';
    }, 1500);
}



// --- Functions for header and category section ---

function expandCategoriesDiamonds() {
    const categoryContainer = document.getElementById('categories-diamond-container');
    categoryContainer.style.transform = 'scale(1)';
}

function isSectionExpanded() {
    return (mainSection.isActivated || bioSection.isActivated || contactSection.isActivated || techSection.isActivated || softSection.isActivated);
}





// --- Functions dealing with mask animation in biodata section ---

function populateMask() {
    const maskTextFg = document.getElementById('mask-text-fg');
    if (maskTextFg.style.opacity != 1) {
        return;
    }
    maskTextFg.style.opacity = 0;
    const clickSign1 = document.getElementById('click-sign1');
    clickSign1.style.opacity = 0;
    const maskFragmentsClass = document.getElementsByClassName('mask-fragments');
    for (const maskFragment of maskFragmentsClass) {
        maskFragment.style.animationName = 'fade-in-animation';
        maskFragment.style.animationDuration = '10ms';
    }
    setTimeout(() => { maskTextFg.style.display = "none", clickSign1.style.display = "none", maskExplode(false); }, 4000);
    setTimeout(() => { maskExplode(true); }, 5200);
}

function maskExplode(isReverse) {
    const masktextBg = document.getElementById('mask-text-bg');
    if (!isReverse) {
        masktextBg.style.display = 'block';;
        setTimeout(() => { masktextBg.style.opacity = 1; }, 100);
        shatterMask(1);
        masktextBg.style.transform = 'scale(1)';
        const maskChars = document.getElementsByClassName('mask-chars');
        for (const maskChar of maskChars) {
            // maskChar.style.animation = `exploded-char-animation 500ms cubic-bezier(.73, .06, .82, .38) ${Math.random() * 1000}ms forwards`;
            maskChar.style.animation = `exploded-char-animation 500ms ease-in-out ${Math.random() * 500}ms forwards`;
        }
        // for (const maskChar of maskChars) {
        //     maskChar.style.opacity = 1;
        // }
    } else {
        shatterMask(0);
        postMaskExplosion();
        // setTimeout(() => {
        //     mask.style.transform = 'translateY(50%)';
        // }, 2000);
        // mask.style.filter = 'blur(0.5rem)';
        // mask.style.opacity = 0.6;
        // setTimeout(() => {
        //     masktextBg.style.backgroundColor = "#bdbdbd5e",
        //         masktextBg.style.backdropFilter = "blur(8px)";
        // }, 1000);
        // const maskContainer = document.getElementsByClassName("mask-container");
        // maskContainer[0].addEventListener("scroll", maskScroll, false);
    }
}

function postMaskExplosion() {
    const mask = document.getElementById('mask');
    mask.style.transform = 'translateY(20%) scale(0.8)';
    mask.style.zIndex = 10;
    const maskTextContainer = document.getElementById('mask-text-container');
    maskTextContainer.style.transform = "translateY(-20%)";
    const topPanelContainer = document.getElementById('top-panel-container');
    topPanelContainer.style.transform = "translateY(0) scale(1)";
    const diamondLineContainer = document.getElementById('diamond-line-container');
    diamondLineContainer.style.transform = "scale(1)";
    isArtProgrammingExpanded = true;
}

function explodeMaskText() {
    const maskTextContainer = document.getElementById('mask-text-bg');
    maskTextContainer.innerHTML = document.getElementById('mask-text-bg').textContent.replace(/./g, "<span class=\"mask-chars\">$&</span>");

    const explodedChars = document.getElementsByClassName("mask-chars");
    for (let i = 0; i < explodedChars.length; i++) {
        // const left = innerWidth * Math.random();
        // let top = viewHeight * Math.random();
        explodedChars[i].style.opacity = 0;
        if (Math.random() > 0.5) {
            explodedChars[i].style.left = "-" + rem2Px(2) + "px";
            // explodedChars[i].style.left = "-" + (10 * (i - explodedChars.length / 2)) + "px";
        } else {
            explodedChars[i].style.left = rem2Px(2) + "px";
            // explodedChars[i].style.left = (10 * (explodedChars.length / 2 - i)) + "px";
        }
        // if (Math.random() < 0.5) {
        //     explodedChar[i].style.top = "-" + top + "px";
        // } else {
        //     explodedChar[i].style.top = top + "px";
        // }
    }
}

// Shatter or unshatter the mask
function shatterMask(isShatter) {
    const maskFragments = document.getElementsByClassName('mask-fragments');
    const xDistanceScale = 0.5;
    for (let i = 0; i < maskFragments.length; i++) {
        fragmentOffsetX = isShatter * 8 * maskFragmentsOffset[i][0];
        fragmentOffsetY = isShatter * 10 * maskFragmentsOffset[i][1];
        if (isShatter === 0) {
            maskFragments[i].style.transition = 'transform 1400ms cubic-bezier(.73, .06, .82, .38)';
        } else {
            maskFragments[i].style.transition = 'transform 1400ms cubic-bezier(.38, .82, .06, .73)';
        }
        // const randomDeg = Math.random() * (90 + 90) - 90;
        // const randomAxis1 = Math.random() * 2 - 1;
        // const randomAxis2 = Math.random() * 2 - 1;
        // const randomAxis3 = Math.random() * 2 - 1;
        // maskFragments[i].style.transform = `translate(${fragmentOffsetX}%, ${fragmentOffsetY}%) rotate(${isShatter * randomDeg}deg)`;
        maskFragments[i].style.transform = `translate(${xDistanceScale * fragmentOffsetX}%, ${fragmentOffsetY}%) rotate3d(${maskRotationAxes[i][0]}, ${maskRotationAxes[i][1]}, ${maskRotationAxes[i][2]}, ${isShatter ? 220 : 360}deg)`;
        // maskFragments[i].style.transform = `rotate3d(${maskRotationAxes[i][0]}, ${maskRotationAxes[i][1]}, ${maskRotationAxes[i][2]}, ${isShatter ? 180 : 360}deg)`;
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
            maskFragments[fragment].style.transformOrigin = `${50}% ${50}%`;
        } else {
            maskFragmentsOffset.push([(fragmentMeanXCoor), (fragmentMeanYCoor - 80)]);
            maskOverallXOffset.push(fragmentMeanXCoor);
            maskFragments[fragment].style.transformOrigin = `${0}% ${50}%`;
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

function calculateMaskRotationAxis() {
    const maskFragments = document.getElementsByClassName('mask-fragments');
    var randomAxes = [];
    for (let i = 0; i < maskFragments.length; i++) {
        const randomAxis1 = Math.random() * 2 - 1;
        const randomAxis2 = Math.random() * 2 - 1;
        const randomAxis3 = Math.random() * 2 - 1;
        // const randomAxis1 = 0;
        // const randomAxis2 = 1;
        // const randomAxis3 = 0;
        randomAxes.push([randomAxis1, randomAxis2, randomAxis3]);
    }
    return randomAxes;
}

function updateBioSelection(selectionIndex) {
    if (selectionIndex == bioSelectionIndex) { return; }
    const artBg = document.getElementById('selection-art-bg');
    const artIcon = document.getElementById('selection-art-icon');
    const artDesc = document.getElementById('selection-art-desc');
    const programmingBg = document.getElementById('selection-programming-bg');
    const programmingIcon = document.getElementById('selection-programming-icon');
    const programmingDesc = document.getElementById('selection-programming-desc');
    if (selectionIndex == 0) {
        artBg.style.borderWidth = '0.6rem';
        artIcon.style.opacity = 1;
        artIcon.style.animation = 'bio-scale-animation 3s ease-in-out infinite';
        artDesc.style.transition = 'transform 500ms ease-in-out 500ms';
        artDesc.style.transform = 'translateX(50%) scaleX(1)';
        programmingBg.style.borderWidth = '0.2rem';
        programmingIcon.style.animation = 'none';
        programmingIcon.style.transform = 'scale(1)';
        programmingIcon.style.opacity = 0.3;
        programmingDesc.style.transition = 'transform 500ms ease-in-out';
        programmingDesc.style.transform = 'translateX(-50%) scaleX(0)';
    } else {
        artBg.style.borderWidth = '0.2rem';
        artIcon.style.opacity = 0.3;
        artIcon.style.animation = 'none';
        artIcon.style.transform = 'scale(1)';
        artDesc.style.transition = 'transform 500ms ease-in-out';
        artDesc.style.transform = 'translateX(50%) scaleX(0)';
        programmingBg.style.borderWidth = '0.6rem';
        programmingIcon.style.animation = 'bio-scale-animation 3s ease-in-out infinite';
        programmingIcon.style.opacity = 1;
        programmingDesc.style.transition = 'transform 500ms ease-in-out 500ms';
        programmingDesc.style.transform = 'translateX(-50%) scaleX(1)';
    }
    bioSelectionIndex = selectionIndex;
}

// function generateBiodataPanelBg() {
// const artPanelBg = document.getElementById('art-panel-bg');
// const artAxis1 = randomIntervalInt(-1, 1);
// const artAxis2 = randomIntervalInt(-1, 1);
// const artAxis3 = randomIntervalInt(-1, 1);
// const artRotate = randomIntervalInt(-40, 40);
// artPanelBg.style.transform = `rotate3d(${artAxis1}, ${artAxis2}, ${artAxis3}, ${artRotate}deg)`;

// const programmingPanelBg = document.getElementById('programming-panel-bg');
// const programmingAxis1 = randomIntervalInt(-1, 1);
// const programmingAxis2 = randomIntervalInt(-1, 1);
// const programmingAxis3 = randomIntervalInt(-1, 1);
// const programmingRotate = randomIntervalInt(-40, -40);
// programmingPanelBg.style.transform = `rotate3d(${programmingAxis1}, ${programmingAxis2}, ${programmingAxis3}, ${programmingRotate}deg)`;
// artPanelBg.style.clipPath = randomQuadClipPath();
// programmingPanelBg.style.clipPath = randomQuadClipPath();
// }

// function randomQuadClipPath() {
//     const randomQuad1X = randomIntervalInt(0, 30);
//     const randomQuad1Y = randomIntervalInt(0, 30);
//     const randomQuad2X = randomIntervalInt(70, 100);
//     const randomQuad2Y = randomIntervalInt(0, 30);
//     const randomQuad3X = randomIntervalInt(70, 100);
//     const randomQuad3Y = randomIntervalInt(70, 100);
//     const randomQuad4X = randomIntervalInt(0, 30);
//     const randomQuad4Y = randomIntervalInt(70, 100);
//     return `polygon(${randomQuad1X}% ${randomQuad1Y}%, ${randomQuad2X}% ${randomQuad2Y}%, ${randomQuad3X}% ${randomQuad3Y}%, ${randomQuad4X}% ${randomQuad4Y}%)`;
// }



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

        case "database-management":
            direcClicked = 'dbm-direc';
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
            // console.log('case not included');
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



// --- Functions dealing with soft skills section
function rotateSoftskillsCenter(skillIndex) {
    const centerBg = document.getElementById('softskills-center-bg');
    const centerFg = document.getElementById('softskills-center-fg');
    // centerFg.style.transform = "translateZ(2rem)";
    switch (skillIndex) {
        case 1:
            centerFg.style.transform = "rotateX(30deg) rotateY(-20deg) translateZ(2rem)";
            centerBg.style.transform = "rotateX(30deg) rotateY(-20deg)";
            break;

        case 2:
            centerFg.style.transform = "rotateX(30deg) rotateY(20deg) translateZ(2rem)";
            centerBg.style.transform = "rotateX(30deg) rotateY(20deg)";
            break;

        case 3:
            centerFg.style.transform = "rotateX(-30deg) rotateY(-20deg) translateZ(2rem)";
            centerBg.style.transform = "rotateX(-30deg) rotateY(-20deg)";
            break;

        case 4:
            centerFg.style.transform = "rotateX(-30deg) rotateY(20deg) translateZ(2rem)";
            centerBg.style.transform = "rotateX(-30deg) rotateY(20deg)";
            break;

        default:
            // console.log("Soft skills index not implemented");
            collapseSoftskillsCenter();
            break;
    }
    // const softskillsContainer = document.getElementById('soft-skills-container');
    // const containerBCR = softskillsContainer.getBoundingClientRect();
    // const containerCenterY = containerBCR.bottom - containerBCR.top;
    // const mouseOffsetX = event.clientX - innerWidth / 2;
    // const mouseOffsetY = event.clientY - containerCenterY;
    // const angleOffset = Math.atan2(mouseOffsetY, mouseOffsetX) * 180 / Math.PI;
    // centerContainer.style.transform = `rotate(${angleOffset}deg)`;
}

function collapseSoftskillsCenter() {
    const centerBg = document.getElementById('softskills-center-bg');
    const centerFg = document.getElementById('softskills-center-fg');
    centerFg.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0)";
    centerBg.style.transform = "rotateX(0deg) rotateY(0deg)";
}

function updateAndShowDesc(cardIndex) {
    if (isDescPanelOpen) {
        return;
    }
    updateSoftskillsDesc(cardIndex);
    const descContainer = document.getElementById('softskills-desc-container');
    // descContainer.style.display = "flex";
    descContainer.addEventListener("click", hideSoftskillsDesc, false);
    if (!isDescPanelOpen) {
        descContainer.style.transform = "translate(-50%, -50%) scale(1, 1)";
        isDescPanelOpen = true;
    }
}

function updateSoftskillsDesc(cardIndex) {
    const descContainer = document.getElementById('softskills-desc-container');
    const descBg = document.getElementById('softskills-desc-bg');
    const descTitle = document.getElementById('softskills-desc-title');
    const descText = document.getElementById('softskills-desc-text');
    switch (cardIndex) {
        case 1:
            descContainer.style.transformOrigin = "left 30%";
            descBg.style.backgroundColor = "rgba(80, 87, 123, 0.652)";
            descTitle.innerHTML = "Teamwork & Leadership";
            descText.innerHTML = "Lead and organize different events in university societies, including exhibition, concert and prom night.<br><br>Positions held include: Presidents, Head of various departments (eg: Multech, Publicity, Program and Event planning). Also partaken the role of sports manager to lead college's sport team to sport tournaments such as Rugby and Volleyball."
            break;

        case 2:
            descContainer.style.transformOrigin = "right 30%";
            descBg.style.backgroundColor = "rgba(80, 118, 123, 0.652)";
            descTitle.innerHTML = "Time Management";
            descText.innerHTML = "Strict management on time, especially on completion of projects. PhD research projects often involved strict deadlines such as meeting the journal/proposal submission deadline, or tasks deadline during collaboration with other research teams.<br><br>Participated in various hackathon-like events which require the completion of projects within a specified short time frame, especially various Game Jams."
            break;

        case 3:
            descContainer.style.transformOrigin = "left 70%";
            descBg.style.backgroundColor = "rgba(121, 80, 123, 0.652)";
            descTitle.innerHTML = "Creativity";
            descText.innerHTML = "Strong interest in developing creative contents which includes: animation and video composing (After Effects), UI/UX design (Figma), illustration or pixel art creation (Aseprite), photo editing (Photoshop/GIMP), audio and music creation (GarageBand/Audition).<br><br>Having great attention to details and always strive to create things or arts from innovative ideas and that which can make people happy because why not."
            break;

        case 4:
            descContainer.style.transformOrigin = "right 70%";
            descBg.style.backgroundColor = "rgba(123, 81, 80, 0.652)";
            descTitle.innerHTML = "Adaptability";
            descText.innerHTML = "Easily adapt and blend into different environments and communities. Attentive observer and fast learner, especially on various computers or programming tools. Always seeking to effectively apply learned knowledge to practical use cases.<br><br>Also having the ability to converse in different languages including: English, Chinese, Cantonese, Fujien, Malay, and French."
            break;

        default:
            // console.log("Card index not implemented");
            break;
    }
}

function hideSoftskillsDesc() {
    window.removeEventListener("click", hideSoftskillsDesc);
    const descContainer = document.getElementById('softskills-desc-container');
    descContainer.style.transform = "translate(-50%, -50%) scale(0, 0)";
    setTimeout(() => {
        isDescPanelOpen = false,
            teamworkAnimation(true),
            timeAnimation(true),
            creativityAnimation(true),
            adaptabilityAnimation(true);
    }, 500);
    // setTimeout(() => {
    //     descContainer.style.display = "none";
    // }, 500);
}

function softskillsCardHover(elementId, isHover) {
    const cardBg = document.querySelector(elementId + ' .softskills-card-bg');
    const cardFg = document.querySelector(elementId + ' .softskills-card-fg');
    if (isHover) {
        cardBg.style.transform = "rotate(225deg) scale(1.2)";
        cardFg.style.transform = "scale(1.2)";
    } else {
        cardBg.style.transform = "rotate(45deg) scale(0.8)";
        cardFg.style.transform = "scale(1)";
    }
}

function teamworkAnimation(isReverse) {
    if (isDescPanelOpen) {
        return;
    }
    const personOutline2 = document.getElementById('person-outline2');
    const personOutline3 = document.getElementById('person-outline3');
    const cardCircle = document.querySelector('#teamwork-leadership .card-circle');
    if (isReverse) {
        personOutline2.style.opacity = "0";
        personOutline2.style.transform = "translate(50%, -50%)";
        personOutline3.style.opacity = "0";
        personOutline3.style.transform = "translate(-50%, -50%)";
        cardCircle.style.transform = "translate(0%, 0%)";
        softskillsCardHover('#teamwork-leadership', false);
        collapseSoftskillsCenter();
    } else {
        personOutline2.style.opacity = "1";
        personOutline2.style.transform = "translate(0, 0)";
        personOutline3.style.opacity = "1";
        personOutline3.style.transform = "translate(0, 0)";
        cardCircle.style.transform = "translate(-50%, -50%)";
        softskillsCardHover('#teamwork-leadership', true);
        rotateSoftskillsCenter(1);
    }
}

function timeAnimation(isReverse) {
    if (isDescPanelOpen) {
        return;
    }
    const shortClockHand = document.getElementById('short-clock-hand');
    const longClockHand = document.getElementById('long-clock-hand');
    const cardCircle = document.querySelector('#time-management .card-circle');
    if (isReverse) {
        shortClockHand.style.transform = "translate(50%, 0) rotate(0deg)";
        longClockHand.style.transform = "translate(0, -50%) rotate(0deg)";
        cardCircle.style.transform = "translate(0, 0)";
        softskillsCardHover('#time-management', false);
        collapseSoftskillsCenter();
    } else {
        shortClockHand.style.transform = "translate(50%, 0) rotate(60deg)";
        longClockHand.style.transform = "translate(0, -50%) rotate(720deg)";
        cardCircle.style.transform = "translate(50%, -50%)";
        softskillsCardHover('#time-management', true);
        rotateSoftskillsCenter(2);
    }
}

function creativityAnimation(isReverse) {
    if (isDescPanelOpen) {
        return;
    }
    // const headBottom = document.getElementById('head-bottom-icon');
    const headTop = document.getElementById('head-top-icon');
    const headInner = document.getElementById('head-inner');
    const cardCirle = document.querySelector('#creativity .card-circle');
    // const lightBulb = document.getElementById('creativity-light-bulb');
    if (isReverse) {
        headTop.style.transform = "rotate(0deg)";
        headInner.style.top = "0%";
        headInner.style.opacity = 0;
        cardCirle.style.transform = "translate(0, 0)";
        softskillsCardHover('#creativity', false);
        collapseSoftskillsCenter();
    } else {
        headTop.style.transform = "rotate(-90deg)";
        headInner.style.top = "-20%";
        headInner.style.opacity = 1;
        cardCirle.style.transform = "translate(-50%, 50%)";
        softskillsCardHover('#creativity', true);
        rotateSoftskillsCenter(3);
    }
}

function adaptabilityAnimation(isReverse) {
    if (isDescPanelOpen) {
        return;
    }
    const circleBlock = document.getElementById('circle-block');
    const circleHole = document.getElementById('circle-hole');
    const triangleBlock = document.getElementById('triangle-block');
    const triangleHole = document.getElementById('triangle-hole');
    const adaptabilityBase = document.getElementById('adaptability-base-container');
    const cardCirle = document.querySelector('#adaptability .card-circle');
    if (isReverse) {
        circleBlock.style.opacity = 0;
        triangleBlock.style.opacity = 1;
        circleHole.style.opacity = 0;
        triangleHole.style.opacity = 1;
        adaptabilityBase.style.transform = "translateX(0%)";
        cardCirle.style.transform = "translate(0, 0)";
        softskillsCardHover('#adaptability', false);
        collapseSoftskillsCenter();
    } else {
        circleBlock.style.opacity = 1;
        triangleBlock.style.opacity = 0;
        circleHole.style.opacity = 1;
        triangleHole.style.opacity = 0;
        adaptabilityBase.style.transform = "translateX(-100%)";
        cardCirle.style.transform = "translate(50%, 50%)";
        softskillsCardHover('#adaptability', true);
        rotateSoftskillsCenter(4);
    }
}


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
    const svgWidth = viewWidth() - rem2Px(8);
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






// _________________________________________________________________________________
// --- Functions dealing with transition/animation of elements when scrolled into position ---
// function headingScroll() {
//     const allh1 = document.querySelectorAll('h1');
//     for (let i = 0; i < allh1.length; i++) {
//         // for (h1 of allh1) {
//         // if (h1.className != 'notice-text') {
//         const h1 = allh1[i];
//         const h1BCR = h1.getBoundingClientRect();
//         if (h1BCR.top <= viewHeight * 3 / 5 && h1.style.opacity == 0) {
//             // if (h1.id != 'home-title') {
//             // explodeH1Text(h1, i);
//             // h1.style.transform = 'scaleX(1)';
//             h1.style.opacity = 1;
//             const explodedChars = document.getElementsByClassName(`exploded-chars${i}`);
//             for (const explodedChar of explodedChars) {
//                 // let randomDelay = Math.random() * 1000;
//                 explodedChar.style.animation = `defrag-fade-animation 1000ms cubic-bezier(.79,.01,.15,.99) ${Math.random() * 500}ms forwards`;
//                 // explodedChar.style.animation = `defrag-fade-animation 1000ms cubic-bezier(.79,.01,.15,.99) forwards`;
//             }
//             // }
//         }
//         // }
//     }

//     // const allh2 = document.querySelectorAll('h2');
//     // for (h2 of allh2) {
//     //     if (h2.className != 'notice-text') {
//     //         const h2BCR = h2.getBoundingClientRect();
//     //         if (h2BCR.top <= viewHeight * 7 / 10) {
//     //             h2.style.opacity = 1;
//     //         }
//     //     }
//     // }
// }

// function lineDecorScroll() {
//     const verticalLines = document.getElementsByClassName("vertical-dotline");
//     for (verticalLine of verticalLines) {
//         const vlBCR = verticalLine.getBoundingClientRect();
//         if (vlBCR.top <= viewHeight / 2) {
//             verticalLine.children[0].style.opacity = 1;
//             verticalLine.children[1].style.transform = 'scaleY(1)';
//             verticalLine.children[2].style.opacity = 1;
//         }
//     }
// }

// function scrollUpSignScroll() {
//     const topSign = document.getElementsByClassName('top-scrollup-sign');
//     const bottomSign = document.getElementsByClassName('bottom-scrollup-sign');
//     if (topSign[0].getBoundingClientRect().top <= viewHeight * 4 / 10) {
//         topSign[0].style.opacity = 0;
//         bottomSign[0].style.opacity = 0;
//         setTimeout(() => {
//             topSign[0].style.visibility = 'hidden',
//                 bottomSign[0].style.visibility = 'hidden',
//                 window.removeEventListener("scroll", scrollUpSignScroll);
//         }, 500);
//     }
// }

// function noticeContainerActivation(isActive) {
//     const noticeContainer = document.getElementsByClassName('notice-container');
//     const noticeTexts = document.getElementsByClassName('notice-text');
//     const noticeBorders = document.getElementsByClassName('notice-border');
//     noticeContainer[0].style.opacity = isActive ? 1 : 0;
//     for (noticeText of noticeTexts) {
//         noticeText.style.opacity = isActive ? 1 : 0;
//     }
//     for (noticeBorder of noticeBorders) {
//         noticeBorder.style.opacity = isActive ? 1 : 0;
//     }
// }

function noticeContainerScroll() {
    const noticeContainer = document.getElementsByClassName('notice-container');
    if (noticeContainer[0].getBoundingClientRect().top <= viewHeight() * 6 / 10) {
        const noticeTexts = document.getElementsByClassName('notice-text');
        const noticeBorders = document.getElementsByClassName('notice-border');
        noticeContainer[0].style.transform = 'scale(1)';
        for (noticeText of noticeTexts) {
            noticeText.style.opacity = 1;
        }
        // for (noticeBorder of noticeBorders) {
        //     noticeBorder.style.opacity = 1;
        // }
        window.removeEventListener("scroll", noticeContainerScroll);
    }
}

// function uiuxScroll() {
//     const uiuxCont = document.getElementsByClassName('uiux-container');
//     const uiuxBCR = uiuxCont[0].getBoundingClientRect();
//     if (uiuxBCR.top <= (viewHeight * 8 / 10)) {
//         uiuxCont[0].style.opacity = 1;
//         window.removeEventListener("scroll", uiuxScroll);
//     }
// }

function biodataScroll() {
    if (!bioSection.isActivated) { return; }
    // const mask = document.getElementById('mask');
    // const maskText = document.getElementsByClassName('mask-text');
    const maskTextContainer = document.getElementById('mask-text-container');
    const maskTextFg = document.getElementById('mask-text-fg');
    const biotextContainer = document.getElementsByClassName('biotext-container');
    // const maskFragmentsClass = document.getElementsByClassName('mask-fragments');
    const clickSignInner = document.getElementById('click-inner1');
    const clickSignOuter = document.getElementById('click-outer1');
    // if (biotextContainer[0].getBoundingClientRect().top <= (viewHeight * 6 / 10)) {
    //     biotextContainer[0].style.transform = "scaleY(1)";
    // }
    if ((maskTextContainer.getBoundingClientRect().top + maskTextContainer.getBoundingClientRect().bottom) / 2 <= (viewHeight() * 6 / 10)) {
        maskTextFg.style.opacity = 1;
        // maskText[0].style.opacity = 1;
        // biotextPanel[1].style.transform = "scaleY(1)";
        clickSignInner.style.animation = 'click-inner-animation 2s ease-in-out infinite';
        clickSignOuter.style.animation = 'click-outer-animation 2s ease-in-out infinite';
        // setTimeout(() => {
        //     for (const maskFragment of maskFragmentsClass) {
        //         maskFragment.style.animationName = 'fade-in-animation';
        //         maskFragment.style.animationDuration = '10ms';
        //     }
        // }, 1000);
        // setTimeout(() => {
        //     maskText[1].style.display = 'block';
        //     shatterMask(1);
        // }, 4000);
        // setTimeout(() => {
        //     shatterMask(0),
        //         mask.style.transform = 'scale(0.8)',
        //         mask.style.filter = 'blur(0.5rem)',
        //         mask.style.opacity = 0.6,
        //         mask.style.zIndex = 1;
        // }, 5400);
        window.removeEventListener("scroll", biodataScroll);
    }
}

function artProgrammingScroll() {
    if (!bioSection.isActivated) { return; }
    const topPanelContainer = document.getElementById('top-panel-container');
    if (!isArtProgrammingExpanded) { return; }
    if (topPanelContainer.getBoundingClientRect().top <= (viewHeight() * 4 / 10)) {
        const bottomPanelContainer = document.getElementById('bottom-panel-container');
        bottomPanelContainer.style.opacity = 1;
        window.removeEventListener("scroll", artProgrammingScroll);
    }
    // const masktextBg = document.getElementById('mask-text-bg');
    // if (masktextBg.style.opacity == 0) {
    //     return;
    // }
    // if (masktextBg.getBoundingClientRect().top <= (viewHeight * 4 / 10)) {
    //     // const irrelevantChars = document.getElementsByClassName('irrelevant-span');
    //     // for (const irrelevantChar of irrelevantChars) {
    //     //     irrelevantChar.style.opacity = 0;
    //     // }
    //     // const biodataPanelContainer = document.getElementById('top-panel-container');
    //     // biodataPanelContainer[0].style.display = "flex";
    //     const biodataPanels = document.getElementsByClassName('biodata-panel');
    //     for (const biodataPanel of biodataPanels) {
    //         setTimeout(() => {
    //             biodataPanel.style.transform = "scale(1,1)";
    //         }, 500);
    //     }
    //     window.removeEventListener("scroll", artProgrammingScroll);
    // }
}

function skillDirecScroll() {
    if (!techSection.isActivated) { return; }
    const skillsDirec = document.getElementById('skills-direc');
    if (skillsDirec.getBoundingClientRect().top <= (viewHeight() * 5 / 10)) {
        skillsDirec.style.transform = 'scale(1)';
        window.removeEventListener("scroll", skillDirecScroll);
    }
}

// function softSkillsScroll() {
//     const softSkillsUl = document.getElementById('soft-skills-ul');
//     const softSkillsSwipe = document.getElementById('soft-skills-swipe');
//     if (softSkillsUl.getBoundingClientRect().top <= (viewHeight * 6 / 10)) {
//         softSkillsUl.style.opacity = 1;
//         softSkillsSwipe.style.opacity = 1;
//         softSkillsSwipe.children[0].style.animation = 'softskills-arrow-animation 5s cubic-bezier(0.075, 0.82, 0.165, 1) infinite';
//         window.removeEventListener("scroll", softSkillsScroll);
//     }
// }

function projectIconScroll() {
    if (!techSection.isActivated) { return; }
    const projectIconContainer = document.getElementsByClassName('project-icon-container');
    const projectIconBCR = projectIconContainer[0].getBoundingClientRect();
    const projectLines = document.getElementsByClassName('project-line');
    const tickSquares = document.getElementsByClassName('tick-square');
    if (projectIconBCR.top <= (viewHeight() * 4 / 10)) {
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
    if (!contactSection.isActivated) { return; }
    const contactText = document.getElementById('contact-text');
    const mailBack = document.getElementById('mail-back');
    const mailFront = document.getElementById('mail-front');
    if (contactText.getBoundingClientRect().top <= viewHeight() * 7 / 10) {
        contactText.style.opacity = 1;
        contactText.style.transform = 'scale(1)';
        contactText.style.top = 0;
        mailBack.style.animation = 'mail-back-animation 1s ease-in-out forwards';
        mailBack.style.animationDelay = '1s';
        mailFront.style.animation = 'mail-front-animation 1s ease-in-out forwards';
        mailFront.style.animationDelay = '1s';
        setTimeout(() => {
            // mailBack.style.display = 'none';
            // mailBack.style.visibility = 'hidden';
            mailBack.style.opacity = 0;
        }, 1500);
        // window.removeEventListener("scroll", contactScroll);
    }
}

function resetContactScroll() {
    const contactText = document.getElementById('contact-text');
    const mailBack = document.getElementById('mail-back');
    const mailFront = document.getElementById('mail-front');
    contactText.style.opacity = 0;
    contactText.style.transform = 'scale(0)';
    contactText.style.top = '10rem';
    mailBack.style.transform = 'scaleX(1)';
    mailFront.style.transform = 'scaleX(-1)';
    mailFront.style.animation = 'none';
    mailBack.style.animation = 'none';
    // mailBack.style.visibility = 'visible';
    mailBack.style.opacity = 1;
}

// function footerLineScroll() {
//     const footerLine = document.getElementsByClassName('footer-line');
//     const footer = document.querySelector('footer');
//     if (footer.getBoundingClientRect().top <= (0.95 * viewHeight)) {
//         footer.style.opacity = 1;
//         footerLine[0].style.transform = 'scaleX(1)';
//         window.removeEventListener("scroll", footerLineScroll);
//     }
// }

// const viewHeight = document.documentElement.clientHeight;
// const viewWidth = document.documentElement.clientWidth;
const viewHeight = () => { return document.documentElement.clientHeight };
const viewWidth = () => { return document.documentElement.clientWidth };
const maskFragmentsOffset = calcMaskOffset();
const maskRotationAxes = calculateMaskRotationAxis();
const generalDirec = document.getElementById('general-direc');
const skillsCategories = document.getElementsByClassName('skills-category');
initializePage();
// const dotsContainerWidth = createDots();
// transformDots(0);
// explodeAllH1Text();
explodeMaskText();
// generateBiodataPanelBg();
// createSoftSkillsSwipe();
navListHover('home');
const aboutButton = document.getElementById('aboutme-list');
aboutButton.addEventListener('click', aboutOnClick, false);
const projectsButton = document.getElementById('projects-list');
projectsButton.addEventListener('click', projectsOnClick, false);

// window.addEventListener("scroll", scrollUpSignScroll, false);
// window.addEventListener("scroll", headingScroll, false);
// window.addEventListener("scroll", lineDecorScroll, false);
window.addEventListener("scroll", noticeContainerScroll, false);
window.addEventListener("scroll", biodataScroll, false);
window.addEventListener("scroll", artProgrammingScroll, false);
// window.addEventListener("scroll", uiuxScroll, false);
window.addEventListener("scroll", projectIconScroll, false);
window.addEventListener("scroll", skillDirecScroll, false);
// window.addEventListener("scroll", softSkillsScroll, false);
window.addEventListener("scroll", contactScroll, false);
// window.addEventListener("scroll", footerLineScroll, false);


// Events for header section
const startDiamondContainer = document.getElementById('start-diamond-container');
const bioDiamond = document.getElementById('bio-diamond');
const contactDiamond = document.getElementById('contact-diamond');
const techDiamond = document.getElementById('tech-diamond');
const softDiamond = document.getElementById('soft-diamond');
const mainSection = new CategorySection('main');
const bioSection = new CategorySection('biodata');
const contactSection = new CategorySection('contact');
const techSection = new CategorySection('skills');
const softSection = new CategorySection('soft-skills');
startDiamondContainer.addEventListener('click', () => {
    if (isSectionExpanded()) { return; }
    mainSection.setActivation(true);
}, false);
bioDiamond.addEventListener('click', () => {
    if (isSectionExpanded()) { return; }
    bioSection.setActivation(true);
}, false);
contactDiamond.addEventListener('click', () => {
    if (isSectionExpanded()) { return; }
    contactSection.setActivation(true);
}, false);
techDiamond.addEventListener('click', () => {
    if (isSectionExpanded()) { return; }
    techSection.setActivation(true);
}, false);
softDiamond.addEventListener('click', () => {
    if (isSectionExpanded()) { return; }
    softSection.setActivation(true);
}, false);

// Events for biodata section
isArtProgrammingExpanded = false;
const clickSign1 = document.getElementById('mask-text-container');
clickSign1.addEventListener("click", populateMask);
bioSelectionIndex = 1;
updateBioSelection(0);
const artIconDesc = document.getElementById('art-icon-desc');
artIconDesc.addEventListener('click', () => { updateBioSelection(0) }, false);
const programmingIconDesc = document.getElementById('programming-icon-desc');
programmingIconDesc.addEventListener('click', () => { updateBioSelection(1) }, false);

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

// soft-skills section
isDescPanelOpen = false;
const teamworkFg = document.getElementById('teamwork-fg');
teamworkFg.addEventListener("click", function() {
    updateAndShowDesc(1);
    teamworkAnimation(false);
}, false);
teamworkFg.addEventListener("mouseenter", function() { teamworkAnimation(false); }, false);
teamworkFg.addEventListener("mouseleave", function() { teamworkAnimation(true); }, false);
const timeManagementFg = document.getElementById('time-fg');
timeManagementFg.addEventListener("click", function() {
    timeAnimation(false);
    updateAndShowDesc(2);
}, false);
timeManagementFg.addEventListener("mouseenter", function() { timeAnimation(false); }, false);
timeManagementFg.addEventListener("mouseleave", function() { timeAnimation(true); }, false);
const creativityFg = document.getElementById('creativity-fg');
creativityFg.addEventListener("click", function() { updateAndShowDesc(3); }, false);
creativityFg.addEventListener("mouseenter", function() { creativityAnimation(false); }, false);
creativityFg.addEventListener("mouseleave", function() { creativityAnimation(true); }, false);
const adaptabilityFg = document.getElementById('adaptability-fg');
adaptabilityFg.addEventListener("click", function() { updateAndShowDesc(4); }, false);
adaptabilityFg.addEventListener("mouseenter", function() { adaptabilityAnimation(false); }, false);
adaptabilityFg.addEventListener("mouseleave", function() { adaptabilityAnimation(true); }, false);


// Horizontal scrolling for dots bg in softskills section
// const dotBG = document.querySelector(".scroll-wrapper");
// dotBG.addEventListener("scroll", dotScroll, false);



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