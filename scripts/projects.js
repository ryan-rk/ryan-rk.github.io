// --- Classes ---
class ProjectSection {
    constructor(name) {
        this.name = name;
        this.isActivated = false;
        this.sectionElement = document.getElementById(name);
        const sectionQuery = "#" + name;
        this.backButton = document.querySelector(sectionQuery + " .back-button");
        this.backButton.addEventListener('click', () => { this.backButtonClickHandler() }, false);
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
            console.log("slide in cards");
        } else {
            for (let i = 0; i < this.sectionCards.length; i++) {
                this.sectionCards[i].style.transitionDelay = `${(this.sectionCards.length - 1 - i) * 80}ms`;
                this.sectionCards[i].style.transform = "translateY(50%)";
                this.sectionCards[i].style.opacity = 0;
            }
            console.log("slide out cards");
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


// __________________________________
// Functions for gallery section
// __________________________________
function inspectButtonClickHandler() {
    if (isStartDeactivateGallery) { return; }
    isStartDeactivateGallery = true;
    updateGallerySection(false);
    inspectSelectedProjects();
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

function animateProjectIconFloat() {
    const projectIconFloat = document.getElementById("float-project-icon");
    // const projectTitleBCR = document.getElementsByClassName("project-title")[selectedProjectIndex].getBoundingClientRect();
    projectIconFloat.style.top = `${viewHeight()/2 - projectIconFloat.clientHeight / 2}px`;
    // projectIconFloat.style.top = `${(projectTitleBCR.top + projectTitleBCR.bottom)/2 - projectIconFloat.clientHeight/2}px`;
    projectIconFloat.style.left = `${viewWidth()/2 - projectIconFloat.clientWidth / 2}px`;
    projectIconFloat.style.transitionDuration = "800ms, 800ms, 500ms";
    projectIconFloat.style.transitionDelay = "0ms, 0ms, 800ms"
    projectIconFloat.style.opacity = 0;
}

function inspectSelectedProjects() {
    switch (selectedProjectIndex) {
        case 0:
            gameSection.setActivation(true);
            break;

        default:
            console.log("Project index not implemented");
            break;
    }
}

function gallerySelector() {}

function updateTextContainer() {}


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

var selectedProjectIndex = 0;
var isStartDeactivateGallery = false;
const inspectButton = document.getElementById("inspect-button");
inspectButton.addEventListener("click", inspectButtonClickHandler, false);

navListHover('projects');
const gameSection = new ProjectSection("game-projects");
const backButtons = document.getElementsByClassName('back-button');
for (const backButton of backButtons) {
    backButton.addEventListener('mouseover', () => { backButtonHover(false) }, false);
    backButton.addEventListener('mouseleave', () => { backButtonHover(true) }, false);
}

// initializeProjectIconFloat();
// const galleryFramesContainer = document.getElementById("gallery-frames-container");
// galleryFramesContainer.addEventListener("click", animateProjectIconFloat, false);