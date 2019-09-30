import './../scss/main.scss';

let resizeTimeout, controller, originalGripSize;
let scenes = {};

const facesMainElement = document.querySelector('#faces');
const facesPlaceholder = document.querySelector('.faces-placeholder');
const facesTitleElement = document.querySelector('.faces-title');

const gripItems = document.querySelectorAll('.grip-item .grip-image');
for (let i=0; i < gripItems.length; i++) {
    const floatTime = Math.floor(Math.random() * 6) + 1;
    gripItems[i].style.setProperty('--float-delay', -floatTime +'s');
}

function getFacesHeight() {
    return (facesTitleElement.getBoundingClientRect().y + facesTitleElement.getBoundingClientRect().height) - facesMainElement.getBoundingClientRect().y + facesPlaceholder.getBoundingClientRect().height;
}

function resizeGrip() {
    let scale;
    const wrapper = document.getElementsByClassName('hero')[0];
    const gripContainer = document.getElementsByClassName('grip-container')[0];

    scale = Math.min(
        wrapper.getBoundingClientRect().width / originalGripSize.width,
        wrapper.getBoundingClientRect().height / originalGripSize.height,
    );

    gripContainer.style.transform = "translate(-50%, -50%) " + "scale(" + (scale * 1) + ")";
}

function resizeScenesDurations() {
    scenes.stakeholderSuccess.duration(document.querySelector('#stakeholder-success').getBoundingClientRect().height);
    scenes.promise.duration(document.querySelector('#promise').getBoundingClientRect().height + (document.querySelector('#promise').getBoundingClientRect().top - document.querySelector('#trigger-promise').getBoundingClientRect().top));
}

function handleResize() {
    // If there's a timer, cancel it
    if (resizeTimeout) {
        window.cancelAnimationFrame(resizeTimeout);
    }

    // Setup the new requestAnimationFrame()
    resizeTimeout = window.requestAnimationFrame(function () {

        // Run our resize functions
        resizeGrip();
        resizeScenesDurations();
        controller.update(true);
    });
}

function initScrollMagic() {
    // initialize ScrollMagic
    controller = new ScrollMagic.Controller();

    // Settings some tweens.
    const checkmarkTimeline = new TimelineLite();
    checkmarkTimeline.staggerTo('.promises-list-item > span', 1, { opacity: 1 }, 0.5);
    checkmarkTimeline.staggerTo('.promises-list-item > svg', 1, { className: '+=animated'}, 0.5, "-=2.5"); // "-=2.5 puts the start time 2.5s earlier


    // Build scenes.
    new ScrollMagic.Scene({
        triggerElement: '#sec1',
    })
        .setClassToggle('#grip-container', 'sticked') // add class
        .addIndicators({ name: "grip"}) // add indicators (requires plugin)
        .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: '#sec2',
    })
        .setClassToggle('#hero', 'nonFixed') // add class
        .addIndicators({ name: "hero"}) // add indicators (requires plugin)
        .addTo(controller);

    scenes.promise = new ScrollMagic.Scene({
        triggerElement: '#trigger-promise',
        duration: document.querySelector('#promise').getBoundingClientRect().height + (document.querySelector('#promise').getBoundingClientRect().top - document.querySelector('#trigger-promise').getBoundingClientRect().top) // needs to be set to the classToggle will remove the active class when scene is done.
    })
        .setClassToggle('#blue', 'active') // add class
        .addIndicators({name: "promises"}) // add indicators (requires plugin);
        .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: '#trigger-promise'
    })
        .setTween(checkmarkTimeline)
        .addIndicators({name: "promises-list"}) // add indicators (requires plugin);
        .on('enter leave', (event) => {
            switch(event.type) {
                case "leave":
                    checkmarkTimeline.timeScale(4);
                    break;
                case "enter":
                default:
                    checkmarkTimeline.timeScale(1).play(0);
                    break;
            }
        })
        .addTo(controller);

    scenes.stakeholderSuccess = new ScrollMagic.Scene({
        triggerElement: '#trigger-stakeholder-success',
        duration: document.querySelector('#stakeholder-success').getBoundingClientRect().height // needs to be set to the classToggle will remove the active class when scene is done.
    })
        .setClassToggle('#green', 'active')// add class
        .addIndicators({name: "stakeholders"}) // add indicators (requires plugin)
        .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: '#trigger-stakeholder-faces',
        duration: '100%' // needs to be set to the classToggle will remove the active class when scene is done.
    })
        .setClassToggle('#stakeholder-faces', 'show')
        .addIndicators({name: "stakeholders-faces"}) // add indicators (requires plugin)
        .addTo(controller);


    // RELATION SCENE START
    const relationTitleTween = TweenMax.staggerTo('#relation-title > span', 0.4, { opacity: 1 }, 0.4);

    new ScrollMagic.Scene({
        triggerElement: '#trigger-relation',
        duration: '100%' // needs to be set to the classToggle will remove the active class when scene is done.
    })
        .setClassToggle('#blue', 'active')// add class
        .addIndicators({name: "relation"}) // add indicators (requires plugin)
        .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: '#trigger-relation'
    })
        .setTween(relationTitleTween)
        .addIndicators({name: "relation-title"}) // add indicators (requires plugin)
        .addTo(controller);

    // RELATION SCENE END

    // SCENE BLANKO START
    new ScrollMagic.Scene({
        triggerElement: '#trigger-blanko',
        duration: '100%' // needs to be set to the classToggle will remove the active class when scene is done.
    })
        .setClassToggle('#blanko', 'active')// add class
        .addIndicators({name: "blanko"}) // add indicators (requires plugin)
        .addTo(controller);
    // SCENE BLANKO END
}

window.onload = function() {

    const gripImages = document.querySelectorAll('.grip-item img');
    let imagesLoaded = 0;
    for (let i=0; i < gripImages.length; i++) {

        // create new image object
        // so we can add a listener to it.
        const img = new Image();
            img.src = gripImages[i].src;

        img.addEventListener('load', () => {
            imagesLoaded++;

            if (imagesLoaded === gripImages.length) {
                originalGripSize = {
                    width: document.getElementsByClassName('grip-container')[0].offsetWidth,
                    height: document.getElementsByClassName('grip-container')[0].offsetHeight,
                };
                console.log('originalGripSize: ', originalGripSize);

                // now we initialize the rest...
                resizeGrip();
                handleResize();
                window.addEventListener('resize', handleResize);

                document.querySelector('.grip-container-inner').classList.remove('loading');
            }
        });
    }
    initScrollMagic();
};


