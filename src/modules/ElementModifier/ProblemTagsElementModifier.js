import { CSSStyler } from "../Objects";


class ProblemTagsElementModifier { 
    constructor() { 
        this.tagButtonListener = []
    }

    modifyElement() { 
        this.modifyCompaniesTagButton()
    }

    modifyCompaniesTagButton() { 
        let tagButton = document.getElementsByClassName('pt-3')[0]
        let lockicon = tagButton.getElementsByTagName('svg')[0]
        if(!lockicon) {
            window.setTimeout(() => {this.modifyCompaniesTagButton.bind(this)()} ,500);
            return;
        }
        let tagDiv  = lockicon.parentElement
        lockicon.remove()
        let newNode = tagDiv.cloneNode(true)
        tagDiv.parentElement.replaceChild(newNode, tagDiv)
        newNode.style.backgroundColor = CSSStyler.COLOR_ACCENT
        newNode.style.color = 'black'
        for(let i =0; i <= this.tagButtonListener.length -1; i ++) {
            newNode.addEventListener('click', this.tagButtonListener[i])
        }
        
    }

    addTagButtonOnClickListener(func){ 
        this.tagButtonListener.push(func)
    }
}



export {ProblemTagsElementModifier}