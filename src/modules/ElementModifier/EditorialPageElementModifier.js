

class EditorialPageElementModifier { 
    constructor() { 
        this.elementModifier = []
    }

    injectFunctionToTargetElement(func) { 
        this.elementModifier.push(func)
    }

    getTabMenu() { 
        let tabMenu = document.getElementsByClassName('gap-8')[0]
        if (tabMenu == undefined) tabMenu = document.getElementsByClassName('gap-6')[0]
        return tabMenu
    }

    modifyElement() { 
        let tabs = this.getTabMenu().children[1].children
        if(tabs.length == 0) {
            window.setTimeout(() => {this.modifyElement()} ,100);
            return;
        }
        this.removeEditorialLockLogo(); 
        this.addObserverToLeftTab();
    }

    getTabMenu() { 
        let tabMenu = document.getElementsByClassName('gap-8')[0]
        if (tabMenu == undefined) tabMenu = document.getElementsByClassName('gap-6')[0]
        return tabMenu
    }

    addObserverToLeftTab() { 
        let tabElement = this.getTabMenu()
        let config = {childList: true, subtree: true,  attributes: true, attributeFilter: ['class']};
        let observer = new MutationObserver(() => { 
            if(this.isEditorialTabActive()) {
                this.hidePremiumLogo() 
                for(let iii = 0; iii <= this.elementModifier.length -1; iii++) { 
                    this.elementModifier[iii](this.getEditorialButton())
                }
            } 
        })
        observer.observe(tabElement, config)
    }

    isEditorialTabActive() { 
        return this.getTabMenu().children[1].children[0].childElementCount > 1
    }

    hidePremiumLogo() { 
        if(this.getEditorialButton().getAttribute("problem-name") == undefined) return
        let lockLogo = document.getElementsByClassName("backdrop-blur-sm")[0]; 
        if(lockLogo == undefined) { 
            window.setTimeout(() => {this.hidePremiumLogo()}, 100)
            return
        } 
        document.getElementsByClassName("backdrop-blur-sm")[0].style.opacity = 0; 
    }

    getEditorialButton() {
        return document.getElementsByClassName('gap-8')[0].children[1]
        .getElementsByClassName("flex")[1]
    }

    removeEditorialLockLogo() { 
        let editorialButton = this.getEditorialButton()
        if (editorialButton == undefined) {
            window.setTimeout(() => {this.removeEditorialLockLogo()} ,200);
            return;
        }
        let lockLogo = document.getElementsByClassName('gap-8')[0].children[1]
        .getElementsByClassName("flex")[1]
        .children[0].getElementsByTagName('svg')[0]
        if(lockLogo == undefined) return 
        lockLogo.style.opacity = 0; 
        editorialButton.setAttribute("problem-name", document.URL.split("/")[4])
        editorialButton.setAttribute("problem-id", this.getProblemId())
    }

    getProblemId() { 
        //Todo: Dont rely on problem id, if description page is not opened problem id wont be fetched
       return  document.getElementsByClassName("text-lg")[0].textContent.split(".")[0]
    }
    
    insertEditorialInnerHtml(innerHtml) { 
        document.getElementsByClassName("gap-4")[0]
        .getElementsByClassName("h-full")[0].innerHTML = innerHtml
    }

}


export {EditorialPageElementModifier}