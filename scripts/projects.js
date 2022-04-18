// --- Classes ---
class ProjectSection {
    constructor(name) {
        this.name = name;
        this.isActivated = false;
        this.sectionElement = document.getElementById(name);
        const sectionQuery = "#" + name;
        this.backButton = document.querySelectorAll(sectionQuery + " .back-button");
        this.backButton[0].addEventListener('click', () => { this.backButtonClickHandler() }, false);
        this.backButton[1].addEventListener('click', () => { this.backButtonClickHandler() }, false);
        this.sectionForeground = document.querySelector(sectionQuery + " .section-foreground");
        this.sectionCards = document.querySelectorAll(sectionQuery + " .project-card");
        this.sectionBackground = document.querySelector(sectionQuery + " .section-background");
        this.scaleBackground(false);
    }

    updateForeground(isActive) {
        if (isActive) {
            this.sectionForeground.style.display = "flex";
            setTimeout(() => {
                this.sectionForeground.style.opacity = 1,
                    this.slideCards(true);
            }, 1500);
        } else {
            this.sectionForeground.style.opacity = 0;
            this.slideCards(false);
            setTimeout(() => {
                this.sectionForeground.style.display = "none";
            }, 1500);
        }
    }

    slideCards(isActive) {
        if (isActive) {
            for (let i = 0; i < this.sectionCards.length; i++) {
                this.sectionCards[i].style.transitionDelay = `${i * 200}ms`;
                this.sectionCards[i].style.transform = "translateY(0%)";
                this.sectionCards[i].style.opacity = 1;
            }
        } else {
            for (let i = 0; i < this.sectionCards.length; i++) {
                this.sectionCards[i].style.transitionDelay = `${(this.sectionCards.length - 1 - i) * 80}ms`;
                this.sectionCards[i].style.transform = "translateY(50%)";
                this.sectionCards[i].style.opacity = 0;
            }
        }
    }

    scaleBackground(isExpand) {
        const [centerX, centerY] = calculateCurrentFrameCenter();
        if (isExpand) {
            this.sectionBackground.style.transitionDuration = "0ms";
            this.sectionBackground.style.clipPath = `circle(0% at ${centerX}px ${centerY}px)`;
            setTimeout(() => {
                this.sectionBackground.style.transitionDuration = "800ms",
                    this.sectionBackground.style.clipPath = `circle(200% at ${centerX}px ${centerY}px)`;
            }, 100);
        } else {
            if (this.isActivated) {
                this.sectionBackground.style.transitionDuration = "0ms";
                this.sectionBackground.style.clipPath = `circle(100% at ${centerX}px ${centerY}px)`;
                setTimeout(() => {
                    this.sectionBackground.style.transitionDuration = "800ms",
                        this.sectionBackground.style.clipPath = `circle(0% at ${centerX}px ${centerY}px)`;
                }, 100);
            }
        }
        // this.sectionBackground.style.clipPath = isExpand ? `circle(100% at ${centerX}px ${centerY}px)` : `circle(0% at ${centerX}px ${centerY}px)`;
    }

    backButtonClickHandler() {
        this.setActivation(false);
        updateGallerySection(true);
    }

    setActivation(isActive) {
        if (isActive) {
            if (this.isActivated) { return; }
            this.scaleBackground(true);
            this.updateForeground(true);
            this.isActivated = true;
        } else {
            if (!this.isActivated) { return; }
            this.updateForeground(false);
            this.scaleBackground(false);
            this.isActivated = false;
        }
    }
}



function initializePage() {
    const gallerySection = document.getElementById("gallery-section");
    gallerySection.style.opacity = 1;
    const background = document.getElementById("background");
    setTimeout(() => {
        background.style.opacity = 1;
    }, 500);
}

