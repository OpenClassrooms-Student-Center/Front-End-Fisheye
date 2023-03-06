
function createElements (...args) {
    const listOfElements = []
    args.forEach(arg => listOfElements.push(document.createElement(arg)))

    return listOfElements
}

function setAttributes ([...args] = []) {
    args.forEach(arg => arg.attributes.forEach(attribute =>
        arg.element.setAttribute(attribute[0], attribute[1])))
}

function attachContent ([...args]) {
    args.forEach(arg => arg.element.textContent = arg.content)
}

function addClasses ([...args]) {
    args.forEach(arg => arg.classes.forEach(className => arg.element.classList.add(className)))
}

function appendChilds ([...args]) {
    args.forEach(arg => arg.childs.forEach(child => arg.element.appendChild(child)))
}

export { createElements, setAttributes, attachContent, addClasses, appendChilds }
