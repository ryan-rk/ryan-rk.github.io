let angryValue = 6;

function builderOff() {
    angryValue += 1;
    const builderOffTrigger = document.getElementById('off-builder');
    const robotMain = document.getElementById('robot');
    const robotBody = document.getElementById('robot-body');
    const robotArm = document.getElementById('robot-arm');
    const speechBubble = document.getElementById('speech-bubble');
    console.log(`angry value is ${angryValue}`);
    builderOffTrigger.style.visibility = 'hidden';
    onOffToggle(false);
    setTimeout(() => { restartBuilder(robotMain, robotBody, robotArm, builderOffTrigger, speechBubble) }, 1500);
}

function restartBuilder(robotMain, robotBody, robotArm, builderOffTrigger, speechBubble) {
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
    const speechBubbleMode = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    if (speechBubbleMode === 1) {
        speechBubble.style.visibility = 'hidden';
    } else if (speechBubbleMode === 2) {
        speechBubble.src = 'assets/img/speech-bubble1.svg';
        speechBubble.style.visibility = 'visible';
    } else if (speechBubbleMode === 3) {
        speechBubble.src = 'assets/img/speech-bubble2.svg';
        speechBubble.style.visibility = 'visible';
    }
}

function onOffToggle(isOn) {
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
    const tags = document.getElementsByClassName('tag');
    const cogs = document.getElementsByClassName('cog');
    const table = document.querySelector('table');
    builderBg.style.animationPlayState = runningState;
    table.style.animationPlayState = runningState;
    for (const tag of tags) {
        tag.style.animationPlayState = runningState;
    }
    for (const cog of cogs) {
        cog.style.animationPlayState = runningState;
    }
}