function leavingPage() {
    const gallerySection = document.getElementById("gallery-section");
    gallerySection.style.opacity = 0;
    const background = document.getElementById("background");
    background.style.opacity = 0;
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

function aboutOnClick() {
    leavingPage();
    setTimeout(() => {
        window.location.href = './about.html';
    }, 1500);
}


// __________________________________
// Functions for gallery section
// __________________________________
function inspectButtonClickHandler() {
    if (isStartDeactivateGallery) { return; }
    activateProjectSection();
    isStartDeactivateGallery = true;
    updateGallerySection(false);
}

function calculateCurrentFrameCenter() {
    const galleryFrameBCR = document.getElementsByClassName('gallery-frame')[selectedProjectIndex].getBoundingClientRect();
    const centerX = (galleryFrameBCR.left + galleryFrameBCR.right) / 2;
    const centerY = (galleryFrameBCR.top + galleryFrameBCR.bottom) / 2;
    return [centerX, centerY];
}

function updateGallerySection(isActive) {
    const galleryContainer = document.getElementById('gallery-container');
    if (isActive) {
        galleryContainer.style.transition = "opacity 500ms ease-in-out 500ms, visibility 0s ease-in-out 500ms";
        galleryContainer.style.opacity = 1;
        galleryContainer.style.visibility = "visible";
    } else {
        galleryContainer.style.transition = "opacity 500ms ease-in-out, visibility 0s ease-in-out 1000ms";
        galleryContainer.style.opacity = 0;
        galleryContainer.style.visibility = "hidden";
        isStartDeactivateGallery = false;
        initializeProjectIconFloat();
    }
}

function initializeProjectIconFloat() {
    updateProjectIconFloatSrc();
    const frameInnerIcons = document.getElementsByClassName('frame-inner');
    const projectIconFloat = document.getElementById("float-project-icon");
    const projectIconBCR = frameInnerIcons[selectedProjectIndex].getBoundingClientRect();

    projectIconFloat.style.opacity = 1;
    projectIconFloat.style.top = `${projectIconBCR.top}px`;
    projectIconFloat.style.left = `${projectIconBCR.left}px`;
    projectIconFloat.style.width = `${projectIconBCR.right - projectIconBCR.left}px`
    projectIconFloat.style.height = `${projectIconBCR.bottom - projectIconBCR.top}px`
    projectIconFloat.style.transitionDuration = "0s, 0s, 0s";
    projectIconFloat.style.transitionDelay = "0s, 0s, 0s";

    setTimeout(() => {
        animateProjectIconFloat();
    }, 300);
}

function updateProjectIconFloatSrc() {
    const projectIconFloat = document.getElementById("float-project-icon");
    switch (selectedProjectIndex) {
        case 0:
            projectIconFloat.src = "assets/img/controller-icon.svg";
            break;

        case 1:
            projectIconFloat.src = "assets/img/apps-icon.svg";
            break;

        case 2:
            projectIconFloat.src = "assets/img/deep-learning-icon.svg";
            break;

        case 3:
            projectIconFloat.src = "assets/img/video-icon.svg";
            break;

        case 4:
            projectIconFloat.src = "assets/img/art-icon.svg";
            break;

        case 5:
            projectIconFloat.src = "assets/img/model3d-icon.svg";
            break;

        default:
            projectIconFloat.src = "assets/img/controller-icon.svg";
            break;
    }
}

function animateProjectIconFloat() {
    const galleryContainer = document.getElementById('gallery-container');
    const flexDir = window.getComputedStyle(galleryContainer).getPropertyValue('flex-direction');
    const projectIconFloat = document.getElementById("float-project-icon");
    // const projectTitleBCR = document.getElementsByClassName("project-title")[selectedProjectIndex].getBoundingClientRect();
    // projectIconFloat.style.top = `${(projectTitleBCR.top + projectTitleBCR.bottom)/2 - projectIconFloat.clientHeight/2}px`;
    if (flexDir == 'row') {
        projectIconFloat.style.top = `${viewHeight()/2 - projectIconFloat.clientHeight / 2}px`;
        projectIconFloat.style.left = `${viewWidth()/2 - projectIconFloat.clientWidth / 2}px`;
        projectIconFloat.style.transitionDuration = "800ms, 800ms, 500ms";
        projectIconFloat.style.transitionDelay = "0ms, 0ms, 800ms"
    } else {
        projectIconFloat.style.transitionDuration = "200ms, 200ms, 500ms";
        projectIconFloat.style.transitionDelay = "0ms, 0ms, 200ms"
    }
    projectIconFloat.style.opacity = 0;
}

function activateProjectSection() {
    switch (selectedProjectIndex) {
        case 0:
            gameSection.setActivation(true);
            break;

        case 1:
            appSection.setActivation(true);
            break;

        case 2:
            dlSection.setActivation(true);
            break;

        case 3:
            videoSection.setActivation(true);
            break;

        case 4:
            artSection.setActivation(true);
            break;

        case 5:
            model3dSection.setActivation(true);
            break;

        default:
            // console.log("Project index not implemented");
            return;
    }
}

function projectSelector(isIncrease) {
    if (isIncrease) {
        if (selectedProjectIndex >= (sectionNames.length - 1)) {
            return;
        }
        selectedProjectIndex = Math.min(Math.max(selectedProjectIndex + 1, 0), sectionNames.length - 1)
        updateGalleryFrame(true);
        updateTextContainer();
        updateGalleryArrow();
        blinkGalleryLight();
    } else {
        if (selectedProjectIndex <= 0) {
            return;
        }
        selectedProjectIndex = Math.min(Math.max(selectedProjectIndex - 1, 0), sectionNames.length - 1)
        updateGalleryFrame(false);
        updateTextContainer();
        updateGalleryArrow();
        blinkGalleryLight();
    }
}

function updateGalleryArrow() {
    const frameLeftArrow = document.getElementById('frame-left-arrow');
    const frameRightArrow = document.getElementById('frame-right-arrow');
    frameLeftArrow.style.visibility = "hidden";
    frameRightArrow.style.visibility = "hidden";
    setTimeout(() => {
        if (selectedProjectIndex > 0) {
            frameLeftArrow.style.visibility = "visible";
        }
        if (selectedProjectIndex < sectionNames.length - 1) {
            frameRightArrow.style.visibility = "visible";
        }
    }, 300);
    // if (selectedProjectIndex <= 0) {
    //     frameLeftArrow.style.visibility = "hidden";
    // } else if (selectedProjectIndex >= (sectionNames.length - 1)) {
    //     frameRightArrow.style.visibility = "hidden";
    // } else {
    //     frameLeftArrow.style.visibility = "visible";
    //     frameRightArrow.style.visibility = "visible";
    // }
}

function updateGalleryFrame(isForward) {
    const galleryFrames = document.getElementsByClassName('gallery-frame');
    if (isForward) {
        if (selectedProjectIndex <= 0) { return; }
        galleryFrames[selectedProjectIndex - 1].style.transformOrigin = "left";
        galleryFrames[selectedProjectIndex - 1].style.transform = "scaleX(0)";
        galleryFrames[selectedProjectIndex].style.transformOrigin = "right";
        galleryFrames[selectedProjectIndex].style.transform = "scaleX(1)";
    } else {
        if (selectedProjectIndex >= (sectionNames.length - 1)) { return; }
        galleryFrames[selectedProjectIndex + 1].style.transformOrigin = "right";
        galleryFrames[selectedProjectIndex + 1].style.transform = "scaleX(0)";
        galleryFrames[selectedProjectIndex].style.transformOrigin = "left";
        galleryFrames[selectedProjectIndex].style.transform = "scaleX(1)";
    }
}

function blinkGalleryLight() {
    const galleryLight = document.getElementById('gallery-light');
    galleryLight.style.opacity = 0;
    setTimeout(() => {
        galleryLight.style.opacity = 1;
    }, 300);
}

function updateTextContainer() {
    const galleryTextContainer = document.getElementById('gallery-text-container');
    galleryTextContainer.style.opacity = 0;
    setTimeout(() => {
        updateTitleDesc(),
            galleryTextContainer.style.opacity = 1;
    }, 300);
}

function updateTitleDesc() {
    const currentSectionTitle = document.getElementById('section-title');
    const currentSectionDesc = document.getElementById('section-desc');
    currentSectionTitle.innerHTML = sectionNames[selectedProjectIndex];
    currentSectionDesc.innerHTML = sectionDescs[selectedProjectIndex];
}


// __________________________________
// Functions for projects section
// __________________________________
// --- Functions for back button ---
function backButtonHover(isReverse) {
    const buttonLines = document.getElementsByClassName('button-line');
    for (const buttonLine of buttonLines) {
        if (isReverse) {
            buttonLine.style.transform = 'scaleX(0)';
        } else {
            buttonLine.style.transform = 'scaleX(1)';
        }
    }
    const backButtonBgs = document.getElementsByClassName('back-button-bg');
    for (const backButtonBg of backButtonBgs) {
        if (isReverse) {
            backButtonBg.style.transform = 'scale(1, 1)';
        } else {
            backButtonBg.style.transform = 'scale(1.5, 1.5)';
        }
    }
}



const viewHeight = () => { return document.documentElement.clientHeight };
const viewWidth = () => { return document.documentElement.clientWidth };

const sectionNames = ["GAME DEV", "APPS DEV", "DEEP LEARNING", "VIDEO COMPOSING", "ART CREATIONS", "3D MODELLING"];
const sectionDescs = [
    "Games ideas and prototypes developed across my game dev journey.",
    "Mobile apps developed for iOS and iPadOS.",
    "Research projects utilizing deep learning models for various applications.",
    "Videos made for participation in competition or special events.",
    "Arts created out of inspirations from various sources using different tools",
    "3D models constructed using some of the popular 3D modelling softwares."
]

const appHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--app-height', `${window.innerHeight}px`)
}
window.addEventListener('resize', appHeight)
appHeight()

