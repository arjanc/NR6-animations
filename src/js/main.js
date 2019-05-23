var resizeTimeout, controller;
var originalGripSize = {
    width: 2242 + 500,
    height: 1295 + 500,
};


var gripItems = document.querySelectorAll('.grip-item .grip-image');
for (var i=0; i < gripItems.length; i++) {
    var floatTime = Math.floor(Math.random() * 6) + 1;
    gripItems[i].style.setProperty('--float-delay', -floatTime +'s');
}

function resizeGrip() {
    var scale, origin;
    var wrapper = document.getElementsByClassName('hero')[0];
    var gripContainer = document.getElementsByClassName('grip-container')[0];

    scale = Math.min(
        wrapper.getBoundingClientRect().width / originalGripSize.width,
        wrapper.getBoundingClientRect().height / originalGripSize.height,
    );

    gripContainer.style.transform = "translate(-50%, -50%) " + "scale(" + (scale * 1) + ")";
}

handleResize = function() {
    // If there's a timer, cancel it
    if (resizeTimeout) {
        window.cancelAnimationFrame(resizeTimeout);
    }

    // Setup the new requestAnimationFrame()
    resizeTimeout = window.requestAnimationFrame(function () {

        // Run our resize functions
        resizeGrip();
        controller.update(true);
    });
};

initScrollMagic = function() {
    // initialize ScrollMagic
    controller = new ScrollMagic.Controller();

    // Build scenes.
    new ScrollMagic.Scene({
        triggerElement: '#sec1',
    })
        .setClassToggle('#grip-container', 'sticked') // add class
        .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: '#sec2',
    })
        .setClassToggle('#hero', 'nonFixed') // add class
        .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: '#sec3',
    })
        .setClassToggle('#main', 'blue') // add class
        .addTo(controller);
};

window.onload = function() {
    initScrollMagic();
    resizeGrip();
    window.addEventListener('resize', this.handleResize);
}


