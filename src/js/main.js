var resizeTimeout, controller, originalGripSize;

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
        .addIndicators() // add indicators (requires plugin)
        .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: '#sec2',
    })
        .setClassToggle('#hero', 'nonFixed') // add class
        .addIndicators() // add indicators (requires plugin)
        .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: '#sec3',
    })
        .setClassToggle('#main', 'blue') // add class
        .addIndicators() // add indicators (requires plugin)
        .addTo(controller);
};

window.onload = function() {
    var gripImages = document.querySelectorAll('.grip-item img');
    var imagesLoaded = 0;
    for (var i=0; i < gripImages.length; i++) {

        // create new image object
        // so we can add a listener to it.
        var img = new Image();
            img.src = gripImages[i].src;

        img.addEventListener('load', () => {
            imagesLoaded++;

            if (imagesLoaded === gripImages.length) {
                originalGripSize = {
                    width: document.getElementsByClassName('grip-container')[0].offsetWidth,
                    height: document.getElementsByClassName('grip-container')[0].offsetHeight,
                };

                // now we initialize the rest...
                resizeGrip();
                window.addEventListener('resize', this.handleResize);

            }
        });
    }

    initScrollMagic();
};


