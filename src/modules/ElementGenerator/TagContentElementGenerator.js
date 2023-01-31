
class TagsElementGenerator{
    static  generateHeader(text) {
        let h3 = document.createElement('h3')
        h3.style.color = 'black'
        h3.textContent = text
        return h3
    }

    static generateTag(text) { 
        let div = document.createElement('div')
        div.style = `
        min-width:7%;
        margin-right: 3%;
        max-width:15%; 
        color:black; 
        text-align:center; 
        border-radius: 21px;
        `
        div.textContent = text; 
        return div

    }

    static generateRow() { 
        let row = document.createElement('div')
        row.style = `
        display:flex;
        flex-wrap: wrap;
        border-top: solid 1px black;

        `
        return row

    }
}

export {TagsElementGenerator}