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




navListHover('projects');
const backButtons = document.getElementsByClassName('back-button');
for (const backButton of backButtons) {
    backButton.addEventListener('mouseover', () => { backButtonHover(false) }, false);
    backButton.addEventListener('mouseleave', () => { backButtonHover(true) }, false);
}