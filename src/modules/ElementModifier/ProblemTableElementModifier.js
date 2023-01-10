
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
            let problemFrequencyProgressbar = cells[cells.length -1]
            let id = problemName.split(".")[0]
            problemFrequencyProgressbar.setAttribute("problem-id", String(id))
            for(let ii = 0; ii <= this.elementModifier.length -1; ii ++) { 
                this.elementModifier[ii](problemFrequencyProgressbar)
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