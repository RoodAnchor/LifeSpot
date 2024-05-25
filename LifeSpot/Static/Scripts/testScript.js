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

PrintDOMElementsCount();