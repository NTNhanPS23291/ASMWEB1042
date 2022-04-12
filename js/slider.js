// const container = document.querySelector('.gallery-containter');
const slider = document.querySelector('.slide-container');
const slides = document.querySelectorAll('.img-container');
const countContainer = document.querySelector('.count-container');
const btnLeft = document.querySelector('.btn-left');
const btnRight = document.querySelector('.btn-right');
const btnPlay = document.querySelector('.slider-play');
const btnPause = document.querySelector('.slider-pause');
const caption = document.querySelectorAll('.caption');
const img = document.querySelectorAll('.img-container img')
// slider.style.transform = 'scale(0.4)'
// slider.style.overflow = 'visible';
let curSlide = 0;
const maxSlide = slides.length;
countContainer.textContent = `${(curSlide + 1)} / ${maxSlide}`
const goToSlide = function (slide, direction) {
    countContainer.textContent = `${curSlide + 1} / ${maxSlide}`
    slides.forEach((s, i) => {
        s.style.transform = `translateX(${100 * (i - slide)}%)`;
        if ((slide % maxSlide === 0 && direction === 1) || (slide === maxSlide - 1 && direction === 0)) {
            s.style.transition = 'none';
            return;
        }
        s.style.transition = "transform .8s ease-in-out";
    })
}
goToSlide(0);
const nextSlide = () => {
    if (curSlide === maxSlide - 1) curSlide = 0;
    else curSlide++;
    goToSlide(curSlide, 1)
};

const prevSlide = () => {
    if (curSlide === 0) curSlide = maxSlide - 1;
    else curSlide--;
    goToSlide(curSlide, 0);
};

let intervalId = null;
const playSlides = function () {
    if (intervalId === null) intervalId = setInterval(nextSlide, 3000);
}

const pauseSlides = function () {
    if (intervalId === null) return;
    clearInterval(intervalId);
    intervalId = null;
}

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
btnPlay.addEventListener('click', playSlides);
btnPause.addEventListener('click', pauseSlides);
// const firstCopy = slides[0].cloneNode(true);
// const lastCopy = slides[slides.length - 1].cloneNode(true);

// firstCopy.id = "first-copy";
// lastCopy.id = "last-copy";
// slider.append(firstCopy);
// slider.prepend(lastCopy);

// const sizeSlide = slides[curSlide].clientWidth;
// slider.style.transform = `translateX(${-sizeSlide * curSlide}px)`
// const runSlide = () => {
//     setInterval(() => {
//         curSlide++;
//         slider.style.transform = `translateX(${-sizeSlide * curSlide}px)`
//         slider.style.transition = "transform .8s ease-in-out"

//     }, 1000);
// }
// // runSlide();
// slider.addEventListener("transitionend", () => {
//     countContainer.innerText = `${curSlide % slides.length}/${slides.length}`
//     if (slides[curSlide].id === firstCopy.id) {
//         slider.style.transition = "none";
//         curSlide = 1;
//         slider.style.transform = `translateX(${-sizeSlide * curSlide}px)`
//     }
// })
slider.addEventListener('mouseover', function (e) {
    if (e.target === countContainer) return;
    if (e.target.classList.contains('caption')) return;
    if (e.target.classList.contains('slider-hide')) {
        e.target.classList.remove('slider-hide');
        countContainer.classList.remove('slider-hide');
        img.forEach(i => i.style.filter = "blur(5px) brightness(60%)")
        caption.forEach(c => c.classList.remove('slider-hide'));
    }
})

slider.addEventListener('mouseout', function (e) {
    if (e.target === btnLeft || e.target === btnRight) {
        e.target.classList.add('slider-hide');
        countContainer.classList.add('slider-hide');
        img.forEach(i => i.style.filter = "brightness(100%)")
        caption.forEach(c => c.classList.add('slider-hide'));
    }
})

slider.addEventListener('transitionend', function (e) {
    if (!e.target.classList.contains('img-container')) return;
});