var selectedProjectIndex = 0;
var isStartDeactivateGallery = false;
initializePage();
navListHover('projects');
const homeButton = document.getElementById('home-list');
homeButton.addEventListener('click', homeOnClick, false);
const aboutButton = document.getElementById('aboutme-list');
aboutButton.addEventListener('click', aboutOnClick, false);

updateTitleDesc();
updateGalleryArrow();
const frameLeftArrow = document.getElementById('frame-left-arrow');
frameLeftArrow.addEventListener("click", () => { projectSelector(false) }, false);
const frameRightArrow = document.getElementById('frame-right-arrow');
frameRightArrow.addEventListener("click", () => { projectSelector(true) }, false);
const inspectButton = document.getElementById("inspect-button");
inspectButton.addEventListener("click", inspectButtonClickHandler, false);


const gameSection = new ProjectSection("game-projects");
const appSection = new ProjectSection("apps-projects");
const dlSection = new ProjectSection("dl-projects");
const videoSection = new ProjectSection("video-projects");
const artSection = new ProjectSection("art-projects");
const model3dSection = new ProjectSection("model3d-projects");
const backButtons = document.getElementsByClassName('back-button');
for (const backButton of backButtons) {
    backButton.addEventListener('mouseover', () => { backButtonHover(false) }, false);
    backButton.addEventListener('mouseleave', () => { backButtonHover(true) }, false);
}

// initializeProjectIconFloat();
// const galleryFramesContainer = document.getElementById("gallery-frames-container");
// galleryFramesContainer.addEventListener("click", animateProjectIconFloat, false);