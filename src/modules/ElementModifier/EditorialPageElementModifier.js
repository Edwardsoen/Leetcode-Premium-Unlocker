import { CSSStyler } from "../Objects"




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
        let tabs = this.getTabMenu()
        if(tabs == undefined) {
            window.setTimeout(() => {this.modifyElement()} ,100);
            return;
        }
        this.addEventListenerToEditorialButton();
        this.removeEditorialLockLogo(); 
    }

    addEventListenerToEditorialButton() { 
        let button = this.getEditorialButton()
        if (button == undefined) { 
            window.setTimeout(() => {this.addEventListenerToEditorialButton()}, 100)
            return
        }
        button.addEventListener('click', () => {
            this.hidePremiumLogo()                       
            for(let iii = 0; iii <= this.elementModifier.length -1; iii++) { 
                this.elementModifier[iii](button)
            }
        })
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
        this.addUnlockedIndicator()
        editorialButton.setAttribute("problem-name", document.URL.split("/")[4])
        editorialButton.setAttribute("problem-id", this.getProblemId())
    }

    addUnlockedIndicator(){ 
        let editorialTabElement = this.getTabMenu().children[1]; 
        editorialTabElement.style.borderWidth = '1px';
        editorialTabElement.style.borderRadius = '3px'; 
        editorialTabElement.style.borderColor = CSSStyler.COLOR_ACCENT

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