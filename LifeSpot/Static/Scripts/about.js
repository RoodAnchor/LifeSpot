const cb = comment =>
{
    let mainContainer = document.getElementsByClassName('comments')[0];

    let commentContainer = document.createElement("div");
    commentContainer.className = "comment";

    let usernameContainer = document.createElement("div");
    usernameContainer.className = "userName"

    let messageContainer = document.createElement("div");
    messageContainer.className = "message"

    let dateContainer = document.createElement("div");
    dateContainer.className = "date";

    usernameContainer.innerHTML = comment["userName"];
    messageContainer.innerHTML = comment["message"];
    dateContainer.innerHTML = comment["date"];

    commentContainer.appendChild(usernameContainer);
    commentContainer.appendChild(messageContainer);
    commentContainer.appendChild(dateContainer);
    mainContainer.appendChild(commentContainer);
}

function promptComment(cb)
{
    const comment = {};

    const userName = prompt("Введите ваше имя");
    const message = prompt("Введите комментарий");
    const date = new Date();

    comment['userName'] = userName;
    comment['message'] = message;
    comment['date'] = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

    cb(comment);
}