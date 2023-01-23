import { CSSStyler } from "../Objects";


class ProblemTagsElementModifier { 
    constructor() { 
        this.tagButtonListener = []
        this.observer = new MutationObserver(() => {
            this.onDialogOpen()
        });
        this.observerIsAttached = false
        this.data = undefined
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
        tagDiv.style.backgroundColor = CSSStyler.COLOR_ACCENT
        tagDiv.style.color = 'black'
        for(let i =0; i <= this.tagButtonListener.length -1; i ++) {
            tagDiv.addEventListener('click', this.tagButtonListener[i])
        }
        this.addObserverToDialog()
    }

    addObserverToDialog() { 
        let tagButton = document.getElementsByClassName('pt-3')[0]
        var config = {childList: true, subtree: true};
        this.observer.observe(tagButton, config)
        this.observerIsAttached = true
    }

    disconnectObserverFromDialog() { 
        this.observer.disconnect()
        this.observerIsAttached = false
    }


    onDialogOpen = ()=> { 
        //Fix this (race condition)
        if(!this.isDialogOpened()) return 
        this.disconnectObserverFromDialog()
        let targetDialog = document.querySelectorAll('div[role="dialog"]')[0]
        let blur = targetDialog.getElementsByClassName('backdrop-blur-sm')[0]
        if(blur != undefined) blur.remove()
        let premiumTab = targetDialog.getElementsByClassName('space-x-4')[0]
        if(premiumTab != undefined) premiumTab.remove()
        this.injectDataToDialog(this.data)
        this.addObserverToDialog()
    }

    removeAllChild(parent) {
        while (parent.firstChild) {
            parent.firstChild.remove()
        }
    }
    
    injectDataToDialog(data) { 
        if(!this.isDialogOpened) return
        let dialog = document.querySelectorAll('div[role="dialog"]')[0]
        let contentBox = dialog.getElementsByClassName('space-y-4')[0]
        this.removeAllChild(contentBox)
        for(let i =0; i <= data.length -1; i ++) { 
            let div = this.getDiv(data[i])
            contentBox.appendChild(div)
        }
    }

    setData(data) {
        this.data = data
    }

    getDiv(text) {
        let div = document.createElement('div')
        div.style = `
        margin-left:10%; 
        text-align:center; 
        `
        div.textContent= text
        return div
    }

    isDialogOpened() { 
        let dialogs = document.querySelectorAll('div[role="dialog"]')
        return dialogs.length == 2
    }

    addTagButtonOnClickListener(func){ 
        this.tagButtonListener.push(func)
    }
}



export {ProblemTagsElementModifier}