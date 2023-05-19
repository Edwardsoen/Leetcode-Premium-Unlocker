import { CSSStyler } from "../Objects";


class ProblemTagsElementModifier { 
    constructor() { 
        this.tagButtonListener = []
    }

    modifyElement() { 
        let tabs = document.getElementsByClassName('gap-8')[0].children[0].children
        if(tabs.length == 0) {
            window.setTimeout(() => {this.modifyElement()} ,100);
            return;
        }
        if(this.isDescriptionTabActive()) this.modifyCompaniesTagButton()
        this.addObserverToLeftTab()
    }

    addObserverToLeftTab() { 
        let tabElement = document.getElementsByClassName('gap-8')[0]
        let config = {childList: true, subtree: true,  attributes: true, attributeFilter: ['class']};
        let observer = new MutationObserver(() => { 
            if(this.isDescriptionTabActive()) this.modifyCompaniesTagButton()
        })
        observer.observe(tabElement, config)
    }

    isDescriptionTabActive() { 
        return document.getElementsByClassName('gap-8')[0]
        .children[0].children[0].childElementCount == 2
    }



    modifyCompaniesTagButton() { 
        let tagButton = document.getElementsByClassName('pt-3')[0]
        if(!tagButton) {
            window.setTimeout(() => {this.modifyCompaniesTagButton.bind(this)()} ,100);
            return;
        }
        let lockicon = tagButton.getElementsByTagName('svg')[0]
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