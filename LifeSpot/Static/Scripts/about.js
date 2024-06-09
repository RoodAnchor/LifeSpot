function createHtmlElement(tagName, className, innerHtml, clickEvent) {
    let el = document.createElement(tagName);

    if (className != null)
        el.className = className

    if (innerHtml != null)
        el.innerHTML = innerHtml;

    if (clickEvent != null) {
        el.onclick = function () { clickEvent() };
    }

    return el;
}
const addLike = () => {
    let likesCount = parseInt(document.getElementsByClassName('rate')[0].innerHTML);
    document.getElementsByClassName('rate')[0].innerHTML = ++likesCount;
}

const cb = comment =>
{
    let mainContainer = document.getElementsByClassName('comments')[0];

    let commentContainer = createHtmlElement("div", "comment", null, null);
    let usernameContainer = createHtmlElement("div", "username", comment["username"], null);
    let messageContainer = createHtmlElement("div", "message", comment["message"], null);
    let dateContainer = createHtmlElement("div", "date", comment["date"], null);

    commentContainer.appendChild(usernameContainer);
    commentContainer.appendChild(messageContainer);
    commentContainer.appendChild(dateContainer);

    if ("rate" in comment) {

        let rateContainer = createHtmlElement("div", "rate", comment["rate"], null);
        let likeButtonContainer = createHtmlElement("div", "likeButton", null, addLike);
        let iconContainer = createHtmlElement("span", "heartIcon", "❤️", null);

        likeButtonContainer.appendChild(iconContainer);
        likeButtonContainer.appendChild(rateContainer);
        commentContainer.appendChild(likeButtonContainer);
    }

    mainContainer.appendChild(commentContainer);
}

function Comment(username, message, date)
{
    this.username = username;
    this.message = message;
    this.date = date;
}

function promptComment(cb)
{
    const username = prompt("Введите ваше имя");
    const message = prompt("Введите комментарий");
    const isRated = confirm("Желаете, что бы ваш комментарий могли оценить друшие ползователи?");

    const date = new Date();

    const comment = new Comment(username, message, `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`);

    if (isRated)
    {
        const ratedComment = Object.create(comment);
        ratedComment.rate = 0;

        cb(ratedComment);
    }
    else
        cb(comment);
}