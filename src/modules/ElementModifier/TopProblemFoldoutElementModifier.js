class TopProblemFoldoutElementModifier{ 
    constructor() {
        this.elementModifier = []
    }
  
    injectFunctionToTargetElement(func) { 
        this.elementModifier.push(func)
    }

    modifyElement() { 
        this.observer = new MutationObserver(() => {
            this.modifyLockedElement()
        });
        this.modifyLockedElement()
        this.addObsersverToFoldout()
    }

    addObsersverToFoldout() { 
        let foldout = document.getElementsByClassName("space-y-1.5")[0]
        var config = {childList: true, subtree: true};
        this.observer.observe(foldout,config);
    }

    modifyLockedElement = () => { 
        let foldout = document.getElementsByClassName("space-y-1.5")
        let foldoutItem = foldout.children 
        for(let i =0; foldoutItem.children.length -2; i ++){ 
            let lockLogo = foldoutItem[i].getElementsByTagName('svg') 
            if (lockLogo.length > 0) { 
                foldoutItem[i].getElementsByTagName('a').href = "javascript:void(0)"
                let itemName = foldoutItem[i].textContent.replaceAll(" ", "")
                foldoutItem.setAttribute("item", itemName)
                lockLogo[0].remove()
                for(let iii = 0; iii <= this.elementModifier.length -1; iii++) { 
                    this.elementModifier[iii](foldoutItem[i])
                }
            }
        }
    }

    disconnectObserverToFoldout() { 
        this.observer.disconnect()
    }



}


export {TopProblemFoldoutElementModifier}