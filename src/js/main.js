var resizeTimeout;
var originalGripSize = {
    width: 2242,
    height: 1295,
};


var gripItems = document.querySelectorAll('.grip-item .grip-image');
for (var i=0; i < gripItems.length; i++) {
    var floatTime = Math.floor(Math.random() * 6) + 1;
    console.log(floatTime);
    gripItems[i].style.setProperty('--float-delay', floatTime +'s');
}

function resizeGrip() {
    var scale, origin;
    var wrapper = document.getElementsByClassName('hero')[0];
    var gripContainer = document.getElementsByClassName('grip-container')[0];

    scale = Math.min(
        wrapper.getBoundingClientRect().width / originalGripSize.width,
        wrapper.getBoundingClientRect().height / originalGripSize.height,
    );

    gripContainer.style.transform = "translate(-50%, -50%) " + "scale(" + scale + ")";
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

    });
};

window.onload = function() {
    resizeGrip();
    window.addEventListener('resize', this.handleResize);
}


