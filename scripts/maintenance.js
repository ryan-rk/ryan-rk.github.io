let angryValue = 0;

function builderOff() {
    console.log('builderOff clicked');
    angryValue += 1;
    const builderOffTrigger = document.getElementById('off-builder');
    const robotMain = document.getElementById('robot');
    const robotBody = document.getElementById('robot-body');
    const robotArm = document.getElementById('robot-arm');
    const speechBubble = document.getElementById('speech-bubble');
    // console.log(`angry value is ${angryValue}`);
    builderOffTrigger.style.visibility = 'hidden';
    onOffToggle(false);
    setTimeout(() => { restartBuilder(robotMain, robotBody, robotArm, builderOffTrigger, speechBubble) }, 1500);
    if (angryValue >= 8) {
        showSmokeSparks();
    }
    if (angryValue > 12) {
        builderExploding();
    }
}

function restartBuilder(robotMain, robotBody, robotArm, builderOffTrigger, speechBubble) {
    console.log('restartBuilder clicked');
    if (angryValue <= 2) {
        robotMain.style.animation = "robot-normal-move 3s ease-in-out";
        robotArm.style.animation = "arm-normal-move 3s ease-in-out";
        setTimeout(() => { onOffToggle(true), speechBubble.style.visibility = 'hidden' }, 1400);
    } else if (angryValue <= 4) {
        robotMain.style.animation = "robot-angry-move 3s ease-in-out";
        robotArm.style.animation = "arm-angry-move 3s ease-in-out";
        setTimeout(() => { onOffToggle(true), speechBubble.style.visibility = 'hidden' }, 1400);
    } else if (angryValue <= 6) {
        robotBody.src = "assets/img/robot-angry.svg";
        robotMain.style.animation = "robot-angry-move 1.5s ease-in-out";
        robotArm.style.animation = "arm-angry-move 1.5s ease-in-out";
        setTimeout(() => { onOffToggle(true), speechBubble.style.visibility = 'hidden' }, 800);
    } else {
        robotMain.style.animation = "robot-angry-move 1.5s ease-in-out";
        robotArm.style.animation = "arm-angry-move 1.5s ease-in-out";
        setTimeout(() => { cycleSpeechBubble(speechBubble) }, 100);
        setTimeout(() => { onOffToggle(true), speechBubble.style.visibility = 'hidden' }, 800);
    }
    setTimeout(() => { builderOffTrigger.style.visibility = 'visible', robotMain.style.animation = 'robot-body-idle 1s ease-in-out', robotArm.style.animation = 'arm-normal-idle 1s ease-in-out'; }, 3000);
}

function cycleSpeechBubble(speechBubble) {
    console.log('cycleSpeechBubble clicked');
    const speechBubbleMode = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    if (speechBubbleMode === 1) {
        speechBubble.style.visibility = 'visible';
    } else if (speechBubbleMode === 2) {
        speechBubble.src = 'assets/img/speech-bubble1.svg';
        speechBubble.style.visibility = 'visible';
    } else if (speechBubbleMode === 3) {
        speechBubble.src = 'assets/img/speech-bubble2.svg';
        speechBubble.style.visibility = 'visible';
    }
}

function showSmokeSparks() {
    console.log('showSmokeSparks clicked');
    const smoke1 = document.getElementById('smoke1');
    const smoke2 = document.getElementById('smoke2');
    const spark1 = document.getElementById('spark1');
    const spark2 = document.getElementById('spark2');
    smoke1.style.visibility = 'visible';
    smoke2.style.visibility = 'visible';
    spark1.style.visibility = 'visible';
    spark2.style.visibility = 'visible';
}

// function builderExploded() {
//     const 

//     transform: rotateZ(8deg);
// }

function onOffToggle(isOn) {
    console.log('onOffToggle clicked');
    let runningState = 'running';
    if (isOn) {
        runningState = 'running';
    } else {
        runningState = 'paused';
    }
    const onToggler = document.getElementById('on-toggler');
    const offToggler = document.getElementById('off-toggler');
    if (isOn) {
        onToggler.style.backgroundColor = '#25C05D';
        offToggler.style.backgroundColor = '#555555';
    } else {
        offToggler.style.backgroundColor = '#EE6767';
        onToggler.style.backgroundColor = '#555555';
    }
    const builderBg = document.getElementById('builder-bg');
    const tagElement = document.getElementsByClassName('tag');
    const cogs = document.getElementsByClassName('cog');
    const tags = document.getElementById('tags');
    builderBg.style.animationPlayState = runningState;
    tags.style.animationPlayState = runningState;
    for (const tag of tagElement) {
        tag.style.animationPlayState = runningState;
    }
    for (const cog of cogs) {
        cog.style.animationPlayState = runningState;
    }
}

function builderExploding() {
    console.log('builderExploding clicked');
    // const builderBg = document.getElementById('builder-bg');
    const builderBgExplode = document.getElementById('builder-bg-explode');
    const explodeTransition = document.getElementById('explode-transition');
    const builderExploded = document.getElementById('builder-exploded');
    const webBuilder = document.getElementById('web-builder');
    const docBody = document.body;
    const fgTextH1 = document.getElementsByClassName('foreground-text')[0].querySelector('h1');
    const fgTextP = document.getElementsByClassName('foreground-text')[0].querySelector('p');
    // builderBgExplode.style.visibility = 'visible';
    builderBgExplode.style.display = 'inline';
    // builderBg.style.animation = 'builder-blink 3s ease-in-out';
    // builderBg.style.filter = 'brightness(0%) saturate(100%) invert(85%) sepia(0%) saturate(73%) hue-rotate(165deg) brightness(100%) contrast(95%)';
    explodeTransition.style.visibility = 'visible';
    explodeTransition.style.animation = 'explode-blink 4s ease-in-out';
    explodeTransition.style.animationDelay = '3s';
    setTimeout(() => { docBody.style.animation = 'shake 1s cubic-bezier(.36, .07, .19, .97) both' }, 3000);
    setTimeout(() => { fgTextH1.style.transform = 'rotateZ(8deg)', fgTextH1.style.position = 'absolute', fgTextP.style.transform = 'scaleY(0.5)', fgTextP.style.margin = 0, builderExploded.style.display = 'flex', webBuilder.style.display = 'none'; }, 4000);
    // transform-origin: left;
    // transform: rotateZ(8deg);
    // transform: rotateX(60deg);
}