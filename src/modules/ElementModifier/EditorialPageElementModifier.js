
class EditorialPageElementModifier { 
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
        this.addObserverToLeftTab()
    }

    removeEditorialLockLogo() { 
        let lockLogo = document.getElementsByClassName('gap-8')[0].children[1]
        .getElementsByClassName("flex")[1]
        .children[0].getElementsByTagName('svg')[0]
        if(lockLogo == undefined) return 
        lockLogo.style.opacity = 0; 
    }
}


export {EditorialPageElementModifier}