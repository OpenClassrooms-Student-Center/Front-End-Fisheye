const generic = {

    createElements: function(...args) {
    
        let listOfElements = []
        args.forEach(arg => listOfElements.push(document.createElement(arg)))
    
        return listOfElements
    },
    
    
    setAttributes: function([ ...args ]= []) {
        args.forEach(arg => arg.attributes.forEach(attribute => 
            arg.element.setAttribute(attribute[0], attribute[1])))
    },
    
    
    attachContent: function([ ...args ]) {
        args.forEach(arg => arg.element.textContent = arg.content)
    },
    
    
    addClasses: function([ ...args ]) {
        args.forEach(arg => arg.element.classList.add(arg.classes))        
    },
    
    
    appendChilds: function([ ...args ]) {
        args.forEach(arg => arg.childs.forEach(child => arg.element.appendChild(child)))
    }
}

export default generic