function GetName()
{
    return prompt("Укажите ваше имя");
}

function PrintName()
{
    let name = GetName();

    alert(`Ваше имя ${name}\nВ нём ${name.length} символов.`);
}

function PrintDOMElementsCount()
{
    alert(document.getElementsByTagName('*').length);
}

function SaveInput()
{
    let prevValue = this.userInput;
    this.userInput = document.getElementById("search-input").value;

    alert(`Предидущее значение: ${prevValue},\nТекущее значние: ${this.userInput}`);
}

PrintDOMElementsCount();