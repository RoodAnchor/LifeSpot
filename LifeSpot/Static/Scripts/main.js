const VALID_AGE = 18;
const SESSION = new Map();

const inputParseFunction = function () {
    return document.getElementsByTagName('input')[0].value.toLowerCase();
};

const sessionLog = function ()
{
    for (let i of SESSION)
        console.log(i);
}

const getAge = function () {
    return prompt("Укажите ваш возраст");
}

function setSession() {
    let date = new Date();

    SESSION.set('SessionStart', `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`);
    SESSION.set('UserAgent', window.navigator.userAgent);
}

const validateAge = function () {

    let age = getAge();
    
    if (age < VALID_AGE)
        location.href = 'https://google.com';

    SESSION.set('Age', age);
    setSession();

    sessionLog();
}

const hideElement = function (element) {
    element.style.display = 'none';
}

const showElement = function (element) {
    element.style.display = 'inline-block';
}

function filterVideos() {
    let vids = document.getElementsByClassName('video-container');

    for (let i = 0; i < vids.length; i++)
    {
        let title = vids[i].getElementsByTagName('h3')[0].innerText;

        if (title.toLowerCase().includes(inputParseFunction().toLowerCase()))
            showElement(vids[i]);
        else
            hideElement(vids[i]);
    }
}

validateAge();

setTimeout(function () { alert("Подписывайтесь на нас в соц. сетях!"); }, 60000);