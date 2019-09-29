import './../scss/main.scss';

let resizeTimeout, controller, originalGripSize, scene4, faceCoordinates;

const facesMainElement = document.querySelector('#faces');
const facesContainerElement = document.querySelector('.faces-container');
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

function getScene4Duration() {
    return getFacesHeight() - (facesPlaceholder.getBoundingClientRect().height * 1.5);
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

function handleResize() {
    // If there's a timer, cancel it
    if (resizeTimeout) {
        window.cancelAnimationFrame(resizeTimeout);
    }

    // Setup the new requestAnimationFrame()
    resizeTimeout = window.requestAnimationFrame(function () {

        // Run our resize functions
        resizeGrip();
        controller.update(true);

        // Resize faces container.
        // const newFacesHeight = getFacesHeight();

        // facesContainerElement.style.height = `${newFacesHeight}px`;
        // facesContainerElement.querySelector('svg').setAttribute('viewBox', `0 0 823 ${newFacesHeight}`);
        //
        // scene4.duration(`${getScene4Duration()}px`);
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

    new ScrollMagic.Scene({
        triggerElement: '#trigger-promise',
        duration: '100%' // needs to be set to the classToggle will remove the active class when scene is done.
    })
        .setClassToggle('#blue', 'active') // add class
        .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: '#trigger-promise'
    })
        .setTween(checkmarkTimeline)
        .addIndicators({name: "promises"}) // add indicators (requires plugin);
        .on('enter leave', (event) => {
            switch(event.type) {
                case "leave":
                    console.log('leave');
                    checkmarkTimeline.timeScale(4);
                    break;
                case "enter":
                default:
                    checkmarkTimeline.timeScale(1).play(0);
                    break;
            }
        })
        .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: '#trigger-stakeholder-success',
        duration: '100%' // needs to be set to the classToggle will remove the active class when scene is done.
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

    // new ScrollMagic.Scene({
    //     triggerElement: '#sec3',
    // })
    //     .setClassToggle('#faces', 'show') // add class
    //     .addIndicators({ name: "faces"}) // add indicators (requires plugin)
    //     .addTo(controller);
    //
    // new ScrollMagic.Scene({
    //     triggerElement: '#sec3',
    // })
    //     .setClassToggle('#blue', 'active')// add class
    //     .addIndicators({ name: "faces"}) // add indicators (requires plugin)
    //     .addTo(controller);

    // scene4 = new ScrollMagic.Scene({
    //     triggerElement: '#sec4',
    //     duration: `${getScene4Duration()}px`,
    // })
    //     .setClassToggle('#faces-2', 'fixed') // add classes
    //     .addIndicators() // add indicators (requires plugin)
    //     .on('update', (event) => {
    //         switch(event.type) {
    //             case 'update':
    //
    //                 // calculate total distance to face-title is visible
    //                 const faceYDifference = document.querySelector('.faces-container').getBoundingClientRect().height - (document.querySelector('.faces-placeholder').getBoundingClientRect().height * 1.5);
    //                 const scale = 823 / document.querySelector('.faces-placeholder').getBoundingClientRect().width;
    //
    //                 let percent = 100 / (event.endPos - event.startPos) * (event.scrollPos - event.startPos);
    //
    //                 if (percent < 0) {
    //                     // reset coordinates of faces
    //                     faceCoordinates.map((face) => {
    //                         face.element.setAttribute('x', face.x);
    //                         face.element.setAttribute('y', face.y);
    //                         face.element.querySelector('.face').removeAttribute('style');
    //                     });
    //                 }
    //                 if (percent >= 0) {
    //                     if (percent > 100) {
    //                         percent = 100;
    //                     }
    //
    //                     faceCoordinates.map((face) => {
    //                         const positionX = face.x + (((face.endX - face.x) / 100) * percent);
    //                         const positionY = face.y + (((face.endY + (faceYDifference * scale) - face.y) / 100) * percent);
    //                         face.element.setAttribute('x', positionX);
    //                         face.element.setAttribute('y', positionY);
    //                         if (face.endRotate !== 0) {
    //                             face.element.querySelector('.face').setAttribute('style', `transform: rotate(${(face.endRotate / 100) * percent}deg); transition-delay: 0; transition: none;`);
    //                         }
    //
    //                     });
    //                 }
    //
    //                 break;
    //             default:
    //                 break;
    //         }
    //     })
    //     .addTo(controller);
}

window.onload = function() {
    // faceCoordinates = [
    //     {
    //         element: document.getElementById('face3'),
    //         x: 132,
    //         y: 361,
    //         endX: 108,
    //         endY: 390,
    //         endRotate: 37,
    //     },
    //     {
    //         element: document.getElementById('face5'),
    //         x: 653,
    //         y: 173,
    //         endX: 467,
    //         endY: 390,
    //         endRotate: 0,
    //     },
    //     {
    //         element: document.getElementById('face9'),
    //         x: 583,
    //         y: 321,
    //         endX: 583,
    //         endY: 321,
    //         endRotate: 0,
    //     },
    //     {
    //         element: document.getElementById('face11'),
    //         x: 256,
    //         y: 126,
    //         endX: 292,
    //         endY: 458,
    //         endRotate: 0,
    //     },
    //     {
    //         element: document.getElementById('face13'),
    //         x: 454,
    //         y: 9,
    //         endX: -23,
    //         endY: 368,
    //         endRotate: 0,
    //     },
    //     {
    //         element: document.getElementById('face14'),
    //         x: 127,
    //         y: 119,
    //         endX: 641,
    //         endY: 434,
    //         endRotate: 0,
    //     },
    //     {
    //         element: document.getElementById('face15'),
    //         x: 330,
    //         y: -13,
    //         endX: 244,
    //         endY: 368,
    //         endRotate: 0,
    //     },
    //     {
    //         element: document.getElementById('face16'),
    //         x: 345,
    //         y: 444,
    //         endX: 382,
    //         endY: 378,
    //         endRotate: -26,
    //     },
    //     {
    //         element: document.getElementById('face18'),
    //         x: 478,
    //         y: 401,
    //         endX: 699,
    //         endY: 320,
    //         endRotate: 0,
    //     },
    // ];

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


