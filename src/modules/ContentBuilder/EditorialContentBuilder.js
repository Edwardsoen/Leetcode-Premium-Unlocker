class EditorialContentBuilder{ 
    constructor() { 
        this.parentDiv = document.createElement('div')
    }

    buildContent(innerHTML) { 
        let row = document.createElement('div')
        row.style.justifyContent = 'center'
        row.innerHTML = innerHTML
        this.parentDiv.appendChild(row)
        return this
    }

    getResult() { 
        return this.parentDiv
    }

}



export {EditorialContentBuilder}