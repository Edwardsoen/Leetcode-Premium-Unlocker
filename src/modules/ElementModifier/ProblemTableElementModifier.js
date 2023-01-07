
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

    insertInnerProgressbar(progressBar, width) { 
        let innerProgressbarClassName = "inner-progressbar"
        let innerProgressbar = progressBar.getElementsByClassName(innerProgressbarClassName)
        let outerProgressbar = progressBar.getElementsByClassName('rounded-l-lg')[0]
        if(innerProgressbar.length > 0) { innerProgressbar[0].remove()}
        outerProgressbar.setAttribute("title", `${Math.round(width)}%`)
        let progress = document.createElement('div')
        progress.style = `
        background-color: red;
        width: ${width}%;
        height: 0.5rem;
        border-bottom-right-radius: 0.5rem;
        border-top-right-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
        border-top-left-radius: 0.5rem;
        `
        progress.classList.add(innerProgressbarClassName)
        outerProgressbar.appendChild(progress)
    }

    disconnectObserverToProblemTable() { 
        this.observer.disconnect()
    }

    addObserverToProblemTable() { 
        let table = document.querySelector('[role="table"]')
        var config = {childList: true, subtree: true};
        this.observer.observe(table,config);
    }

    removeProgressbarUnlockButton(progressbar) {
        let lockLogo = progressbar.getElementsByTagName("svg")[0]
        let leftBar = progressbar.getElementsByClassName('rounded-r-lg')[0]
        let rightBar = progressbar.getElementsByClassName('rounded-l-lg')[0]
        if (lockLogo!= undefined) lockLogo.remove(); 
        if (leftBar!= undefined) leftBar.remove()
        if (rightBar != undefined){
            rightBar.style = `
            border-bottom-right-radius: 0.5rem;
            overflow: hidden; 
            border-top-right-radius: 0.5rem
            `
        }
    }
}

export { ProblemTableElementModifier}