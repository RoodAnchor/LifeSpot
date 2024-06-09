const ANIMATION_DURATION = 0.7;
const IMAGE_NAMES = [
    "img_1.jpg",
    "img_2.jpg",
    "img_3.jpg",
    "img_4.jpg",
    "img_5.jpg",
    "img_6.jpg",
    "img_7.jpg"
];

let currentSlideIndex = 0;
let isContentMoving = false;
let mouseMoveOffset = 0;
let offset = 0;

function toggleNavButtons()
{
    const prev = document.getElementById('prev-btn');
    const next = document.getElementById('next-btn');

    prev.classList.add('hidden');
    next.classList.add('hidden');

    if (currentSlideIndex > 0)
        prev.classList.remove('hidden');

    if (currentSlideIndex < IMAGE_NAMES.length - 1)
        next.classList.remove('hidden');
}

function loadImages()
{
    for (let i = 0; i < IMAGE_NAMES.length; i++)
    {
        const imgContainer = document.createElement('div');
        imgContainer.id = `img${i}`;
        imgContainer.classList.add('image-container');
        imgContainer.style.backgroundImage = `url(../../Static/Img/${IMAGE_NAMES[i]})`;

        document.getElementById("gallery-content").appendChild(imgContainer);
    }
}

function generateThumbs()
{
    for (let i = 0; i < IMAGE_NAMES.length; i++) {
        const thumb = document.createElement('div');
        thumb.id = `thumb_${i}`;
        thumb.classList.add('thumbs');

        if (i == 0)
            thumb.classList.add('selected');

        document.getElementById("thumbs-control").appendChild(thumb);
    }
}

function getGallery(targetEl)
{
    return targetEl.closest('.image-gallery');
}

function changeCurrentThumb(gallery)
{
    const thumbs = document.getElementsByClassName('thumbs');
    const currentThumb = gallery.querySelector('.selected');

    currentThumb.classList.remove('selected');

    thumbs[currentSlideIndex].classList.add('selected');
}

function slideLeft(e) 
{
    slide(e, 'left', currentSlideIndex+1);
}

function slideRight(e)
{
    slide(e, 'right', currentSlideIndex-1);
}

function addAnimation(el)
{
    el.style.setProperty('--animation-duration', `${ANIMATION_DURATION}s`);
    el.classList.add('animate');
    setTimeout(function () { el.classList.remove('animate'); }, ANIMATION_DURATION * 1000);
}

function startAnimation(el, slideOffset, indexOffset)
{
    addAnimation(el);

    el.style.left = `${slideOffset}px`;
    currentSlideIndex += indexOffset;
}

function slide(e, direction,nextId, slidesCount = 1)
{
    const gallery = getGallery(e.currentTarget);
    const containerWidth = gallery.clientWidth;
    const content = gallery.querySelector('#gallery-content');
    let slideOffset = content.offsetLeft + offset + containerWidth * slidesCount;
    let indexOffset = -1;

    if (content.classList.contains('animate')) return;

    if (direction === 'right') {

        if (currentSlideIndex <= 0)
        {
            slideOffset = 0;
            indexOffset = 0;
        }
    }
    else
    {
        if (currentSlideIndex >= IMAGE_NAMES.length - 1) {
            slideOffset = -(containerWidth * currentSlideIndex);
            indexOffset = 0;
        }
        else
        {
            slideOffset = content.offsetLeft + offset - (containerWidth * slidesCount);
            indexOffset = 1;
        };        
    }

    startAnimation(content, slideOffset, indexOffset);

    offset = 0;

    if (indexOffset != 0)
        currentSlideIndex = nextId;

    changeCurrentThumb(gallery);
    toggleNavButtons();
}

function thumbClick(e)
{
    const target = e.currentTarget;
    const gallery = getGallery(target);
    const id = parseInt(target.getAttribute('id').replace('thumb_', ''));
    const content = gallery.querySelector('#gallery-content');
    let slidesCount = currentSlideIndex - id;
    let direction = 'right';

    offset = 0;

    if (content.classList.contains('animate')) return;

    if (currentSlideIndex < id)
    {
        direction = 'left';
        slidesCount = id - currentSlideIndex;
    }

    slide(e, direction, id, slidesCount);
}

function startMoveContent(e)
{
    const gallery = getGallery(e.currentTarget);
    const content = gallery.querySelector('#gallery-content');

    offset = content.offsetLeft;

    if (content.classList.contains('animate')) return;

    isContentMoving = true;
}

function moveContent(e)
{
    const target = e.currentTarget;

    if (isContentMoving)
    {
        target.onmouseleave = finishMoveContent;
        target.style.left = `${target.offsetLeft + e.movementX}px`;

        mouseMoveOffset += e.movementX;
    }
}

function finishMoveContent(e)
{
    const gallery = getGallery(e.currentTarget);
    const content = gallery.querySelector('#gallery-content');

    offset -= content.offsetLeft;

    isContentMoving = false;

    if (mouseMoveOffset > 2)
        slide(e, 'right', currentSlideIndex - 1);
    else if (mouseMoveOffset < -2)
        slide(e, 'left', currentSlideIndex + 1);

    content.onmouseleave = null;
    mouseMoveOffset = 0;
}

function init()
{
    loadImages();
    generateThumbs();
    toggleNavButtons();

    const buttonLeft = document.getElementById('prev-btn');
    const buttonRight = document.getElementById('next-btn');
    const thumbs = document.getElementsByClassName('thumbs');
    const content = document.getElementById('gallery-content');

    buttonLeft.onclick = slideRight;
    buttonRight.onclick = slideLeft;

    content.onmousedown = startMoveContent;
    content.onmouseup = finishMoveContent;
    content.onmousemove = moveContent;

    for (let i of thumbs)
        i.onclick = thumbClick;
}

window.onload = init;