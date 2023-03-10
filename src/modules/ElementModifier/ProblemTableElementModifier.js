
class ProblemTableElementModifier{ 
    constructor() { 
        this.elementModifier = []
    }

    modifyElement() {
        this.observer = new MutationObserver(() => {
            this.modifyActiveElement()
        });
        this.modifyActiveElement()
        this.addObserverToProblemTable()
    }

    injectFunctionToTargetElement(func){ 
        this.elementModifier.push(func)
    }

    modifyActiveElement = () => {     
        this.disconnectObserverToProblemTable()
        let table = document.querySelector('[role="rowgroup"]')
        let problemsets = table.querySelectorAll('[role="row"]')
        for(let i =0; i <= problemsets.length -1 ; i ++) { 
            let cells = problemsets[i].querySelectorAll('[role="cell"]')
            let problemName = cells[1].textContent
            let id = problemName.split(".")[0]
            problemsets[i].setAttribute("problem-id", String(id))
            let isPremium = problemsets[i].getElementsByTagName("rect").length > 0
            problemsets[i].setAttribute("is-premium", isPremium)
            for(let ii = 0; ii <= this.elementModifier.length -1; ii ++) { 
                this.elementModifier[ii](problemsets[i])
            }
        }
        this.addObserverToProblemTable()
    }

    disconnectObserverToProblemTable() { 
        this.observer.disconnect()
    }

    addObserverToProblemTable() { 
        let table = document.querySelector('[role="table"]')
        var config = {childList: true, subtree: true};
        this.observer.observe(table,config);
    }
}

export { ProblemTableElementModifier}