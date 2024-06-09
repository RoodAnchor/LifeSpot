const VALID_AGE = 18;

const inputParseFunction = function () {
    return document.getElementsByTagName('input')[0].value.toLowerCase();
};

const sessionLog = function () {
    for (let i = 0; i < window.sessionStorage.length; i++) {
        let key = window.sessionStorage.key(i);
        console.log(`${key}: ${window.sessionStorage.getItem(key)}`);
    }
}

const getAge = function () {
    return prompt("Укажите ваш возраст");
}

function setSession(age) {

    let date = new Date();

    window.sessionStorage.setItem('age', age);
    window.sessionStorage.setItem('sessionStart', `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`);
    window.sessionStorage.setItem('userAgent', window.navigator.userAgent);
}

const validateAge = function () {
    if (!window.sessionStorage.getItem('sessionStart')) {
        let age = getAge();

        if (age < VALID_AGE)
            location.href = 'https://google.com';

        setSession(age);
    }

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

//setTimeout(function () { alert("Подписывайтесь на нас в соц. сетях!"); }, 60000);