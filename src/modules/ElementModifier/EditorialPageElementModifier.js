

class EditorialPageElementModifier { 
    getTabMenu() { 
        let tabMenu = document.getElementsByClassName('gap-8')[0]
        if (tabMenu == undefined) tabMenu = document.getElementsByClassName('gap-6')[0]
        return tabMenu
    }

    modifyElement() { 
        console.log("heree")
        let tabs = this.getTabMenu().children[1].children
        if(tabs.length == 0) {
            window.setTimeout(() => {this.modifyElement()} ,100);
            return;
        }
        this.removeEditorialLockLogo();
        console.log("done") 
        // this.addObserverToLeftTab();
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
            if(this.isEditorialTabActive()) this.modifyEditorialPage()
        })
        observer.observe(tabElement, config)
    }

    isEditorialTabActive() { 
        this.getTabMenu().children[1].children[0].childElementCount > 1
    }

    modifyEditorialPage() { 
        if(this.getEditorialButton().getAttribute("problem-name") == undefined) return 
        console.log("Test"); 
    }

    getEditorialButton() {
        let editorialButton = document.getElementsByClassName('gap-8')[0].children[1]
        .getElementsByClassName("flex")[1]
    }

    removeEditorialLockLogo() { 
        let editorialButton = this.getEditorialButton()
        if (editorialButton == undefined) {
            window.setTimeout(() => {this.modifyElement()} ,100);
            return;
        }
        let lockLogo = document.getElementsByClassName('gap-8')[0].children[1]
        .getElementsByClassName("flex")[1]
        .children[0].getElementsByTagName('svg')[0]
        console.log(lockLogo)
        if(lockLogo == undefined) return 
        lockLogo.style.opacity = 0; 
        editorialButton.setAttribute("problem-name", document.URL.split("/")[4])
    }
}


export {EditorialPageElementModifier}