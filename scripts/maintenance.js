function onOffToggle(runningState) {
    const onToggler = document.getElementById('on-toggler');
    const offToggler = document.getElementById('off-toggler');
    if (runningState === 'running') {
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